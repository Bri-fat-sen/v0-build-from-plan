"use client"

import { useState } from "react"
import { useSearch, trendingSearches, searchCategories, type SearchResultType } from "@/hooks/use-search"
import { TrackRow, ArtistCard, MovieCard, CreatorCard, AlbumCard } from "@/components/content-card"
import { cn } from "@/lib/utils"
import { Search, TrendingUp, X, Clock, Mic2, Film, User, Radio, Disc } from "lucide-react"
import { SafeImage } from "@/components/safe-image"
import { genres, type Track, type Album, type Artist, type Movie, type Creator, type Podcast } from "@/lib/mock-data"
import Link from "next/link"

const categoryIcons: Record<string, React.ReactNode> = {
  track: <Mic2 className="size-4" />,
  album: <Disc className="size-4" />,
  artist: <User className="size-4" />,
  movie: <Film className="size-4" />,
  creator: <User className="size-4" />,
  podcast: <Radio className="size-4" />,
}

export default function SearchPage() {
  const {
    query,
    setQuery,
    results,
    isSearching,
    saveSearch,
    recentSearches,
    clearRecentSearches,
    removeRecentSearch,
    filters,
    setFilters,
  } = useSearch()

  const [activeCategory, setActiveCategory] = useState<SearchResultType | "all">("all")
  const hasQuery = query.length > 0

  // Filter results by category
  const filteredResults =
    activeCategory === "all" ? results : results.filter((r) => r.type === activeCategory)

  // Group results by type
  const trackResults = results.filter((r) => r.type === "track")
  const albumResults = results.filter((r) => r.type === "album")
  const artistResults = results.filter((r) => r.type === "artist")
  const movieResults = results.filter((r) => r.type === "movie")
  const creatorResults = results.filter((r) => r.type === "creator")
  const podcastResults = results.filter((r) => r.type === "podcast")

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm)
  }

  const handleSearchSubmit = () => {
    if (query.trim() && results.length > 0) {
      saveSearch(query, results.length)
    }
  }

  return (
    <div className="min-h-screen space-y-6 py-4 pb-32">
      {/* Search Bar */}
      <div className="px-4 lg:px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="Search music, movies, creators, podcasts..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {hasQuery && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
          )}
        >
          All
        </button>
        {searchCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.type)}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat.type
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            )}
          >
            {categoryIcons[cat.type]}
            {cat.label}
          </button>
        ))}
      </div>

      {!hasQuery ? (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground">Recent Searches</h2>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1 px-4 lg:px-6">
                {recentSearches.slice(0, 5).map((search) => (
                  <div
                    key={search.query}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10"
                  >
                    <button
                      onClick={() => handleSearch(search.query)}
                      className="flex items-center gap-3 text-left"
                    >
                      <Clock className="size-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{search.query}</span>
                      <span className="text-xs text-muted-foreground">{search.resultCount} results</span>
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search.query)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trending Searches */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-4 lg:px-6">
              <TrendingUp className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Trending Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2 px-4 lg:px-6">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-white/10"
                >
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
                <button
                  key={genre}
                  onClick={() => handleSearch(genre)}
                  className="relative overflow-hidden rounded-xl border border-white/10 p-4 text-left transition-all hover:border-primary/50 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, hsl(${i * 25}, 60%, 12%) 0%, hsl(${i * 25}, 40%, 8%) 100%)` }}
                >
                  <p className="text-sm font-medium text-foreground">{genre}</p>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Search Results Count */}
          <div className="px-4 lg:px-6">
            <p className="text-sm text-muted-foreground">
              {isSearching ? "Searching..." : `${filteredResults.length} results for "${query}"`}
            </p>
          </div>

          {/* Results by Category */}
          {(activeCategory === "all" || activeCategory === "track") && trackResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Songs</h2>
              <div className="px-4 lg:px-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  {trackResults.slice(0, 5).map((r, i) => (
                    <TrackRow key={r.id} track={r.item as Track} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {(activeCategory === "all" || activeCategory === "album") && albumResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Albums</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {albumResults.slice(0, 8).map((r) => (
                  <AlbumCard key={r.id} album={r.item as Album} />
                ))}
              </div>
            </section>
          )}

          {(activeCategory === "all" || activeCategory === "artist") && artistResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Artists</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {artistResults.slice(0, 8).map((r) => (
                  <ArtistCard key={r.id} artist={r.item as Artist} />
                ))}
              </div>
            </section>
          )}

          {(activeCategory === "all" || activeCategory === "movie") && movieResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Movies & Series</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {movieResults.slice(0, 8).map((r) => (
                  <MovieCard key={r.id} movie={r.item as Movie} />
                ))}
              </div>
            </section>
          )}

          {(activeCategory === "all" || activeCategory === "creator") && creatorResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Creators</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
                {creatorResults.slice(0, 8).map((r) => (
                  <CreatorCard key={r.id} creator={r.item as Creator} />
                ))}
              </div>
            </section>
          )}

          {(activeCategory === "all" || activeCategory === "podcast") && podcastResults.length > 0 && (
            <section className="space-y-3 pb-8">
              <h2 className="px-4 text-sm font-semibold text-foreground lg:px-6">Podcasts</h2>
              <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
                {podcastResults.slice(0, 8).map((r) => {
                  const podcast = r.item as Podcast
                  return (
                    <Link
                      key={r.id}
                      href={`/podcasts/${podcast.id}`}
                      className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-primary/50"
                    >
                      <div className="relative aspect-square">
                        <SafeImage
                          src={podcast.coverArt}
                          alt={podcast.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          fallbackType="music"
                        />
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-medium text-foreground">{podcast.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{podcast.host}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* No Results */}
          {filteredResults.length === 0 && !isSearching && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="mb-4 size-12 text-muted-foreground/50" />
              <h3 className="text-lg font-medium text-foreground">No results found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try different keywords or browse by genre
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
