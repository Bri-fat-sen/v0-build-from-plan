import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/tracks - List tracks with optional filters
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")
  const artistId = searchParams.get("artist_id")
  const albumId = searchParams.get("album_id")
  const genre = searchParams.get("genre")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") ?? "created_at"
  const order = searchParams.get("order") ?? "desc"

  let query = supabase
    .from("tracks")
    .select("*, artist:artists(*), album:albums(*)", { count: "exact" })

  if (artistId) query = query.eq("artist_id", artistId)
  if (albumId) query = query.eq("album_id", albumId)
  if (genre) query = query.contains("genres", [genre])
  if (search) query = query.ilike("title", `%${search}%`)

  query = query
    .order(sort, { ascending: order === "asc" })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    pagination: { total: count, limit, offset }
  })
}

// POST /api/tracks - Create a new track (authenticated artists only)
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  
  // Verify user owns the artist
  const { data: artist } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .eq("id", body.artist_id)
    .single()

  if (!artist) {
    return NextResponse.json({ error: "Artist not found or unauthorized" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("tracks")
    .insert({
      artist_id: body.artist_id,
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
    .select("*, artist:artists(*), album:albums(*)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
