"use client"

import { useState } from "react"
import { mockArtists, formatNumber } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { Play, TrendingUp, TrendingDown, Minus, Crown, Users, Music, Disc, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const regions = [
  { id: "global", name: "Global", flag: "🌍" },
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬" },
  { id: "south-africa", name: "South Africa", flag: "🇿🇦" },
  { id: "kenya", name: "Kenya", flag: "🇰🇪" },
  { id: "ghana", name: "Ghana", flag: "🇬🇭" },
  { id: "tanzania", name: "Tanzania", flag: "🇹🇿" },
  { id: "diaspora-uk", name: "UK Diaspora", flag: "🇬🇧" },
  { id: "diaspora-us", name: "US Diaspora", flag: "🇺🇸" },
]

// Mock chart data with rankings
const chartArtists = mockArtists.map((artist, i) => ({
  ...artist,
  rank: i + 1,
  previousRank: i + 1 + Math.floor(Math.random() * 5) - 2,
  monthlyListeners: Math.floor(Math.random() * 50000000) + 1000000,
  totalStreams: Math.floor(Math.random() * 500000000) + 10000000,
  topTrack: "Love Nwantiti",
  weeksOnChart: Math.floor(Math.random() * 52) + 1,
}))

export default function ArtistsChartPage() {
  const [region, setRegion] = useState("global")
  
  const topArtist = chartArtists[0]
  const runnerUps = chartArtists.slice(1, 3)
  const restOfChart = chartArtists.slice(3, 20)

  const getRankChange = (current: number, previous: number) => {
    const diff = previous - current
    if (diff > 0) return { icon: TrendingUp, color: "text-green-500", text: `+${diff}` }
    if (diff < 0) return { icon: TrendingDown, color: "text-red-500", text: `${diff}` }
    return { icon: Minus, color: "text-muted-foreground", text: "=" }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-background"
          style={{
            backgroundImage: `url(${topArtist.avatar})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(100px)",
            opacity: 0.4,
          }}
        />
        
        <div className="relative px-4 pb-8 pt-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/music/charts" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ChevronRight className="size-4 rotate-180" /> All Charts
            </Link>
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl">
              TOP <span className="text-primary">ARTISTS</span>
            </h1>
            <p className="mt-2 text-muted-foreground">The most streamed artists on AfriStream this week</p>
          </div>

          {/* Region Pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {regions.map(r => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  region === r.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                )}
              >
                <span>{r.flag}</span>
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          {/* #1 Artist Feature */}
          <div className="glass-card overflow-hidden rounded-3xl p-1">
            <div className="relative flex flex-col gap-6 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent p-6 md:flex-row md:items-center md:p-8">
              {/* Crown Badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1.5 backdrop-blur-sm">
                <Crown className="size-4 text-primary" />
                <span className="text-sm font-bold text-primary">#1 ARTIST</span>
              </div>

              {/* Artist Image */}
              <div className="relative">
                <div className="relative size-40 overflow-hidden rounded-2xl ring-4 ring-primary/50 md:size-48">
                  <Image src={topArtist.avatar} alt={topArtist.name} fill className="object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-black text-primary-foreground shadow-lg">
                  1
                </div>
              </div>

              {/* Artist Info */}
              <div className="flex-1">
                <p className="mb-1 text-sm font-medium text-primary">{topArtist.country}</p>
                <h2 className="font-display text-3xl font-black text-foreground md:text-4xl">{topArtist.name}</h2>
                <p className="mt-1 text-muted-foreground">{topArtist.genre}</p>
                
                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <Users className="mx-auto mb-1 size-5 text-primary" />
                    <p className="font-mono text-lg font-bold text-foreground">{formatNumber(topArtist.monthlyListeners)}</p>
                    <p className="text-xs text-muted-foreground">Monthly Listeners</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <Music className="mx-auto mb-1 size-5 text-primary" />
                    <p className="font-mono text-lg font-bold text-foreground">{formatNumber(topArtist.totalStreams)}</p>
                    <p className="text-xs text-muted-foreground">Total Streams</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <Disc className="mx-auto mb-1 size-5 text-primary" />
                    <p className="font-mono text-lg font-bold text-foreground">{topArtist.weeksOnChart}</p>
                    <p className="text-xs text-muted-foreground">Weeks at #1</p>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <button className="group flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 md:size-20">
                <Play className="size-8 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Runner Ups */}
      <div className="px-4 py-8 lg:px-8">
        <h3 className="mb-4 font-display text-xl font-bold text-foreground">Runner Ups</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {runnerUps.map((artist, i) => {
            const change = getRankChange(artist.rank, artist.previousRank)
            return (
              <Link
                key={artist.id}
                href={`/music/artist/${artist.id}`}
                className="glass-card group flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-white/5"
              >
                {/* Rank */}
                <div className="flex w-12 flex-col items-center">
                  <span className="font-display text-3xl font-black text-foreground">{artist.rank}</span>
                  <div className={cn("flex items-center gap-0.5 text-xs", change.color)}>
                    <change.icon className="size-3" />
                    <span>{change.text}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative size-16 overflow-hidden rounded-xl">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate font-semibold text-foreground">{artist.name}</h4>
                  <p className="truncate text-sm text-muted-foreground">{artist.genre} • {artist.country}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatNumber(artist.monthlyListeners)} monthly listeners
                  </p>
                </div>

                {/* Play */}
                <button className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="size-5 fill-current" />
                </button>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Full Chart */}
      <div className="px-4 pb-32 lg:px-8">
        <h3 className="mb-4 font-display text-xl font-bold text-foreground">Full Chart</h3>
        <div className="space-y-2">
          {restOfChart.map((artist) => {
            const change = getRankChange(artist.rank, artist.previousRank)
            return (
              <Link
                key={artist.id}
                href={`/music/artist/${artist.id}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
              >
                {/* Rank */}
                <div className="flex w-10 flex-col items-center">
                  <span className="font-mono text-lg font-bold text-foreground">{artist.rank}</span>
                  <div className={cn("flex items-center gap-0.5 text-xs", change.color)}>
                    <change.icon className="size-3" />
                  </div>
                </div>

                {/* Image */}
                <div className="relative size-12 overflow-hidden rounded-lg">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate font-medium text-foreground">{artist.name}</h4>
                  <p className="truncate text-sm text-muted-foreground">{artist.country}</p>
                </div>

                {/* Stats */}
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-sm text-foreground">{formatNumber(artist.monthlyListeners)}</p>
                  <p className="text-xs text-muted-foreground">listeners</p>
                </div>

                {/* Play */}
                <button className="flex size-9 items-center justify-center rounded-full bg-white/10 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground">
                  <Play className="size-4 fill-current" />
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
