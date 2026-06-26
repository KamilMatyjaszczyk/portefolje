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
  const isHanging = !journey && activeVine === 'current'
  const holdingSide = holdsWithLeft ? -1 : 1
  const freeSide = -holdingSide
  const sharedSway = Math.sin(elapsed * 1.15) * 0.035 + theta * 0.14
  const freeArmDrift = isHanging
    ? freeSide *
      (Math.sin(elapsed * 0.72 + 0.8) * 0.12 +
        Math.sin(elapsed * 1.43) * 0.045)
    : 0
  const flightSpread = flightAmount * 0.72

  let leftTarget = holdsWithLeft
    ? -2.28 + sharedSway
    : -1.28 + sharedSway + freeArmDrift
  let rightTarget = holdsWithLeft
    ? 1.28 + sharedSway + freeArmDrift
    : 2.28 + sharedSway

  if (activeVine === 'flight') {
    const handoff =
      flightProgress * flightProgress * (3 - 2 * flightProgress)
    const nextLeftTarget = holdsWithLeft ? -0.82 : -2.36
    const nextRightTarget = holdsWithLeft ? 2.36 : 0.82

    leftTarget = THREE.MathUtils.lerp(
      holdsWithLeft ? -2.28 : -1.28,
      nextLeftTarget,
      handoff,
    ) + sharedSway
    rightTarget = THREE.MathUtils.lerp(
      holdsWithLeft ? 1.28 : 2.28,
      nextRightTarget,
      handoff,
    ) + sharedSway
  } else if (activeVine === 'next') {
    leftTarget = holdsWithLeft
      ? -0.82 + sharedSway
      : -2.36 + sharedSway
    rightTarget = holdsWithLeft
      ? 2.36 + sharedSway
      : 0.82 + sharedSway
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
    0.2 +
      Math.abs(theta) * 0.08 +
      (isHanging ? Math.sin(elapsed * 0.9) * 0.018 : 0),
    12,
    delta,
  )
  reachingArm.rotation.x = THREE.MathUtils.damp(
    reachingArm.rotation.x,
    isHanging
      ? 0.22 +
          Math.sin(elapsed * 0.83 + 1.1) * 0.075 +
          Math.sin(elapsed * 1.9) * 0.025
      : THREE.MathUtils.lerp(
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
    (holdsWithLeft ? 0.34 : -0.34) +
      (isHanging ? Math.sin(elapsed * 0.68 + 2.2) * 0.09 : 0),
    8,
    delta,
  )

  const idleLeftLeg = isHanging
    ? Math.sin(elapsed * 0.78 + 0.25) * 0.09 +
      Math.sin(elapsed * 1.52) * 0.025
    : Math.sin(elapsed * 3.5) * 0.045
  const idleRightLeg = isHanging
    ? Math.sin(elapsed * 0.63 + 2.1) * 0.085 +
      Math.sin(elapsed * 1.31 + 0.5) * 0.025
    : -Math.sin(elapsed * 3.5) * 0.045

  refs.leftLeg.current.rotation.z = THREE.MathUtils.damp(
    refs.leftLeg.current.rotation.z,
    0.1 +
      idleLeftLeg +
      theta * 0.3 -
      THREE.MathUtils.clamp(smoothedVelocity.x * 0.025, -0.16, 0.16) -
      flightSpread,
    9,
    delta,
  )
  refs.rightLeg.current.rotation.z = THREE.MathUtils.damp(
    refs.rightLeg.current.rotation.z,
    -0.1 +
      idleRightLeg +
      theta * 0.22 -
      THREE.MathUtils.clamp(smoothedVelocity.x * 0.018, -0.12, 0.12) +
      flightSpread,
    9,
    delta,
  )
  refs.leftLeg.current.rotation.x = THREE.MathUtils.damp(
    refs.leftLeg.current.rotation.x,
    isHanging ? Math.sin(elapsed * 0.66 + 0.4) * 0.055 : 0,
    7,
    delta,
  )
  refs.rightLeg.current.rotation.x = THREE.MathUtils.damp(
    refs.rightLeg.current.rotation.x,
    isHanging ? Math.sin(elapsed * 0.59 + 2.5) * 0.05 : 0,
    7,
    delta,
  )
  refs.tail.current.rotation.z = THREE.MathUtils.damp(
    refs.tail.current.rotation.z,
    Math.sin(elapsed * 0.86 + 1.2) * (isHanging ? 0.13 : 0.07) +
      Math.sin(elapsed * 1.7) * (isHanging ? 0.035 : 0) -
      theta * 0.34 -
      THREE.MathUtils.clamp(smoothedVelocity.x * 0.025, -0.18, 0.18),
    7,
    delta,
  )
  refs.tail.current.rotation.y = THREE.MathUtils.damp(
    refs.tail.current.rotation.y,
    -0.18 +
      Math.sin(elapsed * (isHanging ? 0.62 : 1.6)) *
        (isHanging ? 0.11 : 0.06),
    6,
    delta,
  )

  return {
    holdingArm,
    holdingHand,
    holdsWithLeft,
    reachingArm,
    reachingHand,
  }
}
