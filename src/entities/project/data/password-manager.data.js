import { loadAsset } from './loadAsset.js'

const projectAssets = {
  passwordManagerPreviewOne: loadAsset(() =>
    import('../../../pictures/pm1.png'),
  ),
  passwordManagerPreviewTwo: loadAsset(() =>
    import('../../../pictures/pm2.png'),
  ),
}

export const project = {
  slug: 'password-manager',
  category: 'SIKKERHET',
  title: 'Local USB Password Manager',
  summary:
    'En offline CLI-passordbehandler der en kryptert vault krever både master-passord og USB-keyfile.',
  description:
    'Local USB Password Manager er en funksjonell, lokal passordbehandler bygget som et Python-basert CLI-verktøy. Vaulten lagres som én kryptert fil og kan bare åpnes når brukeren har både master-passordet og en 64-byte tilfeldig keyfile på en flyttbar USB-enhet. Prosjektet bruker Argon2id til nøkkelavledning og AES-256-GCM til autentisert kryptering, med nytt salt og nonce ved kryptering. Jeg har lagt vekt på de praktiske sikkerhetsdetaljene rundt et offline-verktøy: atomisk skriving og validering før vaulten erstattes, fillåsing mot samtidige CLI-prosesser, streng skjema-validering, kryptert feilforsøksteller med cooldown og et panic-passord som kan slette lokal vault, config og forsøkstilstand. Appen støtter daglige kommandoer for å legge til, liste, hente, redigere og slette innslag, generere passord, kopiere med tidsstyrt tømming av utklippstavlen og skrive innloggingsdata direkte via plattformtilpasset auto-type på Linux, macOS og Windows. Prosjektet er versjonert som 0.1.0 og har bred testdekning, men er ikke uavhengig sikkerhetsrevidert.',
  technologies: [
    'Python',
    'CLI',
    'Argon2id',
    'AES-256-GCM',
    'Cryptography',
    'USB-keyfile',
    'Sikker filhåndtering',
    'Cross-platform',
    'Pytest',
    'GitHub Actions',
  ],
  demo: false,
  stage: 'completed',
  status: 'Fullført',
  galleryTitle: 'CLI-PREVIEW',
  galleryDescription:
    'Skjermbilder fra den lokale Password Manager-opplevelsen.',
  resultImages: [
    {
      loadSrc: projectAssets.passwordManagerPreviewOne,
      title: 'CLI-oversikt',
      alt: 'Skjermbilde av Local USB Password Manager CLI',
    },
    {
      loadSrc: projectAssets.passwordManagerPreviewTwo,
      title: 'Vault-kommandoer',
      alt: 'Skjermbilde av kommandoer i Local USB Password Manager',
    },
  ],
  githubUrl:
    'https://github.com/KamilMatyjaszczyk/passwordManager',
}

export const englishContent = {
  category: 'SECURITY',
  title: 'Local USB Password Manager',
  summary:
    'An offline CLI password manager where an encrypted vault requires both a master password and a USB keyfile.',
  description:
    'Local USB Password Manager is a functional local password manager built as a Python CLI tool. The vault is stored as a single encrypted file and can only be opened when the user has both the master password and a random 64-byte keyfile on a removable USB device. The project uses Argon2id for key derivation and AES-256-GCM for authenticated encryption, with a new salt and nonce on encryption. I focused on the practical security details around an offline tool: atomic writes and validation before replacing the vault, file locking between concurrent CLI processes, strict schema validation, an encrypted failed-attempt counter with cooldown and a panic password that can delete the local vault, config and attempt state. The app supports daily commands for adding, listing, retrieving, editing and deleting entries, generating passwords, copying with timed clipboard clearing and typing login data directly through platform-specific auto-type on Linux, macOS and Windows. The project is versioned as 0.1.0 and has broad test coverage, but it has not been independently security audited.',
  technologies: [
    'Python',
    'CLI',
    'Argon2id',
    'AES-256-GCM',
    'Cryptography',
    'USB keyfile',
    'Secure file handling',
    'Cross-platform',
    'Pytest',
    'GitHub Actions',
  ],
  status: 'Completed',
  galleryTitle: 'CLI PREVIEW',
  galleryDescription:
    'Screenshots from the local Password Manager experience.',
  resultImages: [
    {
      loadSrc: projectAssets.passwordManagerPreviewOne,
      title: 'CLI overview',
      alt: 'Screenshot of the Local USB Password Manager CLI',
    },
    {
      loadSrc: projectAssets.passwordManagerPreviewTwo,
      title: 'Vault commands',
      alt: 'Screenshot of commands in Local USB Password Manager',
    },
  ],
}
