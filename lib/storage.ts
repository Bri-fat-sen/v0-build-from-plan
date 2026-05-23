"use client"

// ─── Storage Abstraction Layer ────────────────────────────────────────────────
// Provides a unified interface for data persistence. Currently uses localStorage
// but can be swapped to Supabase/any DB by changing the adapter.

type StorageAdapter = {
  get: <T>(key: string) => Promise<T | null>
  set: <T>(key: string, value: T) => Promise<void>
  remove: (key: string) => Promise<void>
  keys: () => Promise<string[]>
}

// localStorage adapter (default)
const localStorageAdapter: StorageAdapter = {
  get: async <T>(key: string): Promise<T | null> => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(`afristream:${key}`)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(`afristream:${key}`, JSON.stringify(value))
    } catch (e) {
      console.warn("[Storage] Failed to save:", key, e)
    }
  },
  remove: async (key: string): Promise<void> => {
    if (typeof window === "undefined") return
    localStorage.removeItem(`afristream:${key}`)
  },
  keys: async (): Promise<string[]> => {
    if (typeof window === "undefined") return []
    return Object.keys(localStorage)
      .filter((k) => k.startsWith("afristream:"))
      .map((k) => k.replace("afristream:", ""))
  },
}

// Current adapter (can be swapped to Supabase adapter later)
let currentAdapter: StorageAdapter = localStorageAdapter

export const storage = {
  get: <T>(key: string) => currentAdapter.get<T>(key),
  set: <T>(key: string, value: T) => currentAdapter.set(key, value),
  remove: (key: string) => currentAdapter.remove(key),
  keys: () => currentAdapter.keys(),
  setAdapter: (adapter: StorageAdapter) => {
    currentAdapter = adapter
  },
}

// ─── Core Content Types ───────────────────────────────────────────────────────

export interface ContentBase {
  id: string
  type: "track" | "album" | "artist" | "movie" | "creator" | "podcast" | "episode" | "playlist" | "event"
  title: string
  image: string
  createdAt?: string
}

export interface TrackContent extends ContentBase {
  type: "track"
  artist: string
  artistId: string
  album?: string
  albumId?: string
  duration: string
  audioUrl?: string
}

export interface AlbumContent extends ContentBase {
  type: "album"
  artist: string
  artistId: string
  year: number
  trackCount: number
}

export interface ArtistContent extends ContentBase {
  type: "artist"
  genre: string
  followers: number
  verified?: boolean
}

export interface MovieContent extends ContentBase {
  type: "movie"
  year: number
  duration: string
  rating: string
  genre: string
}

export interface CreatorContent extends ContentBase {
  type: "creator"
  category: string
  subscribers: number
  verified?: boolean
}

export interface PodcastContent extends ContentBase {
  type: "podcast"
  host: string
  episodeCount: number
  category: string
}

export interface EpisodeContent extends ContentBase {
  type: "episode"
  podcastId: string
  podcastTitle: string
  duration: string
  releaseDate: string
}

export interface PlaylistContent extends ContentBase {
  type: "playlist"
  curator: string
  trackCount: number
  isPublic: boolean
}

export interface EventContent extends ContentBase {
  type: "event"
  date: string
  venue: string
  ticketPrice?: number
  isLive?: boolean
}

export type AnyContent =
  | TrackContent
  | AlbumContent
  | ArtistContent
  | MovieContent
  | CreatorContent
  | PodcastContent
  | EpisodeContent
  | PlaylistContent
  | EventContent

// ─── User Activity Types ──────────────────────────────────────────────────────

export interface PlayHistoryEntry {
  contentId: string
  contentType: "track" | "episode"
  playedAt: string
  duration: number // seconds played
  completed: boolean
}

export interface WatchHistoryEntry {
  contentId: string
  contentType: "movie" | "short"
  watchedAt: string
  progress: number // 0-100
  duration: number // total duration in seconds
}

export interface LikedItem {
  contentId: string
  contentType: AnyContent["type"]
  likedAt: string
}

export interface FollowedItem {
  contentId: string
  contentType: "artist" | "creator" | "podcast"
  followedAt: string
}

export interface SavedItem {
  contentId: string
  contentType: AnyContent["type"]
  savedAt: string
  collectionId?: string // optional playlist/collection
}

export interface ListeningStats {
  totalMinutes: number
  totalTracks: number
  totalSessions: number
  topGenres: { genre: string; minutes: number }[]
  topArtists: { artistId: string; minutes: number }[]
  streakDays: number
  lastListenedAt: string
}

export interface Notification {
  id: string
  type: "new_release" | "live_event" | "followed_activity" | "recommendation" | "achievement" | "system"
  title: string
  message: string
  image?: string
  link?: string
  read: boolean
  createdAt: string
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  PLAY_HISTORY: "play_history",
  WATCH_HISTORY: "watch_history",
  LIKED_ITEMS: "liked_items",
  FOLLOWED_ITEMS: "followed_items",
  SAVED_ITEMS: "saved_items",
  LISTENING_STATS: "listening_stats",
  NOTIFICATIONS: "notifications",
  PLAYLISTS: "playlists",
  QUEUE: "queue",
  PREFERENCES: "preferences",
  RECENT_SEARCHES: "recent_searches",
} as const

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(date).toLocaleDateString()
}
