/**
 * WizardImportBookmarks -- Browser bookmarks HTML parser.
 * Parses Netscape Bookmark File Format exported by Chrome, Firefox, Safari, Edge.
 * Part of Epic #1582 (Browser Data Import), Story #1852.
 */
const WizardImportBookmarks = (() => {
  'use strict';

  /**
   * Check whether the content is a Netscape Bookmark File.
   *
   * @param {string} content
   * @returns {boolean}
   */
  function isBookmarkFile(content) {
    if (!content) { return false; }
    var upper = content.trimStart().substring(0, 200).toUpperCase();
    return upper.indexOf('<!DOCTYPE NETSCAPE-BOOKMARK-FILE') >= 0 ||
           (upper.indexOf('<DL>') >= 0 && upper.indexOf('<DT>') >= 0 && upper.indexOf('<A HREF') >= 0);
  }

  /**
   * Detect the browser source from bookmark HTML metadata.
   *
   * @param {string} content
   * @returns {string} 'chrome', 'firefox', 'safari', 'edge', or 'unknown'
   */
  function detectBrowser(content) {
    if (!content) { return 'unknown'; }
    var sample = content.substring(0, 2000).toLowerCase();

    // Firefox includes LAST_MODIFIED on folders and a specific comment
    if (sample.indexOf('last_modified=') >= 0) { return 'firefox'; }

    // Safari bookmark exports have a specific plist-like structure or title
    if (sample.indexOf('safari') >= 0) { return 'safari'; }

    // Edge uses same format as Chrome but may include edge metadata
    if (sample.indexOf('edge') >= 0) { return 'edge'; }

    // Chrome is the default for Netscape format without other markers
    if (sample.indexOf('<!doctype netscape-bookmark-file') >= 0) { return 'chrome'; }

    return 'unknown';
  }

  /**
   * Parse Netscape Bookmark File Format HTML.
   * Uses DOMParser to walk the DL/DT tree recursively.
   *
   * @param {string} htmlContent
   * @returns {{ records: Object[], errors: string[] }}
   */
  function parseBookmarks(htmlContent) {
    var errors = [];
    var records = [];

    if (!htmlContent || htmlContent.trim().length === 0) {
      return { records: [], errors: ['Bookmark file is empty.'] };
    }

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlContent, 'text/html');

    // Find the top-level DL element
    var topDL = doc.querySelector('dl');
    if (!topDL) {
      return { records: [], errors: ['No bookmark structure found in this file. Expected Netscape Bookmark File Format.'] };
    }

    var source = detectBrowser(htmlContent) + '-bookmarks';
    var index = { value: 0 };

    _walkDL(topDL, [], records, source, index);

    if (records.length === 0) {
      errors.push('No bookmarks found in this file. The file may be empty or in an unexpected format.');
    }

    return { records: records, errors: errors };
  }

  /**
   * Recursively walk a DL element, extracting bookmarks and descending into folders.
   *
   * @param {Element} dl - A <DL> element
   * @param {string[]} folderPath - Current folder hierarchy
   * @param {Object[]} records - Accumulator for parsed records
   * @param {string} source - Source identifier
   * @param {Object} index - Mutable counter { value: number }
   */
  function _walkDL(dl, folderPath, records, source, index) {
    var children = dl.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      if (child.tagName !== 'DT') { continue; }

      // Check if this DT contains a folder (H3) or a bookmark (A)
      var h3 = child.querySelector(':scope > h3');
      if (h3) {
        // Folder: push name and recurse into sibling DL
        var folderName = (h3.textContent || '').trim();
        var subDL = child.querySelector(':scope > dl');
        if (subDL && folderName) {
          _walkDL(subDL, folderPath.concat(folderName), records, source, index);
        }
        continue;
      }

      var anchor = child.querySelector(':scope > a');
      if (anchor) {
        var href = anchor.getAttribute('href') || '';
        var name = (anchor.textContent || '').trim();

        // Skip javascript: bookmarklets and empty URLs
        if (!href || href.toLowerCase().indexOf('javascript:') === 0) { continue; }
        // Skip chrome:// and about: internal pages
        if (href.toLowerCase().indexOf('chrome://') === 0 || href.toLowerCase().indexOf('about:') === 0) { continue; }

        records.push(WizardImport.createRecord({
          name: name,
          url: href,
          username: '',
          source: source,
          sourceGroup: folderPath.join(' / ')
        }, index.value));

        index.value++;
      }
    }
  }

  return {
    isBookmarkFile: isBookmarkFile,
    detectBrowser: detectBrowser,
    parseBookmarks: parseBookmarks
  };
})();
