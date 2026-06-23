export const portfolioProjects = [
  {
    slug: 'gama-multiagent',
    number: '01',
    category: 'MULTI-AGENT SYSTEM',
    title: 'GAMA Multi-Agent System',
    summary:
      'En interaktiv simulering der autonome agenter samarbeider og reagerer på et miljø i sanntid.',
    description:
      'Prosjektet utforsker hvordan flere selvstendige agenter kan ta valg, dele et miljø og skape komplekse mønstre gjennom enkle lokale regler.',
    technologies: ['GAMA', 'Agent-based modelling', 'Simulation'],
    demo: true,
    status: 'Demo kommer',
  },
  {
    slug: 'gameboy-emulator',
    number: '02',
    category: 'EMULATOR',
    title: 'Game Boy Emulator',
    summary:
      'En emulator som gjenskaper sentrale deler av Game Boy-maskinvaren og kjører spill i nettleseren.',
    description:
      'Et teknisk prosjekt med fokus på CPU-instruksjoner, minnehåndtering, grafikk og forståelse av hvordan eldre spillmaskinvare fungerer.',
    technologies: ['JavaScript', 'Emulation', 'Canvas'],
    demo: true,
    status: 'Demo kommer',
  },
  {
    slug: 'feedapp',
    number: '03',
    category: 'FULLSTACK',
    title: 'FeedApp',
    summary:
      'En frontend- og backend-applikasjon for publisering og organisering av innhold i en personlig feed.',
    description:
      'FeedApp kombinerer et responsivt grensesnitt med API, datalagring og serverlogikk. Caset presenterer arkitektur, arbeidsprosess og viktige tekniske valg.',
    technologies: ['Frontend', 'Backend', 'REST API'],
    demo: false,
    status: 'Case study',
  },
  {
    slug: 'jungel-portfolio',
    number: '04',
    category: 'CREATIVE WEB',
    title: 'Jungel-portfolio',
    summary:
      'Denne interaktive porteføljen, der en apekatt svinger mellom CV-seksjoner i en levende jungel.',
    description:
      'Et eksperiment i kreativ frontend som kombinerer React Three Fiber med lesbart HTML-innhold, responsiv navigasjon og proseduralt bygde figurer.',
    technologies: ['React', 'Three.js', 'React Three Fiber'],
    demo: true,
    status: 'Du ser den nå',
  },
]

export function getProjectBySlug(slug) {
  return portfolioProjects.find((project) => project.slug === slug)
}
