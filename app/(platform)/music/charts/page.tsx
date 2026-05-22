"use client"
import { useState } from "react"
import { mockTracks } from "@/lib/mock-data"
import { TrackRow } from "@/components/content-card"
import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

const chartTabs = [
  "Global Top 100", "Africa Top 100", "Country Top 50", "Diaspora Top 50",
  "Genre Top 50", "Rising Artists", "Independent Top 50",
]

export default function ChartsPage() {
  const [activeTab, setActiveTab] = useState(chartTabs[0])

  return (
    <div className="space-y-6 py-4">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp className="size-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Charts</h1>
        </div>
        <p className="text-sm text-muted-foreground">The most-streamed music on AfriStream right now</p>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
        {chartTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}>
            {tab}
          </button>
        ))}
      </div>

      {/* Chart List */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-card p-3">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-medium uppercase text-muted-foreground">{activeTab}</span>
            <span className="text-xs text-muted-foreground">Updated daily</span>
          </div>
          {mockTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
          {/* Repeat tracks to fill out the chart */}
          {mockTracks.slice(0, 8).map((track, i) => (
            <TrackRow key={`r-${track.id}`} track={{ ...track, id: `r-${track.id}` }} index={i + mockTracks.length} />
          ))}
        </div>
      </div>
    </div>
  )
}
