import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/recommendations - Get personalized recommendations
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const type = searchParams.get("type") // tracks, albums, artists, movies, mixed
  const limit = parseInt(searchParams.get("limit") ?? "20")
  const seed = searchParams.get("seed") // artist_id, genre, etc.

  const { data: { user } } = await supabase.auth.getUser()

  // If authenticated, get personalized recommendations
  if (user) {
    // Get user's listening history and preferences
    const [likesResult, historyResult, followsResult] = await Promise.all([
      supabase.from("likes").select("content_type, content_id").eq("user_id", user.id).limit(50),
      supabase.from("play_history").select("content_type, content_id").eq("user_id", user.id).order("played_at", { ascending: false }).limit(100),
      supabase.from("follows").select("following_type, following_id").eq("follower_id", user.id)
    ])

    const likedTrackIds = likesResult.data?.filter(l => l.content_type === "track").map(l => l.content_id) ?? []
    const playedTrackIds = historyResult.data?.filter(h => h.content_type === "track").map(h => h.content_id) ?? []
    const followedArtistIds = followsResult.data?.filter(f => f.following_type === "artist").map(f => f.following_id) ?? []

    // Get genres from liked tracks
    let preferredGenres: string[] = []
    if (likedTrackIds.length > 0) {
      const { data: likedTracks } = await supabase
        .from("tracks")
        .select("genres")
        .in("id", likedTrackIds.slice(0, 20))
      
      const genreCounts: Record<string, number> = {}
      likedTracks?.forEach(t => {
        t.genres?.forEach((g: string) => {
          genreCounts[g] = (genreCounts[g] ?? 0) + 1
        })
      })
      preferredGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([genre]) => genre)
    }

    const recommendations: Record<string, unknown[]> = {}

    // Recommend tracks
    if (!type || type === "tracks" || type === "mixed") {
      let tracksQuery = supabase
        .from("tracks")
        .select("*, artist:artists(id, name, image)")
        .order("total_streams", { ascending: false })
        .limit(limit)

      // Exclude already played/liked
      const excludeIds = [...new Set([...likedTrackIds, ...playedTrackIds])].slice(0, 100)
      if (excludeIds.length > 0) {
        tracksQuery = tracksQuery.not("id", "in", `(${excludeIds.join(",")})`)
      }

      // Prioritize followed artists
      if (followedArtistIds.length > 0) {
        const { data: artistTracks } = await supabase
          .from("tracks")
          .select("*, artist:artists(id, name, image)")
          .in("artist_id", followedArtistIds)
          .not("id", "in", `(${excludeIds.join(",")})`)
          .limit(Math.floor(limit / 2))

        const { data: otherTracks } = await tracksQuery.limit(Math.ceil(limit / 2))
        recommendations.tracks = [...(artistTracks ?? []), ...(otherTracks ?? [])]
      } else {
        const { data: tracks } = await tracksQuery
        recommendations.tracks = tracks ?? []
      }
    }

    // Recommend albums
    if (!type || type === "albums" || type === "mixed") {
      let albumsQuery = supabase
        .from("albums")
        .select("*, artist:artists(id, name, image)")
        .order("total_streams", { ascending: false })
        .limit(type === "mixed" ? 10 : limit)

      if (followedArtistIds.length > 0) {
        albumsQuery = albumsQuery.in("artist_id", followedArtistIds)
      }

      const { data: albums } = await albumsQuery
      recommendations.albums = albums ?? []
    }

    // Recommend artists
    if (!type || type === "artists" || type === "mixed") {
      const excludeArtistIds = followedArtistIds.slice(0, 50)
      let artistsQuery = supabase
        .from("artists")
        .select("*")
        .order("monthly_listeners", { ascending: false })
        .limit(type === "mixed" ? 10 : limit)

      if (excludeArtistIds.length > 0) {
        artistsQuery = artistsQuery.not("id", "in", `(${excludeArtistIds.join(",")})`)
      }

      // Filter by preferred genres if available
      if (preferredGenres.length > 0) {
        artistsQuery = artistsQuery.overlaps("genres", preferredGenres)
      }

      const { data: artists } = await artistsQuery
      recommendations.artists = artists ?? []
    }

    // Recommend movies
    if (!type || type === "movies" || type === "mixed") {
      const { data: movies } = await supabase
        .from("movies")
        .select("*")
        .order("total_views", { ascending: false })
        .limit(type === "mixed" ? 10 : limit)

      recommendations.movies = movies ?? []
    }

    return NextResponse.json({
      data: recommendations,
      personalized: true,
      preferredGenres
    })
  }

  // Non-authenticated: return trending content
  const trending: Record<string, unknown[]> = {}

  if (!type || type === "tracks" || type === "mixed") {
    const { data: tracks } = await supabase
      .from("tracks")
      .select("*, artist:artists(id, name, image)")
      .order("total_streams", { ascending: false })
      .limit(limit)
    trending.tracks = tracks ?? []
  }

  if (!type || type === "albums" || type === "mixed") {
    const { data: albums } = await supabase
      .from("albums")
      .select("*, artist:artists(id, name, image)")
      .order("release_date", { ascending: false })
      .limit(type === "mixed" ? 10 : limit)
    trending.albums = albums ?? []
  }

  if (!type || type === "artists" || type === "mixed") {
    const { data: artists } = await supabase
      .from("artists")
      .select("*")
      .order("monthly_listeners", { ascending: false })
      .limit(type === "mixed" ? 10 : limit)
    trending.artists = artists ?? []
  }

  if (!type || type === "movies" || type === "mixed") {
    const { data: movies } = await supabase
      .from("movies")
      .select("*")
      .order("total_views", { ascending: false })
      .limit(type === "mixed" ? 10 : limit)
    trending.movies = movies ?? []
  }

  return NextResponse.json({
    data: trending,
    personalized: false
  })
}
