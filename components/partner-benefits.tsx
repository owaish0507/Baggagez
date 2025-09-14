import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Shield, Clock, TrendingUp, Award, MapPin, Handshake, Star, CheckCircle } from "lucide-react"

export function PartnerBenefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Extra Income",
      description: "Generate additional revenue from your existing space with minimal effort",
      highlight: "₹15,000 - ₹30,000/month",
      color: "bg-green-50 border-green-200 text-green-800",
    },
    {
      icon: Users,
      title: "Increase Foot Traffic",
      description: "Attract more customers to your business through our platform",
      highlight: "200+ new visitors/month",
      color: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "All stored items are covered under our comprehensive insurance policy",
      highlight: "Up to ₹30,000 coverage",
      color: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Set your own operating hours that work with your business schedule",
      highlight: "Your schedule, your rules",
      color: "bg-orange-50 border-orange-200 text-orange-800",
    },
    {
      icon: TrendingUp,
      title: "Growing Market",
      description: "Join India's fastest-growing luggage storage network",
      highlight: "500% growth in 2024",
      color: "bg-red-50 border-red-200 text-red-800",
    },
    {
      icon: Award,
      title: "Premium Support",
      description: "24/7 customer support and dedicated partner success manager",
      highlight: "Always here to help",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
  ]

  const stats = [
    { number: "1000+", label: "Active Partners", icon: Handshake },
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "25+", label: "Cities Covered", icon: MapPin },
    { number: "4.8/5", label: "Partner Rating", icon: Star },
  ]

  const features = [
    "No upfront costs or setup fees",
    "Easy-to-use partner dashboard",
    "Real-time booking notifications",
    "Automated payment processing",
    "Marketing support and promotion",
    "Training and onboarding assistance",
    "Flexible storage space requirements",
    "Multiple revenue streams",
  ]

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
            Why Partner With Us?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
            Join thousands of successful partners who are earning extra income while helping travelers
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg sm:rounded-xl">
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-red-600 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 border-0 sm:border">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 bg-red-100 rounded-lg sm:rounded-xl">
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-white-900">
                    {benefit.title}
                  </CardTitle>
                </div>
                <Badge className={`${benefit.color} text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 w-fit`}>
                  {benefit.highlight}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs sm:text-sm md:text-base text-white-1000 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white-900 mb-4 sm:mb-6 md:mb-8 text-center">
            What You Get as a Partner
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-white-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Share Highlight */}
        <div className="mt-8 sm:mt-12 md:mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-white text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
            Keep 60% of Every Booking!
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed">
            Higher revenue share than any competitor. Start earning from day one with our transparent pricing model.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">₹100</div>
              <div className="text-xs sm:text-sm md:text-base opacity-80">Customer Pays</div>
            </div>
            <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">₹60</div>
              <div className="text-xs sm:text-sm md:text-base opacity-80">You Earn</div>
            </div>
            <div className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">₹40</div>
              <div className="text-xs sm:text-sm md:text-base opacity-80">Platform Fee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
