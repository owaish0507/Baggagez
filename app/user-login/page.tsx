import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserLoginForm } from "@/components/user-login-form"

export default function UserLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto h-full">
          <div className="text-center mb-3 sm:mb-4 md:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 lg:mb-4">
              Join Baggages
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-2">
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
