import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import StatCounter from './ui/StatCounter'
import { statement, statementStats } from '../data/content'
import './Statement.css'

const words = statement.split(' ')

// A large statement that fills in word by word as you scroll (16% -> 100% opacity, scrubbed).
export default function Statement() {
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.querySelectorAll('.word'),
        { opacity: 0.16 },
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
  }, [])

  return (
    <section id="approach" className="statement theme-light" data-bg="light">
      <div className="container">
        <p className="eyebrow mono" data-reveal>
          The short version
        </p>
        <p className="statement__text" ref={textRef} aria-label={statement}>
          {words.map((w, i) => (
            <span className="word" key={i} aria-hidden="true">
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
