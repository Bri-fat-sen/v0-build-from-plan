import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/movies - List movies/videos
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")
  const type = searchParams.get("type") // movie, series, documentary, short, music_video
  const genre = searchParams.get("genre")
  const country = searchParams.get("country")
  const search = searchParams.get("search")
  const premium = searchParams.get("premium")
  const sort = searchParams.get("sort") ?? "created_at"
  const order = searchParams.get("order") ?? "desc"

  let query = supabase
    .from("movies")
    .select("*, creator:profiles(id, display_name, avatar_url)", { count: "exact" })

  if (type) query = query.eq("content_type", type)
  if (genre) query = query.contains("genres", [genre])
  if (country) query = query.eq("country", country)
  if (search) query = query.ilike("title", `%${search}%`)
  if (premium === "true") query = query.eq("is_premium", true)
  if (premium === "false") query = query.eq("is_premium", false)

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

// POST /api/movies - Create movie/video
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("movies")
    .insert({
      creator_id: user.id,
      title: body.title,
      slug: body.slug,
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
    .select("*, creator:profiles(id, display_name, avatar_url)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
