/* eslint-disable react/no-unknown-property */
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { memo, useMemo, useRef } from 'react'
import * as THREE from 'three'

const palettes = [
  { trunk: '#594026', leaf: '#37633a', accent: '#b8cf73' },
  { trunk: '#4f3824', leaf: '#2c5836', accent: '#d4b45f' },
  { trunk: '#60452a', leaf: '#315f42', accent: '#8fc68b' },
  { trunk: '#503622', leaf: '#244d35', accent: '#d39b58' },
]

function SectionTree({ tree, isActive, onClick }) {
  const palette = palettes[tree.index % palettes.length]
  const leafMaterials = useRef([])
  const colors = useMemo(
    () => ({
      leaf: new THREE.Color(palette.leaf),
      accent: new THREE.Color(palette.accent),
    }),
    [palette.accent, palette.leaf],
  )

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-delta * 3.2)
    const targetColor = isActive ? colors.accent : colors.leaf
    const targetGlow = isActive ? 0.12 : 0

    leafMaterials.current.forEach((material) => {
      if (!material) return
      material.color.lerp(targetColor, blend)
      material.emissive.lerp(colors.accent, blend)
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        targetGlow,
        4,
        delta,
      )
    })
  })

  return (
    <group position={tree.position}>
      <group
        onClick={(event) => {
          event.stopPropagation()
          onClick(tree)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <mesh position={[0, 1.75, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.58, 3.75, 8]} />
          <meshStandardMaterial
            color={palette.trunk}
            roughness={1}
            flatShading
          />
        </mesh>

        <mesh position={[-0.78, 3.12, 0]} rotation={[0, 0, 0.88]}>
          <cylinderGeometry args={[0.1, 0.22, 1.75, 7]} />
          <meshStandardMaterial color={palette.trunk} roughness={1} />
        </mesh>
        <mesh position={[0.82, 3.25, 0]} rotation={[0, 0, -0.92]}>
          <cylinderGeometry args={[0.1, 0.22, 1.85, 7]} />
          <meshStandardMaterial color={palette.trunk} roughness={1} />
        </mesh>
        <mesh position={[0, 3.45, 0.02]} rotation={[0, 0, -0.03]}>
          <cylinderGeometry args={[0.1, 0.2, 1.1, 7]} />
          <meshStandardMaterial color={palette.trunk} roughness={1} />
        </mesh>

        {[
          [-1.05, 3.65, -0.05, 0.9],
          [-0.4, 3.9, 0.05, 1.02],
          [0.4, 3.9, -0.08, 1],
          [1.08, 3.72, 0.02, 0.88],
          [0, 3.52, 0.3, 0.94],
        ].map(([x, y, z, scale], index) => (
          <mesh
            key={index}
            position={[x, y, z]}
            scale={[scale * 1.15, scale * 0.76, scale * 0.82]}
          >
            <dodecahedronGeometry args={[0.72, 1]} />
            <meshStandardMaterial
              ref={(material) => {
                leafMaterials.current[index] = material
              }}
              color={palette.leaf}
              emissive={palette.accent}
              emissiveIntensity={0}
              roughness={1}
              flatShading
            />
          </mesh>
        ))}

        <mesh position={[0, 1.8, 0.25]} visible={false}>
          <boxGeometry args={[3.1, 4.6, 1.3]} />
          <meshBasicMaterial />
        </mesh>
      </group>

      <Html center position={[0, 3.62, 0.55]} distanceFactor={8}>
        <button
          className={`tree-label ${isActive ? 'is-active' : ''}`}
          type="button"
          style={{
            '--tree-label-accent': palette.accent,
            '--tree-label-leaf': palette.leaf,
            '--tree-label-trunk': palette.trunk,
          }}
          onClick={() => onClick(tree)}
        >
          <span>{tree.number}</span>
          {tree.label}
        </button>
      </Html>
    </group>
  )
}

export default memo(SectionTree)
