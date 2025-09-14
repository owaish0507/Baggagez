import { Header } from "@/components/header"
import { PartnerRegistrationForm } from "@/components/partner-registration-form"
import { PartnerBenefits } from "@/components/partner-benefits"
import { Footer } from "@/components/footer"

export default function BecomePartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Mobile Optimized */}
        <div className="bg-red-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              Become a Storage Partner
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
              Join our network of trusted storage providers and earn extra income by helping travelers store their
              belongings safely.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <PartnerBenefits />

        {/* Registration Form */}
        <PartnerRegistrationForm />
      </main>
      <Footer />
    </div>
  )
}
