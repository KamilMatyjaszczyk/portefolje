const norwegianContent = {
  about: {
    eyebrow: 'OM MEG',
    title: 'Hei, jeg er Kamil.',
    intro:
      'Programvareutviklingsstudent med interesse for sikre, robuste og innovative løsninger som gjør komplekse prosesser enklere å forstå og bruke.',
    body: (
      <>
        <p>
          Jeg studerer programvareutvikling ved UiB og HVL, med bakgrunn
          fra informasjonsteknologi og samfunnsøkonomi. Den kombinasjonen
          gjør at jeg liker å se både den tekniske siden av et problem og
          verdien løsningen faktisk skal skape.
          {' '}
          Jeg er særlig interessert i datadrevne løsninger,
          automatisering, maskinlæring og moderne systemutvikling. Gjennom
          studier, prosjekter og arbeid har jeg fått erfaring med å
          strukturere data, forbedre arbeidsprosesser og bygge løsninger
          som er praktiske i bruk.
        </p>
        <div className="profile-role">
          <span>Verv</span>
          <div>
            <strong>Tidligere økonomisk leder</strong>
            <p>ITxBergen</p>
          </div>
        </div>
        <ProfileTimeline
          educationTitle="Utdanning"
          education={[
            {
              title: 'Master, Programvareutvikling',
              organization:
                'Universitetet i Bergen · Høgskulen på Vestlandet',
              period: '2025–2027',
            },
            {
              title: 'Bachelor, Informasjonsteknologi',
              organization: 'Høgskulen på Vestlandet',
              period: '2022–2025',
            },
            {
              title: 'Bachelor, Samfunnsøkonomi',
              organization: 'Universitetet i Bergen',
              period: '2018–2021',
            },
          ]}
          experienceTitle="Arbeidserfaring"
          experience={[
            {
              badge: 'Kommende masterprosjekt',
              title: 'Masterstudent',
              organization: 'Odfjell Technology',
              period: 'Aug. 2026–Mai 2027',
              description:
                'AI-Driven Integrity Management in Offshore Engineering',
            },
            {
              title: 'Bachelorstudent',
              organization: 'CanEat',
              period: 'Jan. 2025–Mai 2025',
              description:
                'Bidro med å utvikle og implementere en automatisert løsning som forbedret datakvalitet og effektiviserte arbeidsprosesser med redusert behov for manuell behandling.',
            },
          ]}
        />
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
          <p>
            Maskinlæring, NLP, Multiagentsystemer, TensorFlow, Pytorch,
            Scikit-learn, NumPy
          </p>
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
      <ContactLinks
        emailLabel="E-post"
        githubLabel="Se kode og prosjekter"
        linkedinLabel="Koble med meg"
      />
    ),
  },
}

