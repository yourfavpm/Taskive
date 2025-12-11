import Link from "next/link"
import { ArrowLeft, Star, MapPin, Clock, Calendar, Send, Bookmark, MessageSquare, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock data - in real app, fetch by ID
const talent = {
  id: "TAL-001",
  name: "Sarah Chen",
  role: "Operations Manager",
  avatar: "/professional-asian-woman-headshot.png",
  bio: "Experienced operations manager with a proven track record of streamlining processes and leading high-performing teams. Specialized in startup environments and scaling operations from seed to Series B.",
  skills: [
    "Project Management",
    "Operations",
    "Team Leadership",
    "Process Optimization",
    "Vendor Management",
    "Budget Planning",
  ],
  workMode: "Remote",
  availability: "Full-time",
  experience: "8 years",
  rating: 4.9,
  reviews: 47,
  hourlyRate: "$45-55",
  location: "San Francisco, CA",
  languages: ["English", "Mandarin"],
  education: "MBA, Stanford University",
  completedProjects: 23,
  responseTime: "< 2 hours",
}

const reviews = [
  {
    id: 1,
    author: "Alex Thompson",
    company: "TechStart Inc",
    rating: 5,
    date: "Nov 2024",
    text: "Sarah transformed our operations in just 3 months. Her attention to detail and proactive approach made a huge difference.",
  },
  {
    id: 2,
    author: "Maria Garcia",
    company: "GrowthLabs",
    rating: 5,
    date: "Oct 2024",
    text: "Excellent communicator and incredibly organized. Would highly recommend for any startup looking to scale their operations.",
  },
  {
    id: 3,
    author: "James Wilson",
    company: "Innovate Co",
    rating: 4,
    date: "Sep 2024",
    text: "Great work on our vendor management project. Delivered on time and under budget.",
  },
]

export default function TalentProfilePage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { from?: string }
}) {
  const isFromJobOffer = searchParams.from === "job-offer"
  const isFromHireTalent = !isFromJobOffer // default context

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href={isFromJobOffer ? "/dashboard/job-offers" : "/dashboard/talents"}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {isFromJobOffer ? "Job Openings" : "Talents"}
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
                  <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {talent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">{talent.name}</h1>
                        <p className="text-lg text-muted-foreground">{talent.role}</p>
                      </div>
                      <div className="flex items-center gap-1 text-lg">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{talent.rating}</span>
                        <span className="text-muted-foreground">({talent.reviews} reviews)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Talent ID: <span className="font-mono">{talent.id}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{talent.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{talent.availability}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{talent.experience} experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{talent.bio}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vetting Levels */}
<Card>
  <CardHeader>
    <CardTitle>Taskive Vetting Status</CardTitle>
    <CardDescription>Progress across the 5-step vetting pipeline</CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    {[
      { level: 1, title: "Identity Verification", status: "Completed" },
      { level: 2, title: "Experience & CV Screening", status: "Completed" },
      { level: 3, title: "Skills Assessment", status: "Completed" },
      { level: 4, title: "Interview Vetting", status: "In Progress" },
      { level: 5, title: "Final Approval", status: "Pending" },
    ].map((step) => (
      <div key={step.level} className="flex items-center justify-between">
        <div>
          <p className="font-medium">{step.title}</p>
        </div>

        <Badge
          variant={
            step.status === "Completed"
              ? "default"
              : step.status === "In Progress"
              ? "secondary"
              : "outline"
          }
        >
          {step.status}
        </Badge>
      </div>
    ))}
  </CardContent>
</Card>

{/* Talent Manager Internal Feedback */}
<Card>
  <CardHeader>
    <CardTitle>Talent Manager Feedback</CardTitle>
    <CardDescription>Internal notes from Taskive’s review team</CardDescription>
  </CardHeader>

  <CardContent className="space-y-3">
    <p className="text-sm text-muted-foreground">
      These notes are only visible to the Taskive internal team.
    </p>

    {/* Example note */}
    <div className="p-3 rounded-md bg-muted">
      <p className="text-sm">
        <span className="font-semibold">TM John:</span> Candidate performed
        strongly during the skills assessment. Recommend prioritizing them for
        operations-focused clients.
      </p>
    </div>

    <textarea
      placeholder="Add internal feedback…"
      className="w-full p-3 border rounded-md bg-transparent"
      rows={4}
    />

    <Button className="w-full">Save Feedback</Button>
  </CardContent>
</Card>



          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Client Reviews</CardTitle>
              <CardDescription>What clients are saying about {talent.name.split(" ")[0]}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review, index) => (
                <div key={review.id}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Hourly Rate</p>
                <p className="text-3xl font-bold text-primary">{talent.hourlyRate}</p>
              </div>

              <Separator />

              <div className="space-y-3">
                {isFromJobOffer ? (
                  // From Job Offers: Only Request Interview and Generate Offer
                  <>
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/dashboard/offers/new?talent=${talent.id}`}>
                        <Send className="h-4 w-4 mr-2" />
                        Generate Offer
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Request Interview
                    </Button>
                  </>
                ) : (
                  // From Hire Talent: Request Interview, Shortlist, and Generate Offer
                  <>
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/dashboard/offers/new?talent=${talent.id}`}>
                        <Send className="h-4 w-4 mr-2" />
                        Generate Offer
                      </Link>
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full bg-transparent">
                        <PhoneCall className="h-4 w-4 mr-1" />
                        Request Interview
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Bookmark className="h-4 w-4 mr-1" />
                        Shortlist
                      </Button>
                    </div>
                  </>
                )}
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Work Mode</span>
                  <span className="font-medium">{talent.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-medium">{talent.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects Completed</span>
                  <span className="font-medium">{talent.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium">{talent.languages.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Education</span>
                  <span className="font-medium">{talent.education}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
