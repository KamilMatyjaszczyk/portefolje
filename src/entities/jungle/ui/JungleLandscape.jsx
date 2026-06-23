/* eslint-disable react/no-unknown-property */
import { memo, useCallback, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import JungleLife from './JungleLife'
import SectionTree from './SectionTree'
import BackgroundTree from './BackgroundTree'
import {
  STATION_SPACING,
  createCycles,
  createSectionTrees,
  createTrees,
} from '../model/landscapeData'

function JungleLandscape({
  journeyStep,
  journey,
  dragOffset,
  sections,
  journeyProgress,
  onSectionOpen,
  onTravelTo,
}) {
  const landscape = useRef()
  const onTravelToRef = useRef(onTravelTo)
  onTravelToRef.current = onTravelTo

  useFrame((_, delta) => {
    if (!landscape.current) return

    const progress = journey ? journeyProgress.current : 1
    const eased = 0.5 - Math.cos(progress * Math.PI) * 0.5
    const worldPosition = journey
      ? THREE.MathUtils.lerp(journey.from, journey.to, eased)
      : journeyStep
    const dragPreview = journey
      ? journey.dragStart * 1.55 * (1 - eased)
      : dragOffset * 1.55
    const targetX =
      -worldPosition * STATION_SPACING + dragPreview

    landscape.current.position.x = journey
      ? targetX
      : THREE.MathUtils.damp(
          landscape.current.position.x,
          targetX,
          12,
          Math.min(delta, 1 / 30),
        )
  })

  const cycleWidth = sections.length * STATION_SPACING
  const { cycles, trees, sectionTrees, shrubs } = useMemo(
    () => {
      const nextCycles = createCycles(
        journeyStep,
        sections.length,
      ).cycles

      return {
        cycles: nextCycles,
        trees: createTrees(nextCycles, cycleWidth),
        sectionTrees: createSectionTrees(nextCycles, sections),
        shrubs: nextCycles.flatMap((cycle) =>
          Array.from({ length: 13 }, (_, index) => ({
            key: `${cycle}-${index}`,
            position: [
              cycle * cycleWidth - 1.2 + index * 1.48,
              -2.72,
              -0.9 - (index % 3) * 0.35,
            ],
            scale: [0.7 + (index % 2) * 0.18, 0.42, 0.55],
            color: index % 2 ? '#1e442b' : '#285134',
          })),
        ),
      }
    },
    [cycleWidth, journeyStep, sections],
  )

  const handleTreeClick = useCallback(
    (tree) => {
      if (tree.worldIndex === journeyStep) {
        onSectionOpen(tree.id)
        return
      }

      const direction = tree.worldIndex > journeyStep ? 1 : -1
      const stepCount = Math.abs(tree.worldIndex - journeyStep)
      onTravelToRef.current(
        tree.index,
        direction,
        0,
        tree.id,
        stepCount,
      )
    },
    [
      journeyStep,
      onSectionOpen,
    ],
  )

  return (
    <group ref={landscape}>
      <LandscapeContent
        trees={trees}
        sectionTrees={sectionTrees}
        cycles={cycles}
        shrubs={shrubs}
        cycleWidth={cycleWidth}
        journeyStep={journeyStep}
        onTreeClick={handleTreeClick}
      />
    </group>
  )
}

const LandscapeContent = memo(function LandscapeContent({
  trees,
  sectionTrees,
  cycles,
  shrubs,
  cycleWidth,
  journeyStep,
  onTreeClick,
}) {
  return (
    <>
      {trees.map(({ key, ...treeProps }) => (
        <BackgroundTree key={key} {...treeProps} />
      ))}
      {sectionTrees.map((tree) => (
        <SectionTree
          key={`${tree.id}-${tree.worldIndex}`}
          tree={tree}
          isActive={tree.worldIndex === journeyStep}
          onClick={onTreeClick}
        />
      ))}

      {cycles.map((cycle) => (
        <mesh
          key={`ground-${cycle}`}
          position={[cycle * cycleWidth, -3.48, -1.6]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[cycleWidth + 0.3, 8]} />
          <meshStandardMaterial color="#142d20" roughness={1} />
        </mesh>
      ))}

      {shrubs.map((shrub) => (
        <mesh
          key={`shrub-${shrub.key}`}
          position={shrub.position}
          scale={shrub.scale}
        >
          <dodecahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial
            color={shrub.color}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
      <JungleLife
        cycles={cycles}
        cycleWidth={cycleWidth}
        trees={trees}
      />
    </>
  )
})

export default JungleLandscape
