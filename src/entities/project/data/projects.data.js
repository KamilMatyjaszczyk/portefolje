import evacuationPreviewVideo from '../../../videos/evacuation_preview.webm'
import feedAppArchitecture from '../../../pictures/architecture_feedapp.png'
import feedAppDeployment from '../../../pictures/deployment_feedapp.png'
import giftFlaggedImages from '../../../pictures/afterstandardizing_gift.png'
import giftLogisticRegression from '../../../pictures/conf_logreg_gift.png'
import giftSvm from '../../../pictures/conf_svm_gift.png'
import landcoverConfusionMatrices from '../../../pictures/confmatrix_landcover.png'
import giftDimensionalityReduction from '../../../pictures/reddim_gift.png'

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
    slug: 'gift-recognizer',
    number: '04',
    category: 'MASKINLÆRING',
    title: 'Gift Recognizer',
    summary:
      'Et maskinlæringsprosjekt som klassifiserer gavetyper fra små røntgenbilder og oppdager korrupte bilder i datasettet.',
    description:
      'Prosjektet undersøker klassifisering av 20 × 20 pikslers røntgenbilder ved hjelp av logistisk regresjon og SVM. Modellene trenes og sammenlignes med GridSearchCV, accuracy, klassifikasjonsrapporter og confusion matrices. PCA brukes både for å redusere dimensjonaliteten og for å analysere forholdet mellom treningstid og ytelse. Prosjektet inneholder også metoder for å finne korrupte, umerkede bilder gjennom rekonstruksjonsfeil og modellbaserte terskler.',
    technologies: [
      'Python',
      'Jupyter Notebook',
      'scikit-learn',
      'SVM',
      'Logistisk regresjon',
      'PCA',
      'NumPy',
      'Matplotlib',
    ],
    demo: false,
    stage: 'completed',
    status: 'Fullført',
    galleryTitle: 'RESULTATER',
    galleryDescription: 'Klikk på et resultat for å se det større.',
    resultImages: [
      {
        src: giftLogisticRegression,
        title: 'Logistisk regresjon',
        alt: 'Confusion matrix for Gift Recognizer med logistisk regresjon',
      },
      {
        src: giftSvm,
        title: 'SVM',
        alt: 'Confusion matrix for Gift Recognizer med SVM',
      },
      {
        src: giftDimensionalityReduction,
        title: 'PCA og dimensjonsreduksjon',
        alt: 'Graf som sammenligner nøyaktighet og treningstid ved dimensjonsreduksjon',
      },
      {
        src: giftFlaggedImages,
        title: 'Oppdagelse av avvikende bilder',
        alt: 'Sammenligning av bilder markert som avvik før og etter standardisering',
      },
    ],
    githubUrl: 'https://github.com/KamilMatyjaszczyk/GiftRecog',
  },
  {
    slug: 'landcover-classification',
    number: '05',
    category: 'DEEP LEARNING',
    title: 'Landcover Classification',
    summary:
      'Klassifisering av landoverflater fra RGB- og multispektrale satellittbilder med flere deep-learning-modeller.',
    description:
      'Et gruppeprosjekt som sammenligner CNN, ResNet, EfficientNet og Swin Transformer på klassifisering av ti typer landoverflate, blant annet skog, jordbruk, boligområder, elver og innsjøer. Modellene evalueres på både RGB- og multispektrale data med accuracy, klassifikasjonsrapporter og confusion matrices. En Streamlit-applikasjon gjør det mulig å undersøke modellresultater, laste opp egne bilder og klassifisere satellittområder fra et kart.',
    technologies: [
      'Python',
      'TensorFlow',
      'CNN',
      'ResNet',
      'EfficientNet',
      'Swin Transformer',
      'Streamlit',
      'Satellittdata',
      'OpenCV',
    ],
    demo: false,
    stage: 'completed',
    status: 'Fullført',
    galleryTitle: 'MODELLRESULTATER',
    galleryDescription:
      'Confusion matrices for modellene på RGB- og multispektrale data.',
    resultImages: [
      {
        src: landcoverConfusionMatrices,
        title: 'Sammenligning av alle modeller',
        alt: 'Confusion matrices for CNN, ResNet, EfficientNet og Swin Transformer på RGB- og multispektrale satellittbilder',
      },
    ],
    githubUrl:
      'https://github.com/Richard-Persson/Landcover_Classification',
  },
  {
    slug: 'jungel-portfolio',
    number: '06',
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
  {
    slug: 'password-manager',
    number: '07',
    category: 'SIKKERHET',
    title: 'Password Manager',
    summary:
      'En lokal passordbehandler under utvikling, med fokus på sikker nøkkelavledning og kryptert lagring.',
    description:
      'Prosjektet bygger fundamentet for et lokalt, kryptert passordhvelv. Krypteringslaget bruker Argon2id til å avlede en 256-bits nøkkel fra hovedpassordet og AES-256-GCM til autentisert kryptering av data. Salt og nonce genereres tilfeldig for hver kryptering, og det finnes en enkel test som verifiserer at et hvelv kan krypteres og dekrypteres korrekt. Neste steg er å ferdigstille lagring, håndtering av oppføringer og brukergrensesnitt.',
    technologies: [
      'Python',
      'Argon2id',
      'AES-256-GCM',
      'Cryptography',
      'Sikker lokal lagring',
      'Testing',
    ],
    demo: false,
    stage: 'ongoing',
    status: 'Pågående',
    githubUrl:
      'https://github.com/KamilMatyjaszczyk/passwordManager',
  },
]

