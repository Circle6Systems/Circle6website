import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

async function runAxe(relativePath) {
  const filePath = resolve(import.meta.dirname, '..', relativePath);
  const html = readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
  const { document } = dom.window;

  const source = readFileSync(
    resolve(import.meta.dirname, '..', 'node_modules', 'axe-core', 'axe.min.js'),
    'utf-8'
  );
  dom.window.eval(source);

  const results = await dom.window.axe.run(document, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  });
  return results;
}

describe('WCAG 2.1 AA Compliance', () => {
  it('guide.html has no WCAG 2.1 AA violations', async () => {
    const results = await runAxe('trust-safety/guide.html');
    const violations = results.violations.map(
      (v) => `${v.id}: ${v.description} (${v.nodes.length} instances)`
    );
    expect(violations, `Violations:\n${violations.join('\n')}`).toHaveLength(0);
  }, 30000);

  it('index.html (landing) has no WCAG 2.1 AA violations', async () => {
    const results = await runAxe('trust-safety/index.html');
    const violations = results.violations.map(
      (v) => `${v.id}: ${v.description} (${v.nodes.length} instances)`
    );
    expect(violations, `Violations:\n${violations.join('\n')}`).toHaveLength(0);
  }, 30000);
});
