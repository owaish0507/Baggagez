"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchForm() {
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const router = useRouter()

  const handleSearch = () => {
    const searchLocation = location.trim() || "Near me"
    const searchDate = date || new Date().toISOString().split("T")[0]

    const params = new URLSearchParams({
      location: searchLocation,
      date: searchDate,
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-3 md:p-6 max-w-3xl mx-auto border border-red-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5" />
          <Input
            placeholder="Enter location or 'Near me'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 md:h-12 border-red-200 focus:border-red-400 text-base focus-visible:ring-red-400 focus-visible:ring-2 focus-visible:ring-offset-1"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 w-5 h-5" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="pl-10 h-12 md:h-12 border-red-200 focus:border-red-400 text-base focus-visible:ring-red-400 focus-visible:ring-2 focus-visible:ring-offset-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        <Button
          onClick={handleSearch}
          className="h-12 md:h-12 bg-red-800 hover:bg-red-900 text-white font-semibold text-base md:text-base"
        >
          <span className="hidden md:inline">Find Storage →</span>
          <span className="md:hidden">Find Storage</span>
        </Button>
      </div>
    </div>
  )
}
