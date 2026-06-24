import { useEffect, useState } from 'react'

function ProjectDetail({ project, onBack }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const showVideo = Boolean(project.videoUrl) && !videoFailed
  const showArchitecture =
    !showVideo && Boolean(project.architectureImages?.length)

  useEffect(() => {
    setVideoFailed(false)
    setSelectedImage(null)
  }, [project.slug])

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

      {showVideo ? (
        <div className="project-demo project-demo--video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Video-preview av ${project.title}`}
            onError={() => setVideoFailed(true)}
          >
            <source src={project.videoUrl} type="video/webm" />
            Nettleseren din støtter ikke videoavspilling.
          </video>
        </div>
      ) : showArchitecture ? (
        <ArchitectureGallery
          images={project.architectureImages}
          onSelect={setSelectedImage}
        />
      ) : (
        <ProjectDemoPlaceholder
          project={project}
          videoFailed={videoFailed}
        />
      )}

      <div className="project-detail-copy">
        <div>
          <span>Om prosjektet</span>
          <p>{project.description}</p>
          {project.githubUrl && (
            <a
              className="project-link"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              Se kode på GitHub →
            </a>
          )}
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

      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

function ArchitectureGallery({ images, onSelect }) {
  return (
    <div className="project-demo project-demo--architecture">
      <div className="architecture-heading">
        <span>ARKITEKTUR</span>
        <p>Klikk på et diagram for å se det større.</p>
      </div>
      <div className="architecture-grid">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onSelect(image)}
          >
            <img src={image.src} alt={image.alt} />
            <strong>{image.title}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}

function ImageLightbox({ image, onClose }) {
  return (
    <div
      className="architecture-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button type="button" onClick={onClose} aria-label="Lukk bilde">
        ×
      </button>
      <figure>
        <img src={image.src} alt={image.alt} />
        <figcaption>{image.title}</figcaption>
      </figure>
    </div>
  )
}

function ProjectDemoPlaceholder({ project, videoFailed }) {
  const isCurrentProject = project.status === 'Du ser den nå'

  return (
    <div
      className={`project-demo ${
        isCurrentProject ? 'project-demo--current' : ''
      }`}
    >
      {(videoFailed || !isCurrentProject) && (
        <span>{videoFailed ? 'Video utilgjengelig' : project.status}</span>
      )}
      <strong>
        {videoFailed
          ? 'Demo kommer'
          : isCurrentProject
            ? 'Du ser den nå'
          : project.demo
            ? 'Interaktiv demo'
            : 'Prosjektoversikt'}
      </strong>
      <p>
        {videoFailed
          ? 'Video-previewen kunne ikke lastes inn. Prosjektinformasjonen er fortsatt tilgjengelig nedenfor.'
          : isCurrentProject
            ? 'Denne porteføljen er selve demoen.'
          : project.demo
            ? 'Dette området er klart for en innebygd demo når prosjektet kobles til.'
            : 'Dette prosjektet presenteres som et teknisk case uten en offentlig demo.'}
      </p>
    </div>
  )
}

export default ProjectDetail
