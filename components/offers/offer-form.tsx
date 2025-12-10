"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2, Info } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock talent data
const talents = [
  { id: "TAL-001", name: "Sarah Chen", role: "Operations Manager" },
  { id: "TAL-002", name: "Michael Park", role: "Project Coordinator" },
  { id: "TAL-003", name: "Emily Watson", role: "Executive Assistant" },
  { id: "TAL-004", name: "David Martinez", role: "Sales Operations Specialist" },
  { id: "TAL-005", name: "Jennifer Liu", role: "Customer Success Manager" },
]

interface OfferFormProps {
  prefilledTalentId?: string
}

export function OfferForm({ prefilledTalentId }: OfferFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    talentId: prefilledTalentId || "",
    scopeOfWork: "",
    salaryType: "",
    salaryAmount: "",
    workHours: "",
    workMode: "",
    paymentFrequency: "",
    billingFrequency: "",
    startDate: undefined as Date | undefined,
  })

  const selectedTalent = talents.find((t) => t.id === formData.talentId)

  useEffect(() => {
    if (prefilledTalentId) {
      setFormData((prev) => ({ ...prev, talentId: prefilledTalentId }))
    }
  }, [prefilledTalentId])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.talentId) newErrors.talentId = "Please select a talent"
    if (!formData.scopeOfWork) newErrors.scopeOfWork = "Scope of work is required"
    if (!formData.salaryType) newErrors.salaryType = "Please select salary type"
    if (!formData.salaryAmount || Number(formData.salaryAmount) <= 0) {
      newErrors.salaryAmount = "Please enter a valid salary amount"
    }
    if (formData.salaryType === "fixed" && !formData.workHours) {
      newErrors.workHours = "Work hours are required for fixed salary"
    }
    if (!formData.workMode) newErrors.workMode = "Please select work mode"
    if (formData.salaryType === "fixed" && !formData.paymentFrequency) {
      newErrors.paymentFrequency = "Payment frequency is required"
    }
    if (formData.salaryType === "hourly" && !formData.billingFrequency) {
      newErrors.billingFrequency = "Billing frequency is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    } else if (formData.startDate < new Date()) {
      newErrors.startDate = "Start date cannot be in the past"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()

    if (!isDraft && !validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/dashboard/offers")
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      {/* Talent Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Talent Information</CardTitle>
          <CardDescription>Select the talent you want to make an offer to</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="talent">Talent *</Label>
            <Select value={formData.talentId} onValueChange={(value) => setFormData({ ...formData, talentId: value })}>
              <SelectTrigger className={errors.talentId ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a talent" />
              </SelectTrigger>
              <SelectContent>
                {talents.map((talent) => (
                  <SelectItem key={talent.id} value={talent.id}>
                    {talent.name} - {talent.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.talentId && <p className="text-sm text-destructive">{errors.talentId}</p>}
          </div>

          {selectedTalent && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Talent ID: <span className="font-mono font-medium">{selectedTalent.id}</span>
                {" • "}
                {selectedTalent.name}, {selectedTalent.role}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Scope of Work */}
      <Card>
        <CardHeader>
          <CardTitle>Scope of Work</CardTitle>
          <CardDescription>Describe the tasks and responsibilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="scope">Description *</Label>
            <Textarea
              id="scope"
              placeholder="Describe the scope of work, responsibilities, and deliverables..."
              className={cn("min-h-[120px]", errors.scopeOfWork && "border-destructive")}
              value={formData.scopeOfWork}
              onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
            />
            {errors.scopeOfWork && <p className="text-sm text-destructive">{errors.scopeOfWork}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
          <CardDescription>Set the salary type and amount</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Salary Type *</Label>
              <Select
                value={formData.salaryType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    salaryType: value,
                    paymentFrequency: value === "fixed" ? formData.paymentFrequency : "",
                    billingFrequency: value === "hourly" ? formData.billingFrequency : "",
                  })
                }
              >
                <SelectTrigger className={errors.salaryType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Salary</SelectItem>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                </SelectContent>
              </Select>
              {errors.salaryType && <p className="text-sm text-destructive">{errors.salaryType}</p>}
            </div>

            <div className="space-y-2">
              <Label>Salary Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder={formData.salaryType === "hourly" ? "Per hour" : "Per month"}
                  className={cn("pl-7", errors.salaryAmount && "border-destructive")}
                  value={formData.salaryAmount}
                  onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
                />
              </div>
              {errors.salaryAmount && <p className="text-sm text-destructive">{errors.salaryAmount}</p>}
            </div>
          </div>

          {formData.salaryType === "fixed" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Work Hours (per week) *</Label>
                <Input
                  type="number"
                  placeholder="e.g., 40"
                  className={errors.workHours ? "border-destructive" : ""}
                  value={formData.workHours}
                  onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                />
                {errors.workHours && <p className="text-sm text-destructive">{errors.workHours}</p>}
              </div>
              <div className="space-y-2">
                <Label>Payment Frequency *</Label>
                <Select
                  value={formData.paymentFrequency}
                  onValueChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
                >
                  <SelectTrigger className={errors.paymentFrequency ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentFrequency && <p className="text-sm text-destructive">{errors.paymentFrequency}</p>}
              </div>
            </div>
          )}

          {formData.salaryType === "hourly" && (
            <div className="space-y-2">
              <Label>Billing Frequency *</Label>
              <Select
                value={formData.billingFrequency}
                onValueChange={(value) => setFormData({ ...formData, billingFrequency: value })}
              >
                <SelectTrigger className={errors.billingFrequency ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              {errors.billingFrequency && <p className="text-sm text-destructive">{errors.billingFrequency}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Work Details */}
      <Card>
        <CardHeader>
          <CardTitle>Work Details</CardTitle>
          <CardDescription>Specify work mode and start date</CardDescription>
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
              <Label>Expected Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                      errors.startDate && "border-destructive",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isLoading}>
          Save as Draft
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Offer"
          )}
        </Button>
      </div>
    </form>
  )
}
