/* eslint-disable react/no-unknown-property */
import { memo } from 'react'

function BackgroundTree({
  position,
  scale = 1,
  rotation = 0,
  tint = '#234d2f',
}) {
  const leaves = [
    [-0.75, 2.3, 0],
    [0.1, 2.65, -0.15],
    [0.9, 2.22, 0.05],
    [-0.2, 1.95, 0.3],
  ]

  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.62, 5.5, 7]} />
        <meshStandardMaterial color="#493522" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.65, 1.35, 0]} rotation={[0, 0, -0.9]}>
        <cylinderGeometry args={[0.18, 0.3, 2.2, 6]} />
        <meshStandardMaterial color="#493522" roughness={1} flatShading />
      </mesh>
      {leaves.map((position, index) => (
        <mesh key={index} position={position} scale={[1.4, 0.9, 0.8]}>
          <dodecahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial color={tint} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export default memo(BackgroundTree)
