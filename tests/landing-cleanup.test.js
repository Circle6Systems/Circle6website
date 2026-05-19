import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/index.html');

describe('Story #1763: Landing page inline style cleanup', () => {
  it('paths-header does not use inline styles', () => {
    const pathsHeader = $('.paths-header, [class*="paths-header"]');
    pathsHeader.each((_, el) => {
      const inlineStyle = $(el).attr('style');
      expect(
        inlineStyle,
        'paths-header should not have inline style attribute'
      ).toBeUndefined();
    });
  });

  it('no elements in the main content use inline style attributes', () => {
    const main = $('main, .hero, .download-section, .paths-section, .memorial-section');
    const inlineStyled = main.find('[style]');
    const violations = [];
    inlineStyled.each((_, el) => {
      const tag = $(el).prop('tagName');
      const cls = $(el).attr('class') || '';
      violations.push(`<${tag} class="${cls}" style="${$(el).attr('style')}">`);
    });
    expect(
      violations.length,
      `Found ${violations.length} inline styles: ${violations.join(', ')}`
    ).toBe(0);
  });

  it('all CSS is defined in <style> blocks, not inline', () => {
    const styleBlocks = $('style');
    expect(styleBlocks.length, 'page should have <style> blocks').toBeGreaterThan(0);
  });

  it('coming-soon items have proper opacity via CSS class, not inline', () => {
    const comingSoon = $('.coming-soon');
    comingSoon.each((_, el) => {
      expect(
        $(el).attr('style'),
        'coming-soon elements should use CSS class for opacity, not inline'
      ).toBeUndefined();
    });
  });
});
