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
    passphraseStrength: { score: 0, label: '', cls: '' },
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
    expandedCategories: {},
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
    accessKitLocation: '',
    includePassphraseOnKit: false,
    bundleGenerated: false,
    bundleCustomMessage: '',
    bundleIncludeSections: {},
    bundleStrength: { score: 0, label: '', cls: '' },

    // Bundle import
    importStep: '',
    importBundleData: null,
    importDecryptedData: null,
    importBundlePassphrase: '',
    importNewPassphrase: '',
    importNewPassphraseConfirm: '',
    importProgress: '',
    importResult: null,
    importError: '',
    importIsLegacy: false,
    importHasExisting: false,

    // Browser data import
    dataImportStep: '',
    dataImportFile: null,
    dataImportResult: null,
    dataImportError: '',

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
        await this._loadLockout();
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

      if (this._isWeakPassphrase(this.passphrase)) {
        this.error = 'This passphrase is too weak. It is the only thing protecting your data, and there is no reset. Use a longer passphrase, or mix in upper and lower case, numbers, or symbols. Avoid common words and simple sequences.';
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
          await this._persistLockout();
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
        await this._persistLockout();

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
      this.expandedCategories = {};
      this.checklistData = {};
      this.sections = [];
      this.pathFilter = 'all';
      this.currentPlatform = null;
      this.platformTab = 'planning';
      this.platformStep = -1;
      this.currentVault = null;
      this.vaultTab = 'planning';
      this.vaultStep = -1;

      // Reset export, import, and settings state
      this.bundlePassphrase = '';
      this.bundlePassphraseConfirm = '';
      this.bundleLocation = '';
      this.passphraseLocation = '';
      this.accessKitLocation = '';
      this.includePassphraseOnKit = false;
      this.bundleGenerated = false;
      this.dataImportStep = '';
      this.dataImportFile = null;
      this.dataImportResult = null;
      this.dataImportError = '';
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

    // Persist the failed-attempt backoff so it survives a page reload (#95).
    // These are a counter and a timestamp only - no sensitive data. The real
    // protection is passphrase entropy + PBKDF2; this backoff is a speed bump.
    async _loadLockout() {
      try {
        this._failedAttempts = parseInt(await WizardStorage.getMeta('failedAttempts'), 10) || 0;
        this._lockoutUntil = parseInt(await WizardStorage.getMeta('lockoutUntil'), 10) || 0;
      } catch (_) { /* first run / no meta yet */ }
    },

    async _persistLockout() {
      try {
        await WizardStorage.setMeta('failedAttempts', String(this._failedAttempts));
        await WizardStorage.setMeta('lockoutUntil', String(this._lockoutUntil));
      } catch (_) { /* non-fatal */ }
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
          guideline: s.guideline || '',
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
      this._autoExpandFirstIncomplete();
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
      this._advanceIfCategoryComplete(itemId);
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

    toggleCategory(categoryKey) {
      if (this.expandedCategories[categoryKey]) {
        delete this.expandedCategories[categoryKey];
      } else {
        this.expandedCategories = {};
        this.expandedCategories[categoryKey] = true;
      }
    },

    isCategoryExpanded(categoryKey) {
      return !!this.expandedCategories[categoryKey];
    },

    getCategoryProgress(category) {
      if (!category.items || !this.currentItems) { return { completed: 0, total: 0 }; }
      var total = category.items.length;
      var completed = 0;
      for (var i = 0; i < category.items.length; i++) {
        var state = this.currentItems.get(category.items[i].id);
        if (state && (state.checked || state.na)) { completed++; }
      }
      return { completed: completed, total: total };
    },

    _autoExpandFirstIncomplete() {
      this.expandedCategories = {};
      if (!this.currentSection || !this.currentItems) { return; }

      var found = false;
      var subsections = this.currentSection.subsections || [];
      for (var si = 0; si < subsections.length; si++) {
        var cats = subsections[si].categories || [];
        for (var ci = 0; ci < cats.length; ci++) {
          var cat = cats[ci];
          if (!cat.title) { continue; }
          var catKey = cat.id || cat.title || 'default';
          var progress = this.getCategoryProgress(cat);
          if (progress.completed < progress.total) {
            this.expandedCategories[catKey] = true;
            found = true;
            break;
          }
        }
        if (found) { break; }
      }

      if (!found && subsections.length > 0) {
        var firstCats = subsections[0].categories || [];
        if (firstCats.length > 0 && firstCats[0].title) {
          this.expandedCategories[firstCats[0].id || firstCats[0].title || 'default'] = true;
        }
      }
    },

    _advanceIfCategoryComplete(itemId) {
      if (!this.currentSection) { return; }
      var subsections = this.currentSection.subsections || [];
      var allCats = [];
      for (var si = 0; si < subsections.length; si++) {
        var cats = subsections[si].categories || [];
        for (var ci = 0; ci < cats.length; ci++) {
          if (cats[ci].title) { allCats.push(cats[ci]); }
        }
      }

      var currentIdx = -1;
      for (var i = 0; i < allCats.length; i++) {
        var items = allCats[i].items || [];
        for (var j = 0; j < items.length; j++) {
          if (items[j].id === itemId) { currentIdx = i; break; }
        }
        if (currentIdx >= 0) { break; }
      }

      if (currentIdx < 0) { return; }
      var progress = this.getCategoryProgress(allCats[currentIdx]);
      if (progress.completed < progress.total) { return; }

      for (var ni = currentIdx + 1; ni < allCats.length; ni++) {
        var nextProgress = this.getCategoryProgress(allCats[ni]);
        if (nextProgress.completed < nextProgress.total) {
          var nextKey = allCats[ni].id || allCats[ni].title || 'default';
          this.expandedCategories = {};
          this.expandedCategories[nextKey] = true;
          return;
        }
      }
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

    // Shared passphrase scorer (used by the primary vault + bundle export).
    _scorePassphrase(pp) {
      if (!pp || pp.length === 0) return { score: 0, label: '', cls: '' };
      var score = 0;
      if (pp.length >= 12) score++;
      if (pp.length >= 16) score++;
      if (pp.length >= 24) score++;
      if (/[a-z]/.test(pp) && /[A-Z]/.test(pp)) score++;
      if (/[0-9]/.test(pp)) score++;
      if (/[^a-zA-Z0-9]/.test(pp)) score++;
      if (new Set(pp).size >= 8) score++;
      var labels = ['Weak', 'Weak', 'Fair', 'Fair', 'Good', 'Strong', 'Strong', 'Very Strong'];
      var classes = ['weak', 'weak', 'fair', 'fair', 'good', 'strong', 'strong', 'strong'];
      return { score: Math.min(score, 7), label: labels[score] || 'Weak', cls: classes[score] || 'weak' };
    },

    // True when a passphrase is too weak to protect the vault against an offline
    // attacker who copies IndexedDB. Catches short, low-score, common, all-same,
    // and mostly-sequential passphrases (a sequential run like "123456789012"
    // scores "Fair" but is trivially guessable). See issue #93.
    _isWeakPassphrase(pp) {
      if (!pp || pp.length < 12) return true;
      var lower = pp.toLowerCase();
      var COMMON = ['password', '123456789', '1234567890', 'qwertyuiop', 'letmein',
        'iloveyou', 'admin', 'welcome', 'passphrase', 'changeme'];
      for (var i = 0; i < COMMON.length; i++) {
        if (lower.indexOf(COMMON[i]) !== -1) return true;
      }
      if (/^(.)\1+$/.test(pp)) return true; // all one character
      // Mostly-sequential (each char +/-1 from the previous), e.g. abcdef / 123456.
      var seq = 0;
      for (var j = 1; j < pp.length; j++) {
        var d = pp.charCodeAt(j) - pp.charCodeAt(j - 1);
        if (d === 1 || d === -1) seq++;
      }
      if (seq / (pp.length - 1) >= 0.7) return true;
      return this._scorePassphrase(pp).score < 3;
    },

    updatePassphraseStrength() {
      this.passphraseStrength = this._scorePassphrase(this.passphrase);
    },

    updateBundleStrength() {
      this.bundleStrength = this._scorePassphrase(this.bundlePassphrase);
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

        var bundleHtml = await this._buildBundleHtml(encrypted.ciphertext, encrypted.iv, saltB64, dateStr);
        this._downloadFile(bundleHtml, 'digital-estate-bundle-' + dateStr + '.html', 'text/html');

        var instructionsHtml = this._buildInstructionsHtml(dateStr);
        this._downloadFile(instructionsHtml, 'executor-instructions-' + dateStr + '.html', 'text/html');

        var accessKitHtml = this._buildAccessKitHtml(dateStr, this.includePassphraseOnKit ? this.bundlePassphrase : null);
        this._downloadFile(accessKitHtml, 'access-kit-' + dateStr + '.html', 'text/html');

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
      var dataSections = {};

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
        var sectionDataItems = {};
        sectionItems.forEach(function (state, itemId) {
          if (state.checked || state.na || (state.value && state.value.trim())) {
            hasAnyData = true;
            sectionDataItems[itemId] = { checked: !!state.checked, na: !!state.na, value: state.value || '' };
          }
        });
        if (!hasAnyData && !sectionNotes.trim()) { continue; }

        dataSections[section.id] = { items: sectionDataItems, notes: sectionNotes.trim() };

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

      return JSON.stringify({
        v: 2,
        html: h.join('\n'),
        data: {
          exportedAt: new Date().toISOString(),
          guideVersion: WizardContent.GUIDE_VERSION,
          sections: dataSections
        }
      });
    },

    async _buildBundleHtml(ciphertext, iv, salt, dateStr) {
      // The decrypt/render logic runs as a single inline <script>. We pin it with
      // a CSP sha256 source hash so ONLY this exact script may run: any markup that
      // a hand-crafted (malicious) bundle smuggles into the decrypted payload and
      // that reaches innerHTML -- e.g. <img onerror=...> or an injected <script> --
      // is blocked, because inline event handlers and foreign scripts are not
      // 'unsafe-inline' here. See issue #92.
      var scriptBody = '\n'
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
        + 'try{var p=JSON.parse(text);text=p.html||text}catch(_){}\n'
        + 'document.getElementById("lock").style.display="none";\n'
        + 'document.getElementById("content").style.display="block";\n'
        + 'document.getElementById("content").innerHTML=text;\n'
        + 'document.getElementById("trust").style.display="block";\n'
        + '}catch(e){\n'
        + 'document.getElementById("err").style.display="block";\n'
        + 'document.getElementById("err").textContent="Incorrect passphrase. Please try again.";\n'
        + '}}\n'
        + 'document.getElementById("go").addEventListener("click",doUnlock);\n'
        + 'document.getElementById("pp").addEventListener("keydown",function(e){if(e.key==="Enter")doUnlock()});\n';
      var hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(scriptBody));
      var hashB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuf)));
      var csp = "default-src 'none'; script-src 'sha256-" + hashB64 + "'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none';";
      return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n'
        + '<meta http-equiv="Content-Security-Policy" content="' + csp + '">\n'
        + '<meta http-equiv="X-Content-Type-Options" content="nosniff">\n'
        + '<meta name="referrer" content="no-referrer">\n'
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
        + '<button id="go" type="button">Decrypt</button>\n'
        + '</div></div>\n'
        + '<div id="content" style="display:none"></div>\n'
        + '<div class="trust" id="trust" style="display:none">Decrypted locally in your browser. No data was transmitted. Generated by Circle 6 Systems Digital Estate Planning Wizard.</div>\n'
        + '<script>' + scriptBody + '</scr' + 'ipt></body></html>';
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

    _buildAccessKitHtml(dateStr, passphrase) {
      var esc = WizardUtils.escapeHtml;
      var bundleLoc = this.bundleLocation ? esc(this.bundleLocation) : '[not specified]';
      var kitLoc = this.accessKitLocation ? esc(this.accessKitLocation) : null;
      var hasPassphrase = passphrase && passphrase.length > 0;

      var html = '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
        + '<title>Digital Estate Plan -- Access Kit</title>\n'
        + '<style>\n'
        + '*{box-sizing:border-box}\n'
        + 'body{font-family:Georgia,serif;max-width:700px;margin:0 auto;padding:2rem 1.5rem;color:#222;line-height:1.6}\n'
        + 'h1{font-size:1.35rem;text-align:center;margin-bottom:0.25rem}\n'
        + '.date{text-align:center;font-size:0.85rem;color:#666;margin-bottom:1.5rem}\n'
        + '.intro{font-size:0.95rem;margin-bottom:1.5rem;line-height:1.7;border-bottom:1px solid #ddd;padding-bottom:1.25rem}\n'
        + '.info-box{background:#f8f8f4;border:2px solid #333;border-radius:6px;padding:1rem 1.25rem;margin-bottom:1.25rem;text-align:center}\n'
        + '.info-box .label{font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:#555;margin-bottom:0.4rem;font-weight:600}\n'
        + '.info-box .value{font-size:1rem;padding:0.5rem;background:#fff;border:1px solid #ddd;border-radius:4px}\n'
        + '.passphrase-value{font-family:"Courier New",Courier,monospace;font-size:1.1rem;font-weight:700;letter-spacing:0.04em;word-break:break-all}\n'
        + '.handwrite-line{display:block;width:100%;border:none;border-bottom:2px solid #333;background:transparent;font-size:1.1rem;padding:0.5rem 0.25rem;margin-top:0.25rem;font-family:"Courier New",Courier,monospace}\n'
        + '.location-box{background:#f5f5f0;border:1px solid #ddd;border-radius:6px;padding:0.85rem 1.1rem;margin-bottom:1.25rem}\n'
        + '.location-box .label{font-weight:600;font-size:0.85rem;margin-bottom:0.25rem}\n'
        + '.location-box .value{font-size:0.95rem}\n'
        + '.location-box .filename{font-size:0.8rem;color:#666;margin-top:0.25rem;font-family:"Courier New",Courier,monospace}\n'
        + 'h2{font-size:1.1rem;margin-top:1.5rem;margin-bottom:0.5rem;color:#333}\n'
        + '.steps{counter-reset:step;padding-left:0;margin:0}\n'
        + '.steps li{counter-increment:step;margin-bottom:0.65rem;padding-left:2.2rem;list-style:none;position:relative;font-size:0.95rem;line-height:1.5}\n'
        + '.steps li::before{content:counter(step);position:absolute;left:0;top:0.1rem;width:1.5rem;height:1.5rem;background:#333;color:#fff;border-radius:50%;text-align:center;font-size:0.8rem;line-height:1.5rem;font-weight:600}\n'
        + '.help{font-size:0.88rem;margin-top:1.25rem}\n'
        + '.help ul{padding-left:1.25rem;margin:0.4rem 0}\n'
        + '.help li{margin-bottom:0.25rem;line-height:1.5}\n'
        + '.security{font-size:0.82rem;color:#555;margin-top:1.5rem;padding-top:0.75rem;border-top:1px solid #ddd;line-height:1.6}\n'
        + '.footer{text-align:center;font-size:0.75rem;color:#999;margin-top:1rem;padding-top:0.5rem;border-top:1px solid #eee}\n'
        + '@media print{body{max-width:none;margin:0;padding:1.5cm}.info-box{break-inside:avoid}}\n'
        + '</style></head><body>\n'
        + '<h1>Digital Estate Plan -- Access Kit</h1>\n'
        + '<div class="date">Prepared ' + esc(dateStr) + '</div>\n'
        + '<div class="intro">'
        + 'If you are reading this, someone you care about prepared this document to help you during a difficult time. '
        + 'This page contains what you need to access their digital estate plan -- a guide they created to help you manage their online accounts, subscriptions, files, and other digital matters.<br><br>'
        + 'There is no urgency. Take your time, and know that this was prepared with care so you would not have to figure it out alone.'
        + '</div>\n';

      if (hasPassphrase) {
        html += '<div class="info-box">\n'
          + '<div class="label">Passphrase to Unlock the Plan</div>\n'
          + '<div class="value passphrase-value">' + esc(passphrase) + '</div>\n'
          + '</div>\n';
      } else {
        html += '<div class="info-box">\n'
          + '<div class="label">Passphrase to Unlock the Plan</div>\n'
          + '<div class="value"><input type="text" class="handwrite-line" aria-label="Write passphrase here" placeholder="(write passphrase here by hand)"></div>\n'
          + '</div>\n';
      }

      html += '<div class="location-box">\n'
        + '<div class="label">Where to find the encrypted file:</div>\n'
        + '<div class="value">' + bundleLoc + '</div>\n'
        + '<div class="filename">File name: digital-estate-bundle-' + esc(dateStr) + '.html</div>\n'
        + '</div>\n';

      html += '<h2>How to Open the Plan</h2>\n'
        + '<ol class="steps">\n'
        + '<li>Find the encrypted file at the location above. It is a single file ending in <strong>.html</strong></li>\n'
        + '<li>Open the file in any web browser (Chrome, Firefox, Safari, or Edge). You can double-click the file, or drag it into a browser window. No internet connection is needed.</li>\n'
        + '<li>When you see the passphrase screen, type in the passphrase shown above exactly as written, including any capital letters, numbers, or special characters.</li>\n'
        + '<li>The plan will appear on screen. You can print it from your browser using File &gt; Print, or press Ctrl+P on Windows or Cmd+P on Mac.</li>\n'
        + '</ol>\n';

      html += '<div class="help">\n'
        + '<strong>If the passphrase is not working:</strong>\n'
        + '<ul>\n'
        + '<li>Check that every character matches exactly -- capitalization, spaces, and special characters all matter</li>\n'
        + '<li>Make sure there are no extra spaces before or after the passphrase</li>\n'
        + '<li>Try a different web browser if the first one does not work</li>\n'
        + '</ul>\n'
        + '</div>\n';

      html += '<div class="security">\n'
        + '<strong>About this document:</strong> '
        + 'This access kit should be kept in a secure location'
        + (hasPassphrase ? ' because it contains the passphrase needed to unlock the digital estate plan' : '') + '. '
        + 'If both this document and the passphrase are lost, the encrypted file cannot be opened -- there is no recovery mechanism. '
        + 'After the digital estate has been fully settled, this document should be securely destroyed and the encrypted file deleted.';

      if (kitLoc) {
        html += '<br><br><strong>This document is stored at:</strong> ' + kitLoc;
      }

      html += '\n</div>\n';

      html += '<div class="footer">'
        + 'Prepared ' + esc(dateStr) + ' using the Circle 6 Systems Digital Estate Planning Wizard<br>'
        + 'A free Trust &amp; Safety resource -- created in memory of Daniel Records'
        + '</div>\n'
        + '</body></html>';

      return html;
    },

    // --- Bundle Import ---

    startImport() {
      this.importStep = 'select';
      this.importBundleData = null;
      this.importDecryptedData = null;
      this.importBundlePassphrase = '';
      this.importNewPassphrase = '';
      this.importNewPassphraseConfirm = '';
      this.importProgress = '';
      this.importResult = null;
      this.importError = '';
      this.importIsLegacy = false;
      this.importHasExisting = false;
      this.view = 'import';
    },

    onImportFileSelected(event) {
      var self = this;
      self.importError = '';
      var file = event.target.files && event.target.files[0];
      if (!file) { return; }

      // Guard against a multi-GB file exhausting memory on readAsText (#94);
      // matches the 10MB cap the browser-data import path already enforces.
      if (file.size > 10 * 1024 * 1024) {
        self.importError = 'This file is too large to be a Digital Estate Plan bundle (10 MB limit). Please select the encrypted HTML file that was generated by the Export Bundle feature.';
        return;
      }

      var reader = new FileReader();
      reader.onload = function () {
        var extracted = self._extractBundleData(reader.result);
        if (!extracted) {
          self.importError = 'This file does not appear to be a Digital Estate Plan bundle. Please select the encrypted HTML file that was generated by the Export Bundle feature.';
          return;
        }
        self.importBundleData = extracted;
        self.importStep = 'decrypt';
      };
      reader.onerror = function () {
        self.importError = 'Could not read the selected file. Please try again.';
      };
      reader.readAsText(file);
    },

    _extractBundleData(htmlString) {
      var c = htmlString.match(/var CIPHER="([^"]+)"/);
      var i = htmlString.match(/var IV="([^"]+)"/);
      var s = htmlString.match(/var SALT="([^"]+)"/);
      var it = htmlString.match(/var ITERATIONS=(\d+)/);
      if (!c || !i || !s) { return null; }
      return {
        ciphertext: c[1],
        iv: i[1],
        salt: s[1],
        iterations: parseInt(it ? it[1] : '600000', 10)
      };
    },

    async decryptBundle() {
      this.importError = '';
      if (!this.importBundlePassphrase) {
        this.importError = 'Please enter the bundle passphrase.';
        return;
      }
      this.isProcessing = true;

      try {
        var bundleKey = await WizardCrypto.deriveKey(this.importBundlePassphrase, this.importBundleData.salt);
        var plaintext = await WizardCrypto.decrypt(this.importBundleData.ciphertext, this.importBundleData.iv, bundleKey);
        this.importBundlePassphrase = '';

        var parsed;
        try {
          parsed = JSON.parse(plaintext);
        } catch (_e) {
          parsed = null;
        }

        if (parsed && parsed.v === 2 && parsed.data && parsed.data.sections) {
          this.importDecryptedData = parsed.data;
          this.importStep = 'passphrase';
        } else {
          this.importIsLegacy = true;
          this.importStep = 'legacy';
        }
      } catch (_e) {
        this.importError = 'Incorrect passphrase. Please try again.';
      } finally {
        this.isProcessing = false;
      }
    },

    async setImportPassphrase() {
      this.importError = '';
      if (this.importNewPassphrase.length < 12) {
        this.importError = 'Passphrase must be at least 12 characters.';
        return;
      }
      if (this.importNewPassphrase !== this.importNewPassphraseConfirm) {
        this.importError = 'Passphrases do not match.';
        return;
      }
      this.isProcessing = true;

      try {
        this.importHasExisting = await WizardStorage.hasPassphrase();
        if (this.importHasExisting) {
          this.importStep = 'confirm';
        } else {
          await this._executeRestore();
        }
      } catch (e) {
        this.importError = 'Failed to check existing data: ' + e.message;
      } finally {
        this.isProcessing = false;
      }
    },

    async confirmRestore() {
      this.isProcessing = true;
      try {
        await this._executeRestore();
      } finally {
        this.isProcessing = false;
      }
    },

    async _executeRestore() {
      this.importStep = 'restoring';
      this.importError = '';

      try {
        await WizardStorage.clearAllData();

        var keySalt = WizardCrypto.generateSalt();
        var hashSalt = WizardCrypto.generateSalt();
        var cryptoKey = await WizardCrypto.deriveKey(this.importNewPassphrase, keySalt);
        var hash = await WizardCrypto.hashPassphrase(this.importNewPassphrase, hashSalt);

        await WizardStorage.setPassphraseData(
          WizardCrypto.saltToBase64(keySalt),
          WizardCrypto.saltToBase64(hashSalt),
          hash
        );

        this.cryptoKey = cryptoKey;
        this.importNewPassphrase = '';
        this.importNewPassphraseConfirm = '';

        var self = this;
        var result = await WizardChecklist.restoreFromBundle(
          this.importDecryptedData,
          cryptoKey,
          function (current, total) {
            self.importProgress = 'Restoring section ' + current + ' of ' + total + '...';
          }
        );

        this.importResult = result;
        this.importDecryptedData = null;
        this.importStep = 'done';
      } catch (e) {
        this.importError = 'Restoration failed: ' + e.message;
        this.importStep = 'passphrase';
      }
    },

    cancelImport() {
      this.importBundleData = null;
      this.importDecryptedData = null;
      this.importBundlePassphrase = '';
      this.importNewPassphrase = '';
      this.importNewPassphraseConfirm = '';
      this.importError = '';
      this.view = 'loading';
      this.init();
    },

    async completeImport() {
      await this._loadDashboard();
      this.view = 'dashboard';
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

    // --- Browser Data Import ---

    startDataImport() {
      this.dataImportStep = 'select';
      this.dataImportFile = null;
      this.dataImportResult = null;
      this.dataImportError = '';
      this.view = 'data-import';
    },

    onDataImportFileSelected(event) {
      var file = event.target.files && event.target.files[0];
      if (!file) { return; }
      this.dataImportFile = file;
      this.dataImportStep = 'parsing';
      this.dataImportError = '';

      var self = this;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var result = WizardImport.parseFile(reader.result, file.name);
          if (result.records.length === 0) {
            self.dataImportError = result.errors.length > 0
              ? result.errors[0]
              : 'No accounts found in this file. The file may be empty or in an unrecognized format.';
            self.dataImportStep = 'select';
            return;
          }
          WizardImportMatcher.matchAll(result.records);
          for (var i = 0; i < result.records.length; i++) {
            result.records[i].userAction = result.records[i].matchConfidence > 0 ? 'accept' : 'skip';
          }
          self.dataImportResult = result;
          self.dataImportStep = 'review';
        } catch (e) {
          self.dataImportError = 'Failed to parse file: ' + e.message;
          self.dataImportStep = 'select';
        }
      };
      reader.onerror = function () {
        self.dataImportError = 'Could not read the file. Please try again.';
        self.dataImportStep = 'select';
      };
      reader.readAsText(file);
    },

    cancelDataImport() {
      this.dataImportStep = '';
      this.dataImportFile = null;
      this.dataImportResult = null;
      this.dataImportError = '';
      this.view = 'dashboard';
    },

    toggleImportRecord(idx) {
      if (!this.dataImportResult) { return; }
      var rec = this.dataImportResult.records[idx];
      if (!rec) { return; }
      rec.userAction = rec.userAction === 'accept' ? 'skip' : 'accept';
    },

    getImportAcceptCount() {
      if (!this.dataImportResult) { return 0; }
      var count = 0;
      for (var i = 0; i < this.dataImportResult.records.length; i++) {
        if (this.dataImportResult.records[i].userAction === 'accept') { count++; }
      }
      return count;
    },

    getImportMatchInfo(record) {
      if (!record.suggestedItemId) { return null; }
      return WizardImportMatcher.getMatchInfo(record.suggestedItemId);
    },

    async applyImportToChecklist() {
      if (!this.dataImportResult || !this.cryptoKey) { return; }
      this.isProcessing = true;
      this.dataImportStep = 'applying';

      try {
        var records = this.dataImportResult.records;
        var applied = 0;
        var skipped = 0;

        for (var i = 0; i < records.length; i++) {
          var rec = records[i];
          if (rec.userAction !== 'accept' || !rec.suggestedItemId) {
            skipped++;
            continue;
          }

          // Build a value string from the imported data
          var valueParts = [];
          if (rec.name) { valueParts.push(rec.name); }
          if (rec.username) { valueParts.push(rec.username); }
          if (rec.url) { valueParts.push(rec.url); }
          var valueStr = valueParts.join(' -- ');

          // Load existing state for this item
          var existingItems = await WizardChecklist.loadSectionItems('section-1', this.cryptoKey);
          var existing = existingItems.get(rec.suggestedItemId);
          var currentValue = (existing && existing.value) ? existing.value.trim() : '';

          // Append to existing value if there is one, avoid duplicates
          if (currentValue && currentValue.indexOf(rec.name) >= 0) {
            skipped++;
            continue;
          }
          var newValue = currentValue ? currentValue + '; ' + valueStr : valueStr;

          var newState = {
            checked: true,
            na: false,
            value: newValue
          };

          await WizardChecklist.saveItemState(rec.suggestedItemId, 'section-1', newState, this.cryptoKey);
          applied++;
        }

        this.dataImportResult.applied = applied;
        this.dataImportResult.skippedOnApply = skipped;
        this.dataImportStep = 'done';
      } catch (e) {
        this.dataImportError = 'Failed to apply import: ' + e.message;
        this.dataImportStep = 'review';
      } finally {
        this.isProcessing = false;
      }
    },

    restartDataImport() {
      this.dataImportStep = 'select';
      this.dataImportFile = null;
      this.dataImportResult = null;
      this.dataImportError = '';
    },

    async completeDataImport() {
      await this._loadDashboard();
      this.dataImportStep = '';
      this.dataImportFile = null;
      this.dataImportResult = null;
      this.dataImportError = '';
      this.view = 'dashboard';
    },

    getImportSourceLabel() {
      if (!this.dataImportResult) { return ''; }
      var labels = {
        '1password': '1Password',
        'bitwarden': 'Bitwarden',
        'lastpass': 'LastPass',
        'keepass': 'KeePass',
        'dashlane': 'Dashlane',
        'chrome-bookmarks': 'Chrome Bookmarks',
        'firefox-bookmarks': 'Firefox Bookmarks',
        'safari-bookmarks': 'Safari Bookmarks',
        'edge-bookmarks': 'Edge Bookmarks',
        'unknown-bookmarks': 'Browser Bookmarks'
      };
      return labels[this.dataImportResult.source] || this.dataImportResult.source;
    },

    getSection1Categories() {
      var section = WizardContent.getSectionById('section-1');
      if (!section) { return []; }
      var result = [];
      var subs = section.subsections || [];
      for (var si = 0; si < subs.length; si++) {
        var cats = subs[si].categories || [];
        for (var ci = 0; ci < cats.length; ci++) {
          var cat = cats[ci];
          if (!cat.items || !cat.title) { continue; }
          result.push({
            categoryId: cat.id,
            title: cat.title,
            items: cat.items.map(function (item) {
              return { id: item.id, text: item.text };
            })
          });
        }
      }
      return result;
    },

    onImportItemAssign(idx, itemId) {
      if (!this.dataImportResult) { return; }
      var rec = this.dataImportResult.records[idx];
      if (!rec) { return; }

      if (!itemId) {
        rec.suggestedItemId = null;
        rec.suggestedCategoryId = null;
        rec.matchConfidence = 0;
        rec.userAction = 'skip';
        return;
      }

      var info = WizardImportMatcher.getMatchInfo(itemId);
      if (info) {
        rec.suggestedItemId = itemId;
        rec.suggestedCategoryId = info.categoryId;
        rec.matchConfidence = 1;
        rec.userAction = 'accept';
      }
    },

    isBookmarkImport() {
      return this.dataImportResult && this.dataImportResult.source &&
        this.dataImportResult.source.indexOf('-bookmarks') >= 0;
    },

    // --- Helpers for Templates ---
    get isAuthed() {
      return this.cryptoKey !== null;
    }
  }));
});
