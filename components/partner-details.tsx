"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Clock,
  Shield,
  Camera,
  Coffee,
  Package,
  Users,
  AlertTriangle,
  Phone,
  Navigation,
  Share2,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface PartnerDetailsProps {
  partnerId: string
}

export function PartnerDetails({ partnerId }: PartnerDetailsProps) {
  const router = useRouter()

  // Mock data - would fetch from API
  const partner = {
    id: 1,
    name: "Delhi Central Storage Hub",
    address: "Paharganj, Near New Delhi Railway Station, New Delhi, Delhi 110055",
    rating: 4.5,
    reviewCount: 25,
    facilities: ["24x7 Access", "Security Camera", "Climate Control", "Cafe Available"],
    openingHours: {
      monday: "6:00 AM - 11:00 PM",
      tuesday: "6:00 AM - 11:00 PM",
      wednesday: "6:00 AM - 11:00 PM",
      thursday: "6:00 AM - 11:00 PM",
      friday: "6:00 AM - 11:00 PM",
      saturday: "6:00 AM - 11:00 PM",
      sunday: "6:00 AM - 11:00 PM",
    },
    type: "Railway Station",
    description:
      "Secure baggage storage facility located near New Delhi Railway Station. Perfect for travelers with train connections or those exploring the city center.",
    images: ["/images/delhi-red-fort.jpg", "/images/storage-interior.jpg", "/images/security-system.jpg"],
    reviewsList: [
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Excellent service! Very secure and convenient location.",
        date: "2 days ago",
      },
      {
        name: "Rajesh Kumar",
        rating: 4,
        comment: "Good facility, staff was helpful. Slightly crowded during peak hours.",
        date: "1 week ago",
      },
    ],
    maxBaggageLimit: 50,
    currentAvailableBags: 35,
  }

  const availabilityPercentage = Math.round((partner.currentAvailableBags / partner.maxBaggageLimit) * 100)

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600 bg-green-50 border-green-200"
    if (percentage >= 30) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getAvailabilityText = (percentage: number) => {
    if (percentage >= 70) return "High Availability"
    if (percentage >= 30) return "Limited Availability"
    return "Low Availability"
  }

  const getAvailabilityIcon = (percentage: number) => {
    if (percentage >= 70) return Package
    if (percentage >= 30) return Users
    return AlertTriangle
  }

  const AvailabilityIcon = getAvailabilityIcon(availabilityPercentage)

  const handleBookLocation = () => {
    // Check if user is logged in (you can implement proper auth check here)
    const isLoggedIn = localStorage.getItem("userToken") || sessionStorage.getItem("userLoggedIn")

    if (!isLoggedIn) {
      // Store the intended destination for after login
      sessionStorage.setItem("redirectAfterLogin", `/booking/${partner.id}`)
      router.push("/user-login")
    } else {
      router.push(`/booking/${partner.id}`)
    }
  }

  const handleContactPartner = () => {
    alert(`Calling ${partner.name}...\nPhone: +91-9876543210`)
  }

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(partner.address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  const handleShareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: partner.name,
        text: `Check out this storage location: ${partner.name}`,
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert("Location URL copied to clipboard!")
    }
  }

  const handleImageClick = (imageIndex: number) => {
    // In a real app, this would open a lightbox/gallery
    alert(`Opening image gallery - Image ${imageIndex + 1}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{partner.name}</h1>
              <Badge variant="secondary">{partner.type}</Badge>
            </div>
            <p className="text-gray-600 flex items-center mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {partner.address}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold">{partner.rating}</span>
                <span className="ml-1 text-gray-600">({partner.reviewCount} reviews)</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGetDirections}>
                  <Navigation className="w-4 h-4 mr-1" />
                  Directions
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareLocation}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Storage Availability - Prominent Display */}
          <Card className={`border-2 ${getAvailabilityColor(availabilityPercentage)}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AvailabilityIcon className="w-6 h-6 mr-2" />
                Storage Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">
                    {partner.currentAvailableBags}/{partner.maxBaggageLimit}
                  </div>
                  <div className="text-lg font-semibold mb-1">{getAvailabilityText(availabilityPercentage)}</div>
                  <div className="text-sm text-gray-600">Storage slots available</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Capacity Utilization:</span>
                    <span className="font-medium">{100 - availabilityPercentage}% occupied</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        availabilityPercentage >= 70
                          ? "bg-green-500"
                          : availabilityPercentage >= 30
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${100 - availabilityPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">Real-time availability • Updated every 5 minutes</div>
                </div>
              </div>

              {/* Baggage Allocation Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Baggage Allocation System</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Storage slots are allocated in multiples of 2 for optimal organization</li>
                  <li>• If you request 3 bags, you'll get 4 slots at no extra cost</li>
                  <li>• This ensures better space management and security</li>
                  <li>
                    • Maximum {Math.floor(partner.currentAvailableBags / 2)} bookings can be accommodated currently
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {partner.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${partner.name} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{partner.description}</p>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card>
            <CardHeader>
              <CardTitle>Facilities & Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <span>Security Camera</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Climate Control</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>24x7 Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-orange-600" />
                  <span>Cafe Available</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opening Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(partner.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize font-medium">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partner.reviewsList.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-2xl font-bold text-red-600">Standard Pricing</span>
                <div className="text-sm text-gray-600 mt-1">Starting ₹30 for 2 hours</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-600">
                Same pricing for all partners - transparent & fair
              </div>

              {/* Quick Availability Check */}
              <div className={`p-3 rounded-lg border ${getAvailabilityColor(availabilityPercentage)}`}>
                <div className="text-center">
                  <div className="font-semibold">{partner.currentAvailableBags} slots available</div>
                  <div className="text-sm">out of {partner.maxBaggageLimit} total capacity</div>
                </div>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
                disabled={partner.currentAvailableBags < 2}
                onClick={handleBookLocation}
              >
                {partner.currentAvailableBags < 2 ? "Fully Booked" : "Login to Book Location"}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full bg-transparent" onClick={handleContactPartner}>
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleGetDirections}>
                  <Navigation className="w-4 h-4 mr-1" />
                  Directions
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">Free cancellation up to 30 minutes after booking</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
