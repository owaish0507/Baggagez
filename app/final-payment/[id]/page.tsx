import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FinalPayment } from "@/components/final-payment"

export default function FinalPaymentPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <FinalPayment bookingId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
