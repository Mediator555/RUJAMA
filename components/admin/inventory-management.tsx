"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Minus, Search, AlertTriangle, Package, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Mock inventory data
const mockInventory = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "iPhone",
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    cost: 1100.0,
    sellPrice: 1299.99,
    supplier: "Apple Authorized Distributor",
    lastRestocked: "2024-01-10",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Samsung",
    currentStock: 3,
    minStock: 5,
    maxStock: 30,
    cost: 950.0,
    sellPrice: 1199.99,
    supplier: "Samsung Rwanda",
    lastRestocked: "2024-01-08",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    currentStock: 2,
    minStock: 3,
    maxStock: 20,
    cost: 320.0,
    sellPrice: 399.99,
    supplier: "Apple Authorized Distributor",
    lastRestocked: "2024-01-05",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "iPhone Leather Case",
    category: "Accessories",
    currentStock: 25,
    minStock: 10,
    maxStock: 100,
    cost: 35.0,
    sellPrice: 59.99,
    supplier: "Apple Authorized Distributor",
    lastRestocked: "2024-01-12",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 5,
    name: "Samsung Fast Charger",
    category: "Accessories",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    cost: 18.0,
    sellPrice: 29.99,
    supplier: "Samsung Rwanda",
    lastRestocked: "2024-01-09",
    image: "/placeholder.svg?height=60&width=60",
  },
]

interface InventoryItem {
  id: number
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  cost: number
  sellPrice: number
  supplier: string
  lastRestocked: string
  image: string
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const { toast } = useToast()

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    let matchesStock = true
    if (stockFilter === "low") {
      matchesStock = item.currentStock <= item.minStock
    } else if (stockFilter === "out") {
      matchesStock = item.currentStock === 0
    }

    return matchesSearch && matchesCategory && matchesStock
  })

  const updateStock = (id: number, change: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, currentStock: Math.max(0, item.currentStock + change) } : item,
      ),
    )

    toast({
      title: "Stock updated",
      description: `Stock level has been ${change > 0 ? "increased" : "decreased"}`,
    })
  }

  const restockItem = (id: number, quantity: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              currentStock: item.currentStock + quantity,
              lastRestocked: new Date().toISOString().split("T")[0],
            }
          : item,
      ),
    )

    toast({
      title: "Item restocked",
      description: `Added ${quantity} units to inventory`,
    })
  }

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (item.currentStock <= item.minStock) {
      return <Badge variant="destructive">Low Stock</Badge>
    } else if (item.currentStock >= item.maxStock * 0.8) {
      return <Badge variant="secondary">Well Stocked</Badge>
    } else {
      return <Badge variant="secondary">In Stock</Badge>
    }
  }

  const getStockPercentage = (item: InventoryItem) => {
    return Math.round((item.currentStock / item.maxStock) * 100)
  }

  const lowStockCount = inventory.filter((item) => item.currentStock <= item.minStock).length
  const outOfStockCount = inventory.filter((item) => item.currentStock === 0).length
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.cost, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-gray-600">Monitor and manage your stock levels</p>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-xl font-bold">{inventory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-bold text-red-600">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-800" />
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-xl font-bold text-red-800">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="iPhone">iPhone</SelectItem>
            <SelectItem value="Samsung">Samsung</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Smartwatch">Smartwatch</SelectItem>
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Cost/Unit</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.supplier}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.currentStock}</p>
                      <p className="text-sm text-gray-600">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            getStockPercentage(item) <= 20
                              ? "bg-red-500"
                              : getStockPercentage(item) <= 50
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(getStockPercentage(item), 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStockStatus(item)}</TableCell>
                  <TableCell>${item.cost.toFixed(2)}</TableCell>
                  <TableCell>${item.sellPrice.toFixed(2)}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateStock(item.id, -1)}
                        disabled={item.currentStock === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => updateStock(item.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Restock
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Restock {item.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600">Current Stock: {item.currentStock}</p>
                              <p className="text-sm text-gray-600">
                                Recommended: {item.maxStock - item.currentStock} units
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Quantity to Add</label>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const quantity = Number.parseInt((e.target as HTMLInputElement).value)
                                    if (quantity > 0) {
                                      restockItem(item.id, quantity)
                                    }
                                  }
                                }}
                              />
                            </div>
                            <Button
                              onClick={() => {
                                const input = document.querySelector('input[type="number"]') as HTMLInputElement
                                const quantity = Number.parseInt(input.value)
                                if (quantity > 0) {
                                  restockItem(item.id, quantity)
                                }
                              }}
                              className="w-full"
                            >
                              Add Stock
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
