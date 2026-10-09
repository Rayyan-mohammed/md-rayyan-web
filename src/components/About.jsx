import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import TagPill from './ui/TagPill'
import { aboutTags, profile } from '../data/content'
import './About.css'

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <SectionWrapper id="about" number="01" title="About">
      <div className="about__grid">
        <motion.div
          className="about__bio"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="about__lead">
            I&apos;m a final-year B.Tech CSE (Data Science) student at STME, NMIMS University,
            Hyderabad, building end-to-end machine learning systems —{' '}
            <em>from computer vision models that classify skin lesions with fairness-aware
            evaluation, to LLM agents that reason over structured public-health data with zero
            hallucination.</em>
          </p>
          <p>
            My current focus spans two directions: production-grade ML pipelines (transfer
            learning, uncertainty estimation, explainability) and applied GenAI (LangChain ReAct
            agents, RAG, multi-LLM orchestration) — always shipped as real, deployed products
            rather than notebooks.
          </p>
          <p>
            Outside of building, I lead as{' '}
            <strong>Head of the Code IT Club</strong> and served as a{' '}
            <strong>Google Cloud Student Ambassador</strong> across 7 campuses, running events and
            workshops that have reached 1,000+ students.
          </p>

          <div className="about__tags">
            {aboutTags.map((tag, i) => (
              <TagPill key={tag} delay={i * 0.06}>
                {tag}
              </TagPill>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__photo-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about__photo-frame">
            {!imgError ? (
              <img
                src="/photo.jpg"
                alt={profile.name}
                loading="lazy"
                data-parallax
                onError={() => setImgError(true)}
                className="about__photo"
              />
            ) : (
              <div className="about__photo-fallback">{profile.initials}</div>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
