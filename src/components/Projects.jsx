import SectionWrapper from './SectionWrapper'
import ProjectCard from './ui/ProjectCard'
import { projects } from '../data/content'
import './Projects.css'

export default function Projects() {
  return (
    <SectionWrapper
      id="projects"
      number="03"
      title="Selected Work"
      subtitle="Five projects spanning computer vision, LLM agents, and full-stack platforms — each shipped, not just prototyped."
    >
      <div className="projects__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
