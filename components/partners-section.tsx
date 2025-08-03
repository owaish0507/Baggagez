"use client"

import { MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function PartnersSection() {
  const router = useRouter()

  const cities = [
    { name: "Delhi NCR", partners: 15, categories: ["Business", "Tourism", "Religious"] },
    { name: "Mumbai", partners: 12, categories: ["Business", "Tourism"] },
    { name: "Bangalore", partners: 18, categories: ["Business", "Tourism", "Marketing"] },
    { name: "Chennai", partners: 10, categories: ["Tourism", "Religious", "Spiritual"] },
    { name: "Jaipur", partners: 8, categories: ["Tourism", "Religious"] },
    { name: "Punjab", partners: 6, categories: ["Spiritual", "Religious"] },
    { name: "Uttarakhand", partners: 5, categories: ["Spiritual", "Tourism"] },
    { name: "Kolkata", partners: 9, categories: ["Business", "Tourism"] },
  ]

  const featuredPartners = [
    {
      id: 1,
      name: "Delhi Central Storage Hub",
      location: "New Delhi, Delhi",
      rating: 4.5,
      reviews: 25,
      price: "₹40/hour",
      category: "Travelling",
      features: ["24x7 Access", "Security Camera", "Climate Control"],
    },
    {
      id: 19,
      name: "Golden Temple Storage Service",
      location: "Amritsar, Punjab",
      rating: 4.9,
      reviews: 67,
      price: "₹20/hour",
      category: "Spiritual",
      features: ["Spiritual Friendly", "Free Water", "Security Camera"],
    },
    {
      id: 3,
      name: "Bangalore Tech Hub Storage",
      location: "Electronic City, Bangalore",
      rating: 4.3,
      reviews: 18,
      price: "₹45/hour",
      category: "Business",
      features: ["WiFi", "Climate Control", "Security Camera"],
    },
  ]

  const handleCityClick = (cityName: string) => {
    router.push(`/search-results?location=${encodeURIComponent(cityName)}`)
  }

  const handlePartnerClick = (partnerId: number) => {
    router.push(`/partner/${partnerId}`)
  }

  const handleViewAllPartners = () => {
    router.push("/search-results")
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Partners Across India</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've partnered with verified storage providers across major Indian cities, covering different categories to
            meet all your travel needs.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCityClick(city.name)}
            >
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="font-semibold text-gray-900">{city.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{city.partners} Partners Available</p>
              <div className="flex flex-wrap gap-1">
                {city.categories.map((category, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Partners */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Partners</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePartnerClick(partner.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {partner.location}
                    </p>
                  </div>
                  <Badge variant="outline">{partner.category}</Badge>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{partner.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({partner.reviews} reviews)</span>
                  </div>
                  <div className="ml-auto">
                    <span className="font-semibold text-red-600">Standard Pricing</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {partner.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={handleViewAllPartners}>
            View All Partners
          </Button>
        </div>
      </div>
    </section>
  )
}
