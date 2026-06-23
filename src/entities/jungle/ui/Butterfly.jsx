/* eslint-disable react/no-unknown-property */
function Butterfly({ butterflyRef, position, color, seed }) {
  return (
    <group
      ref={butterflyRef}
      position={position}
      scale={0.3}
      userData={{
        baseX: position[0],
        baseY: position[1],
        baseZ: position[2],
        seed,
      }}
    >
      <mesh position={[-0.13, 0, 0]} rotation={[0, 0, 0.35]}>
        <circleGeometry args={[0.22, 8]} />
        <meshBasicMaterial color={color} side={2} />
      </mesh>
      <mesh position={[0.13, 0, 0]} rotation={[0, 0, -0.35]}>
        <circleGeometry args={[0.22, 8]} />
        <meshBasicMaterial color={color} side={2} />
      </mesh>
      <mesh scale={[0.05, 0.22, 0.05]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color="#302318" />
      </mesh>
    </group>
  )
}

export default Butterfly
