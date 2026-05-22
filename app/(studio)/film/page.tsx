"use client"
import { mockMovies, formatNumber } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Film, Play, DollarSign, Eye, Upload, BarChart3, Globe, Award } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

const viewsData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  views: Math.floor(Math.random() * 800000 + 200000),
}))

const revenueData = Array.from({ length: 6 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec"][i],
  streaming: Math.floor(Math.random() * 12000 + 3000),
  licensing: Math.floor(Math.random() * 5000 + 1000),
}))

const regionData = [
  { name: "West Africa", value: 42, color: "hsl(24 95% 55%)" },
  { name: "East Africa", value: 28, color: "hsl(14 75% 42%)" },
  { name: "Diaspora", value: 18, color: "hsl(220 85% 60%)" },
  { name: "Global", value: 12, color: "hsl(42 95% 62%)" },
]

export default function FilmStudioPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Film Studio</h1>
          <p className="text-sm text-muted-foreground">Distribute, track, and monetise your films and series</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 press-scale">
          <Upload className="size-4" /> Submit Film
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Views" value="4.2M" icon={Eye} trend="+18.4%" />
        <StatCard label="Active Titles" value="12" icon={Film} trend="+2" />
        <StatCard label="Revenue" value="$28,400" icon={DollarSign} trend="+11.2%" />
        <StatCard label="Countries" value="38" icon={Globe} trend="+5" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Views Over Time</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(330 85% 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(330 85% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => formatNumber(v)} />
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Area type="monotone" dataKey="views" stroke="hsl(330 85% 60%)" fill="url(#viewGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Revenue Breakdown</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="streaming" name="Streaming" fill="hsl(330 85% 60%)" radius={[4, 4, 0, 0]} stackId="rev" />
                <Bar dataKey="licensing" name="Licensing" fill="hsl(14 75% 42%)" radius={[4, 4, 0, 0]} stackId="rev" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Audience by Region */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-4 font-display text-base font-semibold text-foreground">Audience by Region</h3>
        <div className="flex flex-wrap items-center gap-6">
          <div className="h-40 w-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={regionData} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={3}>
                  {regionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2">
            {regionData.map(r => (
              <div key={r.name} className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ background: r.color }} />
                <span className="text-sm text-foreground">{r.name}</span>
                <span className="font-mono text-sm tabular-nums text-muted-foreground">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Film Catalogue */}
      <StudioSection title="Your Films"
        action={<button className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"><Upload className="size-3" /> Add Title</button>}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Title</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Type</th>
                <th className="p-3 text-xs text-muted-foreground hidden md:table-cell">Views</th>
                <th className="p-3 text-xs text-muted-foreground hidden lg:table-cell">Country</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMovies.slice(0, 6).map(m => (
                <tr key={m.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{m.title}</td>
                  <td className="p-3 hidden text-muted-foreground sm:table-cell capitalize">{m.type}</td>
                  <td className="p-3 hidden font-mono tabular-nums text-muted-foreground md:table-cell">{m.views ?? "—"}</td>
                  <td className="p-3 hidden text-muted-foreground lg:table-cell">{m.country}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-xs text-green-400">Live</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Submit Film", Icon: Upload },
          { label: "View Analytics", Icon: BarChart3 },
          { label: "Licensing Requests", Icon: Award },
          { label: "Revenue Reports", Icon: DollarSign },
        ].map(({ label, Icon }) => (
          <button key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/50">
            <Icon className="size-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
