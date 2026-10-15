import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../shared/i18n/useLanguage'
import { navigateToPath } from '../../shared/routing/routes'
import SiteHeader from '../../widgets/site-header/ui/SiteHeader'
import LostTrailScene from './ui/LostTrailScene'

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reducedMotion
}

function NotFoundPage() {
  const { language } = useLanguage()
  const reducedMotion = useReducedMotion()
  const isNorwegian = language === 'no'

  return (
    <main className="portfolio-shell not-found-page">
      <div className="jungle-atmosphere" aria-hidden="true">
        <div className="sun-haze" />
        <div className="canopy-shadow canopy-shadow-left" />
        <div className="canopy-shadow canopy-shadow-right" />
      </div>

      <SiteHeader onOpenAbout={() => navigateToPath('/om-meg')} />

      <div className="lost-trail-scene" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0.5, 8], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{ alpha: true, antialias: true }}
          fallback={<div className="lost-trail-fallback">404</div>}
        >
          <LostTrailScene reducedMotion={reducedMotion} />
        </Canvas>
      </div>

      <section className="lost-trail-copy" aria-labelledby="not-found-title">
        <p className="eyebrow">
          {isNorwegian ? '404 / UTENFOR STI' : '404 / OFF THE TRAIL'}
        </p>
        <h1 id="not-found-title">
          {isNorwegian ? 'Denne stien fører' : 'This trail leads'}{' '}
          <span>{isNorwegian ? 'ingen steder.' : 'nowhere.'}</span>
        </h1>
        <p className="lost-trail-description">
          {isNorwegian
            ? 'Her har jungelen tatt over. Siden du leter etter finnes ikke, men vi hjelper deg tilbake på stien.'
            : 'The jungle has taken over here. The page you’re looking for doesn’t exist, but we’ll help you find your way back.'}
        </p>
        <a
          className="lost-trail-home"
          href="/"
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            navigateToPath('/')
          }}
        >
          <span aria-hidden="true">←</span>
          {isNorwegian ? 'Tilbake til jungelen' : 'Back to the jungle'}
        </a>
      </section>

      <p className="lost-trail-caption" aria-hidden="true">
        {isNorwegian ? 'Selv de beste går seg litt vill.' : 'Even the best explorers get a little lost.'}
      </p>
    </main>
  )
}

export default NotFoundPage
