import { Heart, CreditCard, Camera } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  const features = [
    {
      icon: Heart,
      title: "Travel Hand-Free",
      description:
        "Explore every corner without the burden of heavy bags. Your hands are free to capture memories, not carry luggage.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: CreditCard,
      title: "Save Travelling Costs",
      description:
        "No need for expensive hotel check-ins just to store bags. Pay only when you drop off - smart savings for smart travelers.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Camera,
      title: "Don't Leave Memories Behind",
      description:
        "Your loving devotions, souvenirs, and precious belongings deserve safe keeping. We protect what matters to you.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <feature.icon className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
