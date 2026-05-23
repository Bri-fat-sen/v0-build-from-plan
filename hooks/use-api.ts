"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import type { Track, Album, Artist, Movie, Playlist, Like, Follow, PlayHistory, Notification } from "@/lib/supabase/types"

const supabase = createClient()

// ═══════════════════════════════════════════════════════════════════════════
// Generic fetcher
// ═══════════════════════════════════════════════════════════════════════════

async function apiFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || "API Error")
  }
  const data = await res.json()
  return data.data
}

// ═══════════════════════════════════════════════════════════════════════════
// Tracks
// ═══════════════════════════════════════════════════════════════════════════

export function useTracks(params?: {
  artistId?: string
  albumId?: string
  genre?: string
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.artistId) searchParams.set("artist_id", params.artistId)
  if (params?.albumId) searchParams.set("album_id", params.albumId)
  if (params?.genre) searchParams.set("genre", params.genre)
  if (params?.limit) searchParams.set("limit", String(params.limit))

  const url = `/api/tracks?${searchParams.toString()}`
  return useSWR<Track[]>(url, apiFetcher)
}

export function useTrack(id: string | null) {
  return useSWR<Track>(id ? `/api/tracks/${id}` : null, apiFetcher)
}

// ═══════════════════════════════════════════════════════════════════════════
// Albums
// ═══════════════════════════════════════════════════════════════════════════

export function useAlbums(params?: {
  artistId?: string
  type?: string
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.artistId) searchParams.set("artist_id", params.artistId)
  if (params?.type) searchParams.set("type", params.type)
  if (params?.limit) searchParams.set("limit", String(params.limit))

  const url = `/api/albums?${searchParams.toString()}`
  return useSWR<Album[]>(url, apiFetcher)
}

export function useAlbum(id: string | null) {
  return useSWR<Album & { tracks: Track[] }>(id ? `/api/albums/${id}` : null, apiFetcher)
}

// ═══════════════════════════════════════════════════════════════════════════
// Artists
// ═══════════════════════════════════════════════════════════════════════════

export function useArtists(params?: {
  country?: string
  genre?: string
  verified?: boolean
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.country) searchParams.set("country", params.country)
  if (params?.genre) searchParams.set("genre", params.genre)
  if (params?.verified) searchParams.set("verified", "true")
  if (params?.limit) searchParams.set("limit", String(params.limit))

  const url = `/api/artists?${searchParams.toString()}`
  return useSWR<Artist[]>(url, apiFetcher)
}

