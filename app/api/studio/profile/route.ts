import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/studio/profile - Get creator's profile
export async function GET() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user profile
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

  return NextResponse.json({
    data: {
      profile,
      artist,
      isArtist: !!artist
    }
  })
}

// PATCH /api/studio/profile - Update creator profile
export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { profile: profileData, artist: artistData } = body

  // Update profile
  if (profileData) {
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profileData.display_name,
        username: profileData.username,
        avatar_url: profileData.avatar_url,
        bio: profileData.bio,
        country: profileData.country,
      })
      .eq("id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Update artist profile if exists
  if (artistData) {
    const { error } = await supabase
      .from("artists")
      .update({
        name: artistData.name,
        slug: artistData.slug,
        image: artistData.image,
        cover_image: artistData.cover_image,
        bio: artistData.bio,
        country: artistData.country,
        genres: artistData.genres,
        social_links: artistData.social_links,
      })
      .eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  // Return updated data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return NextResponse.json({
    data: {
      profile,
      artist,
      isArtist: !!artist
    }
  })
}
