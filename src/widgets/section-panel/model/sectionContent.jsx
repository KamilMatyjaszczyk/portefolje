export const sectionContent = {
  about: {
    eyebrow: 'OM MEG',
    title: 'Hei, jeg er Kamil.',
    intro:
      'Programvareutviklingsstudent med interesse for sikre, robuste og innovative løsninger som gjør komplekse prosesser enklere å forstå og bruke.',
    body: (
      <>
        <p>
        Jeg studerer programvareutvikling ved UiB og HVL, med bakgrunn fra
        informasjonsteknologi og samfunnsøkonomi. Den kombinasjonen gjør at jeg
        liker å se både den tekniske siden av et problem og verdien løsningen
        faktisk skal skape.

        Jeg er særlig interessert i datadrevne løsninger, automatisering,
        maskinlæring og moderne systemutvikling. Gjennom studier, prosjekter og
        arbeid har jeg fått erfaring med å strukturere data, forbedre
        arbeidsprosesser og bygge løsninger som er praktiske i bruk.
        </p>
    <div className="profile-meta">
      <span>Bergen, Norge</span>
      <span>Masterstudent i programvareutvikling</span>
      <span>Java · Python · JavaScript · DevOps</span>
      <span>Maskinlæring · NLP · Multiagentsystemer</span>
      <span>Åpen for flytting og nye muligheter</span>
        </div>
      </>
    ),
  },
  skills: {
  eyebrow: 'FERDIGHETER',
  title: 'Teknologi valgt etter problemet.',
  intro:
    'Jeg jobber bredt med programvareutvikling, data og webteknologi, og liker å bruke verktøy som gir praktisk verdi i løsningen.',
  body: (
    <div className="skills-list">
      <div>
        <span>Programmering</span>
        <p>Java, Python, JavaScript, Kotlin</p>
      </div>

      <div>
        <span>Webutvikling</span>
        <p>React, Three.js, Vite</p>
      </div>

      <div>
        <span>Backend og testing</span>
        <p>Spring Boot, Maven, JUnit</p>
      </div>

      <div>
        <span>Data og AI</span>
        <p>Maskinlæring, NLP, Multiagentsystemer, TensorFlow, Pytorch, Scikit-learn, NumPy</p>
      </div>

      <div>
        <span>DevOps og arbeidsflyt</span>
        <p>Docker, Kubernetes, Git, Agile/SCRUM</p>
      </div>
    </div>
  ),
},

  contact: {
    eyebrow: 'KONTAKT',
    title: 'Sving innom mine kanaler.',
    intro:
      'Jeg er åpen for nye muligheter, samarbeid og utviklerroller. Ta gjerne kontakt direkte, eller følg sporene videre til GitHub og LinkedIn.',
    body: (
      <div className="contact-links">
        <a href="mailto:kamilmaty@hotmail.com">
          <span>E-post</span>
          kamilmaty@hotmail.com
          <b>↗</b>
        </a>
        <a href="https://github.com/KamilMatyjaszczyk/" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          Se kode og prosjekter
          <b>↗</b>
        </a>
        <a href="https://www.linkedin.com/in/kamil-matyjaszczyk-a7a08b213/" target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          Koble med meg
          <b>↗</b>
        </a>
      </div>
    ),
  },
}
