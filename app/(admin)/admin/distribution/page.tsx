"use client"
import { StatCard } from "@/components/studio/stat-card"
import { Send, Globe, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const partnerStats = [
  { name: "Boomplay", tracks: "280K", users: "94M", territory: "Africa", status: "active", revenue: "$128K/mo" },
  { name: "Spotify (Africa)", tracks: "280K", users: "120M+", territory: "Global + Africa", status: "active", revenue: "$342K/mo" },
  { name: "Apple Music", tracks: "280K", users: "80M+", territory: "Global", status: "active", revenue: "$218K/mo" },
  { name: "YouTube Music", tracks: "280K", users: "100M+", territory: "Global", status: "active", revenue: "$95K/mo" },
  { name: "Audiomack", tracks: "280K", users: "20M+", territory: "Africa / US", status: "active", revenue: "$42K/mo" },
  { name: "Tidal", tracks: "180K", users: "3M", territory: "US / Europe", status: "pending", revenue: "—" },
  { name: "Deezer", tracks: "280K", users: "16M", territory: "Europe / Africa", status: "active", revenue: "$28K/mo" },
]

export default function AdminDistributionPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Distribution Oversight</h1>
        <p className="text-sm text-muted-foreground">Monitor DSP partnerships, delivery health, and content reach</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="DSP Partners" value="7" icon={Globe} />
        <StatCard label="Tracks Delivered" value="280K" icon={Send} trend="+8.2K" />
        <StatCard label="Countries Reached" value="145" icon={CheckCircle} trend="+12" />
        <StatCard label="Pending Deliveries" value="1,240" icon={Clock} />
      </div>

      <div>
        <h3 className="mb-3 font-display text-xl font-semibold text-foreground">DSP Partnership Status</h3>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Platform</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Tracks</th>
                <th className="p-3 text-xs text-muted-foreground hidden md:table-cell">Territory</th>
                <th className="p-3 text-xs text-muted-foreground hidden lg:table-cell">Revenue</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {partnerStats.map(p => (
                <tr key={p.name} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{p.name}</td>
                  <td className="p-3 hidden font-mono tabular-nums text-muted-foreground sm:table-cell">{p.tracks}</td>
                  <td className="p-3 hidden text-muted-foreground md:table-cell">{p.territory}</td>
                  <td className="p-3 hidden font-mono tabular-nums text-foreground lg:table-cell">{p.revenue}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      {p.status === "active"
                        ? <CheckCircle className="size-3.5 text-green-400" />
                        : <Clock className="size-3.5 text-yellow-400" />}
                      <span className={cn("text-xs capitalize", p.status === "active" ? "text-green-400" : "text-yellow-400")}>{p.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 flex-shrink-0 text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-foreground">Tidal Integration Pending</p>
            <p className="text-xs text-muted-foreground">API credentials are under review by Tidal. Expected activation: June 2026.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
