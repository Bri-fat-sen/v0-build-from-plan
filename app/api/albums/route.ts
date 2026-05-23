import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/albums - List albums
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")
  const artistId = searchParams.get("artist_id")
  const type = searchParams.get("type") // album, single, ep, compilation
  const genre = searchParams.get("genre")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") ?? "release_date"
  const order = searchParams.get("order") ?? "desc"

  let query = supabase
    .from("albums")
    .select("*, artist:artists(*)", { count: "exact" })

  if (artistId) query = query.eq("artist_id", artistId)
  if (type) query = query.eq("album_type", type)
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

// POST /api/albums - Create album
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("albums")
    .insert({
      artist_id: body.artist_id,
      title: body.title,
      cover: body.cover,
      release_date: body.release_date,
      album_type: body.album_type ?? "album",
      genres: body.genres ?? [],
    })
    .select("*, artist:artists(*)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
