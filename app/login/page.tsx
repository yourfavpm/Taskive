import { LoginForm } from "@/components/auth/login-form"
import { Briefcase } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary-foreground flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <span className="text-2xl font-bold text-primary-foreground">Taskive</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight text-balance">
            Connect with top operations professionals for your startup
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Browse talents, generate offers, manage contracts, and handle payments all in one place.
          </p>
        </div>

        <p className="text-primary-foreground/60 text-sm">Trusted by 500+ startups worldwide</p>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Taskive</span>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">Enter your credentials to access your portal</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
