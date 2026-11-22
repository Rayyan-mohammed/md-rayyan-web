import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import SectionWrapper from './SectionWrapper'
import TagPill from './ui/TagPill'
import { experience, labels, sectionNumbers } from '../data/content'
import './Experience.css'

export default function Experience() {
  const timelineRef = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const line = timelineRef.current.querySelector('.timeline__line-fill')
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(line, { scaleY: 1 })
        return
      }
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )
    }, timelineRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <SectionWrapper
      id="experience"
      number={sectionNumbers.experience}
      title="Experience"
      subtitle={labels.experienceSubtitle}
    >
      <div className="timeline" ref={timelineRef}>
        <div className="timeline__line" />
        <div className="timeline__line-fill" />
        {experience.map((role) => (
          <div key={role.title + role.org} className="timeline__item" data-reveal>
            <span className="timeline__dot" />
            <div className="timeline__content">
              <div className="timeline__header">
                <h3 className="timeline__title">
                  {role.title} <span className="timeline__org">{role.org}</span>
                </h3>
                <span className="timeline__date mono">{role.date}</span>
              </div>
              <ul className="timeline__bullets">
                {role.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
              <div className="timeline__tags">
                {role.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
