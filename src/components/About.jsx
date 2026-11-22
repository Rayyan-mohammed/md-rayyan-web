import { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import TagPill from './ui/TagPill'
import Bold from './ui/Bold'
import { aboutCopy, aboutTags, profile, sectionNumbers } from '../data/content'
import './About.css'

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <SectionWrapper id="about" number={sectionNumbers.about} title="About">
      <div className="about__grid">
        <div className="about__bio" data-reveal>
          <p className="about__lead">
            {aboutCopy.lead} <em>{aboutCopy.leadEmphasis}</em>
          </p>
          {aboutCopy.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Bold text={paragraph} />
            </p>
          ))}

          <div className="about__tags">
            {aboutTags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </div>

        <div className="about__photo-wrap" data-reveal>
          <div className="about__photo-frame">
            {!imgError ? (
              <img
                src="/photo.jpg"
                alt={profile.name}
                width="1000"
                height="1333"
                loading="lazy"
                decoding="async"
                data-parallax
                onError={() => setImgError(true)}
                className="about__photo"
              />
            ) : (
              <div className="about__photo-fallback">{profile.initials}</div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
