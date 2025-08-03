"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Shield, Smartphone, Building, Wallet, DollarSign, Globe, ArrowLeft } from "lucide-react"

interface PaymentFormProps {
  partnerId: string
}

export default function PaymentForm({ partnerId }: PaymentFormProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [bookingData, setBookingData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get booking data from sessionStorage
    const storedData = sessionStorage.getItem("bookingData")
    if (storedData) {
      setBookingData(JSON.parse(storedData))
    } else {
      // Redirect back to booking if no data found
      router.push(`/booking/${partnerId}`)
    }
  }, [partnerId, router])

  const paymentOptions = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay using Google Pay, PhonePe, Paytm, BHIM",
      popular: true,
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay, American Express",
      popular: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major banks supported",
      popular: false,
    },
    {
      id: "wallet",
      name: "Digital Wallets",
      icon: Wallet,
      description: "Paytm, Amazon Pay, Mobikwik, Freecharge",
      popular: false,
    },
    {
      id: "cash",
      name: "Cash on Pickup",
      icon: DollarSign,
      description: "Pay directly to the keeper partner",
      popular: false,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Globe,
      description: "International payments",
      popular: false,
    },
  ]

  const handleGoBack = () => {
    router.back()
  }

  const handleCompletePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Store final booking confirmation data
      const confirmationData = {
        ...bookingData,
        paymentMethod,
        bookingId: `BG${Date.now()}`,
        paymentStatus: "completed",
        bookingDate: new Date().toISOString(),
      }

      sessionStorage.setItem("confirmationData", JSON.stringify(confirmationData))
      sessionStorage.removeItem("bookingData") // Clean up

      router.push(`/confirmation/${partnerId}`)
    }, 2000)
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@paytm / yourname@gpay" />
            </div>
            <div className="text-sm text-gray-600">
              <p>Or scan QR code with your UPI app:</p>
              <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center rounded">
                  QR Code
                </div>
                <p className="text-xs text-gray-500">Scan with any UPI app</p>
              </div>
            </div>
          </div>
        )

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date *</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name *</Label>
              <Input id="cardName" placeholder="Name on card" />
            </div>
          </div>
        )

      case "netbanking":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Select Your Bank</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                  <SelectItem value="pnb">Punjab National Bank</SelectItem>
                  <SelectItem value="bob">Bank of Baroda</SelectItem>
                  <SelectItem value="canara">Canara Bank</SelectItem>
                  <SelectItem value="union">Union Bank of India</SelectItem>
                  <SelectItem value="other">Other Banks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              <p>You will be redirected to your bank's secure login page</p>
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="freecharge" id="freecharge" />
                  <Label htmlFor="freecharge">Freecharge</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="walletPhone">Mobile Number</Label>
              <Input id="walletPhone" placeholder="+91-XXXXXXXXXX" />
            </div>
          </div>
        )

      case "cash":
        return (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Cash Payment Instructions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Pay ₹{bookingData?.totalPrice} directly to the keeper partner</li>
                <li>• Carry exact change if possible</li>
                <li>• Get a receipt from the partner</li>
                <li>• Show your booking QR code first</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Important Note</h4>
              <p className="text-sm text-red-700">
                Cash payments are subject to partner availability. Some partners may not accept cash during peak hours.
              </p>
            </div>
          </div>
        )

      case "paypal":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="paypalEmail">PayPal Email</Label>
              <Input id="paypalEmail" type="email" placeholder="your-email@example.com" />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">International Payment</h4>
              <p className="text-sm text-blue-700">
                PayPal payments will be processed in USD. Current rate: ₹{bookingData?.totalPrice} ≈ $
                {((bookingData?.totalPrice || 0) / 83).toFixed(2)} USD
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!bookingData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={handleGoBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Booking Details
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Details</h1>
        <p className="text-gray-600">Complete your booking with secure payment</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {paymentOptions.find((opt) => opt.id === paymentMethod)?.icon &&
                  (() => {
                    const IconComponent = paymentOptions.find((opt) => opt.id === paymentMethod)?.icon
                    return IconComponent ? <IconComponent className="w-5 h-5 mr-2" /> : null
                  })()}
                {paymentOptions.find((opt) => opt.id === paymentMethod)?.name} Details
              </CardTitle>
            </CardHeader>
            <CardContent>{renderPaymentForm()}</CardContent>
          </Card>

          {/* Security Info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Your payment is secured with 256-bit SSL encryption and PCI DSS compliance</span>
          </div>

          {/* Payment Button */}
          <Button
            className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
            onClick={handleCompletePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing Payment..."
              : paymentMethod === "cash"
                ? "Confirm Booking (Pay at Pickup)"
                : `Complete Payment - ₹${bookingData.totalPrice}`}
          </Button>
        </div>

        {/* Final Bill Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Final Bill</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Partner:</span>
                  <span>{bookingData.partnerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>Today, Dec 17</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Time:</span>
                  <span>{bookingData.customerDetails.pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Drop-off Time:</span>
                  <span>{bookingData.customerDetails.dropoffTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{bookingData.duration} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Bags:</span>
                  <span>
                    {bookingData.requestedBags} Bag{bookingData.requestedBags > 1 ? "s" : ""}
                  </span>
                </div>
                {bookingData.requestedBags !== bookingData.allocatedBags && (
                  <div className="flex justify-between text-blue-600">
                    <span>Allocated Slots:</span>
                    <span>{bookingData.allocatedBags} (bonus!)</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>
                    ₹
                    {bookingData.withInsurance
                      ? bookingData.totalPrice - bookingData.totalPrice * 0.4
                      : bookingData.totalPrice}
                  </span>
                </div>
                {bookingData.withInsurance && (
                  <div className="flex justify-between">
                    <span>Insurance:</span>
                    <span>₹{Math.round(bookingData.totalPrice * 0.4)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-red-600">₹{bookingData.totalPrice}</span>
                </div>
              </div>

              {/* Payment Method Summary */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Payment Method:</span>
                  <span className="font-medium">{paymentOptions.find((opt) => opt.id === paymentMethod)?.name}</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800">
                <strong>Important:</strong> Arrive within 15 minutes of pickup time or charges will automatically
                upgrade to the next plan.
              </div>

              {/* Offers & Discounts */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 text-sm mb-1">Available Offers</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• First-time user: 10% off next booking</li>
                  <li>• UPI payment: ₹5 cashback</li>
                  <li>• Refer a friend: ₹50 credit</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
