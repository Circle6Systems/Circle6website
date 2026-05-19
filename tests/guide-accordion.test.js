import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/guide.html');

const ACCORDION_SECTIONS = [
  'take-inventory',
  'secure-your-credentials',
  'configure-platform-legacy',
  'designate-a-digital-executor',
  'plan-for-specific-scenarios',
  'protect-against-identity-theft',
  'immediate-priorities',
  'short-term-actions',
  'medium-term-actions',
  'long-term-vigilance',
  'path-b',
  'quick-reference',
  'resources',
  'a-final-note',
];

describe('Story #1758: Guide accordion sections', () => {
  it('each numbered section is wrapped in a <details> element', () => {
    for (const id of ACCORDION_SECTIONS) {
      const heading = $(`[id="${id}"]`);
      expect(heading.length, `heading #${id} should exist`).toBeGreaterThan(0);

      const details = heading.closest('details');
      expect(
        details.length,
        `#${id} should be inside a <details> element`
      ).toBeGreaterThan(0);
    }
  });

  it('each <details> has a <summary> containing the section heading text', () => {
    for (const id of ACCORDION_SECTIONS) {
      const heading = $(`[id="${id}"]`);
      const details = heading.closest('details');
      const summary = details.children('summary');
      expect(
        summary.length,
        `<details> for #${id} should have a <summary>`
      ).toBeGreaterThan(0);
      expect(
        summary.text().trim().length,
        `<summary> for #${id} should contain text`
      ).toBeGreaterThan(0);
    }
  });

  it('all accordion sections are collapsed by default (no open attribute)', () => {
    for (const id of ACCORDION_SECTIONS) {
      const heading = $(`[id="${id}"]`);
      const details = heading.closest('details');
      expect(
        details.attr('open'),
        `<details> for #${id} should not have open attribute`
      ).toBeUndefined();
    }
  });

  it('summary elements have a chevron indicator via CSS class', () => {
    const summaries = $('details.guide-section > summary');
    expect(
      summaries.length,
      'should have summary elements inside details.guide-section'
    ).toBeGreaterThanOrEqual(ACCORDION_SECTIONS.length);

    summaries.each((_, el) => {
      const summary = $(el);
      expect(
        summary.hasClass('section-toggle') || summary.find('.chevron').length > 0,
        'summary should have .section-toggle class or contain .chevron element'
      ).toBe(true);
    });
  });

  it('TOC and intro section are NOT inside accordions', () => {
    const toc = $('.toc');
    expect(
      toc.closest('details').length,
      'TOC should not be inside <details>'
    ).toBe(0);

    const intro = $('#how-this-guide-works');
    expect(
      intro.closest('details').length,
      'How This Guide Works should not be inside <details>'
    ).toBe(0);
  });

  it('details elements are keyboard focusable (summary is natively focusable)', () => {
    const summaries = $('details.guide-section > summary');
    summaries.each((_, el) => {
      const tabindex = $(el).attr('tabindex');
      expect(
        tabindex === undefined || tabindex === '0',
        'summary should be natively focusable (no negative tabindex)'
      ).toBe(true);
    });
  });

  it('part dividers are outside accordion elements', () => {
    const dividers = $('.part-divider');
    dividers.each((_, el) => {
      expect(
        $(el).closest('details').length,
        'part dividers should not be inside <details>'
      ).toBe(0);
    });
  });
});
