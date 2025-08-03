"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Clock, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function PricingSection() {
  const router = useRouter()

  const pricingPlans = [
    {
      duration: "2 Hours",
      price: "₹30",
      priceWithInsurance: "₹75",
      popular: false,
      description: "Perfect for quick temple visits or short sightseeing",
    },
    {
      duration: "4 Hours",
      price: "₹50",
      priceWithInsurance: "₹115",
      popular: true,
      description: "Ideal for half-day exploration and spiritual journeys",
    },
    {
      duration: "6 Hours",
      price: "₹70",
      priceWithInsurance: "₹155",
      popular: false,
      description: "Great for full sightseeing tours and cultural experiences",
    },
    {
      duration: "8 Hours",
      price: "₹90",
      priceWithInsurance: "₹195",
      popular: false,
      description: "Extended exploration without baggage worries",
    },
    {
      duration: "12 Hours",
      price: "₹120",
      priceWithInsurance: "₹255",
      popular: false,
      description: "Full day adventures and spiritual retreats",
    },
    {
      duration: "24 Hours",
      price: "₹199",
      priceWithInsurance: "₹350",
      popular: false,
      description: "Complete day-night spiritual or tourist experience",
    },
  ]

  const handleChoosePlan = (duration: string) => {
    // Navigate to search with duration preference
    router.push(`/search-results?duration=${duration.split(" ")[0]}`)
  }

  const handleBookStorage = () => {
    router.push("/search-results")
  }

  const handleViewAllLocations = () => {
    router.push("/search-results")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-red-600">Transparent Pricing</span>
            <br />
            <span className="text-gray-700">No Hidden Costs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            "Don't let expensive hotel check-ins burden your journey." Our pricing is designed to save your travelling
            costs while keeping your belongings safe.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "ring-2 ring-red-500 shadow-xl" : "shadow-lg"} hover:shadow-xl transition-shadow`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.duration}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-red-600">{plan.price}</div>
                  <div className="text-sm text-gray-500">Without Insurance</div>
                  <div className="text-xl font-semibold text-gray-700">{plan.priceWithInsurance}</div>
                  <div className="text-sm text-gray-500">With Basic Insurance</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">{plan.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Secure storage facility
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    24/7 security monitoring
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Easy pickup & drop-off
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleChoosePlan(plan.duration)}>
                  Choose This Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insurance Information */}
        <div className="bg-red-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Insurance Coverage</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              "Protect your loving devotion with our comprehensive insurance options"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">₹5,000</div>
              <div className="text-red-600 font-semibold mb-2">Basic Coverage</div>
              <p className="text-gray-600">Protection for damage or missing items without premium insurance</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">₹15,000</div>
              <div className="text-red-600 font-semibold mb-2">Premium Coverage</div>
              <p className="text-gray-600">Enhanced protection with basic insurance for valuable belongings</p>
            </div>
          </div>
        </div>

        {/* Emotional Call to Action */}
        <div className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-90 drop-shadow-lg" />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight leading-tight">
            "Make Every Moment Count"
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide">
            Don't let baggage hold back your spiritual journey or tourist adventure. Store with confidence, explore with
            freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={handleBookStorage}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span>Book Storage Now</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-transparent"
              onClick={handleViewAllLocations}
            >
              View All Locations
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
