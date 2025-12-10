import Link from "next/link"
import { ArrowLeft, Send, Clock, User, Briefcase, MapPin, Calendar, DollarSign, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data
const offer = {
  id: "OFF-2024-001",
  status: "pending",
  talent: {
    id: "TAL-001",
    name: "Sarah Chen",
    role: "Operations Manager",
    avatar: "/placeholder.svg?key=48xvo",
  },
  scopeOfWork:
    "Lead operations transformation project including process optimization, team restructuring, and vendor management. Establish KPIs and reporting dashboards for executive review.",
  salaryType: "fixed",
  salaryAmount: 5200,
  workHours: 40,
  workMode: "Remote",
  paymentFrequency: "Monthly",
  startDate: "Dec 15, 2024",
  submittedAt: "Nov 25, 2024",
  expiresAt: "Dec 5, 2024",
}

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const isPending = offer.status === "pending"

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/offers">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Offers
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{offer.id}</h1>
            <Badge
              variant="outline"
              className={
                offer.status === "pending"
                  ? "border-amber-500 text-amber-600"
                  : offer.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
              }
            >
              <Clock className="h-3 w-3 mr-1" />
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">Submitted on {offer.submittedAt}</p>
        </div>
        {isPending && (
          <div className="flex gap-2">
            <Button variant="outline">Edit Offer</Button>
            <Button variant="destructive">Withdraw</Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Talent Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Talent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                  {offer.talent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-lg font-semibold">{offer.talent.name}</p>
                  <p className="text-muted-foreground">{offer.talent.role}</p>
                  <p className="text-sm text-muted-foreground font-mono">{offer.talent.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scope of Work */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Scope of Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{offer.scopeOfWork}</p>
            </CardContent>
          </Card>

          {/* Work Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Work Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Work Mode</p>
                    <p className="font-medium">{offer.workMode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Work Hours</p>
                    <p className="font-medium">{offer.workHours} hours/week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{offer.startDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Frequency</p>
                    <p className="font-medium">{offer.paymentFrequency}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compensation Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  {offer.salaryType === "fixed" ? "Monthly Salary" : "Hourly Rate"}
                </p>
                <p className="text-4xl font-bold text-primary">${offer.salaryAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{offer.salaryType === "fixed" ? "/month" : "/hour"}</p>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salary Type</span>
                  <span className="font-medium capitalize">{offer.salaryType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">{offer.paymentFrequency}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submitted</span>
                <span className="font-medium">{offer.submittedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires</span>
                <span className="font-medium">{offer.expiresAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">{offer.startDate}</span>
              </div>
            </CardContent>
          </Card>

          {isPending && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <p className="text-sm text-amber-800">
                  <strong>Awaiting Response</strong>
                  <br />
                  The talent has until {offer.expiresAt} to respond to this offer.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
