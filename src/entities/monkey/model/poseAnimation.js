import * as THREE from 'three'

export function updateMonkeyPose({
  refs,
  journey,
  journeyStep,
  activeVine,
  flightAmount,
  flightProgress,
  theta,
  smoothedVelocity,
  elapsed,
  delta,
}) {
  const gripStep = journey?.from ?? journeyStep
  const holdsWithLeft = Math.abs(gripStep % 2) === 0
  const holdingArm = holdsWithLeft
    ? refs.leftArm.current
    : refs.rightArm.current
  const reachingArm = holdsWithLeft
    ? refs.rightArm.current
    : refs.leftArm.current
  const holdingHand = holdsWithLeft
    ? refs.leftHand.current
    : refs.rightHand.current
  const reachingHand = holdsWithLeft
    ? refs.rightHand.current
    : refs.leftHand.current
  const armSway = Math.sin(elapsed * 2.1) * 0.1 + theta * 0.14
  const flightSpread = flightAmount * 0.72

  let leftTarget = holdsWithLeft
    ? -2.28 + armSway
    : -1.28 + armSway
  let rightTarget = holdsWithLeft
    ? 1.28 + armSway
    : 2.28 + armSway

  if (activeVine === 'flight') {
    const handoff =
      flightProgress * flightProgress * (3 - 2 * flightProgress)
    const nextLeftTarget = holdsWithLeft ? -0.82 : -2.36
    const nextRightTarget = holdsWithLeft ? 2.36 : 0.82

    leftTarget = THREE.MathUtils.lerp(
      holdsWithLeft ? -2.28 : -1.28,
      nextLeftTarget,
      handoff,
    ) + armSway
    rightTarget = THREE.MathUtils.lerp(
      holdsWithLeft ? 1.28 : 2.28,
      nextRightTarget,
      handoff,
    ) + armSway
  } else if (activeVine === 'next') {
    leftTarget = holdsWithLeft
      ? -0.82 + armSway
      : -2.36 + armSway
    rightTarget = holdsWithLeft
      ? 2.36 + armSway
      : 0.82 + armSway
  }

  refs.leftArm.current.rotation.z = THREE.MathUtils.damp(
    refs.leftArm.current.rotation.z,
    leftTarget,
    14,
    delta,
  )
  refs.rightArm.current.rotation.z = THREE.MathUtils.damp(
    refs.rightArm.current.rotation.z,
    rightTarget,
    14,
    delta,
  )
  holdingArm.rotation.x = THREE.MathUtils.damp(
    holdingArm.rotation.x,
    0.2 + Math.abs(theta) * 0.08,
    12,
    delta,
  )
  reachingArm.rotation.x = THREE.MathUtils.damp(
    reachingArm.rotation.x,
    THREE.MathUtils.lerp(
      0.2 + Math.sin(elapsed * 1.7) * 0.06,
      0.3,
      flightAmount,
    ),
    12,
    delta,
  )
  holdingArm.rotation.y = THREE.MathUtils.damp(
    holdingArm.rotation.y,
    holdsWithLeft ? -0.18 : 0.18,
    10,
    delta,
  )
  reachingArm.rotation.y = THREE.MathUtils.damp(
    reachingArm.rotation.y,
    holdsWithLeft ? 0.34 : -0.34,
    8,
    delta,
  )

  refs.leftLeg.current.rotation.z =
    0.1 +
    Math.sin(elapsed * 3.5) * 0.045 +
    theta * 0.3 -
    THREE.MathUtils.clamp(smoothedVelocity.x * 0.025, -0.16, 0.16) -
    flightSpread
  refs.rightLeg.current.rotation.z =
    -0.1 -
    Math.sin(elapsed * 3.5) * 0.045 +
    theta * 0.22 -
    THREE.MathUtils.clamp(smoothedVelocity.x * 0.018, -0.12, 0.12) +
    flightSpread
  refs.tail.current.rotation.z =
    Math.sin(elapsed * 2.2) * 0.07 -
    theta * 0.34 -
    THREE.MathUtils.clamp(smoothedVelocity.x * 0.025, -0.18, 0.18)
  refs.tail.current.rotation.y =
    -0.18 + Math.sin(elapsed * 1.6) * 0.06

  return {
    holdingArm,
    holdingHand,
    holdsWithLeft,
    reachingArm,
    reachingHand,
  }
}
