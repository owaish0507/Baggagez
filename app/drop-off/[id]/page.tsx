import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaggageDropOff } from "@/components/baggage-drop-off"

export default function DropOffPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BaggageDropOff bookingId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
