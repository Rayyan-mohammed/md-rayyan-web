// Fails if any inline <script> in dist/ is not allowed by the CSP in vercel.json,
// or if any inline style attribute or <style> block sneaks in. Run after `npm run build`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const csp = vercel.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === 'Content-Security-Policy')?.value;
if (!csp) throw new Error('No CSP in vercel.json');
const allowed = new Set([...csp.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

let problems = 0;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)) {
    const hash = createHash('sha256').update(m[1]).digest('base64');
    if (!allowed.has(hash)) {
      console.error(`${file}: inline script not in CSP (sha256-${hash})`);
      problems++;
    }
  }
  if (/\sstyle="/.test(html) || /<style[\s>]/.test(html)) {
    console.error(`${file}: inline style found; CSP style-src 'self' will block it`);
    problems++;
  }
}
if (problems) process.exit(1);
console.log('CSP check passed');
