"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Check your email</h3>
          <p className="text-muted-foreground">
            We've sent a password reset link to <strong className="text-foreground">{email}</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12"
        />
      </div>

      <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send reset link"
        )}
      </Button>
    </form>
  )
}
