import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order Number:</span>
              <span className="font-mono text-blue-600">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Delivery:</span>
              <span>3-5 business days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Shipping Method:</span>
              <span>Standard Shipping (Free)</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Confirmation Email</h3>
            <p className="text-sm text-gray-600">Check your email for order details</p>
          </div>
          <div className="text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Order Processing</h3>
            <p className="text-sm text-gray-600">We'll prepare your items for shipping</p>
          </div>
          <div className="text-center">
            <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Your order will arrive in 3-5 days</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/orders">Track Order</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
