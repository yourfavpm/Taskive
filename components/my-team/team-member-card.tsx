"use client"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, MoreVertical, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

interface TeamMember {
  id: string
  name: string
  role: string
  contractId: string
  email: string
  phone: string
  location: string
  workMode: string
  hoursPerWeek: number
  salaryType: string
  monthlyRate?: number
  hourlyRate?: number
  startDate: string
  endDate: string
  avatar: string
  timesheetType: string
}

interface TeamMemberCardProps {
  member: TeamMember
  isSelected: boolean
  onSelect: (id: string | null) => void
}

export function TeamMemberCard({ member, isSelected, onSelect }: TeamMemberCardProps) {
  return (
    <Card className={`cursor-pointer transition-all ${isSelected ? "border-primary shadow-lg" : ""}`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                {member.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {member.workMode}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={
                      member.salaryType === "hourly"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        : "bg-green-100 text-green-700 hover:bg-green-100"
                    }
                  >
                    {member.salaryType === "hourly" ? "Hourly" : "Fixed Salary"}
                  </Badge>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/contracts/${member.contractId}`}>View Contract</Link>
                </DropdownMenuItem>
                {member.timesheetType === "hourly" && <DropdownMenuItem>Download Timesheets</DropdownMenuItem>}
                <DropdownMenuItem>Contact Talent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* Contact & Location */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.hoursPerWeek}h/week</span>
            </div>
          </div>

          <Separator />

          {/* Compensation & Contract Period */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Compensation</p>
              <p className="text-sm font-semibold">
                {member.salaryType === "hourly"
                  ? `$${member.hourlyRate}/hr`
                  : `$${member.monthlyRate?.toLocaleString()}/mo`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="text-sm font-semibold">{member.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">End Date</p>
              <p className="text-sm font-semibold">{member.endDate}</p>
            </div>
          </div>

          {/* Expand for Timesheets (if hourly) */}
          {member.timesheetType === "hourly" && (
            <>
              <Separator />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(isSelected ? null : member.id)}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                {isSelected ? "Hide" : "View"} Timesheets
              </Button>
            </>
          )}
        </div>

        {/* Timesheet Details (if expanded) */}
        {isSelected && member.timesheetType === "hourly" && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Recent Timesheets</h4>
              {"timesheets" in member && member.timesheets ? (
                member.timesheets.map((sheet: any, idx: number) => (
                  <div key={idx} className="rounded-lg bg-muted/50 p-3 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{sheet.week}</span>
                      <Badge
                        variant={sheet.status === "approved" ? "secondary" : "outline"}
                        className={
                          sheet.status === "approved"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "border-amber-500 text-amber-600"
                        }
                      >
                        {sheet.status.charAt(0).toUpperCase() + sheet.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sheet.hoursLogged} hours logged •{" "}
                      {sheet.status === "approved"
                        ? `Approved on ${sheet.approvedDate}`
                        : `Submitted on ${sheet.submittedDate}`}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">No timesheets yet</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
