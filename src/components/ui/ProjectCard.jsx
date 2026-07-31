import { motion } from 'framer-motion'
import TagPill from './TagPill'
import Bold from './Bold'
import { IconGithub, IconExternal } from './Icons'
import './ProjectCard.css'

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className={`project-card__cover project-card__cover--${(index % 5) + 1}`}>
        <span className="project-card__number">{project.number}</span>
      </div>

      <div className="project-card__body">
        <div className="project-card__top">
          <div>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__subtitle">{project.subtitle}</p>
          </div>
          <span className="project-card__year mono">{project.year}</span>
        </div>

        <p className="project-card__desc">
          <Bold text={project.description} />
        </p>

        <ul className="project-card__highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>
              <Bold text={h} />
            </li>
          ))}
        </ul>

        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <div className="project-card__links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <IconGithub /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card__link">
              <IconExternal /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
