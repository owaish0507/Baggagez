"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Shield, CheckCircle } from "lucide-react"

interface LocationPermissionProps {
  onLocationPermission: (enabled: boolean) => void
  onNext: () => void
  onBack: () => void
}

export function LocationPermission({ onLocationPermission, onNext, onBack }: LocationPermissionProps) {
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle")

  const requestLocation = () => {
    setLocationStatus("requesting")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords)
          setLocationStatus("granted")
          onLocationPermission(true)
        },
        (error) => {
          console.error("Location denied:", error)
          setLocationStatus("denied")
          onLocationPermission(false)
        },
      )
    } else {
      setLocationStatus("denied")
      onLocationPermission(false)
    }
  }

  const skipLocation = () => {
    onLocationPermission(false)
    onNext()
  }

  const handleNext = () => {
    onNext()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Location Access</CardTitle>
        <p className="text-center text-gray-600">Allow location access to find nearby storage partners</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Navigation className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Find Nearby Partners</h3>
              <p className="text-sm text-gray-600">Discover storage partners closest to your current location</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Privacy Protected</h3>
              <p className="text-sm text-gray-600">
                Your location data is encrypted and never shared with third parties
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Better Recommendations</h3>
              <p className="text-sm text-gray-600">Get personalized suggestions based on your location and interests</p>
            </div>
          </div>
        </div>

        {locationStatus === "idle" && (
          <div className="space-y-3">
            <Button onClick={requestLocation} className="w-full h-12 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Allow Location Access
            </Button>
            <Button onClick={skipLocation} variant="outline" className="w-full h-12 bg-transparent">
              Skip for Now
            </Button>
          </div>
        )}

        {locationStatus === "requesting" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Requesting location access...</p>
          </div>
        )}

        {locationStatus === "granted" && (
          <div className="space-y-4">
            <div className="text-center text-green-600">
              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Location access granted!</p>
            </div>
            <Button onClick={handleNext} className="w-full h-12 text-lg">
              Continue
            </Button>
          </div>
        )}

        {locationStatus === "denied" && (
          <div className="space-y-4">
            <div className="text-center text-orange-600">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Location access denied</p>
              <p className="text-sm text-gray-600">You can still use the app, but recommendations may be limited</p>
            </div>
            <Button onClick={handleNext} className="w-full h-12 text-lg">
              Continue Anyway
            </Button>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={onBack} variant="ghost" className="text-gray-600">
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
