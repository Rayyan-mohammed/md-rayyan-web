import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

// Counts up once, the first time it scrolls into view.
export default function StatCounter({ value, suffix = '', label, duration = 2 }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)

  useLayoutEffect(() => {
    const state = { v: 0 }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(state, {
            v: value,
            duration,
            ease: 'power3.out',
            onUpdate: () => {
              numRef.current.textContent = Math.round(state.v).toLocaleString('en-US')
            },
          }),
      })
    }, rootRef)
    return () => ctx.revert()
  }, [value, duration])

  return (
    <div ref={rootRef} className="stat" data-reveal>
      <div className="stat__value mono">
        <span ref={numRef}>0</span>
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}
