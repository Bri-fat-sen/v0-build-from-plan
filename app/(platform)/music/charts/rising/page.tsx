"use client"

import { useState } from "react"
import { mockTracks, mockArtists, formatNumber } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { Play, Rocket, TrendingUp, Sparkles, Star, ChevronRight, Zap, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock rising stars data
const risingArtists = mockArtists.slice(0, 15).map((artist, i) => ({
  ...artist,
  rank: i + 1,
  growthPercent: Math.floor(Math.random() * 2000) + 500,
  newFollowers: Math.floor(Math.random() * 100000) + 10000,
  debutTrack: mockTracks[i]?.title || "New Single",
  weeksRising: Math.floor(Math.random() * 8) + 1,
  predictedPeak: Math.floor(Math.random() * 20) + 1,
}))

const risingTracks = mockTracks.slice(0, 20).map((track, i) => ({
  ...track,
  rank: i + 1,
  growthPercent: Math.floor(Math.random() * 3000) + 200,
  addedToPlaylists: Math.floor(Math.random() * 50000) + 5000,
  weeksRising: Math.floor(Math.random() * 4) + 1,
}))

export default function RisingChartPage() {
  const [tab, setTab] = useState<"artists" | "tracks">("artists")
  
  const topRising = risingArtists[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-blue-500/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${topRising.avatar})`,
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
              <Rocket className="size-10 text-emerald-500" />
              <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
                RISING <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">STARS</span>
              </h1>
            </div>
            <p className="mt-2 text-muted-foreground">Breakout artists and tracks gaining momentum fast</p>
          </div>

          {/* Tab Switcher */}
          <div className="mb-8 flex gap-2">
            <button
              onClick={() => setTab("artists")}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                tab === "artists"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              <Star className="size-4" />
              Rising Artists
            </button>
            <button
              onClick={() => setTab("tracks")}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all",
                tab === "tracks"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              <Sparkles className="size-4" />
              Rising Tracks
            </button>
          </div>

          {/* Featured Rising Star */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-blue-500/20 p-1">
            <div className="relative rounded-2xl bg-background/80 p-6 backdrop-blur-xl md:p-8">
              {/* Badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2">
                <Rocket className="size-4 text-white" />
                <span className="text-sm font-bold text-white">FASTEST RISING</span>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {/* Artist Image */}
                <div className="relative">
                  <div className="relative size-48 overflow-hidden rounded-2xl ring-4 ring-emerald-500/50 md:size-56">
                    <Image src={topRising.avatar} alt={topRising.name} fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-2xl font-black text-white shadow-lg">
                    <Rocket className="size-6" />
                  </div>
                </div>

                {/* Artist Info */}
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium text-emerald-500">{topRising.country} • {topRising.genre}</p>
                  <h2 className="font-display text-3xl font-black text-foreground md:text-4xl">{topRising.name}</h2>
                  <p className="mt-2 text-muted-foreground">Debut: &quot;{topRising.debutTrack}&quot;</p>
                  
                  {/* Rising Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-emerald-500">
                        <TrendingUp className="size-4" />
                        <span className="font-mono text-lg font-bold">+{topRising.growthPercent}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Growth</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-cyan-500">
                        <ArrowUpRight className="size-4" />
                        <span className="font-mono text-lg font-bold">+{formatNumber(topRising.newFollowers)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">New Followers</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <Zap className="mx-auto mb-1 size-4 text-blue-500" />
                      <p className="font-mono text-lg font-bold text-foreground">{topRising.weeksRising}</p>
                      <p className="text-xs text-muted-foreground">Weeks Rising</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center">
                      <Star className="mx-auto mb-1 size-4 text-yellow-500" />
                      <p className="font-mono text-lg font-bold text-foreground">#{topRising.predictedPeak}</p>
                      <p className="text-xs text-muted-foreground">Predicted Peak</p>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <button className="group flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 md:size-20">
                  <Play className="size-8 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart List */}
      <div className="px-4 pb-32 pt-8 lg:px-8">
        <h3 className="mb-4 font-display text-xl font-bold text-foreground">
          {tab === "artists" ? "Rising Artists" : "Rising Tracks"}
        </h3>
        
        {tab === "artists" ? (
          <div className="space-y-2">
            {risingArtists.slice(1).map((artist) => (
              <Link
                key={artist.id}
                href={`/music/artist/${artist.id}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
              >
                {/* Rank */}
                <div className="flex w-10 items-center justify-center">
                  <span className="font-mono text-lg font-bold text-foreground">{artist.rank}</span>
                </div>

                {/* Image */}
                <div className="relative size-12 overflow-hidden rounded-full">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate font-medium text-foreground">{artist.name}</h4>
                  <p className="truncate text-sm text-muted-foreground">{artist.country}</p>
                </div>

                {/* Growth */}
                <div className="flex items-center gap-1 text-emerald-500">
                  <TrendingUp className="size-4" />
                  <span className="font-mono text-sm font-medium">+{artist.growthPercent}%</span>
                </div>

                {/* Play */}
                <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white">
                  <Play className="size-4 fill-current" />
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {risingTracks.map((track) => (
              <div
                key={track.id}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
              >
                {/* Rank */}
                <div className="flex w-10 items-center justify-center">
                  <span className="font-mono text-lg font-bold text-foreground">{track.rank}</span>
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
                <div className="flex items-center gap-1 text-emerald-500">
                  <TrendingUp className="size-4" />
                  <span className="font-mono text-sm font-medium">+{track.growthPercent}%</span>
                </div>

                {/* Play */}
                <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 hover:text-white">
                  <Play className="size-4 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
