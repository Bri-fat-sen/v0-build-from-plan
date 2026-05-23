"use client"

import { useMemo } from "react"
import { tracks, albums, artists, movies, creators, type Track, type Album, type Artist, type Movie, type Creator } from "@/lib/mock-data"
import { useLibrary } from "@/hooks/use-library"
import { usePlayHistory, useListeningStats } from "@/hooks/use-history"

// ─── Recommendation Types ─────────────────────────────────────────────────────

export interface Recommendation<T> {
  item: T
  score: number
  reason: string
}

// ─── Scoring Helpers ──────────────────────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ─── Track Recommendations ────────────────────────────────────────────────────

export function useTrackRecommendations(limit = 20) {
  const { likedItems, followedItems } = useLibrary()
  const { history } = usePlayHistory()
  const { stats } = useListeningStats()

  return useMemo(() => {
    const recommendations: Recommendation<Track>[] = []
    const likedTrackIds = new Set(likedItems.filter((l) => l.contentType === "track").map((l) => l.contentId))
    const playedTrackIds = new Set(history.map((h) => h.contentId))
    const followedArtistNames = new Set(
      followedItems
        .filter((f) => f.contentType === "artist")
        .map((f) => artists.find((a) => a.id === f.contentId)?.name)
        .filter(Boolean)
    )
    const topGenres = stats.topGenres.slice(0, 3).map((g) => g.genre)

    for (const track of tracks) {
      // Skip already liked or recently played
      if (likedTrackIds.has(track.id)) continue

      let score = 0
      let reason = ""

      // Boost by followed artist
      if (followedArtistNames.has(track.artist)) {
        score += 40
        reason = `From ${track.artist}, an artist you follow`
      }

      // Boost by genre preference
      if (topGenres.includes(track.genre)) {
        score += 30
        if (!reason) reason = `Matches your top genre: ${track.genre}`
      }

      // Boost popular tracks slightly
      score += Math.min(track.plays / 1000000, 20)

      // Penalize recently played
      if (playedTrackIds.has(track.id)) {
        score -= 50
      }

      // Add some randomness
      score += Math.random() * 10

      if (score > 0) {
        recommendations.push({
          item: track,
          score,
          reason: reason || "Popular in your region",
        })
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [likedItems, followedItems, history, stats.topGenres, limit])
}

// ─── Album Recommendations ────────────────────────────────────────────────────

export function useAlbumRecommendations(limit = 10) {
  const { followedItems } = useLibrary()
  const { stats } = useListeningStats()

  return useMemo(() => {
    const recommendations: Recommendation<Album>[] = []
    const followedArtistNames = new Set(
      followedItems
        .filter((f) => f.contentType === "artist")
        .map((f) => artists.find((a) => a.id === f.contentId)?.name)
        .filter(Boolean)
    )
    const topGenres = stats.topGenres.slice(0, 3).map((g) => g.genre)

    for (const album of albums) {
      let score = 0
      let reason = ""

      // Boost by followed artist
      if (followedArtistNames.has(album.artist)) {
        score += 50
        reason = `New from ${album.artist}`
      }

      // Boost recent releases
      const yearsOld = new Date().getFullYear() - album.year
      if (yearsOld <= 1) {
        score += 30
        if (!reason) reason = "Recent release"
      }

      // Add some randomness
      score += Math.random() * 15

      if (score > 0 || Math.random() > 0.7) {
        recommendations.push({
          item: album,
          score: score || 10,
          reason: reason || "You might like this",
        })
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [followedItems, stats.topGenres, limit])
}

// ─── Artist Recommendations ───────────────────────────────────────────────────

export function useArtistRecommendations(limit = 10) {
  const { followedItems } = useLibrary()
  const { stats } = useListeningStats()

  return useMemo(() => {
    const recommendations: Recommendation<Artist>[] = []
    const followedIds = new Set(followedItems.filter((f) => f.contentType === "artist").map((f) => f.contentId))
    const topGenres = stats.topGenres.slice(0, 3).map((g) => g.genre)

    for (const artist of artists) {
      // Skip already followed
      if (followedIds.has(artist.id)) continue

      let score = 0
      let reason = ""

      // Boost by genre match
      if (topGenres.includes(artist.genre)) {
        score += 40
        reason = `Similar to artists you like`
      }

      // Boost verified artists slightly
      if (artist.verified) {
        score += 10
      }

      // Boost by follower count
      score += Math.min(artist.followers / 100000, 20)

      // Add randomness
      score += Math.random() * 15

      if (score > 0) {
        recommendations.push({
          item: artist,
          score,
          reason: reason || "Rising artist",
        })
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [followedItems, stats.topGenres, limit])
}

// ─── Movie Recommendations ────────────────────────────────────────────────────

export function useMovieRecommendations(limit = 10) {
  const { likedItems } = useLibrary()

  return useMemo(() => {
    const recommendations: Recommendation<Movie>[] = []
    const likedMovieIds = new Set(likedItems.filter((l) => l.contentType === "movie").map((l) => l.contentId))

    // Get genres from liked movies
    const likedGenres = new Set(
      likedItems
        .filter((l) => l.contentType === "movie")
        .map((l) => movies.find((m) => m.id === l.contentId)?.genre)
        .filter(Boolean)
    )

    for (const movie of movies) {
      if (likedMovieIds.has(movie.id)) continue

      let score = 0
      let reason = ""

      // Boost by genre match
      if (likedGenres.has(movie.genre)) {
        score += 35
        reason = `Based on your ${movie.genre} movies`
      }

      // Boost high-rated movies
      const rating = parseFloat(movie.rating)
      if (rating >= 8) {
        score += 25
        if (!reason) reason = "Highly rated"
      }

      // Boost recent movies
      const yearsOld = new Date().getFullYear() - movie.year
      if (yearsOld <= 2) {
        score += 15
      }

      // Add randomness
      score += Math.random() * 20

      recommendations.push({
        item: movie,
        score: Math.max(score, 5),
        reason: reason || "Trending now",
      })
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [likedItems, limit])
}

// ─── Creator Recommendations ──────────────────────────────────────────────────

export function useCreatorRecommendations(limit = 10) {
  const { followedItems } = useLibrary()

  return useMemo(() => {
    const recommendations: Recommendation<Creator>[] = []
    const followedIds = new Set(followedItems.filter((f) => f.contentType === "creator").map((f) => f.contentId))

    // Get categories from followed creators
    const followedCategories = new Set(
      followedItems
        .filter((f) => f.contentType === "creator")
        .map((f) => creators.find((c) => c.id === f.contentId)?.category)
        .filter(Boolean)
    )

    for (const creator of creators) {
      if (followedIds.has(creator.id)) continue

      let score = 0
      let reason = ""

      // Boost by category match
      if (followedCategories.has(creator.category)) {
        score += 40
        reason = `Similar to creators you follow`
      }

      // Boost verified creators
      if (creator.verified) {
        score += 15
      }

      // Boost by subscriber count
      score += Math.min(creator.subscribers / 50000, 25)

      // Add randomness
      score += Math.random() * 15

      recommendations.push({
        item: creator,
        score: Math.max(score, 5),
        reason: reason || "Rising creator",
      })
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [followedItems, limit])
}

// ─── "For You" Mix ────────────────────────────────────────────────────────────

export function useForYouMix(limit = 30) {
  const trackRecs = useTrackRecommendations(limit)
  
  return useMemo(() => {
    // Shuffle to create a varied playlist feel
    return shuffleArray(trackRecs).slice(0, limit)
  }, [trackRecs, limit])
}

// ─── Similar Tracks ───────────────────────────────────────────────────────────

export function useSimilarTracks(trackId: string, limit = 10) {
  return useMemo(() => {
    const sourceTrack = tracks.find((t) => t.id === trackId)
    if (!sourceTrack) return []

    const similar: Recommendation<Track>[] = []

    for (const track of tracks) {
      if (track.id === trackId) continue

      let score = 0
      let reason = ""

      // Same artist
      if (track.artist === sourceTrack.artist) {
        score += 50
        reason = `More from ${track.artist}`
      }

      // Same genre
      if (track.genre === sourceTrack.genre) {
        score += 30
        if (!reason) reason = `Similar ${track.genre} vibes`
      }

      // Add randomness
      score += Math.random() * 10

      if (score > 0) {
        similar.push({ item: track, score, reason: reason || "You might like" })
      }
    }

    return similar
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }, [trackId, limit])
}

// ─── Daily Mix Generator ──────────────────────────────────────────────────────

export function useDailyMixes() {
  const { stats } = useListeningStats()

  return useMemo(() => {
    const mixes: Array<{ id: string; title: string; description: string; tracks: Track[] }> = []
    const genres = stats.topGenres.slice(0, 3).map((g) => g.genre)

    // Create a mix for each top genre
    genres.forEach((genre, i) => {
      const genreTracks = shuffleArray(tracks.filter((t) => t.genre === genre)).slice(0, 25)
      if (genreTracks.length >= 5) {
        mixes.push({
          id: `daily-mix-${i + 1}`,
          title: `Daily Mix ${i + 1}`,
          description: `${genre} and more`,
          tracks: genreTracks,
        })
      }
    })

    // Add a discovery mix
    const discoveryTracks = shuffleArray(tracks).slice(0, 25)
    mixes.push({
      id: "discovery-mix",
      title: "Discover Weekly",
      description: "Fresh picks for you",
      tracks: discoveryTracks,
    })

    return mixes
  }, [stats.topGenres])
}
