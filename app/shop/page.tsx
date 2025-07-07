"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Search, Filter, MessageCircle } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    originalPrice: 1399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    category: "iphone",
    brand: "Apple",
    badge: "Best Seller",
    inStock: true,
    description: "Latest iPhone with titanium design and A17 Pro chip",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 67,
    category: "iphone",
    brand: "Apple",
    badge: "Sale",
    inStock: true,
    description: "Pro iPhone with advanced camera system",
  },
  {
    id: 3,
    name: "iPhone 14",
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 124,
    category: "iphone",
    brand: "Apple",
    inStock: true,
    description: "Reliable iPhone with great performance",
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 45,
    category: "samsung",
    brand: "Samsung",
    badge: "New Arrival",
    inStock: true,
    description: "Premium Samsung with S Pen and AI features",
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    price: 799.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 78,
    category: "samsung",
    brand: "Samsung",
    inStock: true,
    description: "Flagship Samsung with excellent camera",
  },
  {
    id: 6,
    name: "Samsung Galaxy A54",
    price: 449.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 92,
    category: "samsung",
    brand: "Samsung",
    inStock: true,
    description: "Mid-range Samsung with great value",
  },
  {
    id: 7,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 56,
    category: "smartwatch",
    brand: "Apple",
    inStock: true,
    description: "Latest Apple Watch with health monitoring",
  },
  {
    id: 8,
    name: "Samsung Galaxy Watch 6",
    price: 329.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 34,
    category: "smartwatch",
    brand: "Samsung",
    inStock: true,
    description: "Samsung smartwatch with fitness tracking",
  },
  {
    id: 9,
    name: "iPhone Leather Case",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 123,
    category: "accessories",
    brand: "Apple",
    inStock: true,
    description: "Premium leather case for iPhone",
  },
  {
    id: 10,
    name: "Samsung Fast Charger",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 89,
    category: "accessories",
    brand: "Samsung",
    inStock: true,
    description: "Fast charging adapter for Samsung phones",
  },
  {
    id: 11,
    name: "JBL Bluetooth Speaker",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 67,
    category: "speakers",
    brand: "JBL",
    inStock: true,
    description: "Portable Bluetooth speaker with great sound",
  },
  {
    id: 12,
    name: "Power Bank 20000mAh",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 145,
    category: "accessories",
    brand: "Generic",
    inStock: true,
    description: "High capacity power bank for all devices",
  },
]

const categories = [
  { value: "all", label: "All Products" },
  { value: "iphone", label: "iPhones" },
  { value: "samsung", label: "Samsung" },
  { value: "accessories", label: "Accessories" },
  { value: "smartwatch", label: "Smart Watches" },
  { value: "speakers", label: "Speakers" },
]

const brands = [
  { value: "all", label: "All Brands" },
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "JBL", label: "JBL" },
]

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const { addItem } = useCart()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  // Set initial category from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (selectedBrand === "all" || product.brand === selectedBrand) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppInquiry = (product: (typeof products)[0]) => {
    const message = `Hi! I'm interested in the ${product.name} priced at $${product.price}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/250788773754?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop All Products</h1>
        <p className="text-gray-600">Discover our complete range of mobile phones and accessories</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.value}
                    checked={selectedCategory === category.value}
                    onCheckedChange={() => setSelectedCategory(category.value)}
                  />
                  <label htmlFor={category.value} className="text-sm">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="text-sm font-medium mb-2 block">Brand</label>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.value}
                    checked={selectedBrand === brand.value}
                    onCheckedChange={() => setSelectedBrand(brand.value)}
                  />
                  <label htmlFor={brand.value} className="text-sm">
                    {brand.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">Showing {filteredProducts.length} products</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.badge && (
                      <Badge
                        className={`absolute top-2 left-2 ${
                          product.badge === "Sale"
                            ? "bg-red-500"
                            : product.badge === "New Arrival"
                              ? "bg-green-500"
                              : "bg-blue-500"
                        }`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                    {!product.inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Button asChild className="flex-1" disabled={!product.inStock}>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleWhatsAppInquiry(product)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Inquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
