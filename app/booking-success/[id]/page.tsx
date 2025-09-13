"use client"

import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  Download,
  Share2,
  Home,
  Package,
  Clock,
  User,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function BookingSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const bookingId = params.id as string
  const paymentId = searchParams.get("paymentId")
  const amount = searchParams.get("amount")
  const method = searchParams.get("method")
  const customer = searchParams.get("customer")
  const bags = searchParams.get("bags")
  const duration = searchParams.get("duration")

  const handleDownloadReceipt = () => {
    // Generate receipt content
    const receiptContent = `
BAGGAGES - BOOKING RECEIPT
========================

Booking ID: ${bookingId}
Payment ID: ${paymentId}
Customer: ${customer}
Amount Paid: ₹${amount}
Payment Method: ${method?.toUpperCase()}
Bags: ${bags}
Duration: ${duration}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Thank you for using Baggages!
    `

    // Create and download file
    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `baggages-receipt-${bookingId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleShareReceipt = async () => {
    const shareData = {
      title: "Baggages Booking Confirmation",
      text: `Booking confirmed! ID: ${bookingId}, Amount: ₹${amount}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback - copy to clipboard
      const textToCopy = `Baggages Booking Confirmed!\nBooking ID: ${bookingId}\nAmount: ₹${amount}\nCustomer: ${customer}`
      navigator.clipboard.writeText(textToCopy)
      alert("Booking details copied to clipboard!")
    }
  }

  const partnerEarnings = amount ? Math.round(Number.parseFloat(amount) * 0.6) : 0
  const platformFee = amount ? Math.round(Number.parseFloat(amount) * 0.4) : 0

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <Card>
          <CardHeader>
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl sm:text-3xl text-green-800">Booking Successful!</CardTitle>
              <p className="text-gray-600 mt-2">Payment confirmed and bags stored securely</p>
            </div>
          </CardHeader>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Package className="w-5 h-5 mr-2" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-semibold">{bookingId}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold">{customer}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Number of Bags</p>
                  <p className="font-semibold">
                    {bags} bag{Number.parseInt(bags || "0") > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{duration}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="font-semibold text-green-800">{paymentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-green-800 capitalize">{method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="font-bold text-xl text-green-600">₹{amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Completed
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Package className="w-5 h-5 mr-2" />
              Partner Revenue (60% Share)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">₹{partnerEarnings}</div>
                <p className="text-sm text-blue-700">Your earnings from this booking</p>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex justify-between text-xs text-blue-600">
                    <span>Platform Fee (40%): ₹{platformFee}</span>
                    <span>Your Share (60%): ₹{partnerEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    1
                  </span>
                  Store the customer's {bags} bag{Number.parseInt(bags || "0") > 1 ? "s" : ""} in a secure location
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    2
                  </span>
                  Provide storage receipt/tag to customer
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    3
                  </span>
                  Customer will return with QR code for pickup
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                    4
                  </span>
                  Scan QR code to verify and release bags
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleDownloadReceipt} className="h-12 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShareReceipt} className="h-12 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Details
            </Button>
          </div>

          <Button
            className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
            onClick={() => router.push("/partner-dashboard")}
          >
            <Package className="w-4 h-4 mr-2" />
            Process New Booking
          </Button>

          <Button variant="outline" className="w-full h-12 bg-transparent" onClick={() => router.push("/")}>
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Contact Support */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Need help with this booking?</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Phone className="w-3 h-3 mr-2" />
                  Call Support
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-3 h-3 mr-2" />
                  Find Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
