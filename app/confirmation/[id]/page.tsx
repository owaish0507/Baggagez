import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingConfirmation } from "@/components/booking-confirmation"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BookingConfirmation partnerId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
