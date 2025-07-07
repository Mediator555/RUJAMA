"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Search, Menu, Heart, Smartphone, MessageCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { UserMenu } from "@/components/auth/user-menu"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-600">RUJAMA</span>
              <span className="text-xs text-gray-500">PHONES SHOPS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link href="/shop?category=iphone" className="text-sm font-medium hover:text-blue-600 transition-colors">
              iPhones
            </Link>
            <Link href="/shop?category=samsung" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Samsung
            </Link>
            <Link
              href="/shop?category=accessories"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Accessories
            </Link>
            <Link
              href="/shop?category=smartwatch"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Smart Watches
            </Link>
            <Link href="/shop?category=speakers" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Speakers
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search phones..." className="pl-8" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* WhatsApp */}
            <Button variant="ghost" size="icon" className="hidden md:flex text-green-600" asChild>
              <Link href="https://wa.me/250788773754" target="_blank">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            <UserMenu />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/shop?category=iphone"
                    className="text-lg font-medium hover:text-blue-600 transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    iPhones
                  </Link>
                  <Link
                    href="/shop?category=samsung"
                    className="text-lg font-medium hover:text-blue-600 transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Samsung
                  </Link>
                  <Link
                    href="/shop?category=accessories"
                    className="text-lg font-medium hover:text-blue-600 transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Accessories
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="https://wa.me/250788773754"
                    target="_blank"
                    className="text-lg font-medium text-green-600 hover:text-green-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    WhatsApp Us
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
