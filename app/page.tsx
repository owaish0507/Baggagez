import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EnhancedFeaturesSection } from "@/components/enhanced-features-section"
import { PricingSection } from "@/components/pricing-section"
import { PartnersSection } from "@/components/partners-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <Header />
      <main>
        <HeroSection />
        <EnhancedFeaturesSection />
        <PricingSection />
        <PartnersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
