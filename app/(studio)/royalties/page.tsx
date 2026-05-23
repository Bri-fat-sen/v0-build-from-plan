"use client"
import { useState } from "react"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { DollarSign, TrendingUp, Clock, Users, Globe, Zap, Download, Info, ArrowRight, CheckCircle, Smartphone } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts"
import { formatNumber } from "@/lib/mock-data"
import Link from "next/link"

// User-centric royalty data - shows WHERE your money actually comes from
const userCentricBreakdown = [
  { source: "Premium Subscribers", streams: 2850000, earnings: 8550, rate: 0.003, color: "hsl(24 95% 55%)" },
  { source: "Platinum Subscribers", streams: 890000, earnings: 4450, rate: 0.005, color: "hsl(45 93% 47%)" },
  { source: "Basic Subscribers", streams: 680000, earnings: 1360, rate: 0.002, color: "hsl(24 80% 45%)" },
  { source: "Free Tier (Ads)", streams: 400000, earnings: 100, rate: 0.00025, color: "hsl(24 50% 35%)" },
]

const countryBreakdown = [
  { country: "Nigeria", flag: "NG", streams: 1420000, earnings: 4260, percentage: 29.5 },
  { country: "South Africa", flag: "ZA", streams: 980000, earnings: 2940, percentage: 20.4 },
  { country: "United Kingdom", flag: "GB", streams: 720000, earnings: 2880, percentage: 20.0 },
  { country: "United States", flag: "US", streams: 650000, earnings: 2600, percentage: 18.0 },
  { country: "Ghana", flag: "GH", streams: 450000, earnings: 1125, percentage: 7.8 },
  { country: "Kenya", flag: "KE", streams: 280000, earnings: 560, percentage: 3.9 },
  { country: "Other", flag: "GLOBE", streams: 320000, earnings: 95, percentage: 0.4 },
]

const contentBreakdown = [
  { type: "Music Streams", earnings: 12460, percentage: 86.2, icon: "music" },
  { type: "Video Views", earnings: 1200, percentage: 8.3, icon: "video" },
  { type: "Podcast Plays", earnings: 540, percentage: 3.7, icon: "mic" },
  { type: "Live Tips", earnings: 260, percentage: 1.8, icon: "gift" },
]

const monthlyTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  userCentric: Math.floor(Math.random() * 5000 + 8000 + i * 500),
  proRata: Math.floor(Math.random() * 3000 + 5000 + i * 300),
}))

const realtimeData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  streams: Math.floor(Math.random() * 5000 + 2000),
  earnings: Math.floor(Math.random() * 15 + 5),
}))

const payoutHistory = [
  { period: "May 2026", streams: "4,820,000", gross: "$14,460", platformFee: "$4,338", net: "$10,122", status: "Pending", method: "M-Pesa" },
  { period: "Apr 2026", streams: "4,210,000", gross: "$12,630", platformFee: "$3,789", net: "$8,841", status: "Paid", method: "Bank Transfer" },
  { period: "Mar 2026", streams: "3,890,000", gross: "$11,670", platformFee: "$3,501", net: "$8,169", status: "Paid", method: "M-Pesa" },
  { period: "Feb 2026", streams: "3,540,000", gross: "$10,620", platformFee: "$3,186", net: "$7,434", status: "Paid", method: "Bank Transfer" },
  { period: "Jan 2026", streams: "3,100,000", gross: "$9,300", platformFee: "$2,790", net: "$6,510", status: "Paid", method: "M-Pesa" },
]

