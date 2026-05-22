"use client"
import { studioMetrics, formatNumber, mockTracks } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Music, Users, DollarSign, Headphones, TrendingUp, Play, BarChart3, Upload } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const streamData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  streams: Math.floor(Math.random() * 5000000 + 1000000),
}))

const revenueData = Array.from({ length: 6 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: Math.floor(Math.random() * 15000 + 5000),
}))

export default function ArtistStudioPage() {
  const m = studioMetrics.artist
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Artist Studio</h1>
        <p className="text-sm text-muted-foreground">Manage your music, analytics, and revenue</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Total Streams" value={formatNumber(m.totalStreams)} icon={Play} trend="+12.3%" />
        <StatCard label="Monthly Listeners" value={formatNumber(m.monthlyListeners)} icon={Headphones} trend="+8.1%" />
        <StatCard label="Followers" value={formatNumber(m.followers)} icon={Users} trend="+5.2%" />
        <StatCard label="Revenue" value={`$${formatNumber(m.revenue)}`} icon={DollarSign} trend="+15.7%" />
        <StatCard label="Top Track" value={m.topTrack} icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Streams Over Time</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamData}>
                <defs>
                  <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => formatNumber(v)} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Area type="monotone" dataKey="streams" stroke="hsl(25, 95%, 53%)" fill="url(#streamGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Revenue</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
                <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="revenue" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Releases */}
      <StudioSection title="Your Releases"
        action={<button className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"><Upload className="size-3" /> New Release</button>}>
        <div className="rounded-xl bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-3">Title</th><th className="p-3 hidden sm:table-cell">Type</th><th className="p-3 hidden md:table-cell">Streams</th><th className="p-3">Status</th>
            </tr></thead>
            <tbody>
              {mockTracks.slice(0, 6).map(t => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="p-3 font-medium text-foreground">{t.title}</td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground">Single</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{formatNumber(t.plays)}</td>
                  <td className="p-3"><span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Live</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Upload Music", icon: Upload },
          { label: "Royalty Statements", icon: DollarSign },
          { label: "Analytics", icon: BarChart3 },
          { label: "Distribution", icon: Music },
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
