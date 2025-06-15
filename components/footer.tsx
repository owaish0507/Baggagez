import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-red-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-red-800 font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold">Baggage</span>
            </div>
            <p className="text-red-100 text-sm">Safe and convenient luggage storage across India</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Travelers</h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>
                <Link href="/how-it-works" className="hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white">
                  Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Partners</h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>
                <Link href="/become-partner" className="hover:text-white">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="/partner-login" className="hover:text-white">
                  Partner Login
                </Link>
              </li>
              <li>
                <Link href="/partner-support" className="hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-red-100">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-700 mt-8 pt-8 text-center text-sm text-red-100">
          <p>&copy; 2024 Baggage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
