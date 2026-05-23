import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/tracks/[id] - Get a single track
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("tracks")
    .select("*, artist:artists(*), album:albums(*)")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 })
  }

  // Increment stream count
  await supabase.rpc("increment_track_streams", { track_id: id }).catch(() => {})

  return NextResponse.json({ data })
}

// PATCH /api/tracks/[id] - Update a track
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
    .from("tracks")
    .update({
      title: body.title,
      cover: body.cover,
      audio_url: body.audio_url,
      preview_url: body.preview_url,
      duration_ms: body.duration_ms,
      track_number: body.track_number,
      genres: body.genres,
      bpm: body.bpm,
      key: body.key,
      explicit: body.explicit,
      lyrics: body.lyrics,
      release_date: body.release_date,
    })
    .eq("id", id)
    .select("*, artist:artists(*), album:albums(*)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE /api/tracks/[id] - Delete a track
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
    .from("tracks")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
