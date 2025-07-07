import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Truck, Headphones, Award, Users, MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About RUJAMA PHONES SHOPS</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for original mobile phones and accessories in Rwanda since 2020
        </p>
      </div>

      {/* Story Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              RUJAMA PHONES SHOPS was founded in 2020 with a simple mission: to provide Rwandans with access to genuine,
              high-quality mobile phones and accessories at competitive prices.
            </p>
            <p>
              Starting as a small shop in Kigali, we quickly gained the trust of our customers through our commitment to
              authenticity, excellent customer service, and competitive pricing. Today, we serve customers across Rwanda
              with both physical and online presence.
            </p>
            <p>
              We specialize in the latest iPhone and Samsung models, along with a comprehensive range of accessories
              including cases, chargers, screen protectors, and smartwatches. Every product we sell comes with a
              warranty and our guarantee of authenticity.
            </p>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="RUJAMA PHONES SHOPS Store"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose RUJAMA PHONES SHOPS?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">100% Original Products</h3>
              <p className="text-gray-600">
                All our phones and accessories are genuine, sourced directly from authorized distributors with full
                warranty coverage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery in Kigali and fast shipping across Rwanda. We ensure your products reach you safely
                and on time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Headphones className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is available round the clock via WhatsApp, phone, or email to assist with any
                queries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                We offer the best prices in the market without compromising on quality. Regular promotions and discounts
                available.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">
                Over 5,000 satisfied customers across Rwanda trust us for their mobile phone and accessory needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Local Presence</h3>
              <p className="text-gray-600">
                Based in Rwanda, we understand local needs and provide personalized service with local language support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
            <p className="text-gray-600">
              To provide Rwandans with access to the latest, genuine mobile technology at competitive prices, backed by
              exceptional customer service and support.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
            <p className="text-gray-600">
              To become Rwanda's leading mobile phone retailer, known for authenticity, reliability, and customer
              satisfaction, while contributing to the digital transformation of our community.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Products Sold</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
            <div className="text-gray-600">Years of Service</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our dedicated team of mobile technology experts is committed to providing you with the best shopping
          experience and technical support.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Jean Baptiste</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Marie Claire</h3>
              <p className="text-gray-600">Customer Service Manager</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="Team Member"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Patrick Uwimana</h3>
              <p className="text-gray-600">Technical Support Specialist</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
