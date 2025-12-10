import Link from "next/link"
import { Receipt, DollarSign, Clock, CheckCircle, AlertTriangle, Download, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const invoices = [
  {
    id: "INV-2024-001",
    talent: "Sarah Chen",
    contractId: "CON-2024-001",
    period: "October 2024",
    amount: 5200,
    dueDate: "Oct 31, 2024",
    paidDate: "Oct 28, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-002",
    talent: "Sarah Chen",
    contractId: "CON-2024-001",
    period: "November 2024",
    amount: 5200,
    dueDate: "Nov 30, 2024",
    paidDate: "Nov 25, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-003",
    talent: "Sarah Chen",
    contractId: "CON-2024-001",
    period: "December 2024",
    amount: 5200,
    dueDate: "Dec 31, 2024",
    paidDate: null,
    status: "unpaid",
  },
  {
    id: "INV-2024-004",
    talent: "Emily Watson",
    contractId: "CON-2024-003",
    period: "November 2024",
    amount: 3800,
    dueDate: "Nov 30, 2024",
    paidDate: "Nov 29, 2024",
    status: "paid",
  },
  {
    id: "INV-2024-005",
    talent: "Emily Watson",
    contractId: "CON-2024-003",
    period: "December 2024",
    amount: 3800,
    dueDate: "Dec 15, 2024",
    paidDate: null,
    status: "overdue",
  },
  {
    id: "INV-2024-006",
    talent: "David Martinez",
    contractId: "CON-2024-004",
    period: "November 2024",
    amount: 4500,
    dueDate: "Nov 30, 2024",
    paidDate: "Nov 30, 2024",
    status: "paid",
  },
]

const paymentHistory = [
  {
    id: "PAY-2024-001",
    invoiceId: "INV-2024-001",
    talent: "Sarah Chen",
    amount: 5200,
    method: "Credit Card",
    date: "Oct 28, 2024",
  },
  {
    id: "PAY-2024-002",
    invoiceId: "INV-2024-002",
    talent: "Sarah Chen",
    amount: 5200,
    method: "Credit Card",
    date: "Nov 25, 2024",
  },
  {
    id: "PAY-2024-003",
    invoiceId: "INV-2024-004",
    talent: "Emily Watson",
    amount: 3800,
    method: "Bank Transfer",
    date: "Nov 29, 2024",
  },
  {
    id: "PAY-2024-004",
    invoiceId: "INV-2024-006",
    talent: "David Martinez",
    amount: 4500,
    method: "Credit Card",
    date: "Nov 30, 2024",
  },
]

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  unpaid: {
    label: "Unpaid",
    icon: Clock,
    className: "border-amber-500 text-amber-600",
  },
  overdue: {
    label: "Overdue",
    icon: AlertTriangle,
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
  partial: {
    label: "Partial",
    icon: Clock,
    className: "border-primary text-primary",
  },
}

export default function InvoicesPage() {
  const unpaidInvoices = invoices.filter((i) => i.status === "unpaid" || i.status === "overdue")
  const paidInvoices = invoices.filter((i) => i.status === "paid")
  const overdueInvoices = invoices.filter((i) => i.status === "overdue")

  const totalUnpaid = unpaidInvoices.reduce((sum, i) => sum + i.amount, 0)
  const totalPaid = paidInvoices.reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Receipt className="h-8 w-8 text-primary" />
            Invoices & Payments
          </h1>
          <p className="text-muted-foreground mt-1">View and pay invoices, track payment history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalUnpaid.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Amount Due</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overdueInvoices.length}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
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
                <p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{invoices.length}</p>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unpaid Alert */}
      {unpaidInvoices.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-amber-800">
                    You have {unpaidInvoices.length} unpaid invoice{unpaidInvoices.length > 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-amber-700">Total amount due: ${totalUnpaid.toLocaleString()}</p>
                </div>
              </div>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>View and manage all invoices from your contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Talent</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => {
                    const config = statusConfig[invoice.status as keyof typeof statusConfig]
                    const StatusIcon = config.icon

                    return (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Checkbox disabled={invoice.status === "paid"} />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-xs text-muted-foreground">{invoice.contractId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.talent}</TableCell>
                        <TableCell>{invoice.period}</TableCell>
                        <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={invoice.status === "unpaid" ? "outline" : "secondary"}
                            className={config.className}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {invoice.status !== "paid" && (
                              <Button size="sm" asChild>
                                <Link href={`/dashboard/invoices/${invoice.id}/pay`}>Pay</Link>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track all your past payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Talent</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.invoiceId}</TableCell>
                      <TableCell>{payment.talent}</TableCell>
                      <TableCell className="font-medium text-green-600">${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