export default function RoyaltiesPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "breakdown" | "compare">("overview")
  const totalEarnings = 14460
  const platformFee = totalEarnings * 0.30
  const netEarnings = totalEarnings * 0.70

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">User-Centric Royalties</h1>
          <p className="text-sm text-muted-foreground">Your fans support YOU directly. See exactly where your money comes from.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
          <Zap className="size-4 text-primary" />
          <span className="text-xs font-medium text-primary">User-Centric Model Active</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="This Month (Gross)" value={`$${formatNumber(totalEarnings)}`} icon={DollarSign} trend="+14.2%" />
        <StatCard label="Your Net (70%)" value={`$${formatNumber(netEarnings)}`} icon={TrendingUp} trend="+14.2%" />
        <StatCard label="Unique Listeners" value="142K" icon={Users} trend="+8.3%" />
        <StatCard label="Countries Reached" value="47" icon={Globe} trend="+3" />
      </div>

      {/* Transparent Fee Breakdown Banner */}
      <div className="rounded-2xl border border-border bg-gradient-to-r from-card to-card/50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/15">
              <Info className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AfriStream 70/30 Split</p>
              <p className="text-xs text-muted-foreground">You keep 70% of all earnings. Platform takes 30% for operations.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="font-mono text-lg font-bold tabular-nums text-foreground">${formatNumber(totalEarnings)}</p>
              <p className="text-xs text-muted-foreground">Gross</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
            <div>
              <p className="font-mono text-lg font-bold tabular-nums text-red-400">-${formatNumber(platformFee)}</p>
              <p className="text-xs text-muted-foreground">Platform (30%)</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
            <div>
              <p className="font-mono text-lg font-bold tabular-nums text-green-400">${formatNumber(netEarnings)}</p>
              <p className="text-xs text-muted-foreground">Your Net (70%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
        {[
          { id: "overview", label: "Overview" },
          { id: "breakdown", label: "Fan Breakdown" },
          { id: "compare", label: "vs Pro-Rata" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          {/* User-Centric Breakdown */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Earnings by Subscriber Tier</h3>
              <div className="space-y-3">
                {userCentricBreakdown.map(item => (
                  <div key={item.source} className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.source}</span>
                        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">${formatNumber(item.earnings)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatNumber(item.streams)} streams</span>
                        <span>${item.rate.toFixed(4)}/stream</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-primary/10 p-3">
                <p className="text-xs text-primary">
                  <strong>User-Centric means:</strong> A Platinum subscriber&apos;s $14.99 goes ONLY to artists they stream. Your superfans directly fund your music.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Top Countries</h3>
              <div className="space-y-2">
                {countryBreakdown.slice(0, 6).map(item => (
                  <div key={item.country} className="flex items-center gap-3">
                    <span className="text-lg">{item.flag === "GLOBE" ? "🌍" : ""}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.country}</span>
                        <span className="font-mono text-sm tabular-nums text-foreground">${formatNumber(item.earnings)}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Earnings Chart */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-3 font-display text-base font-semibold text-foreground">Monthly Earnings Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(24 95% 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(24 95% 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
                  <Tooltip 
                    contentStyle={{ background: "hsl(24 12% 10%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} 
                    formatter={(value: number) => [`$${formatNumber(value)}`, "Earnings"]}
                  />
                  <Area type="monotone" dataKey="userCentric" stroke="hsl(24 95% 55%)" strokeWidth={2} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {activeTab === "breakdown" && (
        <>
          {/* Content Type Breakdown */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Earnings by Content Type</h3>
              <div className="space-y-3">
                {contentBreakdown.map(item => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      {item.icon === "music" && "♪"}
                      {item.icon === "video" && "▶"}
                      {item.icon === "mic" && "🎙"}
                      {item.icon === "gift" && "🎁"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">${formatNumber(item.earnings)}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-base font-semibold text-foreground">Real-Time Earnings (24h)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeData}>
                    <XAxis dataKey="hour" tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                    <YAxis tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                    <Tooltip contentStyle={{ background: "hsl(24 12% 10%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                    <Line type="monotone" dataKey="earnings" stroke="hsl(24 95% 55%)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Listener Segments */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Your Listener Segments</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 p-4">
                <p className="text-2xl font-bold text-yellow-400">2,340</p>
                <p className="text-sm font-medium text-foreground">Superfans</p>
                <p className="text-xs text-muted-foreground">Stream you 50+ times/month</p>
                <p className="mt-2 font-mono text-sm text-yellow-400">$4,680 earned</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-4">
                <p className="text-2xl font-bold text-primary">18,500</p>
                <p className="text-sm font-medium text-foreground">Regular Listeners</p>
                <p className="text-xs text-muted-foreground">Stream you 10-49 times/month</p>
                <p className="mt-2 font-mono text-sm text-primary">$7,400 earned</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-muted to-muted/50 p-4">
                <p className="text-2xl font-bold text-foreground">121,000</p>
                <p className="text-sm font-medium text-foreground">Casual Listeners</p>
                <p className="text-xs text-muted-foreground">Stream you 1-9 times/month</p>
                <p className="mt-2 font-mono text-sm text-foreground">$2,380 earned</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "compare" && (
        <>
          {/* User-Centric vs Pro-Rata Comparison */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-6 text-green-400" />
              <div>
                <p className="font-semibold text-green-400">You earned 47% MORE with User-Centric</p>
                <p className="text-sm text-muted-foreground">Compared to the industry-standard pro-rata model used by Spotify</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <h3 className="font-display text-base font-semibold text-foreground">User-Centric (AfriStream)</h3>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Your fans&apos; subscription goes directly to you</p>
              <p className="font-mono text-4xl font-bold tabular-nums text-primary">$14,460</p>
              <p className="text-sm text-muted-foreground">This month&apos;s earnings</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 opacity-75">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <h3 className="font-display text-base font-semibold text-foreground">Pro-Rata (Spotify Model)</h3>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Pooled subscription split by total platform streams</p>
              <p className="font-mono text-4xl font-bold tabular-nums text-muted-foreground">$9,830</p>
              <p className="text-sm text-muted-foreground">What you&apos;d earn elsewhere</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-3 font-display text-base font-semibold text-foreground">12-Month Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <XAxis dataKey="month" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
                  <Tooltip contentStyle={{ background: "hsl(24 12% 10%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Bar dataKey="userCentric" name="User-Centric" fill="hsl(24 95% 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="proRata" name="Pro-Rata" fill="hsl(24 20% 30%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary" />
                <span className="text-xs text-muted-foreground">User-Centric (AfriStream)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-muted" />
                <span className="text-xs text-muted-foreground">Pro-Rata (Industry Standard)</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Why User-Centric Pays More</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Direct Fan Support</p>
                    <p className="text-xs text-muted-foreground">Your fans&apos; money goes to YOU, not Drake</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Superfan Value</p>
                    <p className="text-xs text-muted-foreground">Platinum subscribers are worth 5x more per stream</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Niche Artist Friendly</p>
                    <p className="text-xs text-muted-foreground">Mid-tier artists earn proportionally more</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Regional Fairness</p>
                    <p className="text-xs text-muted-foreground">African artists aren&apos;t diluted by global pools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Payout History */}
      <StudioSection 
        title="Payout History" 
        action={
          <button className="flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80">
            <Download className="mr-1 size-3" /> Export CSV
          </button>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Period</th>
                <th className="hidden p-3 text-xs text-muted-foreground sm:table-cell">Streams</th>
                <th className="p-3 text-xs text-muted-foreground">Gross</th>
                <th className="hidden p-3 text-xs text-muted-foreground md:table-cell">Platform Fee</th>
                <th className="p-3 text-xs text-muted-foreground">Net</th>
                <th className="p-3 text-xs text-muted-foreground">Method</th>
                <th className="p-3 text-xs text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map(row => (
                <tr key={row.period} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{row.period}</td>
                  <td className="hidden p-3 font-mono text-muted-foreground tabular-nums sm:table-cell">{row.streams}</td>
                  <td className="p-3 font-mono text-foreground tabular-nums">{row.gross}</td>
                  <td className="hidden p-3 font-mono text-red-400 tabular-nums md:table-cell">-{row.platformFee}</td>
                  <td className="p-3 font-mono font-semibold text-green-400 tabular-nums">{row.net}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Smartphone className="size-3" />
                      {row.method}
                    </span>
                  </td>
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

      {/* Payout Methods */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-4 font-display text-base font-semibold text-foreground">Payout Methods</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/15">
              <Smartphone className="size-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">M-Pesa</p>
              <p className="text-xs text-muted-foreground">Instant payouts</p>
            </div>
            <CheckCircle className="ml-auto size-4 text-green-400" />
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Bank Transfer</p>
              <p className="text-xs text-muted-foreground">2-3 business days</p>
            </div>
            <CheckCircle className="ml-auto size-4 text-green-400" />
          </div>
          <Link href="/studio/settings" className="flex items-center gap-3 rounded-xl border border-dashed border-border p-3 transition-colors hover:bg-muted/30">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <span className="text-lg text-muted-foreground">+</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Add Method</p>
              <p className="text-xs text-muted-foreground">MTN MoMo, Airtel, etc.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
