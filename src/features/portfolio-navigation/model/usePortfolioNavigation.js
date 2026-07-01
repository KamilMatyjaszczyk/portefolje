import { useCallback, useEffect, useRef, useState } from 'react'
import {
  addRouteChangeListener,
  getSectionFromPath,
  getSectionPath,
  navigateToPath,
} from '../../../shared/routing/routes'

function getSectionIndex(sections, sectionId) {
  return sections.findIndex((section) => section.id === sectionId)
}

function readActiveSection() {
  return getSectionFromPath(window.location.pathname)
}

export function usePortfolioNavigation(sections) {
  const sectionCount = sections.length
  const [activeSection, setActiveSection] = useState(readActiveSection)
  const initialStop = Math.max(
    0,
    getSectionIndex(sections, readActiveSection()),
  )
  const [currentStop, setCurrentStop] = useState(initialStop)
  const [journeyStep, setJourneyStep] = useState(initialStop)
  const [journey, setJourney] = useState(null)
  const [dragOffset, setDragOffset] = useState(0)

  const wheelLockedRef = useRef(false)
  const wheelAmountRef = useRef(0)
  const wheelResetRef = useRef(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    pointerId: null,
    offset: 0,
  })

  const syncRoute = useCallback(() => {
    const routeSection = readActiveSection()

    setActiveSection(routeSection)

    if (!routeSection) return

    const routeStop = getSectionIndex(sections, routeSection)
    if (routeStop < 0) return

    setCurrentStop(routeStop)
    setJourneyStep(routeStop)
    setJourney(null)
    setDragOffset(0)
  }, [sections])

  const openSection = useCallback(
    (section) => {
      const nextStop = getSectionIndex(sections, section)

      navigateToPath(getSectionPath(section), { section })
      setActiveSection(section)

      if (nextStop >= 0) {
        setCurrentStop(nextStop)
        setJourneyStep(nextStop)
      }
    },
    [sections],
  )

  const closeSection = useCallback(() => {
    if (window.location.pathname !== '/') {
      navigateToPath('/', { section: null })
    }

    setActiveSection(null)
  }, [])

  const travelTo = useCallback(
    (
      nextStop,
      direction,
      dragStart = 0,
      openOnArrival = null,
      stepCount = 1,
    ) => {
      if (journey || nextStop === currentStop) {
        setDragOffset(0)
        return
      }

      const remainingSteps = Math.max(1, Math.round(stepCount))
      const nextStep = journeyStep + direction
      const immediateStop =
        (currentStop + direction + sectionCount) % sectionCount

      setActiveSection(null)
      setDragOffset(0)
      setJourney({
        direction,
        token: Date.now(),
        from: journeyStep,
        to: nextStep,
        nextStop: immediateStop,
        remainingSteps,
        dragStart,
        openOnArrival,
      })
    },
    [currentStop, journey, journeyStep, sectionCount],
  )

  const completeJourney = useCallback((token) => {
    setJourney((activeJourney) => {
      if (!activeJourney || activeJourney.token !== token) {
        return activeJourney
      }

      setCurrentStop(activeJourney.nextStop)
      setJourneyStep(activeJourney.to)

      if (activeJourney.remainingSteps > 1) {
        const nextStop =
          (activeJourney.nextStop +
            activeJourney.direction +
            sectionCount) %
          sectionCount

        return {
          ...activeJourney,
          token: Date.now(),
          from: activeJourney.to,
          to: activeJourney.to + activeJourney.direction,
          nextStop,
          remainingSteps: activeJourney.remainingSteps - 1,
          dragStart: 0,
        }
      }

      if (activeJourney.openOnArrival) {
        navigateToPath(getSectionPath(activeJourney.openOnArrival), {
          section: activeJourney.openOnArrival,
        })
        setActiveSection(activeJourney.openOnArrival)
      }

      return null
    })
  }, [sectionCount])

  const travel = useCallback(
    (direction, dragStart = 0) => {
      const nextStop =
        (currentStop + direction + sectionCount) % sectionCount
      travelTo(nextStop, direction, dragStart)
    },
    [currentStop, sectionCount, travelTo],
  )

  useEffect(
    () => () => {
      window.clearTimeout(wheelResetRef.current)
    },
    [],
  )

  useEffect(() => addRouteChangeListener(syncRoute), [syncRoute])

  useEffect(() => {
    syncRoute()
  }, [syncRoute])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSection()
      } else if (!activeSection && event.key === 'ArrowLeft') {
        travel(-1)
      } else if (!activeSection && event.key === 'ArrowRight') {
        travel(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, closeSection, travel])

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!dragRef.current.active || journey) return

      const distance = event.clientX - dragRef.current.startX
      const nextOffset = Math.max(-1, Math.min(1, distance / 260))
      dragRef.current.offset = nextOffset
      setDragOffset(nextOffset)
    }

    const finishDrag = () => {
      if (!dragRef.current.active) return

      dragRef.current.active = false
      dragRef.current.pointerId = null
      const releasedOffset = dragRef.current.offset
      dragRef.current.offset = 0

      if (Math.abs(releasedOffset) > 0.22) {
        travel(releasedOffset < 0 ? 1 : -1, releasedOffset)
      } else {
        setDragOffset(0)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', finishDrag)
    window.addEventListener('pointercancel', finishDrag)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', finishDrag)
      window.removeEventListener('pointercancel', finishDrag)
    }
  }, [journey, travel])

  const startDrag = useCallback(
    (event) => {
      if (
        journey ||
        activeSection ||
        event.button !== 0 ||
        event.target.closest('button, a')
      ) {
        return
      }

      dragRef.current = {
        active: true,
        startX: event.clientX,
        pointerId: event.pointerId,
        offset: 0,
      }
    },
    [activeSection, journey],
  )

  const handleWheel = useCallback(
    (event) => {
      if (journey || activeSection || wheelLockedRef.current) return

      const movement =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      wheelAmountRef.current += movement
      window.clearTimeout(wheelResetRef.current)
      wheelResetRef.current = window.setTimeout(() => {
        wheelAmountRef.current = 0
      }, 180)

      if (Math.abs(wheelAmountRef.current) < 70) return

      wheelLockedRef.current = true
      travel(wheelAmountRef.current > 0 ? 1 : -1)
      wheelAmountRef.current = 0
      window.setTimeout(() => {
        wheelLockedRef.current = false
      }, 900)
    },
    [activeSection, journey, travel],
  )

  return {
    activeSection,
    currentStop,
    journeyStep,
    journey,
    dragOffset,
    openSection,
    closeSection,
    travel,
    travelTo,
    completeJourney,
    startDrag,
    handleWheel,
  }
}
