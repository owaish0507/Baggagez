"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { QrCode, Download, Share2, CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function QRCodePage({ params }: { params: { bookingId: string } }) {
  const searchParams = useSearchParams()
  const price = searchParams.get("price")
  const duration = searchParams.get("duration")
  const chargedDuration = searchParams.get("chargedDuration")
  const insurance = searchParams.get("insurance") === "true"
  const bags = searchParams.get("bags") || "1"
  const chargedBags = searchParams.get("chargedBags") || bags
  const [paymentComplete, setPaymentComplete] = useState(false)
  const dropOff = searchParams.get("dropOff")
  const pickUp = searchParams.get("pickUp")

  const handlePaymentComplete = () => {
    setPaymentComplete(true)
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-800 mb-2">Booking Complete!</h1>
              <p className="text-green-700 mb-4">
                Your {bags} bag{Number.parseInt(bags) > 1 ? "s are" : " is"} now safely stored. You can collect them
                anytime during your booked duration.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold">Booking ID: {params.bookingId}</p>
                <p>Bags: {bags}</p>
                <p>Duration: {duration} hours</p>
                <p>Total Paid: ₹{price}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="border-red-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-800">Your Booking QR Code</CardTitle>
            <p className="text-gray-600">Show this to our partner when dropping off your bags</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-64 h-64 bg-white border-2 border-red-200 rounded-lg mx-auto flex items-center justify-center mb-4">
                <div className="text-center">
                  <QrCode className="w-32 h-32 text-red-800 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">QR Code</p>
                  <p className="font-mono text-xs">{params.bookingId}</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" className="border-red-200">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="border-red-200">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-mono">{params.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Bags:</span>
                  <span>
                    {bags} bag{Number.parseInt(bags) > 1 ? "s" : ""}
                    {bags !== chargedBags && <span className="text-gray-500"> (charged for {chargedBags})</span>}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>
                    {duration} hours
                    {duration !== chargedDuration && (
                      <span className="text-gray-500"> (charged for {chargedDuration}h)</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Drop-off:</span>
                  <span>{dropOff}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pick-up:</span>
                  <span>{pickUp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>{insurance ? "Yes (₹15,000 coverage)" : "No"}</span>
                </div>
              </div>
              {(bags !== chargedBags || duration !== chargedDuration) && (
                <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Pricing based on even numbers for fair structure.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Next Steps</h3>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Go to Central Station Storage</li>
                <li>2. Show this QR code to our partner</li>
                <li>
                  3. Pay ₹{price} when dropping off your {bags} bag{Number.parseInt(bags) > 1 ? "s" : ""}
                </li>
                <li>4. Collect your bags by {pickUp}</li>
              </ol>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Simulate payment completion (for demo purposes)</p>
              <Button onClick={handlePaymentComplete} className="bg-green-600 hover:bg-green-700 text-white">
                Complete Payment & Storage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
