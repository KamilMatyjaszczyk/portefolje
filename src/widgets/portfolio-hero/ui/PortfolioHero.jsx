import { useLanguage } from '../../../shared/i18n/useLanguage'

function PortfolioHero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow">{t('heroEyebrow')}</p>
      <h1 id="hero-title">
        {t('heroTitle')}
        <span>{t('heroTitleAccent')}</span>
      </h1>
      <p className="hero-copy">{t('heroCopy')}</p>
    </section>
  )
}

export default PortfolioHero
