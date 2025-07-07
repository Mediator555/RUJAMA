import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Client-side Supabase client
export const createClient = () => createClientComponentClient()

// Server-side Supabase client
export const createServerClient = () => createServerComponentClient({ cookies })

// Database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          phone: string | null
          address: string | null
          role: "admin" | "customer"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          phone?: string | null
          address?: string | null
          role?: "admin" | "customer"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          address?: string | null
          role?: "admin" | "customer"
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          category: string
          brand: string
          stock: number
          image_url: string | null
          status: "active" | "inactive" | "low_stock"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          category: string
          brand: string
          stock?: number
          image_url?: string | null
          status?: "active" | "inactive" | "low_stock"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          category?: string
          brand?: string
          stock?: number
          image_url?: string | null
          status?: "active" | "inactive" | "low_stock"
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: any
          total: number
          status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
          payment_method: string
          payment_status: "pending" | "paid" | "failed"
          delivery_address: string
          delivery_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: any
          total: number
          status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
          payment_method: string
          payment_status?: "pending" | "paid" | "failed"
          delivery_address: string
          delivery_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: any
          total?: number
          status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
          payment_method?: string
          payment_status?: "pending" | "paid" | "failed"
          delivery_address?: string
          delivery_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
