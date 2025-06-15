"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("mobile")

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
      } else if (width < 1024) {
        setScreenSize("tablet")
      } else {
        setScreenSize("desktop")
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return screenSize
}

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouchDevice
}

// Responsive container component
export function ResponsiveContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

// Touch-friendly button wrapper
export function TouchButton({ children, className = "", ...props }: any) {
  return (
    <button className={`min-h-[44px] min-w-[44px] touch-manipulation ${className}`} {...props}>
      {children}
    </button>
  )
}
