"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function CreateJobOpeningForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    description: "",
    responsibilities: "",
    requiredSkills: "",
    salaryMin: "",
    salaryMax: "",
    workMode: "",
    employmentType: "",
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.description) newErrors.description = "Job description is required"
    if (!formData.responsibilities) newErrors.responsibilities = "Responsibilities are required"
    if (!formData.requiredSkills) newErrors.requiredSkills = "Required skills are required"
    if (!formData.workMode) newErrors.workMode = "Work mode is required"
    if (!formData.employmentType) newErrors.employmentType = "Employment type is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/dashboard/job-offers")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic details about the job opening</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Operations Manager"
                className={errors.jobTitle ? "border-destructive" : ""}
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
              {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                placeholder="e.g., Operations"
                className={errors.department ? "border-destructive" : ""}
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              {errors.department && <p className="text-sm text-destructive">{errors.department}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
          <CardDescription>Describe the role and responsibilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide a comprehensive overview of the position..."
              className={cn("min-h-[100px]", errors.description && "border-destructive")}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Key Responsibilities *</Label>
            <Textarea
              id="responsibilities"
              placeholder="List the main responsibilities (one per line or separated by comma)..."
              className={cn("min-h-[100px]", errors.responsibilities && "border-destructive")}
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
            />
            {errors.responsibilities && <p className="text-sm text-destructive">{errors.responsibilities}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills *</Label>
            <Textarea
              id="skills"
              placeholder="List the required skills (one per line or separated by comma)..."
              className={cn("min-h-[80px]", errors.requiredSkills && "border-destructive")}
              value={formData.requiredSkills}
              onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            />
            {errors.requiredSkills && <p className="text-sm text-destructive">{errors.requiredSkills}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Work Details */}
      <Card>
        <CardHeader>
          <CardTitle>Work Details</CardTitle>
          <CardDescription>Specify work mode and employment type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Work Mode *</Label>
              <Select
                value={formData.workMode}
                onValueChange={(value) => setFormData({ ...formData, workMode: value })}
              >
                <SelectTrigger className={errors.workMode ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select work mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              {errors.workMode && <p className="text-sm text-destructive">{errors.workMode}</p>}
            </div>

            <div className="space-y-2">
              <Label>Employment Type *</Label>
              <Select
                value={formData.employmentType}
                onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
              >
                <SelectTrigger className={errors.employmentType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentType && <p className="text-sm text-destructive">{errors.employmentType}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Range */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
          <CardDescription>Optional: Specify salary range for the position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum Salary (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="e.g., 80000"
                  className="pl-7"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum Salary (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="e.g., 120000"
                  className="pl-7"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Job Opening"
          )}
        </Button>
      </div>
    </form>
  )
}
