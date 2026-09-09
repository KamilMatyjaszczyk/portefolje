import { loadAsset } from './loadAsset.js'

const projectAssets = {
  feedAppArchitecture: loadAsset(() =>
    import('../../../pictures/architecture_feedapp.png'),
  ),
  feedAppDeployment: loadAsset(() =>
    import('../../../pictures/deployment_feedapp.png'),
  ),
}

export const project = {
  slug: 'feedapp',
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
      loadSrc: projectAssets.feedAppArchitecture,
      title: 'Systemarkitektur',
      alt: 'Arkitekturdiagram for FeedApp og tilhørende tjenester',
    },
    {
      loadSrc: projectAssets.feedAppDeployment,
      title: 'Deployment og infrastruktur',
      alt: 'Deploymentdiagram for FeedApp',
    },
  ],
  githubUrl: 'https://github.com/Maren24/DAT250-project',
}

export const englishContent = {
  category: 'DISTRIBUTED FULLSTACK',
  summary:
    'A distributed full-stack application for polls, real-time updates and personalised recommendations.',
  description:
    'FeedApp is a polling platform developed as a semester project in DAT250. The application allows users to create, publish and answer polls, while the system handles real-time communication, notifications and recommendations across multiple services. The backend is built with Kotlin and Spring Boot, the frontend is developed in Angular, and Kafka is used for event-driven communication between the services. The project also includes PostgreSQL for data storage, a separate notification service and a recommendation service that uses embeddings and Qdrant for semantic recommendations.',
  status: 'Case study',
  architectureImages: [
    {
      loadSrc: projectAssets.feedAppArchitecture,
      title: 'System architecture',
      alt: 'Architecture diagram for FeedApp and its related services',
    },
    {
      loadSrc: projectAssets.feedAppDeployment,
      title: 'Deployment and infrastructure',
      alt: 'Deployment diagram for FeedApp',
    },
  ],
}
