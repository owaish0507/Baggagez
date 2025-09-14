"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, CheckCircle, AlertCircle } from "lucide-react"

interface LocationPermissionProps {
  onLocationPermission: (enabled: boolean) => void
  onNext: () => void
  onBack: () => void
}

export function LocationPermission({ onLocationPermission, onNext, onBack }: LocationPermissionProps) {
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle")
  const [currentLocation, setCurrentLocation] = useState<string>("")

  const requestLocation = async () => {
    setLocationStatus("requesting")

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser")
      setLocationStatus("denied")
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      // Mock reverse geocoding - in real app, use a geocoding service
      const mockLocation = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
      setCurrentLocation(mockLocation)
      setLocationStatus("granted")
      onLocationPermission(true)
    } catch (error) {
      console.error("Error getting location:", error)
      setLocationStatus("denied")
      onLocationPermission(false)
    }
  }

  const skipLocation = () => {
    setLocationStatus("denied")
    onLocationPermission(false)
  }

  const handleNext = () => {
    onNext()
  }

  return (
    <Card className="w-full border-0 sm:border shadow-none sm:shadow-sm">
      <CardHeader className="pb-2 sm:pb-3 md:pb-4 px-3 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl text-center">Location Permission</CardTitle>
        <p className="text-center text-gray-600 text-xs sm:text-sm md:text-base">
          Help us find baggage storage options near you
        </p>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Enable Location Services</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6">
            We'll use your location to show you the nearest baggage storage partners and provide personalized
            recommendations based on your area.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-800 text-sm sm:text-base">Privacy Protected</h4>
              <p className="text-xs sm:text-sm text-green-700 mt-1">
                Your location data is encrypted and only used to improve your experience. We never share your location
                with third parties.
              </p>
            </div>
          </div>

          {locationStatus === "granted" && (
            <div className="flex items-start space-x-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 text-sm sm:text-base">Location Detected</h4>
                <p className="text-xs sm:text-sm text-blue-700 mt-1">Current location: {currentLocation}</p>
              </div>
            </div>
          )}

          {locationStatus === "denied" && (
            <div className="flex items-start space-x-3 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 text-sm sm:text-base">Location Access Denied</h4>
                <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                  You can still use the app, but you'll need to manually search for storage locations.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {locationStatus === "idle" && (
            <>
              <Button
                onClick={requestLocation}
                className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base lg:text-lg bg-blue-600 hover:bg-blue-700"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Enable Location
              </Button>
              <Button
                onClick={skipLocation}
                variant="outline"
                className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base bg-transparent"
              >
                Skip for Now
              </Button>
            </>
          )}

          {locationStatus === "requesting" && (
            <Button disabled className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
              Requesting Location...
            </Button>
          )}

          {(locationStatus === "granted" || locationStatus === "denied") && (
            <Button
              onClick={handleNext}
              className="w-full h-9 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base lg:text-lg bg-red-600 hover:bg-red-700"
            >
              Continue
            </Button>
          )}

          <div className="flex justify-center">
            <Button onClick={onBack} variant="ghost" className="text-gray-600 text-xs sm:text-sm md:text-base">
              Back
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
