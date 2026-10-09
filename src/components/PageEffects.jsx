import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { fontsReady } from '../lib/boot'
import { scrollToTarget } from '../lib/smooth'
import { splitReveal } from '../lib/split'

// Page-wide behaviour that needs every section mounted: header colour, scroll-spy,
// staggered [data-reveal] fade-ups, masked [data-split] titles, parallax, anchor glide.
export default function PageEffects() {
  useLayoutEffect(() => {
    const nav = document.querySelector('.nav')
    const links = [...document.querySelectorAll('[data-nav]')]
    const cleanups = []

    const ctx = gsap.context(() => {
      // header turns light/dark with the section underneath
      document.querySelectorAll('main [data-bg], footer[data-bg]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40px',
          end: 'bottom 40px',
          onToggle: (self) => {
            if (self.isActive) nav.dataset.bg = el.dataset.bg
          },
        })
      })

      // scroll-spy
      document.querySelectorAll('main section[id]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (!self.isActive) return
            links.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === el.id))
          },
        })
      })
      ScrollTrigger.create({
        trigger: document.getElementById('hero'),
        start: 'top top',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && links.forEach((a) => a.classList.remove('is-active')),
      })

      // top progress hairline
      const bar = document.querySelector('.nav__progress i')
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`
        },
      })

      // generic staggered fade-ups
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: 'power3.out', overwrite: true }),
      })

      // parallax images
      document.querySelectorAll('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    })

    // masked, line-by-line section titles
    document.querySelectorAll('[data-split]').forEach((el) => cleanups.push(splitReveal(el)))

    // in-page links glide
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]')
      if (!a || a.getAttribute('href') === '#') return
      const id = a.getAttribute('href').slice(1)
      if (id === 'main-content') return
      const target = id === 'hero' ? 0 : document.getElementById(id)
      if (target === null) return
      e.preventDefault()
      scrollToTarget(target, { duration: id === 'hero' ? 2 : 1.7 })
    }
    document.addEventListener('click', onClick)

    // layout settles after fonts/images
    let alive = true
    fontsReady.then(() => alive && ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      alive = false
      window.removeEventListener('load', onLoad)
      document.removeEventListener('click', onClick)
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return null
}
