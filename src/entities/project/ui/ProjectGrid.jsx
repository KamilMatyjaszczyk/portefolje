import { getPortfolioProjects } from '../data/projects.data'
import { useLanguage } from '../../../shared/i18n/useLanguage'
import ProjectCard from './ProjectCard'

function ProjectGrid({ onOpenProject }) {
  const { language, t } = useLanguage()
  const projects = getPortfolioProjects(language)

  return (
    <>
      <p className="panel-eyebrow">{t('selectedWork')}</p>
      <h2 id="panel-title">{t('projectsTitle')}</h2>
      <p className="panel-intro">{t('projectsIntro')}</p>
      <div className="project-grid">
        {projects.map((project) => (
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
