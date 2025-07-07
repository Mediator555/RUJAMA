"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Smartphone, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface LoginFormProps {
  onSwitchToRegister: () => void
  redirectTo?: string
}

export function LoginForm({ onSwitchToRegister, redirectTo = "/" }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await login(email, password)

    if (result.success) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })
      router.push(redirectTo)
    } else {
      setError(result.error || "Login failed")
    }
  }

  const handleDemoLogin = (role: "admin" | "customer") => {
    if (role === "admin") {
      setEmail("mediator1930@gmail.com")
      setPassword("Mediator123")
    } else {
      setEmail("customer@example.com")
      setPassword("customer123")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Smartphone className="h-12 w-12 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your RUJAMA PHONES SHOPS account</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <Button variant="link" className="px-0 text-sm">
              Forgot password?
            </Button>
          </div>

          {/* Demo Login Instructions */}
          <div className="space-y-2">
            <Separator />
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-blue-800 mb-2">Demo Account Available:</p>
              <div className="space-y-1 text-xs text-blue-700">
                <p>
                  <strong>Admin:</strong> mediator1930@gmail.com / Mediator123
                </p>
                <p>
                  <strong>Note:</strong> You need to register this account first if it doesn't exist
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => handleDemoLogin("admin")}>
                Fill Admin
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleDemoLogin("customer")}>
                Fill Customer
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Button variant="link" className="px-0" onClick={onSwitchToRegister}>
              Sign up
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
