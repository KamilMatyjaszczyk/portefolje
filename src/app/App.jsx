import { useSyncExternalStore } from 'react'
import { getProjectBySlug } from '../entities/project/data/projects.data'
import HomePage from '../pages/home/HomePage'
import NotFoundPage from '../pages/not-found/NotFoundPage'
import LanguageProvider from '../shared/i18n/LanguageProvider'
import {
  addRouteChangeListener,
  getProjectSlugFromPath,
  getSectionFromPath,
} from '../shared/routing/routes'

const getPathname = () => window.location.pathname

function App() {
  const pathname = useSyncExternalStore(addRouteChangeListener, getPathname)
  const slug = getProjectSlugFromPath(pathname)
  const isHome = /^\/*$/.test(pathname)
  const isKnownPath = isHome || Boolean(getSectionFromPath(pathname))
  const isMissingProject = Boolean(slug && !getProjectBySlug(slug))

  return (
    <LanguageProvider>
      {!isKnownPath || isMissingProject ? <NotFoundPage /> : <HomePage />}
    </LanguageProvider>
  )
}

export default App
