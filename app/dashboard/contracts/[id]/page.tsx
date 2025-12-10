import Link from "next/link"
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle,
  Download,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock contract data
const contract = {
  id: "CON-2024-002",
  status: "pending_approval",
  talent: {
    id: "TAL-002",
    name: "Michael Park",
    role: "Project Coordinator",
    email: "michael.park@email.com",
  },
  scopeOfWork:
    "Coordinate multiple project streams including product launch, marketing campaigns, and operational improvements. Manage stakeholder communications and ensure timely delivery of milestones.",
  startDate: "Dec 1, 2024",
  endDate: "May 31, 2025",
  duration: "6 months",
  workMode: "Hybrid",
  hoursPerWeek: 40,
  salaryType: "fixed",
  monthlyRate: 4200,
  totalValue: 25200,
  paidAmount: 0,
  billingSchedule: [
    { period: "December 2024", amount: 4200, dueDate: "Dec 31, 2024", status: "upcoming" },
    { period: "January 2025", amount: 4200, dueDate: "Jan 31, 2025", status: "upcoming" },
    { period: "February 2025", amount: 4200, dueDate: "Feb 28, 2025", status: "upcoming" },
    { period: "March 2025", amount: 4200, dueDate: "Mar 31, 2025", status: "upcoming" },
    { period: "April 2025", amount: 4200, dueDate: "Apr 30, 2025", status: "upcoming" },
    { period: "May 2025", amount: 4200, dueDate: "May 31, 2025", status: "upcoming" },
  ],
  createdAt: "Nov 25, 2024",
}

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  const isPending = contract.status === "pending_approval"
  const progress = (contract.paidAmount / contract.totalValue) * 100

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/contracts">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contracts
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{contract.id}</h1>
            <Badge
              variant="outline"
              className={isPending ? "border-amber-500 text-amber-600" : "bg-green-100 text-green-700"}
            >
              <Clock className="h-3 w-3 mr-1" />
              {isPending ? "Pending Approval" : "Active"}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">Created on {contract.createdAt}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          {isPending && (
            <Button size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Contract
            </Button>
          )}
        </div>
      </div>

      {isPending && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Action Required</p>
                <p className="text-sm text-amber-700">
                  Please review this contract carefully. Once approved, the billing schedule will begin on the start
                  date and invoices will be generated automatically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Talent Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Talent Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                  {contract.talent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-lg font-semibold">{contract.talent.name}</p>
                  <p className="text-muted-foreground">{contract.talent.role}</p>
                  <p className="text-sm text-muted-foreground">{contract.talent.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contract Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Scope of Work</h4>
                <p className="text-muted-foreground leading-relaxed">{contract.scopeOfWork}</p>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contract Period</p>
                    <p className="font-medium">
                      {contract.startDate} - {contract.endDate}
                    </p>
                    <p className="text-sm text-muted-foreground">{contract.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Work Mode</p>
                    <p className="font-medium">{contract.workMode}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Work Hours</p>
                    <p className="font-medium">{contract.hoursPerWeek} hours/week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rate</p>
                    <p className="font-medium">${contract.monthlyRate.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Schedule</CardTitle>
              <CardDescription>
                Auto-generated based on contract terms. Invoices will be created automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contract.billingSchedule.map((billing, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{billing.period}</TableCell>
                      <TableCell>${billing.amount.toLocaleString()}</TableCell>
                      <TableCell>{billing.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {billing.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Value Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Contract Value
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Total Contract Value</p>
                <p className="text-4xl font-bold text-primary">${contract.totalValue.toLocaleString()}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-medium text-green-600">${contract.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">${(contract.totalValue - contract.paidAmount).toLocaleString()}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">{progress.toFixed(0)}% paid</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salary Type</span>
                <span className="font-medium capitalize">{contract.salaryType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rate</span>
                <span className="font-medium">${contract.monthlyRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{contract.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing Periods</span>
                <span className="font-medium">{contract.billingSchedule.length}</span>
              </div>
            </CardContent>
          </Card>

          {isPending && (
            <div className="space-y-2">
              <Button className="w-full" size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Contract
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Request Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
