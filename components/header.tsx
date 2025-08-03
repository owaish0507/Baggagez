"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import Image from "next/image"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/baggage-logo.jpg"
              alt="Baggages Logo"
              width={40}
              height={40}
              className="h-8 sm:h-10 w-8 sm:w-10 rounded-md"
            />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Baggages</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/become-partner"
              className="text-gray-700 hover:text-red-600 transition-colors text-sm lg:text-base"
            >
              Become a Partner
            </Link>
            <Link
              href="/partner-login"
              className="text-gray-700 hover:text-red-600 transition-colors text-sm lg:text-base"
            >
              Partner Login
            </Link>
            <Link
              href="/user-login"
              className="text-gray-700 hover:text-red-600 transition-colors text-sm lg:text-base"
            >
              User Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी</DropdownMenuItem>
                <DropdownMenuItem>தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <SheetClose asChild>
                    <Link
                      href="/become-partner"
                      className="text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 text-base font-medium"
                    >
                      Become a Partner
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/partner-login"
                      className="text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 text-base font-medium"
                    >
                      Partner Login
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/user-login"
                      className="text-gray-700 hover:text-red-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 text-base font-medium"
                    >
                      User Login
                    </Link>
                  </SheetClose>

                  <div className="border-t pt-4">
                    <div className="px-4 py-2 text-sm text-gray-500 font-medium">Language</div>
                    <div className="space-y-2">
                      <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-700">
                        English
                      </button>
                      <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-700">
                        हिंदी
                      </button>
                      <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-700">
                        தமிழ்
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
