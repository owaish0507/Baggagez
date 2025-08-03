import { Header } from "@/components/header"
import { ProfileCreationForm } from "@/components/profile-creation-form"
import { Footer } from "@/components/footer"

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Profile</h1>
            <p className="text-lg text-gray-600">Set up your account to start using Baggagez services</p>
          </div>
          <ProfileCreationForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
