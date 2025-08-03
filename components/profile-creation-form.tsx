"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Mail, Phone, MapPin, Eye, EyeOff } from "lucide-react"

export function ProfileCreationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "traveler",
    city: "",
    state: "",
    preferredLanguage: "en",
  })

  const indianStates = [
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Rajasthan",
    "Punjab",
    "Uttarakhand",
    "West Bengal",
    "Telangana",
    "Gujarat",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Bihar",
    "Odisha",
    "Kerala",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Handle form submission
    console.log("Profile creation:", formData)
    // Here you would typically send the data to your API
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>I am a:</Label>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="traveler" id="traveler" />
                <Label htmlFor="traveler">Traveler</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partner" id="partner" />
                <Label htmlFor="partner">Storage Partner</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>

            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  className="pl-10"
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security</h3>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferences</h3>

            <div>
              <Label htmlFor="language">Preferred Language</Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredLanguage: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                  <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg" className="bg-red-600 hover:bg-red-700 px-12">
              Create Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
