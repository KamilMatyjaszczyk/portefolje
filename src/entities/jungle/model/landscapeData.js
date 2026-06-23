export const STATION_SPACING = 4.4

export function createCycles(journeyStep, sectionCount) {
  const centerCycle = Math.floor(journeyStep / sectionCount)
  const cycles = Array.from(
    { length: 5 },
    (_, index) => centerCycle + index - 2,
  )

  return { centerCycle, cycles }
}

export function createTrees(cycles, cycleWidth) {
  return cycles.flatMap((cycle) =>
    Array.from({ length: 13 }, (_, index) => {
      const seed = cycle * 13 + index
      const variant = ((seed % 4) + 4) % 4

      return {
        key: `${cycle}-${index}`,
        position: [
          cycle * cycleWidth - 2.8 + index * 1.5,
          -1.45,
          -2.8 - variant * 0.68,
        ],
        rotation: ((((seed % 5) + 5) % 5) - 2) * 0.16,
        scale: 0.68 + variant * 0.12,
        tint: ['#254f30', '#315e35', '#1e452d'][
          ((seed % 3) + 3) % 3
        ],
      }
    }),
  )
}

export function createSectionTrees(cycles, sections) {
  return cycles.flatMap((cycle) =>
    sections.map((section, index) => {
      const worldIndex = cycle * sections.length + index

      return {
        ...section,
        index,
        worldIndex,
        number: `0${index + 1}`,
        position: [
          worldIndex * STATION_SPACING,
          -3.05,
          0.2,
        ],
      }
    }),
  )
}
