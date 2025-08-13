"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin, Phone, Package, AlertTriangle, ArrowRight } from "lucide-react"

interface BaggageDropOffProps {
  bookingId: string
}

export function BaggageDropOff({ bookingId }: BaggageDropOffProps) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [isDroppedOff, setIsDroppedOff] = useState(false)
  const [countdown, setCountdown] = useState("")
  const [currentPlan, setCurrentPlan] = useState("")
  const [hasUpgraded, setHasUpgraded] = useState(false)
  const [dropOffTime, setDropOffTime] = useState<Date | null>(null)

  useEffect(() => {
    // Get booking data from session storage
    const storedBookingData = sessionStorage.getItem("bookingData")
    if (storedBookingData) {
      const data = JSON.parse(storedBookingData)
      setBookingData(data)
      setCurrentPlan(data.duration)
    }
  }, [])

  useEffect(() => {
    if (isDroppedOff && dropOffTime) {
      const interval = setInterval(() => {
        const now = new Date()
        const elapsed = now.getTime() - dropOffTime.getTime()
        const plannedDuration = Number.parseInt(currentPlan) * 60 * 60 * 1000 // Convert hours to milliseconds
        const bufferTime = 20 * 60 * 1000 // 20 minutes buffer
        const totalAllowedTime = plannedDuration + bufferTime
        const remaining = totalAllowedTime - elapsed

        if (remaining <= 0) {
          // Auto upgrade to next plan
          const plans = ["2", "4", "6", "8", "12", "24"]
          const currentIndex = plans.indexOf(currentPlan)
          if (currentIndex < plans.length - 1) {
            const nextPlan = plans[currentIndex + 1]
            setCurrentPlan(nextPlan)
            setHasUpgraded(true)

            // Update booking data with new plan
            const updatedBookingData = { ...bookingData, duration: nextPlan, hasUpgraded: true }
            setBookingData(updatedBookingData)
            sessionStorage.setItem("bookingData", JSON.stringify(updatedBookingData))
          }
        } else {
          const hours = Math.floor(remaining / (1000 * 60 * 60))
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
          setCountdown(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          )
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isDroppedOff, dropOffTime, currentPlan, bookingData])

  const handleConfirmDropOff = () => {
    setIsDroppedOff(true)
    setDropOffTime(new Date())

    // Update booking data with drop-off time
    const updatedBookingData = {
      ...bookingData,
      actualDropOffTime: new Date().toISOString(),
      isDroppedOff: true,
    }
    setBookingData(updatedBookingData)
    sessionStorage.setItem("bookingData", JSON.stringify(updatedBookingData))
  }

  const handleRequestPickup = () => {
    router.push(`/pickup/${bookingId}`)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Baggage Drop-off</h1>
        <p className="text-gray-600">Booking ID: {bookingId}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Partner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Partner Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{bookingData.partnerName}</h3>
                  <p className="text-gray-600">Secure Storage Facility</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      +91-9876543210
                    </span>
                    <Badge variant="secondary">Verified Partner</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Drop-off Instructions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Present your booking confirmation to the partner</li>
                  <li>• Ensure all bags are properly tagged</li>
                  <li>• Take a photo of your bags for reference</li>
                  <li>• Confirm the drop-off time with the partner</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Booking Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Booking Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isDroppedOff ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready for Drop-off</h3>
                  <p className="text-gray-600 mb-6">Please confirm when you have dropped off your baggage</p>
                  <Button onClick={handleConfirmDropOff} className="bg-green-600 hover:bg-green-700" size="lg">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Confirm Drop-off
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Baggage Dropped Off Successfully</h4>
                      <p className="text-sm text-green-700">Dropped off at: {dropOffTime?.toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {hasUpgraded && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Plan Upgraded</h4>
                        <p className="text-sm text-orange-700">
                          Your storage duration has been automatically upgraded to {currentPlan} hours
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{countdown}</div>
                    <p className="text-gray-600 mb-4">Time remaining (including 20min buffer)</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={handleRequestPickup} className="bg-red-600 hover:bg-red-700" size="lg">
                        Request Pickup
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>

                      {(() => {
                        const now = new Date()
                        const timeSinceDropOff = dropOffTime ? (now.getTime() - dropOffTime.getTime()) / (1000 * 60) : 0 // minutes
                        const canCancel = timeSinceDropOff <= 30

                        return canCancel ? (
                          <Button
                            onClick={() => {
                              if (
                                confirm("Are you sure you want to cancel this booking? No charges will be applied.")
                              ) {
                                // Handle cancellation logic
                                sessionStorage.removeItem("bookingData")
                                router.push("/")
                              }
                            }}
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                            size="lg"
                          >
                            Cancel Booking (Free)
                          </Button>
                        ) : (
                          <div className="text-sm text-gray-500 mt-2">Cancellation not available after 30 minutes</div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span>{bookingData.customerDetails.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bags:</span>
                  <span>{bookingData.requestedBags}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Plan:</span>
                  <span className={hasUpgraded ? "text-orange-600 font-semibold" : ""}>{currentPlan} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>{bookingData.withInsurance ? "Yes" : "No"}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-red-600">₹{bookingData.totalPrice}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Important Notes</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 20-minute buffer time included</li>
                  <li>• Auto-upgrade if time exceeds</li>
                  <li>• Early pickup discount available</li>
                  <li>• Free cancellation within 30 mins</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
