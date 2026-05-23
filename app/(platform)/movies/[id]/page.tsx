"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockMovies } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Play, Plus, Share2, Download, Star, Clock, Globe, Film,
  Subtitles, Volume2, Maximize2, Settings, Tv, Heart, ChevronRight,
  ChevronDown, Users, Award, Calendar, Languages, Pause
} from "lucide-react"

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const movie = mockMovies.find(m => m.id === id) || mockMovies[0]
  const isSeries = movie.type === "series"
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [activeSeason, setActiveSeason] = useState(1)
  const [showFullSynopsis, setShowFullSynopsis] = useState(false)

  const castMembers = [
    { name: "Omotola Jalade", role: "Lead Actress", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop" },
    { name: "Ramsey Nouah", role: "Lead Actor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    { name: "Genevieve Nnaji", role: "Supporting", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
    { name: "Richard Mofe", role: "Supporting", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
    { name: "Kunle Afolayan", role: "Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
  ]

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Video Player */}
      <div className="relative aspect-[21/9] w-full bg-black">
        <Image src={movie.banner} alt={movie.title} fill className="object-cover opacity-70" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="group flex size-20 items-center justify-center rounded-full bg-primary/90 text-black transition-all hover:scale-110 hover:bg-primary shadow-2xl">
            <Play className="size-10 ml-1 fill-current" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 lg:p-6">
          {/* Progress Bar */}
          <div className="mb-3 h-1.5 w-full cursor-pointer rounded-full bg-white/20 group">
            <div className="h-full w-0 rounded-full bg-primary transition-all group-hover:h-2" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Play className="size-5 fill-current" />
              </button>
              <span className="text-sm text-white/80">0:00 / {movie.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex size-10 items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors">
                <Subtitles className="size-5" />
              </button>
              <button className="flex size-10 items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors">
                <Volume2 className="size-5" />
              </button>
              <button className="flex size-10 items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors">
                <Settings className="size-5" />
              </button>
              <button className="flex size-10 items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors">
                <Maximize2 className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="px-4 lg:px-8 pt-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className="flex-1 space-y-4">
            {/* Type Badge */}
            <div className="flex items-center gap-2">
              {isSeries ? <Tv className="size-4 text-primary" /> : <Film className="size-4 text-primary" />}
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {isSeries ? "TV Series" : "Movie"}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
              {movie.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 rounded-lg bg-yellow-500/20 px-2 py-1 text-yellow-500">
                <Star className="size-4 fill-current" />
                {movie.rating || "8.5"}
              </span>
              <span className="text-muted-foreground">{movie.year}</span>
              <span className="size-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-4" />
                {movie.duration}
              </span>
              <span className="size-1 rounded-full bg-muted-foreground" />
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-medium">{movie.rating || "PG-13"}</span>
              {isSeries && (
                <>
                  <span className="size-1 rounded-full bg-muted-foreground" />
                  <span className="text-muted-foreground">{movie.seasons} Seasons</span>
                </>
              )}
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2">
              {(movie.genre || "Drama, Thriller").split(", ").map((genre) => (
                <span key={genre} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-black hover:bg-primary/90 transition-colors">
                <Play className="size-5 fill-current" />
                {isSeries ? "Play S1:E1" : "Watch Now"}
              </button>
              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors",
                  isWatchlisted
                    ? "border border-primary text-primary hover:bg-primary/10"
                    : "border border-white/20 text-white hover:bg-white/5"
                )}
              >
                {isWatchlisted ? <Heart className="size-5 fill-current" /> : <Plus className="size-5" />}
                {isWatchlisted ? "In Watchlist" : "Watchlist"}
              </button>
              <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                <Download className="size-5" />
              </button>
              <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                <Share2 className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="space-y-2">
          <h2 className="font-semibold text-white">Synopsis</h2>
          <p className={cn(
            "text-base leading-relaxed text-white/70",
            !showFullSynopsis && "line-clamp-3"
          )}>
            {movie.synopsis || "A gripping tale of love, loss, and redemption set against the vibrant backdrop of Lagos, Nigeria. When a successful businessman returns to his hometown after decades abroad, he must confront the family secrets and cultural traditions he left behind. As he navigates between two worlds, he discovers that true wealth lies not in material success, but in the bonds of community and the courage to embrace his heritage."}
          </p>
          <button
            onClick={() => setShowFullSynopsis(!showFullSynopsis)}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {showFullSynopsis ? "Show less" : "Read more"}
            <ChevronDown className={cn("size-4 transition-transform", showFullSynopsis && "rotate-180")} />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: Users, label: "Director", value: movie.director || "Kunle Afolayan" },
            { icon: Globe, label: "Country", value: movie.country },
            { icon: Languages, label: "Language", value: movie.language || "English, Yoruba" },
            { icon: Calendar, label: "Released", value: movie.year },
            { icon: Film, label: "Category", value: movie.category || "Feature Film" },
            { icon: Award, label: "Awards", value: "3 AMAA Awards" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <item.icon className="size-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-medium text-white truncate">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Episodes (Series Only) */}
        {isSeries && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-white">Episodes</h2>
              <select 
                value={activeSeason}
                onChange={(e) => setActiveSeason(Number(e.target.value))}
                className="rounded-lg bg-white/[0.06] px-4 py-2 text-sm text-white border-0 outline-none"
              >
                {Array.from({ length: movie.seasons || 1 }).map((_, i) => (
                  <option key={i} value={i + 1} className="bg-background">
                    Season {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <button
                  key={i}
                  className="group flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left hover:bg-white/[0.06] transition-colors"
                >
                  <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                    <Image src={movie.banner} alt={`Episode ${i + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary">
                        <Play className="size-4 fill-current text-black" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium">
                      45:00
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">E{i + 1}</span>
                      <span className="size-1 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">45 min</span>
                    </div>
                    <h3 className="font-medium text-white mt-1">Episode {i + 1}: The Beginning</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      The journey begins as our protagonist returns to their homeland after years abroad...
                    </p>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Cast & Crew */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">Cast & Crew</h2>
            <Link href="#" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {castMembers.map((member, i) => (
              <div key={i} className="flex w-28 shrink-0 flex-col items-center gap-2">
                <div className="relative size-20 overflow-hidden rounded-full bg-white/[0.06] ring-2 ring-transparent hover:ring-primary/50 transition-all">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-white text-sm">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More Like This */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">More Like This</h2>
            <Link href="/movies" className="flex items-center gap-1 text-sm text-primary hover:underline">
              Browse all <ChevronRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockMovies.filter(m => m.id !== movie.id).slice(0, 8).map((relatedMovie) => (
              <Link
                key={relatedMovie.id}
                href={`/movies/${relatedMovie.id}`}
                className="group min-w-[160px] flex-shrink-0"
              >
                <div className="flex flex-col overflow-hidden rounded-xl bg-white/[0.02] hover:bg-white/[0.06] transition-all">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image src={relatedMovie.poster} alt={relatedMovie.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                        <Play className="size-5 fill-current text-black" />
                      </div>
                    </div>
                    {relatedMovie.rating && (
                      <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold">
                        <Star className="size-3 fill-yellow-500 text-yellow-500" />
                        {relatedMovie.rating}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {relatedMovie.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{relatedMovie.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
