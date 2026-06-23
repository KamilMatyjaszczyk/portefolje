/* eslint-disable react/no-unknown-property */
function HangingPlant({
  plantRef,
  position,
  treeScale,
  length,
  side,
  seed,
}) {
  const leafOffsets = [0.22, 0.52, 0.82, 1.12, 1.42].filter(
    (offset) => offset < length - 0.08,
  )

  return (
    <group
      ref={plantRef}
      position={position}
      scale={0.88 + treeScale * 0.12}
      userData={{ seed }}
    >
      <mesh
        position={[-side * 0.32, 0.02, -0.03]}
        rotation={[0, 0, side * -Math.PI / 2.6]}
      >
        <cylinderGeometry args={[0.045, 0.075, 0.82, 7]} />
        <meshStandardMaterial color="#493522" roughness={1} />
      </mesh>
      <mesh position={[0, -length / 2, 0]}>
        <cylinderGeometry args={[0.022, 0.038, length, 7]} />
        <meshStandardMaterial color="#42643c" roughness={1} />
      </mesh>
      {leafOffsets.map((offset, index) => (
        <mesh
          key={offset}
          position={[
            index % 2 ? 0.11 : -0.11,
            -offset,
            0.03,
          ]}
          rotation={[0, 0, index % 2 ? -0.6 : 0.6]}
          scale={[0.2, 0.095, 0.07]}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#63844d" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

export default HangingPlant
