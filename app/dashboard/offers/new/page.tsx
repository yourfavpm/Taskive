import Link from "next/link"
import { ArrowLeft, Send, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OfferForm } from "@/components/offers/offer-form"
import { Card, CardContent } from "@/components/ui/card"

export default function NewOfferPage({
  searchParams,
}: {
  searchParams: { talent?: string; step?: string }
}) {
  const step = searchParams.step || "form"

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/offers">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Offers
        </Link>
      </Button>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Send className="h-8 w-8 text-primary" />
          Generate Offer
        </h1>
        <p className="text-muted-foreground mt-1">
          {step === "form"
            ? "Create a new offer for a talent. All fields marked with * are required."
            : "Review and send your offer"}
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${step === "form" ? "opacity-100" : "opacity-60"}`}>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === "form" ? "bg-primary text-primary-foreground" : "bg-green-500 text-white"
                }`}
              >
                1
              </div>
              <span className="font-medium">Offer Details</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className={`flex items-center gap-3 ${step === "preview" ? "opacity-100" : "opacity-60"}`}>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === "preview" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className="font-medium">Review & Send</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <OfferForm prefilledTalentId={searchParams.talent} />
    </div>
  )
}
