"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ShoppingBag, Train, Plane, Church, Mountain, Briefcase } from "lucide-react"

interface InterestSelectionProps {
  selectedInterests: string[]
  onInterestSelection: (interests: string[]) => void
  onSubmit: () => void
  onBack: () => void
}

const interestCategories = [
  {
    id: "tourist-spots",
    name: "Tourist Spots",
    icon: Mountain,
    description: "Historical monuments, museums, parks",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  {
    id: "pilgrimage-spots",
    name: "Pilgrimage Spots",
    icon: Church,
    description: "Temples, churches, religious sites",
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  },
  {
    id: "business-tech-hubs",
    name: "Business & Tech Hubs",
    icon: Briefcase,
    description: "Corporate offices, tech parks, coworking spaces",
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  {
    id: "markets",
    name: "Markets",
    icon: ShoppingBag,
    description: "Shopping malls, local markets, bazaars",
    color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
  {
    id: "railway-stations",
    name: "Railway Stations",
    icon: Train,
    description: "Train stations and nearby areas",
    color: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  {
    id: "metro-stations",
    name: "Metro Stations",
    icon: MapPin,
    description: "Metro stations and transit hubs",
    color: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  },
  {
    id: "airports",
    name: "Airports",
    icon: Plane,
    description: "Airports and aviation hubs",
    color: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  },
]

export function InterestSelection({
  selectedInterests,
  onInterestSelection,
  onSubmit,
  onBack,
}: InterestSelectionProps) {
  const [localSelectedInterests, setLocalSelectedInterests] = useState<string[]>(selectedInterests)

  useEffect(() => {
    setLocalSelectedInterests(selectedInterests)
  }, [selectedInterests])

  const toggleInterest = (interestId: string) => {
    const updated = localSelectedInterests.includes(interestId)
      ? localSelectedInterests.filter((id) => id !== interestId)
      : [...localSelectedInterests, interestId]

    setLocalSelectedInterests(updated)
    onInterestSelection(updated)
  }

  const handleSubmit = () => {
    if (localSelectedInterests.length === 0) {
      alert("Please select at least one interest category")
      return
    }
    onSubmit()
  }

  return (
    <Card className="w-full border-0 sm:border shadow-none sm:shadow-sm">
      <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Select Your Interests</CardTitle>
        <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base">
          Choose categories that interest you to get personalized recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {interestCategories.map((category) => {
            const Icon = category.icon
            const isSelected = localSelectedInterests.includes(category.id)

            return (
              <div
                key={category.id}
                onClick={() => toggleInterest(category.id)}
                className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {localSelectedInterests.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">Selected Interests:</h4>
            <div className="flex flex-wrap gap-2">
              {localSelectedInterests.map((interestId) => {
                const category = interestCategories.find((cat) => cat.id === interestId)
                return (
                  <Badge key={interestId} variant="secondary" className="px-3 py-1 text-xs sm:text-sm">
                    {category?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            disabled={localSelectedInterests.length === 0}
            className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base lg:text-lg bg-red-600 hover:bg-red-700"
          >
            Complete Registration
          </Button>

          <div className="flex justify-center">
            <Button onClick={onBack} variant="ghost" className="text-gray-600 text-xs sm:text-sm md:text-base">
              Back
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
