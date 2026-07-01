import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../../shared/i18n/useLanguage'

function SiteHeader({ onOpenAbout }) {
  const { language, toggleLanguage, t } = useLanguage()
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const statusRef = useRef(null)

  useEffect(() => {
    if (!isStatusOpen) return undefined

    const closeStatus = (event) => {
      if (!statusRef.current?.contains(event.target)) {
        setIsStatusOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsStatusOpen(false)
    }

    document.addEventListener('pointerdown', closeStatus)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeStatus)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isStatusOpen])

  return (
    <header className="site-header">
      <button
        className="brand"
        type="button"
        onClick={onOpenAbout}
        aria-label={
          language === 'no' ? 'Åpne Om meg' : 'Open About me'
        }
      >
        <span className="brand-mark">KM</span>
        <span className="brand-copy">
          <strong>Kamil Matyjaszczyk</strong>
          <small>{t('role')}</small>
        </span>
      </button>
      <div className="header-actions">
        <div
          ref={statusRef}
          className={`status-wrap ${isStatusOpen ? 'is-open' : ''}`}
        >
          <button
            className="status-pill"
            type="button"
            onClick={() => setIsStatusOpen((isOpen) => !isOpen)}
            aria-expanded={isStatusOpen}
            aria-controls="availability-status"
            aria-label={t('availability')}
          >
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">{t('availability')}</span>
          </button>
          <div
            id="availability-status"
            className="status-popover"
            role="status"
            aria-hidden={!isStatusOpen}
          >
            {t('availability')}
          </div>
        </div>
        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={t('switchLanguage')}
          title={t('switchLanguage')}
        >
          <span className={language === 'no' ? 'is-active' : ''}>NO</span>
          <i>/</i>
          <span className={language === 'en' ? 'is-active' : ''}>EN</span>
        </button>
      </div>
    </header>
  )
}

export default SiteHeader
