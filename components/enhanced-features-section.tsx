import { Heart, Wallet, Camera, Shield, Clock, MapPin } from "lucide-react"
import Image from "next/image"

export function EnhancedFeaturesSection() {
  const mainFeatures = [
    {
      icon: Heart,
      title: "Travel Hand-Free",
      subtitle: "Freedom in Every Step",
      description:
        "Don't let your loving devotion be left behind. Explore every corner without the burden of heavy bags. Your hands are free to capture memories, embrace moments, and connect with the world around you.",
      image: "/images/travel-handfree.jpg",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: Wallet,
      title: "Save Travelling Costs",
      subtitle: "Smart Savings for Smart Travelers",
      description:
        "No need for expensive hotel check-ins just to store bags. Pay only when you drop off - transparent pricing that respects your budget. Every rupee saved is another memory you can afford to make.",
      image: "/images/save-costs.jpg",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Camera,
      title: "Don't Leave Memories Behind",
      subtitle: "Protect What Matters Most",
      description:
        "Your loving devotions, precious souvenirs, and cherished belongings deserve safe keeping. We understand that every item tells a story - let us protect your memories while you create new ones.",
      image: "/images/memories-safe.jpg",
      gradient: "from-blue-500 to-cyan-500",
    },
  ]

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Complete Security",
      description: "Insurance coverage up to ₹15,000 for your peace of mind",
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "From 2 hours to 24 hours - store as per your travel needs",
    },
    {
      icon: MapPin,
      title: "Nationwide Network",
      description: "Trusted partners across major Indian cities and spiritual destinations",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emotional Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Why Choose <span className="text-red-600">Baggages?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Because every journey deserves to be experienced fully, without the weight of worry or the burden of
            belongings.
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20 mb-12 sm:mb-16 lg:mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
            >
              <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                <div
                  className={`inline-flex p-3 rounded-full bg-gradient-to-r ${feature.gradient} text-white mx-auto lg:mx-0`}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-base sm:text-lg text-red-600 font-semibold mb-3 sm:mb-4">{feature.subtitle}</p>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h4>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
