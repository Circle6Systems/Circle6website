/**
 * Digital Estate Planning Wizard - Checklist Persistence Module
 * Manages encrypted checklist item state (checked, not-applicable) and
 * section notes via WizardCrypto and WizardStorage.
 */

const WizardChecklist = (() => {
  'use strict';

  /**
   * Load all checklist items for a given section from IndexedDB,
   * decrypt each, and return a Map of id -> { checked, na }.
   *
   * @param {string} sectionId - e.g. 'section-1'
   * @param {CryptoKey} cryptoKey - derived AES-GCM key
   * @returns {Promise<Map<string, {checked: boolean, na: boolean}>>}
   */
  async function loadSectionItems(sectionId, cryptoKey) {
    var result = new Map();
    var allItems = await WizardStorage.getAllChecklistItems();

    for (var i = 0; i < allItems.length; i++) {
      var record = allItems[i];
      if (record.sectionId !== sectionId) { continue; }
      try {
        var json = await WizardCrypto.decrypt(record.ciphertext, record.iv, cryptoKey);
        var state = JSON.parse(json);
        result.set(state.id, { checked: !!state.checked, na: !!state.na, value: state.value || '' });
      } catch (_e) {
        // Skip items that fail decryption (corrupted or wrong key)
      }
    }

    return result;
  }

  /**
   * Toggle a single checklist item field and persist the encrypted state.
   *
   * @param {string} id - item ID (e.g. 'a-1-1-3')
   * @param {string} sectionId - section ID for IndexedDB index
   * @param {string} field - 'checked' or 'na'
   * @param {boolean} value - new value for the field
   * @param {CryptoKey} cryptoKey - derived AES-GCM key
   */
  async function toggleItem(id, sectionId, field, value, cryptoKey) {
    // Load existing state for this item if present
    var existing = { id: id, checked: false, na: false, value: '', timestamp: Date.now() };
    var record = await WizardStorage.getChecklistItem(id);

    if (record && record.ciphertext && record.iv) {
      try {
        var json = await WizardCrypto.decrypt(record.ciphertext, record.iv, cryptoKey);
        var parsed = JSON.parse(json);
        existing.checked = !!parsed.checked;
        existing.na = !!parsed.na;
        existing.value = parsed.value || '';
      } catch (_e) {
        // Use defaults if decryption fails
      }
    }

    // Apply the toggle
    existing[field] = value;
    existing.timestamp = Date.now();

    // If marking as N/A, uncheck; if checking, un-N/A
    if (field === 'na' && value) {
      existing.checked = false;
    } else if (field === 'checked' && value) {
      existing.na = false;
    }

    // Encrypt and save
    var encrypted = await WizardCrypto.encrypt(JSON.stringify(existing), cryptoKey);
    await WizardStorage.saveChecklistItem(id, {
      sectionId: sectionId,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv
    });
  }

  /**
   * Save the full state of a checklist item (used by debounced value input).
   */
  async function saveItemState(id, sectionId, state, cryptoKey) {
    var payload = {
      id: id,
      checked: !!state.checked,
      na: !!state.na,
      value: state.value || '',
      timestamp: Date.now()
    };
    var encrypted = await WizardCrypto.encrypt(JSON.stringify(payload), cryptoKey);
    await WizardStorage.saveChecklistItem(id, {
      sectionId: sectionId,
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv
    });
  }

  /**
   * Load encrypted section notes from the sections store.
   *
   * @param {string} sectionId
   * @param {CryptoKey} cryptoKey
   * @returns {Promise<string>} decrypted notes text, or empty string
   */
  async function loadSectionNotes(sectionId, cryptoKey) {
    var record = await WizardStorage.getSectionState(sectionId);
    if (!record || !record.ciphertext || !record.iv) { return ''; }
    try {
      return await WizardCrypto.decrypt(record.ciphertext, record.iv, cryptoKey);
    } catch (_e) {
      return '';
    }
  }

  /**
   * Encrypt and save section notes.
   *
   * @param {string} sectionId
   * @param {string} text - plaintext notes
   * @param {CryptoKey} cryptoKey
   */
  async function saveSectionNotes(sectionId, text, cryptoKey) {
    var encrypted = await WizardCrypto.encrypt(text || '', cryptoKey);
    await WizardStorage.saveSectionState(sectionId, {
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv
    });
  }

  /**
   * Calculate progress for a single section.
   *
   * @param {string} sectionId
   * @param {Map<string, {checked: boolean, na: boolean}>} loadedItems - item state map
   * @returns {{ completed: number, total: number, percent: number }}
   */
  function getSectionProgress(sectionId, loadedItems) {
    var sectionItems = WizardContent.getItemsBySection(sectionId);
    var total = sectionItems.length;
    var completed = 0;

    for (var i = 0; i < sectionItems.length; i++) {
      var state = loadedItems.get(sectionItems[i].id);
      if (state && (state.checked || state.na)) {
        completed++;
      }
    }

    return {
      completed: completed,
      total: total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  /**
   * Calculate aggregate progress for a path ('a' or 'b').
   *
   * @param {string} path - 'a' or 'b'
   * @param {Object} allLoadedItems - keyed by sectionId -> Map
   * @returns {{ completed: number, total: number, percent: number }}
   */
  function getPathProgress(path, allLoadedItems) {
    var sections = WizardContent.getAllSections().filter(function (s) {
      return s.path === path;
    });
    var completed = 0;
    var total = 0;

    for (var i = 0; i < sections.length; i++) {
      var sectionMap = allLoadedItems[sections[i].id] || new Map();
      var progress = getSectionProgress(sections[i].id, sectionMap);
      completed += progress.completed;
      total += progress.total;
    }

    return {
      completed: completed,
      total: total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  /**
   * Calculate overall progress across all sections.
   *
   * @param {Object} allLoadedItems - keyed by sectionId -> Map
   * @returns {{ completed: number, total: number, percent: number }}
   */
  function getOverallProgress(allLoadedItems) {
    var sections = WizardContent.getAllSections();
    var completed = 0;
    var total = 0;

    for (var i = 0; i < sections.length; i++) {
      var sectionMap = allLoadedItems[sections[i].id] || new Map();
      var progress = getSectionProgress(sections[i].id, sectionMap);
      completed += progress.completed;
      total += progress.total;
    }

    return {
      completed: completed,
      total: total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  async function restoreFromBundle(bundleData, cryptoKey, onProgress) {
    var sectionIds = Object.keys(bundleData.sections);
    var restored = { items: 0, notes: 0 };

    for (var i = 0; i < sectionIds.length; i++) {
      var sid = sectionIds[i];
      var sec = bundleData.sections[sid];
      if (onProgress) { onProgress(i + 1, sectionIds.length, sid); }

      var itemIds = Object.keys(sec.items);
      for (var j = 0; j < itemIds.length; j++) {
        await saveItemState(itemIds[j], sid, sec.items[itemIds[j]], cryptoKey);
        restored.items++;
      }

      if (sec.notes) {
        await saveSectionNotes(sid, sec.notes, cryptoKey);
        restored.notes++;
      }
    }

    return restored;
  }

  return {
    loadSectionItems: loadSectionItems,
    toggleItem: toggleItem,
    saveItemState: saveItemState,
    loadSectionNotes: loadSectionNotes,
    saveSectionNotes: saveSectionNotes,
    getSectionProgress: getSectionProgress,
    getPathProgress: getPathProgress,
    getOverallProgress: getOverallProgress,
    restoreFromBundle: restoreFromBundle
  };
})();
