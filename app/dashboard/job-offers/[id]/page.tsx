import Link from "next/link"
import { ArrowLeft, Briefcase, Users, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const jobOpening = {
  id: "JO-2024-001",
  title: "Senior Operations Manager",
  department: "Operations",
  status: "open",
  description: "Lead operations strategy and team management for our growing startup.",
  createdAt: "Nov 20, 2024",
}

const applicants = [
  { id: "TAL-001", name: "Sarah Chen", status: "applied", appliedAt: "Nov 25, 2024" },
  { id: "TAL-002", name: "Michael Park", status: "shortlisted", appliedAt: "Nov 22, 2024" },
  { id: "TAL-003", name: "Emily Watson", status: "shortlisted", appliedAt: "Nov 21, 2024" },
  { id: "TAL-004", name: "David Martinez", status: "interviewed", appliedAt: "Nov 18, 2024" },
]

const shortlistedByTaskive = [
  { id: "TAL-005", name: "Jennifer Liu", role: "Customer Success Manager", score: 4.8 },
  { id: "TAL-006", name: "Rachel Adams", role: "Operations Specialist", score: 4.6 },
]

const shortlistedByClient = [{ id: "TAL-007", name: "James Wilson", role: "Senior Operations", score: 4.9 }]

export default function JobOfferingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/job-offers">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Openings
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{jobOpening.title}</h1>
            <Badge variant="secondary">Open</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{jobOpening.department}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{applicants.length}</p>
                <p className="text-sm text-muted-foreground">Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{shortlistedByTaskive.length}</p>
                <p className="text-sm text-muted-foreground">Taskive Picks</p>
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
                <p className="text-2xl font-bold">{shortlistedByClient.length}</p>
                <p className="text-sm text-muted-foreground">Your Picks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{applicants.filter((a) => a.status === "interviewed").length}</p>
                <p className="text-sm text-muted-foreground">Interviewed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applicants */}
      <Card>
        <CardHeader>
          <CardTitle>Applicants & Candidates</CardTitle>
          <CardDescription>View applicants, shortlisted candidates, and manage interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Applications ({applicants.length})</TabsTrigger>
              <TabsTrigger value="taskive">Taskive Picks ({shortlistedByTaskive.length})</TabsTrigger>
              <TabsTrigger value="client">Your Picks ({shortlistedByClient.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <ApplicantsList applicants={applicants} fromJobOffer={true} />
            </TabsContent>
            <TabsContent value="taskive" className="mt-4">
              <CandidatesList candidates={shortlistedByTaskive} fromJobOffer={true} />
            </TabsContent>
            <TabsContent value="client" className="mt-4">
              <CandidatesList candidates={shortlistedByClient} fromJobOffer={true} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function ApplicantsList({ applicants }: { applicants: typeof applicants; fromJobOffer?: boolean }) {
  if (applicants.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No applicants yet.</div>
  }

  return (
    <div className="space-y-3">
      {applicants.map((applicant) => (
        <div key={applicant.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold">{applicant.name}</p>
              <p className="text-sm text-muted-foreground">Applied: {applicant.appliedAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{applicant.status}</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/talents/${applicant.id}?from=job-offer`}>View Profile</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function CandidatesList({ candidates }: { candidates: typeof shortlistedByTaskive; fromJobOffer?: boolean }) {
  if (candidates.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No candidates in this category.</div>
  }

  return (
    <div className="space-y-3">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold">{candidate.name}</p>
              <p className="text-sm text-muted-foreground">{candidate.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-2">
              <p className="text-sm font-semibold">{candidate.score}</p>
              <p className="text-xs text-muted-foreground">Match Score</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/talents/${candidate.id}?from=job-offer`}>View Profile</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
