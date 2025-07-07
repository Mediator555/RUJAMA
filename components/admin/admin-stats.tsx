"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const statsData = {
  revenue: {
    current: 45670.5,
    previous: 38920.3,
    growth: 17.3,
  },
  orders: {
    current: 89,
    previous: 76,
    growth: 17.1,
  },
  customers: {
    current: 234,
    previous: 198,
    growth: 18.2,
  },
  products: {
    current: 156,
    previous: 142,
    growth: 9.9,
  },
}

export function AdminStats() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatGrowth = (growth: number) => {
    const isPositive = growth > 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs font-medium">{Math.abs(growth).toFixed(1)}%</span>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(statsData.revenue.current)}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">vs {formatCurrency(statsData.revenue.previous)} last month</p>
            {formatGrowth(statsData.revenue.growth)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.orders.current}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">vs {statsData.orders.previous} last month</p>
            {formatGrowth(statsData.orders.growth)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.customers.current}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">vs {statsData.customers.previous} last month</p>
            {formatGrowth(statsData.customers.growth)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.products.current}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">vs {statsData.products.previous} last month</p>
            {formatGrowth(statsData.products.growth)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
