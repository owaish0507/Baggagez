"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { MapPin, CalendarIcon, Search, Navigation } from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection() {
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set default date to today
    setDate(new Date())
  }, [])

  const availableLocations = [
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Jaipur",
    "Punjab",
    "Uttarakhand",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Amritsar",
    "Chandigarh",
    "Rishikesh",
    "Haridwar",
    "Gurgaon",
    "Noida",
    "Faridabad",
    "Ghaziabad",
  ]

  const handleLocationChange = (value: string) => {
    setLocation(value)
    if (value.length > 0) {
      const filtered = availableLocations.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setLocation(suggestion)
    setShowSuggestions(false)
  }

  const handleFindStorage = () => {
    if (!location.trim()) {
      alert("Please enter a location to search")
      return
    }

    const searchParams = new URLSearchParams()
    searchParams.set("location", location)
    if (date) {
      searchParams.set("date", format(date, "yyyy-MM-dd"))
      searchParams.set("dateDisplay", getDateDisplayText(date))
    }

    router.push(`/search-results?${searchParams.toString()}`)
  }

  const handleStartJourney = () => {
    const searchParams = new URLSearchParams()
    searchParams.set("location", "Delhi NCR")
    if (date) {
      searchParams.set("date", format(date, "yyyy-MM-dd"))
      searchParams.set("dateDisplay", getDateDisplayText(date))
    }
    router.push(`/search-results?${searchParams.toString()}`)
  }

  const handleFindStorageNearYou = () => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const searchParams = new URLSearchParams()
          searchParams.set("location", "Delhi NCR")
          searchParams.set("lat", position.coords.latitude.toString())
          searchParams.set("lng", position.coords.longitude.toString())
          if (date) {
            searchParams.set("date", format(date, "yyyy-MM-dd"))
            searchParams.set("dateDisplay", getDateDisplayText(date))
          }
          router.push(`/search-results?${searchParams.toString()}`)
        },
        () => {
          // Fallback to Delhi NCR if location access denied
          const searchParams = new URLSearchParams()
          searchParams.set("location", "Delhi NCR")
          if (date) {
            searchParams.set("date", format(date, "yyyy-MM-dd"))
            searchParams.set("dateDisplay", getDateDisplayText(date))
          }
          router.push(`/search-results?${searchParams.toString()}`)
        },
      )
    } else {
      const searchParams = new URLSearchParams()
      searchParams.set("location", "Delhi NCR")
      if (date) {
        searchParams.set("date", format(date, "yyyy-MM-dd"))
        searchParams.set("dateDisplay", getDateDisplayText(date))
      }
      router.push(`/search-results?${searchParams.toString()}`)
    }
  }

  // Helper function to get user-friendly date display text
  const getDateDisplayText = (selectedDate: Date) => {
    if (isToday(selectedDate)) {
      return "Today"
    } else if (isTomorrow(selectedDate)) {
      return "Tomorrow"
    } else {
      return format(selectedDate, "MMM dd, yyyy")
    }
  }

  // Helper function to get button display text for date
  const getDateButtonText = (selectedDate: Date | undefined) => {
    if (!selectedDate) return "Select Date"

    if (isToday(selectedDate)) {
      return `Today, ${format(selectedDate, "MMM dd")}`
    } else if (isTomorrow(selectedDate)) {
      return `Tomorrow, ${format(selectedDate, "MMM dd")}`
    } else {
      return format(selectedDate, "PPP")
    }
  }

  // Quick date selection handlers
  const selectToday = () => {
    setDate(new Date())
  }

  const selectTomorrow = () => {
    setDate(addDays(new Date(), 1))
  }

  const selectNextWeek = () => {
    setDate(addDays(new Date(), 7))
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] sm:min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-background.jpg" alt="Travel Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          <span className="text-red-400 drop-shadow-md">Travel Hand-Free</span>
          <br />
          <span className="text-white drop-shadow-md">Store Your Memories Safely</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-3 sm:mb-4 max-w-2xl mx-auto px-2 font-medium drop-shadow-sm">
          <span className="font-bold text-red-300 drop-shadow-sm">
            "Don't let your loving devotion be left behind."
          </span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Store your bags with our trusted partners and explore freely.
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 font-medium drop-shadow-sm">
          <span className="text-red-300 font-bold drop-shadow-sm">Save travelling costs</span> • No expensive hotel
          check-ins •<span className="text-red-300 font-bold drop-shadow-sm"> Make every moment count</span>
        </p>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 p-4 sm:p-6 max-w-5xl mx-auto mb-6 sm:mb-8">
          <form
            className="space-y-4 sm:space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              handleFindStorage()
            }}
          >
            {/* Location and Date Selection */}
            <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                <Input
                  placeholder="Search your location..."
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="pl-10 h-12 sm:h-12 text-base"
                  onFocus={() => location.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setShowSuggestions(false)}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-20 mt-1 max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-red-50 cursor-pointer text-left border-b last:border-b-0 transition-colors duration-150"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          setLocation(suggestion)
                          setShowSuggestions(false)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                            <span className="text-sm sm:text-base font-medium text-gray-900">{suggestion}</span>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {date ? getDateDisplayText(date) : "Today"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 px-4 justify-start text-left font-medium w-full md:min-w-[220px] md:w-auto border-gray-300 hover:border-red-400 hover:bg-red-50 transition-colors duration-150 bg-transparent"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0 text-red-500" />
                    <span className="truncate text-gray-700">{getDateButtonText(date)}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3 border-b">
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={selectToday}
                        className={`text-xs ${isToday(date || new Date()) ? "bg-red-50 border-red-300 text-red-700" : ""}`}
                      >
                        Today
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={selectTomorrow}
                        className={`text-xs ${isTomorrow(date || new Date()) ? "bg-red-50 border-red-300 text-red-700" : ""}`}
                      >
                        Tomorrow
                      </Button>
                      <Button variant="outline" size="sm" onClick={selectNextWeek} className="text-xs bg-transparent">
                        Next Week
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                    initialFocus
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>

              <Button
                type="submit"
                className="h-12 px-6 sm:px-8 bg-red-600 hover:bg-red-700 w-full md:w-auto font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Search className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Find Storage</span>
              </Button>
            </div>

            {/* Selected Date Display */}
            {date && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Searching for storage on{" "}
                  <span className="font-semibold text-red-600">{getDateDisplayText(date)}</span>
                  {!isToday(date) && <span className="text-gray-500 ml-1">({format(date, "EEEE")})</span>}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 h-12 sm:h-auto w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleStartJourney}
          >
            Start Your Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 h-12 sm:h-auto w-full sm:w-auto font-semibold backdrop-blur-sm transition-all duration-200 bg-transparent"
            onClick={handleFindStorageNearYou}
          >
            <Navigation className="w-4 h-4 mr-2 sm:hidden" />
            Find Storage Near You
          </Button>
        </div>
      </div>
    </section>
  )
}
