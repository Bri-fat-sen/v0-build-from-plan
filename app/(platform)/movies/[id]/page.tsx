"use client"
import { use } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockMovies } from "@/lib/mock-data"
import { MovieCard } from "@/components/content-card"
import {
  Play, Plus, Share2, Download, Star, Clock, Globe, Film,
  Subtitles, Volume2, Minimize2, Settings, Tv,
} from "lucide-react"

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const movie = mockMovies.find(m => m.id === id) || mockMovies[0]
  const isSeries = movie.type === "series"

  return (
    <div className="space-y-6">
      {/* Video Player Area */}
      <div className="relative aspect-video w-full bg-black">
        <Image src={movie.banner} alt={movie.title} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground glow-orange transition-transform hover:scale-110">
            <Play className="size-8 ml-1" />
          </button>
        </div>
        {/* Player Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-2 h-1 w-full rounded-full bg-white/20">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Play className="size-5" />
              <span className="text-xs">0:00 / {movie.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <Subtitles className="size-4 cursor-pointer hover:text-primary" />
              <Volume2 className="size-4 cursor-pointer hover:text-primary" />
              <Settings className="size-4 cursor-pointer hover:text-primary" />
              <Minimize2 className="size-4 cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="space-y-4 px-4 lg:px-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isSeries ? <Tv className="size-4 text-primary" /> : <Film className="size-4 text-primary" />}
            <span className="text-xs font-medium uppercase text-primary">{isSeries ? "Series" : "Movie"}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{movie.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{movie.year}</span><span>&middot;</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{movie.duration}</span><span>&middot;</span>
            <span>{movie.genre}</span><span>&middot;</span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{movie.rating}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground glow-orange-sm">
            <Play className="size-4" /> {isSeries ? "Play S1:E1" : "Watch Now"}
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
            <Plus className="size-4" /> Watchlist
          </button>
          <button className="text-muted-foreground hover:text-foreground"><Download className="size-5" /></button>
          <button className="text-muted-foreground hover:text-foreground"><Share2 className="size-5" /></button>
        </div>

        {/* Synopsis */}
        <p className="text-sm leading-relaxed text-muted-foreground">{movie.synopsis}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground">Director</p>
            <p className="text-sm font-medium text-foreground">{movie.director}</p>
          </div>
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground">Country</p>
            <p className="text-sm font-medium text-foreground">{movie.country}</p>
          </div>
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground">Language</p>
            <p className="text-sm font-medium text-foreground">{movie.language}</p>
          </div>
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-sm font-medium text-foreground">{movie.category}</p>
          </div>
          {isSeries && (
            <>
              <div className="rounded-lg bg-card p-3">
                <p className="text-xs text-muted-foreground">Seasons</p>
                <p className="text-sm font-medium text-foreground">{movie.seasons}</p>
              </div>
              <div className="rounded-lg bg-card p-3">
                <p className="text-xs text-muted-foreground">Episodes</p>
                <p className="text-sm font-medium text-foreground">{movie.episodes}</p>
              </div>
            </>
          )}
        </div>

        {/* Episodes for Series */}
        {isSeries && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Episodes</h2>
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: movie.seasons || 1 }).map((_, i) => (
                <button key={i} className={`rounded-full px-3 py-1 text-sm font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  Season {i + 1}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-card p-3 hover:bg-secondary transition-colors cursor-pointer">
                  <div className="relative aspect-video w-28 flex-shrink-0 overflow-hidden rounded">
                    <Image src={movie.banner} alt={`Episode ${i + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="size-6 rounded-full bg-primary/80 p-1 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Episode {i + 1}</p>
                    <p className="text-xs text-muted-foreground">45 min &middot; Season 1</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Cast & Crew</h2>
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {["Lead Actor", "Lead Actress", "Supporting", "Director", "Producer"].map((role, i) => (
              <div key={role} className="flex w-24 flex-shrink-0 flex-col items-center gap-2">
                <div className="relative size-16 overflow-hidden rounded-full bg-muted">
                  <Image src={`https://picsum.photos/seed/cast${movie.id}${i}/100/100`} alt={role} fill className="object-cover" />
                </div>
                <p className="text-center text-xs font-medium text-foreground">Actor {i + 1}</p>
                <p className="text-center text-[10px] text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="space-y-3 pb-8">
        <h2 className="px-4 text-lg font-bold text-foreground lg:px-6">More Like This</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.filter(m => m.id !== movie.id).slice(0, 6).map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>
    </div>
  )
}
