import { SignupForm } from "@/components/auth/signup-form"
import { Briefcase } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
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
            Start hiring top operations talent today
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Create your account to access verified professionals ready to help scale your startup.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-sm font-medium">
                1
              </div>
              <span className="text-primary-foreground">Browse verified talents</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-sm font-medium">
                2
              </div>
              <span className="text-primary-foreground">Generate offers instantly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-sm font-medium">
                3
              </div>
              <span className="text-primary-foreground">Manage contracts & payments</span>
            </div>
          </div>
        </div>

        <p className="text-primary-foreground/60 text-sm">Join 500+ startups already using Taskive</p>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Taskive</span>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground">Get started with Taskive in minutes</p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
