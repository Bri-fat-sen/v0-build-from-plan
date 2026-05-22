import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export function StatCard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: LucideIcon; trend?: string }) {
  return (
    <div className="rounded-xl bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className="size-5 text-primary" />
        {trend && <span className="text-xs text-green-400">{trend}</span>}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

export function StudioSection({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
