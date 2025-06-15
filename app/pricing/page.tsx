import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users } from "lucide-react"

export default function PricingPage() {
  const pricingData = [
    { duration: "2 Hours", base: 30, insurance: 75 },
    { duration: "4 Hours", base: 50, insurance: 115 },
    { duration: "6 Hours", base: 70, insurance: 155 },
    { duration: "8 Hours", base: 90, insurance: 195 },
    { duration: "12 Hours", base: 120, insurance: 255 },
    { duration: "24 Hours", base: 199, insurance: 350 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing & Insurance Options</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our pricing structure is based on storage duration calculated from your drop-off and pick-up times, using an
            even number system for fair and consistent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-red-800">Standard Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingData.map((item) => (
                  <div key={item.duration} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.duration}</span>
                    <span className="text-xl font-bold text-red-800">₹{item.base}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                With Basic Insurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pricingData.map((item) => (
                  <div key={item.duration} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">{item.duration}</span>
                    <span className="text-xl font-bold text-red-800">₹{item.insurance}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-red-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-red-800" />
                <div>
                  <h3 className="font-semibold text-lg">Insurance Coverage</h3>
                  <p className="text-gray-600">Protection for your belongings</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Standard Coverage:</span>
                  <span className="font-semibold">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Basic Insurance Coverage:</span>
                  <span className="font-semibold">₹15,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-red-800" />
                <div>
                  <h3 className="font-semibold text-lg">Pricing Structure</h3>
                  <p className="text-gray-600">Fair and transparent</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Pricing is calculated based on the duration between your selected drop-off and pick-up times. We use
                  an even number system where odd numbers are rounded up to the next even number for consistent and fair
                  pricing.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-red-100 bg-red-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-red-800 mb-3">Important Notes</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                • Our pricing structure is designed to be competitive and flexible, catering to various needs and
                durations.
              </p>
              <p>• Prices are set using a pair-based system, ensuring fairness for customers with multiple bags.</p>
              <p>
                • We offer transparent rates, clearly displayed within the app, with options for customers to choose
                between storing their luggage without insurance, or with premium insurance coverage.
              </p>
              <p>
                • This tiered approach allows customers to select the level of protection that best suits their needs,
                providing peace of mind for valuable belongings.
              </p>
              <p>
                • <strong>NOTE!</strong> For damage the customer gets up to the given amount with or without insurance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
