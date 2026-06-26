import { useEffect, useState } from 'react'
import { useLanguage } from '../../../shared/i18n/useLanguage'

function ProjectDetail({ project, onBack }) {
  const { t } = useLanguage()
  const [videoFailed, setVideoFailed] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [embedStarted, setEmbedStarted] = useState(false)
  const [media, setMedia] = useState({
    videoUrl: null,
    galleryImages: null,
    isLoading: false,
    hasError: false,
  })
  const embedUrl = project.embedPath
    ? `${import.meta.env.BASE_URL}${project.embedPath}`
    : null
  const showVideo = Boolean(media.videoUrl) && !videoFailed
  const galleryImages = media.galleryImages
  const showGallery = !showVideo && Boolean(galleryImages?.length)

  useEffect(() => {
    let ignoreResult = false
    const gallery = getProjectGallery(project)
    const shouldLoadMedia =
      Boolean(project.videoLoader) || Boolean(gallery?.length)

    setVideoFailed(false)
    setSelectedImage(null)
    setEmbedStarted(false)
    setMedia({
      videoUrl: null,
      galleryImages: null,
      isLoading: shouldLoadMedia,
      hasError: false,
    })

    if (!shouldLoadMedia) return undefined

    async function loadProjectMedia() {
      try {
        const [videoUrl, loadedGalleryImages] = await Promise.all([
          project.videoLoader?.() ?? Promise.resolve(null),
          loadProjectGallery(gallery),
        ])

        if (!ignoreResult) {
          setMedia({
            videoUrl,
            galleryImages: loadedGalleryImages,
            isLoading: false,
            hasError: false,
          })
        }
      } catch {
        if (!ignoreResult) {
          setMedia({
            videoUrl: null,
            galleryImages: null,
            isLoading: false,
            hasError: true,
          })
        }
      }
    }

    loadProjectMedia()

    return () => {
      ignoreResult = true
    }
  }, [project])

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

      {embedUrl ? (
        <EmbeddedGameBoyDemo
          url={embedUrl}
          started={embedStarted}
          onStart={() => setEmbedStarted(true)}
        />
      ) : media.isLoading ? (
        <ProjectMediaLoading />
      ) : showVideo ? (
        <div className="project-demo project-demo--video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${t('videoPreview')} ${project.title}`}
            onError={() => setVideoFailed(true)}
          >
            <source src={media.videoUrl} type="video/webm" />
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
          videoFailed={videoFailed || media.hasError}
        />
      )}

      <div className="project-detail-copy">
        <div>
          <span>{t('aboutProject')}</span>
          <div className="project-description">
            {getDescriptionParagraphs(project.description).map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
          </div>
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

function getProjectGallery(project) {
  return project.architectureImages ?? project.resultImages ?? null
}

async function loadProjectGallery(images) {
  if (!images?.length) return null

  return Promise.all(
    images.map(async (image) => ({
      ...image,
      src: image.src ?? (await image.loadSrc()),
    })),
  )
}

function getDescriptionParagraphs(description) {
  if (Array.isArray(description)) return description

  const sentences = description
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  if (sentences.length <= 2) return [description]

  return sentences.reduce((paragraphs, sentence, index) => {
    const paragraphIndex = Math.floor(index / 2)
    paragraphs[paragraphIndex] = paragraphs[paragraphIndex]
      ? `${paragraphs[paragraphIndex]} ${sentence}`
      : sentence
    return paragraphs
  }, [])
}

function ProjectMediaLoading() {
  const { t } = useLanguage()

  return (
    <div className="project-demo project-demo--loading">
      <span>{t('projectMediaLoading')}</span>
      <div aria-hidden="true" />
    </div>
  )
}

function EmbeddedGameBoyDemo({ url, started, onStart }) {
  const { t } = useLanguage()

  if (started) {
    return (
      <div className="project-demo project-demo--embed">
        <div className="embed-toolbar">
          <span>{t('gameboyDemoLabel')}</span>
          <a href={url} target="_blank" rel="noreferrer">
            {t('gameboyOpenTab')} ↗
          </a>
        </div>
        <div className="embed-viewport">
          <iframe
            src={url}
            title={t('gameboyFrameTitle')}
            sandbox="allow-scripts allow-same-origin allow-downloads allow-modals"
            allow="fullscreen"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="project-demo project-demo--embed-launcher">
      <span>{t('gameboyDemoLabel')}</span>
      <strong>{t('gameboyDemoTitle')}</strong>
      <p>{t('gameboyDemoDescription')}</p>
      <div className="embed-launcher-actions">
        <button type="button" onClick={onStart}>
          {t('gameboyStart')} →
        </button>
        <a href={url} target="_blank" rel="noreferrer">
          {t('gameboyOpenTab')} ↗
        </a>
      </div>
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
