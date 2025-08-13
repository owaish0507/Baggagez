import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaggagePickup } from "@/components/baggage-pickup"

export default function PickupPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BaggagePickup bookingId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
