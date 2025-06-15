"use client"

import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-red-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/baggage-logo.jpg" alt="Baggage Logo" className="h-8 w-auto object-contain" />
          <span className="text-lg md:text-xl font-bold text-red-800">Baggage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/become-partner" className="text-gray-700 hover:text-red-800 transition-colors text-sm">
            Become a Partner
          </Link>
          <Link href="/partner-login" className="text-gray-700 hover:text-red-800 transition-colors text-sm">
            Partner Login
          </Link>
          <Link href="/traveler" className="text-gray-700 hover:text-red-800 transition-colors text-sm">
            Traveler
          </Link>
          <Button variant="outline" size="sm" className="border-red-200 text-red-800 hover:bg-red-50">
            <Globe className="w-4 h-4 mr-2" />
            EN
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-red-100 shadow-lg animate-slide-in-down">
          <nav className="px-4 py-4 space-y-3">
            <Link
              href="/become-partner"
              className="block text-gray-700 hover:text-red-800 transition-colors py-3 text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Partner
            </Link>
            <Link
              href="/partner-login"
              className="block text-gray-700 hover:text-red-800 transition-colors py-3 text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner Login
            </Link>
            <Link
              href="/traveler"
              className="block text-gray-700 hover:text-red-800 transition-colors py-3 text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              Traveler
            </Link>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="border-red-200 text-red-800 hover:bg-red-50 w-full">
                <Globe className="w-4 h-4 mr-2" />
                English
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
