"use client"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { FileText, DollarSign, CheckCircle, Clock, Plus, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const licensingDeals = [
  { id: "L001", licensee: "Afrobeats TV", type: "Broadcast", territory: "UK, Europe", tracks: 12, fee: "$4,800", status: "Active", expires: "Dec 2026" },
  { id: "L002", licensee: "African Airlines", type: "Inflight", territory: "Pan-Africa", tracks: 24, fee: "$2,200", status: "Active", expires: "Jun 2026" },
  { id: "L003", licensee: "StreamHub Nordic", type: "Streaming", territory: "Scandinavia", tracks: 48, fee: "$1,800/mo", status: "Active", expires: "Dec 2027" },
  { id: "L004", licensee: "Lagos Fashion Week", type: "Event Sync", territory: "Nigeria", tracks: 6, fee: "$950", status: "Pending", expires: "Jul 2026" },
  { id: "L005", licensee: "Diaspora Radio AU", type: "Radio", territory: "Australia", tracks: 18, fee: "$600/qtr", status: "Active", expires: "Mar 2027" },
]

export default function LicensingPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Licensing</h1>
          <p className="text-sm text-muted-foreground">Manage sync, broadcast, and commercial licensing deals</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 press-scale">
          <Plus className="size-4" /> New Deal
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Deals" value="4" icon={FileText} trend="+1" />
        <StatCard label="Total Licensed Tracks" value="108" icon={CheckCircle} />
        <StatCard label="Annual Revenue" value="$42,600" icon={DollarSign} trend="+22.1%" />
        <StatCard label="Pending Review" value="1" icon={Clock} />
      </div>

      <StudioSection title="Licensing Agreements"
        action={<button className="flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-foreground"><ExternalLink className="size-3 mr-1" /> Export</button>}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Licensee</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="p-3 text-xs text-muted-foreground hidden md:table-cell">Territory</th>
                <th className="p-3 text-xs text-muted-foreground">Fee</th>
                <th className="p-3 text-xs text-muted-foreground hidden lg:table-cell">Expires</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {licensingDeals.map(deal => (
                <tr key={deal.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{deal.licensee}</td>
                  <td className="p-3 hidden text-muted-foreground sm:table-cell">{deal.type}</td>
                  <td className="p-3 hidden text-muted-foreground md:table-cell">{deal.territory}</td>
                  <td className="p-3 font-mono tabular-nums text-foreground">{deal.fee}</td>
                  <td className="p-3 hidden text-muted-foreground lg:table-cell">{deal.expires}</td>
                  <td className="p-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs",
                      deal.status === "Active" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                    )}>{deal.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>
    </div>
  )
}
