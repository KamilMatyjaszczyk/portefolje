export const project = {
  slug: 'gameboy-emulator',
  category: 'EMULATOR',
  title: 'Game Boy Emulator',
  summary:
    'En nettleserbasert Game Boy-emulator bygget fra bunnen av i JavaScript, med grafikk, lyd, input og lagring.',
  description:
    'Prosjektet emulerer den originale Game Boy-maskinvaren direkte i nettleseren. Jeg har implementert LR35902-prosessorens instruksjonssett, minnekart og bankbytte, grafikkprosessor, timere, interrupts, joypad-input og deler av lydsystemet. Emulatoren støtter ROM-er uten minnekontroller og MBC3-kassetter, og lagrer kompatible spill automatisk i nettleseren. Brukeren kan velge en lokal ROM-fil, spille med tastatur eller skjermkontroller og importere eller eksportere save-filer. Den største utfordringen har vært å få alle komponentene til å arbeide i takt, slik at instruksjoner, grafikk, input og lyd oppfører seg som én sammenhengende maskin.',
  technologies: [
    'JavaScript',
    'Game Boy-emulering',
    'CPU-arkitektur',
    'Minnehåndtering',
    'Grafikkrendering',
    'Lydemulering',
    'Browser APIs',
    'Testing',
  ],
  demo: true,
  status: 'Spillbar demo',
  embedPath: 'demos/gameboy/index.html',
  githubUrl: 'https://github.com/KamilMatyjaszczyk/Emulator',
}

export const englishContent = {
  summary:
    'A browser-based Game Boy emulator built from scratch in JavaScript, with graphics, audio, input and save support.',
  description:
    'The project emulates the original Game Boy hardware directly in the browser. I have implemented the LR35902 processor instruction set, memory map and bank switching, graphics processor, timers, interrupts, joypad input and parts of the audio system. The emulator supports ROMs without a memory controller and MBC3 cartridges, and automatically stores compatible game saves in the browser. The user can select a local ROM file, play using a keyboard or on-screen controls, and import or export save files. The main challenge has been getting every component to work in sync, so that instructions, graphics, input and audio behave as one coherent machine.',
  technologies: [
    'JavaScript',
    'Game Boy emulation',
    'CPU architecture',
    'Memory management',
    'Graphics rendering',
    'Audio emulation',
    'Browser APIs',
    'Testing',
  ],
  status: 'Playable demo',
}
