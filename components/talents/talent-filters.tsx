"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const skills = [
  "Project Management",
  "Operations",
  "Executive Assistant",
  "Customer Success",
  "Data Entry",
  "Bookkeeping",
  "HR Operations",
  "Sales Operations",
]

const workModes = ["Remote", "Onsite", "Hybrid"]
const availability = ["Full-time", "Part-time", "Contract"]

export function TalentFilters() {
  const [search, setSearch] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("")
  const [selectedAvailability, setSelectedAvailability] = useState<string>("")

  const activeFilters = [...selectedSkills, selectedWorkMode, selectedAvailability].filter(Boolean)

  const clearFilters = () => {
    setSelectedSkills([])
    setSelectedWorkMode("")
    setSelectedAvailability("")
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skills, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          <Select value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Work Mode" />
            </SelectTrigger>
            <SelectContent>
              {workModes.map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {mode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {availability.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* More Filters Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Talents</SheetTitle>
                <SheetDescription>Narrow down your search with specific criteria</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Skills */}
                <div className="space-y-3">
                  <Label>Skills</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm font-normal">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Mode */}
                <div className="space-y-3">
                  <Label>Work Mode</Label>
                  <div className="flex flex-wrap gap-2">
                    {workModes.map((mode) => (
                      <Button
                        key={mode}
                        variant={selectedWorkMode === mode ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedWorkMode(selectedWorkMode === mode ? "" : mode)}
                      >
                        {mode}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <div className="flex flex-wrap gap-2">
                    {availability.map((a) => (
                      <Button
                        key={a}
                        variant={selectedAvailability === a ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedAvailability(selectedAvailability === a ? "" : a)}
                      >
                        {a}
                      </Button>
                    ))}
                  </div>
                </div>

                {activeFilters.length > 0 && (
                  <Button variant="ghost" className="w-full" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button
                onClick={() => {
                  if (selectedSkills.includes(filter)) toggleSkill(filter)
                  else if (selectedWorkMode === filter) setSelectedWorkMode("")
                  else if (selectedAvailability === filter) setSelectedAvailability("")
                }}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
