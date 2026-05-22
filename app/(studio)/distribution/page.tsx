"use client"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Send, Globe, CheckCircle, Clock, AlertTriangle, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const distributionPartners = [
  { name: "Apple Music", region: "Global", status: "active", tracks: 48 },
  { name: "Spotify", region: "Global", status: "active", tracks: 48 },
  { name: "YouTube Music", region: "Global", status: "active", tracks: 48 },
  { name: "Boomplay", region: "Africa", status: "active", tracks: 48 },
  { name: "Audiomack", region: "Africa / Diaspora", status: "active", tracks: 48 },
  { name: "Tidal", region: "Global", status: "pending", tracks: 12 },
  { name: "Deezer", region: "Europe / Africa", status: "active", tracks: 48 },
  { name: "Amazon Music", region: "Global", status: "inactive", tracks: 0 },
]

export default function DistributionPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Distribution</h1>
          <p className="text-sm text-muted-foreground">Manage DSP delivery and global distribution channels</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 press-scale">
          <Plus className="size-4" /> Add Channel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active DSPs" value="7" icon={Globe} trend="+1" />
        <StatCard label="Tracks Distributed" value="48" icon={Send} trend="+6" />
        <StatCard label="Live Countries" value="120+" icon={CheckCircle} />
        <StatCard label="Pending Deliveries" value="3" icon={Clock} />
      </div>

      <StudioSection title="Distribution Partners">
        <div className="space-y-2">
          {distributionPartners.map(partner => (
            <div key={partner.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
              <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                <Send className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{partner.name}</p>
                <p className="text-xs text-muted-foreground">{partner.region}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-mono text-sm tabular-nums text-foreground">{partner.tracks}</p>
                <p className="text-xs text-muted-foreground">tracks</p>
              </div>
              <div className="flex items-center gap-1.5">
                {partner.status === "active" && <CheckCircle className="size-4 text-green-400" />}
                {partner.status === "pending" && <Clock className="size-4 text-yellow-400" />}
                {partner.status === "inactive" && <AlertTriangle className="size-4 text-muted-foreground" />}
                <span className={cn("text-xs capitalize",
                  partner.status === "active" ? "text-green-400" :
                  partner.status === "pending" ? "text-yellow-400" : "text-muted-foreground"
                )}>{partner.status}</span>
              </div>
            </div>
          ))}
        </div>
      </StudioSection>
    </div>
  )
}
