"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockMovies, movieCategories } from "@/lib/mock-data"
import { MovieCard, SectionHeader } from "@/components/content-card"
import { Play, Film, Tv } from "lucide-react"

export default function MoviesPage() {
  const featured = mockMovies[0]
  const series = mockMovies.filter(m => m.type === "series")
  const films = mockMovies.filter(m => m.type === "movie")

  return (
    <div className="space-y-8 py-4">
      {/* Hero Banner */}
      <div className="relative mx-4 overflow-hidden rounded-xl lg:mx-6" style={{ height: "320px" }}>
        <Image src={featured.banner} alt={featured.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <span className="mb-2 inline-block rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{featured.category}</span>
          <h1 className="text-3xl font-bold text-white">{featured.title}</h1>
          <p className="mt-1 max-w-md text-sm text-white/80">{featured.synopsis.slice(0, 120)}...</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
            <span>{featured.year}</span><span>&middot;</span><span>{featured.duration}</span><span>&middot;</span><span>{featured.language}</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Link href={`/movies/${featured.id}`} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground glow-orange-sm">
              <Play className="size-4" /> Watch Now
            </Link>
            <button className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              + Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="space-y-3">
        <SectionHeader title="Browse Categories" />
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
          {movieCategories.map(cat => (
            <button key={cat} className="whitespace-nowrap rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="space-y-3">
        <SectionHeader title="Trending Movies" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {films.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Series */}
      <section className="space-y-3">
        <SectionHeader title="Series" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {series.map(s => (
            <Link key={s.id} href={`/movies/${s.id}`} className="group w-48 flex-shrink-0 sm:w-56">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src={s.banner} alt={s.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  <Tv className="size-3" /> {s.seasons} Seasons
                </div>
              </div>
              <p className="mt-2 truncate text-sm font-medium text-foreground">{s.title}</p>
              <p className="truncate text-xs text-muted-foreground">{s.country} &middot; {s.genre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="space-y-3">
        <SectionHeader title="New Releases" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(2, 8).map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Nollywood */}
      <section className="space-y-3">
        <SectionHeader title="Nollywood" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {films.filter(m => m.category === "Nollywood").map(m => <MovieCard key={m.id} movie={m} />)}
          {films.slice(0, 3).map(m => <MovieCard key={`nw-${m.id}`} movie={m} />)}
        </div>
      </section>

      {/* South African */}
      <section className="space-y-3">
        <SectionHeader title="South African" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.filter(m => m.country === "South Africa").map(m => <MovieCard key={m.id} movie={m} />)}
          {films.slice(0, 2).map(m => <MovieCard key={`sa-${m.id}`} movie={m} />)}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Continue Watching" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(3, 7).map(m => (
            <div key={m.id} className="w-48 flex-shrink-0 sm:w-56">
              <Link href={`/movies/${m.id}`} className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image src={m.banner} alt={m.title} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${Math.random() * 70 + 10}%` }} />
                  </div>
                </div>
                <p className="mt-2 truncate text-sm font-medium text-foreground">{m.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
