import { defineConfig } from 'astro/config';

// Static site. Every page ships real HTML; the only client JavaScript is the
// theme toggle, the copy-email button and the Argus drain replay.
export default defineConfig({
  site: 'https://rayyan-mohammed.vercel.app',
  trailingSlash: 'never',
  build: {
    // /work/argus.html served as /work/argus (vercel.json cleanUrls)
    format: 'file',
    // external CSS only, so the Content-Security-Policy can stay strict
    inlineStylesheets: 'never',
  },
  compressHTML: true,
  vite: {
    build: {
      // never inline scripts or assets as data URLs (keeps CSP script-src 'self')
      assetsInlineLimit: 0,
    },
  },
});
