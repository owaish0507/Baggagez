"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, MapPin, User, Package } from "lucide-react"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
              <Image
                src="/images/new-baggages-logo.jpg"
                alt="Baggages Logo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-6 lg:gap-x-8 ml-auto">
            <Link
              href="/become-partner"
              className="text-gray-700 hover:text-red-600 transition-colors text-base font-medium px-2 py-1"
            >
              Become Partner
            </Link>
            <Link
              href="/partner-login"
              className="text-gray-700 hover:text-red-600 transition-colors text-base font-medium px-2 py-1"
            >
              Partner Login
            </Link>
            <Link
              href="/user-login"
              className="text-gray-700 hover:text-red-600 transition-colors text-base font-medium px-2 py-1"
            >
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-3 space-y-1">
              <Link
                href="/become-partner"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-4 h-4 mr-3" />
                Become Partner
              </Link>
              <Link
                href="/partner-login"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-4 h-4 mr-3" />
                Partner Login
              </Link>
              <Link
                href="/user-login"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-3" />
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
