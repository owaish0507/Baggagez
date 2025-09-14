"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, User, CreditCard, CheckCircle, Eye, EyeOff, Mail, Phone, Info } from "lucide-react"
import { LocationPermission } from "@/components/location-permission"
import { InterestSelection } from "@/components/interest-selection"

export function UserLoginForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    aadhar: "",
    aadharVerified: false,
    locationEnabled: false,
    interests: [] as string[],
    agreeToTerms: false,
  })

  const [aadharOtp, setAadharOtp] = useState({
    otp: "",
    isOtpSent: false,
    linkedMobile: "",
  })

  const handleLoginInputChange = (field: string, value: string | boolean) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignupInputChange = (field: string, value: string | boolean) => {
    setSignupData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields")
      return
    }

    // Mock login - in real app, this would call your authentication API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store login state
      const userToken = "mock-jwt-token-" + Date.now()
      if (loginData.rememberMe) {
        localStorage.setItem("userToken", userToken)
      } else {
        sessionStorage.setItem("userLoggedIn", "true")
      }

      // Store user info
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: loginData.email,
          name: "John Doe", // Mock name
        }),
      )

      alert("Login successful!")

      // Check if there's a redirect URL
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin")
      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin")
        router.push(redirectUrl)
      } else {
        router.push("/")
      }
    } catch (error) {
      alert("Login failed. Please try again.")
    }
  }

  const handleSendAadharOtp = async () => {
    if (signupData.aadhar.length !== 12) {
      alert("Please enter a valid 12-digit AADHAR number")
      return
    }

    // Mock API call - in real implementation, this would call UIDAI API
    const mockLinkedNumber = "+91-" + signupData.aadhar.slice(-4) + "XXXX"
    setAadharOtp({
      isOtpSent: true,
      linkedMobile: mockLinkedNumber,
      otp: "",
    })
    alert(`OTP sent to ${mockLinkedNumber}`)
  }

  const handleVerifyAadharOtp = async () => {
    if (aadharOtp.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    // Accept any 6-digit OTP for demo purposes
    setSignupData((prev) => ({ ...prev, aadharVerified: true }))
    alert("AADHAR verified successfully!")
  }

  const handleLocationPermission = (enabled: boolean) => {
    setSignupData((prev) => ({ ...prev, locationEnabled: enabled }))
  }

  const handleInterestSelection = (interests: string[]) => {
    setSignupData((prev) => ({ ...prev, interests }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSignupSubmit = async () => {
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.phone ||
      !signupData.password ||
      !signupData.aadharVerified ||
      !signupData.agreeToTerms
    ) {
      alert("Please fill in all required fields and verify your AADHAR")
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store login state
      const userToken = "mock-jwt-token-" + Date.now()
      sessionStorage.setItem("userLoggedIn", "true")

      // Store user info
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: signupData.email,
          name: signupData.name,
          phone: signupData.phone,
          aadharVerified: true,
        }),
      )

      alert("Registration completed successfully!")

      // Check if there's a redirect URL
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin")
      if (redirectUrl) {
        sessionStorage.removeItem("redirectAfterLogin")
        router.push(redirectUrl)
      } else {
        router.push("/")
      }
    } catch (error) {
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-none sm:max-w-2xl lg:max-w-4xl mx-auto px-1 sm:px-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-3 sm:mb-4 md:mb-6 lg:mb-8 h-10 sm:h-12">
          <TabsTrigger value="login" className="text-xs sm:text-sm md:text-base">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="text-xs sm:text-sm md:text-base">
            Sign Up
          </TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card className="w-full border-0 sm:border shadow-none sm:shadow-sm">
            <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl text-center">Welcome Back</CardTitle>
              <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base">
                Sign in to your account to continue
              </p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 px-3 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="loginEmail" className="text-xs sm:text-sm md:text-base">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginPassword" className="text-xs sm:text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-9 sm:h-10 md:h-12 pr-10 text-xs sm:text-sm md:text-base"
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange("password", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={loginData.rememberMe}
                    onCheckedChange={(checked) => handleLoginInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="text-xs sm:text-sm md:text-base">
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="text-xs sm:text-sm md:text-base text-red-600 hover:text-red-700 p-0 self-start sm:self-center"
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base lg:text-lg bg-red-600 hover:bg-red-700"
                disabled={!loginData.email || !loginData.password}
              >
                Sign In
              </Button>

              <div className="text-center text-xs sm:text-sm md:text-base text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-700 p-0 text-xs sm:text-sm md:text-base"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up here
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sign Up Tab */}
        <TabsContent value="signup">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 px-4">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full text-xs sm:text-sm md:text-base ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <div className={`w-4 sm:w-8 md:w-16 h-1 ${step >= 2 ? "bg-red-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full text-xs sm:text-sm md:text-base ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <div className={`w-4 sm:w-8 md:w-16 h-1 ${step >= 3 ? "bg-red-600" : "bg-gray-200"}`}></div>
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full text-xs sm:text-sm md:text-base ${step >= 3 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <Card className="w-full border-0 sm:border shadow-none sm:shadow-sm">
              <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl text-center">Create Your Account</CardTitle>
                <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base">
                  Fill in your details to get started
                </p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 px-3 sm:px-6">
                <div className="space-y-2">
                  <Label htmlFor="signupName" className="text-xs sm:text-sm md:text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="signupName"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.name}
                    onChange={(e) => handleSignupInputChange("name", e.target.value)}
                    className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-xs sm:text-sm md:text-base">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      value={signupData.email}
                      onChange={(e) => handleSignupInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPhone" className="text-xs sm:text-sm md:text-base">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <Input
                      id="signupPhone"
                      type="tel"
                      placeholder="+91-XXXXXXXXXX"
                      className="pl-10 h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      value={signupData.phone}
                      onChange={(e) => handleSignupInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-xs sm:text-sm md:text-base">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="signupPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="h-9 sm:h-10 md:h-12 pr-10 text-xs sm:text-sm md:text-base"
                      value={signupData.password}
                      onChange={(e) => handleSignupInputChange("password", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs sm:text-sm md:text-base">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-9 sm:h-10 md:h-12 pr-10 text-xs sm:text-sm md:text-base"
                      value={signupData.confirmPassword}
                      onChange={(e) => handleSignupInputChange("confirmPassword", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="signupAadhar" className="text-xs sm:text-sm md:text-base">
                      AADHAR Number *
                    </Label>
                    <div className="relative group">
                      <Info className="w-4 h-4 text-blue-500 cursor-help" />
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 sm:px-3 py-2 bg-gray-800 text-white text-xs sm:text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 sm:w-64 z-10">
                        <div className="text-center">
                          This website is built only to show investors and partners. Please enter any 12-digit Aadhaar
                          number and a 6-digit OTP until our team integrates a real-time Aadhaar authentication
                          verification API.
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input
                      id="signupAadhar"
                      type="text"
                      placeholder="Enter your 12-digit AADHAR number"
                      value={signupData.aadhar}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 12)
                        handleSignupInputChange("aadhar", value)
                      }}
                      className="h-9 sm:h-10 md:h-12 flex-1 text-xs sm:text-sm md:text-base"
                      maxLength={12}
                      disabled={signupData.aadharVerified}
                    />
                    <Button
                      onClick={handleSendAadharOtp}
                      disabled={signupData.aadhar.length !== 12 || aadharOtp.isOtpSent || signupData.aadharVerified}
                      className="h-9 sm:h-10 md:h-12 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      {signupData.aadharVerified ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      ) : aadharOtp.isOtpSent ? (
                        "OTP Sent"
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2 md:mr-3" />
                          <span className="hidden sm:inline md:hidden">Send OTP</span>
                          <span className="sm:hidden md:inline">Send OTP</span>
                          <span className="md:hidden">OTP</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {aadharOtp.isOtpSent && !signupData.aadharVerified && (
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        OTP sent to linked mobile: {aadharOtp.linkedMobile}
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter 6-digit OTP(any random number)"
                          value={aadharOtp.otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                            setAadharOtp((prev) => ({ ...prev, otp: value }))
                          }}
                          className="h-9 sm:h-10 md:h-12 flex-1 text-xs sm:text-sm md:text-base"
                          maxLength={6}
                        />
                        <Button
                          onClick={handleVerifyAadharOtp}
                          disabled={aadharOtp.otp.length !== 6}
                          className="h-9 sm:h-10 md:h-12 px-3 sm:px-4 bg-green-600 hover:bg-green-700 text-xs sm:text-sm md:text-base"
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}

                  {signupData.aadharVerified && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm md:text-base text-green-800 font-medium">
                        AADHAR verified successfully
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={signupData.agreeToTerms}
                    onCheckedChange={(checked) => handleSignupInputChange("agreeToTerms", checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="agreeTerms" className="text-xs sm:text-sm md:text-base leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy *
                  </Label>
                </div>

                <Button
                  onClick={nextStep}
                  disabled={
                    !signupData.name ||
                    !signupData.email ||
                    !signupData.phone ||
                    !signupData.password ||
                    !signupData.confirmPassword ||
                    !signupData.aadharVerified ||
                    !signupData.agreeToTerms
                  }
                  className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base lg:text-lg bg-red-600 hover:bg-red-700"
                >
                  Continue
                </Button>

                <div className="text-center text-xs sm:text-sm md:text-base text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="text-red-600 hover:text-red-700 p-0 text-xs sm:text-sm md:text-base"
                    onClick={() => setActiveTab("login")}
                  >
                    Sign in here
                  </Button>
                </div>
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
              selectedInterests={signupData.interests}
              onInterestSelection={handleInterestSelection}
              onSubmit={handleSignupSubmit}
              onBack={prevStep}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
