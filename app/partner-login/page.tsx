"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function PartnerLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // For demo, any email/password combination works
      if (formData.email && formData.password) {
        router.push("/partner-dashboard")
      } else {
        alert("Please enter both email and password")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Partner Login</CardTitle>
              <p className="text-center text-gray-600">Access your storage partner dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="partner@example.com"
                      className="pl-10 h-12"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-12" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Demo credentials: Any email and password</p>
                  <Button variant="link" className="text-red-600">
                    Forgot your password?
                  </Button>
                </div>

                <div className="border-t pt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Not a partner yet?{" "}
                    <Button variant="link" className="text-red-600 p-0" onClick={() => router.push("/become-partner")}>
                      Join our network
                    </Button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
