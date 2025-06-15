import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Shield, Star, Users, Clock, CheckCircle, Heart, Wallet, Camera } from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SwipeableGallery } from "@/components/swipeable-gallery"

export default function HomePage() {
  const heroImages = ["/hero-travel.jpg", "/hands-free-travel.jpg", "/family-travel.jpg"]
  const benefitImages = {
    handsFree: ["/hands-free-travel.jpg", "/tourist-spots.jpg"],
    savings: ["/secure-storage.jpg", "/station-storage.jpg"],
    memories: ["/family-travel.jpg", "/hero-travel.jpg"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />

      {/* Hero Section with Swipeable Gallery */}
      <section className="relative py-8 md:py-12 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SwipeableGallery images={heroImages} alt="Travel background" className="w-full h-full opacity-10" />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            <span className="text-red-800">Travel Hand-Free</span>
            <br />
            Store Your Memories Safely
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-2">
            Don't let your loving devotion be left behind. Store your bags with our trusted partners and explore freely.
            <span className="text-red-700 font-semibold block md:inline"> Save travelling costs</span> and make every
            moment count.
          </p>

          <SearchForm />

          <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Near me</span>
          </div>
        </div>
      </section>

      {/* Benefits Section with Swipeable Images */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-red-200 hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-4 md:p-6">
                <SwipeableGallery
                  images={benefitImages.handsFree}
                  alt="Hands-free travel"
                  className="w-full h-32 sm:h-40 md:h-48 mb-4"
                />
                <Heart className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">Travel Hand-Free</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Explore every corner without the burden of heavy bags. Your hands are free to capture memories, not
                  carry luggage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-4 md:p-6">
                <SwipeableGallery
                  images={benefitImages.savings}
                  alt="Save costs"
                  className="w-full h-32 sm:h-40 md:h-48 mb-4"
                />
                <Wallet className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">Save Travelling Costs</h3>
                <p className="text-sm md:text-base text-gray-600">
                  No need for expensive hotel check-ins just to store bags. Pay only when you drop off - smart savings
                  for smart travelers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-4 md:p-6">
                <SwipeableGallery
                  images={benefitImages.memories}
                  alt="Protect memories"
                  className="w-full h-32 sm:h-40 md:h-48 mb-4"
                />
                <Camera className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">Don't Leave Memories Behind</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Your loving devotions, souvenirs, and precious belongings deserve safe keeping. We protect what
                  matters to you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/tourist-spots.jpg" alt="Tourist spots" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-1 md:gap-2 mb-2 md:mb-3">
              <Star className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 md:w-5 h-4 md:h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">+1M bags safely stored 4.9 (250k+)</h2>
            <p className="text-red-100 text-sm md:text-base">Trusted by travelers who value freedom and security</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">1M+</div>
              <div className="text-red-100 font-medium">Happy Travelers</div>
              <div className="text-xs md:text-sm text-red-200">Who chose hand-free exploration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">500+</div>
              <div className="text-red-100 font-medium">Trusted Partners</div>
              <div className="text-xs md:text-sm text-red-200">Keeping your memories safe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold mb-2">₹2000+</div>
              <div className="text-red-100 font-medium">Average Savings</div>
              <div className="text-xs md:text-sm text-red-200">Per trip on accommodation costs</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-3 text-gray-900">
            Your Journey to Freedom
          </h2>
          <p className="text-center text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
            Three simple steps to transform your travel experience. No more dragging bags, no more missed opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 md:w-14 h-12 md:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <MapPin className="w-6 md:w-7 h-6 md:h-7 text-red-800" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">1. Find Your Safe Haven</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Discover trusted storage partners near stations, airports, and tourist attractions. Your perfect
                  storage spot is just a click away.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 md:w-14 h-12 md:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Users className="w-6 md:w-7 h-6 md:h-7 text-red-800" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">2. Drop & Pay Smart</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Show your QR code, pay only what you use. No upfront costs, no hidden fees. Your wallet stays as light
                  as your shoulders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="w-12 md:w-14 h-12 md:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <CheckCircle className="w-6 md:w-7 h-6 md:h-7 text-red-800" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">3. Explore & Create</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Wander freely, capture moments, make memories. Your belongings are safe while you live your best
                  travel life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 md:py-12 bg-red-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-3 text-gray-900">
            Why Travelers Choose Baggage?
          </h2>
          <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Because every journey deserves to be extraordinary
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <Shield className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Fort Knox Security</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Your precious memories protected with insurance up to ₹15,000
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Time is Yours</h3>
              <p className="text-xs md:text-sm text-gray-600">
                From 2 hours to full days - store as long as your adventure lasts
              </p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Prime Locations</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Strategic spots near stations, airports & must-see attractions
              </p>
            </div>
            <div className="text-center">
              <Users className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Trusted Community</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Verified partners who understand the value of your belongings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 md:mb-3 text-gray-900">Stories of Freedom</h2>
          <p className="text-center text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            Real travelers, real experiences, real freedom
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-red-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  "Finally could explore Mumbai hands-free! The QR code system was so smooth. Saved ₹3000 on hotel early
                  check-in just to store bags. My souvenirs were safe and I was free!"
                </p>
                <div className="font-semibold text-gray-900 text-sm md:text-base">Priya S.</div>
                <div className="text-xs md:text-sm text-gray-500">Solo Traveler from Delhi</div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  "Perfect for airport layovers! Didn't have to drag my family's luggage around the city. The kids could
                  run free, we could take photos without worrying about bags. Brilliant service!"
                </p>
                <div className="font-semibold text-gray-900 text-sm md:text-base">Rahul M.</div>
                <div className="text-xs md:text-sm text-gray-500">Family Traveler</div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  "My wedding shopping bags were precious cargo! Baggage kept them safe while I explored more markets.
                  No more tired arms, no more missed opportunities. Every bride needs this!"
                </p>
                <div className="font-semibold text-gray-900 text-sm md:text-base">Anjali K.</div>
                <div className="text-xs md:text-sm text-gray-500">Destination Shopper</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-red-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Ready to Travel Hand-Free?</h2>
          <p className="text-lg md:text-xl mb-4 md:mb-6 text-red-100">
            Don't let heavy bags steal your travel joy. Join millions who've discovered the freedom of hands-free
            exploration.
          </p>
          <SearchForm />
          <p className="mt-4 md:mt-6 text-red-200 text-xs md:text-sm">
            ✨ Pay only when you drop off • 🔒 Insured up to ₹15,000 • ⭐ 4.9/5 rating from 250k+ travelers
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
