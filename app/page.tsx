import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart, Truck, Shield, Headphones, MessageCircle } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    originalPrice: 1399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 89,
    badge: "Best Seller",
    category: "iPhone",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 67,
    badge: "New Arrival",
    category: "Samsung",
  },
  {
    id: 3,
    name: "iPhone 14 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 124,
    badge: "Sale",
    category: "iPhone",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 45,
    category: "Smartwatch",
  },
]

const categories = [
  {
    name: "iPhones",
    description: "Latest iPhone models",
    image: "/placeholder.svg?height=200&width=200",
    count: "15+ Models",
  },
  {
    name: "Samsung",
    description: "Galaxy series phones",
    image: "/placeholder.svg?height=200&width=200",
    count: "20+ Models",
  },
  {
    name: "Accessories",
    description: "Cases, chargers & more",
    image: "/placeholder.svg?height=200&width=200",
    count: "50+ Items",
  },
  {
    name: "Smart Watches",
    description: "Apple & Samsung watches",
    image: "/placeholder.svg?height=200&width=200",
    count: "10+ Models",
  },
]

const testimonials = [
  {
    name: "Jean Claude",
    rating: 5,
    comment: "Excellent service! Got my iPhone 15 delivered the same day. Highly recommended!",
    location: "Kigali",
  },
  {
    name: "Marie Uwimana",
    rating: 5,
    comment: "Best phone shop in Rwanda. Original products and great customer service.",
    location: "Nyamirambo",
  },
  {
    name: "Patrick Nzeyimana",
    rating: 5,
    comment: "Fast delivery and genuine products. Will definitely shop here again!",
    location: "Kimisagara",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">RUJAMA PHONES SHOPS</h1>
              <p className="text-xl mb-8 text-blue-100">
                Your trusted destination for original iPhones, Samsung phones, and premium accessories in Rwanda
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" asChild>
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  asChild
                >
                  <Link href="https://wa.me/250788773754" target="_blank">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Latest Phones"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <Badge className="absolute top-4 right-4 bg-red-500 text-white">New Arrivals</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of mobile phones and accessories from top brands
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-24 h-24 mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <Badge variant="secondary">{category.count}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Check out our most popular phones and accessories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
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
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RUJAMA PHONES SHOPS?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">100% Original Products</h3>
              <p className="text-gray-600">All our phones and accessories are genuine and come with warranty</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery in Kigali and fast shipping across Rwanda</p>
            </div>
            <div className="text-center">
              <Headphones className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help anytime via WhatsApp or phone call</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Trusted by thousands of customers across Rwanda</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified about new arrivals, special offers, and exclusive deals
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-900" />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
