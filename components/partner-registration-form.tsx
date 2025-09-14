"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Building, Clock, Package } from "lucide-react"

export function PartnerRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    customBusinessType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    maxBaggageLimit: "",
    amenities: [] as string[],
    operatingHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  const businessTypes = [
    { value: "cafe", label: "Cafe/Restaurant", description: "Coffee shops, restaurants, food courts" },
    { value: "store", label: "Retail Store", description: "Shops, boutiques, retail outlets" },
    { value: "showroom", label: "Showroom", description: "Car showrooms, furniture displays, electronics stores" },
    { value: "clockroom", label: "Cloak Room", description: "Dedicated baggage storage facilities" },
    { value: "locker", label: "Locker Facility", description: "Self-service locker systems" },
    { value: "supermarket", label: "Supermarket", description: "Grocery stores, hypermarkets, shopping centers" },
    { value: "hotel", label: "Hotel/Lodge", description: "Hotels, guest houses, lodges" },
    { value: "office", label: "Office Building", description: "Corporate offices, business centers" },
    { value: "gym", label: "Gym/Fitness Center", description: "Fitness centers, sports clubs" },
    { value: "salon", label: "Salon/Spa", description: "Beauty salons, spas, wellness centers" },
    { value: "pharmacy", label: "Pharmacy", description: "Medical stores, pharmacies" },
    { value: "bookstore", label: "Bookstore/Library", description: "Book shops, libraries, study centers" },
    { value: "electronics", label: "Electronics Store", description: "Mobile shops, computer stores, electronics" },
    { value: "travel", label: "Travel Agency", description: "Travel agencies, tour operators" },
    { value: "bank", label: "Bank/ATM Center", description: "Banks, financial institutions" },
    { value: "petrol", label: "Petrol Pump", description: "Gas stations, fuel stations" },
    { value: "temple", label: "Religious Place", description: "Temples, churches, mosques, gurudwaras" },
    { value: "hospital", label: "Hospital/Clinic", description: "Hospitals, clinics, medical centers" },
    { value: "school", label: "Educational Institute", description: "Schools, colleges, coaching centers" },
    { value: "other", label: "Other", description: "Specify your business type" },
  ]

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
    "Haryana",
    "Assam",
    "Jharkhand",
    "Chhattisgarh",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Ladakh",
    "Goa",
    "Tripura",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Arunachal Pradesh",
    "Sikkim",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Puducherry",
  ]

  const amenityOptions = [
    "security_camera",
    "climate_control",
    "24x7_access",
    "wifi",
    "insurance_covered",
    "tourist_guide",
    "religious_friendly",
    "spiritual_friendly",
    "beach_access",
    "free_water",
    "shoe_storage",
    "meeting_room",
    "yoga_mats",
    "ganga_aarti_info",
    "parking_available",
    "wheelchair_accessible",
    "cctv_monitoring",
    "fire_safety",
    "first_aid",
    "charging_points",
    "restroom_facilities",
    "food_court",
    "shopping_area",
    "atm_nearby",
    "public_transport",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate custom business type if "other" is selected
    if (formData.businessType === "other" && !formData.customBusinessType.trim()) {
      alert("Please specify your business type")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/partners/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setApplicationId(result.applicationId)
        setIsSubmitted(true)
      } else {
        alert(result.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked ? [...prev.amenities, amenity] : prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const handleBusinessTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      businessType: value,
      customBusinessType: value !== "other" ? "" : prev.customBusinessType,
    }))
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <Card className="border-0 sm:border shadow-none sm:shadow-lg">
          <CardHeader className="text-center pb-4 sm:pb-6 md:pb-8">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Partner Registration
            </CardTitle>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto leading-relaxed px-2">
              Fill out the form below to join our network of trusted storage partners
            </p>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 md:px-6 lg:px-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
                {/* Personal Information */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center text-gray-900">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-red-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="fullName" className="text-xs sm:text-sm md:text-base font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm md:text-base font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2 md:col-span-2 lg:col-span-1">
                      <Label htmlFor="phone" className="text-xs sm:text-sm md:text-base font-medium">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center text-gray-900">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-red-600" />
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="businessName" className="text-xs sm:text-sm md:text-base font-medium">
                        Business Name *
                      </Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="businessType" className="text-xs sm:text-sm md:text-base font-medium">
                        Business Type *
                      </Label>
                      <Select onValueChange={handleBusinessTypeChange}>
                        <SelectTrigger className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 sm:max-h-60">
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex flex-col">
                                <span className="font-medium text-xs sm:text-sm">{type.label}</span>
                                <span className="text-xs text-gray-500">{type.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Custom Business Type Input */}
                  {formData.businessType === "other" && (
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="customBusinessType" className="text-xs sm:text-sm md:text-base font-medium">
                        Specify Your Business Type *
                      </Label>
                      <Input
                        id="customBusinessType"
                        value={formData.customBusinessType}
                        onChange={(e) => setFormData((prev) => ({ ...prev, customBusinessType: e.target.value }))}
                        placeholder="e.g., Laundry Service, Repair Shop, etc."
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                  )}

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="description" className="text-xs sm:text-sm md:text-base font-medium">
                      Business Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your business and storage facility..."
                      className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-xs sm:text-sm md:text-base resize-none"
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center text-gray-900">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-red-600" />
                    Location Information
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="address" className="text-xs sm:text-sm md:text-base font-medium">
                      Full Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      required
                      className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-xs sm:text-sm md:text-base resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="city" className="text-xs sm:text-sm md:text-base font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="state" className="text-xs sm:text-sm md:text-base font-medium">
                        State *
                      </Label>
                      <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}>
                        <SelectTrigger className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-48 sm:max-h-60">
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state} className="text-xs sm:text-sm">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1 sm:space-y-2 sm:col-span-2 lg:col-span-1">
                      <Label htmlFor="pincode" className="text-xs sm:text-sm md:text-base font-medium">
                        Pincode *
                      </Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Storage Details */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center text-gray-900">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-red-600" />
                    Storage Details
                  </h3>
                  <div className="space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="maxBaggageLimit" className="text-xs sm:text-sm md:text-base font-medium">
                        Maximum Baggage Capacity *
                      </Label>
                      <Input
                        id="maxBaggageLimit"
                        type="number"
                        min="2"
                        step="2"
                        value={formData.maxBaggageLimit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, maxBaggageLimit: e.target.value }))}
                        placeholder="e.g., 20, 40, 60"
                        required
                        className="h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base"
                      />
                      <p className="text-xs text-gray-500">Must be an even number (multiples of 2)</p>
                    </div>

                    {/* Pricing Structure */}
                    <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                      <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                        Standardized Pricing Structure
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                        <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                          <div className="text-base sm:text-lg md:text-xl font-bold text-green-700">₹30 - ₹199</div>
                          <div className="text-green-600 font-medium">Base Pricing</div>
                          <div className="text-xs text-green-600">2hrs to 24hrs</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                          <div className="text-base sm:text-lg md:text-xl font-bold text-green-700">₹75 - ₹350</div>
                          <div className="text-green-600 font-medium">With Insurance</div>
                          <div className="text-xs text-green-600">Enhanced protection</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white/50 rounded-lg">
                          <div className="text-base sm:text-lg md:text-xl font-bold text-green-700">60% Revenue</div>
                          <div className="text-green-600 font-medium">Partner Share</div>
                          <div className="text-xs text-green-600">You keep majority</div>
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-green-700">
                        <p>
                          <strong>Benefits:</strong> Transparent pricing • No price competition • Customer trust •
                          Consistent revenue
                        </p>
                      </div>
                    </div>

                    {/* Baggage Allocation Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                      <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                        Baggage Allocation System
                      </h4>
                      <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                        <li>• Baggage slots are allocated in multiples of 2</li>
                        <li>• If a customer requests 3 bags, they get 4 slots (rounded up to next even number)</li>
                        <li>• This ensures optimal space utilization and organization</li>
                        <li>• Set your maximum capacity based on your available storage space</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
                    Amenities & Facilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {amenityOptions.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2 sm:space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                        <Label htmlFor={amenity} className="text-xs sm:text-sm md:text-base cursor-pointer">
                          {amenity.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold flex items-center text-gray-900">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-red-600" />
                    Operating Hours
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {Object.keys(formData.operatingHours).map((day) => (
                      <div
                        key={day}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-full sm:w-20 text-xs sm:text-sm font-medium capitalize text-gray-700">
                          {day}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Input
                            type="time"
                            className="w-full sm:w-32 h-8 sm:h-10 text-xs sm:text-sm"
                            value={formData.operatingHours[day as keyof typeof formData.operatingHours].open}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: {
                                  ...prev.operatingHours,
                                  [day]: {
                                    ...prev.operatingHours[day as keyof typeof prev.operatingHours],
                                    open: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                          <span className="text-xs sm:text-sm text-gray-500">to</span>
                          <Input
                            type="time"
                            className="w-full sm:w-32 h-8 sm:h-10 text-xs sm:text-sm"
                            value={formData.operatingHours[day as keyof typeof formData.operatingHours].close}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                operatingHours: {
                                  ...prev.operatingHours,
                                  [day]: {
                                    ...prev.operatingHours[day as keyof typeof prev.operatingHours],
                                    close: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Type Examples */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                  <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">
                    Popular Business Types for Storage Partners
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                        High Traffic Locations:
                      </h5>
                      <ul className="space-y-1">
                        <li>• Cafes & Restaurants near tourist spots</li>
                        <li>• Retail stores in shopping areas</li>
                        <li>• Hotels & lodges</li>
                        <li>• Supermarkets & shopping centers</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 sm:mb-2 text-xs sm:text-sm">
                        Specialized Facilities:
                      </h5>
                      <ul className="space-y-1">
                        <li>• Dedicated cloak rooms</li>
                        <li>• Locker facilities</li>
                        <li>• Travel agencies</li>
                        <li>• Religious places with storage needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4 sm:pt-6 md:pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 px-8 sm:px-12 md:px-16 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting Application...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            ) : null}

            {/* Success State */}
            {isSubmitted && (
              <div className="text-center py-8 sm:py-12 md:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-3 sm:mb-4 md:mb-6">
                  Application Submitted Successfully!
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 px-2">
                  Thank you for your interest in becoming a storage partner with Baggages.
                </p>

                {/* Email Confirmation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-600 mr-2 sm:mr-3" />
                    <span className="font-semibold text-yellow-800 text-sm sm:text-base">Confirmation Email Sent!</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-yellow-700">
                    We've sent a detailed confirmation email to <strong>{formData.email}</strong> with your application
                    details and next steps.
                  </p>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 mb-3 sm:mb-4 md:mb-6">
                    What happens next?
                  </h3>
                  <div className="space-y-3 sm:space-y-4 text-left">
                    {[
                      {
                        step: "1",
                        title: "Application Review",
                        description: "Our team will review your application within 24-48 hours",
                      },
                      {
                        step: "2",
                        title: "Verification Call",
                        description: `We'll contact you at ${formData.phone} for verification and details`,
                      },
                      {
                        step: "3",
                        title: "Site Visit",
                        description: "Our representative will visit your location for final approval",
                      },
                      {
                        step: "4",
                        title: "Onboarding",
                        description: "Complete setup and start earning with Baggages",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-bold flex-shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-medium text-blue-800 text-xs sm:text-sm md:text-base">{item.title}</p>
                          <p className="text-blue-600 text-xs sm:text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    <strong>Application ID:</strong>{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{applicationId}</span>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
                    Questions? Contact us at{" "}
                    <a href="mailto:partners@baggages.com" className="text-blue-600 hover:underline">
                      partners@baggages.com
                    </a>{" "}
                    or call{" "}
                    <a href="tel:+911234567890" className="text-blue-600 hover:underline">
                      +91 12345 67890
                    </a>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
