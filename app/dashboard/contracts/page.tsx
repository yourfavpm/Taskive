import Link from "next/link"
import { FileText, CheckCircle, Clock, AlertCircle, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const contracts = [
  {
    id: "CON-2024-001",
    talent: "Sarah Chen",
    role: "Operations Manager",
    status: "active",
    startDate: "Oct 1, 2024",
    endDate: "Mar 31, 2025",
    monthlyRate: 5200,
    totalValue: 31200,
    paidAmount: 15600,
    workMode: "Remote",
    hoursPerWeek: 40,
  },
  {
    id: "CON-2024-002",
    talent: "Michael Park",
    role: "Project Coordinator",
    status: "pending_approval",
    startDate: "Dec 1, 2024",
    endDate: "May 31, 2025",
    monthlyRate: 4200,
    totalValue: 25200,
    paidAmount: 0,
    workMode: "Hybrid",
    hoursPerWeek: 40,
  },
  {
    id: "CON-2024-003",
    talent: "Emily Watson",
    role: "Executive Assistant",
    status: "active",
    startDate: "Sep 15, 2024",
    endDate: "Feb 14, 2025",
    monthlyRate: 3800,
    totalValue: 19000,
    paidAmount: 11400,
    workMode: "Remote",
    hoursPerWeek: 35,
  },
  {
    id: "CON-2024-004",
    talent: "David Martinez",
    role: "Sales Operations",
    status: "completed",
    startDate: "Jun 1, 2024",
    endDate: "Nov 30, 2024",
    monthlyRate: 4500,
    totalValue: 27000,
    paidAmount: 27000,
    workMode: "Remote",
    hoursPerWeek: 40,
  },
  {
    id: "CON-2024-005",
    talent: "Jennifer Liu",
    role: "Customer Success Manager",
    status: "pending_approval",
    startDate: "Jan 1, 2025",
    endDate: "Jun 30, 2025",
    monthlyRate: 5800,
    totalValue: 34800,
    paidAmount: 0,
    workMode: "Hybrid",
    hoursPerWeek: 40,
  },
]

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle,
    variant: "secondary" as const,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  pending_approval: {
    label: "Pending Approval",
    icon: Clock,
    variant: "outline" as const,
    className: "border-amber-500 text-amber-600",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    variant: "secondary" as const,
    className: "bg-muted text-muted-foreground",
  },
  terminated: {
    label: "Terminated",
    icon: AlertCircle,
    variant: "destructive" as const,
    className: "",
  },
}

export default function ContractsPage() {
  const activeContracts = contracts.filter((c) => c.status === "active")
  const pendingContracts = contracts.filter((c) => c.status === "pending_approval")
  const completedContracts = contracts.filter((c) => c.status === "completed")

  const totalActiveValue = activeContracts.reduce((sum, c) => sum + c.totalValue, 0)
  const totalPaid = contracts.reduce((sum, c) => sum + c.paidAmount, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          Contracts
        </h1>
        <p className="text-muted-foreground mt-1">Manage your active, pending, and completed contracts</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeContracts.length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
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
                <p className="text-2xl font-bold">{pendingContracts.length}</p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(totalActiveValue / 1000).toFixed(0)}k</p>
                <p className="text-sm text-muted-foreground">Active Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedContracts.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Contracts</CardTitle>
          <CardDescription>View and manage your contracts with talents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({contracts.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeContracts.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingContracts.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedContracts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ContractsList contracts={contracts} />
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <ContractsList contracts={activeContracts} />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <ContractsList contracts={pendingContracts} />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <ContractsList contracts={completedContracts} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function ContractsList({ contracts }: { contracts: typeof contracts }) {
  if (contracts.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No contracts found in this category.</div>
  }

  return (
    <div className="space-y-4">
      {contracts.map((contract) => {
        const config = statusConfig[contract.status as keyof typeof statusConfig]
        const StatusIcon = config.icon
        const progress = (contract.paidAmount / contract.totalValue) * 100

        return (
          <div key={contract.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                  {contract.talent
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{contract.talent}</p>
                    <Badge variant={config.variant} className={config.className}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{contract.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {contract.id} • {contract.workMode} • {contract.hoursPerWeek}h/week
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Contract Period</p>
                  <p className="text-sm font-medium">
                    {contract.startDate} - {contract.endDate}
                  </p>
                </div>

                <div className="space-y-1 min-w-[140px]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Payment Progress</span>
                    <span className="font-medium">{progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    ${contract.paidAmount.toLocaleString()} / ${contract.totalValue.toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Monthly</p>
                  <p className="font-bold text-primary">${contract.monthlyRate.toLocaleString()}</p>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/contracts/${contract.id}`}>
                    {contract.status === "pending_approval" ? "Review" : "View"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
