/**
 * Digital Estate Planning Wizard - Storage Module
 * IndexedDB abstraction for encrypted checklist items, sections, and metadata.
 */

const WizardStorage = (() => {
  'use strict';

  const DB_NAME = 'DigitalEstatePlanning';
  const DB_VERSION = 1;
  let _db = null;

  function _open() {
    if (_db) return Promise.resolve(_db);

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' });
        }

        if (!db.objectStoreNames.contains('checklist')) {
          const checklist = db.createObjectStore('checklist', { keyPath: 'id' });
          checklist.createIndex('sectionId', 'sectionId', { unique: false });
        }

        if (!db.objectStoreNames.contains('sections')) {
          db.createObjectStore('sections', { keyPath: 'sectionId' });
        }

        if (!db.objectStoreNames.contains('bundle')) {
          db.createObjectStore('bundle', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        _db = event.target.result;
        resolve(_db);
      };

      request.onerror = (event) => {
        reject(new Error('IndexedDB open failed: ' + event.target.error));
      };
    });
  }

  function _tx(storeName, mode) {
    return _db.transaction(storeName, mode).objectStore(storeName);
  }

  function _request(req) {
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function init() {
    await _open();
    // Request persistent storage
    if (navigator.storage && navigator.storage.persist) {
      await navigator.storage.persist().catch(() => {});
    }
  }

  // --- Meta ---

  async function getMeta(key) {
    await _open();
    const result = await _request(_tx('meta', 'readonly').get(key));
    return result ? result.value : null;
  }

  async function setMeta(key, value) {
    await _open();
    return _request(_tx('meta', 'readwrite').put({ key, value }));
  }

  async function hasPassphrase() {
    const hash = await getMeta('passphraseHash');
    return !!hash;
  }

  async function getPassphraseHash() {
    return getMeta('passphraseHash');
  }

  async function setPassphraseData(keySaltBase64, hashSaltBase64, hash) {
    await setMeta('keySalt', keySaltBase64);
    await setMeta('passphraseSalt', hashSaltBase64);
    await setMeta('passphraseHash', hash);
  }

  // --- Checklist Items ---

  async function saveChecklistItem(id, data) {
    await _open();
    // data: { ciphertext, iv } -- already encrypted by caller
    return _request(_tx('checklist', 'readwrite').put({
      id,
      sectionId: data.sectionId,
      ciphertext: data.ciphertext,
      iv: data.iv,
      updatedAt: new Date().toISOString()
    }));
  }

  async function getChecklistItem(id) {
    await _open();
    return _request(_tx('checklist', 'readonly').get(id));
  }

  async function getAllChecklistItems() {
    await _open();
    return _request(_tx('checklist', 'readonly').getAll());
  }

  // --- Section State ---

  async function saveSectionState(sectionId, data) {
    await _open();
    // data: { ciphertext, iv } -- already encrypted by caller
    return _request(_tx('sections', 'readwrite').put({
      sectionId,
      ciphertext: data.ciphertext,
      iv: data.iv,
      updatedAt: new Date().toISOString()
    }));
  }

  async function getSectionState(sectionId) {
    await _open();
    return _request(_tx('sections', 'readonly').get(sectionId));
  }

  // --- Clear All ---

  async function clearAllData() {
    await _open();
    await _request(_tx('checklist', 'readwrite').clear());
    await _request(_tx('sections', 'readwrite').clear());
    await _request(_tx('bundle', 'readwrite').clear());
    await _request(_tx('meta', 'readwrite').clear());
  }

  return {
    init,
    getMeta,
    setMeta,
    hasPassphrase,
    getPassphraseHash,
    setPassphraseData,
    saveChecklistItem,
    getChecklistItem,
    getAllChecklistItems,
    saveSectionState,
    getSectionState,
    clearAllData
  };
})();