const englishContent = {
  about: {
    eyebrow: 'ABOUT',
    title: "Hi, I'm Kamil.",
    intro:
      'Software development student with an interest in secure, robust and innovative solutions that make complex processes easier to understand and use.',
    body: (
      <>
        <p>
          I study software development at UiB and HVL, with a background
          in information technology and economics. That combination means
          that I like to see both the technical side of a problem and the
          value the solution is actually meant to create.
          {' '}
          I am especially interested in data-driven solutions,
          automation, machine learning and modern software systems.
          Through studies, projects and work, I have gained experience in
          structuring data, improving work processes and building
          solutions that are practical to use.
        </p>
        <div className="profile-role">
          <span>Voluntary role</span>
          <div>
            <strong>Former treasurer</strong>
            <p>ITxBergen</p>
          </div>
        </div>
        <ProfileTimeline
          educationTitle="Education"
          education={[
            {
              title: "Master's, Software Development",
              organization:
                'University of Bergen · Western Norway University of Applied Sciences',
              period: '2025–2027',
            },
            {
              title: "Bachelor's, Information Technology",
              organization:
                'Western Norway University of Applied Sciences',
              period: '2022–2025',
            },
            {
              title: "Bachelor's, Economics",
              organization: 'University of Bergen',
              period: '2018–2021',
            },
          ]}
          experienceTitle="Work experience"
          experience={[
            {
              badge: "Upcoming master's project",
              title: "Master's student",
              organization: 'Odfjell Technology',
              period: 'Aug. 2026–May 2027',
              description:
                'AI-Driven Integrity Management in Offshore Engineering',
            },
            {
              title: "Bachelor's student",
              organization: 'CanEat',
              period: 'Jan. 2025–May 2025',
              description:
                'Contributed to developing and implementing an automated solution that improved data quality and streamlined work processes with a reduced need for manual processing.',
            },
          ]}
        />
        <div className="profile-meta">
          <span>Bergen, Norway</span>
          <span>Master&apos;s student in software development</span>
          <span>Java · Python · JavaScript · DevOps</span>
          <span>Machine learning · NLP · Multi-agent systems</span>
          <span>Open to relocation and new opportunities</span>
        </div>
      </>
    ),
  },
  skills: {
    eyebrow: 'SKILLS',
    title: 'Technology chosen according to the problem.',
    intro:
      'I work broadly with software development, data and web technology, and like to use tools that provide practical value in the solution.',
    body: (
      <div className="skills-list">
        <div>
          <span>Programming</span>
          <p>Java, Python, JavaScript, Kotlin</p>
        </div>
        <div>
          <span>Web development</span>
          <p>React, Three.js, Vite</p>
        </div>
        <div>
          <span>Backend and testing</span>
          <p>Spring Boot, Maven, JUnit</p>
        </div>
        <div>
          <span>Data and AI</span>
          <p>
            Machine learning, NLP, Multi-agent systems, TensorFlow,
            Pytorch, Scikit-learn, NumPy
          </p>
        </div>
        <div>
          <span>DevOps and workflow</span>
          <p>Docker, Kubernetes, Git, Agile/SCRUM</p>
        </div>
      </div>
    ),
  },
  contact: {
    eyebrow: 'CONTACT',
    title: 'Swing by my channels.',
    intro:
      'I am open to new opportunities, collaboration and developer roles. Feel free to contact me directly, or follow the trails onward to GitHub and LinkedIn.',
    body: (
      <ContactLinks
        emailLabel="Email"
        githubLabel="View code and projects"
        linkedinLabel="Connect with me"
      />
    ),
  },
}

function ProfileTimeline({
  educationTitle,
  education,
  experienceTitle,
  experience,
}) {
  return (
    <div className="profile-timeline">
      <TimelineSection title={experienceTitle} items={experience} />
      <TimelineSection title={educationTitle} items={education} />
    </div>
  )
}

function TimelineSection({ title, items }) {
  return (
    <section className="timeline-section">
      <h3>{title}</h3>
      <div className="timeline-list">
        {items.map((item) => (
          <article
            className="timeline-item"
            key={`${item.organization}-${item.period}`}
          >
            <div className="timeline-heading">
              <div>
                {item.badge && <span>{item.badge}</span>}
                <strong>{item.title}</strong>
                <p>{item.organization}</p>
              </div>
              <time>{item.period}</time>
            </div>
            {item.description && (
              <p className="timeline-description">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactLinks({ emailLabel, githubLabel, linkedinLabel }) {
  return (
    <div className="contact-links">
      <a href="mailto:kamilmaty@hotmail.com">
        <span>{emailLabel}</span>
        kamilmaty@hotmail.com
        <b>↗</b>
      </a>
      <a
        href="https://github.com/KamilMatyjaszczyk/"
        target="_blank"
        rel="noreferrer"
      >
        <span>GitHub</span>
        {githubLabel}
        <b>↗</b>
      </a>
      <a
        href="https://www.linkedin.com/in/kamil-matyjaszczyk-a7a08b213/"
        target="_blank"
        rel="noreferrer"
      >
        <span>LinkedIn</span>
        {linkedinLabel}
        <b>↗</b>
      </a>
    </div>
  )
}

export function getSectionContent(language = 'no') {
  return language === 'en' ? englishContent : norwegianContent
}
