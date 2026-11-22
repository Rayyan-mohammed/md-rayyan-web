import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Hand-written sitemap: every public page, with the last content update.
const pages = ['', '/research', '/work/argus', '/work/bharathealth', '/work/obscuron'];

export const GET: APIRoute = () => {
  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${site.url}${p || '/'}</loc>\n    <lastmod>${site.lastUpdated}</lastmod>\n  </url>`,
    )
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
