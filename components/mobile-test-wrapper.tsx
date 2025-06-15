"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone, Tablet, Monitor } from "lucide-react"

interface MobileTestWrapperProps {
  children: React.ReactNode
}

export function MobileTestWrapper({ children }: MobileTestWrapperProps) {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("mobile")

  const screenSizes = {
    mobile: { width: "375px", height: "667px", name: "iPhone SE" },
    tablet: { width: "768px", height: "1024px", name: "iPad" },
    desktop: { width: "100%", height: "100%", name: "Desktop" },
  }

  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Test Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
        <h3 className="font-semibold mb-3 text-sm">Screen Size Test</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={screenSize === "mobile" ? "default" : "outline"}
            onClick={() => setScreenSize("mobile")}
            className="p-2"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={screenSize === "tablet" ? "default" : "outline"}
            onClick={() => setScreenSize("tablet")}
            className="p-2"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={screenSize === "desktop" ? "default" : "outline"}
            onClick={() => setScreenSize("desktop")}
            className="p-2"
          >
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-2">{screenSizes[screenSize].name}</p>
      </div>

      {/* Screen Size Simulator */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300"
          style={{
            width: screenSizes[screenSize].width,
            height: screenSize === "desktop" ? "auto" : screenSizes[screenSize].height,
            maxWidth: screenSize === "desktop" ? "none" : screenSizes[screenSize].width,
          }}
        >
          <div className="h-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
