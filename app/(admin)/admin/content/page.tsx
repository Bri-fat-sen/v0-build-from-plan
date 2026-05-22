"use client"
import { useState } from "react"
import { CheckCircle, XCircle, Eye, Search, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

const pendingContent = [
  { id: "c1", title: "Essence (Remix)", type: "Track", creator: "Wizkid ft. Justin Bieber", country: "Nigeria", submitted: "2h ago", flags: 0 },
  { id: "c2", title: "Mami Wata Official Trailer", type: "Video", creator: "Neon Films", country: "Nigeria", submitted: "4h ago", flags: 1 },
  { id: "c3", title: "Traditional Kora Performance", type: "Culture", creator: "Toumani Diabate Archive", country: "Mali", submitted: "6h ago", flags: 0 },
  { id: "c4", title: "Black Book Director's Cut", type: "Movie", creator: "Netflix Nigeria", country: "Nigeria", submitted: "8h ago", flags: 0 },
  { id: "c5", title: "Afrobeats Workout Mix", type: "Playlist", creator: "FitAfrica Channel", country: "Ghana", submitted: "10h ago", flags: 2 },
  { id: "c6", title: "Lagos Fashion Week Highlights", type: "Creator Video", creator: "Arise Fashion", country: "Nigeria", submitted: "12h ago", flags: 0 },
  { id: "c7", title: "Ubuntu Philosophy Series", type: "Podcast", creator: "African Wisdom", country: "South Africa", submitted: "1d ago", flags: 0 },
  { id: "c8", title: "Amapiano Masterclass", type: "Course", creator: "Uncle Waffles Studio", country: "South Africa", submitted: "1d ago", flags: 0 },
]

const typeColors: Record<string, string> = {
  Track: "bg-primary/15 text-primary",
  Video: "bg-blue-500/15 text-blue-400",
  Movie: "bg-purple-500/15 text-purple-400",
  Culture: "bg-green-500/15 text-green-400",
  Playlist: "bg-yellow-500/15 text-yellow-400",
  "Creator Video": "bg-orange-500/15 text-orange-400",
  Podcast: "bg-pink-500/15 text-pink-400",
  Course: "bg-teal-500/15 text-teal-400",
}

export default function AdminContentPage() {
  const [search, setSearch] = useState("")
  const [items, setItems] = useState(pendingContent)

  const approve = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const reject = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.creator.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Content Moderation</h1>
        <p className="text-sm text-muted-foreground">Review and approve submitted content before it goes live</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Pending Review", value: "342", color: "text-primary" },
          { label: "Approved Today", value: "128", color: "text-green-400" },
          { label: "Rejected Today", value: "17", color: "text-destructive" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className={cn("font-mono text-2xl font-bold tabular-nums", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search content..."
          className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>

      {/* Queue */}
      <div className="space-y-2">
        {filtered.map(item => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/50">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-foreground">{item.title}</p>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", typeColors[item.type] ?? "bg-muted text-muted-foreground")}>
                  {item.type}
                </span>
                {item.flags > 0 && (
                  <span className="flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs text-destructive">
                    <Flag className="size-3" /> {item.flags}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.creator} &middot; {item.country} &middot; {item.submitted}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button title="Preview" className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Eye className="size-4" />
              </button>
              <button onClick={() => approve(item.id)} title="Approve" className="rounded-lg p-2 text-muted-foreground hover:bg-green-500/15 hover:text-green-400 transition-colors">
                <CheckCircle className="size-4" />
              </button>
              <button onClick={() => reject(item.id)} title="Reject" className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/15 hover:text-destructive transition-colors">
                <XCircle className="size-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <CheckCircle className="mx-auto mb-2 size-8 text-green-400" />
            <p className="text-sm font-medium text-foreground">All caught up!</p>
            <p className="text-xs text-muted-foreground">No pending content in the queue.</p>
          </div>
        )}
      </div>
    </div>
  )
}
