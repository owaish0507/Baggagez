"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useSwipeElement } from "@/hooks/use-swipe"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  showIndicators?: boolean
  className?: string
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  showIndicators = true,
  className = "",
}: SwipeableCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const swipeRef = useSwipeElement({
    onSwipeLeft: () => {
      setSwipeDirection("left")
      setTimeout(() => setSwipeDirection(null), 300)
      onSwipeLeft?.()
    },
    onSwipeRight: () => {
      setSwipeDirection("right")
      setTimeout(() => setSwipeDirection(null), 300)
      onSwipeRight?.()
    },
    threshold: 50,
  })

  return (
    <div className="relative">
      <Card
        ref={swipeRef as any}
        className={`transition-transform duration-300 ${
          swipeDirection === "left"
            ? "transform -translate-x-2"
            : swipeDirection === "right"
              ? "transform translate-x-2"
              : ""
        } ${className}`}
      >
        {children}
      </Card>

      {showIndicators && (
        <>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-30 md:hidden">
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-30 md:hidden">
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </>
      )}
    </div>
  )
}
