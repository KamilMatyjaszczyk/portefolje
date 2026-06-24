import { useLanguage } from '../../../shared/i18n/useLanguage'

function PortfolioNavigation({
  sections,
  activeSection,
  currentStop,
  journey,
  onOpen,
  onTravel,
}) {
  const { t } = useLanguage()

  return (
    <>
      <button
        className="edge-zone edge-zone-left"
        type="button"
        onClick={() => onTravel(-1)}
        disabled={Boolean(journey)}
        aria-label={t('previousStop')}
      >
        <span>←</span>
        {t('previous')}
      </button>
      <button
        className="edge-zone edge-zone-right"
        type="button"
        onClick={() => onTravel(1)}
        disabled={Boolean(journey)}
        aria-label={t('nextStop')}
      >
        {t('next')}
        <span>→</span>
      </button>

      <p className="character-label">{t('interactionHint')}</p>

      <nav className="fallback-nav" aria-label={t('portfolioNavigation')}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={
              activeSection === section.id || currentStop === index
                ? 'is-active'
                : ''
            }
            type="button"
            onClick={() => onOpen(section.id)}
          >
            <span>0{index + 1}</span>
            {section.label}
          </button>
        ))}
      </nav>
    </>
  )
}

export default PortfolioNavigation
