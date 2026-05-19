import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/guide.html');
const $landing = loadPage('trust-safety/index.html');

describe('Story #1761: Path selector and landing page CTAs', () => {
  describe('Guide page path filtering', () => {
    it('has path filter controls (buttons or tabs for Path A / Path B / All)', () => {
      const filterControls =
        $('.path-filter, .path-selector, [data-path-filter]').length;
      expect(
        filterControls,
        'guide should have path filter controls'
      ).toBeGreaterThan(0);
    });

    it('sections are marked with data-path attribute (a, b, or both)', () => {
      const sectionsWithPath = $('[data-path]');
      expect(
        sectionsWithPath.length,
        'sections should have data-path attributes'
      ).toBeGreaterThan(0);
    });

    it('Path A sections (1-6) are marked as path "a"', () => {
      const pathASections = [
        'take-inventory',
        'secure-your-credentials',
        'configure-platform-legacy',
        'designate-a-digital-executor',
        'plan-for-specific-scenarios',
        'protect-against-identity-theft',
      ];
      for (const id of pathASections) {
        const section = $(`[id="${id}"]`).closest('[data-path]');
        const path = section.attr('data-path');
        expect(
          path === 'a' || path === 'both',
          `#${id} should be marked data-path="a" or "both"`
        ).toBe(true);
      }
    });

    it('Path B sections (7-10, path-b) are marked as path "b"', () => {
      const pathBSections = [
        'immediate-priorities',
        'short-term-actions',
        'medium-term-actions',
        'long-term-vigilance',
        'path-b',
      ];
      for (const id of pathBSections) {
        const section = $(`[id="${id}"]`).closest('[data-path]');
        const path = section.attr('data-path');
        expect(
          path === 'b' || path === 'both',
          `#${id} should be marked data-path="b" or "both"`
        ).toBe(true);
      }
    });
  });

  describe('Landing page CTAs', () => {
    it('path cards have CTA buttons linking to the guide', () => {
      const pathCards = $landing('.path-card, .overview-card');
      expect(pathCards.length, 'should have path overview cards').toBeGreaterThanOrEqual(2);

      pathCards.each((_, el) => {
        const links = $landing(el).find('a');
        expect(
          links.length,
          'each path card should have at least one CTA link'
        ).toBeGreaterThan(0);
      });
    });

    it('does not have duplicate combined download CTAs', () => {
      const combinedLinks = $landing('a[href*="00-complete"]');
      expect(
        combinedLinks.length,
        'should have exactly one combined PDF download link'
      ).toBeLessThanOrEqual(2);
    });
  });
});
