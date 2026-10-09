import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { fontsReady, onIntro } from '../lib/boot'
import { profile, heroRoles, heroMetrics } from '../data/content'
import RoleTypewriter from './ui/RoleTypewriter'
import Magnetic from './ui/Magnetic'
import './Hero.css'

const WORD = ['MD', 'RAYYAN']

function MetricTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % heroMetrics.length), 2600)
    return () => clearInterval(id)
  }, [])
  const m = heroMetrics[i]
  return (
    <div className="hero__metric" data-hero="fade">
      <span className="hero__metric-label mono">live_metrics</span>
      <div key={i} className="hero__metric-body">
        <strong className="mono">{m.value}</strong>
        <span>{m.label}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const rootRef = useRef(null)

  // initial hidden state (before the loader lifts)
  useLayoutEffect(() => {
    const root = rootRef.current
    gsap.set(root.querySelectorAll('.mask__in'), { yPercent: 115 })
    gsap.set(root.querySelectorAll('[data-hero="fade"]'), { opacity: 0, y: 24 })
    gsap.set('.nav', { yPercent: -120, opacity: 0 })

    let tl
    const off = onIntro(() => {
      fontsReady.then(() => {
        tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.to('.nav', { yPercent: 0, opacity: 1, duration: 1.2 }, 0.1)
          .to(root.querySelectorAll('.mask__in'), { yPercent: 0, duration: 1.5, stagger: 0.14 }, 0.25)
          .to(root.querySelectorAll('[data-hero="fade"]'), { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.7)
      })
    })
    return () => {
      off()
      tl?.kill()
    }
  }, [])

  // scroll-linked: frame opens to full-bleed, hero copy drifts and fades
  useLayoutEffect(() => {
    const root = rootRef.current
    const stageEl = document.querySelector('.stage')
    const mm = gsap.matchMedia()

    mm.add(
      { desk: '(min-width: 761px)', mob: '(max-width: 760px)' },
      (ctx) => {
        const { desk } = ctx.conditions
        const from = desk
          ? { '--it': '84px', '--ix': '20px', '--ib': '20px', '--r': '30px' }
          : { '--it': '70px', '--ix': '10px', '--ib': '10px', '--r': '22px' }
        gsap.fromTo(
          stageEl,
          from,
          {
            '--it': '0px',
            '--ix': '0px',
            '--ib': '0px',
            '--r': '0px',
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: () => `+=${window.innerHeight * 0.9}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        )
        gsap.to(root.querySelector('.hero__inner'), {
          yPercent: -14,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: '75% top', scrub: true },
        })
      }
    )
    return () => mm.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={rootRef} data-bg="dark">
      <div className="container hero__inner">
        <div className="hero__top">
          <p className="hero__kicker mono" data-hero="fade">
            <span className="hero__dot" /> Available for work — Hyderabad, IN
          </p>
          <MetricTicker />
        </div>

        <div className="hero__bottom">
          <h1 className="hero__word" aria-label={profile.name}>
            {WORD.map((w) => (
              <span className="mask" key={w} aria-hidden="true">
                <span className="mask__in">{w}</span>
              </span>
            ))}
          </h1>

          <div className="hero__row">
            <div className="hero__copy">
              <div data-hero="fade">
                <RoleTypewriter roles={heroRoles} />
              </div>
              <p className="hero__tagline" data-hero="fade">
                {profile.tagline}
              </p>
            </div>
            <div className="hero__cta" data-hero="fade">
              <Magnetic as="a" href="#projects" className="btn btn--primary">
                View my work
              </Magnetic>
              <Magnetic as="a" href="/resume.pdf" download="MD_Rayyan_Resume.pdf" className="btn btn--ghost">
                Download CV
              </Magnetic>
            </div>
          </div>
        </div>

        <a href="#story" className="hero__scroll mono" data-hero="fade">
          <span className="hero__scroll-line" />
          Scroll
        </a>
      </div>
    </section>
  )
}
