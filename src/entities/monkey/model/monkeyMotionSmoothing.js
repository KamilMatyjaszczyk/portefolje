import * as THREE from 'three'

export function applyMotionTarget(
  monkey,
  target,
  delta,
  hasPreviousPosition,
) {
  if (!hasPreviousPosition.current) {
    monkey.position.copy(target)
    return
  }

  monkey.position.x = THREE.MathUtils.damp(
    monkey.position.x,
    target.x,
    24,
    delta,
  )
  monkey.position.y = THREE.MathUtils.damp(
    monkey.position.y,
    target.y,
    24,
    delta,
  )
  monkey.position.z = THREE.MathUtils.damp(
    monkey.position.z,
    target.z,
    24,
    delta,
  )
}

export function updateVelocity({
  monkey,
  delta,
  previousPosition,
  movement,
  smoothedVelocity,
  hasPreviousPosition,
}) {
  if (hasPreviousPosition.current) {
    movement
      .copy(monkey.position)
      .sub(previousPosition)
      .multiplyScalar(1 / Math.max(delta, 0.001))
    smoothedVelocity.lerp(movement, 1 - Math.exp(-delta * 9))
  } else {
    hasPreviousPosition.current = true
  }

  previousPosition.copy(monkey.position)
}

export function updateBodyRotation({
  monkey,
  journey,
  isTravelling,
  flightAmount,
  theta,
  smoothedVelocity,
  delta,
}) {
  if (!isTravelling) {
    monkey.rotation.x = THREE.MathUtils.damp(
      monkey.rotation.x,
      0,
      9,
      delta,
    )
    return
  }

  const flightLean = journey.direction * -0.12 * flightAmount
  const rotationTarget =
    -theta * 0.34 -
    THREE.MathUtils.clamp(
      smoothedVelocity.x * 0.018,
      -0.16,
      0.16,
    ) +
    flightLean

  monkey.rotation.z = THREE.MathUtils.damp(
    monkey.rotation.z,
    rotationTarget,
    11,
    delta,
  )
  monkey.rotation.x = THREE.MathUtils.damp(
    monkey.rotation.x,
    -0.08 * flightAmount,
    9,
    delta,
  )
}
