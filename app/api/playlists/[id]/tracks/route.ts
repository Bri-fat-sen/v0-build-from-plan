import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// POST /api/playlists/[id]/tracks - Add track to playlist
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Verify ownership or collaborative
  const { data: playlist } = await supabase
    .from("playlists")
    .select("user_id, is_collaborative")
    .eq("id", id)
    .single()

  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 })
  }

  if (playlist.user_id !== user.id && !playlist.is_collaborative) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const body = await request.json()
  const { track_id } = body

  // Get next position
  const { data: lastTrack } = await supabase
    .from("playlist_tracks")
    .select("position")
    .eq("playlist_id", id)
    .order("position", { ascending: false })
    .limit(1)
    .single()

  const position = (lastTrack?.position ?? 0) + 1

  const { data, error } = await supabase
    .from("playlist_tracks")
    .insert({
      playlist_id: id,
      track_id,
      added_by: user.id,
      position,
    })
    .select("*, track:tracks(*, artist:artists(id, name, image))")
    .single()

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Track already in playlist" }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update playlist track count
  await supabase.rpc("increment_playlist_tracks", { playlist_id: id }).catch(() => {})

  return NextResponse.json({ data }, { status: 201 })
}

// DELETE /api/playlists/[id]/tracks - Remove track from playlist
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

  const { searchParams } = request.nextUrl
  const trackId = searchParams.get("track_id")

  if (!trackId) {
    return NextResponse.json({ error: "track_id required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", id)
    .eq("track_id", trackId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update playlist track count
  await supabase.rpc("decrement_playlist_tracks", { playlist_id: id }).catch(() => {})

  return NextResponse.json({ success: true })
}
