/* eslint-disable react/no-unknown-property */
function Frog({ frogRef, position, seed }) {
  return (
    <group
      ref={frogRef}
      position={position}
      scale={0.32}
      userData={{
        baseX: position[0],
        baseY: position[1],
        seed,
      }}
    >
      <mesh scale={[0.76, 0.48, 0.62]}>
        <sphereGeometry args={[0.42, 12, 8]} />
        <meshStandardMaterial color="#76934a" roughness={1} />
      </mesh>
      {[-0.2, 0.2].map((x) => (
        <group key={x} position={[x, 0.25, 0.24]}>
          <mesh>
            <sphereGeometry args={[0.1, 9, 7]} />
            <meshStandardMaterial color="#9aad63" roughness={1} />
          </mesh>
          <mesh position={[0, 0.01, 0.085]}>
            <sphereGeometry args={[0.035, 7, 6]} />
            <meshBasicMaterial color="#15160e" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Frog
