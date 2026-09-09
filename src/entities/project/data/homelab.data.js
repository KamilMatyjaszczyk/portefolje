import { loadAsset } from './loadAsset.js'

const projectAssets = {
  homelabArchitecture: loadAsset(() =>
    import('../../../pictures/homelab-architecture.svg'),
  ),
}

export const project = {
  slug: 'distributed-ai-homelab',
  category: 'DISTRIBUERT INFRASTRUKTUR',
  title: 'Distributed AI Homelab & MCP Agent',
  summary:
    'Et privat homelab under utvikling, med en strømgjerrig ARM-server, separat lagring og GPU-kapasitet ved behov gjennom en AI-agent og MCP.',
  description: [
    'Målet er å bygge en selvdriftet infrastruktur der tjenester, varig lagring og tunge GPU-jobber fordeles mellom flere maskiner. En Orange Pi 4 Pro skal kjøre lette tjenester kontinuerlig, mens en Fedora-arbeidsstasjon med NVIDIA RTX 5070 Ti skal utføre beregninger ved behov. Dette skal gi tilgang til lokal AI uten at GPU-maskinen må stå på hele døgnet.',
    'En AI-agent skal få avgrenset tilgang til e-post, filer og beregninger gjennom MCP-servere og gjenbrukbare tjeneste-API-er. Tailscale skal knytte telefon, laptop, ARM-server og arbeidsstasjon sammen i et privat nettverk. Arkitekturen og arbeidsflytene nedenfor beskriver målet for prosjektet og er under utvikling.',
  ],
  technologies: [
    'Linux / ARM64', 'Fedora', 'Docker Compose', 'Tailscale',
    'PostgreSQL', 'MCP', 'AI-agenter', 'CUDA / PyTorch',
    'Wake-on-LAN', 'NVMe / NAS',
  ],
  demo: false,
  stage: 'ongoing',
  status: 'Under utvikling',
  galleryTitle: 'PLANLAGT ARKITEKTUR · UNDER UTVIKLING',
  galleryDescription: 'Målarkitektur for tjenester, lagring og GPU-jobber. Klikk for å se diagrammet større.',
  architectureImages: [{
    loadSrc: projectAssets.homelabArchitecture,
    title: 'Privat nettverk og fordeling av tjenester',
    alt: 'Planlagt arkitektur: iPhone og laptop via Tailscale til en Orange Pi med AI-agent. Mail MCP, Storage MCP og Compute MCP bruker tjenestelag for e-post, NAS og jobbkontroll. Wake-on-LAN starter en Fedora-maskin med RTX 5070 Ti, og resultater lagres på NAS.',
  }],
  caseStudySections: [
    {
      title: 'Status og eksisterende grunnlag',
      paragraphs: ['Homelabet er under utvikling. mcpMail v1 finnes som en separat e-postklient med et leselag som grunnlag for videre integrasjon. MCP-servere, agentkobling, lagringstjenester og automatisk GPU-orkestrering er planlagt; en samlet arbeidsflyt er ennå ikke bekreftet implementert.'],
    },
    {
      title: 'Planlagt maskinvare og lagring',
      items: [
        'Kontrollnode: Orange Pi 4 Pro med ARM64, 4 GB LPDDR5, NVMe, Gigabit Ethernet og aktiv kjøling. Linux, Docker Compose og PostgreSQL skal støtte API-er, autentisering og planlegging.',
        'Beregningsnode: Fedora med RTX 5070 Ti, 16 GB VRAM og lokal NVMe-arbeidsplass for CUDA, PyTorch, LLM-inferens, embeddings og modelltrening.',
        'NVMe skal brukes til operativsystem, containervolumer, databaser og indekser. HDD/NAS skal lagre dokumenter, bilder, datasett, sikkerhetskopier og beregningsresultater uavhengig av GPU-maskinen.',
      ],
    },
    {
      title: 'Designvalg',
      items: [
        'Skille mellom tjenester, lagring og beregning: lette oppgaver skal kjøre på ARM-noden, mens GPU-jobber rutes til arbeidsstasjonen.',
        'Gjenbrukbare tjenestelag: AI-agent → MCP-adapter → tjeneste → repository/API. Brukergrensesnitt og agent skal bruke samme forretningslogikk.',
        'Strømforbruk etter behov: Wake-on-LAN skal starte GPU-noden, vente på et tilgjengelig API og følge jobben frem til resultatet er lagret. Avslåing ved inaktivitet er et senere steg.',
        'Avgrenset tilgang: autentiserte API-er og konkrete MCP-verktøy, med separat tilgang for lesing og endring. Hemmeligheter skal håndteres utenfor kildekoden, og logger skal begrense sensitivt innhold.',
        'Privat nettverk: kommunikasjon over Tailscale med minst mulige rettigheter og uten behov for åpne innkommende porter fra internett.',
      ],
    },
    {
      title: 'Planlagte arbeidsflyter',
      paragraphs: [
        '«Har jeg fått noen viktige e-poster i dag?» Agenten skal bruke Mail MCP og MailService til å søke etter meldinger og hente strukturerte data om avsender, tråd og vedlegg. En språkmodell skal deretter prioritere og oppsummere resultatene. Første integrasjon er planlagt med kun lesetilgang.',
        '«Analyser det nyeste datasettet mitt.» Compute MCP skal kontrollere om GPU-noden er tilgjengelig, starte den med Wake-on-LAN og klargjøre datasettet fra lagring. ComputeService skal kjøre jobben, rapportere status med en jobb-ID og lagre resultatene på NAS før agenten svarer. Planlagte jobbtilstander er queued, starting, running, completed, failed og cancelled.',
      ],
    },
    {
      title: 'Utviklingsplan',
      ordered: true,
      items: [
        'Sette opp Orange Pi med Linux, NVMe, Docker, Tailscale og grunnleggende lagring.',
        'Videreutvikle MailService, lage en Mail MCP-server med lesetilgang og koble til en AI-agent.',
        'Implementere StorageService og Storage MCP med filsøk, metadata og dokumenthenting.',
        'Implementere ComputeService på Fedora med GPU-overvåking, asynkrone jobber, kø, status og kansellering.',
        'Koble til Wake-on-LAN, automatisk oppdagelse av noder og valgfri avslåing ved inaktivitet.',
        'Utvide med dokumentindeksering/RAG, privat fil- og bildelagring, overvåking, sikkerhetskopier og flere MCP-integrasjoner.',
      ],
    },
  ],
}