export function useArtist(id: string | null) {
  return useSWR<Artist & { albums: Album[]; topTracks: Track[] }>(
    id ? `/api/artists/${id}` : null,
    apiFetcher
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Movies
// ═══════════════════════════════════════════════════════════════════════════

export function useMovies(params?: {
  type?: string
  genre?: string
  country?: string
  premium?: boolean
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.type) searchParams.set("type", params.type)
  if (params?.genre) searchParams.set("genre", params.genre)
  if (params?.country) searchParams.set("country", params.country)
  if (params?.premium !== undefined) searchParams.set("premium", String(params.premium))
  if (params?.limit) searchParams.set("limit", String(params.limit))

  const url = `/api/movies?${searchParams.toString()}`
  return useSWR<Movie[]>(url, apiFetcher)
}

export function useMovie(id: string | null) {
  return useSWR<Movie>(id ? `/api/movies/${id}` : null, apiFetcher)
}

// ═══════════════════════════════════════════════════════════════════════════
// Playlists
// ═══════════════════════════════════════════════════════════════════════════

export function usePlaylists(userId?: string) {
  const searchParams = new URLSearchParams()
  if (userId) searchParams.set("user_id", userId)
  
  const url = `/api/playlists?${searchParams.toString()}`
  return useSWR<Playlist[]>(url, apiFetcher)
}

export function usePlaylist(id: string | null) {
  return useSWR<Playlist & { tracks: Track[] }>(id ? `/api/playlists/${id}` : null, apiFetcher)
}

export async function createPlaylist(data: { title: string; description?: string; is_public?: boolean }) {
  const res = await fetch("/api/playlists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function addToPlaylist(playlistId: string, trackId: string) {
  const res = await fetch(`/api/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id: trackId })
  })
  return res.json()
}

export async function removeFromPlaylist(playlistId: string, trackId: string) {
  const res = await fetch(`/api/playlists/${playlistId}/tracks?track_id=${trackId}`, {
    method: "DELETE"
  })
  return res.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// Likes
// ═══════════════════════════════════════════════════════════════════════════

export function useLikes(type?: string) {
  const url = type ? `/api/likes?type=${type}` : "/api/likes"
  return useSWR<Like[]>(url, apiFetcher)
}

export async function likeContent(contentType: string, contentId: string) {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content_type: contentType, content_id: contentId })
  })
  return res.json()
}

export async function unlikeContent(contentType: string, contentId: string) {
  const res = await fetch(`/api/likes?content_type=${contentType}&content_id=${contentId}`, {
    method: "DELETE"
  })
  return res.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// Follows
// ═══════════════════════════════════════════════════════════════════════════

export function useFollows(type?: string) {
  const url = type ? `/api/follows?type=${type}` : "/api/follows"
  return useSWR<Follow[]>(url, apiFetcher)
}

export async function follow(followingType: string, followingId: string) {
  const res = await fetch("/api/follows", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ following_type: followingType, following_id: followingId })
  })
  return res.json()
}

export async function unfollow(followingType: string, followingId: string) {
  const res = await fetch(`/api/follows?following_type=${followingType}&following_id=${followingId}`, {
    method: "DELETE"
  })
  return res.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// Play History
// ═══════════════════════════════════════════════════════════════════════════

export function usePlayHistory(type?: string, limit?: number) {
  const searchParams = new URLSearchParams()
  if (type) searchParams.set("type", type)
  if (limit) searchParams.set("limit", String(limit))
  
  const url = `/api/history?${searchParams.toString()}`
  return useSWR<PlayHistory[]>(url, apiFetcher)
}

export async function recordPlay(data: {
  content_type: string
  content_id: string
  duration_played_ms?: number
  completed?: boolean
  context_type?: string
  context_id?: string
}) {
  const res = await fetch("/api/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  return res.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// Notifications
// ═══════════════════════════════════════════════════════════════════════════

export function useNotifications(unreadOnly?: boolean) {
  const url = unreadOnly ? "/api/notifications?unread=true" : "/api/notifications"
  return useSWR<{ data: Notification[]; unreadCount: number }>(url, async (url) => {
    const res = await fetch(url)
    return res.json()
  })
}

export async function markNotificationsRead(ids?: string[]) {
  const res = await fetch("/api/notifications", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids ? { ids } : { all: true })
  })
  return res.json()
}

// ═══════════════════════════════════════════════════════════════════════════
// Search
// ═══════════════════════════════════════════════════════════════════════════

export function useSearch(query: string | null, type?: string) {
  const searchParams = new URLSearchParams()
  if (query) searchParams.set("q", query)
  if (type) searchParams.set("type", type)
  
  const url = query ? `/api/search?${searchParams.toString()}` : null
  return useSWR<{
    tracks: Track[]
    albums: Album[]
    artists: Artist[]
    movies: Movie[]
    playlists: Playlist[]
  }>(url, apiFetcher)
}

// ═══════════════════════════════════════════════════════════════════════════
// Recommendations
// ═══════════════════════════════════════════════════════════════════════════

export function useRecommendations(type?: string) {
  const url = type ? `/api/recommendations?type=${type}` : "/api/recommendations?type=mixed"
  return useSWR<{
    tracks?: Track[]
    albums?: Album[]
    artists?: Artist[]
    movies?: Movie[]
  }>(url, apiFetcher)
}

// ═══════════════════════════════════════════════════════════════════════════
// User Profile
// ═══════════════════════════════════════════════════════════════════════════

export function useMe() {
  return useSWR("/api/me", apiFetcher)
}

export function useProfile(id: string | null) {
  return useSWR(id ? `/api/profile/${id}` : null, apiFetcher)
}
