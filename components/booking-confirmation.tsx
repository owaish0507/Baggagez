"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Share, MapPin, Clock, Phone, Home } from "lucide-react"

interface BookingConfirmationProps {
  partnerId: string
}

export function BookingConfirmation({ partnerId }: BookingConfirmationProps) {
  const router = useRouter()
  const [confirmationData, setConfirmationData] = useState<any>(null)

  useEffect(() => {
    // Get confirmation data from sessionStorage
    const storedData = sessionStorage.getItem("confirmationData")
    if (storedData) {
      setConfirmationData(JSON.parse(storedData))
    } else {
      // Redirect to home if no confirmation data found
      router.push("/")
    }
  }, [router])

  const handleDownloadQR = () => {
    // In a real app, this would generate and download the QR code
    alert("QR Code downloaded successfully!")
  }

  const handleShareBooking = () => {
    if (navigator.share && confirmationData) {
      navigator.share({
        title: "Baggages Booking Confirmation",
        text: `My baggage storage booking at ${confirmationData.partnerName}`,
        url: window.location.href,
      })
    } else {
      // Fallback to copying booking details
      const bookingDetails = `Booking ID: ${confirmationData?.bookingId}\nPartner: ${confirmationData?.partnerName}\nAmount: ₹${confirmationData?.totalPrice}`
      navigator.clipboard.writeText(bookingDetails)
      alert("Booking details copied to clipboard!")
    }
  }

  const handleGetDirections = () => {
    // Mock address - in real app would use actual partner address
    const address = "Paharganj, Near New Delhi Railway Station, New Delhi"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
  }

  const handleContactPartner = () => {
    alert(`Calling ${confirmationData?.partnerName}...\nPhone: +91-9876543210`)
  }

  const handleGoHome = () => {
    // Clean up session storage
    sessionStorage.removeItem("confirmationData")
    router.push("/")
  }

  const handleBookAnother = () => {
    sessionStorage.removeItem("confirmationData")
    router.push("/search-results")
  }

  if (!confirmationData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">Your luggage storage is successfully booked</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">Your QR Code</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="bg-white border-2 border-dashed border-red-300 rounded-lg p-8 mb-4">
            <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center rounded-lg border border-gray-300 relative overflow-hidden">
              <svg width="192" height="192" viewBox="0 0 192 192" className="w-full h-full">
                {/* Generate a realistic QR code pattern */}
                {Array.from({ length: 21 }, (_, row) =>
                  Array.from({ length: 21 }, (_, col) => {
                    // Create a pseudo-random pattern based on booking ID and position
                    const seed = confirmationData.bookingId.charCodeAt(0) + row * 21 + col
                    const isBlack = (seed * 9301 + 49297) % 233280 < 116640

                    // Corner squares (finder patterns)
                    const isCornerSquare = (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7)

                    if (isCornerSquare) {
                      const isOuterBorder =
                        row === 0 ||
                        row === 6 ||
                        col === 0 ||
                        col === 6 ||
                        (row < 7 && col === 14) ||
                        (row < 7 && col === 20) ||
                        (row === 6 && col > 13) ||
                        (row === 0 && col > 13) ||
                        (row > 13 && col === 0) ||
                        (row > 13 && col === 6) ||
                        (row === 14 && col < 7) ||
                        (row === 20 && col < 7)
                      const isInnerSquare =
                        (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
                        (row >= 2 && row <= 4 && col >= 16 && col <= 18) ||
                        (row >= 16 && row <= 18 && col >= 2 && col <= 4)

                      return (
                        <rect
                          key={`${row}-${col}`}
                          x={col * 9}
                          y={row * 9}
                          width="9"
                          height="9"
                          fill={isOuterBorder || isInnerSquare ? "#000" : "#fff"}
                        />
                      )
                    }

                    // Timing patterns
                    const isTimingPattern = (row === 6 && col > 7 && col < 14) || (col === 6 && row > 7 && row < 14)
                    if (isTimingPattern) {
                      return (
                        <rect
                          key={`${row}-${col}`}
                          x={col * 9}
                          y={row * 9}
                          width="9"
                          height="9"
                          fill={(row + col) % 2 === 0 ? "#000" : "#fff"}
                        />
                      )
                    }

                    // Data modules
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={col * 9}
                        y={row * 9}
                        width="9"
                        height="9"
                        fill={isBlack ? "#000" : "#fff"}
                      />
                    )
                  }),
                ).flat()}
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-600 mb-2">Booking ID: {confirmationData.bookingId}</p>
            <p className="text-sm text-gray-600">Show this QR code to the keeper partner</p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={handleDownloadQR}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareBooking}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Partner:</span>
            <span className="font-semibold">{confirmationData.partnerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Address:</span>
            <span>Paharganj, Near New Delhi Railway Station</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>Today, December 17, 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Pickup Time:</span>
            <span className="font-semibold text-red-600">{confirmationData.customerDetails.pickupTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Drop-off Time:</span>
            <span className="font-semibold text-red-600">{confirmationData.customerDetails.dropoffTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{confirmationData.duration} Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Number of Bags:</span>
            <span>{confirmationData.requestedBags}</span>
          </div>
          {confirmationData.requestedBags !== confirmationData.allocatedBags && (
            <div className="flex justify-between text-blue-600"></div>
          )}
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="capitalize">{confirmationData.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Paid:</span>
            <span className="font-bold text-red-600">₹{confirmationData.totalPrice}</span>
          </div>
        </CardContent>
      </Card>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-red-800 mb-2 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Important Instructions
        </h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Arrive within 30 minutes of your pickup time ({confirmationData.customerDetails.pickupTime})</li>
          <li>• Show this QR code to the keeper partner</li>
          <li>• Late arrival will automatically upgrade charges to next plan</li>
          <li>• Keep your booking ID safe: {confirmationData.bookingId}</li>
        </ul>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleGetDirections}>
            <MapPin className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          <Button variant="outline" onClick={handleContactPartner}>
            <Phone className="w-4 h-4 mr-2" />
            Contact Partner
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleBookAnother}>
            Book Another Storage
          </Button>
          <Button variant="outline" onClick={handleGoHome}>
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
