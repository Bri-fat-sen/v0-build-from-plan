import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/search - Search across all content types
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const query = searchParams.get("q")
  const type = searchParams.get("type") // track, album, artist, movie, playlist, podcast, all
  const limit = parseInt(searchParams.get("limit") ?? "10")

  if (!query) {
    return NextResponse.json({ error: "Search query required" }, { status: 400 })
  }

  const searchTerm = `%${query}%`
  const results: Record<string, unknown[]> = {}

  // Search tracks
  if (!type || type === "all" || type === "track") {
    const { data: tracks } = await supabase
      .from("tracks")
      .select("*, artist:artists(id, name, image)")
      .ilike("title", searchTerm)
      .limit(limit)
    results.tracks = tracks ?? []
  }

  // Search albums
  if (!type || type === "all" || type === "album") {
    const { data: albums } = await supabase
      .from("albums")
      .select("*, artist:artists(id, name, image)")
      .ilike("title", searchTerm)
      .limit(limit)
    results.albums = albums ?? []
  }

  // Search artists
  if (!type || type === "all" || type === "artist") {
    const { data: artists } = await supabase
      .from("artists")
      .select("*")
      .ilike("name", searchTerm)
      .limit(limit)
    results.artists = artists ?? []
  }

  // Search movies
  if (!type || type === "all" || type === "movie") {
    const { data: movies } = await supabase
      .from("movies")
      .select("*")
      .ilike("title", searchTerm)
      .limit(limit)
    results.movies = movies ?? []
  }

  // Search playlists
  if (!type || type === "all" || type === "playlist") {
    const { data: playlists } = await supabase
      .from("playlists")
      .select("*, user:profiles(id, display_name, avatar_url)")
      .eq("is_public", true)
      .ilike("title", searchTerm)
      .limit(limit)
    results.playlists = playlists ?? []
  }

  // Search podcasts
  if (!type || type === "all" || type === "podcast") {
    const { data: podcasts } = await supabase
      .from("podcasts")
      .select("*")
      .ilike("title", searchTerm)
      .limit(limit)
    results.podcasts = podcasts ?? []
  }

  // Count total results
  const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0)

  return NextResponse.json({
    data: results,
    query,
    totalResults
  })
}
