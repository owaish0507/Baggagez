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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading pickup details...</p>
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Baggage Pickup</h1>
        <p className="text-gray-600">Booking ID: {bookingId}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Duration Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Duration Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-1">Planned Duration</h4>
                  <p className="text-2xl font-bold text-blue-600">{bookingData.duration} Hours</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-1">Actual Duration</h4>
                  <p className="text-2xl font-bold text-green-600">{formatDuration(actualDuration)}</p>
                </div>
              </div>

              {/* Pickup Status */}
              {pickupType === "early" && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Early Pickup</h4>
                    <p className="text-sm text-green-700">
                      You're picking up {formatDuration(Number.parseInt(bookingData.duration) - actualDuration)} early.
                      Thank you for the timely pickup!
                    </p>
                  </div>
                </div>
              )}

              {pickupType === "late" && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div>
                    <h4 className="font-semibold text-orange-800">Late Pickup - Upgrade Applied</h4>
                    <p className="text-sm text-orange-700">
                      Storage exceeded planned duration. Upgrade charges applied.
                    </p>
                  </div>
                </div>
              )}

              {pickupType === "ontime" && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Perfect Timing!</h4>
                    <p className="text-sm text-blue-700">Pickup within planned duration. No additional charges.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Final Bill Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Final Bill Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span>Original Amount:</span>
                  <span>₹{bookingData.totalPrice}</span>
                </div>

                {upgradeCharges > 0 && (
                  <div className="flex justify-between py-2 text-orange-600">
                    <span>Late Pickup Upgrade:</span>
                    <span>+₹{upgradeCharges}</span>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Final Amount:</span>
                  <span className="text-red-600">₹{finalAmount}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Payment Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Secure payment processing</p>
                  <p>• Multiple payment options available</p>
                  <p>• QR code generated after payment</p>
                  <p>• Instant confirmation</p>
                </div>
              </div>

              <Button onClick={handleProceedToPayment} className="w-full bg-red-600 hover:bg-red-700" size="lg">
                Proceed to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Pickup Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Partner:</span>
                  <span className="text-right">{bookingData.partnerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bags:</span>
                  <span>{bookingData.requestedBags}</span>
                </div>
                <div className="flex justify-between">
                  <span>Planned:</span>
                  <span>{bookingData.duration}h</span>
                </div>
                <div className="flex justify-between">
                  <span>Actual:</span>
                  <span>{formatDuration(actualDuration)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge
                    variant={pickupType === "early" ? "default" : pickupType === "late" ? "destructive" : "secondary"}
                  >
                    {pickupType === "early" ? "Early" : pickupType === "late" ? "Late" : "On Time"}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Final Amount:</span>
                  <span className="text-red-600">₹{finalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
