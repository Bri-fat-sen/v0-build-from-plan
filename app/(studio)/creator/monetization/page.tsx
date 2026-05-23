"use client"

import { useState } from "react"
import { formatNumber } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Users, Eye, Clock, DollarSign, Video, Upload, Heart, TrendingUp, 
  Settings, Palette, Play, MessageCircle, Bell, Crown, Gift, 
  ShoppingBag, Ticket, ArrowLeft, Zap, Target, Calendar
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const revenueBreakdown = [
  { name: "Ad Revenue", value: 45, color: "#f97316", amount: 12400 },
  { name: "Tips & Gifts", value: 20, color: "#22c55e", amount: 5500 },
  { name: "Fan Club", value: 18, color: "#3b82f6", amount: 4900 },
  { name: "Paid Content", value: 12, color: "#8b5cf6", amount: 3300 },
  { name: "Merch", value: 5, color: "#ec4899", amount: 1400 },
]

const revenueHistory = Array.from({ length: 6 }, (_, i) => ({
  month: ["Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: Math.floor(3000 + i * 500 + Math.random() * 1000),
}))

const contentTypes = [
  { type: "Videos", count: 48, views: "2.4M", icon: Video },
  { type: "Shorts", count: 156, views: "5.1M", icon: Zap },
  { type: "Podcasts", count: 24, views: "890K", icon: MessageCircle },
  { type: "Live Replays", count: 12, views: "320K", icon: Play },
]

const monetizationFeatures = [
  { 
    title: "Fan Club", 
    description: "Exclusive content for paying subscribers",
    icon: Crown,
    status: "active",
    earnings: "$4,900/mo",
    members: "1,250"
  },
  { 
    title: "Tips & Gifts", 
    description: "Let fans send you gifts during streams",
    icon: Gift,
    status: "active",
    earnings: "$5,500/mo",
    members: "3.2K senders"
  },
  { 
    title: "Merch Store", 
    description: "Sell branded merchandise to fans",
    icon: ShoppingBag,
    status: "active",
    earnings: "$1,400/mo",
    members: "89 orders"
  },
  { 
    title: "Paid Content", 
    description: "Premium videos, courses, and exclusives",
    icon: DollarSign,
    status: "active",
    earnings: "$3,300/mo",
    members: "420 purchases"
  },
  { 
    title: "Ticket Sales", 
    description: "Sell tickets to live events and shows",
    icon: Ticket,
    status: "setup",
    earnings: "-",
    members: "-"
  },
  { 
    title: "Sponsorships", 
    description: "Connect with brands for partnerships",
    icon: Target,
    status: "available",
    earnings: "-",
    members: "5 offers"
  },
]

export default function CreatorMonetizationPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month")
  
  const totalRevenue = revenueBreakdown.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/creator">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Monetization</h1>
            <p className="text-sm text-muted-foreground">Manage your revenue streams and earnings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(["week", "month", "year"] as const).map((p) => (
            <Button
              key={p}
              variant={selectedPeriod === p ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(p)}
              className="capitalize"
            >
              This {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Total Earnings Card */}
        <div className="rounded-xl bg-gradient-to-br from-primary/20 via-card to-card p-6">
          <p className="text-sm text-muted-foreground">Total Earnings</p>
          <p className="mt-1 font-display text-4xl font-bold text-foreground">
            ${formatNumber(totalRevenue)}
          </p>
          <p className="mt-1 text-sm text-green-500">+18.3% from last month</p>
          <div className="mt-4 flex gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="font-mono text-sm font-semibold text-foreground">$2,400</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Available</p>
              <p className="font-mono text-sm font-semibold text-green-500">$25,100</p>
            </div>
          </div>
          <Button className="mt-4 w-full gap-2" size="sm">
            <DollarSign className="size-4" />
            Withdraw Funds
          </Button>
        </div>

        {/* Revenue Breakdown */}
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-2 font-semibold text-foreground">Revenue Breakdown</h3>
          <div className="flex items-center gap-4">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="value"
                    stroke="none"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {revenueBreakdown.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono text-foreground">${formatNumber(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-2 font-semibold text-foreground">Revenue Trend</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }}
                  formatter={(value: number) => `$${formatNumber(value)}`}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monetization Features */}
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Your Revenue Streams</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {monetizationFeatures.map((feature) => (
            <div 
              key={feature.title}
              className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  feature.status === "active" 
                    ? "bg-green-500/20 text-green-400" 
                    : feature.status === "setup"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                  {feature.status === "active" ? "Active" : feature.status === "setup" ? "Setup" : "Available"}
                </span>
              </div>
              {feature.status === "active" && (
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Earnings</p>
                    <p className="font-mono text-sm font-semibold text-green-500">{feature.earnings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{feature.title === "Fan Club" ? "Members" : "Activity"}</p>
                    <p className="font-mono text-sm text-foreground">{feature.members}</p>
                  </div>
                </div>
              )}
              {feature.status !== "active" && (
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  {feature.status === "setup" ? "Complete Setup" : "Learn More"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Performance */}
      <div>
        <h3 className="mb-4 font-semibold text-foreground">Content Earning Potential</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {contentTypes.map((content) => (
            <div key={content.type} className="rounded-xl bg-card p-4 text-center">
              <content.icon className="mx-auto size-8 text-primary" />
              <p className="mt-2 font-semibold text-foreground">{content.type}</p>
              <p className="font-mono text-2xl font-bold text-foreground">{content.count}</p>
              <p className="text-xs text-muted-foreground">{content.views} total views</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Settings className="size-5 text-primary" />
          <span className="text-sm">Payout Settings</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Palette className="size-5 text-primary" />
          <span className="text-sm">Fan Club Setup</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Bell className="size-5 text-primary" />
          <span className="text-sm">Revenue Alerts</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4">
          <Calendar className="size-5 text-primary" />
          <span className="text-sm">Schedule Payout</span>
        </Button>
      </div>
    </div>
  )
}
