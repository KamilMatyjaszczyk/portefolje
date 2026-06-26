import { useCallback } from 'react'
import ProjectDetail from '../../../entities/project/ui/ProjectDetail'
import ProjectGrid from '../../../entities/project/ui/ProjectGrid'
import { useProjectRoute } from '../../../features/project-routing/model/useProjectRoute'
import { useLanguage } from '../../../shared/i18n/useLanguage'
import ModalPanel from '../../../shared/ui/ModalPanel'
import { getSectionContent } from '../model/sectionContent'

function SectionPanel({ activeSection, onClose }) {
  const { language } = useLanguage()
  const {
    activeProject,
    isProjectRouteOpen,
    openProject,
    showProjectList,
    closeProjectRoute,
  } = useProjectRoute(language)
  const content = getSectionContent(language)[activeSection]
  const isProjectList =
    activeSection === 'projects' ||
    (isProjectRouteOpen && !activeProject)
  const isOpen = Boolean(content || isProjectList || activeProject)

  const closePanel = useCallback(() => {
    closeProjectRoute()
    onClose()
  }, [closeProjectRoute, onClose])

  const handleEscape = useCallback(() => {
    if (activeProject) {
      showProjectList()
    } else {
      closePanel()
    }
  }, [activeProject, closePanel, showProjectList])

  return (
    <ModalPanel
      isOpen={isOpen}
      isDetail={Boolean(activeProject)}
      onClose={closePanel}
      onEscape={handleEscape}
      focusKey={
        activeProject?.slug ??
        activeSection ??
        (isProjectList ? 'projects' : 'closed')
      }
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
