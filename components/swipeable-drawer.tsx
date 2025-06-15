"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSwipeElement } from "@/hooks/use-swipe"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwipeableDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  position?: "bottom" | "top" | "left" | "right"
}

export function SwipeableDrawer({ isOpen, onClose, children, title, position = "bottom" }: SwipeableDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const getSwipeConfig = () => {
    switch (position) {
      case "bottom":
        return { onSwipeDown: onClose }
      case "top":
        return { onSwipeUp: onClose }
      case "left":
        return { onSwipeLeft: onClose }
      case "right":
        return { onSwipeRight: onClose }
      default:
        return { onSwipeDown: onClose }
    }
  }

  const swipeRef = useSwipeElement({
    ...getSwipeConfig(),
    threshold: 50,
  })

  const getPositionClasses = () => {
    const base = "fixed z-50 bg-white shadow-lg transition-transform duration-300"
    switch (position) {
      case "bottom":
        return `${base} bottom-0 left-0 right-0 rounded-t-lg ${isOpen ? "translate-y-0" : "translate-y-full"}`
      case "top":
        return `${base} top-0 left-0 right-0 rounded-b-lg ${isOpen ? "translate-y-0" : "-translate-y-full"}`
      case "left":
        return `${base} left-0 top-0 bottom-0 rounded-r-lg ${isOpen ? "translate-x-0" : "-translate-x-full"}`
      case "right":
        return `${base} right-0 top-0 bottom-0 rounded-l-lg ${isOpen ? "translate-x-0" : "translate-x-full"}`
      default:
        return `${base} bottom-0 left-0 right-0 rounded-t-lg ${isOpen ? "translate-y-0" : "translate-y-full"}`
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isOpen ? "opacity-50" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div ref={swipeRef as any} className={getPositionClasses()}>
        {/* Handle for swipe indication */}
        {(position === "bottom" || position === "top") && (
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="p-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
