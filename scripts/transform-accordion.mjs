import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, '..', 'trust-safety', 'guide.html');
const html = readFileSync(filePath, 'utf-8');
const $ = cheerio.load(html, { decodeEntities: false });

const SECTIONS = [
  { id: 'take-inventory', pdf: 'A-01-account-inventory-checklist', path: 'a' },
  { id: 'secure-your-credentials', pdf: 'A-02-password-and-access-plan', path: 'a' },
  { id: 'configure-platform-legacy', pdf: 'A-03-platform-legacy-settings', path: 'a' },
  { id: 'designate-a-digital-executor', pdf: 'A-04-digital-executor-designation', path: 'a' },
  { id: 'plan-for-specific-scenarios', pdf: 'A-05-specific-scenarios', path: 'a' },
  { id: 'protect-against-identity-theft', pdf: 'A-06-identity-theft-protection', path: 'a' },
  { id: 'immediate-priorities', pdf: 'A-07-immediate-priorities-48-72-hours', path: 'b' },
  { id: 'short-term-actions', pdf: 'A-08-ongoing-actions', path: 'b' },
  { id: 'medium-term-actions', pdf: 'A-08-ongoing-actions', path: 'b' },
  { id: 'long-term-vigilance', pdf: 'A-08-ongoing-actions', path: 'b' },
  { id: 'path-b', pdf: null, path: 'b' },
  { id: 'quick-reference', pdf: null, path: 'both' },
  { id: 'resources', pdf: null, path: 'both' },
  { id: 'a-final-note', pdf: null, path: 'both' },
];

for (const section of SECTIONS) {
  const h2 = $(`h2#${section.id}`);
  if (!h2.length) {
    console.error(`h2#${section.id} not found`);
    continue;
  }

  const headingOuterHtml = $.html(h2);
  const pdfLinkHtml = section.pdf
    ? ` <a href="/trust-safety/pdfs/${section.pdf}.pdf" class="pdf-download-inline" onclick="event.stopPropagation()" target="_blank" rel="noopener noreferrer" aria-label="Download section as PDF">PDF</a>`
    : '';

  const siblings = [];
  let el = h2.next();
  while (el.length) {
    const tagName = (el.prop('tagName') || '').toLowerCase();
    if (tagName === 'h2') break;
    if (tagName === 'details' && el.hasClass('guide-section')) break;
    if (tagName === 'div' && el.hasClass('part-divider')) break;
    siblings.push(el);
    el = el.next();
  }

  const details = $(`<details class="guide-section" data-path="${section.path}"></details>`);
  const summary = $(`<summary class="section-toggle">${headingOuterHtml}<span class="chevron" aria-hidden="true"></span>${pdfLinkHtml}</summary>`);
  details.append(summary);

  const contentDiv = $('<div class="section-content"></div>');
  for (const sib of siblings) {
    const tagName = (sib.prop('tagName') || '').toLowerCase();
    if (tagName === 'hr') {
      sib.remove();
      continue;
    }
    contentDiv.append(sib);
  }
  details.append(contentDiv);

  h2.replaceWith(details);
  console.log(`Wrapped: ${section.id}`);
}

writeFileSync(filePath, $.html(), 'utf-8');
console.log('Done.');
