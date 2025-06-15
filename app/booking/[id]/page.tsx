"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { MapPin, Shield, Package, Clock, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [dropOffDate, setDropOffDate] = useState("")
  const [dropOffTime, setDropOffTime] = useState("")
  const [pickUpDate, setPickUpDate] = useState("")
  const [pickUpTime, setPickUpTime] = useState("")
  const [insurance, setInsurance] = useState(false)
  const [numberOfBags, setNumberOfBags] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const router = useRouter()

  // Set default dates to today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    setDropOffDate(today)
    setPickUpDate(today)
  }, [])

  const pricingTable = {
    "2": { base: 30, insurance: 75 },
    "4": { base: 50, insurance: 115 },
    "6": { base: 70, insurance: 155 },
    "8": { base: 90, insurance: 195 },
    "12": { base: 120, insurance: 255 },
    "24": { base: 199, insurance: 350 },
  }

  // Calculate duration and pricing
  const calculateDuration = () => {
    if (!dropOffDate || !dropOffTime || !pickUpDate || !pickUpTime) return 0

    const dropOff = new Date(`${dropOffDate}T${dropOffTime}`)
    const pickUp = new Date(`${pickUpDate}T${pickUpTime}`)

    const diffMs = pickUp.getTime() - dropOff.getTime()
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60))

    return Math.max(0, diffHours)
  }

  const getDurationCategory = (hours: number) => {
    if (hours <= 2) return "2"
    if (hours <= 4) return "4"
    if (hours <= 6) return "6"
    if (hours <= 8) return "8"
    if (hours <= 12) return "12"
    return "24"
  }

  const actualDuration = calculateDuration()
  // Round up odd duration to next even number
  const chargedDuration = actualDuration % 2 !== 0 ? actualDuration + 1 : actualDuration
  const durationCategory = getDurationCategory(chargedDuration)
  const currentPrice = pricingTable[durationCategory as keyof typeof pricingTable]

  // Round up odd number of bags to next even number
  const chargedBags = numberOfBags % 2 !== 0 ? numberOfBags + 1 : numberOfBags
  const numberOfPairs = Math.ceil(chargedBags / 2)
  const pricePerPair = insurance ? currentPrice.insurance : currentPrice.base
  const totalPrice = pricePerPair * numberOfPairs

  // Generate time options (only future times for today)
  const generateTimeOptions = (isDropOff: boolean, selectedDate: string) => {
    const options = []
    const now = new Date()
    const isToday = selectedDate === now.toISOString().split("T")[0]
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip past times for today
        if (isToday && (hour < currentHour || (hour === currentHour && minute <= currentMinute))) {
          continue
        }

        // For pick-up, ensure it's after drop-off time
        if (!isDropOff && dropOffDate && dropOffTime) {
          const dropOffDateTime = new Date(`${dropOffDate}T${dropOffTime}`)
          const currentDateTime = new Date(
            `${selectedDate}T${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
          )

          if (currentDateTime <= dropOffDateTime) {
            continue
          }
        }

        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        options.push(timeString)
      }
    }
    return options
  }

  const isValidBooking = () => {
    if (!dropOffDate || !dropOffTime || !pickUpDate || !pickUpTime) return false
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) return false

    const dropOff = new Date(`${dropOffDate}T${dropOffTime}`)
    const pickUp = new Date(`${pickUpDate}T${pickUpTime}`)

    return pickUp > dropOff
  }

  const handleBooking = () => {
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase()
    router.push(
      `/qr-code/${bookingId}?price=${totalPrice}&duration=${actualDuration}&chargedDuration=${chargedDuration}&insurance=${insurance}&bags=${numberOfBags}&chargedBags=${chargedBags}&dropOff=${dropOffDate} ${dropOffTime}&pickUp=${pickUpDate} ${pickUpTime}`,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            <Heart className="inline w-6 md:w-8 h-6 md:h-8 text-red-800 mr-2" />
            Secure Your Precious Belongings
          </h1>
          <p className="text-gray-600 text-sm md:text-base px-4">
            Don't let your loving devotion be left behind. Every item matters, every memory counts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4 md:space-y-6">
            <Card className="border-red-100">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-red-800 text-lg md:text-xl">Your Safe Haven</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <h3 className="font-semibold text-base md:text-lg mb-2">Central Station Storage</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4 text-sm md:text-base">
                  <MapPin className="w-4 h-4" />
                  Near Mumbai Central Station • 0.1 km
                </div>
                <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden">
                  <img src="/station-storage.jpg" alt="Storage location" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-xs md:text-sm text-green-700">
                    ✨ <strong>Freedom Awaits:</strong> Drop your bags and explore the city hands-free. Your belongings
                    will be safe while you create unforgettable memories.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-100">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-red-800 text-lg md:text-xl">Your Journey Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4 md:space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Your Precious Cargo</Label>
                  <div className="flex items-center gap-4">
                    <Package className="w-5 h-5 text-red-800" />
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNumberOfBags(Math.max(1, numberOfBags - 1))}
                        className="border-red-200 h-10 w-10 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold text-lg">{numberOfBags}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNumberOfBags(Math.min(10, numberOfBags + 1))}
                        className="border-red-200 h-10 w-10 p-0"
                      >
                        +
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600">bags (max 10)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Each bag contains memories worth protecting</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-800" />
                      Freedom Starts
                    </Label>
                    <div className="space-y-3">
                      <Input
                        type="date"
                        value={dropOffDate}
                        onChange={(e) => setDropOffDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="border-red-200 focus:border-red-400 h-12 text-base"
                      />
                      <select
                        value={dropOffTime}
                        onChange={(e) => setDropOffTime(e.target.value)}
                        className="w-full p-3 h-12 border border-red-200 rounded-md focus:border-red-400 focus:outline-none text-base"
                      >
                        <option value="">Select time</option>
                        {generateTimeOptions(true, dropOffDate).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-800" />
                      Reunion Time
                    </Label>
                    <div className="space-y-3">
                      <Input
                        type="date"
                        value={pickUpDate}
                        onChange={(e) => setPickUpDate(e.target.value)}
                        min={dropOffDate || new Date().toISOString().split("T")[0]}
                        className="border-red-200 focus:border-red-400 h-12 text-base"
                      />
                      <select
                        value={pickUpTime}
                        onChange={(e) => setPickUpTime(e.target.value)}
                        className="w-full p-3 h-12 border border-red-200 rounded-md focus:border-red-400 focus:outline-none text-base"
                        disabled={!dropOffDate || !dropOffTime}
                      >
                        <option value="">Select time</option>
                        {generateTimeOptions(false, pickUpDate).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {actualDuration > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold text-sm md:text-base">
                        Your Freedom Duration: {actualDuration} hours
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                  <Checkbox id="insurance" checked={insurance} onCheckedChange={setInsurance} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="insurance" className="cursor-pointer font-semibold text-sm md:text-base">
                      Protect Your Loving Devotion
                    </Label>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      Premium protection up to ₹15,000 for your precious belongings and memories
                    </p>
                  </div>
                  <Shield className="w-5 h-5 text-red-800 mt-1" />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Your Contact Information</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-sm">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="border-red-200 focus:border-red-400 h-12 text-base mt-1"
                        placeholder="The name behind the memories"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="border-red-200 focus:border-red-400 h-12 text-base mt-1"
                        placeholder="For your booking confirmation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="border-red-200 focus:border-red-400 h-12 text-base mt-1"
                        placeholder="Stay connected with your belongings"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-red-100 sticky top-20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-red-800 text-lg md:text-xl">Your Freedom Investment</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3 md:space-y-4">
                <div className="flex justify-between text-sm md:text-base">
                  <span>Precious Cargo</span>
                  <span className="font-semibold">
                    {numberOfBags} bags
                    {numberOfBags !== chargedBags && (
                      <span className="text-xs text-gray-500 block md:inline"> (charged for {chargedBags})</span>
                    )}
                  </span>
                </div>

                {dropOffDate && dropOffTime && (
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Freedom Starts</span>
                    <span className="font-semibold text-right">
                      {new Date(`${dropOffDate}T${dropOffTime}`).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                {pickUpDate && pickUpTime && (
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Reunion Time</span>
                    <span className="font-semibold text-right">
                      {new Date(`${pickUpDate}T${pickUpTime}`).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                {actualDuration > 0 && (
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Freedom Duration</span>
                    <span className="font-semibold">
                      {actualDuration} hours
                      {actualDuration !== chargedDuration && (
                        <span className="text-xs text-gray-500 block md:inline"> (charged for {chargedDuration}h)</span>
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm md:text-base">
                  <span>Storage Investment</span>
                  <span>
                    ₹{pricePerPair} × {numberOfPairs}
                  </span>
                </div>

                {insurance && (
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Memory Protection</span>
                    <span>
                      ₹{currentPrice.insurance - currentPrice.base} × {numberOfPairs}
                    </span>
                  </div>
                )}

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between text-lg md:text-xl font-bold">
                    <span>Total Investment</span>
                    <span className="text-red-800">₹{totalPrice}</span>
                  </div>
                </div>

                {(numberOfBags !== chargedBags || actualDuration !== chargedDuration) && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-1 text-sm md:text-base">Fair Pricing Note</h4>
                    <p className="text-xs md:text-sm text-blue-700">
                      We use even number pricing for fairness and efficiency.
                      {numberOfBags !== chargedBags && ` ${numberOfBags} bags charged as ${chargedBags} bags.`}
                      {actualDuration !== chargedDuration &&
                        ` ${actualDuration}h duration charged as ${chargedDuration}h.`}
                    </p>
                  </div>
                )}

                <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 text-sm md:text-base">Smart Payment Process</h4>
                  <p className="text-xs md:text-sm text-yellow-700">
                    You'll receive a QR code after booking. Show this to our trusted partner and pay ₹{totalPrice}{" "}
                    on-site when dropping off your {numberOfBags} precious bag{numberOfBags > 1 ? "s" : ""}. No upfront
                    payment needed!
                  </p>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full bg-red-800 hover:bg-red-900 text-white h-12 md:h-14 text-base md:text-lg font-semibold"
                  disabled={!isValidBooking()}
                >
                  🎯 Secure My Freedom Journey
                </Button>

                <p className="text-xs text-gray-500 text-center">By booking, you agree to our Terms & Conditions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
