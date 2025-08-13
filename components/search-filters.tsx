"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function SearchFilters() {
  const [openSections, setOpenSections] = useState({
    price: true,
    city: true,
    type: false,
    facilities: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const facilityOptions = [
    "24x7 Access",
    "Security Camera",
    "Climate Control",
    "Cafe Available",
    "Supermarket",
    "Religious Authority",
    "Spiritual Friendly",
    "Free Water",
    "Insurance Covered",
    "WiFi",
    "Tourist Guide",
    "Heritage Site",
    "Food Court",
    "Shopping Area",
    "Business Center",
    "Beach Access",
    "Garden View",
    "Temple Authority",
    "Historical Place",
    "Memorial Site",
    "Yoga Mats",
    "Ganga View",
    "Pilgrimage Site",
    "Museum",
    "Night Life",
    "Traditional Market",
  ]

  const partnerTypes = [
    "Railway Station",
    "Business Center",
    "Religious Place",
    "Tourist Attraction",
    "Shopping Mall",
    "Cafe/Restaurant",
    "Spiritual Place",
    "Heritage Site",
  ]

  const cities = [
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Jaipur",
    "Punjab",
    "Uttarakhand",
    "Kolkata",
    "Hyderabad",
    "Pune",
  ]

  return (
    <div className="space-y-4 sm:space-y-6 h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      {/* Price Range */}
      <Card>
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                Price Range
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">Standard pricing for all partners:</p>
                <p className="font-semibold">₹30 (2hrs) to ₹350 (24hrs with insurance)</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* City */}
      <Card>
        <Collapsible open={openSections.city} onOpenChange={() => toggleSection("city")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                City
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.city ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {cities.map((city) => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox id={city} />
                    <Label htmlFor={city} className="text-sm cursor-pointer">
                      {city}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Partner Type */}
      <Card>
        <Collapsible open={openSections.type} onOpenChange={() => toggleSection("type")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                Partner Type
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections.type ? "rotate-180" : ""}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {partnerTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type} />
                    <Label htmlFor={type} className="text-sm cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Facilities */}
      <Card>
        <Collapsible open={openSections.facilities} onOpenChange={() => toggleSection("facilities")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                Facilities
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openSections.facilities ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {facilityOptions.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox id={facility} />
                    <Label htmlFor={facility} className="text-sm cursor-pointer">
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  )
}
