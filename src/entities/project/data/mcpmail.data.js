export const project = {
  slug: 'mail-here',
  category: 'DESKTOP-APPLIKASJON',
  title: 'mcpMail',
  summary:
    'En e-postklient for Linux som samler flere kontoer i én innboks, med bakgrunnssynkronisering og lokal lagring.',
  description:
    'mcpMail er en e-postklient bygget i Python med PySide6/Qt, IMAP/SMTP og SQLite som lokal cache. Applikasjonen samler flere kontoer i én innboks og støtter søk i lokalt lagrede meldinger, vedlegg, lokale utkast, sending, svar og videresending. Grensesnittet har tre kolonner som kan omorganiseres, mens synkronisering og nettverksoperasjoner kjører i bakgrunnen. Gmail og personlige Outlook- og Hotmail-kontoer kan kobles til via OAuth2 med egen appregistrering, og passord og tokens lagres i systemets nøkkelring. Bufrede meldinger kan leses uten nett, og eksternt innhold i HTML-meldinger blokkeres som standard. Arkitekturen skiller mellom brukergrensesnitt, domene, tjenester, database og e-postprotokoller, med et eget leselag som forbereder en fremtidig AI/MCP-integrasjon. Prosjektet er i v1 og under aktiv utvikling; en MCP-server og aktiv AI-integrasjon er foreløpig ikke implementert.',
  technologies: [
    'Python',
    'PySide6 / Qt',
    'SQLite',
    'IMAP / SMTP',
    'OAuth2',
    'Linux',
    'Pytest',
  ],
  demo: false,
  stage: 'ongoing',
  status: 'v1 – under utvikling',
  githubUrl: 'https://github.com/KamilMatyjaszczyk/mail-here',
}

export const englishContent = {
  category: 'DESKTOP APPLICATION',
  summary:
    'An email client for Linux that brings multiple accounts into one inbox, with background sync and local storage.',
  description:
    'mcpMail is an email client built in Python with PySide6/Qt, IMAP/SMTP and SQLite as a local cache. The application brings multiple accounts into one inbox and supports searching locally stored messages, attachments, local drafts, sending, replying and forwarding. The interface has three rearrangeable columns, while sync and network operations run in the background. Gmail and personal Outlook and Hotmail accounts can connect through OAuth2 with your own app registration, and passwords and tokens are stored in the system keyring. Cached messages can be read offline, and external content in HTML messages is blocked by default. The architecture separates the user interface, domain, services, database and email protocols, with a dedicated read layer that prepares for a future AI/MCP integration. The project is in v1 and under active development; an MCP server and active AI integration have not yet been implemented.',
  status: 'v1 – under development',
}
