/**
 * WizardImportPasswords -- Password manager CSV export parsers.
 * Supports 1Password, Bitwarden, LastPass, KeePass, and Dashlane.
 * Part of Epic #1582 (Browser Data Import), Story #1851.
 *
 * Security: Passwords and TOTP secrets are never read, stored, or referenced.
 * Only account name, URL, and username are extracted.
 */
const WizardImportPasswords = (() => {
  'use strict';

  /**
   * Detect which password manager format matches the CSV headers.
   * Headers should be lowercase and trimmed.
   *
   * @param {string[]} headers
   * @returns {{ parser: Function, format: string }|null}
   */
  function detectPasswordFormat(headers) {
    if (!headers || headers.length === 0) { return null; }

    var headerSet = {};
    for (var i = 0; i < headers.length; i++) {
      headerSet[headers[i]] = true;
    }

    // Bitwarden first -- most distinctive due to login_ prefix
    if (headerSet['login_uri'] && headerSet['login_username']) {
      return { parser: parseBitwarden, format: 'bitwarden' };
    }

    // LastPass -- requires grouping column
    if (headerSet['url'] && headerSet['username'] && headerSet['name'] && headerSet['grouping']) {
      return { parser: parseLastPass, format: 'lastpass' };
    }

    // KeePass -- requires group column
    if (headerSet['group'] && headerSet['title'] && headerSet['username'] && headerSet['url']) {
      return { parser: parseKeePass, format: 'keepass' };
    }

    // 1Password -- title + url + username
    if (headerSet['title'] && headerSet['url'] && headerSet['username']) {
      return { parser: parse1Password, format: '1password' };
    }

    // Dashlane -- username + url + name
    if (headerSet['username'] && headerSet['url'] && headerSet['name']) {
      return { parser: parseDashlane, format: 'dashlane' };
    }

    return null;
  }

  /**
   * Parse 1Password CSV export.
   * Expected: Title, URL, Username, Password, Notes, Type
   */
  function parse1Password(rows) {
    var records = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row['title'] || '';
      var url = row['url'] || '';
      var username = row['username'] || '';

      records.push(WizardImport.createRecord({
        name: name,
        url: url,
        username: username,
        source: '1password',
        sourceGroup: row['type'] || ''
      }, i + 2));
    }
    return records;
  }

  /**
   * Parse Bitwarden CSV export.
   * Expected: folder, favorite, type, name, notes, fields, reprompt,
   *           login_uri, login_username, login_password, login_totp
   * Filters to login entries only.
   */
  function parseBitwarden(rows) {
    var records = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];

      // Filter to login entries (type=1 or type='login')
      var rowType = (row['type'] || '').toLowerCase();
      if (rowType && rowType !== '1' && rowType !== 'login') { continue; }

      var name = row['name'] || '';
      var url = row['login_uri'] || '';
      var username = row['login_username'] || '';

      records.push(WizardImport.createRecord({
        name: name,
        url: url,
        username: username,
        source: 'bitwarden',
        sourceGroup: row['folder'] || ''
      }, i + 2));
    }
    return records;
  }

  /**
   * Parse LastPass CSV export.
   * Expected: url, username, password, totp, extra, name, grouping, fav
   */
  function parseLastPass(rows) {
    var records = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row['name'] || '';
      var url = row['url'] || '';
      var username = row['username'] || '';

      // LastPass uses "http://sn" for secure notes -- skip those
      if (url === 'http://sn') { continue; }

      records.push(WizardImport.createRecord({
        name: name,
        url: url,
        username: username,
        source: 'lastpass',
        sourceGroup: row['grouping'] || ''
      }, i + 2));
    }
    return records;
  }

  /**
   * Parse KeePass CSV export.
   * Expected: Group, Title, Username, Password, URL, Notes
   */
  function parseKeePass(rows) {
    var records = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row['title'] || '';
      var url = row['url'] || '';
      var username = row['username'] || '';

      records.push(WizardImport.createRecord({
        name: name,
        url: url,
        username: username,
        source: 'keepass',
        sourceGroup: row['group'] || ''
      }, i + 2));
    }
    return records;
  }

  /**
   * Parse Dashlane CSV export.
   * Expected: username, url, password, name, note, category, totp
   */
  function parseDashlane(rows) {
    var records = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row['name'] || '';
      var url = row['url'] || '';
      var username = row['username'] || '';

      records.push(WizardImport.createRecord({
        name: name,
        url: url,
        username: username,
        source: 'dashlane',
        sourceGroup: row['category'] || ''
      }, i + 2));
    }
    return records;
  }

  return {
    detectPasswordFormat: detectPasswordFormat,
    parse1Password: parse1Password,
    parseBitwarden: parseBitwarden,
    parseLastPass: parseLastPass,
    parseKeePass: parseKeePass,
    parseDashlane: parseDashlane
  };
})();
