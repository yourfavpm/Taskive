"use client"

import { useState } from "react"
import { Users, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamMemberCard } from "@/components/my-team/team-member-card"
import { TimesheetViewer } from "@/components/my-team/timesheet-viewer"

// Mock team data from active contracts
const teamMembers = [
  {
    id: "TAL-001",
    name: "Sarah Chen",
    role: "Operations Manager",
    contractId: "CON-2024-001",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    workMode: "Remote",
    hoursPerWeek: 40,
    salaryType: "fixed",
    monthlyRate: 5200,
    startDate: "Oct 1, 2024",
    endDate: "Mar 31, 2025",
    avatar: "SC",
    timesheetType: "fixed",
  },
  {
    id: "TAL-003",
    name: "Emily Watson",
    role: "Executive Assistant",
    contractId: "CON-2024-003",
    email: "emily.watson@email.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    workMode: "Remote",
    hoursPerWeek: 35,
    salaryType: "hourly",
    hourlyRate: 85,
    startDate: "Sep 15, 2024",
    endDate: "Feb 14, 2025",
    avatar: "EW",
    timesheetType: "hourly",
    timesheets: [
      { week: "Nov 18-24", hoursLogged: 35, status: "submitted", submittedDate: "Nov 25, 2024" },
      { week: "Nov 25-Dec 1", hoursLogged: 34, status: "approved", approvedDate: "Dec 2, 2024" },
      { week: "Dec 2-8", hoursLogged: 35, status: "approved", approvedDate: "Dec 9, 2024" },
    ],
  },
]

const activityLog = [
  {
    id: 1,
    member: "Sarah Chen",
    action: "Logged timesheet",
    time: "2 hours ago",
    type: "timesheet",
  },
  {
    id: 2,
    member: "Emily Watson",
    action: "Updated project status",
    time: "5 hours ago",
    type: "update",
  },
  {
    id: 3,
    member: "Sarah Chen",
    action: "Completed milestone",
    time: "1 day ago",
    type: "milestone",
  },
]

export default function MyTeamPage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const hourlyMembers = teamMembers.filter((m) => m.timesheetType === "hourly")
  const fixedMembers = teamMembers.filter((m) => m.timesheetType === "fixed")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          My Team
        </h1>
        <p className="text-muted-foreground mt-1">View and manage your active team members from ongoing contracts</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
                <p className="text-sm text-muted-foreground">Total Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{fixedMembers.length}</p>
                <p className="text-sm text-muted-foreground">Fixed Salary</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{hourlyMembers.length}</p>
                <p className="text-sm text-muted-foreground">Hourly (Timesheets)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Section */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({teamMembers.length})</TabsTrigger>
          <TabsTrigger value="fixed">Fixed ({fixedMembers.length})</TabsTrigger>
          <TabsTrigger value="hourly">Hourly ({hourlyMembers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isSelected={selectedMember === member.id}
              onSelect={setSelectedMember}
            />
          ))}
        </TabsContent>

        <TabsContent value="fixed" className="space-y-4">
          {fixedMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isSelected={selectedMember === member.id}
              onSelect={setSelectedMember}
            />
          ))}
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          {hourlyMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isSelected={selectedMember === member.id}
              onSelect={setSelectedMember}
            />
          ))}
          {hourlyMembers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">No hourly team members yet</CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Timesheet Section - Only shows if hourly members exist */}
      {hourlyMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Timesheets</CardTitle>
            <CardDescription>Track hours logged by hourly team members</CardDescription>
          </CardHeader>
          <CardContent>
            <TimesheetViewer members={hourlyMembers} />
          </CardContent>
        </Card>
      )}

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityLog.map((item) => (
              <div key={item.id} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {item.type === "timesheet" && <FileText className="h-4 w-4 text-primary" />}
                  {item.type === "update" && <Clock className="h-4 w-4 text-primary" />}
                  {item.type === "milestone" && <Users className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.member}</p>
                  <p className="text-sm text-muted-foreground">{item.action}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
