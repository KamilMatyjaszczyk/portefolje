# Jungle Portfolio

[![CI](https://github.com/KamilMatyjaszczyk/portefolje/actions/workflows/ci.yml/badge.svg)](https://github.com/KamilMatyjaszczyk/portefolje/actions/workflows/ci.yml)

Interactive developer portfolio built with React,
React Three Fiber and Three.js. Instead of a traditional resume page, the
project lets the user navigate through a continuous jungle world where a
monkey swings between the about, projects, skills and contact sections.

The portfolio combines a procedurally generated 3D scene with regular
HTML/CSS panels. This creates a playful first impression while keeping the
content readable, responsive and accessible.

## Features

- Interactive 3D jungle built with simple Three.js geometry
- Navigation by click, drag, scroll, swipe and keyboard
- Seamless loop between portfolio sections
- Modal panels for resume content, skills, contact and project details
- Bilingual content in Norwegian and English
- Project gallery with images, video preview and embedded Game Boy demo
- Responsive layout for mobile, tablet and desktop
- Dynamic metadata for language and sharing

## Tech Stack

- React
- Vite
- Three.js
- React Three Fiber
- Drei
- CSS structure through global stylesheets
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Vite in development mode |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint on the project |

## Project Structure

```text
src/
  app/        App bootstrap, global styles and shell layout
  pages/      Page composition
  widgets/    Larger UI areas such as scene, header, panel and nav
  features/   User flows and navigation logic
  entities/   Domain objects such as jungle, monkey, project and section
  shared/     Reusable hooks, routing, i18n, UI and config

public/
  demos/      Static demos that can be embedded in the portfolio
  og-image.*  Sharing images
```

## Key Files

| File | Role |
| --- | --- |
| `src/pages/home/HomePage.jsx` | Composes the canvas, header, hero, navigation and panels |
| `src/widgets/jungle-scene/ui/JungleScene.jsx` | Main scene for the Three.js content |
| `src/entities/jungle/model/landscapeData.js` | Generates the looping jungle landscape and section trees |
| `src/entities/monkey/model/swingMotion.js` | Motion logic for the monkey's swinging |
| `src/features/portfolio-navigation/model/usePortfolioNavigation.js` | Section, drag, scroll and route navigation |
| `src/widgets/section-panel/model/sectionContent.jsx` | About, skills and contact content in Norwegian/English |
| `src/entities/project/data/projects.data.js` | Project imports, ordering, numbering and language/slug lookup |
| `src/entities/project/data/<project>.data.js` | Individual project content, translations, media and links |
| `src/shared/i18n/uiTranslations.js` | UI text and metadata for Norwegian/English |

## Architecture

The app is organized with a feature-sliced-inspired structure:

- `app` contains startup code and global framing.
- `pages` compose full pages.
- `widgets` collect larger user-facing areas.
- `features` handle concrete user interactions.
- `entities` contain the domain objects that are displayed or animated.
- `shared` contains shared infrastructure.

The Three.js scene lives inside the canvas, while text content and project
panels are rendered as regular HTML. This makes it easier to keep the
interaction rich without making all content dependent on WebGL.

## Navigation

The portfolio has four main sections:

1. About
2. Projects
3. Skills
4. Contact

The user can navigate with:

- left/right buttons
- tree labels in the 3D scene
- bottom section navigation
- drag or swipe
- mouse wheel/trackpad
- arrow keys
- direct URLs such as `/om-meg`, `/prosjekter`, `/ferdigheter` and `/kontakt`

The jungle is modelled as a continuous loop. Because of that, navigation
uses both a visible section index and an internal world step to avoid abrupt
jumps when the user loops around from the last section to the first.

## Content

Personal content, section text and contact links are edited in:

```text
src/widgets/section-panel/model/sectionContent.jsx
```

Each project has its own data file containing `project` (Norwegian content and
shared fields) and `englishContent` (English overrides), for example:

```text
src/entities/project/data/mcpmail.data.js
src/entities/project/data/homelab.data.js
```

Import new project files in `src/entities/project/data/projects.data.js` and add
them to `projectDefinitions` in the desired order. Project numbers are generated
automatically from that order. Media loaders use the shared `loadAsset.js` helper
to keep images and videos loaded on demand.

UI text, metadata and language-specific labels are edited in:

```text
src/shared/i18n/uiTranslations.js
```

## Media and Demos

Images and video previews live in:

```text
src/pictures/
src/videos/
```

Static demos that should open inside the portfolio can be placed under:

```text
public/demos/
```

The Game Boy emulator is embedded from:

```text
public/demos/gameboy/index.html
```

## Quality Check Before Deploy

Run this before publishing changes:

```bash
npm run lint
npm run build
```

`npm run build` writes the production files to `dist/`.

## License

This is a personal portfolio. No explicit license is defined in the
repository.
