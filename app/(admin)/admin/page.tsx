"use client"
import Link from "next/link"
import { adminMetrics, formatNumber } from "@/lib/mock-data"
import {
  Users, Headphones, Eye, DollarSign, AlertTriangle, Ticket, FileVideo,
  ArrowUpRight, Shield, Activity, ChevronRight, Settings, ShieldAlert, ScrollText,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"
import { cn } from "@/lib/utils"

const growthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: Math.floor(Math.random() * 80000 + 150000),
}))

const contentBreakdown = [
  { name: "Tracks", value: 62, color: "hsl(25, 95%, 53%)" },
  { name: "Movies", value: 18, color: "hsl(262, 83%, 58%)" },
  { name: "Creator Videos", value: 12, color: "hsl(199, 89%, 48%)" },
  { name: "Culture", value: 8, color: "hsl(142, 71%, 45%)" },
]

export default function AdminDashboardPage() {
  const m = adminMetrics
  
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="relative overflow-hidden rounded-2xl glass-card bg-gradient-to-br from-slate-500/10 via-transparent to-primary/10">
        <div className="absolute -top-20 -right-20 size-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary font-medium mb-2">
                <Shield className="size-4" /> Admin Control Centre
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground lg:text-3xl mb-1">Platform Overview</h1>
              <p className="text-sm text-muted-foreground">Real-time metrics and system health</p>
            </div>
            <div className="flex items-center gap-2 glass-subtle rounded-full px-3 py-1.5">
              <Activity className="size-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="glass-card rounded-xl p-5 space-y-2 hover-lift">
          <div className="flex items-center justify-between">
            <Users className="size-6 text-blue-400" />
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="size-3" /> 4.2%
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-foreground">{m.totalUsers}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>
        <div className="glass-card rounded-xl p-5 space-y-2 hover-lift">
          <div className="flex items-center justify-between">
            <Headphones className="size-6 text-purple-400" />
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="size-3" /> 7.8%
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-foreground">{m.activeSubscribers}</p>
          <p className="text-sm text-muted-foreground">Active Subscribers</p>
        </div>
        <div className="glass-card rounded-xl p-5 space-y-2 hover-lift bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
          <div className="flex items-center justify-between">
            <DollarSign className="size-6 text-emerald-400" />
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="size-3" /> 11.4%
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-foreground">{m.monthlyRevenue}</p>
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
        </div>
        <div className="glass-card rounded-xl p-5 space-y-2 hover-lift">
          <div className="flex items-center justify-between">
            <Eye className="size-6 text-primary" />
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <ArrowUpRight className="size-3" /> 9.1%
            </span>
          </div>
          <p className="font-mono text-3xl font-bold text-foreground">{m.totalStreams}</p>
          <p className="text-sm text-muted-foreground">Total Streams</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-semibold text-foreground">Platform Growth</h3>
            <button className="text-xs text-primary hover:underline">Full Report</button>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => formatNumber(v)} />
                <Tooltip contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 12 }} />
                <Area type="monotone" dataKey="users" stroke="hsl(25, 95%, 53%)" fill="url(#userGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-display text-base font-semibold text-foreground mb-4">Content Mix</h3>
          <div className="h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={contentBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {contentBreakdown.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {contentBreakdown.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-base font-semibold text-foreground">Action Required</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: AlertTriangle, label: "Fraud Flags", count: m.fraudFlags, desc: "Pending review", color: "text-destructive", bg: "from-destructive/20 to-destructive/5", href: "/admin/moderation" },
            { icon: Ticket, label: "Support Tickets", count: m.supportTickets, desc: "Open tickets", color: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5", href: "/admin/support" },
            { icon: FileVideo, label: "Moderation Queue", count: m.pendingItems, desc: "Pending items", color: "text-primary", bg: "from-primary/20 to-primary/5", href: "/admin/moderation" },
          ].map(item => (
            <Link key={item.label} href={item.href} className={cn("glass-card rounded-xl p-4 transition-all hover-lift hover:bg-white/5 bg-gradient-to-br", item.bg)}>
              <div className="flex items-center justify-between mb-3">
                <item.icon className={cn("size-6", item.color)} />
                <span className={cn("font-mono text-2xl font-bold", item.color)}>{item.count}</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "User Management", icon: Users, href: "/admin/users", color: "from-blue-500/20 to-cyan-500/10" },
          { label: "Moderation", icon: ShieldAlert, href: "/admin/moderation", color: "from-rose-500/20 to-pink-500/10" },
          { label: "Audit Logs", icon: ScrollText, href: "/admin/audit", color: "from-purple-500/20 to-violet-500/10" },
          { label: "Settings", icon: Settings, href: "/admin/settings", color: "from-emerald-500/20 to-teal-500/10" },
        ].map(link => (
          <Link key={link.label} href={link.href} className={cn("glass-card rounded-xl p-4 transition-all hover-lift hover:bg-white/5 bg-gradient-to-br", link.color)}>
            <link.icon className="size-6 text-foreground mb-3" />
            <p className="text-sm font-semibold text-foreground">{link.label}</p>
            <ChevronRight className="size-4 text-muted-foreground mt-1" />
          </Link>
        ))}
      </div>
    </div>
  )
}
