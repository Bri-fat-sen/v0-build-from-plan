"use client"
import { adminMetrics } from "@/lib/mock-data"
import { StatCard } from "@/components/studio/stat-card"
import {
  Users, Headphones, Eye, DollarSign, AlertTriangle, Ticket, FileVideo, Globe,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"

const growthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: Math.floor(Math.random() * 80000 + 150000),
  streams: Math.floor(Math.random() * 40000000 + 80000000),
}))

const contentBreakdown = [
  { name: "Tracks", value: 62, color: "hsl(24 95% 55%)" },
  { name: "Movies", value: 18, color: "hsl(14 75% 42%)" },
  { name: "Creator Videos", value: 12, color: "hsl(220 85% 60%)" },
  { name: "Culture", value: 8, color: "hsl(180 85% 60%)" },
]

const formatNumber = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K"
  return n.toString()
}

export default function AdminDashboardPage() {
  const m = adminMetrics
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Control Centre</h1>
        <p className="text-sm text-muted-foreground">Platform-wide metrics, moderation, and operations</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Users" value={m.totalUsers} icon={Users} trend="+4.2%" />
        <StatCard label="Active Subscribers" value={m.activeSubscribers} icon={Headphones} trend="+7.8%" />
        <StatCard label="Monthly Revenue" value={m.monthlyRevenue} icon={DollarSign} trend="+11.4%" />
        <StatCard label="Total Streams" value={m.totalStreams} icon={Eye} trend="+9.1%" />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Tracks" value={m.totalTracks} icon={Headphones} />
        <StatCard label="Total Movies" value={m.totalMovies} icon={FileVideo} />
        <StatCard label="Payout Balance" value={m.payoutBalance} icon={DollarSign} />
        <StatCard label="Fraud Flags" value={m.fraudFlags} icon={AlertTriangle} trendDown />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Platform Growth</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(24 95% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(24 95% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Area type="monotone" dataKey="users" name="Users" stroke="hsl(24 95% 55%)" fill="url(#userGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-base font-semibold text-foreground">Content Breakdown</h3>
          <div className="flex items-center gap-6">
            <div className="h-44 w-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={contentBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={38} outerRadius={68} paddingAngle={3}>
                    {contentBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2.5">
              {contentBreakdown.map(c => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="size-3 flex-shrink-0 rounded-full" style={{ background: c.color }} />
                  <span className="text-sm text-foreground">{c.name}</span>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alert items */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-display text-base font-semibold text-foreground">Action Required</h3>
        <div className="space-y-2">
          {[
            { icon: AlertTriangle, label: "Fraud flags pending review", count: m.fraudFlags, color: "text-destructive", bg: "bg-destructive/15" },
            { icon: Ticket, label: "Open support tickets", count: m.supportTickets, color: "text-yellow-400", bg: "bg-yellow-500/15" },
            { icon: FileVideo, label: "Content items pending moderation", count: m.pendingItems, color: "text-primary", bg: "bg-primary/15" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className={`flex size-8 items-center justify-center rounded-lg ${item.bg}`}>
                <item.icon className={`size-4 ${item.color}`} />
              </div>
              <span className="flex-1 text-sm text-foreground">{item.label}</span>
              <span className={`font-mono text-sm font-semibold tabular-nums ${item.color}`}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