const englishProjectContent = {
  'gameboy-emulator': {
    summary:
      'An emulator that recreates core parts of the Game Boy hardware and runs games in the browser.',
    description:
      'A technical project focused on CPU instructions, memory management, graphics and understanding how older gaming hardware works at a low level.',
    technologies: ['JavaScript', 'Emulation', 'Canvas'],
    status: 'Demo coming soon',
  },
  'gama-multiagent-simulation': {
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
  },
  feedapp: {
    category: 'DISTRIBUTED FULLSTACK',
    summary:
      'A distributed full-stack application for polls, real-time updates and personalised recommendations.',
    description:
      'FeedApp is a polling platform developed as a semester project in DAT250. The application allows users to create, publish and answer polls, while the system handles real-time communication, notifications and recommendations across multiple services. The backend is built with Kotlin and Spring Boot, the frontend is developed in Angular, and Kafka is used for event-driven communication between the services. The project also includes PostgreSQL for data storage, a separate notification service and a recommendation service that uses embeddings and Qdrant for semantic recommendations.',
    status: 'Case study',
    architectureImages: [
      {
        src: feedAppArchitecture,
        title: 'System architecture',
        alt: 'Architecture diagram for FeedApp and its related services',
      },
      {
        src: feedAppDeployment,
        title: 'Deployment and infrastructure',
        alt: 'Deployment diagram for FeedApp',
      },
    ],
  },
  'gift-recognizer': {
    category: 'MACHINE LEARNING',
    summary:
      'A machine-learning project that classifies gift types from small X-ray images and detects corrupted images in the dataset.',
    description:
      'The project investigates the classification of 20 × 20 pixel X-ray images using logistic regression and SVM. The models are trained and compared using GridSearchCV, accuracy, classification reports and confusion matrices. PCA is used both to reduce dimensionality and to analyse the relationship between training time and performance. The project also contains methods for finding corrupted, unlabelled images through reconstruction error and model-based thresholds.',
    technologies: [
      'Python',
      'Jupyter Notebook',
      'scikit-learn',
      'SVM',
      'Logistic regression',
      'PCA',
      'NumPy',
      'Matplotlib',
    ],
    status: 'Completed',
    galleryTitle: 'RESULTS',
    galleryDescription: 'Click on a result to see it larger.',
    resultImages: [
      {
        src: giftLogisticRegression,
        title: 'Logistic regression',
        alt: 'Confusion matrix for Gift Recognizer using logistic regression',
      },
      {
        src: giftSvm,
        title: 'SVM',
        alt: 'Confusion matrix for Gift Recognizer using SVM',
      },
      {
        src: giftDimensionalityReduction,
        title: 'PCA and dimensionality reduction',
        alt: 'Chart comparing accuracy and training time during dimensionality reduction',
      },
      {
        src: giftFlaggedImages,
        title: 'Detection of anomalous images',
        alt: 'Comparison of images flagged as anomalies before and after standardisation',
      },
    ],
  },
  'landcover-classification': {
    summary:
      'Classification of land cover from RGB and multispectral satellite images using several deep-learning models.',
    description:
      'A group project that compares CNN, ResNet, EfficientNet and Swin Transformer in the classification of ten types of land cover, including forest, agriculture, residential areas, rivers and lakes. The models are evaluated on both RGB and multispectral data using accuracy, classification reports and confusion matrices. A Streamlit application makes it possible to examine model results, upload your own images and classify satellite areas from a map.',
    technologies: [
      'Python',
      'TensorFlow',
      'CNN',
      'ResNet',
      'EfficientNet',
      'Swin Transformer',
      'Streamlit',
      'Satellite data',
      'OpenCV',
    ],
    status: 'Completed',
    galleryTitle: 'MODEL RESULTS',
    galleryDescription:
      'Confusion matrices for the models using RGB and multispectral data.',
    resultImages: [
      {
        src: landcoverConfusionMatrices,
        title: 'Comparison of all models',
        alt: 'Confusion matrices for CNN, ResNet, EfficientNet and Swin Transformer using RGB and multispectral satellite images',
      },
    ],
  },
  'jungel-portfolio': {
    category: 'CREATIVE WEB',
    title: 'Jungle portfolio',
    summary:
      'An interactive portfolio where the user explores projects, skills and contact through a continuous jungle world.',
    description:
      'I wanted to create a portfolio that felt more personal than a regular CV site. Therefore, the user navigates through a jungle while a monkey swings between the sections. The figures and landscape are built with simple geometry in Three.js, without external 3D models. The project has several navigation methods, a seamless 360-degree world and a small banana easter egg.',
    technologies: [
      'React',
      'Three.js',
      'React Three Fiber',
      'Drei',
      'JavaScript',
      'Vite',
      'Responsive design',
      'Procedural 3D',
      'Interaction design',
    ],
    status: 'You are viewing it',
  },
  'password-manager': {
    category: 'SECURITY',
    summary:
      'A local password manager in development, focused on secure key derivation and encrypted storage.',
    description:
      'The project builds the foundation for a local, encrypted password vault. The encryption layer uses Argon2id to derive a 256-bit key from the master password and AES-256-GCM for authenticated encryption of data. Salt and nonce are generated randomly for each encryption, and there is a simple test that verifies that a vault can be encrypted and decrypted correctly. The next step is to complete storage, entry management and the user interface.',
    technologies: [
      'Python',
      'Argon2id',
      'AES-256-GCM',
      'Cryptography',
      'Secure local storage',
      'Testing',
    ],
    status: 'Ongoing',
  },
}

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
