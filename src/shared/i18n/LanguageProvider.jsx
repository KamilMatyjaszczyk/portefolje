import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { uiTranslations } from './uiTranslations'

const STORAGE_KEY = 'portfolio-language'
const SUPPORTED_LANGUAGES = ['no', 'en']

function getInitialLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) return savedLanguage
  } catch {
    // The site still works when storage is unavailable.
  }

  return 'no'
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    const metadata = uiTranslations[language]

    document.documentElement.lang = language === 'no' ? 'nb' : 'en'
    document.title = metadata.pageTitle
    updateMeta('name', 'description', metadata.pageDescription)
    updateMeta('property', 'og:title', metadata.pageTitle)
    updateMeta(
      'property',
      'og:description',
      metadata.pageDescription,
    )
    updateMeta(
      'property',
      'og:locale',
      language === 'no' ? 'nb_NO' : 'en_US',
    )
    updateMeta('name', 'twitter:title', metadata.pageTitle)
    updateMeta(
      'name',
      'twitter:description',
      metadata.pageDescription,
    )

    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Ignore restricted or unavailable storage.
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === 'no' ? 'en' : 'no')),
      t: (key) => uiTranslations[language][key] ?? key,
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

function updateMeta(attribute, value, content) {
  document
    .querySelector(`meta[${attribute}="${value}"]`)
    ?.setAttribute('content', content)
}

export default LanguageProvider
