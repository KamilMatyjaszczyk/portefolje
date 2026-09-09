import * as gameboy from './gameboy-emulator.data.js'
import * as homelab from './homelab.data.js'
import * as gama from './gama-multiagent-simulation.data.js'
import * as mcpmail from './mcpmail.data.js'
import * as feedapp from './feedapp.data.js'
import * as giftRecognizer from './gift-recognizer.data.js'
import * as landcover from './landcover-classification.data.js'
import * as junglePortfolio from './jungel-portfolio.data.js'
import * as passwordManager from './password-manager.data.js'

const projectDefinitions = [
  gameboy,
  homelab,
  gama,
  mcpmail,
  feedapp,
  giftRecognizer,
  landcover,
  junglePortfolio,
  passwordManager,
]

export const portfolioProjects = projectDefinitions.map(({ project }, index) => ({
  ...project,
  number: String(index + 1).padStart(2, '0'),
}))

const englishProjectContent = Object.fromEntries(
  projectDefinitions.map(({ project, englishContent }) => [
    project.slug,
    englishContent,
  ]),
)

function localizeProject(project, language) {
  if (language !== 'en') return project
  return { ...project, ...englishProjectContent[project.slug] }
}

export function getPortfolioProjects(language = 'no') {
  return portfolioProjects.map((project) =>
    localizeProject(project, language),
  )
}

export function getProjectBySlug(slug, language = 'no') {
  const project = portfolioProjects.find((item) => item.slug === slug)
  return project ? localizeProject(project, language) : null
}
