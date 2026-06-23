/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react'
import * as THREE from 'three'

function Banana({ bananaRef }) {
  const segments = useMemo(() => {
    const points = [
      [-0.3, -0.02, 0, 0.055],
      [-0.22, -0.08, 0, 0.09],
      [-0.1, -0.12, 0, 0.115],
      [0.04, -0.12, 0, 0.12],
      [0.17, -0.08, 0, 0.105],
      [0.27, 0.01, 0, 0.075],
    ]

    return points.slice(0, -1).map((point, index) => {
      const next = points[index + 1]
      const start = new THREE.Vector3(point[0], point[1], point[2])
      const end = new THREE.Vector3(next[0], next[1], next[2])
      const direction = end.clone().sub(start)
      const midpoint = start.clone().add(end).multiplyScalar(0.5)
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize(),
      )

      return {
        position: midpoint.toArray(),
        quaternion,
        length: direction.length(),
        startRadius: point[3],
        endRadius: next[3],
      }
    })
  }, [])

  return (
    <group ref={bananaRef} visible={false} scale={1.2}>
      {segments.map((segment, index) => (
        <mesh
          key={index}
          position={segment.position}
          quaternion={segment.quaternion}
        >
          <cylinderGeometry
            args={[
              segment.endRadius,
              segment.startRadius,
              segment.length * 1.08,
              10,
            ]}
          />
          <meshStandardMaterial
            color={index === 0 ? '#eabf37' : '#f3cf4f'}
            roughness={0.68}
          />
        </mesh>
      ))}
      <mesh position={[-0.335, 0.005, 0]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.035, 0.05, 0.13, 8]} />
        <meshStandardMaterial color="#765021" roughness={0.9} />
      </mesh>
      <mesh position={[0.305, 0.05, 0]}>
        <sphereGeometry args={[0.055, 10, 8]} />
        <meshStandardMaterial color="#8a6228" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default Banana
