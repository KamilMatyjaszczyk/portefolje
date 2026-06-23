import { portfolioProjects } from '../data/projects.data'
import ProjectCard from './ProjectCard'

function ProjectGrid({ onOpenProject }) {
  return (
    <>
      <p className="panel-eyebrow">UTVALGT ARBEID</p>
      <h2 id="panel-title">Prosjekter jeg har bygget.</h2>
      <p className="panel-intro">
        Et lite utvalg arbeid innen frontend, systemutvikling og
        interaksjonsdesign.
      </p>
      <div className="project-grid">
        {portfolioProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </>
  )
}

export default ProjectGrid
