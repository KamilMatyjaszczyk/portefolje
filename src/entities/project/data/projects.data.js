import evacuationPreviewVideo from '../../../videos/evacuation_preview.webm'
import feedAppArchitecture from '../../../pictures/architecture_feedapp.png'
import feedAppDeployment from '../../../pictures/deployment_feedapp.png'

export const portfolioProjects = [
  {
    slug: 'gameboy-emulator',
    number: '01',
    category: 'EMULATOR',
    title: 'Game Boy Emulator',
    summary:
      'En emulator som gjenskaper sentrale deler av Game Boy-maskinvaren og kjører spill i nettleseren.',
    description:
      'Et teknisk prosjekt med fokus på CPU-instruksjoner, minnehåndtering, grafikk og forståelse av hvordan eldre spillmaskinvare fungerer på lavt nivå.',
    technologies: ['JavaScript', 'Emulation', 'Canvas'],
    demo: true,
    status: 'Demo kommer',
  },
  {
    slug: 'gama-multiagent-simulation',
    number: '02',
    category: 'MULTIAGENTSYSTEM',
    title: 'Simulering av multiagentsystem i GAMA',
    summary:
      'En evakueringssimulering der gjester, vakter, brann og utganger påvirker hverandre gjennom agentbasert atferd.',
    description:
      'Prosjektet modellerer en evakueringssituasjon i et festivalområde ved hjelp av GAMA og GAML. Simuleringen består av gjester og vakter med ulike roller: gjester kan vandre rundt, oppdage brann, få panikk, følge andre mennesker eller evakuere når de får kunnskap om en utgang. Vakter kjenner til utgangene, patruljerer området, informerer gjester og forsøker å lede dem mot tryggere ruter før de selv evakuerer. Brann kan spre seg mellom bygninger, og agentene må tilpasse seg basert på avstand til fare, tilgjengelige utganger og informasjonen de har fått underveis.',
    technologies: [
      'GAMA',
      'GAML',
      'Multiagentsystemer',
      'Agentbasert modellering',
      'BDI-agenter',
      'Simulering',
    ],
    demo: false,
    status: 'Video-preview',
    videoUrl: evacuationPreviewVideo,
    githubUrl: 'https://github.com/KamilMatyjaszczyk/EvacuationMASD',
  },
  {
    slug: 'feedapp',
    number: '03',
    category: 'DISTRIBUERT FULLSTACK',
    title: 'FeedApp',
    summary:
      'En distribuert fullstack-applikasjon for avstemninger, sanntidsoppdateringer og personaliserte anbefalinger.',
    description:
      'FeedApp er en pollingplattform utviklet som semesterprosjekt i DAT250. Applikasjonen lar brukere opprette, publisere og svare på avstemninger, samtidig som systemet håndterer sanntidskommunikasjon, varsler og anbefalinger på tvers av flere tjenester. Backend er bygget med Kotlin og Spring Boot, frontend er utviklet i Angular, og Kafka brukes til eventdrevet kommunikasjon mellom tjenestene. Prosjektet inkluderer også PostgreSQL for datalagring, en egen notification service og en recommendation service som bruker embeddings og Qdrant for semantiske anbefalinger.',
    technologies: [
      'Kotlin',
      'Spring Boot',
      'Angular',
      'Kafka',
      'PostgreSQL',
      'Docker',
      'Qdrant',
      'REST API',
    ],
    demo: false,
    status: 'Case study',
    architectureImages: [
      {
        src: feedAppArchitecture,
        title: 'Systemarkitektur',
        alt: 'Arkitekturdiagram for FeedApp og tilhørende tjenester',
      },
      {
        src: feedAppDeployment,
        title: 'Deployment og infrastruktur',
        alt: 'Deploymentdiagram for FeedApp',
      },
    ],
    githubUrl: 'https://github.com/Maren24/DAT250-project',
  },
  {
    slug: 'jungel-portfolio',
    number: '04',
    category: 'CREATIVE WEB',
    title: 'Jungel-portfolio',
    summary:
      'En interaktiv portefølje der brukeren utforsker prosjekter, ferdigheter og kontakt gjennom en kontinuerlig jungelverden.',
    description:
      'Jeg ønsket å lage en portefølje som føltes mer personlig enn en vanlig CV-side. Derfor navigerer brukeren gjennom en jungel mens en apekatt svinger mellom seksjonene. Figurene og landskapet er bygget med enkel geometri i Three.js, uten eksterne 3D-modeller. Prosjektet har flere navigasjonsmetoder, en sømløs 360-graders verden og et lite banan-easter egg.',
    technologies: [
      'React',
      'Three.js',
      'React Three Fiber',
      'Drei',
      'JavaScript',
      'Vite',
      'Responsivt design',
      'Prosedural 3D',
      'Interaksjonsdesign',
    ],
    demo: true,
    status: 'Du ser den nå',
    githubUrl: 'https://github.com/KamilMatyjaszczyk/portefolje',
  },
]

export function getProjectBySlug(slug) {
  return portfolioProjects.find((project) => project.slug === slug)
}
