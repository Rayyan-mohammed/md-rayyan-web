import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import './Marquee.css'

// Endless ticker whose speed and direction follow scroll velocity.
export default function Marquee({ items }) {
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const loop = gsap.to(trackRef.current, { xPercent: -50, ease: 'none', duration: 55, repeat: -1 })
      ScrollTrigger.create({
        onUpdate: (self) => {
          const dir = self.direction
          const boost = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 220, 9))
          gsap.fromTo(loop, { timeScale: boost }, { timeScale: dir, duration: 1.1, ease: 'power2.out', overwrite: true })
        },
      })
    }, trackRef)
    return () => ctx.revert()
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
