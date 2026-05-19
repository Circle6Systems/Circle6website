import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as cheerio from 'cheerio';

export function loadPage(relativePath) {
  const filePath = resolve(import.meta.dirname, '..', relativePath);
  const html = readFileSync(filePath, 'utf-8');
  return cheerio.load(html);
}
