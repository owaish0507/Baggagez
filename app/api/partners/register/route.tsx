import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// This would typically use your database connection
// For demo purposes, I'm showing the structure

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password || "defaultPassword", 10)

    // Generate application ID
    const applicationId = `BGS-${Date.now().toString().slice(-6)}`

    // Create user first
    const userData = {
      email: data.email,
      password_hash: hashedPassword,
      full_name: data.fullName,
      phone: data.phone,
      user_type: "partner",
    }

    // Insert user into database
    // const user = await db.query('INSERT INTO users (...) VALUES (...) RETURNING id', userData)

    // Create partner record
    const partnerData = {
      // user_id: user.id,
      business_name: data.businessName,
      business_type: data.businessType === "other" ? data.customBusinessType : data.businessType,
      description: data.description,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      contact_phone: data.phone,
      contact_email: data.email,
      storage_capacity: Number.parseInt(data.maxBaggageLimit),
      amenities: data.amenities,
      operating_hours: data.operatingHours,
      is_verified: false,
      is_active: false,
      application_id: applicationId,
      application_status: "pending",
      submitted_at: new Date().toISOString(),
    }

    // Insert partner into database
    // await db.query('INSERT INTO partners (...) VALUES (...)', partnerData)

    // Send confirmation email
    await sendPartnerConfirmationEmail({
      email: data.email,
      fullName: data.fullName,
      businessName: data.businessName,
      applicationId: applicationId,
      phone: data.phone,
    })

    return NextResponse.json({
      success: true,
      message: "Partner registration submitted successfully. We will review your application and contact you soon.",
      applicationId: applicationId,
    })
  } catch (error) {
    console.error("Partner registration error:", error)
    return NextResponse.json({ success: false, message: "Registration failed. Please try again." }, { status: 500 })
  }
}

async function sendPartnerConfirmationEmail({
  email,
  fullName,
  businessName,
  applicationId,
  phone,
}: {
  email: string
  fullName: string
  businessName: string
  applicationId: string
  phone: string
}) {
  // In a real application, you would use a service like:
  // - Resend
  // - SendGrid
  // - AWS SES
  // - Nodemailer with SMTP

  const emailContent = {
    to: email,
    subject: `Partner Application Received - ${applicationId}`,
    html: generatePartnerConfirmationEmailHTML({
      fullName,
      businessName,
      applicationId,
      phone,
    }),
  }

  // Simulate email sending
  console.log("Sending confirmation email:", emailContent)

  // Example with a hypothetical email service:
  // await emailService.send(emailContent)

  return true
}

function generatePartnerConfirmationEmailHTML({
  fullName,
  businessName,
  applicationId,
  phone,
}: {
  fullName: string
  businessName: string
  applicationId: string
  phone: string
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Partner Application Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .application-id { background: #e5e7eb; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; }
        .steps { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
        .step-number { background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 15px; flex-shrink: 0; }
        .step-content h4 { margin: 0 0 5px 0; color: #dc2626; }
        .step-content p { margin: 0; color: #666; font-size: 14px; }
        .contact-info { background: #dbeafe; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🎒 Baggages</div>
        <h1>Partner Application Received!</h1>
      </div>
      
      <div class="content">
        <h2>Dear ${fullName},</h2>
        
        <p>Thank you for your interest in becoming a storage partner with <strong>Baggages</strong>! We have successfully received your application for <strong>${businessName}</strong>.</p>
        
        <div class="application-id">
          Application ID: ${applicationId}
        </div>
        
        <p>Please save this Application ID for your records. You can use it to track the status of your application.</p>
        
        <div class="steps">
          <h3>What happens next?</h3>
          
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Application Review</h4>
              <p>Our team will review your application within 24-48 hours</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Verification Call</h4>
              <p>We'll contact you at ${phone} for verification and to discuss details</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Site Visit</h4>
              <p>Our representative will visit your location for final approval</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Onboarding</h4>
              <p>Complete setup and start earning with Baggages</p>
            </div>
          </div>
        </div>
        
        <div class="contact-info">
          <h3>Need Help?</h3>
          <p><strong>Email:</strong> <a href="mailto:partners@baggages.com">partners@baggages.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+911234567890">+91 12345 67890</a></p>
          <p><strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
        </div>
        
        <h3>Why Partner with Baggages?</h3>
        <ul>
          <li>✅ <strong>60% Revenue Share</strong> - Keep majority of earnings</li>
          <li>✅ <strong>Standardized Pricing</strong> - No price competition</li>
          <li>✅ <strong>Marketing Support</strong> - We bring customers to you</li>
          <li>✅ <strong>Easy Management</strong> - Simple partner dashboard</li>
          <li>✅ <strong>Insurance Coverage</strong> - Protected storage</li>
        </ul>
        
        <p>We're excited about the possibility of working together and will be in touch soon!</p>
        
        <p>Best regards,<br>
        <strong>The Baggages Team</strong></p>
      </div>
      
      <div class="footer">
        <p>This is an automated email. Please do not reply to this email address.</p>
        <p>© 2024 Baggages. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}
