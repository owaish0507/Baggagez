"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, User, CreditCard, CheckCircle } from "lucide-react"
import { LocationPermission } from "@/components/location-permission"
import { InterestSelection } from "@/components/interest-selection"

export function UserLoginForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhar: "",
    aadharVerified: false,
    locationEnabled: false,
    interests: [] as string[],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAadharVerification = () => {
    // Simulate AADHAR verification
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, aadharVerified: true }))
    }, 2000)
  }

  const handleLocationPermission = (enabled: boolean) => {
    setFormData((prev) => ({ ...prev, locationEnabled: enabled }))
  }

  const handleInterestSelection = (interests: string[]) => {
    setFormData((prev) => ({ ...prev, interests }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("User registration data:", formData)
    // Handle final submission
    alert("Registration completed successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <User className="w-5 h-5" />
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? "bg-red-600" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <MapPin className="w-5 h-5" />
          </div>
          <div className={`w-16 h-1 ${step >= 3 ? "bg-red-600" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="aadhar">AADHAR Number</Label>
              <div className="flex space-x-3">
                <Input
                  id="aadhar"
                  type="text"
                  placeholder="Enter your AADHAR number"
                  value={formData.aadhar}
                  onChange={(e) => handleInputChange("aadhar", e.target.value)}
                  className="h-12 flex-1"
                  maxLength={12}
                />
                <Button
                  onClick={handleAadharVerification}
                  disabled={formData.aadhar.length !== 12 || formData.aadharVerified}
                  className="h-12 px-6"
                >
                  {formData.aadharVerified ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
              {formData.aadharVerified && (
                <p className="text-green-600 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  AADHAR verified successfully
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button
              onClick={nextStep}
              disabled={!formData.name || !formData.email || !formData.phone || !formData.aadharVerified}
              className="w-full h-12 text-lg"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Location Permission */}
      {step === 2 && (
        <LocationPermission onLocationPermission={handleLocationPermission} onNext={nextStep} onBack={prevStep} />
      )}

      {/* Step 3: Interest Selection */}
      {step === 3 && (
        <InterestSelection
          selectedInterests={formData.interests}
          onInterestSelection={handleInterestSelection}
          onSubmit={handleSubmit}
          onBack={prevStep}
        />
      )}
    </div>
  )
}
