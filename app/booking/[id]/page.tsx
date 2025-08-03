import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <BookingForm partnerId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
