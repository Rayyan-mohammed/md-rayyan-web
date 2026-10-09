import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { maskLines } from '../lib/split'
import { scrollToTarget } from '../lib/smooth'
import { stage } from '../lib/stage'
import { storyChapters } from '../data/content'
import './Story.css'

const N = storyChapters.length
const pad = (n) => String(n).padStart(2, '0')

// Pinned chapters. Each one morphs the particle object into a new shape and
// reveals its headline line by line out of overflow masks.
export default function Story() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const stRef = useRef(null)
  const [active, setActive] = useState(-1)

  useLayoutEffect(() => {
    const root = rootRef.current
    const chapters = [...root.querySelectorAll('.chapter')]
    const lineSets = chapters.map(() => [])
    const open = chapters.map(() => false)
    const offs = []
    let current = -1

    const ctx = gsap.context(() => {
      gsap.set(root.querySelectorAll('.chapter__meta, .chapter__body'), { opacity: 0, y: 24 })

      chapters.forEach((ch, i) => {
        const title = ch.querySelector('.chapter__title')
        offs.push(
          maskLines(title, (lines) => {
            lineSets[i] = lines
            gsap.set(title, { visibility: 'visible' })
            gsap.set(lines, { yPercent: open[i] ? 0 : 115 })
          })
        )
      })

      const show = (i) => {
        const ch = chapters[i]
        open[i] = true
        gsap.killTweensOf(lineSets[i])
        gsap.to(lineSets[i], { yPercent: 0, duration: 1.2, stagger: 0.11, ease: 'expo.out', delay: 0.25 })
        gsap.to(ch.querySelectorAll('.chapter__meta, .chapter__body'), {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.4,
          ease: 'power3.out',
          overwrite: true,
        })
      }
      const hide = (i, dir) => {
        const ch = chapters[i]
        open[i] = false
        gsap.killTweensOf(lineSets[i])
        gsap.to(lineSets[i], { yPercent: dir * 115, duration: 0.55, stagger: 0.04, ease: 'power3.in' })
        gsap.to(ch.querySelectorAll('.chapter__meta, .chapter__body'), {
          opacity: 0,
          y: dir * 18,
          duration: 0.4,
          ease: 'power2.in',
          overwrite: true,
        })
      }

      // idx: -1 before the story, 0..N-1 chapters, N after it
      const go = (idx) => {
        if (idx === current) return
        const dir = idx > current ? -1 : 1
        if (current >= 0 && current < N) hide(current, dir === -1 ? -1 : 1)
        current = idx
        if (idx >= 0 && idx < N) show(idx)
        setActive(idx >= 0 && idx < N ? idx : -1)
        if (idx < 0) stage.setShape(0)
        else if (idx < N) stage.setShape(idx + 1)
      }

      stRef.current = ScrollTrigger.create({
        trigger: root,
        pin: pinRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * N}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress
          if (p <= 0) return go(-1)
          if (p >= 1) return go(N)
          go(Math.min(N - 1, Math.floor(p * N)))
        },
        onLeave: () => go(N),
        onLeaveBack: () => go(-1),
      })

      // spin follows scroll across hero + story; the stage only renders while it can be seen
      ScrollTrigger.create({
        trigger: document.getElementById('hero'),
        endTrigger: root,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => stage.setSpin(self.progress * Math.PI * 1.5),
        onToggle: (self) => stage.setActive(self.isActive),
      })

      // rail + hud only while chapters are on screen
      ScrollTrigger.create({
        trigger: root,
        start: 'top 60%',
        end: 'bottom 40%',
        toggleClass: { targets: root, className: 'story--live' },
      })
    }, root)

    return () => {
      offs.forEach((off) => off())
      ctx.revert()
    }
  }, [])

  const jump = (i) => {
    const st = stRef.current
    if (!st) return
    scrollToTarget(st.start + ((i + 0.5) / N) * (st.end - st.start), { duration: 1.6 })
  }

  return (
    <section id="story" className="story" ref={rootRef} data-bg="dark" aria-label="How I work">
      <div className="story__pin" ref={pinRef}>
        <div className="container story__inner">
          <p className="story__label mono">How I work</p>
          <div className="story__stack">
            {storyChapters.map((c, i) => (
              <article className="chapter" key={c.title} aria-hidden={active !== i}>
                <p className="chapter__meta mono">
                  {pad(i + 1)} <span>/ {pad(N)}</span>
                </p>
                <h2 className="chapter__title">{c.title}</h2>
                <p className="chapter__body">{c.body}</p>
              </article>
            ))}
          </div>
          {active >= 0 && (
            <span className="story__ghost" key={active} aria-hidden="true">
              {pad(active + 1)}
            </span>
          )}
          <p className="story__hud mono" aria-hidden="true">
            shape · {active >= 0 ? storyChapters[active].shape : '—'}
          </p>
        </div>
      </div>

      <nav className="rail" aria-label="Chapters">
        <span className="rail__line" />
        <span className="rail__marker" style={{ '--i': Math.max(active, 0) }} />
        {storyChapters.map((c, i) => (
          <button
            key={c.shape}
            className={`rail__item mono ${active === i ? 'rail__item--on' : ''}`}
            onClick={() => jump(i)}
            aria-label={`Chapter ${i + 1}: ${c.title}`}
            aria-current={active === i}
          >
            {pad(i + 1)}
          </button>
        ))}
      </nav>
    </section>
  )
}
