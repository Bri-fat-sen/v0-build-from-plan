"use client"
import { useState } from "react"
import { mockTracks, mockArtists, mockAlbums, formatNumber } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { 
  TrendingUp, TrendingDown, Minus, Play, Heart, MoreHorizontal, Share2,
  Globe, MapPin, Music, Disc, Users, Clock, Calendar, ChevronDown, Filter,
  Flame, Trophy, Star, Zap, Crown, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"

// Chart categories
const chartCategories = [
  { id: "songs", label: "Top Songs", icon: Music },
  { id: "albums", label: "Top Albums", icon: Disc },
  { id: "artists", label: "Top Artists", icon: Users },
  { id: "viral", label: "Viral 50", icon: Flame },
  { id: "rising", label: "Rising Stars", icon: Zap },
]

// Regions/Countries for filtering
const regions = [
  { id: "global", label: "Global", flag: "🌍" },
  { id: "africa", label: "All Africa", flag: "🌍" },
  { id: "ng", label: "Nigeria", flag: "🇳🇬" },
  { id: "za", label: "South Africa", flag: "🇿🇦" },
  { id: "ke", label: "Kenya", flag: "🇰🇪" },
  { id: "gh", label: "Ghana", flag: "🇬🇭" },
  { id: "tz", label: "Tanzania", flag: "🇹🇿" },
  { id: "eg", label: "Egypt", flag: "🇪🇬" },
  { id: "sn", label: "Senegal", flag: "🇸🇳" },
  { id: "diaspora", label: "Diaspora", flag: "🌐" },
]

// Time ranges
const timeRanges = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
  { id: "alltime", label: "All Time" },
]

// Generate mock trend data for sparklines
const generateTrendData = (direction: "up" | "down" | "stable") => {
  const base = 50
  return Array.from({ length: 7 }, (_, i) => ({
    day: i,
    value: direction === "up" 
      ? base + i * 8 + Math.random() * 10
      : direction === "down"
      ? base + (6 - i) * 8 + Math.random() * 10
      : base + Math.random() * 15
  }))
}

// Extended track data with chart info
const chartTracks = mockTracks.map((track, i) => ({
  ...track,
  rank: i + 1,
  previousRank: i + 1 + (Math.random() > 0.5 ? Math.floor(Math.random() * 5) : -Math.floor(Math.random() * 3)),
  peakRank: Math.max(1, i + 1 - Math.floor(Math.random() * 5)),
  weeksOnChart: Math.floor(Math.random() * 20) + 1,
  streams: Math.floor(Math.random() * 50000000) + 1000000,
  trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable",
}))