export const englishContent = {
  category: 'DISTRIBUTED INFRASTRUCTURE',
  summary:
    'A private homelab in development, combining a low-power ARM server, separate storage and on-demand GPU compute through an AI agent and MCP.',
  description: [
    'The goal is to build self-hosted infrastructure that distributes services, persistent storage and intensive GPU jobs across multiple machines. An Orange Pi 4 Pro is intended to run lightweight services continuously, while a Fedora workstation with an NVIDIA RTX 5070 Ti will handle compute on demand. This should provide local AI capabilities without keeping the GPU machine powered on around the clock.',
    'An AI agent will receive limited access to email, files and compute through MCP servers and reusable service APIs. Tailscale will connect a phone, laptop, ARM server and workstation through a private network. The architecture and workflows below describe the intended system and are in development.',
  ],
  technologies: [
    'Linux / ARM64', 'Fedora', 'Docker Compose', 'Tailscale',
    'PostgreSQL', 'MCP', 'AI agents', 'CUDA / PyTorch',
    'Wake-on-LAN', 'NVMe / NAS',
  ],
  status: 'In development',
  galleryTitle: 'PLANNED ARCHITECTURE · IN DEVELOPMENT',
  galleryDescription: 'Target architecture for services, storage and GPU jobs. Click to enlarge the diagram.',
  architectureImages: [{
    loadSrc: projectAssets.homelabArchitecture,
    title: 'Private network and service distribution',
    alt: 'Planned architecture: iPhone and laptop connect through Tailscale to an Orange Pi running an AI agent. Mail MCP, Storage MCP and Compute MCP use service layers for email, NAS and job management. Wake-on-LAN starts a Fedora workstation with an RTX 5070 Ti, and results are stored on NAS.',
  }],
  caseStudySections: [
    {
      title: 'Status and existing foundation',
      paragraphs: ['The homelab is in development. mcpMail v1 exists as a separate email client with a read layer to support future integration. MCP servers, agent integration, storage services and automatic GPU orchestration are planned; an end-to-end workflow has not yet been confirmed as implemented.'],
    },
    {
      title: 'Planned hardware and storage',
      items: [
        'Control node: Orange Pi 4 Pro with ARM64, 4 GB LPDDR5, NVMe, Gigabit Ethernet and active cooling. Linux, Docker Compose and PostgreSQL will support APIs, authentication and scheduling.',
        'Compute node: Fedora with an RTX 5070 Ti, 16 GB VRAM and a local NVMe workspace for CUDA, PyTorch, LLM inference, embeddings and model training.',
        'NVMe will hold the operating system, container volumes, databases and indexes. HDD/NAS storage will hold documents, photos, datasets, backups and compute results independently of the GPU machine.',
      ],
    },
    {
      title: 'Design decisions',
      items: [
        'Separate services, storage and compute: lightweight tasks will run on the ARM node, while GPU jobs will be routed to the workstation.',
        'Reusable service layers: AI agent → MCP adapter → service → repository/API. The application UI and agent will share business logic.',
        'On-demand power use: Wake-on-LAN will start the GPU node, wait for its API and track the job until results are saved. Idle shutdown is a later step.',
        'Limited access: authenticated APIs and specific MCP tools, with separate permissions for reading and modifying data. Secrets will be managed outside source code, and logs will minimise sensitive content.',
        'Private networking: Tailscale communication with least-privilege access and no need for open inbound Internet ports.',
      ],
    },
    {
      title: 'Planned workflows',
      paragraphs: [
        '“Have I received any important emails today?” The agent will use Mail MCP and MailService to search messages and retrieve structured sender, thread and attachment data. A language model will then prioritise and summarise the results. The first integration is planned to be read-only.',
        '“Analyse my latest dataset.” Compute MCP will check GPU node availability, wake it through Wake-on-LAN and stage the dataset from storage. ComputeService will execute the job, report status with a job ID and save results to NAS before the agent responds. Planned job states are queued, starting, running, completed, failed and cancelled.',
      ],
    },
    {
      title: 'Development roadmap',
      ordered: true,
      items: [
        'Set up the Orange Pi with Linux, NVMe, Docker, Tailscale and basic storage.',
        'Extend MailService, build a read-only Mail MCP server and connect an AI agent.',
        'Implement StorageService and Storage MCP with file search, metadata and document retrieval.',
        'Implement ComputeService on Fedora with GPU monitoring, asynchronous jobs, a queue, status and cancellation.',
        'Integrate Wake-on-LAN, automatic node discovery and optional idle shutdown.',
        'Expand with document indexing/RAG, private file and photo storage, monitoring, backups and additional MCP integrations.',
      ],
    },
  ],
}
