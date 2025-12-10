"use client"

import { useState } from "react"
import { Download, Eye, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TeamMember {
  id: string
  name: string
  timesheets?: Array<{
    week: string
    hoursLogged: number
    status: string
    submittedDate?: string
    approvedDate?: string
  }>
}

interface TimesheetViewerProps {
  members: TeamMember[]
}

export function TimesheetViewer({ members }: TimesheetViewerProps) {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="rounded-lg border overflow-hidden">
          <button
            onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expandedMember === member.id ? "rotate-180" : ""}`}
              />
              <span className="font-medium">{member.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {member.timesheets?.length || 0} timesheet{(member.timesheets?.length || 0) !== 1 ? "s" : ""}
            </span>
          </button>

          {expandedMember === member.id && member.timesheets && (
            <div className="border-t bg-muted/30 p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Hours Logged</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.timesheets.map((sheet, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{sheet.week}</TableCell>
                      <TableCell>{sheet.hoursLogged}h</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {sheet.status === "approved" ? sheet.approvedDate : sheet.submittedDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Timesheet Details</DialogTitle>
                              <DialogDescription>
                                {member.name} - {sheet.week}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Week</label>
                                <div className="text-sm p-2 bg-muted rounded">{sheet.week}</div>
                              </div>
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Hours Logged</label>
                                <div className="text-sm p-2 bg-muted rounded">{sheet.hoursLogged} hours</div>
                              </div>
                              <div className="grid gap-2">
                                <label className="text-sm font-medium">Status</label>
                                <Badge
                                  variant={sheet.status === "approved" ? "secondary" : "outline"}
                                  className={`w-fit ${
                                    sheet.status === "approved"
                                      ? "bg-green-100 text-green-700"
                                      : "border-amber-500 text-amber-600"
                                  }`}
                                >
                                  {sheet.status.charAt(0).toUpperCase() + sheet.status.slice(1)}
                                </Badge>
                              </div>
                              <Button variant="outline" className="w-full mt-4 bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
