import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateJobOpeningForm } from "@/components/job-offers/create-job-opening-form"

export default function NewJobOfferingPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/job-offers">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Openings
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Plus className="h-8 w-8 text-primary" />
          Create Job Opening
        </h1>
        <p className="text-muted-foreground mt-1">Post a new job opening. All fields marked with * are required.</p>
      </div>

      {/* Form */}
      <CreateJobOpeningForm />
    </div>
  )
}
