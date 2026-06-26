import { createPortal } from 'react-dom'
import { useModalFocus } from '../hooks/useModalFocus'
import { useLanguage } from '../i18n/useLanguage'

function ModalPanel({
  isOpen,
  isDetail = false,
  onClose,
  onEscape = onClose,
  focusKey,
  children,
}) {
  const { t } = useLanguage()
  const dialogRef = useModalFocus({
    isOpen,
    focusKey,
    onEscape,
  })

  return createPortal(
    <div
      className={`panel-backdrop ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {isOpen && (
        <section
          ref={dialogRef}
          className={`content-panel ${isDetail ? 'is-project-detail' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panel-title"
          tabIndex={-1}
        >
          <button
            className="panel-close"
            type="button"
            onClick={onClose}
            aria-label={t('closePanel')}
          >
            <span />
            <span />
          </button>
          {children}
        </section>
      )}
    </div>,
    document.body,
  )
}

export default ModalPanel
