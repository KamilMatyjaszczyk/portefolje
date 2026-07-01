export const SECTION_PATHS = {
  about: '/om-meg',
  projects: '/prosjekter',
  skills: '/ferdigheter',
  contact: '/kontakt',
}

const LEGACY_SECTION_PATHS = {
  '/projects': 'projects',
}

const PROJECT_PATH_PATTERN = /^\/(?:prosjekter|projects)\/([^/]+)\/?$/
const ROUTE_CHANGE_EVENT = 'portfolio-route-change'

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/'

  return pathname.replace(/\/+$/, '') || '/'
}

export function getSectionPath(section) {
  return SECTION_PATHS[section] ?? '/'
}

export function getProjectPath(slug) {
  return `/prosjekter/${slug}`
}

export function getProjectSlugFromPath(pathname) {
  const match = normalizePathname(pathname).match(PROJECT_PATH_PATTERN)
  return match?.[1] ?? null
}

export function getSectionFromPath(pathname) {
  const normalizedPath = normalizePathname(pathname)
  const sectionEntry = Object.entries(SECTION_PATHS).find(
    ([, path]) => path === normalizedPath,
  )

  if (sectionEntry) return sectionEntry[0]
  if (LEGACY_SECTION_PATHS[normalizedPath]) {
    return LEGACY_SECTION_PATHS[normalizedPath]
  }
  if (getProjectSlugFromPath(normalizedPath)) return 'projects'

  return null
}

export function isProjectsPath(pathname) {
  return getSectionFromPath(pathname) === 'projects'
}

export function navigateToPath(path, state = {}, options = {}) {
  const method = options.replace ? 'replaceState' : 'pushState'

  if (normalizePathname(window.location.pathname) !== normalizePathname(path)) {
    window.history[method](state, '', path)
  }

  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT))
}

export function addRouteChangeListener(listener) {
  window.addEventListener('popstate', listener)
  window.addEventListener(ROUTE_CHANGE_EVENT, listener)

  return () => {
    window.removeEventListener('popstate', listener)
    window.removeEventListener(ROUTE_CHANGE_EVENT, listener)
  }
}
