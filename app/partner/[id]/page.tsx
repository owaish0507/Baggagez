"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SwipeableGallery } from "@/components/swipeable-gallery"
import { SwipeableTabs } from "@/components/swipeable-tabs"
import { SearchForm } from "@/components/search-form"
import {
  MapPin,
  Star,
  Shield,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  Award,
  Camera,
  Wifi,
  Car,
  Lock,
  Eye,
  Thermometer,
  MessageCircle,
  Heart,
  TrendingUp,
  Building,
  UserCheck,
  FileCheck,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for partner details
const partnerData = {
  id: 1,
  name: "Central Station Storage",
  businessName: "Mumbai Central Secure Storage Pvt. Ltd.",
  address: "Shop No. 15, Ground Floor, Central Station Complex, Mumbai Central, Mumbai - 400008",
  coordinates: { lat: 19.076, lng: 72.8777 },
  distance: "0.1 km from Mumbai Central Station",
  rating: 4.9,
  totalReviews: 2847,
  monthlyBookings: 1250,
  yearsInBusiness: 8,
  verified: true,
  premiumPartner: true,

  // Contact Information
  contact: {
    phone: "+91 98765 43210",
    email: "storage@mumbaicentral.com",
    whatsapp: "+91 98765 43210",
    website: "www.mumbaicentralstorage.com",
  },

  // Operating Hours
  hours: {
    monday: "24/7",
    tuesday: "24/7",
    wednesday: "24/7",
    thursday: "24/7",
    friday: "24/7",
    saturday: "24/7",
    sunday: "24/7",
    specialNote: "Available 24/7 with advance booking for late night/early morning",
  },

  // Pricing
  pricing: {
    base: {
      "2": 30,
      "4": 50,
      "6": 70,
      "8": 90,
      "12": 120,
      "24": 199,
    },
    insurance: {
      "2": 75,
      "4": 115,
      "6": 155,
      "8": 195,
      "12": 255,
      "24": 350,
    },
  },

  // Facilities & Features
  facilities: [
    { name: "24/7 CCTV Surveillance", icon: Eye, verified: true },
    { name: "Climate Controlled", icon: Thermometer, verified: true },
    { name: "Digital Lock System", icon: Lock, verified: true },
    { name: "Free WiFi", icon: Wifi, verified: true },
    { name: "Parking Available", icon: Car, verified: true },
    { name: "Insurance Coverage", icon: Shield, verified: true },
    { name: "Photo Documentation", icon: Camera, verified: true },
    { name: "Real-time Tracking", icon: Zap, verified: true },
  ],

  // Certifications & Licenses
  certifications: [
    { name: "Business License", number: "BL-2016-MH-001234", verified: true, issuer: "Mumbai Municipal Corporation" },
    {
      name: "Fire Safety Certificate",
      number: "FSC-2023-MH-5678",
      verified: true,
      issuer: "Maharashtra Fire Department",
    },
    { name: "Security License", number: "SL-2022-MH-9012", verified: true, issuer: "Maharashtra Police" },
    { name: "Insurance Policy", number: "INS-2024-HDFC-3456", verified: true, issuer: "HDFC ERGO General Insurance" },
  ],

  // Staff Information
  staff: [
    {
      name: "Rajesh Kumar",
      role: "Store Manager",
      experience: "5 years",
      languages: ["Hindi", "English", "Marathi"],
      photo: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    {
      name: "Priya Sharma",
      role: "Customer Service",
      experience: "3 years",
      languages: ["Hindi", "English", "Gujarati"],
      photo: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
  ],

  // Gallery Images
  gallery: [
    "/station-storage.jpg",
    "/secure-storage.jpg",
    "/family-travel.jpg",
    "/hands-free-travel.jpg",
    "/tourist-spots.jpg",
  ],

  // Recent Reviews
  reviews: [
    {
      id: 1,
      customerName: "Priya S.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Exceptional service! The staff was incredibly helpful and my bags were completely safe. The facility is clean and well-maintained. Rajesh personally ensured everything was perfect.",
      verified: true,
      helpful: 23,
      photos: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      customerName: "Rahul M.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Perfect for families! The climate-controlled environment kept our electronics safe. Staff speaks multiple languages which was very helpful. Highly recommend!",
      verified: true,
      helpful: 18,
      photos: [],
    },
    {
      id: 3,
      customerName: "Anjali K.",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Great location near the station. Easy drop-off and pickup process. The digital tracking system gave me peace of mind throughout my trip.",
      verified: true,
      helpful: 15,
      photos: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
  ],

  // Safety Measures
  safetyMeasures: [
    "Individual storage compartments for each booking",
    "Biometric access control for staff",
    "Regular security audits and inspections",
    "Emergency contact system",
    "Backup power supply for security systems",
    "Professional security training for all staff",
  ],

  // Statistics
  stats: {
    totalBagsStored: 45000,
    zeroLossRecord: true,
    averageResponseTime: "< 2 minutes",
    customerSatisfaction: 98.5,
    repeatCustomers: 75,
  },
}

export default function PartnerDetailsPage({ params }: { params: { id: string } }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const tabContent = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-800">
                {partnerData.stats.totalBagsStored.toLocaleString()}+
              </div>
              <div className="text-sm text-green-600">Bags Stored Safely</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">{partnerData.yearsInBusiness}</div>
              <div className="text-sm text-blue-600">Years in Business</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">{partnerData.stats.customerSatisfaction}%</div>
              <div className="text-sm text-purple-600">Satisfaction Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-800">{partnerData.monthlyBookings}+</div>
              <div className="text-sm text-orange-600">Monthly Bookings</div>
            </div>
          </div>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-red-800" />
                About Our Partner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Mumbai Central Secure Storage has been serving travelers for over 8 years with unwavering commitment to
                safety and customer satisfaction. Located strategically near Mumbai Central Station, we provide premium
                luggage storage services with state-of-the-art security systems.
              </p>
              <p className="text-gray-600">
                Our facility is equipped with modern amenities and staffed by trained professionals who understand the
                value of your belongings. We take pride in our zero-loss record and 98.5% customer satisfaction rate.
              </p>
            </CardContent>
          </Card>

          {/* Safety Measures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-800" />
                Safety & Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {partnerData.safetyMeasures.map((measure, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{measure}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "facilities",
      label: "Facilities",
      content: (
        <div className="space-y-6">
          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerData.facilities.map((facility, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <facility.icon className="w-5 h-5 text-green-800" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{facility.name}</span>
                        {facility.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Operating Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-800" />
                Operating Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-semibold text-green-600">24/7 Available</span>
                </div>
                <p className="text-sm text-gray-600 mt-3 p-3 bg-blue-50 rounded-lg">
                  <strong>Note:</strong> {partnerData.hours.specialNote}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "team",
      label: "Our Team",
      content: (
        <div className="space-y-6">
          {/* Staff Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerData.staff.map((member, index) => (
              <Card key={index} className="border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.photo || "/placeholder.svg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        {member.verified && <UserCheck className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-blue-800 font-medium">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.experience} experience</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.languages.map((lang, langIndex) => (
                        <Badge key={langIndex} variant="secondary" className="bg-blue-50 text-blue-800 text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-800" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">{partnerData.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">{partnerData.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-gray-600">{partnerData.contact.whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-sm text-gray-600">{partnerData.contact.website}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "certifications",
      label: "Certifications",
      content: (
        <div className="space-y-6">
          {/* Certifications */}
          <div className="grid grid-cols-1 gap-4">
            {partnerData.certifications.map((cert, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-green-800" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                          {cert.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-gray-600">License: {cert.number}</p>
                        <p className="text-xs text-gray-500">Issued by: {cert.issuer}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-800">
                      Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Badges */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Verified Partner</h3>
              <p className="text-gray-600 mb-4">
                This partner has completed our comprehensive verification process and maintains the highest standards of
                service and security.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-600 text-white">Zero Loss Record</Badge>
                <Badge className="bg-blue-600 text-white">8+ Years Trusted</Badge>
                <Badge className="bg-purple-600 text-white">Premium Partner</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: "reviews",
      label: "Reviews",
      content: (
        <div className="space-y-6">
          {/* Review Summary */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-3xl font-bold text-gray-900">{partnerData.rating}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{partnerData.totalReviews.toLocaleString()} verified reviews</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-800">{partnerData.stats.repeatCustomers}%</div>
                  <p className="text-sm text-gray-600">Repeat Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {partnerData.reviews.map((review) => (
              <Card key={review.id} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-gray-700">{review.customerName.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{review.customerName}</span>
                          {review.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo || "/placeholder.svg"}
                          alt="Review photo"
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <Heart className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Gallery */}
            <div className="md:w-1/2">
              <SwipeableGallery images={partnerData.gallery} alt={partnerData.name} className="h-64 md:h-80" />
            </div>

            {/* Basic Info */}
            <div className="md:w-1/2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{partnerData.name}</h1>
                    {partnerData.verified && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {partnerData.premiumPartner && <Award className="w-6 h-6 text-yellow-600" />}
                  </div>
                  <p className="text-gray-600 mb-2">{partnerData.businessName}</p>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{partnerData.distance}</span>
                  </div>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-lg">{partnerData.rating}</span>
                  <span className="text-gray-600">({partnerData.totalReviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-green-600 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Partner
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  <Award className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <Badge className="bg-purple-600 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Zero Loss Record
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-gray-900">{partnerData.monthlyBookings}+</div>
                  <div className="text-sm text-gray-600">Monthly Bookings</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-gray-900">{partnerData.yearsInBusiness}</div>
                  <div className="text-sm text-gray-600">Years Trusted</div>
                </div>
              </div>

              {/* Search Form */}
              <div className="mb-6">
                <SearchForm />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link href={`/booking/${partnerData.id}`} className="flex-1">
                  <Button className="w-full bg-red-800 hover:bg-red-900 text-white h-12">Book Storage Now</Button>
                </Link>
                <Button variant="outline" className="border-red-200 text-red-800 hover:bg-red-50">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-800 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">{partnerData.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-red-800">Transparent Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Standard Storage</h4>
                <div className="space-y-2">
                  {Object.entries(partnerData.pricing.base).map(([duration, price]) => (
                    <div key={duration} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>{duration} Hours</span>
                      <span className="font-semibold">₹{price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  With Insurance
                </h4>
                <div className="space-y-2">
                  {Object.entries(partnerData.pricing.insurance).map(([duration, price]) => (
                    <div key={duration} className="flex justify-between p-2 bg-red-50 rounded">
                      <span>{duration} Hours</span>
                      <span className="font-semibold">₹{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <SwipeableTabs tabs={tabContent} defaultTab="overview" />

        {/* Final CTA */}
        <Card className="mt-8 bg-gradient-to-r from-red-800 to-red-900 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Store Your Bags Safely?</h2>
            <p className="text-red-100 mb-6">
              Join thousands of satisfied customers who trust {partnerData.name} with their precious belongings.
            </p>
            <Link href={`/booking/${partnerData.id}`}>
              <Button className="bg-white text-red-800 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Book Your Storage Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
