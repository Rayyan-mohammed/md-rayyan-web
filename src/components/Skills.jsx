import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SectionWrapper from './SectionWrapper'
import { skillGroups } from '../data/content'
import './Skills.css'

// Each skill is a pill whose gold fill grows to its level when the card scrolls into view.
export default function Skills() {
  const gridRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gridRef.current.querySelectorAll('.skills__col').forEach((col) => {
        ScrollTrigger.create({
          trigger: col,
          start: 'top 85%',
          once: true,
          onEnter: () => col.classList.add('is-in'),
        })
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="skills" number="04" title="Skills" subtitle="Tools I reach for, and how deep I go with each.">
      <div className="skills__grid" ref={gridRef}>
        {skillGroups.map((group, gi) => (
          <div key={group.category} className="skills__col" data-reveal>
            <div className="skills__top">
              <span className="skills__idx mono">{String(gi + 1).padStart(2, '0')}</span>
              <h3 className="skills__cat">{group.category}</h3>
            </div>
            <div className="skills__items">
              {group.items.map((item, ii) => (
                <span
                  key={item.name}
                  className="skill mono"
                  style={{ '--lv': item.level / 100, '--d': `${0.15 + ii * 0.07}s` }}
                  title={`${item.level}%`}
                >
                  <i className="skill__fill" />
                  <span className="skill__name">{item.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
