export function animateJungleLife({
  time,
  butterflies,
  frogs,
  hangingPlants,
}) {
  Object.values(butterflies).forEach((butterfly) => {
    if (!butterfly) return
    animateButterfly(butterfly, time)
  })

  Object.values(frogs).forEach((frog) => {
    if (!frog) return
    animateFrog(frog, time)
  })

  Object.values(hangingPlants).forEach((plant) => {
    if (!plant) return
    plant.rotation.z =
      Math.sin(time * 0.52 + plant.userData.seed * 1.8) * 0.035
  })
}

function animateButterfly(butterfly, time) {
  const phase = time + butterfly.userData.seed * 1.73
  butterfly.position.x =
    butterfly.userData.baseX + Math.sin(phase * 0.55) * 0.42
  butterfly.position.y =
    butterfly.userData.baseY +
    Math.sin(phase * 1.18) * 0.2 +
    Math.sin(phase * 0.37) * 0.08
  butterfly.position.z =
    butterfly.userData.baseZ + Math.cos(phase * 0.7) * 0.12
  butterfly.rotation.z = Math.cos(phase * 0.55) * 0.2

  const flap = 0.22 + Math.abs(Math.sin(phase * 9.5)) * 0.78
  butterfly.children[0].scale.x = flap
  butterfly.children[1].scale.x = flap
}

function animateFrog(frog, time) {
  const seed = frog.userData.seed
  const duration = 5.1 + (seed % 3) * 0.65
  const cycle = ((time + seed * 1.47) % duration) / duration
  const direction = seed % 2 ? -1 : 1
  const longDistance = 0.34 + (seed % 3) * 0.08
  const tallHop = 0.3 + (seed % 2) * 0.1
  const position = getFrogHopPosition(
    cycle,
    direction,
    longDistance,
    tallHop,
  )

  frog.position.x = frog.userData.baseX + position.x
  frog.position.y = frog.userData.baseY + position.y
  frog.rotation.z = position.y * -0.12
}

function getFrogHopPosition(
  cycle,
  direction,
  longDistance,
  tallHop,
) {
  if (cycle < 0.18) {
    const phase = cycle / 0.18
    return {
      x: direction * smoothstep(phase) * longDistance,
      y: Math.sin(phase * Math.PI) * tallHop,
    }
  }

  if (cycle < 0.46) {
    return { x: direction * longDistance, y: 0 }
  }

  if (cycle < 0.57) {
    const phase = (cycle - 0.46) / 0.11
    const smallDistance = longDistance * 0.42
    return {
      x:
        direction *
        (longDistance - smoothstep(phase) * smallDistance),
      y: Math.sin(phase * Math.PI) * tallHop * 0.58,
    }
  }

  if (cycle < 0.76) {
    return { x: direction * longDistance * 0.58, y: 0 }
  }

  if (cycle < 0.94) {
    const phase = (cycle - 0.76) / 0.18
    return {
      x:
        direction *
        longDistance *
        0.58 *
        (1 - smoothstep(phase)),
      y: Math.sin(phase * Math.PI) * tallHop * 0.84,
    }
  }

  return { x: 0, y: 0 }
}

function smoothstep(value) {
  return value * value * (3 - 2 * value)
}
