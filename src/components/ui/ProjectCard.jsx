import Bold from './Bold'
import { IconGithub, IconExternal } from './Icons'
import './ProjectCard.css'

// Light card that inverts to dark on hover (pure CSS, see ProjectCard.css).
export default function ProjectCard({ project }) {
  return (
    <article className="pcard" data-cursor-hover>
      <span className="pcard__bignum" aria-hidden="true">
        {project.number}
      </span>

      <div className="pcard__head mono">
        <span>{project.number}</span>
        <span>{project.year}</span>
      </div>

      <h3 className="pcard__title">{project.title}</h3>
      <p className="pcard__sub">{project.subtitle}</p>

      <p className="pcard__desc">
        <Bold text={project.description} />
      </p>

      <ul className="pcard__highlights">
        {project.highlights.map((h, i) => (
          <li key={i}>
            <Bold text={h} />
          </li>
        ))}
      </ul>

      <div className="pcard__tags">
        {project.tags.map((tag) => (
          <span className="chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="pcard__links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="pcard__link">
            <IconGithub /> GitHub
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pcard__link">
            <IconExternal /> Live demo
          </a>
        )}
      </div>
    </article>
  )
}
