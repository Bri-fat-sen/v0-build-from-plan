import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/profile/[id] - Get user's public profile
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // Get profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, country, is_verified, created_at")
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  // Get public playlists
  const { data: playlists } = await supabase
    .from("playlists")
    .select("id, title, cover, total_tracks")
    .eq("user_id", id)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get follower/following counts
  const [followersResult, followingResult] = await Promise.all([
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_type", "user").eq("following_id", id),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", id),
  ])

  // Check if current user follows this profile
  const { data: { user } } = await supabase.auth.getUser()
  let isFollowing = false
  if (user) {
    const { data: follow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_type", "user")
      .eq("following_id", id)
      .single()
    isFollowing = !!follow
  }

  return NextResponse.json({
    data: {
      ...profile,
      playlists,
      stats: {
        followers: followersResult.count ?? 0,
        following: followingResult.count ?? 0,
        playlists: playlists?.length ?? 0,
      },
      isFollowing
    }
  })
}
