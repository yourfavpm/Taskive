"use client"

import Link from "next/link"
import { Star, MapPin, Clock, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TalentCardProps {
  talent: {
    id: string
    name: string
    role: string
    avatar: string
    skills: string[]
    workMode: string
    availability: string
    experience: string
    rating: number
    reviews: number
    hourlyRate: string
  }
}

export function TalentCard({ talent }: TalentCardProps) {
  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {talent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold truncate">{talent.name}</h3>
                <p className="text-sm text-muted-foreground">{talent.role}</p>
              </div>
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{talent.rating}</span>
                <span className="text-muted-foreground">({talent.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {talent.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{talent.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{talent.workMode}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{talent.availability}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Hourly Rate</p>
            <p className="font-semibold text-primary">{talent.hourlyRate}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/talents/${talent.id}`}>View Profile</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/dashboard/offers/new?talent=${talent.id}`}>
                <Send className="h-4 w-4 mr-1" />
                Offer
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
