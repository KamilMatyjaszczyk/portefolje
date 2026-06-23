# Jungle Portfolio

En interaktiv utviklerportefølje bygget med React, React Three Fiber og
Three.js. Brukeren navigerer mellom CV-seksjoner ved å følge en apekatt
gjennom en kontinuerlig jungelverden.

## Kommandoer

```bash
npm run dev
npm run lint
npm run build
```

## Struktur

```text
src/
  app/        App-oppstart og globale stiler
  pages/      Sidekomposisjon
  widgets/    Store, selvstendige UI-områder
  features/   Brukerhandlinger og navigasjonslogikk
  entities/   Domeneobjekter som ape, jungel, prosjekt og seksjon
  shared/     Gjenbrukbar konfigurasjon, hooks og UI
```

Three.js-scenen rendrer jungel, dyr og apekatten. CV- og prosjektinnhold
vises med vanlig HTML/CSS for lesbarhet, tilgjengelighet og responsivitet.
