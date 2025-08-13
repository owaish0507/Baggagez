"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building, Wallet, Lock, CheckCircle } from "lucide-react"

interface FinalPaymentProps {
  bookingId: string
}

export function FinalPayment({ bookingId }: FinalPaymentProps) {
  const router = useRouter()
  const [bookingData, setBookingData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    bankAccount: "",
    ifscCode: "",
    walletProvider: "paytm",
    paypalEmail: "",
    cryptoWallet: "",
    cryptoCurrency: "bitcoin",
    bnplProvider: "klarna",
  })

  useEffect(() => {
    // Get final booking data from session storage
    const storedBookingData = sessionStorage.getItem("finalBookingData")
    if (storedBookingData) {
      const data = JSON.parse(storedBookingData)
      setBookingData(data)
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }))
  }

  const validatePaymentForm = () => {
    switch (paymentMethod) {
      case "upi":
        return paymentForm.upiId.includes("@")
      case "card":
        return (
          paymentForm.cardNumber.length >= 16 &&
          paymentForm.expiryDate.length >= 5 &&
          paymentForm.cvv.length >= 3 &&
          paymentForm.cardName.length > 0
        )
      case "netbanking":
        return paymentForm.bankAccount.length > 0 && paymentForm.ifscCode.length >= 11
      case "wallet":
        return paymentForm.walletProvider.length > 0
      case "cash":
        return true // No validation needed for cash
      case "paypal":
        return paymentForm.paypalEmail.includes("@")
      case "crypto":
        return paymentForm.cryptoWallet.length > 0 && paymentForm.cryptoCurrency.length > 0
      case "bnpl":
        return paymentForm.bnplProvider.length > 0
      default:
        return false
    }
  }

  const handlePayment = async () => {
    if (!validatePaymentForm()) {
      alert("Please fill in all required payment details")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const paymentId = `PAY${Date.now()}`

      // Store payment data
      const paymentData = {
        ...bookingData,
        paymentId,
        paymentMethod,
        paymentStatus: "completed",
        paymentTime: new Date().toISOString(),
      }

      sessionStorage.setItem("paymentData", JSON.stringify(paymentData))
      setIsProcessing(false)

      // Redirect to QR code page
      router.push(`/pickup-qr/${bookingId}`)
    }, 3000)
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
        <p className="text-gray-600">Booking ID: {bookingId}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center cursor-pointer">
                      <Smartphone className="w-5 h-5 mr-2 text-green-600" />
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                      <Building className="w-5 h-5 mr-2 text-purple-600" />
                      Net Banking
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                      <Wallet className="w-5 h-5 mr-2 text-orange-600" />
                      Wallet
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center cursor-pointer">
                      <Wallet className="w-5 h-5 mr-2 text-green-500" />
                      Cash on Pickup
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                      PayPal
                    </Label>
                  </div>
                  
                  
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod === "upi" && (
                <div>
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    value={paymentForm.upiId}
                    onChange={(e) => handleInputChange("upiId", e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value.replace(/\s/g, ""))}
                      className="h-12"
                      maxLength={16}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className="h-12"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="h-12"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name *</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={paymentForm.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bankAccount">Account Number *</Label>
                    <Input
                      id="bankAccount"
                      placeholder="1234567890"
                      value={paymentForm.bankAccount}
                      onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ifscCode">IFSC Code *</Label>
                    <Input
                      id="ifscCode"
                      placeholder="SBIN0001234"
                      value={paymentForm.ifscCode}
                      onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "wallet" && (
                <div>
                  <Label htmlFor="walletProvider">Select Wallet *</Label>
                  <Select
                    value={paymentForm.walletProvider}
                    onValueChange={(value) => handleInputChange("walletProvider", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="googlepay">Google Pay</SelectItem>
                      <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">Cash on Pickup</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Pay in cash when you collect your baggage. Please bring exact change if possible.
                    </p>
                    <p className="text-xs text-yellow-600 mt-2">
                      Note: A small convenience fee may apply for cash payments.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div>
                  <Label htmlFor="paypalEmail">PayPal Email *</Label>
                  <Input
                    id="paypalEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={paymentForm.paypalEmail}
                    onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              {paymentMethod === "crypto" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cryptoCurrency">Select Cryptocurrency *</Label>
                    <Select
                      value={paymentForm.cryptoCurrency}
                      onValueChange={(value) => handleInputChange("cryptoCurrency", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cryptoWallet">Wallet Address *</Label>
                    <Input
                      id="cryptoWallet"
                      placeholder="Enter your wallet address"
                      value={paymentForm.cryptoWallet}
                      onChange={(e) => handleInputChange("cryptoWallet", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "bnpl" && (
                <div>
                  <Label htmlFor="bnplProvider">Select BNPL Provider *</Label>
                  <Select
                    value={paymentForm.bnplProvider}
                    onValueChange={(value) => handleInputChange("bnplProvider", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="klarna">Klarna</SelectItem>
                      <SelectItem value="afterpay">Afterpay</SelectItem>
                      <SelectItem value="affirm">Affirm</SelectItem>
                      <SelectItem value="sezzle">Sezzle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
                <div className="text-sm text-green-700">
                  <p className="font-semibold">Secure Payment</p>
                  <p>Your payment information is encrypted and secure</p>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={!validatePaymentForm() || isProcessing}
                className="w-full bg-red-600 hover:bg-red-700 h-12"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Pay ₹{bookingData.finalAmount}
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Original Amount:</span>
                  <span>₹{bookingData.totalPrice}</span>
                </div>

                {bookingData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Early Pickup Discount:</span>
                    <span>-₹{bookingData.discount}</span>
                  </div>
                )}

                {bookingData.upgradeCharges > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Late Pickup Charges:</span>
                    <span>+₹{bookingData.upgradeCharges}</span>
                  </div>
                )}

                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Final Amount:</span>
                  <span className="text-red-600">₹{bookingData.finalAmount}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2">After Payment</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• QR code will be generated</li>
                  <li>• Show QR to collect baggage</li>
                  <li>• Rate your experience</li>
                  <li>• Download receipt</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-sm mb-2">Booking Details</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Partner: {bookingData.partnerName}</p>
                  <p>Duration: {bookingData.actualDuration?.toFixed(1)}h actual</p>
                  <p>Bags: {bookingData.requestedBags}</p>
                  <p>Status: {bookingData.pickupType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
