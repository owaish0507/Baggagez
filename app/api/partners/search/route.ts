import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")
  const businessType = searchParams.get("businessType")
  const latitude = searchParams.get("lat")
  const longitude = searchParams.get("lng")
  const radius = searchParams.get("radius") || "10" // km

  try {
    // Build query based on search parameters
    let query = `
      SELECT p.*, u.full_name as owner_name 
      FROM partners p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.is_active = true AND p.is_verified = true
    `

    const params: any[] = []

    if (city) {
      query += ` AND LOWER(p.city) LIKE LOWER($${params.length + 1})`
      params.push(`%${city}%`)
    }

    if (businessType) {
      query += ` AND p.business_type = $${params.length + 1}`
      params.push(businessType)
    }

    if (latitude && longitude) {
      // Add distance calculation using Haversine formula
      query += ` AND (
        6371 * acos(
          cos(radians($${params.length + 1})) * 
          cos(radians(p.latitude)) * 
          cos(radians(p.longitude) - radians($${params.length + 2})) + 
          sin(radians($${params.length + 1})) * 
          sin(radians(p.latitude))
        )
      ) <= $${params.length + 3}`
      params.push(Number.parseFloat(latitude), Number.parseFloat(longitude), Number.parseFloat(radius))
    }

    query += ` ORDER BY p.rating DESC, p.total_reviews DESC`

    // Execute query
    // const partners = await db.query(query, params)

    // Mock response for demo
    const mockPartners = [
      {
        id: 1,
        business_name: "Delhi Central Storage Hub",
        business_type: "travelling",
        city: "New Delhi",
        state: "Delhi",
        rating: 4.5,
        total_reviews: 25,
        price_per_hour: 40.0,
        price_per_day: 150.0,
        amenities: ["security_camera", "climate_control", "24x7_access"],
        owner_name: "Rajesh Kumar",
      },
    ]

    return NextResponse.json({
      success: true,
      partners: mockPartners,
    })
  } catch (error) {
    console.error("Partner search error:", error)
    return NextResponse.json({ success: false, message: "Search failed. Please try again." }, { status: 500 })
  }
}
