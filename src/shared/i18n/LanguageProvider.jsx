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
    document.documentElement.lang = language === 'no' ? 'nb' : 'en'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        uiTranslations[language].pageDescription,
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

export default LanguageProvider
