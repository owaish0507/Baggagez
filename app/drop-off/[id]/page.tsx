import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaggageDropOff } from "@/components/baggage-drop-off"

export default function DropOffPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <BaggageDropOff bookingId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
