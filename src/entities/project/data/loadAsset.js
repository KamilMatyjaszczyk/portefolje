export const loadAsset = (importer) => () =>
  importer().then((module) => module.default)
