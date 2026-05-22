import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  trendDown?: boolean
}

export function StatCard({ label, value, icon: Icon, trend, trendDown }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15">
          <Icon className="size-4 text-primary" />
        </div>
        {trend && (
          <span className={cn("font-mono text-xs tabular-nums", trendDown ? "text-destructive" : "text-green-400")}>
            {trend}
          </span>
        )}
      </div>
      <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function StudioSection({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
