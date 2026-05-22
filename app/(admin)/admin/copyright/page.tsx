"use client"
import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const takedowns = [
  { id: "T001", content: "Afrobeats Mashup Vol.3", type: "Track", claimant: "Universal Music Africa", reason: "Copyright infringement", filed: "2h ago", status: "pending" },
  { id: "T002", content: "Wedding Ceremony Highlights", type: "Creator Video", claimant: "Femi Kuti Estate", reason: "Unlicensed music use", filed: "5h ago", status: "pending" },
  { id: "T003", content: "Nollywood Movie Rip", type: "Movie", claimant: "EbonyLife Films", reason: "Piracy / Duplicate", filed: "1d ago", status: "actioned" },
  { id: "T004", content: "Afrobeats DJ Mix", type: "Podcast", claimant: "Sony Music Entertainment", reason: "Unlicensed samples", filed: "2d ago", status: "pending" },
  { id: "T005", content: "Traditional Drumming Cover", type: "Track", claimant: "Percussion Institute Africa", reason: "Copyright infringement", filed: "3d ago", status: "dismissed" },
  { id: "T006", content: "Full Season Upload", type: "Movie", claimant: "Africa Magic", reason: "Piracy", filed: "4d ago", status: "actioned" },
]

export default function AdminCopyrightPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filtered = takedowns.filter(t =>
    (filter === "All" || t.status === filter.toLowerCase()) &&
    (t.content.toLowerCase().includes(search.toLowerCase()) || t.claimant.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Copyright & Takedowns</h1>
        <p className="text-sm text-muted-foreground">Manage DMCA claims, copyright disputes, and content removal requests</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending Claims", value: "17", color: "text-yellow-400", icon: AlertTriangle },
          { label: "Actioned", value: "142", color: "text-destructive", icon: XCircle },
          { label: "Dismissed", value: "38", color: "text-green-400", icon: CheckCircle },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-muted">
              <s.icon className={cn("size-4", s.color)} />
            </div>
            <p className={cn("font-mono text-2xl font-bold tabular-nums", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search claims..."
            className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {["All", "Pending", "Actioned", "Dismissed"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("rounded-md px-3 py-1 text-xs font-medium transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}>{f}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(t => (
          <div key={t.id} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
            <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
              <Shield className="size-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-foreground">{t.content}</p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{t.type}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Claimant: <span className="text-foreground">{t.claimant}</span> &middot; {t.reason}
              </p>
              <p className="text-xs text-muted-foreground">{t.filed}</p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={cn("rounded-full px-2 py-0.5 text-xs capitalize",
                t.status === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                t.status === "actioned" ? "bg-destructive/15 text-destructive" :
                "bg-green-500/15 text-green-400"
              )}>{t.status}</span>
              {t.status === "pending" && (
                <div className="flex items-center gap-1">
                  <button className="rounded-lg bg-destructive/15 px-2 py-1 text-xs text-destructive hover:bg-destructive/25 transition-colors">Remove</button>
                  <button className="rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">Dismiss</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
