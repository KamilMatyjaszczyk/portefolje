import { useLanguage } from '../../../shared/i18n/useLanguage'

function ProjectCard({ project, onOpen }) {
  const { t } = useLanguage()

  return (
    <button
      className="project-card"
      type="button"
      onClick={() => onOpen(project)}
    >
      <span>
        {project.number} / {project.category}
      </span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <small>{project.technologies.join(' · ')}</small>
      <b aria-hidden="true">{t('viewProject')} →</b>
    </button>
  )
}

export default ProjectCard
