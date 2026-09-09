import { loadAsset } from './loadAsset.js'

const projectAssets = {
  giftFlaggedImages: loadAsset(() =>
    import('../../../pictures/afterstandardizing_gift.png'),
  ),
  giftLogisticRegression: loadAsset(() =>
    import('../../../pictures/conf_logreg_gift.png'),
  ),
  giftSvm: loadAsset(() =>
    import('../../../pictures/conf_svm_gift.png'),
  ),
  giftDimensionalityReduction: loadAsset(() =>
    import('../../../pictures/reddim_gift.png'),
  ),
}

export const project = {
  slug: 'gift-recognizer',
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
      loadSrc: projectAssets.giftLogisticRegression,
      title: 'Logistisk regresjon',
      alt: 'Confusion matrix for Gift Recognizer med logistisk regresjon',
    },
    {
      loadSrc: projectAssets.giftSvm,
      title: 'SVM',
      alt: 'Confusion matrix for Gift Recognizer med SVM',
    },
    {
      loadSrc: projectAssets.giftDimensionalityReduction,
      title: 'PCA og dimensjonsreduksjon',
      alt: 'Graf som sammenligner nøyaktighet og treningstid ved dimensjonsreduksjon',
    },
    {
      loadSrc: projectAssets.giftFlaggedImages,
      title: 'Oppdagelse av avvikende bilder',
      alt: 'Sammenligning av bilder markert som avvik før og etter standardisering',
    },
  ],
  githubUrl: 'https://github.com/KamilMatyjaszczyk/GiftRecog',
}

export const englishContent = {
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
      loadSrc: projectAssets.giftLogisticRegression,
      title: 'Logistic regression',
      alt: 'Confusion matrix for Gift Recognizer using logistic regression',
    },
    {
      loadSrc: projectAssets.giftSvm,
      title: 'SVM',
      alt: 'Confusion matrix for Gift Recognizer using SVM',
    },
    {
      loadSrc: projectAssets.giftDimensionalityReduction,
      title: 'PCA and dimensionality reduction',
      alt: 'Chart comparing accuracy and training time during dimensionality reduction',
    },
    {
      loadSrc: projectAssets.giftFlaggedImages,
      title: 'Detection of anomalous images',
      alt: 'Comparison of images flagged as anomalies before and after standardisation',
    },
  ],
}
