/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { IDLE_EASTER_EGG_DELAY_MS } from '../../../shared/config/animation'
import { useIdleState } from '../../../shared/hooks/useIdleState'
import MonkeyModel from './MonkeyModel'
import { updateBananaAnimation } from '../model/bananaAnimation'
import { updateMonkeyPose } from '../model/poseAnimation'
import { updateSwingMotion } from '../model/swingMotion'
import { updateVineRig } from '../model/vineRig'

function MonkeyCharacter({
  journeyStep,
  journey,
  dragOffset,
  journeyProgress,
  onClick,
}) {
  const refs = {
    monkey: useRef(),
    leftArm: useRef(),
    rightArm: useRef(),
    leftHand: useRef(),
    rightHand: useRef(),
    leftLeg: useRef(),
    rightLeg: useRef(),
    tail: useRef(),
    banana: useRef(),
    currentVine: useRef(),
    nextVine: useRef(),
  }
  const idleTheta = useRef(0)
  const swingStartTheta = useRef(0)
  const idleStartedAt = useRef(0)
  const wasDropping = useRef(false)
  const hasPreviousPosition = useRef(false)
  const isIdle = useIdleState(IDLE_EASTER_EGG_DELAY_MS)

  const vectors = useMemo(
    () => ({
      currentAnchor: new THREE.Vector3(0, 3.2, 0.8),
      nextAnchor: new THREE.Vector3(0, 3.2, 0.8),
      targetPosition: new THREE.Vector3(),
      previousPosition: new THREE.Vector3(),
      movement: new THREE.Vector3(),
      smoothedVelocity: new THREE.Vector3(),
      vineStart: new THREE.Vector3(),
      vineEnd: new THREE.Vector3(),
      vineDirection: new THREE.Vector3(),
      vineQuaternion: new THREE.Quaternion(),
      currentLooseEnd: new THREE.Vector3(),
      lastHoldingHandPosition: new THREE.Vector3(),
      handPosition: new THREE.Vector3(),
      bananaPosition: new THREE.Vector3(),
      dropPosition: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
    }),
    [],
  )

  useEffect(() => {
    if (journey) {
      swingStartTheta.current = idleTheta.current
    }
  }, [journey])

  useEffect(() => {
    if (isIdle) {
      idleStartedAt.current = performance.now() / 1000
      wasDropping.current = false
    } else if (refs.banana.current) {
      refs.banana.current.visible = false
      refs.banana.current.scale.setScalar(1)
      wasDropping.current = false
    }
  }, [isIdle, refs.banana])

  useFrame((state, delta) => {
    if (!refs.monkey.current) return

    const elapsed = state.clock.elapsedTime
    const animationDelta = Math.min(delta, 1 / 30)
    const motion = updateSwingMotion({
      monkey: refs.monkey.current,
      journey,
      dragOffset,
      elapsed,
      delta: animationDelta,
      progress: journeyProgress,
      idleTheta,
      swingStartTheta,
      currentAnchor: vectors.currentAnchor,
      nextAnchor: vectors.nextAnchor,
      targetPosition: vectors.targetPosition,
      previousPosition: vectors.previousPosition,
      movement: vectors.movement,
      smoothedVelocity: vectors.smoothedVelocity,
      hasPreviousPosition,
    })

    const grip = updateMonkeyPose({
      refs,
      journey,
      journeyStep,
      activeVine: motion.activeVine,
      flightAmount: motion.flightAmount,
      flightProgress: motion.flightProgress,
      theta: motion.theta,
      smoothedVelocity: vectors.smoothedVelocity,
      elapsed,
      delta: animationDelta,
    })

    updateBananaAnimation({
      banana: refs.banana.current,
      monkey: refs.monkey.current,
      freeHand: grip.reachingHand,
      reachingArm: grip.reachingArm,
      holdsWithLeft: grip.holdsWithLeft,
      isIdle,
      journey,
      idleStartedAt,
      wasDropping,
      handPosition: vectors.handPosition,
      bananaPosition: vectors.bananaPosition,
      dropPosition: vectors.dropPosition,
      delta: animationDelta,
    })

    updateVineRig({
      monkey: refs.monkey.current,
      activeVine: motion.activeVine,
      currentVineOpacity: motion.currentVineOpacity,
      nextVineReady: motion.nextVineReady,
      nextVineOpacity: motion.nextVineOpacity,
      currentVine: refs.currentVine.current,
      nextVine: refs.nextVine.current,
      currentAnchor: vectors.currentAnchor,
      nextAnchor: vectors.nextAnchor,
      holdingHand: grip.holdingHand,
      reachingHand: grip.reachingHand,
      vectors,
    })
  })

  return (
    <>
      <mesh ref={refs.currentVine}>
        <cylinderGeometry args={[0.022, 0.035, 1, 8]} />
        <meshStandardMaterial
          color="#5f7b3f"
          roughness={1}
          transparent
        />
      </mesh>
      <mesh ref={refs.nextVine} visible={false}>
        <cylinderGeometry args={[0.022, 0.035, 1, 8]} />
        <meshStandardMaterial
          color="#5f7b3f"
          roughness={1}
          transparent
        />
      </mesh>

      <MonkeyModel
        monkeyRef={refs.monkey}
        leftArmRef={refs.leftArm}
        rightArmRef={refs.rightArm}
        leftHandRef={refs.leftHand}
        rightHandRef={refs.rightHand}
        bananaRef={refs.banana}
        leftLegRef={refs.leftLeg}
        rightLegRef={refs.rightLeg}
        tailRef={refs.tail}
        onClick={onClick}
      />
    </>
  )
}

export default MonkeyCharacter
