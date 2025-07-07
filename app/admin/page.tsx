"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, TrendingUp, AlertTriangle, DollarSign, Eye } from "lucide-react"
import { ProductManagement } from "@/components/admin/product-management"
import { OrderManagement } from "@/components/admin/order-management"
import { InventoryManagement } from "@/components/admin/inventory-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock data for dashboard stats
const dashboardStats = {
  totalProducts: 156,
  totalOrders: 89,
  totalCustomers: 234,
  totalRevenue: 45670.5,
  lowStockItems: 12,
  pendingOrders: 15,
  todayOrders: 8,
  monthlyGrowth: 12.5,
}

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Jean Claude",
    product: "iPhone 15 Pro Max",
    amount: 1299.99,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Marie Uwimana",
    product: "Samsung Galaxy S24",
    amount: 799.99,
    status: "confirmed",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Patrick Nzeyimana",
    product: "Apple Watch Series 9",
    amount: 399.99,
    status: "shipped",
    date: "2024-01-14",
  },
]

const lowStockProducts = [
  { name: "iPhone 15 Pro Max", stock: 2, category: "iPhone" },
  { name: "Samsung Galaxy S24 Ultra", stock: 1, category: "Samsung" },
  { name: "Apple Watch Series 9", stock: 3, category: "Smartwatch" },
  { name: "iPhone Leather Case", stock: 5, category: "Accessories" },
]

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
  // Move all existing component logic here
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">RUJAMA PHONES SHOPS - Admin Panel</h1>
        <p className="text-gray-600">Manage your store, products, and orders</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active products in store</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{dashboardStats.todayOrders}</span> today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{dashboardStats.monthlyGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{dashboardStats.lowStockItems}</div>
                <p className="text-xs text-muted-foreground">Items need restocking</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.product}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.amount}</p>
                        <Badge
                          variant={
                            order.status === "pending"
                              ? "destructive"
                              : order.status === "confirmed"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Items */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">{product.stock} left</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTab("products")}
                >
                  <Package className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium">Add New Product</h3>
                  <p className="text-sm text-gray-600">Add phones or accessories</p>
                </div>
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTab("orders")}
                >
                  <Eye className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-medium">View Orders</h3>
                  <p className="text-sm text-gray-600">Manage customer orders</p>
                </div>
                <div
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTab("inventory")}
                >
                  <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-medium">Update Inventory</h3>
                  <p className="text-sm text-gray-600">Manage stock levels</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
