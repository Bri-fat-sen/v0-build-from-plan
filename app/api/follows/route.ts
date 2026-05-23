import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/follows - Get user's follows
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") // artist, creator, playlist, podcast, user

  let query = supabase
    .from("follows")
    .select("*")
    .eq("follower_id", user.id)
    .order("created_at", { ascending: false })

  if (type) query = query.eq("following_type", type)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// POST /api/follows - Follow something
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { following_type, following_id } = body

  if (!following_type || !following_id) {
    return NextResponse.json({ error: "following_type and following_id required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("follows")
    .upsert({
      follower_id: user.id,
      following_type,
      following_id,
    }, {
      onConflict: "follower_id,following_type,following_id"
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

// DELETE /api/follows - Unfollow
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const followingType = searchParams.get("following_type")
  const followingId = searchParams.get("following_id")

  if (!followingType || !followingId) {
    return NextResponse.json({ error: "following_type and following_id required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_type", followingType)
    .eq("following_id", followingId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
