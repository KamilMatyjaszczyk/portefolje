import { useEffect } from 'react'
import ProjectDetail from '../../../entities/project/ui/ProjectDetail'
import ProjectGrid from '../../../entities/project/ui/ProjectGrid'
import { useProjectRoute } from '../../../features/project-routing/model/useProjectRoute'
import ModalPanel from '../../../shared/ui/ModalPanel'
import { sectionContent } from '../model/sectionContent'

function SectionPanel({ activeSection, onClose }) {
  const {
    activeProject,
    isProjectRouteOpen,
    openProject,
    showProjectList,
    closeProjectRoute,
  } = useProjectRoute()
  const content = sectionContent[activeSection]
  const isProjectList =
    activeSection === 'projects' ||
    (isProjectRouteOpen && !activeProject)
  const isOpen = Boolean(content || isProjectList || activeProject)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || !activeProject) return
      event.stopPropagation()
      showProjectList()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, showProjectList])

  const closePanel = () => {
    closeProjectRoute()
    onClose()
  }

  return (
    <ModalPanel
      isOpen={isOpen}
      isDetail={Boolean(activeProject)}
      onClose={closePanel}
    >
      {isOpen &&
        (activeProject ? (
          <ProjectDetail
            project={activeProject}
            onBack={showProjectList}
          />
        ) : isProjectList ? (
          <ProjectGrid onOpenProject={openProject} />
        ) : (
          <>
            <p className="panel-eyebrow">{content.eyebrow}</p>
            <h2 id="panel-title">{content.title}</h2>
            <p className="panel-intro">{content.intro}</p>
            <div className="panel-body">{content.body}</div>
          </>
        ))}
    </ModalPanel>
  )
}

export default SectionPanel
