"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockMovies, movieCategories } from "@/lib/mock-data"
import { MovieCard } from "@/components/content-card"
import { Play, Film, Tv, Star, Clock, ChevronRight, Clapperboard, Globe, Award } from "lucide-react"

export default function MoviesPage() {
  const featured = mockMovies[0]
  const series = mockMovies.filter(m => m.type === "series")
  const films = mockMovies.filter(m => m.type === "movie")

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src={featured.banner} alt="" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="relative px-4 pt-8 pb-16 lg:px-6 min-h-[500px] flex flex-col justify-end">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 border border-primary/20">
              <Film className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">Featured</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium text-foreground">{featured.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9] max-w-2xl">
            {featured.title.toUpperCase()}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <span>{featured.year}</span>
            <span className="size-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-1"><Clock className="size-3" /> {featured.duration}</span>
            <span className="size-1 rounded-full bg-muted-foreground" />
            <span>{featured.genre}</span>
            <span className="size-1 rounded-full bg-muted-foreground" />
            <span>{featured.language}</span>
          </div>

          {/* Synopsis */}
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            {featured.synopsis}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={`/movies/${featured.id}`}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              <Play className="size-4 fill-current" /> Watch Now
            </Link>
            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10 transition-colors">
              + Add to Watchlist
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 lg:px-6 mt-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {movieCategories.map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "border border-white/10 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clapperboard className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Trending Movies</h2>
          </div>
          <Link href="/movies/browse" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {films.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Series */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Tv className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Series</h2>
          </div>
          <Link href="/movies/series" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.slice(0, 3).map(s => (
            <Link
              key={s.id}
              href={`/movies/${s.id}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
            >
              <div className="relative aspect-video">
                <Image src={s.banner} alt={s.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                  <Tv className="size-3" /> {s.seasons} Seasons
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                  <p className="text-sm text-white/70">{s.country} &middot; {s.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* By Region */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Nollywood</h2>
          </div>
          <Link href="/movies/nollywood" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {films.filter(m => m.category === "Nollywood").map(m => <MovieCard key={m.id} movie={m} />)}
          {films.slice(0, 3).map(m => <MovieCard key={`nw-${m.id}`} movie={m} />)}
        </div>
      </section>

      {/* South African */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">South African</h2>
          </div>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {mockMovies.filter(m => m.country === "South Africa").map(m => <MovieCard key={m.id} movie={m} />)}
          {films.slice(0, 2).map(m => <MovieCard key={`sa-${m.id}`} movie={m} />)}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Play className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Continue Watching</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockMovies.slice(3, 7).map(m => (
            <Link
              key={m.id}
              href={`/movies/${m.id}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
            >
              <div className="relative aspect-video">
                <Image src={m.banner} alt={m.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center size-12 rounded-full bg-primary">
                    <Play className="size-5 fill-current text-primary-foreground ml-0.5" />
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-primary" style={{ width: `${Math.random() * 70 + 10}%` }} />
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.duration} remaining</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
