"use client"

import { useEffect, useRef, useState } from "react"

interface SwipeInput {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}

interface TouchPoint {
  x: number
  y: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50 }: SwipeInput) {
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null)
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null)

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft()
      }
      if (isRightSwipe && onSwipeRight) {
        onSwipeRight()
      }
    } else {
      // Vertical swipe
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp()
      }
      if (isDownSwipe && onSwipeDown) {
        onSwipeDown()
      }
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

export function useSwipeElement(swipeConfig: SwipeInput) {
  const elementRef = useRef<HTMLElement>(null)
  const swipeHandlers = useSwipe(swipeConfig)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener("touchstart", swipeHandlers.onTouchStart, { passive: true })
    element.addEventListener("touchmove", swipeHandlers.onTouchMove, { passive: true })
    element.addEventListener("touchend", swipeHandlers.onTouchEnd, { passive: true })

    return () => {
      element.removeEventListener("touchstart", swipeHandlers.onTouchStart)
      element.removeEventListener("touchmove", swipeHandlers.onTouchMove)
      element.removeEventListener("touchend", swipeHandlers.onTouchEnd)
    }
  }, [swipeHandlers])

  return elementRef
}
