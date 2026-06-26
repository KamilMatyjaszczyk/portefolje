import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'details > summary:first-of-type',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(container) {
  return [...container.querySelectorAll(FOCUSABLE_SELECTOR)].filter(
    (element) =>
      !element.hidden &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.getClientRects().length > 0,
  )
}

export function useModalFocus({
  isOpen,
  focusKey,
  onEscape,
}) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const wasOpenRef = useRef(false)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  useEffect(() => {
    const appRoot = document.getElementById('root')

    if (!isOpen) {
      wasOpenRef.current = false
      return
    }

    if (!wasOpenRef.current) {
      returnFocusRef.current = document.activeElement
      wasOpenRef.current = true
    }

    if (appRoot) appRoot.inert = true

    return () => {
      if (!appRoot) return

      appRoot.inert = false

      const returnTarget = returnFocusRef.current
      window.requestAnimationFrame(() => {
        if (!isOpenRef.current && returnTarget?.isConnected) {
          returnTarget.focus()
        }
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const dialog = dialogRef.current
    if (!dialog) return undefined

    const focusFrame = window.requestAnimationFrame(() => {
      dialog.focus({ preventScroll: true })
      dialog.scrollTop = 0
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onEscape()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements(dialog)
      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (
        event.shiftKey &&
        (activeElement === firstElement || activeElement === dialog)
      ) {
        event.preventDefault()
        lastElement.focus()
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [focusKey, isOpen, onEscape])

  return dialogRef
}
