import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import { getPortfolioSections } from '../../entities/section/data/sections.data'
import { usePortfolioNavigation } from '../../features/portfolio-navigation/model/usePortfolioNavigation'
import { useLanguage } from '../../shared/i18n/useLanguage'
import JungleScene from '../../widgets/jungle-scene/ui/JungleScene'
import PortfolioNavigation from '../../widgets/portfolio-navigation/ui/PortfolioNavigation'
import PortfolioHero from '../../widgets/portfolio-hero/ui/PortfolioHero'
import SectionPanel from '../../widgets/section-panel/ui/SectionPanel'
import SiteHeader from '../../widgets/site-header/ui/SiteHeader'

function HomePage() {
  const { language } = useLanguage()
  const portfolioSections = useMemo(
    () => getPortfolioSections(language),
    [language],
  )
  const navigation = usePortfolioNavigation(portfolioSections.length)

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
