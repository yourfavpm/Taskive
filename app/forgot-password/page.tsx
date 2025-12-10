import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Taskive</span>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-foreground">Reset your password</h2>
          <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
        </div>

        <ForgotPasswordForm />

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}
