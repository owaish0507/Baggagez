"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Share2, Star, CheckCircle, MapPin, Phone, Clock } from "lucide-react"

interface PickupQRCodeProps {
  bookingId: string
}

export function PickupQRCode({ bookingId }: PickupQRCodeProps) {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [qrCodeData, setQrCodeData] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showRating, setShowRating] = useState(false)

  useEffect(() => {
    // Get payment data from session storage
    const storedPaymentData = sessionStorage.getItem("paymentData")
    if (storedPaymentData) {
      const data = JSON.parse(storedPaymentData)
      setPaymentData(data)

      // Generate QR code data
      const qrData = `BAGGAGEZ-PICKUP:${bookingId}:${data.paymentId}:${data.partnerName}`
      setQrCodeData(qrData)
    }
  }, [bookingId])

  const handleDownloadQR = () => {
    // Create a canvas element to generate QR code image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 300
    canvas.height = 300

    if (ctx) {
      // Simple QR code representation (in real app, use a QR library)
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, 300, 300)
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(20, 20, 260, 260)
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText("QR CODE", 130, 150)
      ctx.fillText(bookingId, 120, 170)
    }

    // Download the canvas as image
    const link = document.createElement("a")
    link.download = `pickup-qr-${bookingId}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Baggage Pickup QR Code",
          text: `Pickup QR for booking ${bookingId}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleRatingSubmit = () => {
    // Store rating data
    const ratingData = {
      bookingId,
      rating,
      feedback,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(`rating-${bookingId}`, JSON.stringify(ratingData))
    alert("Thank you for your feedback!")
    setShowRating(false)

    // Redirect to home page
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Generating QR code...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-none px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Payment Successful!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Your baggage pickup QR code is ready</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* QR Code Section */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
              {/* QR Code Display */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center justify-center text-base sm:text-lg">
                    <QrCode className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Pickup QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4 sm:space-y-6">
                  {/* QR Code Display */}
                  <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center p-2 sm:p-4">
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_6118570613170882920_y.jpg-Zl2TTNeB3U7WKpUvqHh1xcpbck8Hwu.jpeg"
                        alt={`QR Code for booking ${bookingId}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Button onClick={handleDownloadQR} variant="outline" className="text-xs sm:text-sm bg-transparent">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleShareQR} variant="outline" className="text-xs sm:text-sm bg-transparent">
                      <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">How to Use</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1 text-left">
                      <li>• Show this QR code to the storage partner</li>
                      <li>• Partner will scan to verify your booking</li>
                      <li>• Collect your baggage after verification</li>
                      <li>• Keep this QR code until pickup is complete</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Partner Information */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Pickup Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{paymentData.partnerName}</h3>
                      <p className="text-sm sm:text-base text-gray-600">Secure Storage Facility</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          +91-9876543210
                        </span>
                        <Badge variant="secondary" className="self-start sm:self-center">
                          Open 24/7
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">Pickup Instructions</h4>
                    <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
                      <li>• Arrive at the storage location</li>
                      <li>• Present your QR code to the partner</li>
                      <li>• Verify your identity with ID proof</li>
                      <li>• Collect your baggage and check contents</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Rating Section */}
              {!showRating ? (
                <Card>
                  <CardContent className="text-center py-4 sm:py-6 md:py-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">How was your experience?</h3>
                    <Button
                      onClick={() => setShowRating(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Rate Your Experience
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg">Rate Your Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                            star <= rating ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <Star className="w-4 h-4 sm:w-5 sm:h-5" fill={star <= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>

                    <textarea
                      placeholder="Share your feedback (optional)"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none text-sm sm:text-base"
                      rows={3}
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={handleRatingSubmit}
                        disabled={rating === 0}
                        className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                      >
                        Submit Rating
                      </Button>
                      <Button
                        onClick={() => setShowRating(false)}
                        variant="outline"
                        className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                      >
                        Skip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-20">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Booking Complete</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Booking ID:</span>
                      <span className="font-mono text-xs">{bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="font-mono text-xs">{paymentData.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Paid:</span>
                      <span className="font-semibold">₹{paymentData.finalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="capitalize">{paymentData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="default" className="bg-green-600">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t pt-3 sm:pt-4">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Next Steps</h4>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Visit pickup location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <QrCode className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Show QR code to partner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Collect your baggage</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="w-full h-10 sm:h-12 text-sm sm:text-base"
                  >
                    Back to Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
