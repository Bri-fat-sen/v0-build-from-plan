"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Fuse from "fuse.js"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import {
  mockTracks as tracks,
  mockAlbums as albums,
  mockArtists as artists,
  mockMovies as movies,
  mockCreators as creators,
  mockPlaylists as podcasts,
  type Track,
  type Album,
  type Artist,
  type Movie,
  type Creator,
} from "@/lib/mock-data"

// Podcast type alias (using playlist structure for now)
type Podcast = { id: string; title: string; artist: string; cover: string }

// ─── Search Result Types ──────────────────────────────────────────────────────

export type SearchResultType = "track" | "album" | "artist" | "movie" | "creator" | "podcast" | "all"

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  subtitle: string
  image: string
  score: number
  item: Track | Album | Artist | Movie | Creator | Podcast
}

export interface SearchFilters {
  types: SearchResultType[]
  genre?: string
  year?: number
  country?: string
}

export interface RecentSearch {
  query: string
  timestamp: string
  resultCount: number
}

// ─── Prepare Searchable Data ──────────────────────────────────────────────────

function prepareSearchableItems() {
  const items: Array<{
    id: string
    type: SearchResultType
    title: string
    subtitle: string
    image: string
    searchText: string
    item: Track | Album | Artist | Movie | Creator | Podcast
  }> = []

  // Tracks
  tracks.forEach((track) => {
    items.push({
      id: track.id,
      type: "track",
      title: track.title,
      subtitle: track.artist,
      image: track.coverArt,
      searchText: `${track.title} ${track.artist} ${track.album || ""} ${track.genre}`,
      item: track,
    })
  })

  // Albums
  albums.forEach((album) => {
    items.push({
      id: album.id,
      type: "album",
      title: album.title,
      subtitle: `${album.artist} · ${album.year}`,
      image: album.coverArt,
      searchText: `${album.title} ${album.artist} ${album.year}`,
      item: album,
    })
  })

  // Artists
  artists.forEach((artist) => {
    items.push({
      id: artist.id,
      type: "artist",
      title: artist.name,
      subtitle: artist.genre,
      image: artist.avatar,
      searchText: `${artist.name} ${artist.genre} ${artist.country}`,
      item: artist,
    })
  })

  // Movies
  movies.forEach((movie) => {
    items.push({
      id: movie.id,
      type: "movie",
      title: movie.title,
      subtitle: `${movie.year} · ${movie.genre}`,
      image: movie.poster,
      searchText: `${movie.title} ${movie.director} ${movie.genre} ${movie.year}`,
      item: movie,
    })
  })

  // Creators
  creators.forEach((creator) => {
    items.push({
      id: creator.id,
      type: "creator",
      title: creator.name,
      subtitle: creator.category,
      image: creator.avatar,
      searchText: `${creator.name} ${creator.category}`,
      item: creator,
    })
  })

  // Podcasts
  podcasts.forEach((podcast) => {
    items.push({
      id: podcast.id,
      type: "podcast",
      title: podcast.title,
      subtitle: podcast.host,
      image: podcast.coverArt,
      searchText: `${podcast.title} ${podcast.host} ${podcast.category}`,
      item: podcast,
    })
  })

  return items
}

// ─── Fuse.js Configuration ────────────────────────────────────────────────────

const fuseOptions: Fuse.IFuseOptions<ReturnType<typeof prepareSearchableItems>[0]> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "subtitle", weight: 0.3 },
    { name: "searchText", weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
}

// ─── Search Hook ──────────────────────────────────────────────────────────────

export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [filters, setFilters] = useState<SearchFilters>({ types: [] })

  // Initialize fuse instance
  const fuse = useMemo(() => {
    const items = prepareSearchableItems()
    return new Fuse(items, fuseOptions)
  }, [])

  // Load recent searches on mount
  useEffect(() => {
    storage.get<RecentSearch[]>(STORAGE_KEYS.RECENT_SEARCHES).then((searches) => {
      if (searches) setRecentSearches(searches)
    })
  }, [])

  // Search function
  const search = useCallback(
    (searchQuery: string, searchFilters?: SearchFilters) => {
      const trimmedQuery = searchQuery.trim()
      if (!trimmedQuery || trimmedQuery.length < 2) {
        setResults([])
        return []
      }

      setIsSearching(true)

      const fuseResults = fuse.search(trimmedQuery)
      let searchResults: SearchResult[] = fuseResults.map((result) => ({
        id: result.item.id,
        type: result.item.type,
        title: result.item.title,
        subtitle: result.item.subtitle,
        image: result.item.image,
        score: result.score ?? 1,
        item: result.item.item,
      }))

      // Apply type filters
      const activeFilters = searchFilters || filters
      if (activeFilters.types.length > 0 && !activeFilters.types.includes("all")) {
        searchResults = searchResults.filter((r) => activeFilters.types.includes(r.type))
      }

      setResults(searchResults)
      setIsSearching(false)

      return searchResults
    },
    [fuse, filters]
  )

  // Save search to history
  const saveSearch = useCallback(
    async (searchQuery: string, resultCount: number) => {
      if (!searchQuery.trim()) return

      const newSearch: RecentSearch = {
        query: searchQuery.trim(),
        timestamp: new Date().toISOString(),
        resultCount,
      }

      // Remove duplicates and limit to 10
      const updated = [newSearch, ...recentSearches.filter((s) => s.query !== searchQuery.trim())].slice(0, 10)

      setRecentSearches(updated)
      await storage.set(STORAGE_KEYS.RECENT_SEARCHES, updated)
    },
    [recentSearches]
  )

  // Clear recent searches
  const clearRecentSearches = useCallback(async () => {
    setRecentSearches([])
    await storage.remove(STORAGE_KEYS.RECENT_SEARCHES)
  }, [])

  // Remove single recent search
  const removeRecentSearch = useCallback(
    async (searchQuery: string) => {
      const updated = recentSearches.filter((s) => s.query !== searchQuery)
      setRecentSearches(updated)
      await storage.set(STORAGE_KEYS.RECENT_SEARCHES, updated)
    },
    [recentSearches]
  )

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        search(query)
      } else {
        setResults([])
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [query, search])

  return {
    query,
    setQuery,
    results,
    isSearching,
    search,
    saveSearch,
    recentSearches,
    clearRecentSearches,
    removeRecentSearch,
    filters,
    setFilters,
  }
}

// ─── Trending Searches ────��───────────────────────────────────────────────────

export const trendingSearches = [
  "Burna Boy",
  "Amapiano",
  "Wizkid",
  "Tems",
  "Afrobeats 2024",
  "Nigerian movies",
  "Davido",
  "South African house",
]

// ─── Quick Search Categories ──────────────────────────────────────────────────

export const searchCategories = [
  { id: "tracks", label: "Songs", type: "track" as const },
  { id: "albums", label: "Albums", type: "album" as const },
  { id: "artists", label: "Artists", type: "artist" as const },
  { id: "movies", label: "Movies", type: "movie" as const },
  { id: "creators", label: "Creators", type: "creator" as const },
  { id: "podcasts", label: "Podcasts", type: "podcast" as const },
]
