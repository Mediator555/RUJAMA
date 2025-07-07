"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>
              Sign In
            </Button>
            <Button variant={mode === "register" ? "default" : "outline"} onClick={() => setMode("register")}>
              Sign Up
            </Button>
          </div>
        </div>

        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  )
}
