export function updateVineRig({
  monkey,
  activeVine,
  currentVineOpacity,
  nextVineReady,
  nextVineOpacity,
  currentVine,
  nextVine,
  currentAnchor,
  nextAnchor,
  holdingHand,
  reachingHand,
  vectors,
}) {
  const {
    vineStart,
    vineEnd,
    vineDirection,
    vineQuaternion,
    currentLooseEnd,
    lastHoldingHandPosition,
    handPosition,
    up,
  } = vectors

  monkey.updateMatrixWorld(true)

  if (activeVine === 'current' && holdingHand) {
    holdingHand.getWorldPosition(lastHoldingHandPosition)
    currentLooseEnd.copy(lastHoldingHandPosition)
  }

  placeVine({
    vine: currentVine,
    anchor: currentAnchor,
    visible: activeVine === 'current' || activeVine === 'flight',
    attachedHand: activeVine === 'current' ? holdingHand : null,
    looseEnd: activeVine === 'flight' ? currentLooseEnd : null,
    vineStart,
    vineEnd,
    vineDirection,
    vineQuaternion,
    handPosition,
    up,
    opacity: currentVineOpacity,
  })
  placeVine({
    vine: nextVine,
    anchor: nextAnchor,
    visible: activeVine === 'next' || nextVineReady,
    attachedHand:
      activeVine === 'next' || nextVineReady ? reachingHand : null,
    vineStart,
    vineEnd,
    vineDirection,
    vineQuaternion,
    handPosition,
    up,
    opacity: activeVine === 'next' ? 1 : nextVineOpacity,
  })
}

function placeVine({
  vine,
  anchor,
  visible,
  attachedHand = null,
  looseEnd = null,
  vineStart,
  vineEnd,
  vineDirection,
  vineQuaternion,
  handPosition,
  up,
  opacity = 1,
}) {
  if (!vine) return

  vine.visible = visible
  if (!visible) return
  vine.material.opacity = opacity

  vineStart.copy(anchor)
  if (attachedHand) {
    attachedHand.getWorldPosition(handPosition)
    vineEnd.copy(handPosition)
  } else if (looseEnd) {
    vineEnd.copy(looseEnd)
  } else {
    vineEnd.copy(anchor)
  }

  vineDirection.subVectors(vineEnd, vineStart)
  const length = vineDirection.length()
  vine.position.copy(vineStart).add(vineEnd).multiplyScalar(0.5)
  vine.scale.set(1, length, 1)
  vineQuaternion.setFromUnitVectors(up, vineDirection.normalize())
  vine.quaternion.copy(vineQuaternion)
}
