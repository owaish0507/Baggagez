import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/baggage-logo.jpg"
                alt="Baggages Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-md"
              />
              <span className="text-xl font-bold">Baggages</span>
            </div>
            <p className="text-gray-300">
              Travel hand-free and store your memories safely with our trusted network of storage partners across India.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                Welcome to Baggages — your trusted partner for safe, convenient, and affordable luggage storage. We
                understand the hassle of carrying bags everywhere while exploring a city, attending meetings, or waiting
                to check in.
              </p>
              <p>
                At Baggages, our mission is to help you travel lighter and stress-free. We connect travelers with
                verified local storage partners near metro stations, markets, tourist spots, and business centers.
              </p>
            </div>
          </div>

          {/* Safety & Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Safety & Security</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Your belongings' safety is our highest priority:</p>
              <ul className="space-y-1 text-xs">
                <li>✅ Verified Storage Partners</li>
                <li>✅ Safe Storage Areas</li>
                <li>✅ Tamper-Proof Seals</li>
                <li>✅ Insurance Protection</li>
                <li>✅ 24/7 Support</li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">How It Works</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Storing your bags is quick and easy:</p>
              <ul className="space-y-1 text-xs">
                <li>1️⃣ Find & Book nearby storage</li>
                <li>2️⃣ Drop Off with confirmation</li>
                <li>3️⃣ Explore Freely hands-free</li>
                <li>4️⃣ Pick Up safely anytime</li>
              </ul>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Terms & Conditions</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Key terms to remember:</p>
              <ul className="space-y-1 text-xs">
                <li>• Online booking & advance payment required</li>
                <li>• Valid ID needed at check-in</li>
                <li>• No illegal, hazardous, or high-value items</li>
                <li>• Insurance coverage included</li>
                <li>• Check operating hours</li>
                <li>• Cancel 2+ hours before for refund</li>
              </ul>
              <p className="text-red-400 font-semibold mt-2">Travel light. Explore more!</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">support@baggages.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+91-1800-BAGGAGE</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Baggages. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
