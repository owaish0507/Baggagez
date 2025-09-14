"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Package, TrendingUp, TrendingDown, ArrowRight, CheckCircle } from "lucide-react"

interface BaggagePickupProps {
  bookingId: string
}

export function BaggagePickup({ bookingId }: BaggagePickupProps) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [actualDuration, setActualDuration] = useState(0)
  const [finalAmount, setFinalAmount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [upgradeCharges, setUpgradeCharges] = useState(0)
  const [pickupType, setPickupType] = useState<"early" | "ontime" | "late">("ontime")

  useEffect(() => {
    // Get booking data from session storage
    const storedBookingData = sessionStorage.getItem("bookingData")
    if (storedBookingData) {
      const data = JSON.parse(storedBookingData)
      setBookingData(data)
      calculateFinalBill(data)
    }
  }, [])

  const calculateFinalBill = (data: any) => {
    const dropOffTime = new Date(data.actualDropOffTime)
    const pickupTime = new Date()
    const actualDurationHours = (pickupTime.getTime() - dropOffTime.getTime()) / (1000 * 60 * 60)
    const plannedDurationHours = Number.parseInt(data.duration)

    setActualDuration(actualDurationHours)

    let finalPrice = data.totalPrice
    const discountAmount = 0
    let upgradeAmount = 0

    // Early pickup (30+ minutes early)
    if (actualDurationHours < plannedDurationHours - 0.5) {
      setPickupType("early")
      // Remove discount calculation - no discount for early pickup
      finalPrice = data.totalPrice
    }
    // Late pickup (beyond buffer time)
    else if (actualDurationHours > plannedDurationHours + 0.33) {
      setPickupType("late")
      // Calculate upgrade charges based on next plan
      const plans = [
        { hours: 2, price: 30 },
        { hours: 4, price: 50 },
        { hours: 6, price: 70 },
        { hours: 8, price: 90 },
        { hours: 12, price: 120 },
        { hours: 24, price: 199 },
      ]

      const currentPlanIndex = plans.findIndex((p) => p.hours === plannedDurationHours)
      if (currentPlanIndex < plans.length - 1) {
        const nextPlan = plans[currentPlanIndex + 1]
        upgradeAmount = nextPlan.price - plans[currentPlanIndex].price
        finalPrice = data.totalPrice + upgradeAmount
      }
    }
    // On-time pickup
    else {
      setPickupType("ontime")
    }

    setDiscount(discountAmount)
    setUpgradeCharges(upgradeAmount)
    setFinalAmount(finalPrice)
  }

  const handleProceedToPayment = () => {
    // Update booking data with final amounts
    const updatedBookingData = {
      ...bookingData,
      actualDuration,
      finalAmount,
      discount,
      upgradeCharges,
      pickupType,
      pickupTime: new Date().toISOString(),
    }

    sessionStorage.setItem("finalBookingData", JSON.stringify(updatedBookingData))
    router.push(`/final-payment/${bookingId}`)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-2 sm:px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading pickup details...</p>
        </div>
      </div>
    )
  }

  const formatDuration = (hours: number) => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    return `${h}h ${m}m`
  }

  return (
    <div className="w-full max-w-none px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Baggage Pickup</h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Booking ID: {bookingId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Duration Analysis */}
            <Card className="border-0 sm:border shadow-none sm:shadow-sm">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Duration Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-blue-800 mb-1 text-xs sm:text-sm">Planned Duration</h4>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                      {bookingData.duration} Hours
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-green-800 mb-1 text-xs sm:text-sm">Actual Duration</h4>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                      {formatDuration(actualDuration)}
                    </p>
                  </div>
                </div>

                {/* Pickup Status */}
                {pickupType === "early" && (
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 text-sm sm:text-base">Early Pickup</h4>
                      <p className="text-xs sm:text-sm text-green-700 mt-1">
                        You're picking up {formatDuration(Number.parseInt(bookingData.duration) - actualDuration)}{" "}
                        early. Thank you for the timely pickup!
                      </p>
                    </div>
                  </div>
                )}

                {pickupType === "late" && (
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-800 text-sm sm:text-base">
                        Late Pickup - Upgrade Applied
                      </h4>
                      <p className="text-xs sm:text-sm text-orange-700 mt-1">
                        Storage exceeded planned duration. Upgrade charges applied.
                      </p>
                    </div>
                  </div>
                )}

                {pickupType === "ontime" && (
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800 text-sm sm:text-base">Perfect Timing!</h4>
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        Pickup within planned duration. No additional charges.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Final Bill Breakdown */}
            <Card className="border-0 sm:border shadow-none sm:shadow-sm">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center text-base sm:text-lg md:text-xl">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Final Bill Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between py-2 text-sm sm:text-base">
                    <span>Original Amount:</span>
                    <span className="font-medium">₹{bookingData.totalPrice}</span>
                  </div>

                  {upgradeCharges > 0 && (
                    <div className="flex justify-between py-2 text-orange-600 text-sm sm:text-base">
                      <span>Late Pickup Upgrade:</span>
                      <span className="font-medium">+₹{upgradeCharges}</span>
                    </div>
                  )}

                  <div className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-bold">
                    <span>Final Amount:</span>
                    <span className="text-red-600">₹{finalAmount}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Payment Details</h4>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <p>• Secure payment processing</p>
                    <p>• Multiple payment options available</p>
                    <p>• QR code generated after payment</p>
                    <p>• Instant confirmation</p>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full bg-red-600 hover:bg-red-700 h-10 sm:h-12 text-sm sm:text-base md:text-lg"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 sm:border shadow-none sm:shadow-sm lg:sticky lg:top-20">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg md:text-xl">Pickup Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600">Partner:</span>
                    <span className="text-right font-medium max-w-[60%]">{bookingData.partnerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bags:</span>
                    <span className="font-medium">{bookingData.requestedBags}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Planned:</span>
                    <span className="font-medium">{bookingData.duration}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual:</span>
                    <span className="font-medium">{formatDuration(actualDuration)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <Badge
                      variant={pickupType === "early" ? "default" : pickupType === "late" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {pickupType === "early" ? "Early" : pickupType === "late" ? "Late" : "On Time"}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between font-bold text-sm sm:text-base md:text-lg">
                    <span>Final Amount:</span>
                    <span className="text-red-600">₹{finalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
