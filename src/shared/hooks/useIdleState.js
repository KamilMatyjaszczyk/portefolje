import { useEffect, useRef, useState } from 'react'

const activityEvents = [
  'pointerdown',
  'wheel',
  'keydown',
  'touchstart',
]

export function useIdleState(delay) {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const resetTimer = () => {
      setIsIdle(false)
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setIsIdle(true), delay)
    }

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true })
    })
    resetTimer()

    return () => {
      window.clearTimeout(timerRef.current)
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [delay])

  return isIdle
}
