import * as THREE from 'three'

const SEQUENCE_DURATION = 10
const DROP_START = 5.25
const BITE_CENTERS = [2.15, 3.2, 4.25]
const RESTING_ARM_ANGLE = 1.28
const MOUTH_ARM_ANGLE = 6.3

export function updateBananaAnimation({
  banana,
  monkey,
  freeHand,
  reachingArm,
  holdsWithLeft,
  isIdle,
  journey,
  idleStartedAt,
  wasDropping,
  handPosition,
  bananaPosition,
  dropPosition,
  delta,
}) {
  if (!banana) return

  const totalIdleTime =
    performance.now() / 1000 - idleStartedAt.current
  const idleTime = totalIdleTime % SEQUENCE_DURATION
  const isEating = isIdle && !journey && idleTime < 7
  banana.visible = isEating

  if (idleTime < 0.1) {
    wasDropping.current = false
    banana.scale.setScalar(1)
  }

  if (isEating && idleTime < DROP_START) {
    updateEating({
      banana,
      monkey,
      freeHand,
      reachingArm,
      holdsWithLeft,
      idleTime,
      wasDropping,
      handPosition,
      bananaPosition,
      delta,
    })
  } else if (isEating) {
    updateDrop({
      banana,
      holdsWithLeft,
      dropTime: idleTime - DROP_START,
      wasDropping,
      dropPosition,
      delta,
    })
  }
}

function updateEating({
  banana,
  monkey,
  freeHand,
  reachingArm,
  holdsWithLeft,
  idleTime,
  wasDropping,
  handPosition,
  bananaPosition,
  delta,
}) {
  const freeSide = holdsWithLeft ? 1 : -1
  const appear = THREE.MathUtils.smoothstep(idleTime, 0.12, 0.38)
  const lift = THREE.MathUtils.smoothstep(idleTime, 0.38, 1.65)
  const biteBob = Math.max(
    ...BITE_CENTERS.map((center) => {
      const distance = Math.abs(idleTime - center)
      return distance < 0.22
        ? Math.sin((1 - distance / 0.22) * Math.PI * 0.5)
        : 0
    }),
  )
  const biteScale =
    1 -
    BITE_CENTERS.reduce(
      (amount, center) =>
        amount +
        THREE.MathUtils.smoothstep(
          idleTime,
          center + 0.08,
          center + 0.25,
        ) *
          0.18,
      0,
    )
  const armTarget = THREE.MathUtils.lerp(
    freeSide * RESTING_ARM_ANGLE,
    freeSide * (MOUTH_ARM_ANGLE - biteBob * 0.045),
    lift,
  )

  reachingArm.rotation.z = THREE.MathUtils.damp(
    reachingArm.rotation.z,
    armTarget,
    9,
    delta,
  )
  reachingArm.rotation.x = THREE.MathUtils.damp(
    reachingArm.rotation.x,
    THREE.MathUtils.lerp(0.2, 0.08, lift),
    10,
    delta,
  )
  reachingArm.rotation.y = THREE.MathUtils.damp(
    reachingArm.rotation.y,
    0,
    10,
    delta,
  )

  monkey.updateMatrixWorld(true)
  freeHand.getWorldPosition(handPosition)
  bananaPosition.copy(handPosition)
  monkey.worldToLocal(bananaPosition)
  banana.position.copy(bananaPosition)
  banana.position.x +=
    freeSide * THREE.MathUtils.lerp(0.07, 0.035, lift)
  banana.position.y +=
    THREE.MathUtils.lerp(0.06, -0.015, lift)
  banana.position.z += THREE.MathUtils.lerp(0.1, 0.14, lift)
  banana.rotation.set(
    0.18,
    freeSide * -0.24,
    freeSide * THREE.MathUtils.lerp(-0.5, -0.12, lift),
  )
  banana.scale.setScalar(appear * biteScale)
  wasDropping.current = false
}

function updateDrop({
  banana,
  holdsWithLeft,
  dropTime,
  wasDropping,
  dropPosition,
  delta,
}) {
  if (!wasDropping.current) {
    dropPosition.copy(banana.position)
    wasDropping.current = true
  }

  banana.position.set(
    dropPosition.x + (holdsWithLeft ? 0.18 : -0.18) * dropTime,
    dropPosition.y - 0.28 * dropTime - 0.72 * dropTime * dropTime,
    dropPosition.z - 0.08 * dropTime,
  )
  banana.rotation.x += delta * 3.2
  banana.rotation.z += delta * (holdsWithLeft ? -4.2 : 4.2)
  banana.scale.setScalar(
    Math.max(0, 0.4 * (1 - dropTime / 1.65)),
  )
}
