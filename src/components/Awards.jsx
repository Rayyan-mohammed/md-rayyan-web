import SectionWrapper from './SectionWrapper'
import { awards, certifications, education, profile } from '../data/content'
import './Awards.css'

export default function Awards() {
  return (
    <SectionWrapper id="awards" number="05" title="Awards &amp; Education">
      <div className="award-grid">
        {awards.map((award) => (
          <article className="award-card" key={award.title} data-reveal data-cursor-hover>
            <span className="award-card__year" aria-hidden="true">
              {award.year}
            </span>
            <span className="award-card__tag mono">{award.year}</span>
            <h3 className="award-card__title">{award.title}</h3>
            <p className="award-card__detail">{award.detail}</p>
          </article>
        ))}
      </div>

      <div className="awards__cols">
        <div data-reveal>
          <h3 className="awards__heading mono">Education</h3>
          <div className="edu-list">
            {education.map((edu) => (
              <div key={edu.school} className={`edu-card ${edu.primary ? 'edu-card--primary' : ''}`}>
                <p className="edu-card__date mono">{edu.date}</p>
                <p className="edu-card__school">{edu.school}</p>
                <p className="edu-card__detail">{edu.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          <h3 className="awards__heading mono">Certifications</h3>
          <ul className="awards__certs">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
          <a href={profile.credly} target="_blank" rel="noopener noreferrer" className="awards__credly mono">
            View credentials on Credly <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
