"use client"
import { StatCard } from "@/components/studio/stat-card"
import { DollarSign, TrendingUp, Users, Clock, Download, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { cn } from "@/lib/utils"

const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  subscriptions: Math.floor(Math.random() * 2000000 + 2500000),
  ads: Math.floor(Math.random() * 400000 + 200000),
  licensing: Math.floor(Math.random() * 300000 + 100000),
}))

const payoutQueue = [
  { id: "P001", name: "Burna Boy", role: "Artist", amount: "$48,200", period: "May 2026", status: "Ready" },
  { id: "P002", name: "Nile Entertainment", role: "Label", amount: "$124,800", period: "May 2026", status: "Ready" },
  { id: "P003", name: "Amara TV", role: "Creator", amount: "$9,400", period: "May 2026", status: "Processing" },
  { id: "P004", name: "NollyStudios Ltd", role: "Film Studio", amount: "$22,600", period: "May 2026", status: "Ready" },
  { id: "P005", name: "Sauti Sol", role: "Artist", amount: "$31,100", period: "May 2026", status: "On Hold" },
  { id: "P006", name: "Afrobeats Global", role: "Label", amount: "$67,400", period: "May 2026", status: "Processing" },
]

const formatK = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : n >= 1000 ? `$${(n/1000).toFixed(0)}K` : `$${n}`

export default function AdminFinancePage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Finance & Royalties</h1>
          <p className="text-sm text-muted-foreground">Platform revenue, payout management, and royalty distribution</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/70 transition-colors">
          <Download className="size-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Monthly Revenue" value="$4.2M" icon={DollarSign} trend="+11.4%" />
        <StatCard label="Payout Balance" value="$1.8M" icon={TrendingUp} />
        <StatCard label="Active Payees" value="12,840" icon={Users} trend="+320" />
        <StatCard label="Pending Payouts" value="$380K" icon={Clock} />
      </div>

      {/* Revenue chart */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-display text-base font-semibold text-foreground">Monthly Revenue Breakdown</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatK} />
              <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} formatter={(v: number) => formatK(v)} />
              <Bar dataKey="subscriptions" name="Subscriptions" fill="hsl(24 95% 55%)" stackId="rev" radius={[0,0,0,0]} />
              <Bar dataKey="ads" name="Advertising" fill="hsl(14 75% 42%)" stackId="rev" />
              <Bar dataKey="licensing" name="Licensing" fill="hsl(220 85% 60%)" stackId="rev" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          {[["Subscriptions","hsl(24 95% 55%)"],["Advertising","hsl(14 75% 42%)"],["Licensing","hsl(220 85% 60%)"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Payout queue */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-foreground">Payout Queue</h3>
          <button className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors press-scale">
            Process All Ready
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Payee</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Role</th>
                <th className="p-3 text-xs text-muted-foreground">Amount</th>
                <th className="p-3 text-xs text-muted-foreground hidden md:table-cell">Period</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
                <th className="p-3 text-xs text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {payoutQueue.map(p => (
                <tr key={p.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{p.name}</td>
                  <td className="p-3 hidden text-muted-foreground sm:table-cell">{p.role}</td>
                  <td className="p-3 font-mono font-semibold tabular-nums text-foreground">{p.amount}</td>
                  <td className="p-3 hidden text-muted-foreground md:table-cell">{p.period}</td>
                  <td className="p-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs",
                      p.status === "Ready" ? "bg-green-500/15 text-green-400" :
                      p.status === "Processing" ? "bg-blue-500/15 text-blue-400" :
                      "bg-yellow-500/15 text-yellow-400"
                    )}>{p.status}</span>
                  </td>
                  <td className="p-3">
                    {p.status === "Ready" && (
                      <button className="rounded-lg bg-primary/15 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/25 transition-colors">Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
