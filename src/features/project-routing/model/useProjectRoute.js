import { useCallback, useEffect, useState } from 'react'
import { getProjectBySlug } from '../../../entities/project/data/projects.data'

const PROJECT_PATH_PATTERN = /^\/projects\/([^/]+)\/?$/

function readProjectRoute(language) {
  const match = window.location.pathname.match(PROJECT_PATH_PATTERN)
  return match ? getProjectBySlug(match[1], language) : null
}

export function useProjectRoute(language) {
  const [activeProject, setActiveProject] = useState(() =>
    readProjectRoute(language),
  )
  const [isProjectRouteOpen, setIsProjectRouteOpen] = useState(() =>
    window.location.pathname.startsWith('/projects'),
  )

  useEffect(() => {
    const syncRoute = () => {
      setActiveProject(readProjectRoute(language))
      setIsProjectRouteOpen(
        window.location.pathname.startsWith('/projects'),
      )
    }

    window.addEventListener('popstate', syncRoute)
    return () => window.removeEventListener('popstate', syncRoute)
  }, [language])

  useEffect(() => {
    setActiveProject(readProjectRoute(language))
  }, [language])

  const openProject = useCallback((project) => {
    window.history.pushState(
      { project: project.slug },
      '',
      `/projects/${project.slug}`,
    )
    setActiveProject(project)
    setIsProjectRouteOpen(true)
  }, [])

  const showProjectList = useCallback(() => {
    window.history.replaceState({}, '', '/projects')
    setActiveProject(null)
    setIsProjectRouteOpen(true)
  }, [])

  const closeProjectRoute = useCallback(() => {
    if (window.location.pathname.startsWith('/projects')) {
      window.history.replaceState({}, '', '/')
    }
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
