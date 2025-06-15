import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="text-2xl text-red-800">Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Pricing Policy</h2>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-red-800 mb-2">Even Number Pricing System</h3>
              <p className="text-gray-700 mb-2">
                Our pricing is structured on an even number system for fairness and efficiency:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                <li>
                  <strong>Bags:</strong> Odd numbers are charged as the next even number (3 bags = charged for 4 bags)
                </li>
                <li>
                  <strong>Duration:</strong> Odd hours are charged as the next even hour (3 hours = charged for 4 hours)
                </li>
                <li>Examples: 1 bag → 2 bags, 3 bags → 4 bags, 5 bags → 6 bags</li>
                <li>Examples: 1 hour → 2 hours, 3 hours → 4 hours, 5 hours → 6 hours</li>
              </ul>
              <p className="text-gray-700">
                This system ensures optimal space utilization, fair pricing structure, and simplified billing for all
                customers.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-red-800 mb-4">Storage Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Duration:</strong> Storage is available from 2 hours up to 24 hours. Extensions may be available
                subject to availability.
              </p>

              <p>
                <strong>Payment:</strong> Payment is due at the time of bag drop-off. Show your QR code to our partner
                and complete payment on-site.
              </p>

              <p>
                <strong>Insurance:</strong> Basic insurance coverage up to ₹15,000 is available for an additional fee.
                This covers damage or loss of items.
              </p>

              <p>
                <strong>Liability:</strong> Baggage is not responsible for items exceeding the insured value. Customers
                are advised to declare valuable items.
              </p>

              <p>
                <strong>Prohibited Items:</strong> Hazardous materials, perishables, illegal items, and fragile
                electronics are not permitted.
              </p>

              <p>
                <strong>Collection:</strong> Bags must be collected within the booked time period. Late collection may
                incur additional charges.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-red-800 mb-4 mt-8">Cancellation Policy</h2>
            <div className="space-y-2 text-gray-700">
              <p>• Free cancellation up to 2 hours before drop-off time</p>
              <p>• 50% refund for cancellations within 2 hours of drop-off</p>
              <p>• No refund for no-shows</p>
            </div>

            <h2 className="text-xl font-semibold text-red-800 mb-4 mt-8">Contact Information</h2>
            <p className="text-gray-700">
              For questions about pricing, terms, or support, please contact us at support@baggage.com or call
              +91-XXXX-XXXXXX.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
