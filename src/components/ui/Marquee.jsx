import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import './Marquee.css'

// Endless ticker whose speed and direction follow scroll velocity. It pauses
// when it is off screen, and reuses one quickTo instead of allocating a tween
// on every scroll frame.
export default function Marquee({ items }) {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    let applySpeed = null
    const ctx = gsap.context(() => {
      const loop = gsap.to(trackRef.current, { xPercent: -50, ease: 'none', duration: 55, repeat: -1 })
      const speed = { value: 1 }
      const setSpeed = gsap.quickTo(speed, 'value', { duration: 0.5, ease: 'power2.out' })
      applySpeed = () => loop.timeScale(speed.value)
      gsap.ticker.add(applySpeed)

      const st = ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => loop.paused(!self.isActive),
        onUpdate: (self) => {
          if (!self.isActive) return
          const dir = self.direction || 1
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 9)
          setSpeed(dir * boost)
        },
      })
      loop.paused(!st.isActive)
    }, trackRef)

    return () => {
      if (applySpeed) gsap.ticker.remove(applySpeed)
      ctx.revert()
    }
  }, [])

  const group = (key) => (
    <div className="marquee__group" key={key} aria-hidden={key === 'b' ? 'true' : undefined}>
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <i className="marquee__sep">✦</i>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" data-bg="dark" role="presentation">
      <div className="marquee__track" ref={trackRef}>
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}
