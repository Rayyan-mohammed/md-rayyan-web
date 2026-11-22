// Generates favicon.svg, favicon.ico (32 px PNG inside an ICO container) and
// apple-touch-icon.png from one SVG source. Run: npm run icons
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const mark = (size, { pad = 0, radius = 6 } = {}) => {
  const s = 24 + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${s} ${s}">
  <rect x="${-pad}" y="${-pad}" width="${s}" height="${s}" fill="${pad ? '#15171a' : 'none'}"/>
  <rect x="1" y="1" width="22" height="22" rx="${radius}" fill="#15171a"/>
  <path d="M6 18 18 6" stroke="#f7f6f2" stroke-width="1.4" stroke-dasharray="1.6 1.9" fill="none"/>
  <path d="M6 18h3v-3.5h3V11h3V7.5h3" stroke="#3dd68c" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
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
const touch = await sharp(Buffer.from(mark(180, { pad: 3, radius: 0 }))).resize(180, 180).png().toBuffer();
await writeFile('public/apple-touch-icon.png', touch);

console.log('icons written: favicon.svg, favicon.ico, apple-touch-icon.png');
