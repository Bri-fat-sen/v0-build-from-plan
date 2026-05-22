"use client"
import { mockEvents, formatNumber } from "@/lib/mock-data"
import { StatCard, StudioSection } from "@/components/studio/stat-card"
import { Calendar, Users, DollarSign, Ticket, Plus, Globe, Radio, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { cn } from "@/lib/utils"

const ticketData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  tickets: Math.floor(Math.random() * 500 + 100),
  revenue: Math.floor(Math.random() * 15000 + 3000),
}))

export default function EventsStudioPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Event Studio</h1>
          <p className="text-sm text-muted-foreground">Create, manage, and monetise live and virtual events</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 press-scale">
          <Plus className="size-4" /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Events" value="6" icon={Calendar} trend="+2" />
        <StatCard label="Total Tickets Sold" value="12,400" icon={Ticket} trend="+22.3%" />
        <StatCard label="Total Revenue" value="$186K" icon={DollarSign} trend="+18.7%" />
        <StatCard label="Registered Attendees" value="52K" icon={Users} trend="+9.1%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Daily Ticket Sales</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketData}>
                <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="tickets" fill="hsl(24 95% 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-3 font-display text-base font-semibold text-foreground">Daily Revenue</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketData}>
                <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${formatNumber(v)}`} />
                <Tooltip contentStyle={{ background: "hsl(24 12% 13%)", border: "1px solid hsl(24 10% 20%)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(14 75% 42%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Events list */}
      <StudioSection title="Your Events"
        action={<button className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"><Plus className="size-3" /> New Event</button>}>
        <div className="space-y-3">
          {mockEvents.map(evt => (
            <div key={evt.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
              <div className={cn(
                "flex size-10 flex-shrink-0 items-center justify-center rounded-lg",
                evt.type === "virtual" ? "bg-blue-500/15" : evt.type === "hybrid" ? "bg-purple-500/15" : "bg-primary/15"
              )}>
                {evt.type === "virtual" ? <Radio className="size-4 text-blue-400" /> : <Calendar className="size-4 text-primary" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground">{evt.date} &middot; {evt.location}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="font-mono text-sm tabular-nums text-foreground">{evt.attendees ?? "—"}</p>
                <p className="text-xs text-muted-foreground">attendees</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm tabular-nums text-primary">{evt.price}</p>
                <span className={cn("rounded-full px-2 py-0.5 text-xs", evt.status === "live" ? "bg-red-500/15 text-red-400" : evt.status === "upcoming" ? "bg-green-500/15 text-green-400" : "bg-muted text-muted-foreground")}>
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </StudioSection>
    </div>
  )
}
