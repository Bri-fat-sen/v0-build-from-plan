"use client"
import { mockCultureTopics, mockLanguages, formatNumber } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Globe, BookOpen, Users, Upload, Archive, Languages, Star } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const contributionData = Array.from({ length: 8 }, (_, i) => ({
  week: `W${i + 1}`,
  items: Math.floor(Math.random() * 40 + 10),
}))

export default function CultureStudioPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Culture Studio</h1>
          <p className="text-sm text-muted-foreground">Preserve, share, and monetise African cultural heritage content</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 press-scale">
          <Upload className="size-4" /> Add Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Published Items" value="1,240" icon={Archive} trend="+45" />
        <StatCard label="Languages Covered" value="22" icon={Languages} trend="+3" />
        <StatCard label="Contributors" value="384" icon={Users} trend="+28" />
        <StatCard label="Total Views" value="890K" icon={Globe} trend="+14.2%" />
      </div>

      {/* Contribution chart */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="mb-3 font-display text-base font-semibold text-foreground">Weekly Contributions</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contributionData}>
              <XAxis dataKey="week" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="items" fill="hsl(180 85% 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories */}
      <StudioSection title="Content Categories">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockCultureTopics.map(topic => (
            <div key={topic.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15">
                  <BookOpen className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.category}</p>
                </div>
              </div>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">{topic.items}</span>
            </div>
          ))}
        </div>
      </StudioSection>

      {/* Language Coverage */}
      <StudioSection title="Language Coverage">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 text-xs text-muted-foreground">Language</th>
                <th className="p-3 text-xs text-muted-foreground">Region</th>
                <th className="p-3 text-xs text-muted-foreground">Speakers</th>
                <th className="p-3 text-xs text-muted-foreground hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockLanguages.map(lang => (
                <tr key={lang.id} className="border-b border-border/50 transition-colors hover:bg-muted/50">
                  <td className="p-3 font-medium text-foreground">{lang.name}</td>
                  <td className="p-3 text-muted-foreground">{lang.region}</td>
                  <td className="p-3 font-mono tabular-nums text-muted-foreground">{lang.speakers}</td>
                  <td className="p-3 hidden sm:table-cell">
                    <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-xs text-green-400">Active</span>
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
