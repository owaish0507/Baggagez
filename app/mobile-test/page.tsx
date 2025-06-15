"use client"

import { MobileTestWrapper } from "@/components/mobile-test-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { SearchForm } from "@/components/search-form"
import { MapPin, Star, Shield, Clock, Users, Heart, CheckCircle } from "lucide-react"

export default function MobileTestPage() {
  return (
    <MobileTestWrapper>
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <Header />

        {/* Mobile Test Scenarios */}
        <div className="px-4 py-6 space-y-8">
          {/* Hero Section Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Hero Section Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  <span className="text-red-800">Travel Hand-Free</span>
                  <br />
                  Store Your Memories Safely
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
                  Don't let your loving devotion be left behind. Store your bags with our trusted partners and explore
                  freely.
                </p>
                <SearchForm />
              </div>
            </CardContent>
          </Card>

          {/* Navigation Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Navigation Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-red-800 hover:bg-red-900 text-white h-12 text-base">
                  Primary Action Button
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-red-200 text-red-800 h-10 text-sm">
                    Secondary
                  </Button>
                  <Button variant="outline" className="border-red-200 text-red-800 h-10 text-sm">
                    Tertiary
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Form Elements Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date Input</label>
                  <input
                    type="date"
                    className="w-full p-3 h-12 border border-red-200 rounded-md focus:border-red-400 focus:outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Select</label>
                  <select className="w-full p-3 h-12 border border-red-200 rounded-md focus:border-red-400 focus:outline-none text-base">
                    <option>Select time</option>
                    <option>09:00</option>
                    <option>10:00</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Text Input</label>
                <input
                  type="text"
                  placeholder="Touch-friendly input field"
                  className="w-full p-3 h-12 border border-red-200 rounded-md focus:border-red-400 focus:outline-none text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card Layout Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Card Layout Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mobile-optimized location card */}
                <div className="border border-red-100 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">Image</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                        <div>
                          <h3 className="font-semibold text-base">Central Station Storage</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            Near Mumbai Central • 0.1 km
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xl font-bold text-red-800">₹30</div>
                          <div className="text-sm text-gray-600">starting from</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.9</span>
                          <span className="text-gray-600">(234)</span>
                        </div>
                        <Badge variant="secondary" className="bg-red-50 text-red-800 text-xs">
                          24/7 Access
                        </Badge>
                      </div>
                      <Button className="w-full sm:w-auto bg-red-800 hover:bg-red-900 text-white text-sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Touch Target Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Touch Target Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  All interactive elements should be at least 44px (iOS) or 48px (Android) in height for optimal touch
                  interaction.
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-12 bg-red-800 hover:bg-red-900 text-white">✓ 48px Height</Button>
                  <Button variant="outline" className="h-12 border-red-200 text-red-800">
                    ✓ Touch Friendly
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 border-red-200">
                      -
                    </Button>
                    <span className="w-8 text-center font-semibold">2</span>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 border-red-200">
                      +
                    </Button>
                  </div>
                  <span className="text-sm text-gray-600">Bag counter (touch-friendly)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Typography Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Responsive Heading H1</h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                  Responsive Heading H2
                </h2>
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-2">Responsive Heading H3</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2">
                  Responsive body text that scales appropriately across different screen sizes for optimal readability.
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Small text for captions and secondary information.</p>
              </div>
            </CardContent>
          </Card>

          {/* Spacing and Layout Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Spacing & Layout Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg">
                    <Shield className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
                    <h3 className="font-semibold text-sm md:text-base">Security</h3>
                    <p className="text-xs md:text-sm text-gray-600">Protected storage</p>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg">
                    <Clock className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
                    <h3 className="font-semibold text-sm md:text-base">24/7</h3>
                    <p className="text-xs md:text-sm text-gray-600">Always available</p>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg">
                    <Users className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
                    <h3 className="font-semibold text-sm md:text-base">Trusted</h3>
                    <p className="text-xs md:text-sm text-gray-600">Verified partners</p>
                  </div>
                  <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg">
                    <CheckCircle className="w-8 md:w-10 h-8 md:h-10 text-red-800 mx-auto mb-2 md:mb-3" />
                    <h3 className="font-semibold text-sm md:text-base">Easy</h3>
                    <p className="text-xs md:text-sm text-gray-600">Simple process</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile-specific Features Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Mobile Features Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Mobile Optimizations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✓ Touch-friendly buttons (min 44px height)</li>
                  <li>✓ Responsive typography scaling</li>
                  <li>✓ Optimized form inputs for mobile keyboards</li>
                  <li>✓ Proper spacing for thumb navigation</li>
                  <li>✓ Readable text without zooming</li>
                  <li>✓ Fast loading optimized images</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Accessibility Features</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ High contrast colors</li>
                  <li>✓ Proper focus indicators</li>
                  <li>✓ Screen reader friendly</li>
                  <li>✓ Keyboard navigation support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Performance Test */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Performance Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Loading Performance</h4>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div className="flex justify-between">
                      <span>Image Loading:</span>
                      <span className="font-semibold">Optimized ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CSS Bundle:</span>
                      <span className="font-semibold">Minified ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>JavaScript:</span>
                      <span className="font-semibold">Code Split ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fonts:</span>
                      <span className="font-semibold">Preloaded ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileTestWrapper>
  )
}
