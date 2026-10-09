# MD Rayyan — Portfolio

Personal portfolio site for MD Rayyan, AI/ML Engineer & Full-Stack Developer.

**Live:** https://rayyan-mohammed.vercel.app/

## What this is

A single-page React portfolio built from scratch, with the motion as the main feature: a WebGL particle object that morphs as you scroll, Lenis inertia scrolling wired into GSAP ScrollTrigger, and a pinned sideways project reel. Most copy lives in [src/data/content.js](src/data/content.js).

## Page flow

| Section | What happens |
|---|---|
| Loader | Counter 000 to 100 driven by real work (fonts, three.js, first scene frame), then lifts like a curtain. Shown once per session. |
| Hero | Dark rounded frame holding a three.js `Points` object (custom `ShaderMaterial`, additive blending, 7k to 14k points depending on device). Wordmark slides up out of overflow masks. The frame expands to full-bleed as you scroll out. |
| Approach | Five pinned chapters. The particle object bursts and re-forms into brackets, cube, node graph, rings and a heart. Spin follows scroll, pointer adds parallax, headlines reveal line by line, and a fixed rail shows the active chapter. |
| Statement | A large statement that fills word by word with scroll, plus count-up stats. |
| About / Experience | Bio with a parallax photo, and a scroll-filled timeline. |
| Work | Pinned, scrolls sideways on desktop with a progress bar. Cards invert to dark on hover. Stacks vertically on mobile. |
| Skills | Velocity-reactive marquee and grouped skills. |
| Awards / Contact | Awards and education, then a giant email and phone link, socials, availability note and live Hyderabad time. |

The header switches between light and dark depending on the section behind it.

## Notable implementation details

- **Smooth scroll** with Lenis, driven by `gsap.ticker` and synced via `lenis.on('scroll', ScrollTrigger.update)` ([src/lib/smooth.js](src/lib/smooth.js)). In-page links glide.
- **Particle engine** in [src/lib/ParticleScene.js](src/lib/ParticleScene.js) with shape generators in [src/lib/shapes.js](src/lib/shapes.js). three.js is a lazy chunk, and the scene only renders while the hero and story are visible.
- **Boot tracker** in [src/lib/boot.js](src/lib/boot.js) so the loader reflects real loading, and the intro plays when it finishes.
- **Reduced motion** is respected: no smooth scroll, no loader, static particles.
- **SEO basics**: canonical URL, Open Graph and Twitter meta tags, `robots.txt` and `sitemap.xml`.

## Stack

- React 18 + Vite
- GSAP (ScrollTrigger, SplitText), Lenis, three.js
- Framer Motion for small component transitions
- Plain CSS with custom properties for design tokens
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