// Sparkline component
function Sparkline({ data, color = "primary" }: { data: { day: number; value: number }[]; color?: string }) {
  return (
    <div className="h-8 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color === "green" ? "#22c55e" : color === "red" ? "#ef4444" : "hsl(var(--primary))"} 
            strokeWidth={1.5} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Rank change indicator
function RankChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current
  if (diff > 0) {
    return (
      <div className="flex items-center gap-1 text-green-500">
        <TrendingUp className="size-3" />
        <span className="text-xs font-medium">+{diff}</span>
      </div>
    )
  } else if (diff < 0) {
    return (
      <div className="flex items-center gap-1 text-red-500">
        <TrendingDown className="size-3" />
        <span className="text-xs font-medium">{diff}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Minus className="size-3" />
      <span className="text-xs font-medium">0</span>
    </div>
  )
}

// Chart entry row component
function ChartRow({ track, showSparkline = true }: { track: typeof chartTracks[0]; showSparkline?: boolean }) {
  const trendData = generateTrendData(track.trend)
  
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5">
      {/* Rank */}
      <div className="flex w-12 flex-col items-center">
        <span className={cn(
          "font-mono text-lg font-bold",
          track.rank <= 3 ? "text-primary" : "text-foreground"
        )}>
          {track.rank}
        </span>
        <RankChange current={track.rank} previous={track.previousRank} />
      </div>

      {/* Cover */}
      <div className="relative">
        <Image
          src={track.cover}
          alt={track.title}
          width={48}
          height={48}
          className="rounded-md"
        />
        <button className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="size-5 fill-white text-white" />
        </button>
        {track.rank <= 3 && (
          <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {track.rank === 1 ? <Crown className="size-3" /> : track.rank}
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="min-w-0 flex-1">
        <Link href={`/music/track/${track.id}`} className="block truncate font-medium text-foreground hover:underline">
          {track.title}
        </Link>
        <Link href={`/music/artist/${track.artistId}`} className="block truncate text-sm text-muted-foreground hover:underline">
          {track.artist}
        </Link>
      </div>

      {/* Sparkline */}
      {showSparkline && (
        <div className="hidden md:block">
          <Sparkline data={trendData} color={track.trend === "up" ? "green" : track.trend === "down" ? "red" : "primary"} />
        </div>
      )}

      {/* Stats */}
      <div className="hidden flex-col items-end text-right lg:flex">
        <span className="font-mono text-sm font-medium text-foreground">{formatNumber(track.streams)}</span>
        <span className="text-xs text-muted-foreground">streams</span>
      </div>

      {/* Peak & weeks */}
      <div className="hidden flex-col items-center xl:flex">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Trophy className="size-3 text-primary" />
          <span>Peak: #{track.peakRank}</span>
        </div>
        <span className="text-xs text-muted-foreground">{track.weeksOnChart}w on chart</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="rounded-full p-2 hover:bg-white/10">
          <Heart className="size-4 text-muted-foreground" />
        </button>
        <button className="rounded-full p-2 hover:bg-white/10">
          <Share2 className="size-4 text-muted-foreground" />
        </button>
        <button className="rounded-full p-2 hover:bg-white/10">
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}

// Top 3 podium component
function TopThreePodium({ tracks }: { tracks: typeof chartTracks }) {
  const top3 = tracks.slice(0, 3)
  const [second, first, third] = [top3[1], top3[0], top3[2]]
  
  return (
    <div className="mb-8 flex items-end justify-center gap-4 px-4">
      {/* Second place */}
      <div className="flex flex-col items-center">
        <div className="relative mb-2">
          <Image
            src={second.cover}
            alt={second.title}
            width={80}
            height={80}
            className="rounded-xl ring-2 ring-white/20"
          />
          <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 font-bold text-gray-800">
            2
          </div>
        </div>
        <span className="max-w-20 truncate text-center text-sm font-medium">{second.title}</span>
        <span className="max-w-20 truncate text-center text-xs text-muted-foreground">{second.artist}</span>
        <div className="mt-2 h-16 w-20 rounded-t-lg bg-gradient-to-t from-gray-400/20 to-gray-300/40" />
      </div>

      {/* First place */}
      <div className="flex flex-col items-center">
        <Crown className="mb-1 size-6 text-yellow-500" />
        <div className="relative mb-2">
          <Image
            src={first.cover}
            alt={first.title}
            width={100}
            height={100}
            className="rounded-xl ring-4 ring-primary/50 shadow-lg shadow-primary/20"
          />
          <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 font-bold text-yellow-900">
            1
          </div>
        </div>
        <span className="max-w-24 truncate text-center font-semibold">{first.title}</span>
        <span className="max-w-24 truncate text-center text-sm text-muted-foreground">{first.artist}</span>
        <div className="mt-2 h-24 w-24 rounded-t-lg bg-gradient-to-t from-primary/30 to-primary/60" />
      </div>

      {/* Third place */}
      <div className="flex flex-col items-center">
        <div className="relative mb-2">
          <Image
            src={third.cover}
            alt={third.title}
            width={80}
            height={80}
            className="rounded-xl ring-2 ring-white/20"
          />
          <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-orange-800 font-bold text-orange-100">
            3
          </div>
        </div>
        <span className="max-w-20 truncate text-center text-sm font-medium">{third.title}</span>
        <span className="max-w-20 truncate text-center text-xs text-muted-foreground">{third.artist}</span>
        <div className="mt-2 h-12 w-20 rounded-t-lg bg-gradient-to-t from-orange-700/20 to-orange-600/40" />
      </div>
    </div>
  )
}

// Artist chart row
function ArtistChartRow({ artist, rank }: { artist: typeof mockArtists[0]; rank: number }) {
  const streams = Math.floor(Math.random() * 100000000) + 10000000
  const followers = Math.floor(Math.random() * 5000000) + 100000
  
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5">
      <span className={cn(
        "w-8 font-mono text-lg font-bold",
        rank <= 3 ? "text-primary" : "text-foreground"
      )}>
        {rank}
      </span>
      <Image
        src={artist.avatar}
        alt={artist.name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="min-w-0 flex-1">
        <Link href={`/music/artist/${artist.id}`} className="block truncate font-medium text-foreground hover:underline">
          {artist.name}
        </Link>
        <span className="text-sm text-muted-foreground">{artist.country}</span>
      </div>
      <div className="hidden flex-col items-end md:flex">
        <span className="font-mono text-sm font-medium">{formatNumber(streams)}</span>
        <span className="text-xs text-muted-foreground">monthly streams</span>
      </div>
      <div className="hidden flex-col items-end lg:flex">
        <span className="font-mono text-sm font-medium">{formatNumber(followers)}</span>
        <span className="text-xs text-muted-foreground">followers</span>
      </div>
    </div>
  )
}

// Album chart row
function AlbumChartRow({ album, rank }: { album: typeof mockAlbums[0]; rank: number }) {
  const streams = Math.floor(Math.random() * 50000000) + 5000000
  
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5">
      <span className={cn(
        "w-8 font-mono text-lg font-bold",
        rank <= 3 ? "text-primary" : "text-foreground"
      )}>
        {rank}
      </span>
      <Image
        src={album.cover}
        alt={album.title}
        width={48}
        height={48}
        className="rounded-md"
      />
      <div className="min-w-0 flex-1">
        <Link href={`/music/album/${album.id}`} className="block truncate font-medium text-foreground hover:underline">
          {album.title}
        </Link>
        <span className="text-sm text-muted-foreground">{album.artist} · {album.year}</span>
      </div>
      <div className="hidden flex-col items-end md:flex">
        <span className="font-mono text-sm font-medium">{formatNumber(streams)}</span>
        <span className="text-xs text-muted-foreground">streams</span>
      </div>
      <div className="hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
        <Music className="size-3" />
        <span>{album.tracks} tracks</span>
      </div>
    </div>
  )
}

export default function ChartsPage() {
  const [activeCategory, setActiveCategory] = useState("songs")
  const [activeRegion, setActiveRegion] = useState("global")
  const [activeTime, setActiveTime] = useState("week")
  const [showFilters, setShowFilters] = useState(false)

  const selectedRegion = regions.find(r => r.id === activeRegion)

  return (
    <div className="space-y-6 pb-32 pt-4">
      {/* Header */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                <TrendingUp className="size-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Charts</h1>
                <p className="text-sm text-muted-foreground">
                  The most-streamed on AfriStream · Updated hourly
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 lg:hidden"
          >
            <Filter className="size-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className={cn(
        "space-y-4 px-4 lg:px-6",
        !showFilters && "hidden lg:block"
      )}>
        {/* Category tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {chartCategories.map(cat => {
            const Icon = cat.icon
            return (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                  activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Region and Time filters */}
        <div className="flex flex-wrap gap-3">
          {/* Region dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10">
              <Globe className="size-4 text-primary" />
              <span>{selectedRegion?.flag} {selectedRegion?.label}</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </div>

          {/* Time range pills */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {timeRanges.map(time => (
              <button
                key={time.id}
                onClick={() => setActiveTime(time.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  activeTime === time.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick region pills for mobile */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:hidden">
        {regions.slice(0, 6).map(region => (
          <button
            key={region.id}
            onClick={() => setActiveRegion(region.id)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              activeRegion === region.id
                ? "bg-primary/20 text-primary"
                : "bg-white/5 text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{region.flag}</span>
            <span>{region.label}</span>
          </button>
        ))}
      </div>

      {/* Top 3 Podium for songs */}
      {activeCategory === "songs" && (
        <TopThreePodium tracks={chartTracks} />
      )}

      {/* Chart content */}
      <div className="px-4 lg:px-6">
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm">
          {/* Chart header */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {chartCategories.find(c => c.id === activeCategory)?.label}
              </span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {selectedRegion?.label}
              </span>
              <span className="text-xs text-muted-foreground">
                · {timeRanges.find(t => t.id === activeTime)?.label}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>Updated 2 hours ago</span>
            </div>
          </div>

          {/* Chart list */}
          <div className="divide-y divide-white/5">
            {activeCategory === "songs" && chartTracks.slice(3).map(track => (
              <ChartRow key={track.id} track={track} />
            ))}
            {activeCategory === "albums" && mockAlbums.map((album, i) => (
              <AlbumChartRow key={album.id} album={album} rank={i + 1} />
            ))}
            {activeCategory === "artists" && mockArtists.map((artist, i) => (
              <ArtistChartRow key={artist.id} artist={artist} rank={i + 1} />
            ))}
            {activeCategory === "viral" && chartTracks.slice(0, 10).map((track, i) => (
              <ChartRow key={track.id} track={{ ...track, rank: i + 1 }} />
            ))}
            {activeCategory === "rising" && mockArtists.slice(0, 10).map((artist, i) => (
              <ArtistChartRow key={artist.id} artist={artist} rank={i + 1} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center border-t border-white/5 py-4">
            <button className="flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/10">
              Show Full Chart
              <ArrowDownRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart insights sidebar */}
      <div className="px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Biggest mover */}
          <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-green-500">
              <ArrowUpRight className="size-4" />
              <span className="text-xs font-medium uppercase">Biggest Mover</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src={chartTracks[5].cover} alt="" width={48} height={48} className="rounded-lg" />
              <div>
                <p className="font-medium text-foreground">{chartTracks[5].title}</p>
                <p className="text-sm text-muted-foreground">+47 positions</p>
              </div>
            </div>
          </div>

          {/* Longest #1 */}
          <div className="rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-yellow-500">
              <Crown className="size-4" />
              <span className="text-xs font-medium uppercase">Longest at #1</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src={chartTracks[0].cover} alt="" width={48} height={48} className="rounded-lg" />
              <div>
                <p className="font-medium text-foreground">{chartTracks[0].title}</p>
                <p className="text-sm text-muted-foreground">12 weeks at #1</p>
              </div>
            </div>
          </div>

          {/* New entry */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Star className="size-4" />
              <span className="text-xs font-medium uppercase">Highest New Entry</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src={chartTracks[3].cover} alt="" width={48} height={48} className="rounded-lg" />
              <div>
                <p className="font-medium text-foreground">{chartTracks[3].title}</p>
                <p className="text-sm text-muted-foreground">Debuted at #4</p>
              </div>
            </div>
          </div>

          {/* Most streams */}
          <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-purple-500">
              <Flame className="size-4" />
              <span className="text-xs font-medium uppercase">Most Streams Today</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src={chartTracks[1].cover} alt="" width={48} height={48} className="rounded-lg" />
              <div>
                <p className="font-medium text-foreground">{chartTracks[1].title}</p>
                <p className="text-sm text-muted-foreground">2.4M streams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
