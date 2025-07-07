"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/250788773754"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  )
}
