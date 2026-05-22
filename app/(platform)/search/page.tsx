"use client"
import { useState } from "react"
import { mockArtists, mockTracks, mockMovies, mockCreators, genres } from "@/lib/mock-data"
import { TrackRow, ArtistCard, MovieCard, CreatorCard } from "@/components/content-card"
import { cn } from "@/lib/utils"
import { Search, TrendingUp } from "lucide-react"
import Link from "next/link"

const categories = ["All", "Music", "Movies", "Creators", "Culture", "Events", "Hubs"]
const trending = ["Burna Boy", "Amapiano 2025", "Nollywood", "Afrobeats", "Tyla", "AfroNation"]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const hasQuery = query.length > 0

  return (
    <div className="space-y-6 py-4">
      {/* Search Bar */}
      <div className="px-4 lg:px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search music, movies, creators, culture..."
            className="w-full rounded-xl bg-secondary py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}>
            {cat}
          </button>
        ))}
      </div>

      {!hasQuery ? (
        <>
          {/* Trending Searches */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-4 lg:px-6">
              <TrendingUp className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Trending Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2 px-4 lg:px-6">
              {trending.map(term => (
                <button key={term} onClick={() => setQuery(term)}
                  className="rounded-full bg-card px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </section>

          {/* Browse by Genre */}
          <section className="space-y-3">
            <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Browse by Genre</h2>
            <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
              {genres.slice(0, 12).map((genre, i) => (
                <button key={genre} onClick={() => setQuery(genre)}
                  className="relative overflow-hidden rounded-lg p-4 text-left transition-colors hover:opacity-80"
                  style={{ background: `hsl(${i * 30}, 50%, 15%)` }}>
                  <p className="text-sm font-medium text-foreground">{genre}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Browse by Country */}
          <section className="space-y-3">
            <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Browse by Country</h2>
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
              {["Nigeria", "South Africa", "Ghana", "Kenya", "Tanzania", "Senegal", "Ethiopia", "Cameroon"].map(c => (
                <Link key={c} href="/hubs" className="whitespace-nowrap rounded-full bg-card px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  {c}
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Search Results */}
          {(activeCategory === "All" || activeCategory === "Music") && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Tracks</h2>
              <div className="px-4 lg:px-6">
                <div className="rounded-xl bg-card p-3">
                  {mockTracks.slice(0, 4).map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
                </div>
              </div>
            </section>
          )}
          {(activeCategory === "All" || activeCategory === "Music") && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Artists</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {mockArtists.slice(0, 6).map(a => <ArtistCard key={a.id} artist={a} />)}
              </div>
            </section>
          )}
          {(activeCategory === "All" || activeCategory === "Movies") && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Movies & Series</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {mockMovies.slice(0, 6).map(m => <MovieCard key={m.id} movie={m} />)}
              </div>
            </section>
          )}
          {(activeCategory === "All" || activeCategory === "Creators") && (
            <section className="space-y-3 pb-8">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Creators</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
