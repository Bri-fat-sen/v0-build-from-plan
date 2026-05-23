"use client"
import { studioMetrics, formatNumber, mockArtists } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Tag, Users, DollarSign, Disc, Calendar, Play, FileText, Send } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const monthlyRevenue = Array.from({ length: 6 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: Math.floor(Math.random() * 80000 + 30000),
}))

export default function LabelStudioPage() {
  const m = studioMetrics.label
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Label Studio</h1>
        <p className="text-sm text-muted-foreground">Manage your roster, releases, royalties, and campaigns</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Roster Size" value={m.roster.toString()} icon={Users} />
        <StatCard label="Total Releases" value={m.releases.toString()} icon={Disc} />
        <StatCard label="Total Streams" value={formatNumber(m.totalStreams)} icon={Play} trend="+18.4%" />
        <StatCard label="Revenue" value={`$${formatNumber(m.revenue)}`} icon={DollarSign} trend="+22.1%" />
        <StatCard label="Pending Payouts" value={`$${formatNumber(m.pendingPayouts)}`} icon={DollarSign} />
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Monthly Revenue</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="revenue" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Roster */}
      <StudioSection title="Artist Roster" action={<button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">+ Add Artist</button>}>
        <div className="rounded-xl bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-3">Artist</th><th className="p-3 hidden sm:table-cell">Genre</th><th className="p-3 hidden md:table-cell">Streams</th><th className="p-3">Status</th>
            </tr></thead>
            <tbody>
              {mockArtists.slice(0, 6).map(a => (
                <tr key={a.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="p-3 font-medium text-foreground">{a.name}</td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground">{a.genre}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{formatNumber(a.monthlyListeners)}</td>
                  <td className="p-3"><span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Release Calendar", icon: Calendar },
          { label: "Royalty Statements", icon: FileText },
          { label: "Campaigns", icon: Tag },
          { label: "Distribution", icon: Send },
        ].map(a => (
          <button key={a.label} className="flex items-center gap-3 rounded-xl bg-card p-4 text-left transition-colors hover:bg-secondary">
            <a.icon className="size-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
