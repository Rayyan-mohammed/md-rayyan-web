// Renders 1200x630 social-preview images with headless Chrome, using the site's
// own fonts and tokens. Outputs to public/og/*.png. Run: npm run og
// Needs a local Chrome or Chromium; set CHROME_PATH if it is not in the default place.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found; set CHROME_PATH');

const font = (pkg, file) => pathToFileURL(resolve('node_modules', pkg, 'files', file)).href;
const sans = font('@fontsource-variable/geist', 'geist-latin-wght-normal.woff2');
const mono = font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2');

const cards = [
  {
    file: 'home',
    eyebrow: 'ML systems & evaluation',
    title: 'I build machine-learning systems, and the evaluations that decide whether to trust them.',
    stats: [
      ['IEEE ICAESIS-2026', 'co-author, paper presented'],
      ['arXiv:2609.39067', 'Argus preprint'],
      ['152', 'real Spot reclaims measured'],
    ],
  },
  {
    file: 'argus',
    eyebrow: 'Case study · Co-author, ML layer',
    title: 'Argus: when does predicting a Spot reclaim beat plain checkpointing?',
    stats: [
      ['≈ 75 s', 'warning to resumed training, real EKS'],
      ['1.14× vs 1.34×', 'retrained model vs periodic'],
      ['0.53', 'price-model AUROC on real reclaims'],
    ],
  },
  {
    file: 'bharathealth',
    eyebrow: 'Case study · Sole author',
    title: 'BharatHealth Analyst: an LLM agent for India’s district health data, graded on 200 questions.',
    stats: [
      ['71.1%', 'exact-answer accuracy'],
      ['5.0%', 'hallucination rate'],
      ['4', 'scorer bugs found and fixed'],
    ],
  },
  {
    file: 'obscuron',
    eyebrow: 'Case study · Co-author, implementation',
    title: 'Obscuron: calibrated novelty detection for proteins no database can name.',
    stats: [
      ['0.962', 'held-out-family AUROC'],
      ['1.34M', 'proteins scanned'],
      ['IEEE ICAESIS-2026', 'presented October 2026'],
    ],
  },
  {
    file: 'research',
    eyebrow: 'Research',
    title: 'Two papers in 2026 on the gap between a metric and the claim it supports.',
    stats: [
      ['Obscuron', 'IEEE ICAESIS-2026'],
      ['Argus', 'arXiv:2609.39067'],
      ['CALIBER', 'in progress'],
    ],
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${sans}) format('woff2');font-weight:100 900}
@font-face{font-family:M;src:url(${mono}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;background:#f7f6f2;color:#15171a;font-family:G,sans-serif}
.wrap{position:relative;width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:14px;font:500 22px M,monospace;color:#4a4f57}
.top svg{width:36px;height:36px}
.top .name{color:#15171a;font-family:G;font-weight:600;font-size:26px;letter-spacing:-.01em}
.eyebrow{margin-top:56px;display:flex;align-items:center;gap:12px;font:500 22px M,monospace;color:#4a4f57}
.eyebrow:before{content:'';width:12px;height:12px;border-radius:50%;background:#0a7a5a;box-shadow:0 0 0 6px rgba(10,122,90,.12)}
h1{margin-top:22px;font-size:58px;line-height:1.06;letter-spacing:-.032em;font-weight:600;max-width:1020px}
.ruler{margin-top:auto;height:12px;background:linear-gradient(#bdb9ae,#bdb9ae) bottom/100% 1px no-repeat,repeating-linear-gradient(90deg,#bdb9ae 0 1px,transparent 1px 24px) bottom/100% 7px no-repeat}
.stats{display:grid;grid-template-columns:repeat(3,1fr);margin-top:22px}
.stat{padding-right:24px}
.stat+.stat{padding-left:24px;border-left:1px solid #d9d6cd}
.stat b{display:block;font:500 30px M,monospace;letter-spacing:-.02em}
.stat:first-child b{color:#0a7a5a}
.stat span{display:block;margin-top:6px;font-size:21px;color:#4a4f57}
</style></head><body><div class="wrap">
<div class="top"><svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="#15171a"/><path d="M6 18 18 6" stroke="#f7f6f2" stroke-width="1.4" stroke-dasharray="1.6 1.9" fill="none"/><path d="M6 18h3v-3.5h3V11h3V7.5h3" stroke="#3dd68c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="name">MD Rayyan</span><span>· rayyan-mohammed.vercel.app</span></div>
<p class="eyebrow">${c.eyebrow}</p>
<h1>${c.title}</h1>
<div class="ruler"></div>
<div class="stats">${c.stats.map(([b, s]) => `<div class="stat"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
</div></body></html>`;

const out = resolve('public/og');
mkdirSync(out, { recursive: true });
const tmp = join(tmpdir(), `og-${Date.now()}`);
mkdirSync(tmp, { recursive: true });
for (const c of cards) {
  const page = join(tmp, `${c.file}.html`);
  writeFileSync(page, html(c));
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    `--user-data-dir=${join(tmp, 'profile')}`,
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${join(out, `${c.file}.png`)}`,
    pathToFileURL(page).href,
  ], { stdio: 'ignore' });
  console.log(`og/${c.file}.png`);
}
rmSync(tmp, { recursive: true, force: true });
