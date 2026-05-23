import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/studio/uploads - Get creator's uploads
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") // track, album, movie
  const status = searchParams.get("status") // draft, published, processing
  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")

  // Get user's artist profile
  const { data: artist } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .single()

  const uploads: Record<string, unknown[]> = {}

  // Get tracks
  if (!type || type === "track") {
    if (artist) {
      const { data: tracks } = await supabase
        .from("tracks")
        .select("*, album:albums(id, title, cover)")
        .eq("artist_id", artist.id)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1)
      
      uploads.tracks = tracks ?? []
    }
  }

  // Get albums
  if (!type || type === "album") {
    if (artist) {
      const { data: albums } = await supabase
        .from("albums")
        .select("*")
        .eq("artist_id", artist.id)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1)
      
      uploads.albums = albums ?? []
    }
  }

  // Get movies (for filmmakers)
  if (!type || type === "movie") {
    const { data: movies } = await supabase
      .from("movies")
      .select("*")
      .eq("creator_id", user.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)
    
    uploads.movies = movies ?? []
  }

  return NextResponse.json({
    data: uploads,
    isArtist: !!artist
  })
}

// POST /api/studio/uploads - Create new upload
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { type } = body // track, album, movie

  // Get user's artist profile for music uploads
  const { data: artist } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if ((type === "track" || type === "album") && !artist) {
    return NextResponse.json({ error: "Artist profile required for music uploads" }, { status: 400 })
  }

  let result

  switch (type) {
    case "track":
      const { data: track, error: trackError } = await supabase
        .from("tracks")
        .insert({
          artist_id: artist!.id,
          album_id: body.album_id,
          title: body.title,
          cover: body.cover,
          audio_url: body.audio_url,
          preview_url: body.preview_url,
          duration_ms: body.duration_ms,
          track_number: body.track_number,
          genres: body.genres ?? [],
          bpm: body.bpm,
          key: body.key,
          explicit: body.explicit ?? false,
          lyrics: body.lyrics,
          release_date: body.release_date,
        })
        .select()
        .single()
      
      if (trackError) {
        return NextResponse.json({ error: trackError.message }, { status: 500 })
      }
      result = track
      break

    case "album":
      const { data: album, error: albumError } = await supabase
        .from("albums")
        .insert({
          artist_id: artist!.id,
          title: body.title,
          cover: body.cover,
          release_date: body.release_date,
          album_type: body.album_type ?? "album",
          genres: body.genres ?? [],
        })
        .select()
        .single()
      
      if (albumError) {
        return NextResponse.json({ error: albumError.message }, { status: 500 })
      }
      result = album
      break

    case "movie":
      const { data: movie, error: movieError } = await supabase
        .from("movies")
        .insert({
          creator_id: user.id,
          title: body.title,
          poster: body.poster,
          backdrop: body.backdrop,
          trailer_url: body.trailer_url,
          video_url: body.video_url,
          description: body.description,
          release_year: body.release_year,
          duration_minutes: body.duration_minutes,
          genres: body.genres ?? [],
          country: body.country,
          language: body.language,
          rating: body.rating,
          content_type: body.content_type ?? "movie",
          is_premium: body.is_premium ?? false,
        })
        .select()
        .single()
      
      if (movieError) {
        return NextResponse.json({ error: movieError.message }, { status: 500 })
      }
      result = movie
      break

    default:
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 })
  }

  return NextResponse.json({ data: result }, { status: 201 })
}
