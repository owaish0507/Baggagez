import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate password match
    if (data.password !== data.confirmPassword) {
      return NextResponse.json({ success: false, message: "Passwords do not match" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const userData = {
      email: data.email,
      password_hash: hashedPassword,
      full_name: data.fullName,
      phone: data.phone,
      user_type: data.userType,
    }

    // Insert user into database
    // const user = await db.query('INSERT INTO users (...) VALUES (...) RETURNING *', userData)

    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
      // user: { id: user.id, email: user.email, fullName: user.full_name }
    })
  } catch (error) {
    console.error("User creation error:", error)
    return NextResponse.json({ success: false, message: "Account creation failed. Please try again." }, { status: 500 })
  }
}
