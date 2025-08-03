import { Header } from "@/components/header"
import { PartnerRegistrationForm } from "@/components/partner-registration-form"
import { PartnerBenefits } from "@/components/partner-benefits"
import { Footer } from "@/components/footer"

export default function BecomePartnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-red-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Storage Partner</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our network of trusted storage providers and earn extra income by helping travelers store their
              belongings safely.
            </p>
          </div>
        </div>
        <PartnerBenefits />
        <PartnerRegistrationForm />
      </main>
      <Footer />
    </div>
  )
}
