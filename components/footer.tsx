import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/baggage-logo.jpg"
                alt="Baggages Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold">Baggages</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for safe and convenient luggage storage across India. Travel light, explore more!
            </p>
            <div className="flex items-center space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Become a Partner</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Storage Locations</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Support</Link>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/luggage-storage" className="text-gray-300 hover:text-white transition-colors text-sm">Luggage Storage</Link>
              <Link href="/business-storage" className="text-gray-300 hover:text-white transition-colors text-sm">Business Storage</Link>
              <Link href="/group-bookings" className="text-gray-300 hover:text-white transition-colors text-sm">Group Bookings</Link>
              <Link href="/insurance" className="text-gray-300 hover:text-white transition-colors text-sm">Insurance Coverage</Link>
              <Link href="/faqs" className="text-gray-300 hover:text-white transition-colors text-sm">FAQs</Link>
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:support@baggages.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  support@baggages.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+911800BAGGAGE" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +91-1800-BAGGAGE
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Baggages. All rights reserved.
            </p>
            <nav className="flex items-center space-x-6">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
