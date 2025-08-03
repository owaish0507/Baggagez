"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Clock, Info, ArrowLeft } from "lucide-react"
import { format, parseISO, isValid, isToday, isTomorrow } from "date-fns"

interface BookingFormProps {
  partnerId: string
}

export function BookingForm({ partnerId }: BookingFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get("date")
  const dateDisplay = searchParams.get("dateDisplay") || "Today"

  // Parse the date
  const bookingDate = selectedDate ? parseISO(selectedDate) : new Date()
  const isValidBookingDate = isValid(bookingDate)

  // Helper function to get date display text
  const getDateDisplayText = () => {
    if (!isValidBookingDate) return "Today"

    if (isToday(bookingDate)) {
      return "Today"
    } else if (isTomorrow(bookingDate)) {
      return "Tomorrow"
    } else {
      return format(bookingDate, "MMM dd, yyyy")
    }
  }

  const [selectedDuration, setSelectedDuration] = useState("8")
  const [withInsurance, setWithInsurance] = useState(false)
  const [requestedBags, setRequestedBags] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupTime: "",
    dropoffTime: "",
  })

  const [aadharData, setAadharData] = useState({
    aadharNumber: "",
    otp: "",
    isOtpSent: false,
    isVerified: false,
    linkedMobile: "",
  })

  const [isUpdatingTimes, setIsUpdatingTimes] = useState(false)

  const handleSendOtp = async () => {
    if (aadharData.aadharNumber.length !== 12) {
      alert("Please enter a valid 12-digit AADHAR number")
      return
    }

    // Mock API call - in real implementation, this would call UIDAI API
    const mockLinkedNumber = "+91-" + aadharData.aadharNumber.slice(-4) + "XXXX"
    setAadharData((prev) => ({
      ...prev,
      isOtpSent: true,
      linkedMobile: mockLinkedNumber,
    }))
    alert(`OTP sent to ${mockLinkedNumber}`)
  }

  const handleVerifyOtp = async () => {
    if (aadharData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    // Accept any 6-digit OTP for demo purposes
    setAadharData((prev) => ({ ...prev, isVerified: true }))
    alert("AADHAR verified successfully!")
  }

  // Remove the automatic duration upgrade logic - keep duration selection manual only
  useEffect(() => {
    // Auto-upgrade duration if pickup/dropoff time exceeds selected plan by more than 20 minutes
    if (formData.pickupTime && formData.dropoffTime && !isUpdatingTimes) {
      const pickup = new Date(`2024-01-01T${formData.pickupTime}:00`)
      const dropoff = new Date(`2024-01-01T${formData.dropoffTime}:00`)

      // Handle next day scenario
      if (dropoff < pickup) {
        dropoff.setDate(dropoff.getDate() + 1)
      }

      const diffMs = dropoff.getTime() - pickup.getTime()
      const diffHours = diffMs / (1000 * 60 * 60)
      const selectedHours = Number.parseInt(selectedDuration)

      // Check if calculated duration exceeds selected plan by more than 20 minutes (0.33 hours)
      if (diffHours > selectedHours + 0.33) {
        // Find the next appropriate duration
        const availableHours = durations.map((d) => Number.parseInt(d.hours)).sort((a, b) => a - b)

        for (const hours of availableHours) {
          if (diffHours <= hours + 0.33) {
            setSelectedDuration(hours.toString())
            break
          }
        }
      }
    }
  }, [formData.pickupTime, formData.dropoffTime, isUpdatingTimes, selectedDuration])

  const allocatedBags = requestedBags % 2 === 0 ? requestedBags : requestedBags + 1

  const durations = [
    { hours: "2", price: 30, priceWithInsurance: 75 },
    { hours: "4", price: 50, priceWithInsurance: 115 },
    { hours: "6", price: 70, priceWithInsurance: 155 },
    { hours: "8", price: 90, priceWithInsurance: 195 },
    { hours: "12", price: 120, priceWithInsurance: 255 },
    { hours: "24", price: 199, priceWithInsurance: 350 },
  ]

  const selectedPlan = durations.find((d) => d.hours === selectedDuration)
  const bagPairs = Math.ceil(requestedBags / 2)
  const basePrice = selectedPlan?.price || 0
  const basePriceWithInsurance = selectedPlan?.priceWithInsurance || 0
  const totalPrice = withInsurance ? basePriceWithInsurance * bagPairs : basePrice * bagPairs

  // Mock partner data - would fetch from API
  const partner = {
    name: "Delhi Central Storage Hub",
    maxBaggageLimit: 50,
    currentAvailableBags: 35,
  }

  const canAccommodate = allocatedBags <= (partner.currentAvailableBags || 0)

  const handleGoBack = () => {
    router.back()
  }

  const handleProceedToPayment = () => {
    // Validate form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.pickupTime ||
      !formData.dropoffTime ||
      !aadharData.isVerified
    ) {
      alert("Please fill in all required fields and verify your AADHAR number")
      return
    }

    if (!canAccommodate) {
      alert("Insufficient space available for your booking")
      return
    }

    // Store booking data in sessionStorage for payment page
    const bookingData = {
      partnerId,
      partnerName: partner.name,
      duration: selectedDuration,
      requestedBags,
      allocatedBags,
      withInsurance,
      totalPrice,
      customerDetails: formData,
    }

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData))
    router.push(`/payment/${partnerId}`)
  }

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration)

    // Auto-update times when duration is selected
    setIsUpdatingTimes(true)
    const now = new Date()
    const pickupTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

    const dropoffDate = new Date(now)
    dropoffDate.setHours(dropoffDate.getHours() + Number.parseInt(duration))
    const dropoffTime = `${dropoffDate.getHours().toString().padStart(2, "0")}:${dropoffDate.getMinutes().toString().padStart(2, "0")}`

    setFormData((prev) => ({
      ...prev,
      pickupTime: pickupTime,
      dropoffTime: dropoffTime,
    }))

    // Reset the flag after a brief delay
    setTimeout(() => setIsUpdatingTimes(false), 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <Button variant="outline" onClick={handleGoBack} className="mb-4 h-10 sm:h-auto bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to Partner Details</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">
            {partner.name} • {getDateDisplayText()}
            {isValidBookingDate && !isToday(bookingDate) && (
              <span className="text-gray-500 ml-1">({format(bookingDate, "EEEE")})</span>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="h-12"
                      required
                    />
                  </div>

                  {/* AADHAR Verification Section */}
                  <div className="space-y-3">
                    <Label htmlFor="aadhar">AADHAR Number *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="aadhar"
                        placeholder="Enter 12-digit AADHAR number"
                        value={aadharData.aadharNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 12)
                          setAadharData((prev) => ({ ...prev, aadharNumber: value }))
                        }}
                        className="h-12 flex-1"
                        maxLength={12}
                        disabled={aadharData.isVerified}
                        required
                      />
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={
                          aadharData.aadharNumber.length !== 12 || aadharData.isOtpSent || aadharData.isVerified
                        }
                        className="h-12 px-4 bg-blue-600 hover:bg-blue-700"
                      >
                        {aadharData.isVerified ? "Verified" : aadharData.isOtpSent ? "OTP Sent" : "Send OTP"}
                      </Button>
                    </div>

                    {aadharData.isOtpSent && !aadharData.isVerified && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">OTP sent to linked mobile: {aadharData.linkedMobile}</p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter 6-digit OTP"
                            value={aadharData.otp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                              setAadharData((prev) => ({ ...prev, otp: value }))
                            }}
                            className="h-12 flex-1"
                            maxLength={6}
                          />
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={aadharData.otp.length !== 6}
                            className="h-12 px-4 bg-green-600 hover:bg-green-700"
                          >
                            Verify OTP
                          </Button>
                        </div>
                      </div>
                    )}

                    {aadharData.isVerified && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm text-green-800 font-medium">AADHAR verified successfully</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91-XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="h-12"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bags">Number of Bags *</Label>
                    <Select
                      value={requestedBags.toString()}
                      onValueChange={(value) => setRequestedBags(Number.parseInt(value))}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Bag{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {requestedBags !== allocatedBags && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-blue-800">
                          <strong>Note:</strong> Storage slots are allocated in multiples of 2 for optimal organization.
                          You'll get {allocatedBags} slots for your {requestedBags} bag{requestedBags > 1 ? "s" : ""} at
                          no extra cost.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!canAccommodate && (
                  <div className="flex items-start gap-2 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800">Insufficient Space</h4>
                      <p className="text-sm text-red-700">
                        This partner cannot accommodate {allocatedBags} bags. Only {partner.currentAvailableBags} slots
                        available.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Pickup & Drop-off Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, pickupTime: e.target.value }))
                        // Auto-update drop-off time when pickup time changes
                        if (e.target.value && selectedDuration) {
                          setIsUpdatingTimes(true)
                          const [hours, minutes] = e.target.value.split(":").map(Number)
                          const pickupDate = new Date()
                          pickupDate.setHours(hours, minutes, 0, 0)

                          const dropoffDate = new Date(pickupDate)
                          dropoffDate.setHours(dropoffDate.getHours() + Number.parseInt(selectedDuration))

                          const dropoffTime = `${dropoffDate.getHours().toString().padStart(2, "0")}:${dropoffDate.getMinutes().toString().padStart(2, "0")}`
                          setFormData((prev) => ({ ...prev, dropoffTime: dropoffTime }))

                          setTimeout(() => setIsUpdatingTimes(false), 100)
                        }
                      }}
                      className="h-12"
                      min={(() => {
                        const now = new Date()
                        const hours = now.getHours().toString().padStart(2, "0")
                        const minutes = now.getMinutes().toString().padStart(2, "0")
                        return `${hours}:${minutes}`
                      })()}
                      required
                    />
                    <p className="text-xs text-blue-600 mt-1">✓ Auto-set based on current time</p>
                    <p className="text-xs text-red-600 mt-1">⚠️ Arrive within 30 minutes or charges will auto-upgrade</p>
                  </div>
                  <div>
                    <Label htmlFor="dropoffTime">Drop-off Time *</Label>
                    <Input
                      id="dropoffTime"
                      type="time"
                      value={formData.dropoffTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dropoffTime: e.target.value }))}
                      className="h-12"
                      min={
                        formData.pickupTime ||
                        (() => {
                          const now = new Date()
                          const hours = now.getHours().toString().padStart(2, "0")
                          const minutes = now.getMinutes().toString().padStart(2, "0")
                          return `${hours}:${minutes}`
                        })()
                      }
                      required
                    />
                    <p className="text-xs text-blue-600 mt-1">
                      ✓ Auto-calculated based on pickup time + selected duration
                    </p>
                    <p className="text-xs text-gray-500 mt-1">You can manually adjust if needed</p>
                  </div>

                  {/* Auto-Set Times Button */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsUpdatingTimes(true)
                        const now = new Date()
                        const pickupTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

                        const dropoffDate = new Date(now)
                        dropoffDate.setHours(dropoffDate.getHours() + Number.parseInt(selectedDuration))
                        const dropoffTime = `${dropoffDate.getHours().toString().padStart(2, "0")}:${dropoffDate.getMinutes().toString().padStart(2, "0")}`

                        setFormData((prev) => ({
                          ...prev,
                          pickupTime: pickupTime,
                          dropoffTime: dropoffTime,
                        }))

                        setTimeout(() => setIsUpdatingTimes(false), 100)
                      }}
                      className="flex-1"
                    >
                      🕐 Set Current Time
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          pickupTime: "",
                          dropoffTime: "",
                        }))
                      }}
                      className="flex-1"
                    >
                      🗑️ Clear Times
                    </Button>
                  </div>

                  {/* Real-time Duration Display */}
                  {formData.pickupTime && formData.dropoffTime && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Calculated Duration</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        {(() => {
                          const pickup = new Date(`2024-01-01T${formData.pickupTime}:00`)
                          const dropoff = new Date(`2024-01-01T${formData.dropoffTime}:00`)

                          // Handle next day scenario
                          if (dropoff < pickup) {
                            dropoff.setDate(dropoff.getDate() + 1)
                          }

                          const diffMs = dropoff.getTime() - pickup.getTime()
                          const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
                          const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
                          const totalHours = diffMs / (1000 * 60 * 60)

                          // Check if calculated duration matches selected duration
                          const selectedHours = Number.parseInt(selectedDuration)
                          const isMatching = Math.abs(totalHours - selectedHours) < 0.1 // Within 6 minutes tolerance

                          return (
                            <div>
                              <p className="font-medium text-lg text-blue-800">
                                {diffHours}h {diffMinutes}m
                              </p>
                              <p className="text-xs mt-1">
                                From {formData.pickupTime} to {formData.dropoffTime}
                                {dropoff.getDate() !== pickup.getDate() && " (next day)"}
                              </p>
                              <div className="mt-2 flex items-center gap-1">
                                {isMatching ? (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    ✓ Matches {selectedDuration}h plan perfectly
                                  </span>
                                ) : (
                                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                    ⚠️ Duration mismatch - Selected: {selectedDuration}h, Calculated:{" "}
                                    {totalHours.toFixed(1)}h
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Duration Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Select Duration</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {durations.map((duration) => {
                    return (
                      <div
                        key={duration.hours}
                        className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                          selectedDuration === duration.hours
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                        onClick={() => handleDurationSelect(duration.hours)}
                      >
                        <div className="text-center">
                          <h4 className="font-semibold text-sm sm:text-base">{duration.hours} Hours</h4>
                          <p className="text-lg sm:text-2xl font-bold text-red-600">₹{duration.price}</p>
                          <p className="text-xs sm:text-sm text-gray-500">Without Insurance</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {formData.pickupTime && formData.dropoffTime && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-blue-800">
                        Duration will automatically upgrade if your pickup/dropoff time exceeds the selected plan by
                        more than 20 minutes.
                        {(() => {
                          const pickup = new Date(`2024-01-01T${formData.pickupTime}:00`)
                          const dropoff = new Date(`2024-01-01T${formData.dropoffTime}:00`)
                          if (dropoff < pickup) dropoff.setDate(dropoff.getDate() + 1)

                          const diffHours = (dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60)
                          const selectedHours = Number.parseInt(selectedDuration)

                          if (diffHours > selectedHours + 0.33) {
                            return " Your current time selection requires a higher duration plan."
                          } else {
                            return " Your current selection fits within the chosen plan."
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 sm:mt-6 flex items-center space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={withInsurance}
                    onCheckedChange={(checked) => setWithInsurance(checked as boolean)}
                  />
                  <Label htmlFor="insurance" className="text-sm cursor-pointer">
                    Add Insurance Coverage (₹{selectedPlan?.priceWithInsurance! - selectedPlan?.price!} extra)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Clock className="w-5 h-5 mr-2" />
                  Cancellation Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Free Cancellation</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>
                      • <strong>Free cancellation up to 30 minutes after booking</strong>
                    </li>
                    <li>• Full refund will be processed within 3-5 business days</li>
                    <li>• After 30 minutes, cancellation charges may apply</li>
                    <li>• No-show policy: 50% of booking amount will be charged</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{selectedDuration} Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Bags:</span>
                      <span>{requestedBags}</span>
                    </div>
                    {requestedBags !== allocatedBags && <div className="flex justify-between text-blue-600"></div>}
                    <div className="flex justify-between">
                      <span>Base Price ({selectedDuration}h):</span>
                      <span>₹{selectedPlan?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bag Pairs ({bagPairs}):</span>
                      <span>×{bagPairs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{basePrice * bagPairs}</span>
                    </div>
                    {withInsurance && (
                      <div className="flex justify-between">
                        <span>Insurance ({bagPairs} pairs):</span>
                        <span>₹{(basePriceWithInsurance - basePrice) * bagPairs}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-red-600">₹{totalPrice}</span>
                    </div>
                  </div>

                  {canAccommodate ? (
                    <Button className="w-full bg-red-600 hover:bg-red-700 h-12" onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </Button>
                  ) : (
                    <Button disabled className="w-full h-12">
                      Insufficient Space Available
                    </Button>
                  )}

                  <div className="text-xs text-gray-500 text-center">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Free cancellation up to 30 mins after booking
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
