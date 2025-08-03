"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Package, Phone, Navigation, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface Partner {
  id: number
  name: string
  address: string
  rating: number
  reviews: number
  facilities: string[]
  openingHours: string
  type: string
  distance: string
  city: string
  image: string
  maxBaggageLimit?: number
  currentAvailableBags?: number
}

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const router = useRouter()

  const availabilityPercentage = partner.maxBaggageLimit
    ? Math.round(((partner.currentAvailableBags || 0) / partner.maxBaggageLimit) * 100)
    : 0

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600"
    if (percentage >= 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getAvailabilityText = (percentage: number) => {
    if (percentage >= 70) return "High Availability"
    if (percentage >= 30) return "Limited Availability"
    return "Low Availability"
  }

  const handleViewDetails = () => {
    router.push(`/partner/${partner.id}`)
  }

  const handleBookNow = () => {
    router.push(`/booking/${partner.id}`)
  }

  const handleGetDirections = () => {
    // Open Google Maps with directions
    const encodedAddress = encodeURIComponent(partner.address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  const handleCallPartner = () => {
    // For demo purposes, show alert. In real app, would use actual phone number
    alert(`Calling ${partner.name}...\nPhone: +91-9876543210`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 sm:h-56 md:h-48">
            <Image
              src={partner.image || "/placeholder.svg?height=200&width=400"}
              alt={partner.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                {partner.type}
              </Badge>
            </div>
            {partner.maxBaggageLimit && (
              <div className="absolute bottom-3 left-3">
                <Badge
                  variant="outline"
                  className={`bg-white/90 ${getAvailabilityColor(availabilityPercentage)} text-xs`}
                >
                  <Package className="w-3 h-3 mr-1" />
                  {partner.currentAvailableBags}/{partner.maxBaggageLimit} bags
                </Badge>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{partner.name}</h3>
              <p className="text-gray-600 flex items-start mb-3 text-sm">
                <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">
                  {partner.address} • {partner.distance}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{partner.rating}</span>
                  <span className="ml-1">({partner.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="truncate">{partner.openingHours}</span>
                </div>
              </div>

              {/* Baggage Availability */}
              {partner.maxBaggageLimit && (
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className={`text-sm font-medium ${getAvailabilityColor(availabilityPercentage)}`}>
                    {getAvailabilityText(availabilityPercentage)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({partner.currentAvailableBags} of {partner.maxBaggageLimit} slots)
                  </span>
                </div>
              )}

              {/* Pricing */}
              <div className="text-right mb-4">
                <div className="text-sm text-gray-600">Standard Pricing</div>
                <div className="text-xs text-gray-500">Starting ₹30 for 2hrs</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {partner.facilities.slice(0, 3).map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {partner.facilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{partner.facilities.length - 3} more
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleViewDetails} className="text-xs sm:text-sm">
                  <ExternalLink className="w-3 h-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-xs sm:text-sm"
                  disabled={!partner.currentAvailableBags || partner.currentAvailableBags < 2}
                  onClick={handleBookNow}
                >
                  {!partner.currentAvailableBags || partner.currentAvailableBags < 2 ? "Fully Booked" : "Book Now"}
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleGetDirections} className="text-xs sm:text-sm">
                  <Navigation className="w-3 h-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Directions</span>
                  <span className="sm:hidden">Map</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleCallPartner} className="text-xs sm:text-sm">
                  <Phone className="w-3 h-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Call</span>
                  <span className="sm:hidden">Call</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
