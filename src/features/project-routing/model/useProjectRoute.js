import { useCallback, useEffect, useState } from 'react'
import { getProjectBySlug } from '../../../entities/project/data/projects.data'
import {
  addRouteChangeListener,
  getProjectPath,
  getProjectSlugFromPath,
  isProjectsPath,
  navigateToPath,
} from '../../../shared/routing/routes'

function readProjectRoute(language) {
  const slug = getProjectSlugFromPath(window.location.pathname)
  return slug ? getProjectBySlug(slug, language) : null
}

export function useProjectRoute(language) {
  const [activeProject, setActiveProject] = useState(() =>
    readProjectRoute(language),
  )
  const [isProjectRouteOpen, setIsProjectRouteOpen] = useState(() =>
    isProjectsPath(window.location.pathname),
  )

  useEffect(() => {
    const syncRoute = () => {
      setActiveProject(readProjectRoute(language))
      setIsProjectRouteOpen(isProjectsPath(window.location.pathname))
    }

    return addRouteChangeListener(syncRoute)
  }, [language])

  useEffect(() => {
    setActiveProject(readProjectRoute(language))
    setIsProjectRouteOpen(isProjectsPath(window.location.pathname))
  }, [language])

  const openProject = useCallback((project) => {
    navigateToPath(getProjectPath(project.slug), { project: project.slug })
    setActiveProject(project)
    setIsProjectRouteOpen(true)
  }, [])

  const showProjectList = useCallback(() => {
    navigateToPath('/prosjekter', { section: 'projects' })
    setActiveProject(null)
    setIsProjectRouteOpen(true)
  }, [])

  const closeProjectRoute = useCallback(() => {
    setActiveProject(null)
    setIsProjectRouteOpen(false)
  }, [])

  return {
    activeProject,
    isProjectRouteOpen,
    openProject,
    showProjectList,
    closeProjectRoute,
  }
}
