import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import TagPill from './ui/TagPill'
import { experience } from '../data/content'
import './Experience.css'

export default function Experience() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <SectionWrapper
      id="experience"
      split
      number="02"
      title="Experience"
      subtitle="Leadership roles where I've translated technical skill into community impact."
    >
      <div className="timeline" ref={timelineRef}>
        <div className="timeline__line" />
        <motion.div className="timeline__line-fill" style={{ scaleY: lineScale }} />
        {experience.map((role, i) => (
          <motion.div
            key={role.title + role.org}
            className="timeline__item"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
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
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.1 + bi * 0.08 }}
                  >
                    {b}
                  </motion.li>
                ))}
              </ul>
              <div className="timeline__tags">
                {role.tags.map((tag, ti) => (
                  <TagPill key={tag} delay={i * 0.12 + 0.2 + ti * 0.05}>
                    {tag}
                  </TagPill>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
