/* eslint-disable react/no-unknown-property */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Fireflies() {
  const group = useRef()
  const lights = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        x: -5.5 + ((index * 2.17) % 11),
        y: -2.1 + ((index * 1.31) % 5.2),
        z: -0.5 - (index % 5) * 0.8,
        size: 0.018 + (index % 3) * 0.009,
      })),
    [],
  )

  useFrame((state) => {
    if (!group.current) return

    group.current.children.forEach((light, index) => {
      light.position.y +=
        Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.0008
      light.material.opacity =
        0.25 +
        (Math.sin(state.clock.elapsedTime * 2 + index) + 1) * 0.3
    })
  })

  return (
    <group ref={group}>
      {lights.map((light, index) => (
        <mesh key={index} position={[light.x, light.y, light.z]}>
          <sphereGeometry args={[light.size, 8, 8]} />
          <meshBasicMaterial color="#f3d476" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default Fireflies
