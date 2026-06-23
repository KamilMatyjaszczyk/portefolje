import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SWING_DURATION_SECONDS } from '../../../shared/config/animation'

const MAX_ANIMATION_DELTA = 1 / 30

export function useJourneyProgress(journey, onComplete) {
  const progress = useRef(1)
  const activeToken = useRef(null)
  const completedToken = useRef(null)

  useFrame((_, delta) => {
    if (!journey) {
      progress.current = 1
      activeToken.current = null
      return
    }

    if (activeToken.current !== journey.token) {
      activeToken.current = journey.token
      completedToken.current = null
      progress.current = 0
      return
    }

    progress.current = Math.min(
      1,
      progress.current +
        Math.min(delta, MAX_ANIMATION_DELTA) /
          SWING_DURATION_SECONDS,
    )

    if (
      progress.current === 1 &&
      completedToken.current !== journey.token
    ) {
      completedToken.current = journey.token
      onComplete(journey.token)
    }
  }, -1)

  return progress
}
