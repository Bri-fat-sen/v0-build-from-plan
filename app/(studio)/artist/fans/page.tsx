"use client"

import { useState } from "react"
import { formatNumber } from "@/lib/mock-data"
import { StatCard } from "@/components/studio/stat-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Users, MapPin, Clock, Heart, TrendingUp, ArrowLeft, Calendar,
  Smartphone, Globe, Music, Headphones, Share2, MessageCircle
} from "lucide-react"
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from "recharts"

// Mock fan data
const fanGrowthData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  followers: Math.floor(800000 + i * 120000 + Math.random() * 50000),
  listeners: Math.floor(2000000 + i * 300000 + Math.random() * 100000),
}))

const topCountries = [
  { country: "Nigeria", flag: "NG", listeners: 4200000, percentage: 35 },
  { country: "Ghana", flag: "GH", listeners: 1800000, percentage: 15 },
  { country: "South Africa", flag: "ZA", listeners: 1200000, percentage: 10 },
  { country: "United Kingdom", flag: "GB", listeners: 960000, percentage: 8 },
  { country: "United States", flag: "US", listeners: 840000, percentage: 7 },
  { country: "Kenya", flag: "KE", listeners: 720000, percentage: 6 },
]

const ageData = [
  { range: "13-17", value: 8, color: "#f97316" },
  { range: "18-24", value: 35, color: "#ea580c" },
  { range: "25-34", value: 32, color: "#c2410c" },
  { range: "35-44", value: 15, color: "#9a3412" },
  { range: "45+", value: 10, color: "#7c2d12" },
]

const genderData = [
  { name: "Male", value: 58, color: "#3b82f6" },
  { name: "Female", value: 40, color: "#ec4899" },
  { name: "Other", value: 2, color: "#8b5cf6" },
]

const listeningTimeData = [
  { time: "Morning", listeners: 15 },
  { time: "Afternoon", listeners: 22 },
  { time: "Evening", listeners: 38 },
  { time: "Night", listeners: 25 },
]

const deviceData = [
  { device: "Mobile", percentage: 72, icon: Smartphone },
  { device: "Desktop", percentage: 18, icon: Globe },
  { device: "Smart Speaker", percentage: 7, icon: Music },
  { device: "Other", percentage: 3, icon: Headphones },
]

const topFans = [
  { id: 1, name: "Chidera M.", avatar: "https://picsum.photos/seed/fan1/100", streams: 4520, since: "2022" },
  { id: 2, name: "Kwame A.", avatar: "https://picsum.photos/seed/fan2/100", streams: 3890, since: "2021" },
  { id: 3, name: "Aisha B.", avatar: "https://picsum.photos/seed/fan3/100", streams: 3450, since: "2023" },
  { id: 4, name: "Thabo N.", avatar: "https://picsum.photos/seed/fan4/100", streams: 3120, since: "2022" },
  { id: 5, name: "Fatima O.", avatar: "https://picsum.photos/seed/fan5/100", streams: 2980, since: "2021" },
]

export default function FanInsightsPage() {
  const [period, setPeriod] = useState<"7d" | "28d" | "90d" | "all">("28d")

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/artist">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Fan Insights</h1>
            <p className="text-sm text-muted-foreground">Understand who&apos;s listening to your music</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(["7d", "28d", "90d", "all"] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              {p === "all" ? "All Time" : p === "7d" ? "7 Days" : p === "28d" ? "28 Days" : "90 Days"}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Followers" value="2.1M" icon={Users} trend="+12.4%" />
        <StatCard label="Monthly Listeners" value="12.8M" icon={Headphones} trend="+8.2%" />
        <StatCard label="Avg. Listen Time" value="4m 32s" icon={Clock} trend="+15%" />
        <StatCard label="Save Rate" value="24.6%" icon={Heart} trend="+3.1%" />
      </div>

      {/* Fan Growth Chart */}
      <div className="rounded-xl bg-card p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Fan Growth</h3>
            <p className="text-xs text-muted-foreground">Followers vs Monthly Listeners over time</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Listeners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-primary/50" />
              <span className="text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fanGrowthData}>
              <defs>
                <linearGradient id="listenersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => formatNumber(v)} />
              <Tooltip 
                contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }}
                formatter={(value: number) => formatNumber(value)}
              />
              <Area type="monotone" dataKey="listeners" stroke="hsl(25, 95%, 53%)" fill="url(#listenersGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="followers" stroke="hsl(25, 95%, 53%)" strokeOpacity={0.5} fill="none" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Age Distribution */}
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Age Distribution</h3>
          <div className="flex items-center gap-4">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {ageData.map((item) => (
                <div key={item.range} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.range}</span>
                  </div>
                  <span className="font-mono text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Gender</h3>
          <div className="flex items-center gap-4">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    stroke="none"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
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

        {/* Listening Time */}
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">Peak Listening Times</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={listeningTimeData}>
                <XAxis dataKey="time" tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }}
                  formatter={(value: number) => `${value}%`}
                />
                <Bar dataKey="listeners" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location & Devices Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Countries */}
        <div className="rounded-xl bg-card p-4 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <h3 className="font-semibold text-foreground">Top Countries</h3>
            </div>
            <Link href="/artist/fans/countries" className="text-xs text-primary hover:underline">
              See all
            </Link>
          </div>
          <div className="space-y-3">
            {topCountries.map((c, i) => (
              <div key={c.country} className="flex items-center gap-3">
                <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
                <span className="text-lg">🌍</span>
                <span className="flex-1 text-sm font-medium text-foreground">{c.country}</span>
                <span className="font-mono text-xs text-muted-foreground">{formatNumber(c.listeners)}</span>
                <div className="w-20">
                  <div className="h-1.5 rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right font-mono text-xs text-muted-foreground">{c.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="rounded-xl bg-card p-4 lg:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Smartphone className="size-4 text-primary" />
            <h3 className="font-semibold text-foreground">Listening Devices</h3>
          </div>
          <div className="space-y-4">
            {deviceData.map((d) => (
              <div key={d.device} className="flex items-center gap-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <d.icon className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{d.device}</span>
                    <span className="font-mono text-sm text-muted-foreground">{d.percentage}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary" 
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Fans */}
      <div className="rounded-xl bg-card p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-red-500" />
            <h3 className="font-semibold text-foreground">Your Top Fans</h3>
          </div>
          <p className="text-xs text-muted-foreground">Fans who stream your music the most</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {topFans.map((fan, i) => (
            <div key={fan.id} className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
              <div className="relative">
                <img src={fan.avatar} alt={fan.name} className="size-16 rounded-full object-cover" />
                <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground">{fan.name}</p>
                <p className="font-mono text-xs text-primary">{formatNumber(fan.streams)} streams</p>
                <p className="text-xs text-muted-foreground">Fan since {fan.since}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="size-7">
                  <MessageCircle className="size-3" />
                </Button>
                <Button variant="ghost" size="icon" className="size-7">
                  <Share2 className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fan Engagement Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <MessageCircle className="size-5 text-primary" />
          <span className="text-sm">Fan Messages</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Calendar className="size-5 text-primary" />
          <span className="text-sm">Schedule Post</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Share2 className="size-5 text-primary" />
          <span className="text-sm">Share Stats</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <TrendingUp className="size-5 text-primary" />
          <span className="text-sm">Growth Tips</span>
        </Button>
      </div>
    </div>
  )
}
