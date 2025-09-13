import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PartnerDetails } from "@/components/partner-details"

export default function PartnerDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <PartnerDetails partnerId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
