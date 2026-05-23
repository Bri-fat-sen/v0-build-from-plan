import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/artists/[id] - Get artist with discography
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 })
  }

  // Get albums
  const { data: albums } = await supabase
    .from("albums")
    .select("*")
    .eq("artist_id", id)
    .order("release_date", { ascending: false })

  // Get top tracks
  const { data: topTracks } = await supabase
    .from("tracks")
    .select("*, album:albums(id, title, cover)")
    .eq("artist_id", id)
    .order("total_streams", { ascending: false })
    .limit(10)

  return NextResponse.json({
    data: {
      ...artist,
      albums,
      topTracks,
    }
  })
}

// PATCH /api/artists/[id] - Update artist
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
    .from("artists")
    .update({
      name: body.name,
      slug: body.slug,
      image: body.image,
      cover_image: body.cover_image,
      bio: body.bio,
      country: body.country,
      genres: body.genres,
      social_links: body.social_links,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
