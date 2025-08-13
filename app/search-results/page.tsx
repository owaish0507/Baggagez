"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { PartnerCard } from "@/components/partner-card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MapPin, SlidersHorizontal, Calendar } from "lucide-react"
import { format, parseISO, isValid } from "date-fns"

export default function SearchResultsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredPartners, setFilteredPartners] = useState([])
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || "Delhi NCR"
  const dateParam = searchParams.get("date")
  const dateDisplay = searchParams.get("dateDisplay") || "Today"

  // Parse and validate the date
  const searchDate = dateParam ? parseISO(dateParam) : new Date()
  const isValidDate = isValid(searchDate)
  const formattedDate = isValidDate ? format(searchDate, "EEEE, MMMM dd, yyyy") : "Today"

  const allPartners = [
    // Delhi NCR Partners
    {
      id: 1,
      name: "Delhi Central Storage Hub",
      address: "Paharganj, Near New Delhi Railway Station",
      rating: 4.5,
      reviews: 25,
      facilities: ["24x7 Access", "Security Camera", "Climate Control", "Cafe Available"],
      openingHours: "6:00 AM - 11:00 PM",
      type: "Railway Station",
      distance: "0.5 km",
      city: "Delhi NCR",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Old_Delhi_Railway_Station_%28DLI%29.jpg-5DDjPf2GqqDRdPOfOYomKVlmahIJU5.jpeg",
      maxBaggageLimit: 50,
      currentAvailableBags: 45,
    },
    {
      id: 2,
      name: "Connaught Place Business Center",
      address: "Connaught Place, Block A",
      rating: 4.8,
      reviews: 42,
      facilities: ["Security Camera", "Climate Control", "Insurance Covered", "Supermarket"],
      openingHours: "8:00 AM - 8:00 PM",
      type: "Business Center",
      distance: "1.2 km",
      city: "Delhi NCR",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Office_Interior_12_b2afb8af-8552-4fd7-ba6e-79f54421df37-YDSIm5aBmsI5iUWZa4kmIkeIlWgsLt.webp",
      maxBaggageLimit: 30,
      currentAvailableBags: 25,
    },
    {
      id: 3,
      name: "Red Fort Heritage Storage",
      address: "Near Red Fort, Chandni Chowk",
      rating: 4.3,
      reviews: 18,
      facilities: ["Security Camera", "Tourist Guide", "Heritage Site"],
      openingHours: "7:00 AM - 9:00 PM",
      type: "Tourist Attraction",
      distance: "0.8 km",
      city: "Delhi NCR",
      image: "/images/delhi-red-fort.jpg",
      maxBaggageLimit: 40,
      currentAvailableBags: 35,
    },
    {
      id: 4,
      name: "India Gate Tourist Point",
      address: "Rajpath, Near India Gate",
      rating: 4.6,
      reviews: 31,
      facilities: ["Security Camera", "Tourist Info", "Food Court"],
      openingHours: "6:00 AM - 10:00 PM",
      type: "Tourist Attraction",
      distance: "1.5 km",
      city: "Delhi NCR",
      image: "/images/storage-interior.jpg",
      maxBaggageLimit: 40,
      currentAvailableBags: 38,
    },
    {
      id: 5,
      name: "Gurgaon Cyber Hub Storage",
      address: "DLF Cyber Hub, Gurgaon",
      rating: 4.7,
      reviews: 38,
      facilities: ["24x7 Access", "Climate Control", "WiFi", "Business Center"],
      openingHours: "24 Hours",
      type: "Business Center",
      distance: "2.1 km",
      city: "Delhi NCR",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Office_Interior_12_b2afb8af-8552-4fd7-ba6e-79f54421df37-YDSIm5aBmsI5iUWZa4kmIkeIlWgsLt.webp",
      maxBaggageLimit: 30,
      currentAvailableBags: 28,
    },
    {
      id: 6,
      name: "Noida Sector 18 Mall Storage",
      address: "Atta Market, Sector 18, Noida",
      rating: 4.4,
      reviews: 22,
      facilities: ["Security Camera", "Shopping Mall", "Food Court", "Climate Control"],
      openingHours: "10:00 AM - 10:00 PM",
      type: "Shopping Mall",
      distance: "1.8 km",
      city: "Delhi NCR",
      image: "/images/supermarket-storage.jpg",
      maxBaggageLimit: 25,
      currentAvailableBags: 20,
    },

    // Mumbai Partners
    {
      id: 7,
      name: "Mumbai CST Railway Storage",
      address: "Chhatrapati Shivaji Terminus",
      rating: 4.2,
      reviews: 35,
      facilities: ["24x7 Access", "Security Camera", "Railway Station"],
      openingHours: "24 Hours",
      type: "Railway Station",
      distance: "0.3 km",
      city: "Mumbai",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Old_Delhi_Railway_Station_%28DLI%29.jpg-5DDjPf2GqqDRdPOfOYomKVlmahIJU5.jpeg",
      maxBaggageLimit: 50,
      currentAvailableBags: 42,
    },
    {
      id: 8,
      name: "Gateway of India Tourist Hub",
      address: "Apollo Bunder, Colaba",
      rating: 4.8,
      reviews: 56,
      facilities: ["Security Camera", "Tourist Guide", "Sea View"],
      openingHours: "6:00 AM - 11:00 PM",
      type: "Tourist Attraction",
      distance: "0.6 km",
      city: "Mumbai",
      image: "/images/mumbai-gateway.jpg",
      maxBaggageLimit: 40,
      currentAvailableBags: 35,
    },
    {
      id: 9,
      name: "Bandra Kurla Complex Storage",
      address: "BKC, Bandra East",
      rating: 4.5,
      reviews: 29,
      facilities: ["Climate Control", "Business Center", "WiFi", "Security Camera"],
      openingHours: "8:00 AM - 8:00 PM",
      type: "Business Center",
      distance: "1.4 km",
      city: "Mumbai",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pcm__fa64facf-b464-4ca4-85b4-9944595bc37e_0-W2uo6tywqMQDrr8fb89rOHjk3OIPrW.png",
      maxBaggageLimit: 30,
      currentAvailableBags: 25,
    },

    // Punjab Partners
    {
      id: 19,
      name: "Golden Temple Storage Service",
      address: "Golden Temple Complex, Amritsar",
      rating: 4.9,
      reviews: 67,
      facilities: ["Spiritual Friendly", "Free Water", "Security Camera", "Religious Authority"],
      openingHours: "3:00 AM - 12:00 AM",
      type: "Religious Place",
      distance: "0.1 km",
      city: "Punjab",
      image: "/images/golden-temple.jpg",
      maxBaggageLimit: 80,
      currentAvailableBags: 75,
    },
    {
      id: 20,
      name: "Jallianwala Bagh Memorial Storage",
      address: "Near Jallianwala Bagh",
      rating: 4.3,
      reviews: 21,
      facilities: ["Security Camera", "Memorial Site", "Historical Place"],
      openingHours: "6:00 AM - 8:00 PM",
      type: "Tourist Attraction",
      distance: "0.4 km",
      city: "Punjab",
      image: "/images/golden-temple.jpg",
      maxBaggageLimit: 60,
      currentAvailableBags: 55,
    },

    // Add more partners...
    {
      id: 25,
      name: "Starbucks Connaught Place",
      address: "Connaught Place, Block B",
      rating: 4.6,
      reviews: 32,
      facilities: ["Security Camera", "WiFi", "Charging Points", "Restroom Facilities"],
      openingHours: "7:00 AM - 11:00 PM",
      type: "Cafe",
      distance: "0.7 km",
      city: "Delhi NCR",
      image: "/images/cafe-storage.jpg",
      maxBaggageLimit: 20,
      currentAvailableBags: 18,
    },
  ]

  useEffect(() => {
    // Filter partners based on selected location
    const filtered = allPartners.filter(
      (partner) =>
        partner.city.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(partner.city.toLowerCase()),
    )
    setFilteredPartners(filtered)
  }, [location])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-2 sm:mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="font-medium">{location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="font-medium">{dateDisplay}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Available Storage Partners in {location}
          </h1>
          <p className="text-gray-600">
            Found {filteredPartners.length} trusted partners near you for {formattedDate}
          </p>

          {/* Date-specific availability notice */}
          {!isValidDate && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Showing availability for today. Select a specific date for accurate availability.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-20">
              <SearchFilters />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full h-12 bg-transparent">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters & Sort
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                  </div>
                  <div className="p-4 overflow-y-auto">
                    <SearchFilters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Partner Cards */}
            <div className="space-y-4 sm:space-y-6">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => <PartnerCard key={partner.id} partner={partner} />)
              ) : (
                <div className="text-center py-12 sm:py-16">
                  <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    No partners found in {location}
                  </h3>
                  <p className="text-gray-600 mb-4 px-4">
                    Try searching for a different location or check our available cities.
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700">View All Locations</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
