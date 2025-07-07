"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register"
  redirectTo?: string
}

export function AuthModal({ isOpen, onClose, defaultMode = "login", redirectTo }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode)

  const handleClose = () => {
    onClose()
    // Reset to default mode when closing
    setTimeout(() => setMode(defaultMode), 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0">
        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => setMode("register")} redirectTo={redirectTo} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode("login")} redirectTo={redirectTo} />
        )}
      </DialogContent>
    </Dialog>
  )
}
