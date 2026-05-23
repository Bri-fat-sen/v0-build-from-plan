import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/playlists - Get playlists
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const userId = searchParams.get("user_id")
  const search = searchParams.get("search")
  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")

  let query = supabase
    .from("playlists")
    .select("*, user:profiles(id, display_name, avatar_url)", { count: "exact" })

  // If user_id specified, get their playlists
  // Otherwise get public playlists
  if (userId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.id === userId) {
      // User viewing their own playlists - show all
      query = query.eq("user_id", userId)
    } else {
      // Viewing someone else's - only public
      query = query.eq("user_id", userId).eq("is_public", true)
    }
  } else {
    query = query.eq("is_public", true)
  }

  if (search) query = query.ilike("title", `%${search}%`)

  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    pagination: { total: count, limit, offset }
  })
}

// POST /api/playlists - Create playlist
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("playlists")
    .insert({
      user_id: user.id,
      title: body.title,
      description: body.description,
      cover: body.cover,
      is_public: body.is_public ?? true,
      is_collaborative: body.is_collaborative ?? false,
    })
    .select("*, user:profiles(id, display_name, avatar_url)")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
