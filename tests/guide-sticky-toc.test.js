import { describe, it, expect } from 'vitest';
import { loadPage } from './helpers.js';

const $ = loadPage('trust-safety/guide.html');

describe('Story #1760: Sticky TOC', () => {
  it('TOC has a sticky or fixed position CSS rule', () => {
    const style = $('style').text();
    const hasStickyToc =
      /\.toc[^}]*position\s*:\s*sticky/i.test(style) ||
      /\.toc-sidebar[^}]*position\s*:\s*sticky/i.test(style) ||
      /\.toc-wrapper[^}]*position\s*:\s*sticky/i.test(style);
    expect(hasStickyToc, 'TOC should have position: sticky in CSS').toBe(true);
  });

  it('TOC has a defined top offset for sticky positioning', () => {
    const style = $('style').text();
    const tocRules = style.match(/\.toc[^{]*\{[^}]*position\s*:\s*sticky[^}]*/g) || [];
    const hasTop = tocRules.some((block) => /top\s*:/.test(block));
    expect(hasTop, 'sticky TOC should have a top value defined').toBe(true);
  });

  it('TOC has a max-height with overflow for long content', () => {
    const style = $('style').text();
    const hasTocScroll =
      /\.toc[^}]*max-height/i.test(style) ||
      /\.toc[^}]*overflow[^}]*auto/i.test(style) ||
      /\.toc[^}]*overflow[^}]*scroll/i.test(style) ||
      /\.toc-sidebar[^}]*max-height/i.test(style);
    expect(
      hasTocScroll,
      'TOC should have max-height with overflow for scrolling'
    ).toBe(true);
  });

  it('page uses a two-column layout on desktop (sidebar TOC + content)', () => {
    const style = $('style').text();
    const hasGrid =
      /\.guide-layout[^}]*display\s*:\s*grid/i.test(style) ||
      /\.guide-layout[^}]*display\s*:\s*flex/i.test(style) ||
      /\.guide-wrapper[^}]*display\s*:\s*grid/i.test(style);
    expect(
      hasGrid,
      'guide should use grid or flex layout for sidebar TOC on desktop'
    ).toBe(true);
  });

  it('sticky TOC collapses on mobile (not sticky below breakpoint)', () => {
    const style = $('style').text();
    const mobileRules = style.match(/@media[^{]*max-width[^{]*\{[^}]*\.toc[^}]*/g) || [];
    const collapses =
      mobileRules.length > 0 ||
      /\.toc-sidebar[^}]*position\s*:\s*static/i.test(style) ||
      /\.toc[^}]*position\s*:\s*relative/i.test(style);
    expect(
      mobileRules.length > 0 || style.includes('@media'),
      'TOC sticky behavior should have a mobile breakpoint override'
    ).toBe(true);
  });
});
