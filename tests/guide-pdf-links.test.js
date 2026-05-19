import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/guide.html');

const SECTIONS_WITH_PDFS = [
  { id: 'take-inventory', pdf: 'A-01' },
  { id: 'secure-your-credentials', pdf: 'A-02' },
  { id: 'configure-platform-legacy', pdf: 'A-03' },
  { id: 'designate-a-digital-executor', pdf: 'A-04' },
  { id: 'plan-for-specific-scenarios', pdf: 'A-05' },
  { id: 'protect-against-identity-theft', pdf: 'A-06' },
  { id: 'immediate-priorities', pdf: 'A-07' },
  { id: 'short-term-actions', pdf: 'A-08' },
  { id: 'medium-term-actions', pdf: 'A-08' },
  { id: 'long-term-vigilance', pdf: 'A-08' },
];

describe('Story #1762: PDF download links in accordion headers', () => {
  it('each section has an inline PDF download link', () => {
    for (const { id, pdf } of SECTIONS_WITH_PDFS) {
      const heading = $(`[id="${id}"]`);
      const details = heading.closest('details');
      const pdfLink = details.find(`a[href*="${pdf}"]`);
      expect(
        pdfLink.length,
        `details for #${id} should contain a PDF link for ${pdf}`
      ).toBeGreaterThan(0);
    }
  });

  it('PDF links have download attribute or open in new tab', () => {
    for (const { id, pdf } of SECTIONS_WITH_PDFS) {
      const heading = $(`[id="${id}"]`);
      const details = heading.closest('details');
      const pdfLink = details.find(`a[href*="${pdf}"]`);
      if (pdfLink.length) {
        const hasDownload = pdfLink.attr('download') !== undefined;
        const hasNewTab = pdfLink.attr('target') === '_blank';
        expect(
          hasDownload || hasNewTab,
          `PDF link for #${id} should have download attr or target=_blank`
        ).toBe(true);
      }
    }
  });

  it('PDF links do not interfere with accordion toggle (click isolation pattern)', () => {
    const style = $('style').text();
    const script = $('script').text();
    const inlineHandlers = $('a.pdf-download-inline[onclick]');
    const pdfLinksOutsideSummary = $('details.guide-section > a.pdf-download-inline');
    const hasClickIsolation =
      script.includes('stopPropagation') ||
      script.includes('preventDefault') ||
      inlineHandlers.length > 0 ||
      pdfLinksOutsideSummary.length > 0 ||
      /\.pdf-download\s*\{[^}]*pointer-events/.test(style);
    expect(
      hasClickIsolation,
      'PDF links should be isolated from accordion toggle (outside summary or with handler)'
    ).toBe(true);
  });
});
