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

    // Handle form submission
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Partner Registration</CardTitle>
            <p className="text-center text-gray-600">
              Fill out the form below to join our network of trusted storage partners
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select onValueChange={handleBusinessTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {businessTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{type.label}</span>
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
                  <div>
                    <Label htmlFor="customBusinessType">Specify Your Business Type *</Label>
                    <Input
                      id="customBusinessType"
                      value={formData.customBusinessType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customBusinessType: e.target.value }))}
                      placeholder="e.g., Laundry Service, Repair Shop, etc."
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your business and storage facility..."
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Information
                </h3>
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
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
                      <SelectContent className="max-h-60">
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Storage Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Storage Details
                </h3>
                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="maxBaggageLimit">Maximum Baggage Capacity *</Label>
                    <Input
                      id="maxBaggageLimit"
                      type="number"
                      min="2"
                      step="2"
                      value={formData.maxBaggageLimit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxBaggageLimit: e.target.value }))}
                      placeholder="e.g., 20, 40, 60"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be an even number (multiples of 2)</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Standardized Pricing Structure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-700">₹30 - ₹199</div>
                        <div className="text-green-600">Base Pricing</div>
                        <div className="text-xs text-green-600">2hrs to 24hrs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-700">₹75 - ₹350</div>
                        <div className="text-green-600">With Insurance</div>
                        <div className="text-xs text-green-600">Enhanced protection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-700">60% Revenue</div>
                        <div className="text-green-600">Partner Share</div>
                        <div className="text-xs text-green-600">You keep majority</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-green-700">
                      <p>
                        <strong>Benefits:</strong> Transparent pricing • No price competition • Customer trust •
                        Consistent revenue
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Baggage Allocation System</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Baggage slots are allocated in multiples of 2</li>
                    <li>• If a customer requests 3 bags, they get 4 slots (rounded up to next even number)</li>
                    <li>• This ensures optimal space utilization and organization</li>
                    <li>• Set your maximum capacity based on your available storage space</li>
                  </ul>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Amenities & Facilities</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Operating Hours
                </h3>
                <div className="space-y-3">
                  {Object.keys(formData.operatingHours).map((day) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-20 text-sm font-medium capitalize">{day}</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          className="w-32"
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
                        <span className="text-sm text-gray-500">to</span>
                        <Input
                          type="time"
                          className="w-32"
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
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Popular Business Types for Storage Partners</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">High Traffic Locations:</h5>
                    <ul className="space-y-1">
                      <li>• Cafes & Restaurants near tourist spots</li>
                      <li>• Retail stores in shopping areas</li>
                      <li>• Hotels & lodges</li>
                      <li>• Supermarkets & shopping centers</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Specialized Facilities:</h5>
                    <ul className="space-y-1">
                      <li>• Dedicated cloak rooms</li>
                      <li>• Locker facilities</li>
                      <li>• Travel agencies</li>
                      <li>• Religious places with storage needs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="bg-red-600 hover:bg-red-700 px-12">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
