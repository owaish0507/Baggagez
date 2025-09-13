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
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading booking details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-none px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Baggage Drop-off
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Booking ID: {bookingId}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
              {/* Partner Information */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Partner Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{bookingData.partnerName}</h3>
                      <p className="text-sm sm:text-base text-gray-600">Secure Storage Facility</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          +91-9876543210
                        </span>
                        <Badge variant="secondary" className="self-start sm:self-center">
                          Verified Partner
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Drop-off Instructions</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
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
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Booking Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isDroppedOff ? (
                    <div className="text-center py-4 sm:py-6 md:py-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Package className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready for Drop-off</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
                        Please confirm when you have dropped off your baggage
                      </p>
                      <Button
                        onClick={handleConfirmDropOff}
                        className="bg-green-600 hover:bg-green-700 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Confirm Drop-off
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-800 text-sm sm:text-base">
                            Baggage Dropped Off Successfully
                          </h4>
                          <p className="text-xs sm:text-sm text-green-700">
                            Dropped off at: {dropOffTime?.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {hasUpgraded && (
                        <div className="flex items-start gap-3 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-orange-800 text-sm sm:text-base">Plan Upgraded</h4>
                            <p className="text-xs sm:text-sm text-orange-700">
                              Your storage duration has been automatically upgraded to {currentPlan} hours
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="text-center py-4 sm:py-6">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">{countdown}</div>
                        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Time remaining</p>

                        <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
                          <Button
                            onClick={handleRequestPickup}
                            className="bg-red-600 hover:bg-red-700 h-10 sm:h-12 text-sm sm:text-base"
                          >
                            Request Pickup
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                          </Button>

                          {(() => {
                            const now = new Date()
                            const timeSinceDropOff = dropOffTime
                              ? (now.getTime() - dropOffTime.getTime()) / (1000 * 60)
                              : 0 // minutes
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
                                className="border-red-600 text-red-600 hover:bg-red-50 h-10 sm:h-12 text-sm sm:text-base"
                              >
                                Cancel Booking
                              </Button>
                            ) : (
                              <div className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                                Cancellation not available after 30 minutes
                              </div>
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
              <Card className="lg:sticky lg:top-20">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Customer:</span>
                      <span className="truncate ml-2">{bookingData.customerDetails.fullName}</span>
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
                    <div className="border-t pt-2 flex justify-between font-bold text-sm sm:text-base">
                      <span>Total:</span>
                      <span className="text-red-600">₹{bookingData.totalPrice}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-xs sm:text-sm mb-2">Important Notes</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 20-minute buffer time included</li>
                      <li>• Auto-upgrade if time exceeds</li>
                      <li>• Free cancellation within 30 mins</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
