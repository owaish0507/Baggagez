"use client"

import { Star, Quote, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai Traveler",
      rating: 5,
      text: "Don't let your loving devotion be left behind - this service truly understands that! I could visit the Golden Temple with complete peace of mind, knowing my bags were safe. The pricing saved me from expensive hotel storage fees.",
      image: "/images/testimonial-priya.jpg",
      journey: "Spiritual Journey to Amritsar",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi Business Traveler",
      rating: 5,
      text: "Travel hand-free was exactly what I needed! Had a 6-hour layover and wanted to explore Red Fort. Instead of carrying heavy luggage, I stored it safely and saved travelling costs. Made every moment count!",
      image: "/images/testimonial-rajesh.jpg",
      journey: "Delhi Heritage Tour",
    },
    {
      name: "Anita Reddy",
      location: "Bangalore Tourist",
      rating: 5,
      text: "The emotional tagline 'Don't leave memories behind' really resonated with me. I had precious souvenirs from my Chennai temple visit, and their insurance coverage gave me complete confidence. Transparent pricing with no hidden costs!",
      image: "/images/testimonial-anita.jpg",
      journey: "South India Temple Circuit",
    },
    {
      name: "Vikram Singh",
      location: "Jaipur Explorer",
      rating: 5,
      text: "Save travelling costs - absolutely! Instead of booking expensive hotel rooms just for storage, I used Baggages near Hawa Mahal. Spent the whole day exploring hand-free. Every rupee saved was worth it!",
      image: "/images/testimonial-vikram.jpg",
      journey: "Rajasthan Heritage Tour",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stories from the <span className="text-red-600">Heart</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real travelers sharing how Baggages helped them create unforgettable memories without the burden of baggage
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative">
              <Quote className="w-8 h-8 text-red-200 absolute top-4 right-4" />

              <div className="flex items-center mb-6">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 italic">"{testimonial.text}"</p>

              <div className="border-t pt-4">
                <p className="text-red-600 font-semibold text-sm">{testimonial.journey}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <TestimonialCTA />
      </div>
    </section>
  )
}

function TestimonialCTA() {
  const router = useRouter()

  const handleStartJourney = () => {
    router.push("/search-results?location=Delhi NCR")
  }

  const handleFindStorage = () => {
    router.push("/search-results")
  }

  return (
    <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your Own Story?</h3>
      <p className="text-gray-600 mb-6">
        Join thousands of travelers who chose to travel hand-free and make every moment count
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          onClick={handleStartJourney}
        >
          Start Your Journey
        </Button>
        <Button
          variant="outline"
          className="border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors"
          onClick={handleFindStorage}
        >
          Find Storage Near You
        </Button>
      </div>
    </div>
  )
}
