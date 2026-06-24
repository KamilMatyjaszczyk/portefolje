import HomePage from '../pages/home/HomePage'
import LanguageProvider from '../shared/i18n/LanguageProvider'

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  )
}

export default App
