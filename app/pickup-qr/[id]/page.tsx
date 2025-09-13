import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PickupQRCode } from "@/components/pickup-qr-code"

export default function PickupQRPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <PickupQRCode bookingId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
