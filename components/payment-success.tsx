"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Share2, Home, Package } from "lucide-react"

interface PaymentSuccessProps {
  bookingData: any
  paymentData: any
  onNewBooking: () => void
  onGoHome: () => void
}

export function PaymentSuccess({ bookingData, paymentData, onNewBooking, onGoHome }: PaymentSuccessProps) {
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt downloaded successfully!")
  }

  const handleShareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: "Baggages Payment Receipt",
        text: `Payment completed for booking ${bookingData.bookingId}`,
        url: window.location.href,
      })
    } else {
      // Fallback to copying receipt details
      const receiptDetails = `
Baggages Payment Receipt
Booking ID: ${bookingData.bookingId}
Customer: ${bookingData.customerName}
Amount: ₹${bookingData.totalAmount}
Payment ID: ${paymentData.paymentId}
Status: Completed
      `
      navigator.clipboard.writeText(receiptDetails)
      alert("Receipt details copied to clipboard!")
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Payment Successful!</CardTitle>
            <p className="text-gray-600 mt-2">Booking confirmed and payment collected</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3">Payment Receipt</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-medium">{paymentData.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-medium">{bookingData.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium">{bookingData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium capitalize">{paymentData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-medium">{new Date(paymentData.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Amount Paid:</span>
                <span className="text-green-600">₹{bookingData.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleDownloadReceipt}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={handleShareReceipt}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={onNewBooking}>
              Process New Booking
            </Button>

            <Button variant="outline" className="w-full" onClick={onGoHome}>
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Partner Revenue Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h5 className="font-semibold text-gray-800 mb-2">Your Earnings (60%)</h5>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{Math.round(bookingData.totalAmount * 0.6)}</div>
              <div className="text-xs text-gray-600">Platform fee: ₹{Math.round(bookingData.totalAmount * 0.4)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
