import { Suspense } from "react"
import { TalentList } from "@/components/talents/talent-list"
import { TalentFilters } from "@/components/talents/talent-filters"
import { Users } from "lucide-react"

export default function TalentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          Hire Talent
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse and shortlist verified operations professionals for your team
        </p>
      </div>

      {/* Filters */}
      <TalentFilters />

      {/* Talent List */}
      <Suspense fallback={<TalentListSkeleton />}>
        <TalentList />
      </Suspense>
    </div>
  )
}

function TalentListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-6 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-3/4 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
