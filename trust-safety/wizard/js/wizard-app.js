/**
 * Digital Estate Planning Wizard - Alpine.js Application
 * Auth flow with passphrase-based encryption, dashboard, and section walkthrough.
 * Adapted from PeopleSafe SDLC Journal patterns.
 */

document.addEventListener('alpine:init', () => {

  Alpine.data('wizardApp', () => ({
    // --- State ---
    view: 'loading',
    error: '',
    message: '',
    isProcessing: false,

    // Auth
    passphrase: '',
    passphraseConfirm: '',
    cryptoKey: null,
    isFirstTime: false,
    _failedAttempts: 0,
    _lockoutUntil: 0,
    _lockTimer: null,
    _activityTimer: null,

    // Dashboard
    pathFilter: 'all',
    sections: [],
    checklistData: {},

    // Section walkthrough
    currentSection: null,
    currentItems: null,
    sectionNotes: '',
    isSaving: false,
    _saveDebounceTimer: null,

    // Platform guided setup
    currentPlatform: null,
    platformTab: 'planning',
    platformStep: -1,

    // Vault guided setup
    currentVault: null,
    vaultTab: 'planning',
    vaultStep: -1,

    // Item value input debounce
    _pendingItemSaves: {},
    _itemSaveTimer: null,

    // Save status
    saveStatus: '',
    _saveStatusTimer: null,

    // Bundle export
    bundlePassphrase: '',
    bundlePassphraseConfirm: '',
    bundleLocation: '',
    passphraseLocation: '',
    bundleGenerated: false,
    bundleCustomMessage: '',
    bundleIncludeSections: {},
    bundleStrength: { score: 0, label: '', cls: '' },

    // Settings
    showClearConfirm: false,

    // --- Init ---
    async init() {
      if (!WizardCrypto.isSupported()) {
        this.view = 'unsupported';
        return;
      }

      try {
        await WizardStorage.init();
        this.isFirstTime = !(await WizardStorage.hasPassphrase());
        this.view = this.isFirstTime ? 'setup' : 'auth';
      } catch (e) {
        this.error = 'Failed to initialize storage: ' + e.message;
        this.view = 'unsupported';
      }

      // Session management
      this._setupSessionHandlers();
    },

    // --- Auth: First-time setup ---
    async createPassphrase() {
      this.error = '';

      if (this.passphrase.length < 12) {
        this.error = 'Passphrase must be at least 12 characters.';
        return;
      }

      if (this.passphrase !== this.passphraseConfirm) {
        this.error = 'Passphrases do not match.';
        return;
      }

      this.isProcessing = true;

      try {
        // Generate separate salts for key derivation and hash verification
        const keySalt = WizardCrypto.generateSalt();
        const hashSalt = WizardCrypto.generateSalt();

        // Derive encryption key
        this.cryptoKey = await WizardCrypto.deriveKey(this.passphrase, keySalt);

        // Hash passphrase for verification
        const hash = await WizardCrypto.hashPassphrase(this.passphrase, hashSalt);

        // Store salts and hash
        await WizardStorage.setPassphraseData(
          WizardCrypto.saltToBase64(keySalt),
          WizardCrypto.saltToBase64(hashSalt),
          hash
        );

        this._clearPassphraseFields();
        await this._enterApp();
      } catch (e) {
        this.error = 'Failed to create passphrase: ' + e.message;
      } finally {
        this.isProcessing = false;
      }
    },

    // --- Auth: Returning user unlock ---
    async unlock() {
      this.error = '';

      // Rate limiting: progressive delay after failed attempts
      if (Date.now() < this._lockoutUntil) {
        const remaining = Math.ceil((this._lockoutUntil - Date.now()) / 1000);
        this.error = 'Too many attempts. Please wait ' + remaining + ' seconds.';
        return;
      }

      if (!this.passphrase) {
        this.error = 'Please enter your passphrase.';
        return;
      }

      this.isProcessing = true;

      try {
        // Verify passphrase against stored hash
        const storedHash = await WizardStorage.getMeta('passphraseHash');
        const hashSalt = await WizardStorage.getMeta('passphraseSalt');
        const computedHash = await WizardCrypto.hashPassphrase(this.passphrase, hashSalt);

        if (computedHash !== storedHash) {
          this._failedAttempts++;
          const delay = Math.min(Math.pow(2, this._failedAttempts) * 1000, 30000);
          this._lockoutUntil = Date.now() + delay;
          this.error = 'Incorrect passphrase. Please try again.';
          this.isProcessing = false;
          return;
        }

        // Derive encryption key
        const keySalt = await WizardStorage.getMeta('keySalt');
        this.cryptoKey = await WizardCrypto.deriveKey(this.passphrase, keySalt);

        // Reset rate limiting on success
        this._failedAttempts = 0;
        this._lockoutUntil = 0;

        this._clearPassphraseFields();
        await this._enterApp();
      } catch (e) {
        this.error = 'Failed to unlock: ' + e.message;
      } finally {
        this.isProcessing = false;
      }
    },

    // --- Session ---
    lock() {
      // Clear the encryption key
      this.cryptoKey = null;

      // Clear any decrypted content
      this.currentSection = null;
      this.currentItems = null;
      this.sectionNotes = '';
      this.checklistData = {};
      this.sections = [];
      this.pathFilter = 'all';
      this.currentPlatform = null;
      this.platformTab = 'planning';
      this.platformStep = -1;
      this.currentVault = null;
      this.vaultTab = 'planning';
      this.vaultStep = -1;

      // Reset export and settings state
      this.bundlePassphrase = '';
      this.bundlePassphraseConfirm = '';
      this.bundleLocation = '';
      this.passphraseLocation = '';
      this.bundleGenerated = false;
      this.showClearConfirm = false;

      // Cancel pending saves
      clearTimeout(this._saveDebounceTimer);
      clearTimeout(this._itemSaveTimer);
      this._pendingItemSaves = {};
      this.isSaving = false;

      // Reset UI state
      this.view = 'auth';
      this.error = '';
      this.message = '';

      // Cancel timers
      clearTimeout(this._lockTimer);
      clearTimeout(this._activityTimer);
    },

    async _enterApp() {
      await this._loadDashboard();
      this.view = 'dashboard';
      this._startLockTimer();
    },

    _clearPassphraseFields() {
      this.passphrase = '';
      this.passphraseConfirm = '';
    },

    _startLockTimer() {
      // Auto-lock after 5 minutes of inactivity
      clearTimeout(this._activityTimer);
      this._activityTimer = setTimeout(() => {
        if (this.cryptoKey) {
          this.lock();
        }
      }, 5 * 60 * 1000);
    },

    _resetLockTimer() {
      if (this.cryptoKey) {
        this._startLockTimer();
      }
    },

    _handleVisibility() {
      if (document.hidden && this.cryptoKey) {
        // Start a shorter lock timer when tab is hidden
        this._lockTimer = setTimeout(() => {
          this.lock();
        }, 5 * 60 * 1000);
      } else {
        clearTimeout(this._lockTimer);
      }
    },

    _setupSessionHandlers() {
      // Clear key on page unload
      window.addEventListener('beforeunload', () => {
        this.cryptoKey = null;
      });

      // Lock on tab hidden after timeout
      document.addEventListener('visibilitychange', () => {
        this._handleVisibility();
      });

      // Track activity to reset lock timer
      ['click', 'keydown', 'touchstart'].forEach(evt => {
        document.addEventListener(evt, () => {
          this._resetLockTimer();
        }, { passive: true });
      });
    },

    // --- Dashboard ---

    async _loadDashboard() {
      var allSections = WizardContent.getAllSections();
      var loadedData = {};

      for (var i = 0; i < allSections.length; i++) {
        var s = allSections[i];
        loadedData[s.id] = await WizardChecklist.loadSectionItems(s.id, this.cryptoKey);
      }

      this.checklistData = loadedData;

      this.sections = allSections.map(function (s) {
        var progress = WizardChecklist.getSectionProgress(s.id, loadedData[s.id] || new Map());
        return {
          id: s.id,
          number: s.number,
          title: s.title,
          path: s.path,
          description: s.description,
          subsections: s.subsections,
          progress: progress
        };
      });
    },

    setPathFilter(filter) {
      this.pathFilter = filter;
    },

    get filteredSections() {
      var self = this;
      if (self.pathFilter === 'all') { return self.sections; }
      return self.sections.filter(function (s) { return s.path === self.pathFilter; });
    },

    getOverallProgress() {
      return WizardChecklist.getOverallProgress(this.checklistData);
    },

    async navigateToSection(sectionId) {
      var section = this.sections.find(function (s) { return s.id === sectionId; });
      if (!section) { return; }

      this.currentSection = section;
      this.currentItems = this.checklistData[sectionId] || new Map();
      this.sectionNotes = await WizardChecklist.loadSectionNotes(sectionId, this.cryptoKey);
      this.view = 'section';
    },

    // --- Section Walkthrough ---

    async backToDashboard() {
      // Save any pending item values
      clearTimeout(this._itemSaveTimer);
      if (Object.keys(this._pendingItemSaves).length > 0) {
        await this._flushItemSaves();
      }

      // Save any pending notes
      clearTimeout(this._saveDebounceTimer);
      if (this.currentSection && this.sectionNotes !== undefined) {
        await this._saveNotes();
      }

      // Recompute progress
      await this._loadDashboard();
      this.currentSection = null;
      this.currentItems = null;
      this.sectionNotes = '';
      this.view = 'dashboard';
    },

    async toggleItem(itemId, field) {
      if (!this.currentSection || !this.cryptoKey) { return; }

      var currentState = this.getItemState(itemId);
      var newValue = !currentState[field];

      // Optimistic UI update (preserve value field)
      var updatedState = { checked: currentState.checked, na: currentState.na, value: currentState.value || '' };
      updatedState[field] = newValue;

      // If toggling N/A on, uncheck; if checking, un-N/A
      if (field === 'na' && newValue) {
        updatedState.checked = false;
      } else if (field === 'checked' && newValue) {
        updatedState.na = false;
      }

      this.currentItems.set(itemId, updatedState);

      // Persist encrypted state
      await WizardChecklist.toggleItem(
        itemId,
        this.currentSection.id,
        field,
        newValue,
        this.cryptoKey
      );

      // Update checklistData for progress recalc
      this.checklistData[this.currentSection.id] = this.currentItems;

      // Update section progress in the sections array
      var sectionId = this.currentSection.id;
      var progress = WizardChecklist.getSectionProgress(sectionId, this.currentItems);
      this.currentSection.progress = progress;
      for (var i = 0; i < this.sections.length; i++) {
        if (this.sections[i].id === sectionId) {
          this.sections[i].progress = progress;
          break;
        }
      }
      this._showSaveStatus();
    },

    onNotesInput() {
      var self = this;
      clearTimeout(self._saveDebounceTimer);
      self.isSaving = true;
      self._saveDebounceTimer = setTimeout(function () {
        self._saveNotes();
      }, 1500);
    },

    async _saveNotes() {
      if (!this.currentSection || !this.cryptoKey) {
        this.isSaving = false;
        return;
      }
      try {
        await WizardChecklist.saveSectionNotes(
          this.currentSection.id,
          this.sectionNotes,
          this.cryptoKey
        );
      } catch (_e) {
        // Silent fail -- notes will be retried on next input
      }
      this.isSaving = false;
      this._showSaveStatus();
    },

    onItemValueInput(itemId, value) {
      if (!this.currentSection || !this.cryptoKey) { return; }
      var state = this.getItemState(itemId);
      state.value = value;
      this.currentItems.set(itemId, state);

      var self = this;
      self._pendingItemSaves[itemId] = true;
      clearTimeout(self._itemSaveTimer);
      self._itemSaveTimer = setTimeout(function () {
        self._flushItemSaves();
      }, 1500);
    },

    async _flushItemSaves() {
      if (!this.currentSection || !this.cryptoKey) { return; }
      var ids = Object.keys(this._pendingItemSaves);
      this._pendingItemSaves = {};
      for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var state = this.currentItems.get(id);
        if (state) {
          await WizardChecklist.saveItemState(
            id, this.currentSection.id, state, this.cryptoKey
          );
        }
      }
      if (ids.length > 0) { this._showSaveStatus(); }
    },

    getItemState(itemId) {
      if (!this.currentItems) { return { checked: false, na: false, value: '' }; }
      var state = this.currentItems.get(itemId);
      return state || { checked: false, na: false, value: '' };
    },

    get sectionProgress() {
      if (!this.currentSection) { return { completed: 0, total: 0, percent: 0 }; }
      return this.currentSection.progress || { completed: 0, total: 0, percent: 0 };
    },

    // --- Platform Guided Setup ---

    getPlatforms() {
      return WizardContent.PLATFORMS;
    },

    navigateToPlatform(key) {
      var platform = WizardContent.PLATFORMS[key];
      if (!platform) { return; }
      this.currentPlatform = platform;
      this.platformTab = 'planning';
      this.platformStep = 0;
      this.view = 'platform';
    },

    backFromPlatform() {
      this.currentPlatform = null;
      this.platformTab = 'planning';
      this.platformStep = -1;
      this.view = 'dashboard';
    },

    // --- Vault Guided Setup ---

    getVaults() {
      return WizardContent.PASSWORD_MANAGERS;
    },

    navigateToVault(key) {
      var vault = WizardContent.PASSWORD_MANAGERS[key];
      if (!vault) { return; }
      this.currentVault = vault;
      this.vaultTab = 'planning';
      this.vaultStep = 0;
      this.view = 'vault';
    },

    backFromVault() {
      this.currentVault = null;
      this.vaultTab = 'planning';
      this.vaultStep = -1;
      this.view = 'dashboard';
    },

    // --- Guidance ---

    getStorageGuidance() {
      return WizardContent.STORAGE_GUIDANCE || { principle: '', locations: [], tips: [] };
    },

    getResourceCategories() {
      var resources = WizardContent.RESOURCES;
      if (!resources) { return []; }
      var labels = {
        foundation: 'Foundation',
        legal: 'Legal Resources',
        security: 'Security and Identity Protection',
        digitalEstateTools: 'Digital Estate Planning Tools',
        grief: 'Grief Support'
      };
      var categories = [];
      var keys = Object.keys(resources);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        categories.push({
          key: key,
          label: labels[key] || key,
          items: resources[key]
        });
      }
      return categories;
    },

    getEmotionalContext() {
      return WizardContent.EMOTIONAL_CONTEXT || { content: '', experiences: [], guidance: '', closingNote: '' };
    },

    getGuideVersion() {
      return WizardContent.GUIDE_VERSION || 'Unknown';
    },

    getGuideDate() {
      return WizardContent.GUIDE_DATE || 'Unknown';
    },

    // --- Settings ---

    confirmClearData() {
      this.showClearConfirm = true;
    },

    async clearAllData() {
      try {
        await WizardStorage.clearAllData();
        this.showClearConfirm = false;
        this.lock();
        this.isFirstTime = true;
        this.view = 'setup';
      } catch (e) {
        this.error = 'Failed to clear data: ' + e.message;
      }
    },

    // --- Save Status ---

    _showSaveStatus() {
      var self = this;
      self.saveStatus = 'Progress saved';
      clearTimeout(self._saveStatusTimer);
      self._saveStatusTimer = setTimeout(function () {
        self.saveStatus = '';
      }, 2500);
    },

    // --- Secure Bundle Export ---

    initExportView() {
      var allSections = WizardContent.getAllSections();
      var inc = {};
      for (var i = 0; i < allSections.length; i++) {
        inc[allSections[i].id] = true;
      }
      this.bundleIncludeSections = inc;
      this.bundleCustomMessage = '';
      this.bundlePassphrase = '';
      this.bundlePassphraseConfirm = '';
      this.bundleStrength = { score: 0, label: '', cls: '' };
      this.bundleGenerated = false;
      this.error = '';
      this.view = 'export';
    },

    updateBundleStrength() {
      var pp = this.bundlePassphrase;
      if (!pp || pp.length === 0) {
        this.bundleStrength = { score: 0, label: '', cls: '' };
        return;
      }
      var score = 0;
      if (pp.length >= 12) score++;
      if (pp.length >= 16) score++;
      if (pp.length >= 24) score++;
      if (/[a-z]/.test(pp) && /[A-Z]/.test(pp)) score++;
      if (/[0-9]/.test(pp)) score++;
      if (/[^a-zA-Z0-9]/.test(pp)) score++;
      var uniqueChars = new Set(pp).size;
      if (uniqueChars >= 8) score++;
      var labels = ['Weak', 'Weak', 'Fair', 'Fair', 'Good', 'Strong', 'Strong', 'Very Strong'];
      var classes = ['weak', 'weak', 'fair', 'fair', 'good', 'strong', 'strong', 'strong'];
      this.bundleStrength = { score: Math.min(score, 7), label: labels[score] || 'Weak', cls: classes[score] || 'weak' };
    },

    getBundleSelectedCount() {
      var count = 0;
      var keys = Object.keys(this.bundleIncludeSections);
      for (var i = 0; i < keys.length; i++) {
        if (this.bundleIncludeSections[keys[i]]) count++;
      }
      return count;
    },

    async generateSecureBundle() {
      this.error = '';
      this.bundleGenerated = false;

      if (this.getBundleSelectedCount() === 0) {
        this.error = 'Select at least one section to include in the bundle.';
        return;
      }
      if (this.bundlePassphrase.length < 12) {
        this.error = 'Bundle passphrase must be at least 12 characters.';
        return;
      }
      if (this.bundlePassphrase !== this.bundlePassphraseConfirm) {
        this.error = 'Passphrases do not match.';
        return;
      }
      if (!this.cryptoKey) { return; }

      this.isProcessing = true;

      try {
        var plainDoc = await this._buildPlainDocument();
        var bundleSalt = WizardCrypto.generateSalt();
        var bundleKey = await WizardCrypto.deriveKey(this.bundlePassphrase, bundleSalt);
        var encrypted = await WizardCrypto.encrypt(plainDoc, bundleKey);
        var saltB64 = WizardCrypto.saltToBase64(bundleSalt);
        var dateStr = new Date().toISOString().slice(0, 10);

        var bundleHtml = this._buildBundleHtml(encrypted.ciphertext, encrypted.iv, saltB64, dateStr);
        this._downloadFile(bundleHtml, 'digital-estate-bundle-' + dateStr + '.html', 'text/html');

        var instructionsHtml = this._buildInstructionsHtml(dateStr);
        this._downloadFile(instructionsHtml, 'executor-instructions-' + dateStr + '.html', 'text/html');

        this.bundleGenerated = true;
        this.bundlePassphrase = '';
        this.bundlePassphraseConfirm = '';
        this.bundleStrength = { score: 0, label: '', cls: '' };
      } catch (e) {
        this.error = 'Failed to generate bundle: ' + e.message;
      } finally {
        this.isProcessing = false;
      }
    },

    async _buildPlainDocument() {
      var allSections = WizardContent.getAllSections();
      var includeSections = this.bundleIncludeSections;
      var allData = {};
      var allNotes = {};

      for (var i = 0; i < allSections.length; i++) {
        var s = allSections[i];
        if (!includeSections[s.id]) continue;
        allData[s.id] = await WizardChecklist.loadSectionItems(s.id, this.cryptoKey);
        allNotes[s.id] = await WizardChecklist.loadSectionNotes(s.id, this.cryptoKey);
      }

      var esc = WizardUtils.escapeHtml;
      var h = [];
      h.push('<div class="confidential">Confidential -- For Digital Executor Use Only</div>');
      h.push('<h1>Digital Estate Plan</h1>');
      h.push('<div class="meta">Generated: ' + esc(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })) + ' | Guide Version: ' + esc(WizardContent.GUIDE_VERSION) + '</div>');

      if (this.bundleCustomMessage && this.bundleCustomMessage.trim()) {
        h.push('<div class="custom-message"><h2>Message from the Account Holder</h2>');
        h.push('<p>' + esc(this.bundleCustomMessage.trim()) + '</p></div>');
      }

      for (var si = 0; si < allSections.length; si++) {
        var section = allSections[si];
        if (!includeSections[section.id]) continue;
        var sectionItems = allData[section.id] || new Map();
        var sectionNotes = allNotes[section.id] || '';
        var progress = WizardChecklist.getSectionProgress(section.id, sectionItems);

        var hasAnyData = false;
        sectionItems.forEach(function (state) {
          if (state.checked || state.na || (state.value && state.value.trim())) { hasAnyData = true; }
        });
        if (!hasAnyData && !sectionNotes.trim()) { continue; }

        var pathLabel = section.path === 'a' ? 'Path A: Planning Ahead' : 'Path B: Navigating Loss';
        h.push('<h2>Section ' + esc(String(section.number)) + ': ' + esc(section.title) + '</h2>');
        h.push('<p class="section-meta">' + esc(pathLabel) + ' | ' + progress.completed + ' of ' + progress.total + ' items addressed</p>');

        for (var subi = 0; subi < section.subsections.length; subi++) {
          var sub = section.subsections[subi];
          h.push('<h3>' + esc(sub.title) + '</h3>');
          var cats = sub.categories || [{ items: sub.items, title: null }];
          for (var ci = 0; ci < cats.length; ci++) {
            var cat = cats[ci];
            if (cat.title) { h.push('<h4>' + esc(cat.title) + '</h4>'); }
            if (!cat.items) { continue; }
            for (var ii = 0; ii < cat.items.length; ii++) {
              var item = cat.items[ii];
              var state = sectionItems.get(item.id) || { checked: false, na: false, value: '' };
              if (!state.checked && !state.na && (!state.value || !state.value.trim())) { continue; }
              var cls = state.na ? 'item na' : (state.checked ? 'item done' : 'item');
              var status = state.na ? 'Not Applicable' : (state.checked ? 'Complete' : 'In Progress');
              h.push('<div class="' + cls + '">');
              h.push('<div class="item-label">' + esc(item.text) + ' <span class="item-status">' + esc(status) + '</span></div>');
              if (state.value && state.value.trim()) {
                h.push('<div class="item-value">' + esc(state.value) + '</div>');
              }
              h.push('</div>');
            }
          }
        }
        if (sectionNotes.trim()) {
          h.push('<div class="notes"><strong>Notes:</strong><br>' + esc(sectionNotes) + '</div>');
        }
      }
      h.push('<div class="confidential" style="margin-top:3rem">End of Document</div>');
      return h.join('\n');
    },

    _buildBundleHtml(ciphertext, iv, salt, dateStr) {
      return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        + '<title>Encrypted Digital Estate Plan -- ' + dateStr + '</title>\n'
        + '<style>\n'
        + '*{box-sizing:border-box}body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:2rem 1.5rem;color:#222;line-height:1.6;background:#fafafa}\n'
        + '.unlock-box{max-width:420px;margin:4rem auto;padding:2rem;border:2px solid #333;border-radius:8px;background:#fff;text-align:center}\n'
        + '.unlock-box h1{font-size:1.4rem;margin-bottom:0.5rem}\n'
        + '.unlock-box p{font-size:0.9rem;color:#555;margin-bottom:1.5rem}\n'
        + '.unlock-box input{width:100%;padding:0.7rem;font-size:1rem;border:1px solid #ccc;border-radius:4px;margin-bottom:1rem}\n'
        + '.unlock-box button{width:100%;padding:0.7rem;font-size:1rem;background:#2d2a2e;color:#fff;border:none;border-radius:4px;cursor:pointer}\n'
        + '.unlock-box button:hover{background:#444}\n'
        + '.error{color:#c33;font-size:0.85rem;margin-bottom:1rem}\n'
        + '.confidential{text-align:center;color:#c33;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:1rem 0;font-size:0.85rem}\n'
        + '.custom-message{background:#f5f5f0;border:1px solid #ddd;border-left:3px solid #6a9;border-radius:0 6px 6px 0;padding:1rem 1.25rem;margin:1.5rem 0}\n'
        + '.custom-message h2{font-size:1.1rem;margin:0 0 0.5rem;color:#444}\n'
        + '.custom-message p{margin:0;font-size:0.95rem;white-space:pre-wrap}\n'
        + '.meta{color:#666;font-size:0.85rem;margin-bottom:2rem}\n'
        + '.section-meta{color:#666;font-size:0.85rem}\n'
        + 'h2{font-size:1.25rem;margin-top:2.5rem;color:#444;border-bottom:1px solid #ccc;padding-bottom:0.3rem}\n'
        + 'h3{font-size:1.05rem;margin-top:1.5rem;color:#555}\n'
        + 'h4{font-size:0.95rem;margin-top:1rem;color:#666}\n'
        + '.item{margin:0.4rem 0;padding:0.5rem 0.75rem;border-left:3px solid #ddd;background:#fff}\n'
        + '.item.done{border-left-color:#6a9;background:#f0f7f0}\n'
        + '.item.na{border-left-color:#ccc;opacity:0.6;font-style:italic}\n'
        + '.item-label{font-weight:600;font-size:0.9rem}\n'
        + '.item-status{font-weight:400;font-size:0.75rem;color:#888;text-transform:uppercase;letter-spacing:0.04em;margin-left:0.5rem}\n'
        + '.item-value{margin-top:0.25rem;font-size:0.9rem;color:#333;padding-left:0.5rem;border-left:2px solid #e0e0e0}\n'
        + '.notes{margin-top:1rem;padding:0.75rem 1rem;background:#f5f5f0;border:1px solid #ddd;border-radius:4px;font-size:0.9rem;white-space:pre-wrap}\n'
        + '.trust{text-align:center;font-size:0.75rem;color:#999;margin-top:3rem;padding-top:1rem;border-top:1px solid #eee}\n'
        + '@media print{body{max-width:none;margin:0;padding:1cm}.unlock-box{display:none}.item{break-inside:avoid}}\n'
        + '</style></head><body>\n'
        + '<div id="lock"><div class="unlock-box">\n'
        + '<h1>Encrypted Digital Estate Plan</h1>\n'
        + '<p>This file contains an encrypted digital estate plan. Enter the bundle passphrase to decrypt and view the contents.</p>\n'
        + '<p style="font-size:0.8rem;color:#888">AES-256-GCM encrypted. All decryption happens in this browser. No data is sent anywhere.</p>\n'
        + '<div id="err" class="error" style="display:none"></div>\n'
        + '<input type="password" id="pp" placeholder="Bundle passphrase" autocomplete="off" autofocus>\n'
        + '<button onclick="doUnlock()">Decrypt</button>\n'
        + '</div></div>\n'
        + '<div id="content" style="display:none"></div>\n'
        + '<div class="trust" id="trust" style="display:none">Decrypted locally in your browser. No data was transmitted. Generated by Circle 6 Systems Digital Estate Planning Wizard.</div>\n'
        + '<script>\n'
        + 'var CIPHER="' + ciphertext + '";\n'
        + 'var IV="' + iv + '";\n'
        + 'var SALT="' + salt + '";\n'
        + 'var ITERATIONS=600000;\n'
        + 'function b64toArr(b){var s=atob(b),a=new Uint8Array(s.length);for(var i=0;i<s.length;i++)a[i]=s.charCodeAt(i);return a}\n'
        + 'async function doUnlock(){\n'
        + 'var pp=document.getElementById("pp").value;\n'
        + 'if(!pp){document.getElementById("err").style.display="block";document.getElementById("err").textContent="Please enter the passphrase.";return}\n'
        + 'try{\n'
        + 'var enc=new TextEncoder();\n'
        + 'var base=await crypto.subtle.importKey("raw",enc.encode(pp),"PBKDF2",false,["deriveKey"]);\n'
        + 'var key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:b64toArr(SALT),iterations:ITERATIONS,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);\n'
        + 'var plain=await crypto.subtle.decrypt({name:"AES-GCM",iv:b64toArr(IV)},key,b64toArr(CIPHER));\n'
        + 'var text=new TextDecoder().decode(plain);\n'
        + 'document.getElementById("lock").style.display="none";\n'
        + 'document.getElementById("content").style.display="block";\n'
        + 'document.getElementById("content").innerHTML=text;\n'
        + 'document.getElementById("trust").style.display="block";\n'
        + '}catch(e){\n'
        + 'document.getElementById("err").style.display="block";\n'
        + 'document.getElementById("err").textContent="Incorrect passphrase. Please try again.";\n'
        + '}}\n'
        + 'document.getElementById("pp").addEventListener("keydown",function(e){if(e.key==="Enter")doUnlock()});\n'
        + '</script></body></html>';
    },

    _buildInstructionsHtml(dateStr) {
      var esc = WizardUtils.escapeHtml;
      var loc = this.bundleLocation ? esc(this.bundleLocation) : '[TO BE FILLED IN]';
      var pLoc = this.passphraseLocation ? esc(this.passphraseLocation) : '[TO BE FILLED IN]';

      return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n'
        + '<title>Digital Estate Plan -- Executor Access Instructions</title>\n'
        + '<style>\n'
        + 'body{font-family:Georgia,serif;max-width:700px;margin:0 auto;padding:2rem 1.5rem;color:#222;line-height:1.7}\n'
        + 'h1{font-size:1.5rem;border-bottom:2px solid #333;padding-bottom:0.5rem}\n'
        + 'h2{font-size:1.15rem;margin-top:2rem;color:#444}\n'
        + '.important{background:#fff3cd;border:1px solid #e6c200;padding:1rem 1.25rem;border-radius:6px;margin:1.5rem 0}\n'
        + '.important strong{color:#856404}\n'
        + '.fill-in{display:inline-block;min-width:200px;border-bottom:2px solid #333;padding:0.1rem 0.25rem;font-weight:600}\n'
        + '.steps{counter-reset:step}\n'
        + '.steps li{counter-increment:step;margin-bottom:1rem;padding-left:0.5rem}\n'
        + '.steps li::marker{content:counter(step) ". ";font-weight:600}\n'
        + '.footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #ccc;font-size:0.8rem;color:#888;text-align:center}\n'
        + '@media print{body{max-width:none;margin:0;padding:1.5cm}}\n'
        + '</style></head><body>\n'
        + '<h1>Digital Estate Plan -- Executor Access Instructions</h1>\n'
        + '<p>Date prepared: ' + esc(dateStr) + '</p>\n'
        + '<p>This document is intended for the person designated as the Digital Executor of the estate. It contains instructions for accessing an encrypted digital estate plan.</p>\n'
        + '<div class="important"><strong>Important:</strong> This document does not contain the passphrase needed to decrypt the estate plan. The passphrase and the encrypted file are stored in separate locations for security. You need both to access the plan.</div>\n'
        + '<h2>What Is the Encrypted Bundle?</h2>\n'
        + '<p>The encrypted bundle is a single HTML file that contains a comprehensive inventory of the deceased\'s digital accounts, services, passwords, and instructions. It is protected by AES-256-GCM encryption, the same standard used by governments and financial institutions. The file can only be read by entering the correct passphrase.</p>\n'
        + '<h2>Where to Find What You Need</h2>\n'
        + '<table style="width:100%;border-collapse:collapse;margin:1rem 0">\n'
        + '<tr style="border-bottom:1px solid #ccc"><td style="padding:0.5rem;font-weight:600">Encrypted bundle file:</td><td style="padding:0.5rem"><span class="fill-in">' + loc + '</span></td></tr>\n'
        + '<tr style="border-bottom:1px solid #ccc"><td style="padding:0.5rem;font-weight:600">Passphrase location:</td><td style="padding:0.5rem"><span class="fill-in">' + pLoc + '</span></td></tr>\n'
        + '</table>\n'
        + '<h2>How to Open the Encrypted Bundle</h2>\n'
        + '<ol class="steps">\n'
        + '<li>Retrieve the encrypted bundle file from the location listed above. The file is named <strong>digital-estate-bundle-' + esc(dateStr) + '.html</strong></li>\n'
        + '<li>Retrieve the passphrase from the separate location listed above.</li>\n'
        + '<li>Open the bundle file in any modern web browser (Chrome, Firefox, Safari, or Edge). Simply double-click the file or drag it into a browser window.</li>\n'
        + '<li>You will see a passphrase entry screen. Enter the passphrase exactly as written, including any spaces or special characters.</li>\n'
        + '<li>The decrypted estate plan will appear in your browser. No internet connection is required. No data is sent anywhere -- all decryption happens on your device.</li>\n'
        + '<li>You may print the decrypted document for your records using your browser\'s print function (Ctrl+P or Cmd+P).</li>\n'
        + '</ol>\n'
        + '<h2>If the Passphrase Does Not Work</h2>\n'
        + '<ul>\n'
        + '<li>Ensure you are entering the passphrase exactly, including capitalization and special characters.</li>\n'
        + '<li>Check for extra spaces before or after the passphrase.</li>\n'
        + '<li>There is no recovery mechanism. If the passphrase is lost, the encrypted bundle cannot be opened.</li>\n'
        + '</ul>\n'
        + '<h2>Security Notes</h2>\n'
        + '<ul>\n'
        + '<li>The bundle file itself is safe to store digitally -- even if someone obtains the file, they cannot read it without the passphrase.</li>\n'
        + '<li>Do not store the passphrase and the bundle file in the same location.</li>\n'
        + '<li>After you have completed your duties as Digital Executor, securely delete the bundle file and destroy the passphrase.</li>\n'
        + '</ul>\n'
        + '<div class="footer">Generated by Circle 6 Systems Digital Estate Planning Wizard<br>This document should be stored with estate papers or provided to the designated Digital Executor.</div>\n'
        + '</body></html>';
    },

    _downloadFile(content, filename, mimeType) {
      var blob = new Blob([content], { type: mimeType });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    // --- Helpers for Templates ---
    get isAuthed() {
      return this.cryptoKey !== null;
    }
  }));
});
