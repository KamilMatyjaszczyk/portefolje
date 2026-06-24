import { useLanguage } from '../../../shared/i18n/useLanguage'

function SiteHeader({ onOpenAbout }) {
  const { language, toggleLanguage, t } = useLanguage()

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
        <div className="status-pill">
          <span />
          {t('availability')}
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
