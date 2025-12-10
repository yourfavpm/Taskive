import { Briefcase } from "lucide-react"

export function TaskiveLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <Briefcase className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">Taskive</span>
    </div>
  )
}
