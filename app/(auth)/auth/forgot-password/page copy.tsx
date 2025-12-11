"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskiveLogo } from "@/components/taskive-logo"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <TaskiveLogo className="justify-center" />

        <Card>
          <CardHeader className="space-y-1 text-center">
            {isSubmitted ? (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                <CardDescription>
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                <CardDescription>Enter your email and we&apos;ll send you a reset link</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive the email?{" "}
                  <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">
                    Try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
