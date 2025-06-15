"use client"

import type React from "react"

import { useState } from "react"
import { useSwipeElement } from "@/hooks/use-swipe"
import { Button } from "@/components/ui/button"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface SwipeableTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function SwipeableTabs({ tabs, defaultTab, className = "" }: SwipeableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  const nextTab = () => {
    const nextIndex = (activeIndex + 1) % tabs.length
    setActiveTab(tabs[nextIndex].id)
  }

  const prevTab = () => {
    const prevIndex = (activeIndex - 1 + tabs.length) % tabs.length
    setActiveTab(tabs[prevIndex].id)
  }

  const swipeRef = useSwipeElement({
    onSwipeLeft: nextTab,
    onSwipeRight: prevTab,
    threshold: 50,
  })

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            className={`whitespace-nowrap ${
              activeTab === tab.id ? "bg-red-800 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div ref={swipeRef as any} className="relative min-h-[200px] touch-pan-y" style={{ touchAction: "pan-y" }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-300 ${
              activeTab === tab.id ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>

      {/* Tab indicators for mobile */}
      <div className="flex justify-center mt-4 space-x-1 md:hidden">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-red-800" : "bg-gray-300"}`}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </div>
  )
}
