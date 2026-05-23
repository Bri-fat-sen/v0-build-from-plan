"use client"
import { useState } from "react"
import { mockArtists, mockTracks, genres, mockCountryHubs } from "@/lib/mock-data"
import { Share2, Download, ChevronRight, ChevronLeft, Music, Clock, Globe, Heart, Zap, Users, MapPin, Headphones, Sparkles } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Rewind data for a user
const rewindData = {
  year: 2025,
  totalMinutes: 48720,
  totalTracks: 2847,
  totalArtists: 342,
  totalGenres: 18,
  totalCountries: 24,
  topArtists: [
    { ...mockArtists[0], minutes: 4820, rank: 1 },
    { ...mockArtists[2], minutes: 3210, rank: 2 },
    { ...mockArtists[5], minutes: 2890, rank: 3 },
    { ...mockArtists[1], minutes: 2450, rank: 4 },
    { ...mockArtists[4], minutes: 1980, rank: 5 },
  ],
  topTracks: [
    { ...mockTracks[1], plays: 287, rank: 1 },
    { ...mockTracks[2], plays: 234, rank: 2 },
    { ...mockTracks[0], plays: 198, rank: 3 },
    { ...mockTracks[5], plays: 167, rank: 4 },
    { ...mockTracks[8], plays: 145, rank: 5 },
  ],
  topGenres: [
    { name: "Afrobeats", percentage: 42, color: "hsl(24 95% 55%)" },
    { name: "Amapiano", percentage: 28, color: "hsl(45 93% 47%)" },
    { name: "Afro-Soul", percentage: 12, color: "hsl(200 80% 50%)" },
    { name: "Highlife", percentage: 10, color: "hsl(150 60% 45%)" },
    { name: "Bongo Flava", percentage: 8, color: "hsl(280 70% 55%)" },
  ],
  topCountries: [
    { name: "Nigeria", code: "NG", percentage: 45 },
    { name: "South Africa", code: "ZA", percentage: 25 },
    { name: "Ghana", code: "GH", percentage: 15 },
    { name: "Kenya", code: "KE", percentage: 10 },
    { name: "Tanzania", code: "TZ", percentage: 5 },
  ],
  listeningPersonality: "Afrobeats Explorer",
  personalityDescription: "You dove deep into the sounds of West Africa while discovering new artists across the continent.",
  topMonth: "December",
  topMonthMinutes: 6240,
  longestStreak: 47,
  discoveredArtists: 156,
  supportedCreators: 12,
  tipsSent: 45,
}

const slides = [
  "intro",
  "minutes",
  "topArtist",
  "topTracks",
  "genres",
  "countries",
  "personality",
  "summary",
]

