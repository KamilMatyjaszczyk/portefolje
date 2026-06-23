/* eslint-disable react/no-unknown-property */
import Fireflies from '../../../entities/jungle/ui/Fireflies'
import JungleLandscape from '../../../entities/jungle/ui/JungleLandscape'
import MonkeyCharacter from '../../../entities/monkey/ui/MonkeyCharacter'
import { useJourneyProgress } from '../model/useJourneyProgress'

function JungleScene({
  journeyStep,
  journey,
  dragOffset,
  sections,
  onTravelTo,
  onSectionOpen,
  onJourneyComplete,
}) {
  const journeyProgress = useJourneyProgress(
    journey,
    onJourneyComplete,
  )

  return (
    <>
      <ambientLight intensity={1.35} color="#b6c888" />
      <directionalLight
        position={[-4, 6, 5]}
        intensity={2.6}
        color="#ffe6a2"
        castShadow
      />
      <pointLight position={[4, 0, 3]} intensity={7} color="#d69a4b" />
      <fog attach="fog" args={['#102e24', 7, 16]} />

      <JungleLandscape
        journeyStep={journeyStep}
        journey={journey}
        dragOffset={dragOffset}
        sections={sections}
        journeyProgress={journeyProgress}
        onSectionOpen={onSectionOpen}
        onTravelTo={onTravelTo}
      />
      <Fireflies />
      <MonkeyCharacter
        journeyStep={journeyStep}
        journey={journey}
        dragOffset={dragOffset}
        journeyProgress={journeyProgress}
        onClick={() => onSectionOpen('about')}
      />
    </>
  )
}

export default JungleScene
