import { loadAsset } from './loadAsset.js'

const projectAssets = {
  evacuationPreviewVideo: loadAsset(() =>
    import('../../../videos/evacuation_preview.webm'),
  ),
}

export const project = {
  slug: 'gama-multiagent-simulation',
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
  videoLoader: projectAssets.evacuationPreviewVideo,
  githubUrl: 'https://github.com/KamilMatyjaszczyk/EvacuationMASD',
}

export const englishContent = {
  category: 'MULTI-AGENT SYSTEM',
  title: 'Simulation of a multi-agent system in GAMA',
  summary:
    'An evacuation simulation where visitors, security staff, fire and exits influence each other through agent-based behaviour.',
  description:
    'The project models an evacuation scenario in a festival area using GAMA and GAML. The simulation consists of visitors and security staff with different roles: visitors can wander around, discover fire, panic, follow other people or evacuate when they gain knowledge of an exit. Security staff know the exits, patrol the area, inform visitors and try to guide them towards safer routes before they evacuate themselves. Fire can spread between buildings, and the agents must adapt based on their distance from danger, available exits and the information they have received along the way.',
  technologies: [
    'GAMA',
    'GAML',
    'Multi-agent systems',
    'Agent-based modelling',
    'BDI agents',
    'Simulation',
  ],
  status: 'Video preview',
}
