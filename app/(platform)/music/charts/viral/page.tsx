"use client"

import { useState } from "react"
import { mockTracks, formatNumber } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { Play, TrendingUp, Flame, Sparkles, Share2, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock viral data
const viralTracks = mockTracks.map((track, i) => ({
  ...track,
  rank: i + 1,
  viralScore: Math.floor(Math.random() * 100) + 50,
  shares: Math.floor(Math.random() * 500000) + 10000,
  tikTokUses: Math.floor(Math.random() * 1000000) + 50000,
  growthPercent: Math.floor(Math.random() * 500) + 100,
  daysOnChart: Math.floor(Math.random() * 14) + 1,
})).sort((a, b) => b.viralScore - a.viralScore)

export default function ViralChartPage() {
  const [timeRange, setTimeRange] = useState<"today" | "week">("today")
  
  const topViral = viralTracks[0]
  const restOfChart = viralTracks.slice(1, 50)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-500/20 animate-pulse" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${topViral.coverArt})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(120px)",
            opacity: 0.3,
          }}
        />
        
        <div className="relative px-4 pb-8 pt-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/music/charts" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ChevronRight className="size-4 rotate-180" /> All Charts
            </Link>
            <div className="flex items-center gap-3">
              <Flame className="size-10 text-orange-500 animate-pulse" />
              <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                VIRAL <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">50</span>
              </h1>
            </div>
            <p className="mt-2 text-muted-foreground">Tracks blowing up across Africa and the diaspora</p>
          </div>

          {/* Time Range Toggle */}
          <div className="mb-8 flex gap-2">
            <button
              onClick={() => setTimeRange("today")}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                timeRange === "today"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange("week")}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                timeRange === "week"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              This Week
            </button>
          </div>

          {/* #1 Viral Track */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-purple-500/20 p-1">
            <div className="relative rounded-2xl bg-background/80 p-6 backdrop-blur-xl md:p-8">
              {/* Viral Badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2">
                <Zap className="size-4 text-white" />
                <span className="text-sm font-bold text-white">VIRAL #1</span>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Cover Art */}
                <div className="relative">
                  <div className="relative size-48 overflow-hidden rounded-2xl ring-4 ring-orange-500/50 md:size-56">
                    <Image src={topViral.coverArt} alt={topViral.title} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-2xl font-black text-white shadow-lg">
                    1
                  </div>
                </div>

                {/* Track Info */}
                <div className="flex-1">
                  <h2 className="font-display text-3xl font-black text-foreground md:text-4xl">{topViral.title}</h2>
                  <p className="mt-1 text-lg text-muted-foreground">{topViral.artist}</p>
                  
                  {/* Viral Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-green-500">
                        <TrendingUp className="size-4" />
                        <span className="font-mono text-lg font-bold">+{topViral.growthPercent}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Growth</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-orange-500">
                        <Flame className="size-4" />
                        <span className="font-mono text-lg font-bold">{topViral.viralScore}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Viral Score</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <Share2 className="mx-auto mb-1 size-4 text-pink-500" />
                      <p className="font-mono text-lg font-bold text-foreground">{formatNumber(topViral.shares)}</p>
                      <p className="text-xs text-muted-foreground">Shares</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <Sparkles className="mx-auto mb-1 size-4 text-purple-500" />
                      <p className="font-mono text-lg font-bold text-foreground">{formatNumber(topViral.tikTokUses)}</p>
                      <p className="text-xs text-muted-foreground">TikTok Uses</p>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <button className="group flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105 md:size-20">
                  <Play className="size-8 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Viral Chart */}
      <div className="px-4 pb-32 pt-8 lg:px-8">
        <h3 className="mb-4 font-display text-xl font-bold text-foreground">Full Viral 50</h3>
        <div className="space-y-2">
          {restOfChart.map((track) => (
            <div
              key={track.id}
              className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
            >
              {/* Rank with viral indicator */}
              <div className="flex w-10 flex-col items-center">
                <span className="font-mono text-lg font-bold text-foreground">{track.rank}</span>
                {track.rank <= 5 && <Flame className="size-3 text-orange-500" />}
              </div>

              {/* Cover */}
              <div className="relative size-12 overflow-hidden rounded-lg">
                <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="truncate font-medium text-foreground">{track.title}</h4>
                <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
              </div>

              {/* Growth */}
              <div className="hidden items-center gap-1 text-green-500 sm:flex">
                <TrendingUp className="size-4" />
                <span className="font-mono text-sm font-medium">+{track.growthPercent}%</span>
              </div>

              {/* Viral Score */}
              <div className="hidden w-20 text-right md:block">
                <div className="flex items-center justify-end gap-1">
                  <Flame className="size-3 text-orange-500" />
                  <span className="font-mono text-sm text-foreground">{track.viralScore}</span>
                </div>
                <p className="text-xs text-muted-foreground">score</p>
              </div>

              {/* Play */}
              <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white">
                <Play className="size-4 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
