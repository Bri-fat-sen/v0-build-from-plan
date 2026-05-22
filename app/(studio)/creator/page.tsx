"use client"
import { studioMetrics, formatNumber } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Users, Eye, Clock, DollarSign, Video, Upload, Heart, TrendingUp } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const viewsData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  views: Math.floor(Math.random() * 800000 + 200000),
}))

export default function CreatorStudioPage() {
  const m = studioMetrics.creator
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Creator Studio</h1>
        <p className="text-sm text-muted-foreground">Manage your channel, content, analytics, and monetisation</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Total Views" value={formatNumber(m.totalViews)} icon={Eye} trend="+14.2%" />
        <StatCard label="Subscribers" value={formatNumber(m.subscribers)} icon={Users} trend="+9.8%" />
        <StatCard label="Watch Time (hrs)" value={formatNumber(m.watchTime)} icon={Clock} trend="+6.3%" />
        <StatCard label="Revenue" value={`$${formatNumber(m.revenue)}`} icon={DollarSign} trend="+11.5%" />
        <StatCard label="Videos" value={m.videos.toString()} icon={Video} />
      </div>

      {/* Views Chart */}
      <div className="rounded-xl bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Views Over Time</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={viewsData}>
              <defs><linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
              </linearGradient></defs>
              <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => formatNumber(v)} />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="hsl(25, 95%, 53%)" fill="url(#viewGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Content Management */}
      <StudioSection title="Your Content" action={<button className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"><Upload className="size-3" /> Upload</button>}>
        <div className="rounded-xl bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-3">Title</th><th className="p-3 hidden sm:table-cell">Type</th><th className="p-3 hidden md:table-cell">Views</th><th className="p-3">Status</th>
            </tr></thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="p-3 font-medium text-foreground">Content piece #{i + 1}</td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground">{["Video","Short","Podcast","Video","Short","Video"][i]}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{formatNumber(Math.floor(Math.random() * 500000 + 10000))}</td>
                  <td className="p-3"><span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Published</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>

      {/* Monetisation */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Ad Revenue", value: "$12,400", icon: DollarSign },
          { label: "Fan Club", value: "1,250 members", icon: Heart },
          { label: "Tips Received", value: "$3,200", icon: DollarSign },
          { label: "Paid Content", value: "$8,600", icon: TrendingUp },
        ].map(m => (
          <div key={m.label} className="rounded-xl bg-card p-4">
            <m.icon className="mb-2 size-5 text-primary" />
            <p className="text-lg font-bold text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
