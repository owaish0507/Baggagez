import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserLoginForm } from "@/components/user-login-form"

export default function UserLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full py-4 sm:py-6 lg:py-12 px-2 sm:px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Join Baggages</h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Create your account to start storing your luggage safely
            </p>
          </div>
          <UserLoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
