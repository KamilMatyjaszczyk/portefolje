function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Gå til toppen">
        <span className="brand-mark">KM</span>
        <span className="brand-copy">
          <strong>Kamil Matyjaszczyk</strong>
          <small>Software developer</small>
        </span>
      </a>
      <div className="status-pill">
        <span />
        Tilgjengelig for nye muligheter
      </div>
    </header>
  )
}

export default SiteHeader
