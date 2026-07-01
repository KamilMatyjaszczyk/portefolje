import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { getPortfolioSections } from '../../entities/section/data/sections.data'
import { usePortfolioNavigation } from '../../features/portfolio-navigation/model/usePortfolioNavigation'
import { useLanguage } from '../../shared/i18n/useLanguage'
import JungleScene from '../../widgets/jungle-scene/ui/JungleScene'
import PortfolioNavigation from '../../widgets/portfolio-navigation/ui/PortfolioNavigation'
import PortfolioHero from '../../widgets/portfolio-hero/ui/PortfolioHero'
import SectionPanel from '../../widgets/section-panel/ui/SectionPanel'
import SiteHeader from '../../widgets/site-header/ui/SiteHeader'

const LAPTOP_BASE_WIDTH = 1440
const LAPTOP_BASE_HEIGHT = 810
const ROOT_FONT_SIZE = 16
const MAX_DESKTOP_SCALE = 1.55

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getViewportScale(width, height) {
  if (!width || !height) return 1

  if (width <= 370) return 0.94
  if (width < 900) return 1

  const scale = Math.min(
    width / LAPTOP_BASE_WIDTH,
    height / LAPTOP_BASE_HEIGHT,
  )

  return clamp(scale, 1, MAX_DESKTOP_SCALE)
}

function useViewportDocumentScale() {
  useLayoutEffect(() => {
    const root = document.documentElement

    const applyScale = () => {
      const scale = getViewportScale(window.innerWidth, window.innerHeight)

      root.style.setProperty('--viewport-scale', scale.toFixed(3))
      root.style.setProperty(
        '--root-font-size',
        `${(ROOT_FONT_SIZE * scale).toFixed(2)}px`,
      )
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('resize', applyScale)

    return () => {
      window.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('resize', applyScale)
    }
  }, [])
}

function getCameraFrame(width) {
  return {
    fov: width < 700 ? 54 : 52,
    z: width < 700 ? 9.35 : 8,
  }
}

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const frame = getCameraFrame(size.width, size.height)

    camera.fov = frame.fov
    camera.position.z = frame.z
    camera.updateProjectionMatrix()
  }, [camera, size.height, size.width])

  return null
}

function HomePage() {
  const { language } = useLanguage()
  useViewportDocumentScale()

  const portfolioSections = useMemo(
    () => getPortfolioSections(language),
    [language],
  )
  const navigation = usePortfolioNavigation(portfolioSections)

  return (
    <main
      className={`portfolio-shell ${
        Math.abs(navigation.dragOffset) > 0.01 ? 'is-dragging' : ''
      }`}
      onPointerDown={navigation.startDrag}
      onWheel={navigation.handleWheel}
    >
      <div className="jungle-atmosphere" aria-hidden="true">
        <div className="sun-haze" />
        <div className="canopy-shadow canopy-shadow-left" />
        <div className="canopy-shadow canopy-shadow-right" />
      </div>

      <SiteHeader onOpenAbout={() => navigation.openSection('about')} />
      <PortfolioHero />

      <div
        className="canvas-wrap"
        aria-hidden={navigation.activeSection ? 'true' : 'false'}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 52 }}
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true }}
          shadows
        >
          <ResponsiveCamera />
          <JungleScene
            journeyStep={navigation.journeyStep}
            journey={navigation.journey}
            dragOffset={navigation.dragOffset}
            sections={portfolioSections}
            onTravelTo={navigation.travelTo}
            onSectionOpen={navigation.openSection}
            onJourneyComplete={navigation.completeJourney}
          />
        </Canvas>
      </div>

      <PortfolioNavigation
        sections={portfolioSections}
        activeSection={navigation.activeSection}
        currentStop={navigation.currentStop}
        journey={navigation.journey}
        onOpen={navigation.openSection}
        onTravel={navigation.travel}
      />

      <SectionPanel
        activeSection={navigation.activeSection}
        onClose={navigation.closeSection}
      />
    </main>
  )
}

export default HomePage
