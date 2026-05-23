"use client"

import { useState, useEffect, useCallback } from "react"
import { storage, STORAGE_KEYS, type PlayHistoryEntry, type ListeningStats } from "@/lib/storage"
import type { Track } from "@/lib/mock-data"

// ─── History Hook ─────────────────────────────────────────────────────────────

export function usePlayHistory() {
  const [history, setHistory] = useState<PlayHistoryEntry[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load history on mount
  useEffect(() => {
    storage.get<PlayHistoryEntry[]>(STORAGE_KEYS.PLAY_HISTORY).then((data) => {
      if (data) setHistory(data)
      setIsLoaded(true)
    })
  }, [])

  // Add to history
  const addToHistory = useCallback(
    async (track: Track, durationPlayed: number, completed: boolean) => {
      const entry: PlayHistoryEntry = {
        contentId: track.id,
        contentType: "track",
        playedAt: new Date().toISOString(),
        duration: durationPlayed,
        completed,
      }

      // Remove duplicate if exists (same track played recently)
      const filtered = history.filter(
        (h) => !(h.contentId === track.id && Date.now() - new Date(h.playedAt).getTime() < 60000)
      )

      // Limit to 500 entries
      const updated = [entry, ...filtered].slice(0, 500)
      setHistory(updated)
      await storage.set(STORAGE_KEYS.PLAY_HISTORY, updated)

      return entry
    },
    [history]
  )

  // Get recent plays (last 24 hours)
  const getRecentPlays = useCallback(
    (limit = 20) => {
      const dayAgo = Date.now() - 24 * 60 * 60 * 1000
      return history.filter((h) => new Date(h.playedAt).getTime() > dayAgo).slice(0, limit)
    },
    [history]
  )

  // Get unique track IDs from history
  const getUniqueTrackIds = useCallback(
    (limit = 50) => {
      const seen = new Set<string>()
      const unique: string[] = []
      for (const entry of history) {
        if (!seen.has(entry.contentId)) {
          seen.add(entry.contentId)
          unique.push(entry.contentId)
          if (unique.length >= limit) break
        }
      }
      return unique
    },
    [history]
  )

  // Clear history
  const clearHistory = useCallback(async () => {
    setHistory([])
    await storage.remove(STORAGE_KEYS.PLAY_HISTORY)
  }, [])

  return {
    history,
    isLoaded,
    addToHistory,
    getRecentPlays,
    getUniqueTrackIds,
    clearHistory,
  }
}

// ─── Listening Stats Hook ─────────────────────────────────────────────────────

const DEFAULT_STATS: ListeningStats = {
  totalMinutes: 0,
  totalTracks: 0,
  totalSessions: 0,
  topGenres: [],
  topArtists: [],
  streakDays: 0,
  lastListenedAt: "",
}

export function useListeningStats() {
  const [stats, setStats] = useState<ListeningStats>(DEFAULT_STATS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load stats on mount
  useEffect(() => {
    storage.get<ListeningStats>(STORAGE_KEYS.LISTENING_STATS).then((data) => {
      if (data) setStats(data)
      setIsLoaded(true)
    })
  }, [])

  // Record a play session
  const recordPlay = useCallback(
    async (track: Track, durationSeconds: number) => {
      const minutes = Math.round(durationSeconds / 60)
      const today = new Date().toDateString()
      const lastDay = stats.lastListenedAt ? new Date(stats.lastListenedAt).toDateString() : ""

      // Calculate streak
      let newStreak = stats.streakDays
      if (lastDay !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        newStreak = lastDay === yesterday ? stats.streakDays + 1 : 1
      }

      // Update genre stats
      const genreIndex = stats.topGenres.findIndex((g) => g.genre === track.genre)
      const updatedGenres = [...stats.topGenres]
      if (genreIndex >= 0) {
        updatedGenres[genreIndex].minutes += minutes
      } else {
        updatedGenres.push({ genre: track.genre, minutes })
      }
      updatedGenres.sort((a, b) => b.minutes - a.minutes)

      // Update artist stats
      const artistIndex = stats.topArtists.findIndex((a) => a.artistId === track.artist)
      const updatedArtists = [...stats.topArtists]
      if (artistIndex >= 0) {
        updatedArtists[artistIndex].minutes += minutes
      } else {
        updatedArtists.push({ artistId: track.artist, minutes })
      }
      updatedArtists.sort((a, b) => b.minutes - a.minutes)

      const updated: ListeningStats = {
        totalMinutes: stats.totalMinutes + minutes,
        totalTracks: stats.totalTracks + 1,
        totalSessions: lastDay !== today ? stats.totalSessions + 1 : stats.totalSessions,
        topGenres: updatedGenres.slice(0, 10),
        topArtists: updatedArtists.slice(0, 10),
        streakDays: newStreak,
        lastListenedAt: new Date().toISOString(),
      }

      setStats(updated)
      await storage.set(STORAGE_KEYS.LISTENING_STATS, updated)

      return updated
    },
    [stats]
  )

  // Get top genre
  const getTopGenre = useCallback(() => {
    return stats.topGenres[0]?.genre || "None yet"
  }, [stats.topGenres])

  // Get listening time formatted
  const getFormattedTime = useCallback(() => {
    const hours = Math.floor(stats.totalMinutes / 60)
    const mins = stats.totalMinutes % 60
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }, [stats.totalMinutes])

  // Reset stats
  const resetStats = useCallback(async () => {
    setStats(DEFAULT_STATS)
    await storage.remove(STORAGE_KEYS.LISTENING_STATS)
  }, [])

  return {
    stats,
    isLoaded,
    recordPlay,
    getTopGenre,
    getFormattedTime,
    resetStats,
  }
}

// ─── Queue Hook ───────────────────────────────────────────────────────────────

interface QueueState {
  tracks: Track[]
  currentIndex: number
}

export function useQueue() {
  const [queue, setQueue] = useState<QueueState>({ tracks: [], currentIndex: 0 })

  // Load queue on mount
  useEffect(() => {
    storage.get<QueueState>(STORAGE_KEYS.QUEUE).then((data) => {
      if (data) setQueue(data)
    })
  }, [])

  // Save queue
  const saveQueue = useCallback(async (newQueue: QueueState) => {
    setQueue(newQueue)
    await storage.set(STORAGE_KEYS.QUEUE, newQueue)
  }, [])

  // Add track to queue
  const addToQueue = useCallback(
    async (track: Track) => {
      const updated = { ...queue, tracks: [...queue.tracks, track] }
      await saveQueue(updated)
    },
    [queue, saveQueue]
  )

  // Add track to play next
  const playNext = useCallback(
    async (track: Track) => {
      const updated = {
        ...queue,
        tracks: [
          ...queue.tracks.slice(0, queue.currentIndex + 1),
          track,
          ...queue.tracks.slice(queue.currentIndex + 1),
        ],
      }
      await saveQueue(updated)
    },
    [queue, saveQueue]
  )

  // Remove from queue
  const removeFromQueue = useCallback(
    async (index: number) => {
      const updated = {
        tracks: queue.tracks.filter((_, i) => i !== index),
        currentIndex: index < queue.currentIndex ? queue.currentIndex - 1 : queue.currentIndex,
      }
      await saveQueue(updated)
    },
    [queue, saveQueue]
  )

  // Clear queue
  const clearQueue = useCallback(async () => {
    await saveQueue({ tracks: [], currentIndex: 0 })
  }, [saveQueue])

  // Set queue
  const setTracks = useCallback(
    async (tracks: Track[], startIndex = 0) => {
      await saveQueue({ tracks, currentIndex: startIndex })
    },
    [saveQueue]
  )

  // Move to next
  const next = useCallback(async () => {
    if (queue.currentIndex < queue.tracks.length - 1) {
      await saveQueue({ ...queue, currentIndex: queue.currentIndex + 1 })
      return queue.tracks[queue.currentIndex + 1]
    }
    return null
  }, [queue, saveQueue])

  // Move to previous
  const previous = useCallback(async () => {
    if (queue.currentIndex > 0) {
      await saveQueue({ ...queue, currentIndex: queue.currentIndex - 1 })
      return queue.tracks[queue.currentIndex - 1]
    }
    return null
  }, [queue, saveQueue])

  // Shuffle queue
  const shuffle = useCallback(async () => {
    const currentTrack = queue.tracks[queue.currentIndex]
    const otherTracks = queue.tracks.filter((_, i) => i !== queue.currentIndex)
    
    // Fisher-Yates shuffle
    for (let i = otherTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[otherTracks[i], otherTracks[j]] = [otherTracks[j], otherTracks[i]]
    }

    await saveQueue({
      tracks: [currentTrack, ...otherTracks],
      currentIndex: 0,
    })
  }, [queue, saveQueue])

  return {
    queue: queue.tracks,
    currentIndex: queue.currentIndex,
    currentTrack: queue.tracks[queue.currentIndex] || null,
    addToQueue,
    playNext,
    removeFromQueue,
    clearQueue,
    setTracks,
    next,
    previous,
    shuffle,
    hasNext: queue.currentIndex < queue.tracks.length - 1,
    hasPrevious: queue.currentIndex > 0,
  }
}
