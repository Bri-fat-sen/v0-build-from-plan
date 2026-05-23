"use client"

import { useState } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockTracks, mockArtists, formatNumber } from "@/lib/mock-data"
import { Play, TrendingUp, TrendingDown, Minus, ChevronRight, Crown, Flame, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

const regions = [
  { id: "global", label: "Global", flag: "🌍" },
  { id: "nigeria", label: "Nigeria", flag: "🇳🇬" },
  { id: "south-africa", label: "South Africa", flag: "🇿🇦" },
  { id: "kenya", label: "Kenya", flag: "🇰🇪" },
  { id: "ghana", label: "Ghana", flag: "🇬🇭" },
]

export default function ChartsPage() {
  const [activeRegion, setActiveRegion] = useState("global")
  const [activeTab, setActiveTab] = useState<"songs" | "artists">("songs")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const topTrack = mockTracks[0]
  const runnerUps = mockTracks.slice(1, 3)
  const restOfChart = mockTracks.slice(3, 15)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - #1 Song Feature */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[70vh]">
          <Image
            src={topTrack.coverArt}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        </div>

        {/* Content */}
        <div className="relative px-6 pt-12 pb-8 lg:px-16 lg:pt-20">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5">
              <Flame className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Live Charts</span>
            </div>
            <span className="text-sm text-white/60">Updated hourly</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-[clamp(4rem,15vw,12rem)] font-black leading-[0.8] tracking-tighter">
            <span className="text-white">THE</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
              AFRI
            </span>
            <span className="text-white">CHARTS</span>
          </h1>

          {/* Region Pills */}
          <div className="mt-10 flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  activeRegion === region.id
                    ? "bg-white text-background"
                    : "bg-white/10 text-white/80 backdrop-blur-sm hover:bg-white/20"
                )}
              >
                <span className="text-base">{region.flag}</span>
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* #1 Track Card */}
        <div className="relative px-6 pb-16 lg:px-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-12">
            {/* Cover Art */}
            <Link href={`/music/track/${topTrack.id}`} className="group relative shrink-0">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden shadow-2xl shadow-black/50 lg:max-w-[320px]">
                <Image
            src={topTrack.coverArt}
                  alt={topTrack.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary">
                    <Play className="size-8 fill-current" />
                  </div>
                </div>
              </div>
              {/* #1 Badge */}
              <div className="absolute -left-4 -top-4 flex items-center gap-2 bg-primary px-4 py-2 shadow-lg">
                <Crown className="size-5" />
                <span className="font-display text-2xl font-black">#1</span>
              </div>
            </Link>

            {/* Track Info */}
            <div className="flex-1">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                <TrendingUp className="size-4" />
                Holding #1 for 4 weeks
              </p>
              <h2 className="font-display text-4xl font-black text-white lg:text-6xl">
                {topTrack.title}
              </h2>
              <p className="mt-2 text-xl text-white/70">{topTrack.artist}</p>
              
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/50">
                <div>
                  <span className="font-mono text-2xl font-bold text-white">{formatNumber(topTrack.plays)}</span>
                  <span className="ml-2">streams this week</span>
                </div>
                <div className="hidden lg:block">
                  <span className="font-mono text-2xl font-bold text-white">12</span>
                  <span className="ml-2">weeks on chart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="flex items-center gap-8 px-6 lg:px-16">
          {(["songs", "artists"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative py-4 text-sm font-bold uppercase tracking-widest transition-colors",
                activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* #2 and #3 */}
      <section className="border-b border-white/10 px-6 py-12 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {runnerUps.map((track, i) => {
            const rank = i + 2
            const change = i === 0 ? 3 : -1
            return (
              <Link
                key={track.id}
                href={`/music/track/${track.id}`}
                className="group flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06]"
              >
                {/* Rank */}
                <div className="flex size-14 shrink-0 items-center justify-center">
                  <span className="font-display text-4xl font-black text-muted-foreground">
                    {rank}
                  </span>
                </div>

                {/* Cover */}
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-foreground">{track.title}</h3>
                  <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs">
                    {change > 0 ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <TrendingUp className="size-3" /> +{change}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <TrendingDown className="size-3" /> {change}
                      </span>
                    )}
                    <span className="text-muted-foreground">{formatNumber(track.plays)} streams</span>
                  </div>
                </div>

                <ChevronRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Full Chart */}
      <section className="px-6 py-8 lg:px-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">#4 - #15</h2>
          <button className="text-sm font-medium text-primary hover:underline">
            View Full 100
          </button>
        </div>

        <div className="space-y-1">
          {restOfChart.map((track, index) => {
            const position = index + 4
            const change = Math.floor(Math.random() * 10) - 4
            const isHovered = hoveredIndex === position

            return (
              <div
                key={track.id}
                onMouseEnter={() => setHoveredIndex(position)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded-xl px-4 py-3 transition-all lg:grid-cols-[3rem_3rem_4rem_1fr_8rem_6rem_auto]",
                  isHovered ? "bg-white/5" : ""
                )}
              >
                {/* Position */}
                <span className={cn(
                  "font-mono text-xl font-bold text-center",
                  position <= 10 ? "text-foreground" : "text-muted-foreground"
                )}>
                  {position}
                </span>

                {/* Change - Desktop */}
                <div className="hidden items-center justify-center lg:flex">
                  {change > 0 ? (
                    <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-400">
                      <TrendingUp className="size-3" />{change}
                    </span>
                  ) : change < 0 ? (
                    <span className="flex items-center gap-0.5 text-xs font-bold text-red-400">
                      <TrendingDown className="size-3" />{Math.abs(change)}
                    </span>
                  ) : (
                    <Minus className="size-3 text-muted-foreground" />
                  )}
                </div>

                {/* Cover - Desktop */}
                <div className="relative hidden size-12 overflow-hidden rounded lg:block">
                  <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity",
                    isHovered && "opacity-100"
                  )}>
                    <Play className="size-5 fill-white text-white" />
                  </div>
                </div>

                {/* Track Info */}
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{track.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
                </div>

                {/* Streams - Desktop */}
                <div className="hidden text-right lg:block">
                  <span className="font-mono text-sm text-muted-foreground">
                    {formatNumber(track.plays)}
                  </span>
                </div>

                {/* Weeks - Desktop */}
                <div className="hidden text-center text-sm text-muted-foreground lg:block">
                  {Math.floor(Math.random() * 15) + 1}w
                </div>

                {/* Actions */}
                <div className={cn(
                  "flex items-center gap-1 transition-opacity",
                  isHovered ? "opacity-100" : "opacity-0"
                )}>
                  <button className="rounded-full p-2 hover:bg-white/10">
                    <Play className="size-4 fill-current" />
                  </button>
                  <button className="hidden rounded-full p-2 hover:bg-white/10 lg:block">
                    <Share2 className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* This Week's Highlights */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-12 lg:px-16">
        <h2 className="mb-8 font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          This Week&apos;s Highlights
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Biggest Mover", track: "Water", artist: "Tyla", stat: "+47 positions", color: "text-emerald-400" },
            { label: "Longest #1", track: "Unavailable", artist: "Davido", stat: "8 weeks", color: "text-yellow-400" },
            { label: "Highest Debut", track: "Ozeba", artist: "Asake", stat: "Entered at #4", color: "text-primary" },
            { label: "Most Streamed", track: "Love Me JeJe", artist: "Wizkid", stat: "2.4M today", color: "text-red-400" },
          ].map((item) => (
            <div key={item.label} className="group cursor-pointer">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {item.track}
              </h3>
              <p className="text-sm text-muted-foreground">{item.artist}</p>
              <p className={cn("mt-1 text-sm font-bold", item.color)}>{item.stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* More Charts */}
      <section className="px-6 py-12 lg:px-16">
        <h2 className="mb-6 font-display text-xl font-bold">More Charts</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Albums Chart", "Artists Chart", "Viral 50", "Afrobeats Hot 100", "Amapiano Top 50", "Diaspora Chart"].map((chart) => (
            <Link
              key={chart}
              href="#"
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <span className="font-medium">{chart}</span>
              <ChevronRight className="size-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
