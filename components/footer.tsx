import Link from "next/link"
import { Smartphone, Facebook, Instagram, MessageCircle, Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-6 w-6 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-blue-400">RUJAMA</span>
                <span className="text-xs text-gray-400">PHONES SHOPS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted destination for original mobile phones and accessories in Rwanda.
            </p>
            <div className="flex space-x-4">
              <Link href="https://web.facebook.com/profile.php?id=100077072063658" target="_blank">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </Link>
              <Link href="https://www.instagram.com/rujama_phones_shop/?hl=en" target="_blank">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </Link>
              <Link href="https://wa.me/250788773754" target="_blank">
                <MessageCircle className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=iphone" className="text-gray-400 hover:text-white">
                  iPhones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=samsung" className="text-gray-400 hover:text-white">
                  Samsung Phones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-gray-400 hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=smartwatch" className="text-gray-400 hover:text-white">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link href="/shop?category=speakers" className="text-gray-400 hover:text-white">
                  Speakers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-white">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+250 788 773 754</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <Link href="https://wa.me/250788773754" target="_blank" className="text-gray-400 hover:text-white">
                  WhatsApp Us
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-400">Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@rujamashop.com</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-blue-900 rounded-lg">
              <p className="text-sm font-semibold text-blue-200">Mobile Money Payment</p>
              <p className="text-sm text-gray-300">
                Pay to MoMo: <span className="font-bold">316032</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 RUJAMA PHONES SHOPS. All rights reserved.</p>
          <p className="text-sm mt-2">Original phones • Fast delivery • Trusted service</p>
        </div>
      </div>
    </footer>
  )
}
