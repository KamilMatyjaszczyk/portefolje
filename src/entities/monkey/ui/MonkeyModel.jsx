/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react'
import * as THREE from 'three'
import Banana from './Banana'

function Limb({ position, rotation = 0, length = 0.65 }) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <capsuleGeometry args={[0.09, length, 6, 12]} />
      <meshStandardMaterial color="#70452d" roughness={0.88} />
    </mesh>
  )
}

function MonkeyModel({
  monkeyRef,
  leftArmRef,
  rightArmRef,
  leftHandRef,
  rightHandRef,
  bananaRef,
  leftLegRef,
  rightLegRef,
  tailRef,
  onClick,
}) {
  const tailCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.12, 0.08, -0.3),
        new THREE.Vector3(-0.48, -0.08, -0.42),
        new THREE.Vector3(-0.7, -0.48, -0.48),
        new THREE.Vector3(-0.55, -0.82, -0.42),
        new THREE.Vector3(-0.22, -0.88, -0.34),
        new THREE.Vector3(-0.05, -0.66, -0.3),
      ]),
    [],
  )

  return (
    <group
      ref={monkeyRef}
      position={[0, -0.5, 1]}
      scale={0.66}
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <mesh position={[0, 0.32, 0]} scale={[0.7, 0.9, 0.58]} castShadow>
        <sphereGeometry args={[0.55, 24, 18]} />
        <meshStandardMaterial color="#67402b" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.02, 0.03]} scale={[0.76, 0.78, 0.68]} castShadow>
        <sphereGeometry args={[0.48, 24, 18]} />
        <meshStandardMaterial color="#744a31" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.9, 0.42]} scale={[0.72, 0.52, 0.35]}>
        <sphereGeometry args={[0.42, 20, 14]} />
        <meshStandardMaterial color="#c89560" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.24, 0.45]} scale={[0.56, 0.68, 0.22]}>
        <sphereGeometry args={[0.43, 20, 14]} />
        <meshStandardMaterial color="#b77e4d" roughness={0.95} />
      </mesh>

      {[-0.43, 0.43].map((x) => (
        <mesh key={x} position={[x, 1.08, 0]} scale={[0.32, 0.38, 0.2]}>
          <sphereGeometry args={[0.35, 18, 12]} />
          <meshStandardMaterial color="#815337" roughness={0.9} />
        </mesh>
      ))}
      {[-0.17, 0.17].map((x) => (
        <mesh key={x} position={[x, 1.09, 0.43]}>
          <sphereGeometry args={[0.055, 12, 10]} />
          <meshBasicMaterial color="#17130e" />
        </mesh>
      ))}
      <mesh position={[-0.185, 1.11, 0.475]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#fff5d7" />
      </mesh>
      <mesh position={[0.155, 1.11, 0.475]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#fff5d7" />
      </mesh>

      <group
        ref={leftArmRef}
        position={[-0.40, 0.48, 0.12]}
        rotation={[0.08, 0, -2.28]}
      >
        <Limb position={[0, -0.32, 0.2]} />
        <mesh ref={leftHandRef} position={[0, -0.74, 0.42]}>
          <sphereGeometry args={[0.12, 12, 10]} />
          <meshStandardMaterial color="#8a5a38" roughness={0.9} />
        </mesh>
      </group>
      <group
        ref={rightArmRef}
        position={[0.40, 0.48, 0.12]}
        rotation={[0.08, 0, 2.28]}
      >
        <Limb position={[0, -0.32, 0.2]} />
        <mesh ref={rightHandRef} position={[0, -0.74, 0.42]}>
          <sphereGeometry args={[0.12, 12, 10]} />
          <meshStandardMaterial color="#8a5a38" roughness={0.9} />
        </mesh>
      </group>
      <group
        ref={leftLegRef}
        position={[-0.18, -0.12, -0.02]}
        rotation={[0, 0, 0.12]}
      >
        <Limb position={[-0.04, -0.3, 0]} rotation={0.03} length={0.55} />
      </group>
      <group
        ref={rightLegRef}
        position={[0.18, -0.12, -0.02]}
        rotation={[0, 0, -0.12]}
      >
        <Limb position={[0.04, -0.3, 0]} rotation={-0.03} length={0.55} />
      </group>
      <group ref={tailRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <tubeGeometry args={[tailCurve, 28, 0.06, 9, false]} />
          <meshStandardMaterial color="#67402b" roughness={0.9} />
        </mesh>
      </group>
      <Banana bananaRef={bananaRef} />
    </group>
  )
}

export default MonkeyModel
