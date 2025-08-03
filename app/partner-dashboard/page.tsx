"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QRScanner } from "@/components/qr-scanner"
import { PaymentOptions } from "@/components/payment-options"
import { PaymentSuccess } from "@/components/payment-success"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Package, DollarSign, Users, TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function PartnerDashboardPage() {
  const [currentStep, setCurrentStep] = useState<"dashboard" | "scanner" | "payment" | "success">("dashboard")
  const [scannedBooking, setScannedBooking] = useState<any>(null)
  const [paymentData, setPaymentData] = useState<any>(null)
  const [error, setError] = useState<string>("")

  // Mock partner data
  const partnerData = {
    name: "Delhi Central Storage Hub",
    totalBookings: 156,
    todayBookings: 8,
    monthlyEarnings: 12600,
    todayEarnings: 840,
    availableSlots: 35,
    totalSlots: 50,
    recentBookings: [
      {
        id: "BG1734441600000",
        customer: "Priya Sharma",
        bags: 2,
        amount: 195,
        status: "active",
        time: "14:30",
      },
      {
        id: "BG1734441700000",
        customer: "Rajesh Kumar",
        bags: 1,
        amount: 50,
        status: "completed",
        time: "09:00",
      },
      {
        id: "BG1734441800000",
        customer: "Anita Reddy",
        bags: 3,
        amount: 255,
        status: "pending",
        time: "08:00",
      },
    ],
  }

  const handleScanSuccess = (bookingData: any) => {
    setScannedBooking(bookingData)
    setCurrentStep("payment")
    setError("")
  }

  const handleScanError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handlePaymentComplete = (payment: any) => {
    setPaymentData(payment)
    setCurrentStep("success")
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleNewBooking = () => {
    setCurrentStep("scanner")
    setScannedBooking(null)
    setPaymentData(null)
    setError("")
  }

  const handleGoHome = () => {
    setCurrentStep("dashboard")
    setScannedBooking(null)
    setPaymentData(null)
    setError("")
  }

  const renderContent = () => {
    switch (currentStep) {
      case "scanner":
        return (
          <div className="space-y-6">
            {error && (
              <div className="max-w-md mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}
            <QRScanner onScanSuccess={handleScanSuccess} onScanError={handleScanError} />
            <div className="text-center">
              <Button variant="outline" onClick={handleGoHome}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        )

      case "payment":
        return (
          <div className="space-y-6">
            {error && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}
            <PaymentOptions
              bookingData={scannedBooking}
              onPaymentComplete={handlePaymentComplete}
              onPaymentError={handlePaymentError}
            />
            <div className="text-center">
              <Button variant="outline" onClick={() => setCurrentStep("scanner")}>
                Back to Scanner
              </Button>
            </div>
          </div>
        )

      case "success":
        return (
          <PaymentSuccess
            bookingData={scannedBooking}
            paymentData={paymentData}
            onNewBooking={handleNewBooking}
            onGoHome={handleGoHome}
          />
        )

      default:
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Available Slots</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {partnerData.availableSlots}/{partnerData.totalSlots}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{partnerData.todayBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">₹{partnerData.todayEarnings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">₹{partnerData.monthlyEarnings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <QrCode className="w-6 h-6 mr-2" />
                    New Customer Check-in
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Scan customer QR code to verify booking and collect payment</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setCurrentStep("scanner")}>
                    Start QR Scanner
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-6 h-6 mr-2" />
                    Storage Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Occupied:</span>
                      <span className="font-medium">{partnerData.totalSlots - partnerData.availableSlots} slots</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="font-medium text-green-600">{partnerData.availableSlots} slots</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full"
                        style={{
                          width: `${((partnerData.totalSlots - partnerData.availableSlots) / partnerData.totalSlots) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnerData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-600">
                            {booking.bags} bag{booking.bags > 1 ? "s" : ""} • {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">₹{booking.amount}</span>
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "active"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {booking.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {booking.status === "active" && <Clock className="w-3 h-3 mr-1" />}
                          {booking.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Partner Dashboard</h1>
          <p className="text-gray-600">{partnerData.name}</p>
        </div>

        {renderContent()}
      </main>

      <Footer />
    </div>
  )
}
