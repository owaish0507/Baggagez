"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Smartphone, Building, Wallet, DollarSign, Clock } from "lucide-react"

interface PaymentOptionsProps {
  bookingData: any
  onPaymentComplete: (paymentData: any) => void
  onPaymentError: (error: string) => void
}

export function PaymentOptions({ bookingData, onPaymentComplete, onPaymentError }: PaymentOptionsProps) {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    bankName: "",
    walletPhone: "",
  })

  const paymentOptions = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm, BHIM",
      popular: true,
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      popular: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks",
      popular: false,
    },
    {
      id: "wallet",
      name: "Digital Wallets",
      icon: Wallet,
      description: "Paytm, Amazon Pay, Mobikwik",
      popular: false,
    },
    {
      id: "cash",
      name: "Cash Payment",
      icon: DollarSign,
      description: "Pay directly to partner",
      popular: false,
    },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)

    // Validate payment method
    if (paymentMethod === "upi" && !paymentForm.upiId) {
      onPaymentError("Please enter UPI ID")
      setIsProcessing(false)
      return
    }

    if (paymentMethod === "card" && (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv)) {
      onPaymentError("Please fill all card details")
      setIsProcessing(false)
      return
    }

    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        bookingId: bookingData.bookingId,
        paymentMethod,
        amount: bookingData.totalAmount,
        paymentId: `PAY${Date.now()}`,
        status: "completed",
        timestamp: new Date().toISOString(),
      }

      setIsProcessing(false)
      onPaymentComplete(paymentData)
    }, 2000)
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm / yourname@gpay"
                value={paymentForm.upiId}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, upiId: e.target.value }))}
                className="h-12"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">You will be redirected to your UPI app to complete the payment</p>
            </div>
          </div>
        )

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, cardNumber: e.target.value }))}
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentForm.expiryDate}
                  onChange={(e) => setPaymentForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm((prev) => ({ ...prev, cvv: e.target.value }))}
                  className="h-12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={paymentForm.cardName}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, cardName: e.target.value }))}
                className="h-12"
              />
            </div>
          </div>
        )

      case "netbanking":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Select Your Bank</Label>
              <Select onValueChange={(value) => setPaymentForm((prev) => ({ ...prev, bankName: value }))}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-700">You will be redirected to your bank's secure login page</p>
            </div>
          </div>
        )

      case "wallet":
        return (
          <div className="space-y-4">
            <div>
              <Label>Select Wallet</Label>
              <RadioGroup defaultValue="paytm" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paytm" id="paytm" />
                  <Label htmlFor="paytm">Paytm Wallet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amazonpay" id="amazonpay" />
                  <Label htmlFor="amazonpay">Amazon Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobikwik" id="mobikwik" />
                  <Label htmlFor="mobikwik">Mobikwik</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="walletPhone">Mobile Number</Label>
              <Input
                id="walletPhone"
                placeholder="+91-XXXXXXXXXX"
                value={paymentForm.walletPhone}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, walletPhone: e.target.value }))}
                className="h-12"
              />
            </div>
          </div>
        )

      case "cash":
        return (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Cash Payment Instructions</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Collect ₹{bookingData.totalAmount} from the customer</li>
                <li>• Provide a receipt for the payment</li>
                <li>• Mark the booking as paid in the system</li>
                <li>• Store the bags securely</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Payment Collection</CardTitle>
          <div className="text-center text-gray-600">Collect payment from {bookingData.customerName}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">Booking Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-medium">{bookingData.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium">{bookingData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{bookingData.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Bags:</span>
                <span className="font-medium">{bookingData.bags}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-red-600">₹{bookingData.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h4 className="font-semibold mb-4">Select Payment Method</h4>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {paymentOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === option.id ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <option.icon className="w-6 h-6 text-gray-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={option.id} className="font-medium cursor-pointer">
                        {option.name}
                      </Label>
                      {option.popular && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Popular</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Form */}
          <div>
            <h4 className="font-semibold mb-4">Payment Details</h4>
            {renderPaymentForm()}
          </div>

          {/* Payment Button */}
          <Button
            className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </>
            ) : paymentMethod === "cash" ? (
              `Confirm Cash Payment - ₹${bookingData.totalAmount}`
            ) : (
              `Collect Payment - ₹${bookingData.totalAmount}`
            )}
          </Button>

          {/* Security Note */}
          <div className="text-center text-xs text-gray-500">
            <Clock className="w-3 h-3 inline mr-1" />
            Secure payment processing • PCI DSS compliant
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
