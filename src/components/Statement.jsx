import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import StatCounter from './ui/StatCounter'
import { statement, statementStats, labels } from '../data/content'
import './Statement.css'

const words = statement.split(' ')

// A large statement that fills in word by word as you scroll (60% -> 100% opacity, scrubbed).
export default function Statement() {
  const textRef = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.querySelectorAll('.word'),
        { opacity: 0.6 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 78%',
            end: 'bottom 52%',
            scrub: 0.4,
          },
        }
      )
    }, textRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="statement" className="statement theme-light" data-bg="light">
      <div className="container">
        <p className="eyebrow mono" data-reveal>
          {labels.statement}
        </p>
        <p className="statement__text" ref={textRef}>
          {words.map((w, i) => (
            <span className="word" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="statement__stats">
          {statementStats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