export default function RewindPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0 && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const formatMinutes = (mins: number) => {
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days} days, ${hours % 24} hours`
    return `${hours} hours, ${mins % 60} minutes`
  }

  return (
    <div className="relative min-h-[calc(100dvh-120px)] overflow-hidden bg-background">
      {/* Background gradient based on slide */}
      <div className={cn(
        "pointer-events-none absolute inset-0 transition-all duration-700",
        currentSlide === 0 && "bg-gradient-to-br from-primary/20 via-background to-background",
        currentSlide === 1 && "bg-gradient-to-br from-blue-500/20 via-background to-background",
        currentSlide === 2 && "bg-gradient-to-br from-primary/30 via-background to-background",
        currentSlide === 3 && "bg-gradient-to-br from-purple-500/20 via-background to-background",
        currentSlide === 4 && "bg-gradient-to-br from-yellow-500/20 via-background to-background",
        currentSlide === 5 && "bg-gradient-to-br from-green-500/20 via-background to-background",
        currentSlide === 6 && "bg-gradient-to-br from-pink-500/20 via-background to-background",
        currentSlide === 7 && "bg-gradient-to-br from-primary/30 via-yellow-500/10 to-background",
      )} />

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-4">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <div 
              className={cn(
                "h-full rounded-full bg-primary transition-all duration-500",
                i < currentSlide ? "w-full" : i === currentSlide ? "w-full" : "w-0"
              )} 
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-30"
      >
        <ChevronLeft className="size-6 text-white" />
      </button>
      <button 
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-30"
      >
        <ChevronRight className="size-6 text-white" />
      </button>

      {/* Slide content */}
      <div 
        className={cn(
          "relative z-10 flex min-h-[calc(100dvh-120px)] flex-col items-center justify-center px-6 py-16 transition-all duration-300",
          isAnimating && "scale-95 opacity-0"
        )}
        onClick={nextSlide}
      >
        {/* Intro */}
        {currentSlide === 0 && (
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2">
              <Sparkles className="size-5 text-primary" />
              <span className="font-display text-sm font-semibold text-primary">Your {rewindData.year} Rewind</span>
            </div>
            <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl md:text-6xl">
              Afri<span className="text-primary">Stream</span>
            </h1>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Rewind</h2>
            <p className="mt-4 text-lg text-muted-foreground">Your year in African music, movies, and culture</p>
            <p className="mt-8 animate-pulse text-sm text-muted-foreground">Tap to continue</p>
          </div>
        )}

        {/* Total Minutes */}
        {currentSlide === 1 && (
          <div className="text-center">
            <Clock className="mx-auto mb-6 size-12 text-blue-400" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground">You listened for</p>
            <p className="mt-4 font-mono text-6xl font-black tabular-nums text-foreground sm:text-7xl">
              {rewindData.totalMinutes.toLocaleString()}
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">minutes</p>
            <p className="mt-4 text-lg text-muted-foreground">That&apos;s {formatMinutes(rewindData.totalMinutes)}</p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{rewindData.totalTracks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">tracks</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{rewindData.totalArtists}</p>
                <p className="text-xs text-muted-foreground">artists</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{rewindData.totalGenres}</p>
                <p className="text-xs text-muted-foreground">genres</p>
              </div>
            </div>
          </div>
        )}

        {/* Top Artist */}
        {currentSlide === 2 && (
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Your #1 Artist</p>
            <div className="relative mx-auto mt-6 size-48 overflow-hidden rounded-full border-4 border-primary glow-orange">
              <Image 
                src={rewindData.topArtists[0].avatar} 
                alt={rewindData.topArtists[0].name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mt-6 font-display text-4xl font-black text-foreground">{rewindData.topArtists[0].name}</h2>
            <p className="mt-2 text-lg text-primary">{rewindData.topArtists[0].genre} from {rewindData.topArtists[0].country}</p>
            <p className="mt-4 font-mono text-2xl font-bold tabular-nums text-muted-foreground">
              {rewindData.topArtists[0].minutes.toLocaleString()} minutes
            </p>
            <div className="mx-auto mt-8 flex max-w-md justify-center gap-2">
              {rewindData.topArtists.slice(1).map((artist, i) => (
                <div key={artist.id} className="text-center">
                  <div className="relative mx-auto size-12 overflow-hidden rounded-full border-2 border-muted">
                    <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">#{i + 2}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Tracks */}
        {currentSlide === 3 && (
          <div className="w-full max-w-md text-center">
            <Music className="mx-auto mb-4 size-10 text-purple-400" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Your Top Songs</p>
            <div className="mt-6 space-y-3">
              {rewindData.topTracks.map((track, i) => (
                <div 
                  key={track.id} 
                  className={cn(
                    "flex items-center gap-4 rounded-xl p-3 text-left",
                    i === 0 ? "bg-primary/20 border border-primary/30" : "bg-white/5"
                  )}
                >
                  <span className={cn("font-mono text-lg font-bold", i === 0 ? "text-primary" : "text-muted-foreground")}>
                    {i + 1}
                  </span>
                  <div className="relative size-12 overflow-hidden rounded-lg">
                    <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-semibold text-foreground">{track.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">{track.plays}x</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genres */}
        {currentSlide === 4 && (
          <div className="w-full max-w-md text-center">
            <Headphones className="mx-auto mb-4 size-10 text-yellow-400" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Your Sound</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Genre Breakdown</h2>
            <div className="mt-8 space-y-4">
              {rewindData.topGenres.map((genre, i) => (
                <div key={genre.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium text-foreground">{genre.name}</span>
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">{genre.percentage}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${genre.percentage}%`, backgroundColor: genre.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countries */}
        {currentSlide === 5 && (
          <div className="w-full max-w-md text-center">
            <Globe className="mx-auto mb-4 size-10 text-green-400" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground">You explored music from</p>
            <p className="mt-2 font-mono text-5xl font-black tabular-nums text-foreground">{rewindData.totalCountries}</p>
            <p className="text-xl font-semibold text-foreground">African countries</p>
            <div className="mt-8 space-y-3">
              {rewindData.topCountries.map((country, i) => (
                <div key={country.code} className="flex items-center gap-4 rounded-xl bg-white/5 p-3">
                  <span className="font-mono text-lg font-bold text-muted-foreground">{i + 1}</span>
                  <span className="flex-1 text-left font-medium text-foreground">{country.name}</span>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personality */}
        {currentSlide === 6 && (
          <div className="text-center">
            <Zap className="mx-auto mb-4 size-12 text-pink-400" />
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Your Listening Personality</p>
            <h2 className="mt-4 font-display text-4xl font-black text-foreground sm:text-5xl">
              {rewindData.listeningPersonality}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
              {rewindData.personalityDescription}
            </p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{rewindData.discoveredArtists}</p>
                <p className="text-xs text-muted-foreground">new artists discovered</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{rewindData.longestStreak}</p>
                <p className="text-xs text-muted-foreground">day listening streak</p>
              </div>
            </div>
          </div>
        )}

        {/* Summary & Share */}
        {currentSlide === 7 && (
          <div className="w-full max-w-md text-center">
            <h2 className="font-display text-3xl font-black text-foreground">Your {rewindData.year} Rewind</h2>
            <p className="mt-2 text-muted-foreground">Thanks for streaming with AfriStream</p>
            
            {/* Share card preview */}
            <div className="mx-auto mt-8 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/20 via-card to-card p-6">
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="font-display text-lg font-bold text-foreground">Afri<span className="text-primary">Stream</span></span>
                <span className="text-sm text-muted-foreground">Rewind {rewindData.year}</span>
              </div>
              <div className="relative mx-auto mb-4 size-20 overflow-hidden rounded-full border-2 border-primary">
                <Image src={rewindData.topArtists[0].avatar} alt="" fill className="object-cover" />
              </div>
              <p className="text-sm text-muted-foreground">My #1 was</p>
              <p className="font-display text-xl font-bold text-foreground">{rewindData.topArtists[0].name}</p>
              <div className="mt-4 flex justify-center gap-6 text-center">
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-foreground">{(rewindData.totalMinutes / 60).toFixed(0)}h</p>
                  <p className="text-xs text-muted-foreground">listened</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-foreground">{rewindData.totalArtists}</p>
                  <p className="text-xs text-muted-foreground">artists</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-bold tabular-nums text-foreground">{rewindData.totalCountries}</p>
                  <p className="text-xs text-muted-foreground">countries</p>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-primary-foreground glow-orange-sm">
                <Share2 className="size-5" />
                Share to Stories
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 font-semibold text-foreground">
                <Download className="size-5" />
                Download Image
              </button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Share your Rewind on WhatsApp, Instagram, Twitter, or TikTok
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
