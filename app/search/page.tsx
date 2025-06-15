"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { MapPin, Star, Shield, Clock, Users, Map, List, Filter, Eye } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { MapView } from "@/components/map-view"
import { SwipeableCard } from "@/components/swipeable-card"
import { SwipeableGallery } from "@/components/swipeable-gallery"
import { SwipeableDrawer } from "@/components/swipeable-drawer"
import { SwipeableTabs } from "@/components/swipeable-tabs"

const mockLocations = [
  {
    id: 1,
    name: "Central Station Storage",
    address: "Near Mumbai Central Station",
    distance: "0.1 km",
    rating: 4.9,
    reviews: 234,
    price: 30,
    features: ["24/7 Access", "CCTV", "Insurance"],
    images: ["/station-storage.jpg", "/secure-storage.jpg", "/family-travel.jpg"],
    maxBags: 10,
    openingHours: "24/7",
    coordinates: { lat: 19.076, lng: 72.8777 },
    verified: true,
    premiumPartner: true,
    reviewsData: [
      {
        name: "Priya S.",
        rating: 5,
        comment: "Perfect for train travelers! Hands-free exploration of the city",
        date: "2 days ago",
      },
      {
        name: "Rahul M.",
        rating: 5,
        comment: "Saved my day! Could enjoy street food without worrying about bags",
        date: "1 week ago",
      },
      {
        name: "Anjali K.",
        rating: 4,
        comment: "Safe and convenient. My shopping bags were secure",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: 2,
    name: "Airport Express Hub",
    address: "T2 Departure Area",
    distance: "0.3 km",
    rating: 4.8,
    reviews: 189,
    price: 50,
    features: ["Security", "Wifi", "Parking"],
    images: ["/airport-storage.jpg", "/hands-free-travel.jpg"],
    maxBags: 15,
    openingHours: "5:00 AM - 11:00 PM",
    coordinates: { lat: 19.0896, lng: 72.8656 },
    verified: true,
    premiumPartner: false,
    reviewsData: [
      {
        name: "Vikram P.",
        rating: 5,
        comment: "Layover made easy! Explored Mumbai without dragging suitcases",
        date: "1 day ago",
      },
      {
        name: "Meera S.",
        rating: 4,
        comment: "Family-friendly service. Kids could play while bags stayed safe",
        date: "3 days ago",
      },
    ],
  },
  {
    id: 3,
    name: "Gateway Mall Storage",
    address: "Gateway of India Area",
    distance: "0.5 km",
    rating: 4.7,
    reviews: 156,
    price: 30,
    features: ["Climate Control", "Insurance", "24/7"],
    images: ["/tourist-spots.jpg", "/hero-travel.jpg", "/secure-storage.jpg"],
    maxBags: 8,
    openingHours: "6:00 AM - 10:00 PM",
    coordinates: { lat: 18.922, lng: 72.8347 },
    verified: true,
    premiumPartner: false,
    reviewsData: [
      {
        name: "Arjun T.",
        rating: 5,
        comment: "Tourist paradise! Could take amazing photos without bag burden",
        date: "4 days ago",
      },
      {
        name: "Kavya R.",
        rating: 4,
        comment: "Romantic evening walk made possible. No heavy bags to ruin the mood",
        date: "1 week ago",
      },
    ],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || "Near me"
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)

  const handleLocationSwipe = (locationId: number, direction: "left" | "right") => {
    const currentIndex = mockLocations.findIndex((loc) => loc.id === locationId)
    if (direction === "left" && currentIndex < mockLocations.length - 1) {
      setSelectedLocation(mockLocations[currentIndex + 1])
    } else if (direction === "right" && currentIndex > 0) {
      setSelectedLocation(mockLocations[currentIndex - 1])
    }
  }

  const filterTabs = [
    {
      id: "price",
      label: "Price",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Under ₹50
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                ₹50 - ₹100
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Above ₹100
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "features",
      label: "Features",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                24/7 Access
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                CCTV Security
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Insurance Available
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Climate Control
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "location",
      label: "Location",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Distance</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Within 0.5 km
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                0.5 - 1 km
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />1 - 2 km
              </label>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Your Freedom Awaits Near {location}</h1>
            <p className="text-gray-600 text-sm md:text-base">
              {mockLocations.length} trusted keeper partners ready to help you travel hand-free
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setFilterDrawerOpen(true)}
              className="border-red-200 text-red-800 hover:bg-red-50 md:hidden"
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-red-800 hover:bg-red-900" : "border-red-200 text-red-800 hover:bg-red-50"
              }
              size="sm"
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className={
                viewMode === "map" ? "bg-red-800 hover:bg-red-900" : "border-red-200 text-red-800 hover:bg-red-50"
              }
              size="sm"
            >
              <Map className="w-4 h-4 mr-2" />
              Map
            </Button>
          </div>
        </div>

        {viewMode === "map" ? (
          <MapView locations={mockLocations} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {mockLocations.map((location) => (
                <SwipeableCard
                  key={location.id}
                  onSwipeLeft={() => handleLocationSwipe(location.id, "left")}
                  onSwipeRight={() => handleLocationSwipe(location.id, "right")}
                  className="border-red-100 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32">
                        <SwipeableGallery images={location.images} alt={location.name} className="h-32 md:h-24" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-gray-900">{location.name}</h3>
                              {location.verified && <Badge className="bg-green-600 text-white text-xs">Verified</Badge>}
                              {location.premiumPartner && (
                                <Badge className="bg-yellow-600 text-white text-xs">Premium</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {location.address} • {location.distance}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{location.rating}</span>
                            <span className="text-gray-600">({location.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>Max {location.maxBags} bags</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="hidden md:inline">{location.openingHours}</span>
                            <span className="md:hidden">24/7</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {location.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="bg-red-50 text-red-800 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2">Freedom Stories:</h4>
                          <div className="space-y-2">
                            {location.reviewsData.slice(0, 1).map((review, idx) => (
                              <div key={idx} className="text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.name}</span>
                                  <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                  <span className="text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-600 text-xs">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/booking/${location.id}`} className="flex-1">
                            <Button className="bg-red-800 hover:bg-red-900 text-white w-full">
                              <span className="hidden md:inline">Start Your Hand-Free Journey</span>
                              <span className="md:hidden">Book Now</span>
                            </Button>
                          </Link>
                          <Link href={`/partner/${location.id}`}>
                            <Button variant="outline" className="border-red-200 text-red-800 hover:bg-red-50">
                              <Eye className="w-4 h-4 mr-2" />
                              <span className="hidden md:inline">View Details</span>
                              <span className="md:hidden">Details</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </SwipeableCard>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="border-red-100 sticky top-24">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-semibold text-base md:text-lg mb-4 text-gray-900">Smart Pricing</h3>
                  <div className="space-y-2 md:space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>2 Hours</span>
                      <span className="font-semibold">₹30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4 Hours</span>
                      <span className="font-semibold">₹50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6 Hours</span>
                      <span className="font-semibold">₹70</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8 Hours</span>
                      <span className="font-semibold">₹90</span>
                    </div>
                    <div className="flex justify-between">
                      <span>12 Hours</span>
                      <span className="font-semibold">₹120</span>
                    </div>
                    <div className="flex justify-between">
                      <span>24 Hours</span>
                      <span className="font-semibold">₹199</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 p-3 md:p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 md:w-5 h-4 md:h-5 text-red-800" />
                      <span className="font-semibold text-red-800 text-sm md:text-base">Protected</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      Insurance: +₹45-151
                      <br />
                      Coverage up to ₹15,000
                    </p>
                  </div>

                  <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1 text-sm md:text-base">💡 Travel Tip</h4>
                    <p className="text-xs md:text-sm text-blue-700">Save ₹2000+ on hotel early check-ins!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <SwipeableDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        title="Filter Options"
        position="bottom"
      >
        <SwipeableTabs tabs={filterTabs} defaultTab="price" />
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => setFilterDrawerOpen(false)}>
            Clear All
          </Button>
          <Button className="flex-1 bg-red-800 hover:bg-red-900" onClick={() => setFilterDrawerOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
