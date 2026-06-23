function ProjectDetail({ project, onBack }) {
  return (
    <div className="project-detail">
      <button className="project-back" type="button" onClick={onBack}>
        ← Tilbake til prosjekter
      </button>
      <p className="panel-eyebrow">
        {project.number} / {project.category}
      </p>
      <h2 id="panel-title">{project.title}</h2>
      <p className="panel-intro">{project.summary}</p>

      <div className="project-demo">
        <span>{project.status}</span>
        <strong>
          {project.demo ? 'Interaktiv demo' : 'Prosjektoversikt'}
        </strong>
        <p>
          {project.demo
            ? 'Dette området er klart for en innebygd demo når prosjektet kobles til.'
            : 'Dette prosjektet presenteres som et teknisk case uten en offentlig demo.'}
        </p>
      </div>

      <div className="project-detail-copy">
        <div>
          <span>Om prosjektet</span>
          <p>{project.description}</p>
        </div>
        <div>
          <span>Teknologi</span>
          <ul>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
