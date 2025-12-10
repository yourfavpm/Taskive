import { Send, FileText, Receipt, Clock, ArrowRight, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"

const recentActivity = [
  {
    id: 1,
    type: "contract",
    title: "Contract ready for approval",
    description: "Sarah Chen - Operations Manager",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    description: "Invoice #INV-2024-002 - $4,500",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: 3,
    type: "offer",
    title: "Offer submitted",
    description: "Michael Park - Project Coordinator",
    time: "2 days ago",
    status: "pending",
  },
  {
    id: 4,
    type: "contract",
    title: "Contract signed",
    description: "Emily Watson - Executive Assistant",
    time: "3 days ago",
    status: "completed",
  },
]

const upcomingPayments = [
  {
    id: "INV-2024-003",
    talent: "Sarah Chen",
    amount: "$5,200",
    dueDate: "Dec 15, 2024",
    status: "upcoming",
  },
  {
    id: "INV-2024-004",
    talent: "Michael Park",
    amount: "$3,800",
    dueDate: "Dec 20, 2024",
    status: "upcoming",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your team.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/talents">
            <Users className="mr-2 h-4 w-4" />
            Hire Talent
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Offers"
          value={3}
          description="2 pending approval"
          icon={Send}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard title="Active Contracts" value={5} description="All in good standing" icon={FileText} />
        <StatsCard title="Pending Invoices" value="$9,000" description="2 invoices due" icon={Receipt} />
        <StatsCard
          title="Hours This Month"
          value={342}
          description="Across all contracts"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest contracts, offers, and payments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/contracts">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      activity.type === "contract"
                        ? "bg-primary/10 text-primary"
                        : activity.type === "payment"
                          ? "bg-green-100 text-green-600"
                          : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {activity.type === "contract" ? (
                      <FileText className="h-5 w-5" />
                    ) : activity.type === "payment" ? (
                      <Receipt className="h-5 w-5" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <Badge
                    variant={activity.status === "completed" ? "secondary" : "outline"}
                    className={activity.status === "pending" ? "border-amber-500 text-amber-600" : ""}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Invoices due in the next 30 days</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/invoices">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">{payment.id}</p>
                    <p className="text-sm text-muted-foreground">{payment.talent}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-lg">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">Due {payment.dueDate}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <Link href="/dashboard/invoices">
                  Pay invoices
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you manage your operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent" asChild>
              <Link href="/dashboard/talents">
                <Users className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Browse Talents</p>
                  <p className="text-xs text-muted-foreground">Find new professionals</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent" asChild>
              <Link href="/dashboard/offers/new">
                <Send className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Generate Offer</p>
                  <p className="text-xs text-muted-foreground">Create a new offer</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent" asChild>
              <Link href="/dashboard/contracts">
                <FileText className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Review Contracts</p>
                  <p className="text-xs text-muted-foreground">Manage active contracts</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent" asChild>
              <Link href="/dashboard/invoices">
                <Receipt className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Pay Invoices</p>
                  <p className="text-xs text-muted-foreground">View and pay bills</p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
