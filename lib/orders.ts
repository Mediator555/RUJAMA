import { createClient } from "./supabase"
import type { Database } from "./supabase"

type Order = Database["public"]["Tables"]["orders"]["Row"]
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"]
type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"]

export class OrderService {
  private supabase = createClient()

  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await this.supabase
      .from("orders")
      .select(`
        *,
        profiles:user_id (
          name,
          email,
          phone
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return []
    }

    return data || []
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const { data, error } = await this.supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user orders:", error)
      return []
    }

    return data || []
  }

  async createOrder(order: OrderInsert): Promise<{ success: boolean; error?: string; data?: Order }> {
    const { data, error } = await this.supabase.from("orders").insert(order).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  }

  async updateOrderStatus(
    orderId: string,
    status: Order["status"],
    paymentStatus?: Order["payment_status"],
  ): Promise<{ success: boolean; error?: string }> {
    const updates: OrderUpdate = { status }
    if (paymentStatus) {
      updates.payment_status = paymentStatus
    }

    const { error } = await this.supabase.from("orders").update(updates).eq("id", orderId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await this.supabase
      .from("orders")
      .select(`
        *,
        profiles:user_id (
          name,
          email,
          phone
        )
      `)
      .eq("id", orderId)
      .single()

    if (error) {
      console.error("Error fetching order:", error)
      return null
    }

    return data
  }

  async getOrderStats(): Promise<{
    total: number
    pending: number
    confirmed: number
    shipped: number
    delivered: number
    cancelled: number
    totalRevenue: number
  }> {
    const { data, error } = await this.supabase.from("orders").select("status, total, payment_status")

    if (error) {
      console.error("Error fetching order stats:", error)
      return {
        total: 0,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0,
      }
    }

    const stats = data.reduce(
      (acc, order) => {
        acc.total++
        acc[order.status as keyof typeof acc]++
        if (order.payment_status === "paid") {
          acc.totalRevenue += order.total
        }
        return acc
      },
      {
        total: 0,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0,
      },
    )

    return stats
  }
}

export const orderService = new OrderService()
