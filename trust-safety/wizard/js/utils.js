/**
 * Digital Estate Planning Wizard - Utility Module
 * Simple helpers for sanitization, debouncing, and date formatting.
 */

const WizardUtils = (() => {
  'use strict';

  /**
   * Sanitize a string for safe HTML display.
   * Escapes &, <, >, ", and ' characters.
   */
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Debounce a function call by the specified number of milliseconds.
   * Returns a wrapper function that delays invocation until after
   * the specified wait period has elapsed since the last call.
   */
  function debounce(fn, ms) {
    let timer = null;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, ms);
    };
  }

  /**
   * Format a Date object (or date string) as an ISO date string (YYYY-MM-DD).
   * If no argument is provided, formats the current date.
   */
  function formatDate(date) {
    const d = date ? new Date(date) : new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }

  return {
    escapeHtml,
    debounce,
    formatDate
  };
})();
