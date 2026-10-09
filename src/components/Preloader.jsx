import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { bootProgress, pendingTask, startIntro, rememberLoader } from '../lib/boot'
import { startScroll, stopScroll } from '../lib/smooth'
import { profile } from '../data/content'
import './Preloader.css'

const MIN_MS = 1800
const LABELS = {
  fonts: 'Setting the type',
  engine: 'Starting the engine',
  scene: 'Forming particles',
}

// Counter 000 -> 100 driven by real work (fonts, three.js, first scene frame), then lifts like a curtain.
export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const barRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    stopScroll()
    const start = performance.now()
    let shown = 0
    let finished = false
    let lift = null

    const tick = () => {
      const target = Math.min(bootProgress(), (performance.now() - start) / MIN_MS, 1) * 100
      shown += (target - shown) * 0.1
      if (target >= 100 && shown > 99.3) shown = 100
      numRef.current.textContent = String(Math.round(shown)).padStart(3, '0')
      barRef.current.style.transform = `scaleX(${shown / 100})`
      const pending = pendingTask()
      labelRef.current.textContent = shown >= 100 ? 'Ready' : pending ? LABELS[pending] : 'Almost there'

      if (shown >= 100 && !finished) {
        finished = true
        gsap.ticker.remove(tick)
        lift = gsap
          .timeline({
            onComplete: () => {
              rememberLoader()
              startScroll()
              onDone()
            },
          })
          .to('.loader__content', { yPercent: -30, opacity: 0, duration: 0.6, ease: 'power3.in' })
          .add(startIntro, '>-0.1')
          .to(rootRef.current, { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '<')
      }
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      lift?.kill()
    }
  }, [onDone])

  return (
    <div className="loader" ref={rootRef} role="status" aria-label="Loading">
      <div className="loader__top mono">
        <span>{profile.name}</span>
        <span>Portfolio — {new Date().getFullYear()}</span>
      </div>
      <div className="loader__content">
        <p className="loader__label mono" ref={labelRef}>
          Setting the type
        </p>
        <div className="loader__count">
          <span className="loader__num" ref={numRef}>
            000
          </span>
          <span className="loader__pct">%</span>
        </div>
      </div>
      <div className="loader__bar">
        <i ref={barRef} />
      </div>
    </div>
  )
}
