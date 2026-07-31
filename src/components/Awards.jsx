import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { awards, certifications, education, profile } from '../data/content'
import './Awards.css'

export default function Awards() {
  return (
    <SectionWrapper id="awards" number="05" title="Awards &amp; Education">
      <div className="awards__grid">
        <div className="awards__col">
          <h3 className="awards__heading mono">Awards &amp; Achievements</h3>
          <ul className="awards__list">
            {awards.map((award, i) => (
              <motion.li
                key={award.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="awards__year mono">{award.year}</span>
                <div>
                  <p className="awards__title">{award.title}</p>
                  <p className="awards__detail">{award.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <h3 className="awards__heading mono awards__heading--spaced">Certifications</h3>
          <ul className="awards__certs">
            {certifications.map((cert, i) => (
              <motion.li
                key={cert}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {cert}
              </motion.li>
            ))}
          </ul>
          <a
            href={profile.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="awards__credly mono"
          >
            View credentials on Credly ↗
          </a>
        </div>

        <motion.div
          className="awards__edu"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="awards__heading mono">Education</h3>
          {education.map((edu) => (
            <div key={edu.school} className={`edu-card ${edu.primary ? 'edu-card--primary card' : ''}`}>
              <p className="edu-card__school">{edu.school}</p>
              <p className="edu-card__detail">{edu.detail}</p>
              <p className="edu-card__date mono">{edu.date}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
