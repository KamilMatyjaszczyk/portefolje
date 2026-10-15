/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import BackgroundTree from '../../../entities/jungle/ui/BackgroundTree'
import Fireflies from '../../../entities/jungle/ui/Fireflies'
import MonkeyModel from '../../../entities/monkey/ui/MonkeyModel'

function WoodenSign({ reducedMotion }) {
  const board = useRef()
  // Keep the lettering local, without a font download or external texture.
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 768
    canvas.height = 480
    const context = canvas.getContext('2d')
    context.fillStyle = '#795334'
    context.fillRect(0, 0, 768, 480)

    for (let index = 0; index < 65; index += 1) {
      const y = index * 8
      context.strokeStyle = index % 3 ? '#68462d' : '#936b42'
      context.lineWidth = index % 3 ? 2 : 3
      context.beginPath()
      context.moveTo(0, y)
      context.bezierCurveTo(190, y - 15, 530, y + 18, 768, y - 4)
      context.stroke()
    }

    context.strokeStyle = '#b38d58'
    context.lineWidth = 3
    context.strokeRect(25, 25, 718, 430)
    context.fillStyle = '#f3deb0'
    context.font = 'bold 258px monospace'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('404', 384, 257)
    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [])

  useFrame(({ clock }) => {
    if (board.current && !reducedMotion) {
      board.current.rotation.z = -0.13 + Math.sin(clock.elapsedTime * 0.8) * 0.018
    }
  })

  return (
    <group position={[-0.8, -2.05, 0]}>
      <mesh position={[0, 0.85, -0.05]} rotation={[0, 0, -0.04]}>
        <boxGeometry args={[0.15, 1.9, 0.16]} />
        <meshStandardMaterial color="#62432d" roughness={1} />
      </mesh>
      <group ref={board} position={[0, 1.62, 0]} rotation={[0, -0.06, -0.13]}>
        <mesh>
          <boxGeometry args={[1.95, 1.22, 0.13]} />
          <meshStandardMaterial color="#67472f" roughness={1} />
        </mesh>
        <mesh position={[0, 0, 0.071]}>
          <planeGeometry args={[1.95, 1.22]} />
          <meshStandardMaterial map={texture} roughness={1} />
        </mesh>
        {[-0.83, 0.83].flatMap((x) => [-0.46, 0.46].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.08]}>
            <sphereGeometry args={[0.025, 8, 6]} />
            <meshStandardMaterial color="#342e23" roughness={0.7} />
          </mesh>
        )))}
      </group>
      <Fern position={[-0.2, 0, 0.2]} scale={0.5} />
    </group>
  )
}

function LostMonkey({ reducedMotion }) {
  const monkey = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const leftLeg = useRef()
  const rightLeg = useRef()
  const tail = useRef()

  useLayoutEffect(() => {
    monkey.current.position.set(0, 0, 0)
    monkey.current.scale.setScalar(1.1)
    leftArm.current.rotation.set(-0.3, 0, -0.25)
    rightArm.current.rotation.set(0, -0.3, 2.9)
    leftLeg.current.rotation.set(-1.25, 0, -0.3)
    rightLeg.current.rotation.set(-1.25, 0, 0.3)
    tail.current.rotation.set(0.7, -0.8, -0.5)
  }, [])

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const elapsed = clock.elapsedTime
    // A small pause between scratches keeps the gesture relaxed.
    const scratch = Math.max(0, Math.sin(elapsed * 0.7))
    rightArm.current.rotation.z = 2.9 + Math.sin(elapsed * 8) * 0.09 * scratch
    monkey.current.rotation.z = -0.06 + Math.sin(elapsed * 0.8) * 0.025
    tail.current.rotation.y = -0.8 + Math.sin(elapsed * 0.65) * 0.1
  })

  return (
    <group position={[0.95, -1.9, 0.45]} rotation={[0, -0.15, 0]}>
      <MonkeyModel
        monkeyRef={monkey}
        leftArmRef={leftArm}
        rightArmRef={rightArm}
        leftLegRef={leftLeg}
        rightLegRef={rightLeg}
        tailRef={tail}
        interactive={false}
      />
    </group>
  )
}

function Fern({ position, scale = 1, rotation = 0 }) {
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      {Array.from({ length: 7 }, (_, index) => (
        <group key={index} rotation={[0, index * 2.4, 0]}>
          <mesh position={[0.25, 0.34, 0]} rotation={[0, 0, -0.68]} scale={[0.17, 0.65, 0.065]}>
            <sphereGeometry args={[0.7, 8, 6]} />
            <meshStandardMaterial color={index % 2 ? '#3e6131' : '#537740'} roughness={1} />
          </mesh>
          {[0, 1, 2].map((leaf) => (
            <mesh key={leaf} position={[0.15 + leaf * 0.12, 0.18 + leaf * 0.17, 0.04]} rotation={[0.3, 0, -1.1]} scale={[0.12, 0.25, 0.04]}>
              <sphereGeometry args={[0.8, 6, 5]} />
              <meshStandardMaterial color="#52713a" roughness={1} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function LostTrailScene({ reducedMotion }) {
  const { camera } = useThree()

  useLayoutEffect(() => {
    camera.lookAt(0, -0.75, 0)
    camera.updateProjectionMatrix()
  }, [camera])

  const path = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.65, -5)
    shape.bezierCurveTo(-1.8, -1, 0.4, 0.5, -0.2, 2)
    shape.bezierCurveTo(-0.7, 3.2, -0.7, 4, -0.6, 5)
    shape.lineTo(-0.15, 5)
    shape.bezierCurveTo(-0.3, 3.4, 0.25, 3, 0.6, 2)
    shape.bezierCurveTo(1.1, 0, -0.3, -1.2, 1.4, -5)
    shape.closePath()
    return shape
  }, [])

  return (
    <>
      <ambientLight intensity={1.6} color="#b6c888" />
      <directionalLight position={[-3, 6, 5]} intensity={2.8} color="#ffe6a2" />
      <pointLight position={[2, 0, 4]} intensity={8} color="#e5b569" />
      <fog attach="fog" args={['#16382a', 7, 17]} />

      <mesh position={[0, -2.1, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 32]} />
        <meshStandardMaterial color="#1b3525" roughness={1} />
      </mesh>
      <mesh position={[0, -2.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[path, 24]} />
        <meshStandardMaterial color="#6c6740" roughness={1} />
      </mesh>

      {[-1, 1].flatMap((side) => Array.from({ length: 5 }, (_, index) => (
        <BackgroundTree
          key={`${side}-${index}`}
          position={[side * (3.4 + (index % 2) * 1.4), 0, -2 - index * 2]}
          scale={1.1 + (index % 3) * 0.2}
          rotation={index * 0.8}
          tint={index % 2 ? '#244c30' : '#315737'}
        />
      )))}

      {Array.from({ length: 18 }, (_, index) => {
        const side = index % 2 ? -1 : 1
        const depth = Math.floor(index / 2)
        return (
          <Fern
            key={index}
            position={[side * (1.7 + (depth % 3) * 0.48), -2.05, 2 - depth * 0.9]}
            scale={0.7 + (depth % 3) * 0.22}
            rotation={index * 0.9}
          />
        )
      })}
      <Fern position={[-0.4, -2.05, -2]} scale={0.85} />
      <Fern position={[0.4, -2.05, -2.6]} scale={0.75} />

      <WoodenSign reducedMotion={reducedMotion} />
      <LostMonkey reducedMotion={reducedMotion} />
      {!reducedMotion && <Fireflies />}
    </>
  )
}

export default LostTrailScene
