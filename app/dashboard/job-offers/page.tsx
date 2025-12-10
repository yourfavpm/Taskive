import Link from "next/link"
import { Plus, Briefcase, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const jobOpenings = [
  {
    id: "JO-2024-001",
    title: "Senior Operations Manager",
    department: "Operations",
    status: "open",
    applicants: 8,
    shortlisted: 3,
    interviewed: 1,
    createdAt: "Nov 20, 2024",
    description: "Lead operations strategy and team management for our growing startup.",
  },
  {
    id: "JO-2024-002",
    title: "Project Coordinator",
    department: "Project Management",
    status: "open",
    applicants: 5,
    shortlisted: 2,
    interviewed: 0,
    createdAt: "Nov 15, 2024",
    description: "Coordinate cross-functional projects and manage timelines.",
  },
  {
    id: "JO-2024-003",
    title: "Executive Assistant",
    department: "Operations",
    status: "closed",
    applicants: 12,
    shortlisted: 4,
    interviewed: 2,
    createdAt: "Nov 1, 2024",
    description: "Support executive leadership with administrative and strategic tasks.",
  },
]

export default function JobOffersPage() {
  const openJobs = jobOpenings.filter((j) => j.status === "open")
  const closedJobs = jobOpenings.filter((j) => j.status === "closed")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            Job Openings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your job openings and view applications</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/job-offers/new">
            <Plus className="h-4 w-4 mr-2" />
            New Job Opening
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobOpenings.length}</p>
                <p className="text-sm text-muted-foreground">Total Openings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{jobOpenings.reduce((sum, j) => sum + j.applicants, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Applicants</p>
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
                <p className="text-2xl font-bold">{openJobs.length}</p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Openings List */}
      <Card>
        <CardHeader>
          <CardTitle>Job Openings</CardTitle>
          <CardDescription>View and manage all your job openings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="open">
            <TabsList>
              <TabsTrigger value="open">Open ({openJobs.length})</TabsTrigger>
              <TabsTrigger value="closed">Closed ({closedJobs.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="open" className="mt-4">
              <JobOpeningsList openings={openJobs} />
            </TabsContent>
            <TabsContent value="closed" className="mt-4">
              <JobOpeningsList openings={closedJobs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function JobOpeningsList({ openings }: { openings: typeof jobOpenings }) {
  if (openings.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No job openings in this category.</div>
  }

  return (
    <div className="space-y-3">
      {openings.map((job) => (
        <div
          key={job.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{job.title}</p>
                <Badge variant={job.status === "open" ? "secondary" : "outline"}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{job.department}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {job.id} • Created: {job.createdAt}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-lg font-semibold">{job.applicants}</p>
              <p className="text-xs text-muted-foreground">Applicants</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">{job.shortlisted}</p>
              <p className="text-xs text-muted-foreground">Shortlisted</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">{job.interviewed}</p>
              <p className="text-xs text-muted-foreground">Interviewed</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/job-offers/${job.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
