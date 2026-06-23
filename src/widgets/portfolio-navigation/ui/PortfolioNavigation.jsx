function PortfolioNavigation({
  sections,
  activeSection,
  currentStop,
  journey,
  onOpen,
  onTravel,
}) {
  return (
    <>
      <button
        className="edge-zone edge-zone-left"
        type="button"
        onClick={() => onTravel(-1)}
        disabled={Boolean(journey)}
        aria-label="Forrige stopp"
      >
        <span>←</span>
        Forrige
      </button>
      <button
        className="edge-zone edge-zone-right"
        type="button"
        onClick={() => onTravel(1)}
        disabled={Boolean(journey)}
        aria-label="Neste stopp"
      >
        Neste
        <span>→</span>
      </button>

      <p className="character-label">
        Dra, sveip eller scroll · Sving videre
      </p>

      <nav className="fallback-nav" aria-label="Portefølje">
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
