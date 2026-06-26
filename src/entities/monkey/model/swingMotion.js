import * as THREE from 'three'
import { STATION_SPACING } from '../../jungle/model/landscapeData'
import {
  applyMotionTarget,
  updateBodyRotation,
  updateVelocity,
} from './monkeyMotionSmoothing'
import {
  anchorVelocityX,
  cubicHermite,
  easeJourney,
  setPendulumTarget,
  smoothstep01,
} from './swingMath'

export const ROPE_LENGTH = 2.9
const VINE_ANCHOR_Y = 1.25
const BODY_HANG_OFFSET = 0.12

export function updateSwingMotion({
  monkey,
  journey,
  dragOffset,
  elapsed,
  delta,
  progress,
  idleTheta,
  swingStartTheta,
  currentAnchor,
  nextAnchor,
  targetPosition,
  previousPosition,
  movement,
  smoothedVelocity,
  hasPreviousPosition,
}) {
  const isTravelling = Boolean(journey)
  let theta = 0
  let activeVine = 'current'
  let currentVineOpacity = 1
  let nextVineReady = false
  let nextVineOpacity = 0
  let flightAmount = 0
  let flightProgress = 0

  if (isTravelling) {
    const direction = journey.direction
    const journeyProgress = progress.current
    const worldEase = easeJourney(journeyProgress)
    const previewOffset =
      journey.dragStart * 1.55 * (1 - worldEase)

    currentAnchor.set(
      -direction * worldEase * STATION_SPACING + previewOffset,
      VINE_ANCHOR_Y,
      0.42,
    )
    nextAnchor.set(
      direction * (1 - worldEase) * STATION_SPACING + previewOffset,
      VINE_ANCHOR_Y,
      0.42,
    )

    if (journeyProgress < 0.1) {
      const phase =
        0.5 - Math.cos((journeyProgress / 0.1) * Math.PI) * 0.5
      theta = THREE.MathUtils.lerp(
        swingStartTheta.current,
        -direction * 0.22,
        phase,
      )
      setMonkeyPendulumTarget(targetPosition, currentAnchor, theta)
    } else if (journeyProgress < 0.48) {
      const phase =
        0.5 -
        Math.cos(((journeyProgress - 0.1) / 0.38) * Math.PI) * 0.5
      theta = THREE.MathUtils.lerp(
        -direction * 0.22,
        direction * 0.68,
        phase,
      )
      setMonkeyPendulumTarget(targetPosition, currentAnchor, theta)
    } else if (journeyProgress < 0.64) {
      const phase = (journeyProgress - 0.48) / 0.16
      const flightSpan = 0.16
      const releaseTheta = direction * 0.68
      const catchTheta = -direction * 0.58
      const releaseEase = easeJourney(0.48)
      const catchEase = easeJourney(0.64)
      const releaseAnchorX =
        -direction * releaseEase * STATION_SPACING +
        journey.dragStart * 1.55 * (1 - releaseEase)
      const catchAnchorX =
        direction * (1 - catchEase) * STATION_SPACING +
        journey.dragStart * 1.55 * (1 - catchEase)
      const releaseX =
        releaseAnchorX + Math.sin(releaseTheta) * ROPE_LENGTH
      const releaseY =
        currentAnchor.y -
        Math.cos(releaseTheta) * ROPE_LENGTH -
        BODY_HANG_OFFSET
      const catchX =
        catchAnchorX + Math.sin(catchTheta) * ROPE_LENGTH
      const catchY =
        nextAnchor.y -
        Math.cos(catchTheta) * ROPE_LENGTH -
        BODY_HANG_OFFSET
      const releaseVelocityX =
        anchorVelocityX(
          0.48,
          direction,
          journey.dragStart,
          STATION_SPACING,
        ) *
        flightSpan
      const catchVelocityX =
        anchorVelocityX(
          0.64,
          direction,
          journey.dragStart,
          STATION_SPACING,
        ) *
        flightSpan
      const arc = 16 * phase * phase * (1 - phase) * (1 - phase)

      activeVine = 'flight'
      flightProgress = phase
      currentVineOpacity =
        1 - THREE.MathUtils.smoothstep(phase, 0.42, 0.94)
      nextVineReady = phase > 0.48
      nextVineOpacity = THREE.MathUtils.smoothstep(
        phase,
        0.48,
        0.82,
      )
      flightAmount = Math.sin(phase * Math.PI)
      targetPosition.set(
        cubicHermite(
          releaseX,
          catchX,
          releaseVelocityX,
          catchVelocityX,
          phase,
        ),
        cubicHermite(releaseY, catchY, 0, 0, phase) + arc * 0.72,
        1 + arc * 0.14,
      )
      theta = THREE.MathUtils.lerp(
        releaseTheta,
        catchTheta,
        smoothstep01(phase),
      )
    } else {
      const phase = (journeyProgress - 0.64) / 0.36
      const settle = 1 - smoothstep01(phase)
      theta =
        -direction *
        0.58 *
        settle *
        Math.cos(phase * Math.PI * 1.35)
      activeVine = 'next'
      currentVineOpacity = 0
      nextVineOpacity = 1
      setMonkeyPendulumTarget(targetPosition, nextAnchor, theta)
    }

    // Carry the exact landing angle into idle so clearing journey state
    // cannot snap the monkey back to a stale pre-jump angle.
    idleTheta.current = theta
  } else {
    currentAnchor.set(
      dragOffset * 1.55,
      VINE_ANCHOR_Y,
      0.42,
    )
    const idleTarget =
      -dragOffset * 0.18 +
      Math.sin(elapsed * 0.58) * 0.03 +
      Math.sin(elapsed * 1.17 + 0.7) * 0.009
    idleTheta.current = THREE.MathUtils.damp(
      idleTheta.current,
      idleTarget,
      5,
      delta,
    )
    theta = idleTheta.current
    setMonkeyPendulumTarget(targetPosition, currentAnchor, theta)
    targetPosition.y += Math.sin(elapsed * 1.12) * 0.014
    targetPosition.z += Math.sin(elapsed * 0.67 + 1.4) * 0.008
    monkey.rotation.z = THREE.MathUtils.damp(
      monkey.rotation.z,
      -theta * 0.4,
      9,
      delta,
    )
  }

  applyMotionTarget(monkey, targetPosition, delta, hasPreviousPosition)
  updateVelocity({
    monkey,
    delta,
    previousPosition,
    movement,
    smoothedVelocity,
    hasPreviousPosition,
  })
  updateBodyRotation({
    monkey,
    journey,
    isTravelling,
    flightAmount,
    theta,
    smoothedVelocity,
    elapsed,
    delta,
  })

  return {
    activeVine,
    isTravelling,
    currentVineOpacity,
    nextVineReady,
    nextVineOpacity,
    flightAmount,
    flightProgress,
    theta,
  }
}

function setMonkeyPendulumTarget(target, anchor, theta) {
  setPendulumTarget({
    target,
    anchor,
    theta,
    ropeLength: ROPE_LENGTH,
    bodyOffset: BODY_HANG_OFFSET,
  })
}
