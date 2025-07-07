import { createClient } from "./supabase"
import type { Database } from "./supabase"

type Product = Database["public"]["Tables"]["products"]["Row"]
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"]
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"]

export class ProductService {
  private supabase = createClient()

  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await this.supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data || []
  }

  async getProductById(id: number): Promise<Product | null> {
    const { data, error } = await this.supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data
  }

  async createProduct(product: ProductInsert): Promise<{ success: boolean; error?: string; data?: Product }> {
    const { data, error } = await this.supabase.from("products").insert(product).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  }

  async updateProduct(
    id: number,
    updates: ProductUpdate,
  ): Promise<{ success: boolean; error?: string; data?: Product }> {
    const { data, error } = await this.supabase.from("products").update(updates).eq("id", id).select().single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  }

  async deleteProduct(id: number): Promise<{ success: boolean; error?: string }> {
    const { error } = await this.supabase.from("products").delete().eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async updateStock(id: number, stock: number): Promise<{ success: boolean; error?: string }> {
    const status = stock <= 5 ? "low_stock" : "active"

    const { error } = await this.supabase.from("products").update({ stock, status }).eq("id", id)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products by category:", error)
      return []
    }

    return data || []
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
      .eq("status", "active")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error searching products:", error)
      return []
    }

    return data || []
  }
}

export const productService = new ProductService()
