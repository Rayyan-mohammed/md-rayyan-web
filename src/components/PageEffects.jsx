import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { fontsReady } from '../lib/boot'
import { scrollToTarget } from '../lib/smooth'
import { splitReveal } from '../lib/split'
import { useReducedMotion } from '../lib/useReducedMotion'

const HEADER_OFFSET = 72

// Page-wide behaviour that needs every section mounted: header colour, scroll-spy,
// staggered [data-reveal] fade-ups, masked [data-split] titles, parallax, anchor glide.
export default function PageEffects() {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const nav = document.querySelector('.nav')
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    const links = [...document.querySelectorAll('[data-nav]')]
    const cleanups = []

    const setTheme = (bg) => {
      nav.dataset.bg = bg
      metaTheme?.setAttribute('content', bg === 'light' ? '#efe9db' : '#0a0a0a')
    }

    const setActiveNav = (id) => {
      links.forEach((a) => {
        const on = id !== null && a.dataset.nav === id
        a.classList.toggle('is-active', on)
        if (on) a.setAttribute('aria-current', 'location')
        else a.removeAttribute('aria-current')
      })
    }

    const ctx = gsap.context(() => {
      // header turns light/dark with the section underneath
      document.querySelectorAll('main [data-bg], footer[data-bg]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40px',
          end: 'bottom 40px',
          onToggle: (self) => {
            if (self.isActive) setTheme(el.dataset.bg)
          },
        })
      })

      // scroll-spy (only sections that actually have a nav entry)
      document.querySelectorAll('main section[id]').forEach((el) => {
        if (!links.some((a) => a.dataset.nav === el.id)) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (!self.isActive) return
            setActiveNav(el.id)
          },
        })
      })
      ScrollTrigger.create({
        trigger: document.getElementById('hero'),
        start: 'top top',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActiveNav(null),
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

      if (reduced) {
        // no animation, but make sure nothing is left hidden
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
        gsap.set('[data-split], .chapter__title', { visibility: 'visible' })
      } else {
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
      }
    })

    // masked, line-by-line section titles
    if (!reduced) document.querySelectorAll('[data-split]').forEach((el) => cleanups.push(splitReveal(el)))

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
      history.replaceState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)

    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash || hash.length < 2) return
      const id = decodeURIComponent(hash.slice(1))
      if (id === 'main-content') return
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.refresh()
      const top =
        id === 'hero' ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
      requestAnimationFrame(() => scrollToTarget(top, { duration: reduced ? 0 : 1.4 }))
    }

    const onHashChange = () => {
      if (window.location.hash) scrollToHash()
    }
    window.addEventListener('hashchange', onHashChange)

    // wait for the loader curtain to leave before moving a direct-link visitor
    let alive = true
    let stopWaiting = () => {}
    const startHash = () => {
      fontsReady.then(() => alive && requestAnimationFrame(scrollToHash))
    }
    if (document.querySelector('.loader')) {
      const observer = new MutationObserver(() => {
        if (!document.querySelector('.loader')) {
          observer.disconnect()
          startHash()
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
      if (!document.querySelector('.loader')) {
        observer.disconnect()
        startHash()
      }
      stopWaiting = () => observer.disconnect()
    } else {
      startHash()
    }

    // layout settles after fonts/images
    fontsReady.then(() => alive && ScrollTrigger.refresh())
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      alive = false
      stopWaiting()
      window.removeEventListener('load', onLoad)
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [reduced])

  return null
}
