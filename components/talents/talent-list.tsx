"use client"

import { TalentCard } from "./talent-card"

// Mock data for talents
const talents = [
  {
    id: "TAL-001",
    name: "Sarah Chen",
    role: "Operations Manager",
    avatar: "/professional-asian-woman.png",
    skills: ["Project Management", "Operations", "Team Leadership"],
    workMode: "Remote",
    availability: "Full-time",
    experience: "8 years",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "$45-55",
  },
  {
    id: "TAL-002",
    name: "Michael Park",
    role: "Project Coordinator",
    avatar: "/professional-korean-man.png",
    skills: ["Project Coordination", "Agile", "Stakeholder Management"],
    workMode: "Hybrid",
    availability: "Full-time",
    experience: "5 years",
    rating: 4.8,
    reviews: 32,
    hourlyRate: "$35-45",
  },
  {
    id: "TAL-003",
    name: "Emily Watson",
    role: "Executive Assistant",
    avatar: "/professional-blonde-woman.png",
    skills: ["Executive Support", "Calendar Management", "Travel Coordination"],
    workMode: "Remote",
    availability: "Full-time",
    experience: "6 years",
    rating: 5.0,
    reviews: 58,
    hourlyRate: "$30-40",
  },
  {
    id: "TAL-004",
    name: "David Martinez",
    role: "Sales Operations Specialist",
    avatar: "/professional-hispanic-man.png",
    skills: ["Salesforce", "CRM Management", "Data Analysis"],
    workMode: "Remote",
    availability: "Contract",
    experience: "4 years",
    rating: 4.7,
    reviews: 23,
    hourlyRate: "$40-50",
  },
  {
    id: "TAL-005",
    name: "Jennifer Liu",
    role: "Customer Success Manager",
    avatar: "/professional-woman-chinese.jpg",
    skills: ["Customer Success", "Onboarding", "Retention"],
    workMode: "Hybrid",
    availability: "Full-time",
    experience: "7 years",
    rating: 4.9,
    reviews: 41,
    hourlyRate: "$50-60",
  },
  {
    id: "TAL-006",
    name: "Robert Johnson",
    role: "HR Operations Coordinator",
    avatar: "/professional-african-american-man.png",
    skills: ["HR Operations", "Payroll", "Compliance"],
    workMode: "Onsite",
    availability: "Full-time",
    experience: "5 years",
    rating: 4.6,
    reviews: 19,
    hourlyRate: "$35-45",
  },
]

export function TalentList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{talents.length}</strong> verified professionals
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {talents.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  )
}
