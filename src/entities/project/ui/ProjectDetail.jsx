import { useEffect, useState } from 'react'
import { useLanguage } from '../../../shared/i18n/useLanguage'

function ProjectDetail({ project, onBack }) {
  const { t } = useLanguage()
  const [videoFailed, setVideoFailed] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const showVideo = Boolean(project.videoUrl) && !videoFailed
  const galleryImages =
    project.architectureImages ?? project.resultImages
  const showGallery = !showVideo && Boolean(galleryImages?.length)

  useEffect(() => {
    setVideoFailed(false)
    setSelectedImage(null)
  }, [project.slug])

  return (
    <div className="project-detail">
      <button className="project-back" type="button" onClick={onBack}>
        ← {t('backToProjects')}
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
            aria-label={`${t('videoPreview')} ${project.title}`}
            onError={() => setVideoFailed(true)}
          >
            <source src={project.videoUrl} type="video/webm" />
            {t('videoUnsupported')}
          </video>
        </div>
      ) : showGallery ? (
        <ProjectImageGallery
          images={galleryImages}
          title={project.galleryTitle}
          description={project.galleryDescription}
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
          <span>{t('aboutProject')}</span>
          <p>{project.description}</p>
          {project.githubUrl && (
            <a
              className="project-link"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('viewCode')} →
            </a>
          )}
        </div>
        <div>
          <span>{t('technology')}</span>
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

function ProjectImageGallery({
  images,
  title,
  description,
  onSelect,
}) {
  const { t } = useLanguage()

  return (
    <div className="project-demo project-demo--architecture">
      <div className="architecture-heading">
        <span>{title ?? t('galleryDefaultTitle')}</span>
        <p>{description ?? t('galleryDefaultDescription')}</p>
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
  const { t } = useLanguage()

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
      <button type="button" onClick={onClose} aria-label={t('closeImage')}>
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
  const { t } = useLanguage()
  const isCurrentProject = project.slug === 'jungel-portfolio'
  const isCompletedProject = project.stage === 'completed'
  const isOngoingProject = project.stage === 'ongoing'

  return (
    <div
      className={`project-demo ${
        isCurrentProject ? 'project-demo--current' : ''
      }`}
    >
      {(videoFailed || !isCurrentProject) && (
        <span>{videoFailed ? t('videoUnavailable') : project.status}</span>
      )}
      <strong>
        {videoFailed
          ? t('demoComing')
          : isCurrentProject
            ? t('currentProject')
          : isCompletedProject
            ? t('completedProject')
          : isOngoingProject
            ? t('ongoingProject')
          : project.demo
            ? t('interactiveDemo')
            : t('projectOverview')}
      </strong>
      <p>
        {videoFailed
          ? t('videoFailed')
          : isCurrentProject
            ? t('currentProjectDescription')
          : isCompletedProject
            ? t('completedDescription')
          : isOngoingProject
            ? t('ongoingDescription')
          : project.demo
            ? t('demoDescription')
            : t('caseDescription')}
      </p>
    </div>
  )
}

export default ProjectDetail
