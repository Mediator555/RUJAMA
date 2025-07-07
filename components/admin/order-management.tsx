"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search, MessageCircle, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "Jean Claude Uwimana",
      phone: "+250 788 123 456",
      email: "jean@example.com",
      address: "Kigali, Gasabo District, Kimironko Sector",
    },
    items: [{ name: "iPhone 15 Pro Max", quantity: 1, price: 1299.99 }],
    total: 1403.99,
    status: "pending",
    paymentMethod: "Mobile Money",
    paymentStatus: "pending",
    date: "2024-01-15T10:30:00Z",
    deliveryTime: "afternoon",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Marie Uwimana",
      phone: "+250 788 987 654",
      email: "marie@example.com",
      address: "Kigali, Nyarugenge District, Nyamirambo Sector",
    },
    items: [
      { name: "Samsung Galaxy S24", quantity: 1, price: 799.99 },
      { name: "Samsung Fast Charger", quantity: 1, price: 29.99 },
    ],
    total: 896.39,
    status: "confirmed",
    paymentMethod: "Mobile Money",
    paymentStatus: "paid",
    date: "2024-01-15T09:15:00Z",
    deliveryTime: "morning",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Patrick Nzeyimana",
      phone: "+250 788 555 777",
      email: "patrick@example.com",
      address: "Kigali, Kicukiro District, Niboye Sector",
    },
    items: [{ name: "Apple Watch Series 9", quantity: 1, price: 399.99 }],
    total: 431.99,
    status: "shipped",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
    date: "2024-01-14T14:20:00Z",
    deliveryTime: "evening",
  },
  {
    id: "ORD-004",
    customer: {
      name: "Grace Mukamana",
      phone: "+250 788 333 444",
      email: "grace@example.com",
      address: "Kigali, Gasabo District, Kacyiru Sector",
    },
    items: [
      { name: "iPhone 14", quantity: 1, price: 699.99 },
      { name: "iPhone Leather Case", quantity: 1, price: 59.99 },
    ],
    total: 820.79,
    status: "delivered",
    paymentMethod: "Mobile Money",
    paymentStatus: "paid",
    date: "2024-01-13T11:45:00Z",
    deliveryTime: "anytime",
  },
]

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email: string
    address: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: string
  paymentMethod: string
  paymentStatus: string
  date: string
  deliveryTime: string
}

export function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    toast({
      title: "Order status updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "destructive",
      confirmed: "default",
      shipped: "secondary",
      delivered: "secondary",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  const getPaymentStatusBadge = (status: string) => {
    return <Badge variant={status === "paid" ? "secondary" : "destructive"}>{status}</Badge>
  }

  const handleWhatsAppContact = (order: Order) => {
    const message = `Hi ${order.customer.name}! This is RUJAMA PHONES SHOPS regarding your order ${order.id}. How can we help you?`
    const whatsappUrl = `https://wa.me/${order.customer.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>

        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{order.paymentMethod}</p>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              {/* Customer Info */}
                              <div>
                                <h3 className="font-semibold mb-2">Customer Information</h3>
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                  <p>
                                    <strong>Name:</strong> {selectedOrder.customer.name}
                                  </p>
                                  <p>
                                    <strong>Phone:</strong> {selectedOrder.customer.phone}
                                  </p>
                                  <p>
                                    <strong>Email:</strong> {selectedOrder.customer.email}
                                  </p>
                                  <p>
                                    <strong>Address:</strong> {selectedOrder.customer.address}
                                  </p>
                                  <p>
                                    <strong>Delivery Time:</strong> {selectedOrder.deliveryTime}
                                  </p>
                                </div>
                              </div>

                              {/* Order Items */}
                              <div>
                                <h3 className="font-semibold mb-2">Order Items</h3>
                                <div className="space-y-2">
                                  {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                      <span>
                                        {item.name} x{item.quantity}
                                      </span>
                                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg font-semibold">
                                    <span>Total</span>
                                    <span>${selectedOrder.total.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Status Update */}
                              <div>
                                <h3 className="font-semibold mb-2">Update Status</h3>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => updateOrderStatus(selectedOrder.id, "confirmed")}
                                    disabled={selectedOrder.status === "confirmed"}
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
                                    disabled={selectedOrder.status === "shipped"}
                                  >
                                    Ship
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => updateOrderStatus(selectedOrder.id, "delivered")}
                                    disabled={selectedOrder.status === "delivered"}
                                  >
                                    Delivered
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleWhatsAppContact(order)}
                        className="text-green-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
