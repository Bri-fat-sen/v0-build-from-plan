import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/movies/[id] - Get movie details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: movie, error } = await supabase
    .from("movies")
    .select("*, creator:profiles(id, display_name, avatar_url)")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 })
  }

  // Get user's watch progress if authenticated
  const { data: { user } } = await supabase.auth.getUser()
  let watchProgress = null

  if (user) {
    const { data } = await supabase
      .from("watch_progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("movie_id", id)
      .single()
    watchProgress = data
  }

  return NextResponse.json({ data: { ...movie, watchProgress } })
}

// PATCH /api/movies/[id] - Update movie
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("movies")
    .update({
      title: body.title,
      slug: body.slug,
      poster: body.poster,
      backdrop: body.backdrop,
      trailer_url: body.trailer_url,
      video_url: body.video_url,
      description: body.description,
      release_year: body.release_year,
      duration_minutes: body.duration_minutes,
      genres: body.genres,
      country: body.country,
      language: body.language,
      rating: body.rating,
      content_type: body.content_type,
      is_premium: body.is_premium,
    })
    .eq("id", id)
    .eq("creator_id", user.id)
    .select("*, creator:profiles(id, display_name, avatar_url)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE /api/movies/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { error } = await supabase
    .from("movies")
    .delete()
    .eq("id", id)
    .eq("creator_id", user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
