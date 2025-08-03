import { DollarSign, Users, Shield, Clock, TrendingUp, Award } from "lucide-react"

export function PartnerBenefits() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Guaranteed Revenue Share",
      description:
        "Earn 60% of every booking with our standardized pricing. No price wars, no undercutting - just consistent income from ₹18-119 per booking based on duration.",
    },
    {
      icon: Users,
      title: "Connect with Travelers",
      description:
        "Don't let meaningful connections be left behind. Meet travelers from around the world and become part of their journey stories.",
    },
    {
      icon: Shield,
      title: "Complete Protection",
      description:
        "All stored items are covered by our comprehensive insurance policy. We protect what matters most - their loving devotion and your peace of mind.",
    },
    {
      icon: Clock,
      title: "Flexible Partnership",
      description:
        "Set your own operating hours that work for your lifestyle. Travel hand-free in your business approach - we adapt to you.",
    },
    {
      icon: TrendingUp,
      title: "Growing Opportunity",
      description:
        "Tourism is booming across India. Save travelling costs for visitors while building a sustainable income source for yourself.",
    },
    {
      icon: TrendingUp,
      title: "Transparent Pricing Model",
      description:
        "Fixed pricing across all partners ensures fairness and customer trust. Focus on service quality, not price competition.",
    },
    {
      icon: Award,
      title: "Trusted Recognition",
      description:
        "Get featured as a verified partner in your area. Build reputation while helping others make every moment count in their travels.",
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Partner With <span className="text-red-600">Baggages?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "Don't let this opportunity be left behind." Join thousands of partners across India who are earning extra
            income while helping travelers explore freely and save travelling costs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-800 text-center mb-6">Your Earnings Breakdown (60% Share)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-green-700 mb-3">Base Pricing Earnings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>2 hours:</span>
                  <span className="font-bold">₹18</span>
                </div>
                <div className="flex justify-between">
                  <span>4 hours:</span>
                  <span className="font-bold">₹30</span>
                </div>
                <div className="flex justify-between">
                  <span>6 hours:</span>
                  <span className="font-bold">₹42</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours:</span>
                  <span className="font-bold">₹54</span>
                </div>
                <div className="flex justify-between">
                  <span>12 hours:</span>
                  <span className="font-bold">₹72</span>
                </div>
                <div className="flex justify-between">
                  <span>24 hours:</span>
                  <span className="font-bold">₹119</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-700 mb-3">With Insurance Earnings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>2 hours:</span>
                  <span className="font-bold">₹45</span>
                </div>
                <div className="flex justify-between">
                  <span>4 hours:</span>
                  <span className="font-bold">₹69</span>
                </div>
                <div className="flex justify-between">
                  <span>6 hours:</span>
                  <span className="font-bold">₹93</span>
                </div>
                <div className="flex justify-between">
                  <span>8 hours:</span>
                  <span className="font-bold">₹117</span>
                </div>
                <div className="flex justify-between">
                  <span>12 hours:</span>
                  <span className="font-bold">₹153</span>
                </div>
                <div className="flex justify-between">
                  <span>24 hours:</span>
                  <span className="font-bold">₹210</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-green-700 mb-3">Monthly Potential</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-green-800">₹5,400 - ₹25,200</div>
                  <div className="text-xs text-green-600">Based on 3-10 bookings/day</div>
                </div>
                <div className="text-xs text-green-600 mt-2">
                  <p>• Low season: ₹5,400/month</p>
                  <p>• Peak season: ₹25,200/month</p>
                  <p>• Average: ₹12,600/month</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-sm text-green-700">
              <strong>Plus:</strong> Weekly payouts • No setup costs • Marketing support • 24/7 customer service • Price per 2 bags
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
