export function createJungleLifeAreas(cycles, cycleWidth) {
  return cycles.map((cycle) => {
    const x = cycle * cycleWidth
    const cycleSeed = Math.abs(cycle)

    return {
      key: cycle,
      butterflies: [
        {
          id: `${cycle}-butterfly-a`,
          seed: Math.abs(cycle * 2),
          position: [x - 4.8, -0.75, 0.25],
          color: '#dfb959',
        },
        {
          id: `${cycle}-butterfly-b`,
          seed: Math.abs(cycle * 2 + 1),
          position: [x + 2.15, -1.3, 0.5],
          color: '#79bfa0',
        },
      ],
      frog: {
        id: `${cycle}-frog`,
        seed: cycleSeed,
        position: [x - 2.65, -2.88, 0.35],
      },
    }
  })
}

export function createHangingPlants(trees) {
  return trees
    .filter((tree) => {
      const treeIndex = getTreeIndex(tree)
      return treeIndex % 4 === 1
    })
    .map((tree) => {
      const treeIndex = getTreeIndex(tree)
      const side = treeIndex % 2 ? -1 : 1

      return {
        id: `${tree.key}-plant`,
        position: [
          tree.position[0] +
            (side < 0 ? -0.58 : 0.62) * tree.scale,
          tree.position[1] +
            (1.68 + (treeIndex % 3) * 0.16) * tree.scale,
          tree.position[2] + 0.48,
        ],
        scale: tree.scale,
        length: 1.35 + (treeIndex % 4) * 0.18,
        side,
        seed: treeIndex,
      }
    })
}

function getTreeIndex(tree) {
  return Number(tree.key.split('-').at(-1))
}
