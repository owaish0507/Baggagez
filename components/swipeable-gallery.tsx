"use client"

import { useState } from "react"
import { useSwipeElement } from "@/hooks/use-swipe"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwipeableGalleryProps {
  images: string[]
  alt?: string
  className?: string
}

export function SwipeableGallery({ images, alt = "Gallery image", className = "" }: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const swipeRef = useSwipeElement({
    onSwipeLeft: nextImage,
    onSwipeRight: prevImage,
    threshold: 50,
  })

  if (images.length === 0) return null

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div
        ref={swipeRef as any}
        className="relative w-full h-48 md:h-64 bg-gray-200 touch-pan-y"
        style={{ touchAction: "pan-y" }}
      >
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Navigation buttons for desktop */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 hidden md:flex"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 hidden md:flex"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-2 space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-red-800" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
