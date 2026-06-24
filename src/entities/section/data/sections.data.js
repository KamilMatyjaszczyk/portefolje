const sectionLabels = {
  no: {
    about: 'Om meg',
    projects: 'Prosjekter',
    skills: 'Ferdigheter',
    contact: 'Kontakt',
  },
  en: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  },
}

const sectionIds = ['about', 'projects', 'skills', 'contact']

export function getPortfolioSections(language = 'no') {
  return sectionIds.map((id) => ({
    id,
    label: sectionLabels[language][id],
  }))
}
