import Link from "next/link"
import { Send, Plus, Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const offers = [
  {
    id: "OFF-2024-001",
    talent: "Sarah Chen",
    role: "Operations Manager",
    salary: "$5,200/month",
    workMode: "Remote",
    status: "pending",
    submittedAt: "Nov 25, 2024",
    startDate: "Dec 15, 2024",
  },
  {
    id: "OFF-2024-002",
    talent: "Michael Park",
    role: "Project Coordinator",
    salary: "$45/hour",
    workMode: "Hybrid",
    status: "accepted",
    submittedAt: "Nov 20, 2024",
    startDate: "Dec 1, 2024",
  },
  {
    id: "OFF-2024-003",
    talent: "Emily Watson",
    role: "Executive Assistant",
    salary: "$3,800/month",
    workMode: "Remote",
    status: "pending",
    submittedAt: "Nov 22, 2024",
    startDate: "Dec 10, 2024",
  },
  {
    id: "OFF-2024-004",
    talent: "David Martinez",
    role: "Sales Operations",
    salary: "$50/hour",
    workMode: "Remote",
    status: "declined",
    submittedAt: "Nov 15, 2024",
    startDate: "Dec 1, 2024",
  },
  {
    id: "OFF-2024-005",
    talent: "Jennifer Liu",
    role: "Customer Success Manager",
    salary: "$5,800/month",
    workMode: "Hybrid",
    status: "draft",
    submittedAt: "-",
    startDate: "Jan 1, 2025",
  },
]

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "outline" as const,
    className: "border-amber-500 text-amber-600",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    variant: "secondary" as const,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    variant: "secondary" as const,
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  draft: {
    label: "Draft",
    icon: FileText,
    variant: "outline" as const,
    className: "border-muted-foreground text-muted-foreground",
  },
}

export default function OffersPage() {
  const pendingOffers = offers.filter((o) => o.status === "pending")
  const acceptedOffers = offers.filter((o) => o.status === "accepted")
  const draftOffers = offers.filter((o) => o.status === "draft")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            My Offers
          </h1>
          <p className="text-muted-foreground mt-1">Manage your submitted and pending offers</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/offers/new">
            <Plus className="h-4 w-4 mr-2" />
            New Offer
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{offers.length}</p>
                <p className="text-sm text-muted-foreground">Total Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingOffers.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{acceptedOffers.length}</p>
                <p className="text-sm text-muted-foreground">Accepted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{draftOffers.length}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Offers</CardTitle>
          <CardDescription>View and manage all your offers to talents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({offers.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingOffers.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({acceptedOffers.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftOffers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <OfferTable offers={offers} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <OfferTable offers={pendingOffers} />
            </TabsContent>
            <TabsContent value="accepted" className="mt-4">
              <OfferTable offers={acceptedOffers} />
            </TabsContent>
            <TabsContent value="drafts" className="mt-4">
              <OfferTable offers={draftOffers} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function OfferTable({ offers }: { offers: typeof offers }) {
  if (offers.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No offers found in this category.</div>
  }

  return (
    <div className="space-y-3">
      {offers.map((offer) => {
        const config = statusConfig[offer.status as keyof typeof statusConfig]
        const StatusIcon = config.icon

        return (
          <div
            key={offer.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {offer.talent
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{offer.talent}</p>
                  <Badge variant={config.variant} className={config.className}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{offer.role}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {offer.id} • Submitted: {offer.submittedAt}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="text-right">
                <p className="font-semibold text-primary">{offer.salary}</p>
                <p className="text-xs text-muted-foreground">{offer.workMode}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{offer.startDate}</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/offers/${offer.id}`}>View</Link>
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
