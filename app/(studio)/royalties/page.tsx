"use client"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { DollarSign, TrendingUp, Clock, Download, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { formatNumber } from "@/lib/mock-data"

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  streams: Math.floor(Math.random() * 8000000 + 1000000),
  royalties: Math.floor(Math.random() * 12000 + 2000),
}))

const royaltyRows = [
  { period: "May 2026", streams: "4,820,000", royalties: "$14,460", status: "Pending" },
  { period: "Apr 2026", streams: "4,210,000", royalties: "$12,630", status: "Paid" },
  { period: "Mar 2026", streams: "3,890,000", royalties: "$11,670", status: "Paid" },
  { period: "Feb 2026", streams: "3,540,000", royalties: "$10,620", status: "Paid" },
  { period: "Jan 2026", streams: "3,100,000", royalties: "$9,300", status: "Paid" },
  { period: "Dec 2025", streams: "4,650,000", royalties: "$13,950", status: "Paid" },
]

export default function RoyaltiesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Royalty Statements</h1>
        <p className="text-sm text-muted-foreground">Track stream-based earnings and payout history</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Earned" value="$72,630" icon={DollarSign} trend="+14.2%" />
        <StatCard label="This Month" value="$14,460" icon={TrendingUp} trend="+8.7%" />
        <StatCard label="Pending Payout" value="$14,460" icon={Clock} />
        <StatCard label="Total Streams" value="24.2M" icon={AlertCircle} trend="+11.3%" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-display text-base font-semibold text-foreground">Monthly Royalties</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
              <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="royalties" fill="hsl(24 95% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <StudioSection title="Payout History"
        action={<button className="flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-foreground"><Download className="size-3 mr-1" /> Export CSV</button>}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Period</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Streams</th>
                <th className="p-3 text-xs text-muted-foreground">Royalties</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {royaltyRows.map(row => (
                <tr key={row.period} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{row.period}</td>
                  <td className="p-3 hidden font-mono tabular-nums text-muted-foreground sm:table-cell">{row.streams}</td>
                  <td className="p-3 font-mono tabular-nums text-foreground">{row.royalties}</td>
                  <td className="p-3">
                    <span className={row.status === "Paid" ? "rounded-full bg-green-500/15 px-2 py-0.5 text-xs text-green-400" : "rounded-full bg-yellow-500/15 px-2 py-0.5 text-xs text-yellow-400"}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StudioSection>
    </div>
  )
}
