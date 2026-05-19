import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/guide.html');

describe('Story #1759: h4 visual hierarchy and checklist markers', () => {
  it('h4 elements have a distinguishing CSS class or are styled distinctly', () => {
    const style = $('style').text();
    const hasH4Rule = /\.guide-content\s+h4|details\.guide-section\s+h4|h4\.subsection/i.test(style);
    expect(hasH4Rule, 'CSS should contain h4 styling rules within guide content').toBe(true);
  });

  it('h4 styling includes left border or accent indicator', () => {
    const style = $('style').text();
    const h4Block = style.match(/h4[^{]*\{[^}]*\}/g) || [];
    const hasIndicator = h4Block.some(
      (block) => /border-left|padding-left|border-inline-start/.test(block)
    );
    expect(
      hasIndicator,
      'h4 should have left border or padding indicator for visual weight'
    ).toBe(true);
  });

  it('checklist items do not use interactive-looking markers', () => {
    const style = $('style').text();
    const checklistBefore = style.match(/\.checklist\s+li::before[^}]*\}/g) || [];
    const hasSquareCheckbox = checklistBefore.some(
      (block) => /\\2610|\\2611|\\2612|checkbox|\\25A1|\\25A0/.test(block)
    );
    expect(
      hasSquareCheckbox,
      'checklist markers should not use checkbox-like Unicode characters'
    ).toBe(false);
  });

  it('checklist uses non-interactive visual markers (dash, bullet, or custom)', () => {
    const style = $('style').text();
    const hasListStyle =
      /\.checklist\s+li::before[^}]*content/.test(style) ||
      /\.checklist\s+li\s*\{[^}]*list-style/.test(style) ||
      /\.checklist[^}]*list-style/.test(style);
    expect(
      hasListStyle,
      'checklist items should have styled non-interactive markers'
    ).toBe(true);
  });
});
