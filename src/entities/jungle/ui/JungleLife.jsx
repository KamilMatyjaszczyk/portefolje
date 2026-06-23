import { memo, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { animateJungleLife } from '../model/animateJungleLife'
import {
  createHangingPlants,
  createJungleLifeAreas,
} from '../model/jungleLifeData'
import Butterfly from './Butterfly'
import Frog from './Frog'
import HangingPlant from './HangingPlant'

function JungleLife({ cycles, cycleWidth, trees }) {
  const butterflies = useRef({})
  const frogs = useRef({})
  const hangingPlants = useRef({})
  const areas = useMemo(
    () => createJungleLifeAreas(cycles, cycleWidth),
    [cycles, cycleWidth],
  )
  const plants = useMemo(() => createHangingPlants(trees), [trees])

  useFrame((state) => {
    animateJungleLife({
      time: state.clock.elapsedTime,
      butterflies: butterflies.current,
      frogs: frogs.current,
      hangingPlants: hangingPlants.current,
    })
  })

  return (
    <group>
      {areas.map((area) => (
        <group key={area.key}>
          {area.butterflies.map((butterfly) => (
            <Butterfly
              key={butterfly.id}
              butterflyRef={(node) => {
                setWorldRef(butterflies, butterfly.id, node)
              }}
              {...butterfly}
            />
          ))}
          <Frog
            frogRef={(node) => {
              setWorldRef(frogs, area.frog.id, node)
            }}
            position={area.frog.position}
            seed={area.frog.seed}
          />
        </group>
      ))}
      {plants.map((plant) => (
        <HangingPlant
          key={plant.id}
          plantRef={(node) => {
            setWorldRef(hangingPlants, plant.id, node)
          }}
          position={plant.position}
          treeScale={plant.scale}
          length={plant.length}
          side={plant.side}
          seed={plant.seed}
        />
      ))}
    </group>
  )
}

function setWorldRef(ref, id, node) {
  if (node) {
    ref.current[id] = node
  } else {
    delete ref.current[id]
  }
}

export default memo(JungleLife)
