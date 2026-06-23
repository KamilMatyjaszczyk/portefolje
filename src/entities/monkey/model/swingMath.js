export function easeJourney(progress) {
  return 0.5 - Math.cos(progress * Math.PI) * 0.5
}

export function anchorVelocityX(
  progress,
  direction,
  dragStart,
  stationSpacing,
) {
  const easeVelocity =
    0.5 * Math.PI * Math.sin(progress * Math.PI)

  return (
    -(direction * stationSpacing + dragStart * 1.55) *
    easeVelocity
  )
}

export function smoothstep01(value) {
  return value * value * (3 - 2 * value)
}

export function cubicHermite(
  start,
  end,
  startVelocity,
  endVelocity,
  time,
) {
  const timeSquared = time * time
  const timeCubed = timeSquared * time

  return (
    (2 * timeCubed - 3 * timeSquared + 1) * start +
    (timeCubed - 2 * timeSquared + time) * startVelocity +
    (-2 * timeCubed + 3 * timeSquared) * end +
    (timeCubed - timeSquared) * endVelocity
  )
}

export function setPendulumTarget({
  target,
  anchor,
  theta,
  ropeLength,
  bodyOffset,
}) {
  target.set(
    anchor.x + Math.sin(theta) * ropeLength,
    anchor.y - Math.cos(theta) * ropeLength - bodyOffset,
    1,
  )
}
