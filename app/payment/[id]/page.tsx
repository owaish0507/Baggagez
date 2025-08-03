import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import PaymentForm from "@/components/payment-form"

export default function PaymentPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <PaymentForm partnerId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
