function ModalPanel({
  isOpen,
  isDetail = false,
  onClose,
  children,
}) {
  return (
    <div
      className={`panel-backdrop ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {isOpen && (
        <section
          className={`content-panel ${isDetail ? 'is-project-detail' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panel-title"
        >
          <button
            className="panel-close"
            type="button"
            onClick={onClose}
            aria-label="Lukk panel"
          >
            <span />
            <span />
          </button>
          {children}
        </section>
      )}
    </div>
  )
}

export default ModalPanel
