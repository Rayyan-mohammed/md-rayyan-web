# MD Rayyan — Portfolio

Personal portfolio site for MD Rayyan, AI/ML Engineer & Full-Stack Developer.

**Live:** https://rayyan-mohammed.vercel.app/

## What this is

A single-page React portfolio, built from scratch (no template) as a fast, animated, content-driven site. All copy — experience, project write-ups, skills, awards — lives in one data file ([src/data/content.js](src/data/content.js)) and is rendered through reusable section components, so updating the site is a content edit, not a layout rewrite.

## Sections

| Section | What it shows |
|---|---|
| Hero | Rotating role titles, a simulated training-log terminal, and headline metrics (model accuracy, agent accuracy, hallucination rate, resolution-time improvement) |
| About | Bio, focus tags, and stat counters |
| Experience | Timeline of leadership/ambassador roles |
| Projects | 5 featured builds — DermAegis AI (skin lesion classifier), BharatHealth Analyst (LLM agent over public health data), Argus (spot-instance interruption forecasting), PharmaFlow Pro (pharmacy ERP), and an anonymous campus complaint portal |
| Skills | Grouped skill bars across languages, ML/DL, GenAI/LLMs, data, frameworks, databases, and cloud/DevOps |
| Awards | Hackathon wins and competition placements |
| Contact | Direct contact links |

## Notable implementation details

- **Scroll-spy navigation** — the navbar highlights whichever section is in view via `IntersectionObserver`, with a `MutationObserver` fallback so it still attaches correctly to sections that are lazy-loaded in after the initial mount ([src/components/Nav.jsx](src/components/Nav.jsx)).
- **Code-split sections** — everything below the hero (`About` through `Footer`) is lazy-loaded with `React.lazy` + `Suspense` to keep the initial bundle small.
- **Custom cursor, preloader, and scroll-triggered animations** via Framer Motion.
- **SEO basics** — canonical URL, Open Graph/Twitter meta tags, `robots.txt`, and `sitemap.xml`.

## Stack

- React 18 + Vite
- Framer Motion (animation)
- Plain CSS (per-component stylesheets, CSS custom properties for design tokens)
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/     # One component + stylesheet per section
├── data/
│   └── content.js  # All site copy — edit here to update content
├── App.jsx
└── main.jsx
```
