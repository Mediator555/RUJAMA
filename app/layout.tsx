import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RUJAMA PHONES SHOPS - Original Mobile Phones & Accessories in Rwanda",
  description:
    "Your trusted destination for original iPhones, Samsung phones, and premium accessories in Rwanda. Fast delivery, genuine products, competitive prices.",
  keywords:
    "iPhone Rwanda, Samsung Rwanda, mobile phones Kigali, phone accessories, original phones, RUJAMA PHONES SHOPS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
