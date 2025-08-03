"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Camera, Type, CheckCircle } from "lucide-react"

interface QRScannerProps {
  onScanSuccess: (bookingData: any) => void
  onScanError: (error: string) => void
}

export function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera")
  const [manualCode, setManualCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)

  // Mock QR codes for demo
  const mockBookings = {
    BG1734441600000: {
      bookingId: "BG1734441600000",
      customerName: "Priya Sharma",
      partnerName: "Delhi Central Storage Hub",
      bags: 2,
      duration: "8 hours",
      totalAmount: 195,
      pickupTime: "14:30",
      dropoffTime: "22:30",
      withInsurance: true,
      status: "confirmed",
    },
    BG1734441700000: {
      bookingId: "BG1734441700000",
      customerName: "Rajesh Kumar",
      partnerName: "Golden Temple Storage Service",
      bags: 1,
      duration: "4 hours",
      totalAmount: 50,
      pickupTime: "09:00",
      dropoffTime: "13:00",
      withInsurance: false,
      status: "confirmed",
    },
    BG1734441800000: {
      bookingId: "BG1734441800000",
      customerName: "Anita Reddy",
      partnerName: "Bangalore Tech Hub Storage",
      bags: 3,
      duration: "12 hours",
      totalAmount: 255,
      pickupTime: "08:00",
      dropoffTime: "20:00",
      withInsurance: true,
      status: "confirmed",
    },
  }

  const handleCameraScan = () => {
    setIsScanning(true)

    // Simulate camera scanning
    setTimeout(() => {
      const randomBookingId = Object.keys(mockBookings)[Math.floor(Math.random() * Object.keys(mockBookings).length)]
      const bookingData = mockBookings[randomBookingId as keyof typeof mockBookings]

      setScanResult(bookingData)
      setIsScanning(false)
      onScanSuccess(bookingData)
    }, 2000)
  }

  const handleManualEntry = () => {
    if (!manualCode.trim()) {
      onScanError("Please enter a booking ID")
      return
    }

    const bookingData = mockBookings[manualCode as keyof typeof mockBookings]

    if (bookingData) {
      setScanResult(bookingData)
      onScanSuccess(bookingData)
    } else {
      onScanError("Invalid booking ID. Please check and try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center">
            <QrCode className="w-6 h-6 mr-2" />
            Scan Customer QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scan Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={scanMode === "camera" ? "default" : "outline"}
              onClick={() => setScanMode("camera")}
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
            <Button
              variant={scanMode === "manual" ? "default" : "outline"}
              onClick={() => setScanMode("manual")}
              className="flex-1"
            >
              <Type className="w-4 h-4 mr-2" />
              Manual
            </Button>
          </div>

          {/* Camera Scan Mode */}
          {scanMode === "camera" && (
            <div className="space-y-4">
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600">Scanning QR Code...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Position QR code within the frame</p>
                  </div>
                )}
              </div>

              <Button onClick={handleCameraScan} disabled={isScanning} className="w-full bg-red-600 hover:bg-red-700">
                {isScanning ? "Scanning..." : "Start Camera Scan"}
              </Button>
            </div>
          )}

          {/* Manual Entry Mode */}
          {scanMode === "manual" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bookingId">Enter Booking ID</Label>
                <Input
                  id="bookingId"
                  placeholder="e.g., BG1734441600000"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Demo IDs: BG1734441600000, BG1734441700000, BG1734441800000
                </p>
              </div>

              <Button onClick={handleManualEntry} className="w-full bg-red-600 hover:bg-red-700">
                Verify Booking
              </Button>
            </div>
          )}

          {/* Scan Result */}
          {scanResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">Booking Verified!</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span className="font-medium">{scanResult.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-medium">{scanResult.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bags:</span>
                  <span className="font-medium">{scanResult.bags}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{scanResult.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium text-green-600">₹{scanResult.totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
