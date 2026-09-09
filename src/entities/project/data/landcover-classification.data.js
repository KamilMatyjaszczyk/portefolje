import { loadAsset } from './loadAsset.js'

const projectAssets = {
  landcoverConfusionMatrices: loadAsset(() =>
    import('../../../pictures/confmatrix_landcover.png'),
  ),
}

export const project = {
  slug: 'landcover-classification',
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
      loadSrc: projectAssets.landcoverConfusionMatrices,
      title: 'Sammenligning av alle modeller',
      alt: 'Confusion matrices for CNN, ResNet, EfficientNet og Swin Transformer på RGB- og multispektrale satellittbilder',
    },
  ],
  githubUrl:
    'https://github.com/Richard-Persson/Landcover_Classification',
}

export const englishContent = {
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
      loadSrc: projectAssets.landcoverConfusionMatrices,
      title: 'Comparison of all models',
      alt: 'Confusion matrices for CNN, ResNet, EfficientNet and Swin Transformer using RGB and multispectral satellite images',
    },
  ],
}
