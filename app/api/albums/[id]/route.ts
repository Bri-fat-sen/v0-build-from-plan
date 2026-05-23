import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/albums/[id] - Get album with tracks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: album, error } = await supabase
    .from("albums")
    .select("*, artist:artists(*)")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 })
  }

  // Get album tracks
  const { data: tracks } = await supabase
    .from("tracks")
    .select("*")
    .eq("album_id", id)
    .order("track_number", { ascending: true })

  return NextResponse.json({ data: { ...album, tracks } })
}

// PATCH /api/albums/[id] - Update album
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
    .from("albums")
    .update({
      title: body.title,
      cover: body.cover,
      release_date: body.release_date,
      album_type: body.album_type,
      genres: body.genres,
    })
    .eq("id", id)
    .select("*, artist:artists(*)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE /api/albums/[id]
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

  const { error } = await supabase.from("albums").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
