"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users, Clock } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface Location {
  id: number
  name: string
  address: string
  distance: string
  rating: number
  reviews: number
  price: number
  features: string[]
  image: string
  maxBags: number
  openingHours: string
  coordinates: { lat: number; lng: number }
  reviewsData: Array<{
    name: string
    rating: number
    comment: string
    date: string
  }>
}

interface MapViewProps {
  locations: Location[]
}

export function MapView({ locations }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      {/* Map Area */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Simulated Map Background */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Street lines */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="100" y1="0" x2="100" y2="300" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="200" y1="0" x2="200" y2="300" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="300" y1="0" x2="300" y2="300" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>

            {/* Location Markers */}
            {locations.map((location, index) => (
              <div
                key={location.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                  selectedLocation?.id === location.id ? "scale-125 z-10" : "hover:scale-110"
                }`}
                style={{
                  left: `${25 + index * 25}%`,
                  top: `${30 + index * 20}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                      selectedLocation?.id === location.id ? "bg-red-600" : "bg-red-800"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-800 rotate-45"></div>

                  {/* Price Tag */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-semibold shadow-md border border-red-200">
                    ₹{location.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button size="sm" variant="outline" className="bg-white">
            +
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            -
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-red-800 rounded-full flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
            <span>Keeper Partners</span>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="space-y-4 overflow-y-auto">
        {selectedLocation ? (
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <img
                  src={selectedLocation.image || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{selectedLocation.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {selectedLocation.address}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-800">₹{selectedLocation.price}</div>
                  <div className="text-sm text-gray-600">starting from</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{selectedLocation.rating}</span>
                  <span className="text-sm text-gray-600">({selectedLocation.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Max {selectedLocation.maxBags} bags</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLocation.openingHours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedLocation.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="bg-red-50 text-red-800">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Recent Reviews:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {selectedLocation.reviewsData.map((review, idx) => (
                    <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-gray-500 text-xs">{review.date}</span>
                      </div>
                      <p className="text-gray-600 text-xs">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/booking/${selectedLocation.id}`}>
                <Button className="w-full bg-red-800 hover:bg-red-900 text-white">Book This Location</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-red-100">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-red-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Select a Location</h3>
              <p className="text-gray-600 text-sm">
                Click on any red marker on the map to view keeper partner details, reviews, and booking options.
              </p>
            </CardContent>
          </Card>
        )}

        {/* All Locations List */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">All Keeper Partners</h4>
          {locations.map((location) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-colors ${
                selectedLocation?.id === location.id
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-red-200"
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{location.name}</h5>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{location.rating}</span>
                      <span>•</span>
                      <span>{location.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-800">₹{location.price}</div>
                    <div className="text-xs text-gray-600">starting from</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
