# MD Rayyan — portfolio

Personal site for MD Rayyan: ML systems and the evaluations that decide whether to trust them.

**Live:** https://rayyan-mohammed.vercel.app/

## What this is

A static site built with [Astro](https://astro.build). Every page ships real HTML; the only client JavaScript is the theme toggle, the copy-email button and the drain replay on the Argus page.

| Page | Content |
|---|---|
| `/` | Hero with sourced proof points, four featured projects with figures, papers, principles, more work, about, leadership, contact |
| `/research` | Papers with abstracts, my part in each, links and BibTeX |
| `/work/argus` | Case study: Spot-resilient training on EKS, trace benchmark, 152 real reclaims |
| `/work/bharathealth` | Case study: LLM agent over NFHS-5 and its 200-question benchmark |
| `/work/obscuron` | Case study: calibrated novelty detection, IEEE ICAESIS-2026 |

## Content rules

- Every number links to the file in the project repository that produced it.
- Every team project says it was a team project, and the featured ones name my part. Green (the accent colour) means "the part I built", nowhere else.
- Limitations sit next to results.

Copy lives in `src/data/` (`site.ts`, `work.ts`, `research.ts`, `figures.ts`). Chart data in `figures.ts` is copied from each repository's results; update both together.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the build locally |
| `npm run icons` | Regenerate favicons from the mark |
| `npm run og` | Regenerate social images in `public/og/` (needs local Chrome; set `CHROME_PATH` if needed) |

## Deployment and headers

Deployed on Vercel. `vercel.json` sets clean URLs, a `/cv` redirect to `/MD_Rayyan_Resume.pdf`, immutable caching for hashed assets and a strict Content-Security-Policy. The CSP allows exactly one inline script, the theme initialiser in `src/layouts/Base.astro`, by its SHA-256 hash. **If you edit that script, update the hash in `vercel.json`** (the quality workflow checks this).

## Design

- Type: Geist and Geist Mono, self-hosted.
- Colour: paper and ink, one emerald accent; light and dark themes follow the system, with a toggle.
- Motion: CSS only, respects `prefers-reduced-motion`; cross-page view transitions on supporting browsers.
