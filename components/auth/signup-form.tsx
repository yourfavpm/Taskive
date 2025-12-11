"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) return

    setIsLoading(true)

  try {
    // 1️⃣ Make POST request to backend
    const res = await fetch('http://localhost:3000/clients/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        password: formData.password,
        phone: formData.phone, // optional
      }),
    })

    // 2️⃣ Check if request failed
    if (!res.ok) {
      const errorData = await res.json()
      alert(errorData.message || 'Signup failed')
      setIsLoading(false)
      return
    }

    // 3️⃣ Parse successful response
    const data = await res.json()
    console.log('Signup success:', data)

    // 4️⃣ Redirect user
    router.push('/dashboard')
  } catch (err) {
    console.error('Signup error:', err)
    alert('Something went wrong. Please try again.')
  } finally {
    setIsLoading(false)
  }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            type="text"
            placeholder="Acme Inc"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="h-11 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          className="mt-0.5"
        />
        <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-relaxed">
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || !acceptTerms}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  )
}
