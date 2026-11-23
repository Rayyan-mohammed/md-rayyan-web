// Generates favicon.svg, favicon.ico (32 px PNG inside an ICO container) and
// apple-touch-icon.png from one SVG source. Run: npm run icons
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// The MR ligature mark (same geometry as src/components/Mark.astro).
const mark = (size, { pad = 0, radius = 8 } = {}) => {
  const s = 32 + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${s} ${s}">
  <rect x="${-pad}" y="${-pad}" width="${s}" height="${s}" fill="${pad ? '#15171a' : 'none'}"/>
  <rect x="0" y="0" width="32" height="32" rx="${radius}" fill="#15171a"/>
  <path d="M7 23V9l5 8 5-8v14M17 9h3.5a4 4 0 0 1 0 8H17" fill="none" stroke="#f6f5f1" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.5 17l4.5 6" fill="none" stroke="#3dd68c" stroke-width="2.6" stroke-linecap="round"/>
</svg>`;
};

const svg = mark(32);
await writeFile('public/favicon.svg', svg);

const png32 = await sharp(Buffer.from(mark(32))).resize(32, 32).png().toBuffer();
// ICO container: header (6 bytes) + one directory entry (16 bytes) + PNG payload.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(6 + 16, 12);
await writeFile('public/favicon.ico', Buffer.concat([header, entry, png32]));

// Apple touch icon: full-bleed square (iOS rounds the corners itself).
const touch = await sharp(Buffer.from(mark(180, { pad: 4, radius: 0 }))).resize(180, 180).png().toBuffer();
await writeFile('public/apple-touch-icon.png', touch);

console.log('icons written: favicon.svg, favicon.ico, apple-touch-icon.png');
