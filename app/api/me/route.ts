import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/me - Get current user's profile and data
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Get artist profile if exists
  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("user_id", user.id)
    .single()

  // Get counts
  const [likesResult, followsResult, playlistsResult] = await Promise.all([
    supabase.from("likes").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", user.id),
    supabase.from("playlists").select("*", { count: "exact", head: true }).eq("user_id", user.id),
  ])

  return NextResponse.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        ...profile
      },
      artist,
      stats: {
        likes: likesResult.count ?? 0,
        following: followsResult.count ?? 0,
        playlists: playlistsResult.count ?? 0,
      }
    }
  })
}

// PATCH /api/me - Update current user's profile
export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("profiles")
    .update({
      username: body.username,
      display_name: body.display_name,
      avatar_url: body.avatar_url,
      bio: body.bio,
      country: body.country,
      tier: body.tier,
      mode: body.mode,
    })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE /api/me - Delete user account
export async function DELETE() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Delete user (cascades to profile and related data via FK constraints)
  const { error } = await supabase.auth.admin.deleteUser(user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
