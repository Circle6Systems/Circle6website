/**
 * WizardImport -- Browser data import core module.
 * CSV parser, format detection, record normalization, and parse orchestrator.
 * Part of Epic #1582 (Browser Data Import), Story #1850.
 */
const WizardImport = (() => {
  'use strict';

  var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  /**
   * Parse CSV text into an array of objects keyed by header names.
   * Handles quoted fields, escaped quotes (""), newlines in quotes,
   * BOM removal, and CRLF normalization.
   *
   * @param {string} csvText
   * @param {Object} [options]
   * @param {string} [options.delimiter=',']
   * @param {boolean} [options.trimValues=true]
   * @returns {{ rows: Object[], headers: string[], errors: string[] }}
   */
  function parseCSV(csvText, options) {
    var delimiter = (options && options.delimiter) || ',';
    var trimValues = (options && options.trimValues !== undefined) ? options.trimValues : true;
    var errors = [];

    if (!csvText || csvText.length === 0) {
      return { rows: [], headers: [], errors: ['File is empty.'] };
    }

    // Strip BOM
    if (csvText.charCodeAt(0) === 0xFEFF) {
      csvText = csvText.substring(1);
    }

    var rows = _splitCSVRows(csvText, delimiter);
    if (rows.length === 0) {
      return { rows: [], headers: [], errors: ['No data found in file.'] };
    }

    var headers = rows[0].map(function (h) {
      return trimValues ? h.trim().toLowerCase() : h.toLowerCase();
    });

    if (headers.length === 0 || (headers.length === 1 && headers[0] === '')) {
      return { rows: [], headers: [], errors: ['No header row found.'] };
    }

    var result = [];
    for (var i = 1; i < rows.length; i++) {
      var fields = rows[i];
      // Skip completely empty rows
      if (fields.length === 1 && fields[0].trim() === '') { continue; }

      if (fields.length < headers.length) {
        errors.push('Row ' + (i + 1) + ': fewer fields (' + fields.length + ') than headers (' + headers.length + ').');
      }

      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var val = j < fields.length ? fields[j] : '';
        obj[headers[j]] = trimValues ? val.trim() : val;
      }
      result.push(obj);
    }

    return { rows: result, headers: headers, errors: errors };
  }

  /**
   * State-machine CSV row splitter. Returns array of arrays (each row is an array of field strings).
   */
  function _splitCSVRows(text, delimiter) {
    var rows = [];
    var currentRow = [];
    var currentField = '';
    var inQuoted = false;
    var i = 0;
    var len = text.length;

    while (i < len) {
      var ch = text[i];

      if (inQuoted) {
        if (ch === '"') {
          if (i + 1 < len && text[i + 1] === '"') {
            currentField += '"';
            i += 2;
          } else {
            inQuoted = false;
            i++;
          }
        } else {
          currentField += ch;
          i++;
        }
      } else {
        if (ch === '"' && currentField.length === 0) {
          inQuoted = true;
          i++;
        } else if (ch === delimiter) {
          currentRow.push(currentField);
          currentField = '';
          i++;
        } else if (ch === '\r') {
          currentRow.push(currentField);
          currentField = '';
          rows.push(currentRow);
          currentRow = [];
          i++;
          if (i < len && text[i] === '\n') { i++; }
        } else if (ch === '\n') {
          currentRow.push(currentField);
          currentField = '';
          rows.push(currentRow);
          currentRow = [];
          i++;
        } else {
          currentField += ch;
          i++;
        }
      }
    }

    // Final field and row
    if (currentField.length > 0 || currentRow.length > 0) {
      currentRow.push(currentField);
      rows.push(currentRow);
    }

    return rows;
  }

  /**
   * Detect import format from file content and filename.
   *
   * @param {string} content
   * @param {string} filename
   * @returns {{ type: string, format: string }|null}
   */
  function detectFormat(content, filename) {
    var trimmed = content.trimStart();
    var lower = filename.toLowerCase();

    // Check for Netscape Bookmark File Format
    if (trimmed.substring(0, 100).toUpperCase().indexOf('<!DOCTYPE NETSCAPE-BOOKMARK-FILE') >= 0) {
      return { type: 'bookmark', format: WizardImportBookmarks.detectBrowser(content) + '-bookmarks' };
    }

    // Check for CSV (password manager export)
    if (lower.endsWith('.csv')) {
      var parsed = parseCSV(content);
      if (parsed.headers.length > 0) {
        var detected = WizardImportPasswords.detectPasswordFormat(parsed.headers);
        if (detected) {
          return { type: 'password', format: detected.format };
        }
      }
      return { type: 'password', format: 'unknown-csv' };
    }

    // Check HTML files for bookmark structure
    if (lower.endsWith('.html') || lower.endsWith('.htm')) {
      if (WizardImportBookmarks.isBookmarkFile(content)) {
        return { type: 'bookmark', format: WizardImportBookmarks.detectBrowser(content) + '-bookmarks' };
      }
    }

    return null;
  }

  /**
   * Create a normalized import record.
   *
   * @param {Object} fields - { name, url, username, source, sourceGroup }
   * @param {number} rawIndex
   * @returns {Object}
   */
  function createRecord(fields, rawIndex) {
    return {
      name: (fields.name || '').trim(),
      url: normalizeUrl(fields.url || ''),
      username: (fields.username || '').trim(),
      source: fields.source || '',
      sourceGroup: (fields.sourceGroup || '').trim(),
      suggestedCategoryId: null,
      suggestedItemId: null,
      matchConfidence: null,
      sensitivityFlags: [],
      userAction: null,
      importedAt: new Date().toISOString(),
      rawIndex: rawIndex || 0
    };
  }

  /**
   * Normalize a URL: lowercase host, strip trailing slash, handle edge cases.
   *
   * @param {string} rawUrl
   * @returns {string}
   */
  function normalizeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') { return ''; }
    var url = rawUrl.trim();
    if (!url) { return ''; }

    // Add protocol if missing
    if (url.indexOf('://') < 0 && url.indexOf('.') >= 0) {
      url = 'https://' + url;
    }

    try {
      var parsed = new URL(url);
      var normalized = parsed.protocol + '//' + parsed.hostname.toLowerCase();
      if (parsed.port) { normalized += ':' + parsed.port; }
      var path = parsed.pathname;
      if (path && path !== '/') {
        normalized += path.replace(/\/+$/, '');
      }
      return normalized;
    } catch (_e) {
      return '';
    }
  }

  /**
   * Validate a record, returning an array of warning strings.
   *
   * @param {Object} record
   * @returns {string[]}
   */
  function validateRecord(record) {
    var warnings = [];
    if (!record.name && !record.url) {
      warnings.push('Row ' + record.rawIndex + ': no name or URL found, record skipped.');
    }
    return warnings;
  }

  /**
   * Main entry point: detect format, route to parser, return results.
   *
   * @param {string} content - Raw file content
   * @param {string} filename - Original filename
   * @returns {{ records: Object[], source: string, format: string,
   *             errors: string[], warnings: string[], stats: Object }}
   */
  function parseFile(content, filename) {
    var result = {
      records: [],
      source: '',
      format: '',
      errors: [],
      warnings: [],
      stats: {
        totalRows: 0,
        parsedRecords: 0,
        skippedRows: 0,
        duplicateUrls: 0,
        emptyFields: { name: 0, url: 0, username: 0 }
      }
    };

    if (!content || content.length === 0) {
      result.errors.push('File is empty.');
      return result;
    }

    if (content.length > MAX_FILE_SIZE) {
      result.errors.push('File exceeds the 10MB size limit.');
      return result;
    }

    var detected = detectFormat(content, filename);
    if (!detected) {
      result.errors.push('Unrecognized file format. Please select a password manager CSV export or a browser bookmarks HTML file.');
      return result;
    }

    result.format = detected.format;

    if (detected.type === 'bookmark') {
      result.source = detected.format;
      var bookmarkResult = WizardImportBookmarks.parseBookmarks(content);
      result.records = bookmarkResult.records;
      result.errors = result.errors.concat(bookmarkResult.errors);
      result.stats.totalRows = bookmarkResult.records.length;
    } else if (detected.type === 'password') {
      var csvParsed = parseCSV(content);
      result.errors = result.errors.concat(csvParsed.errors);
      result.stats.totalRows = csvParsed.rows.length;

      var formatInfo = WizardImportPasswords.detectPasswordFormat(csvParsed.headers);
      if (!formatInfo) {
        result.errors.push('CSV headers do not match any supported password manager format. Supported: 1Password, Bitwarden, LastPass, KeePass, Dashlane.');
        return result;
      }

      result.source = formatInfo.format;
      result.records = formatInfo.parser(csvParsed.rows);
    }

    // Validate records and build stats
    var validRecords = [];
    var seenUrls = {};
    for (var i = 0; i < result.records.length; i++) {
      var rec = result.records[i];
      var warnings = validateRecord(rec);
      if (warnings.length > 0 && !rec.name && !rec.url) {
        result.warnings = result.warnings.concat(warnings);
        result.stats.skippedRows++;
        continue;
      }
      result.warnings = result.warnings.concat(warnings);

      if (!rec.name) { result.stats.emptyFields.name++; }
      if (!rec.url) { result.stats.emptyFields.url++; }
      if (!rec.username) { result.stats.emptyFields.username++; }

      if (rec.url && seenUrls[rec.url]) {
        result.stats.duplicateUrls++;
      }
      if (rec.url) { seenUrls[rec.url] = true; }

      validRecords.push(rec);
    }

    result.records = validRecords;
    result.stats.parsedRecords = validRecords.length;

    return result;
  }

  return {
    parseCSV: parseCSV,
    detectFormat: detectFormat,
    createRecord: createRecord,
    normalizeUrl: normalizeUrl,
    validateRecord: validateRecord,
    parseFile: parseFile
  };
})();
