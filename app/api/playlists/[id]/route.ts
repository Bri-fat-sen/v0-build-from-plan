import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/playlists/[id] - Get playlist with tracks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: playlist, error } = await supabase
    .from("playlists")
    .select("*, user:profiles(id, display_name, avatar_url)")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 })
  }

  // Check access
  const { data: { user } } = await supabase.auth.getUser()
  if (!playlist.is_public && playlist.user_id !== user?.id) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 })
  }

  // Get tracks
  const { data: playlistTracks } = await supabase
    .from("playlist_tracks")
    .select("*, track:tracks(*, artist:artists(id, name, image))")
    .eq("playlist_id", id)
    .order("position", { ascending: true })

  return NextResponse.json({
    data: {
      ...playlist,
      tracks: playlistTracks?.map(pt => ({ ...pt.track, position: pt.position })) ?? []
    }
  })
}

// PATCH /api/playlists/[id] - Update playlist
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
    .from("playlists")
    .update({
      title: body.title,
      description: body.description,
      cover: body.cover,
      is_public: body.is_public,
      is_collaborative: body.is_collaborative,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*, user:profiles(id, display_name, avatar_url)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE /api/playlists/[id] - Delete playlist
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
    .from("playlists")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
