import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/artists - List artists
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = request.nextUrl

  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")
  const country = searchParams.get("country")
  const genre = searchParams.get("genre")
  const search = searchParams.get("search")
  const verified = searchParams.get("verified")
  const sort = searchParams.get("sort") ?? "monthly_listeners"
  const order = searchParams.get("order") ?? "desc"

  let query = supabase
    .from("artists")
    .select("*", { count: "exact" })

  if (country) query = query.eq("country", country)
  if (genre) query = query.contains("genres", [genre])
  if (search) query = query.ilike("name", `%${search}%`)
  if (verified === "true") query = query.eq("is_verified", true)

  query = query
    .order(sort, { ascending: order === "asc" })
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

// POST /api/artists - Create artist profile
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  // Check if user already has an artist profile
  const { data: existing } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (existing) {
    return NextResponse.json({ error: "Artist profile already exists" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("artists")
    .insert({
      user_id: user.id,
      name: body.name,
      slug: body.slug,
      image: body.image,
      cover_image: body.cover_image,
      bio: body.bio,
      country: body.country,
      genres: body.genres ?? [],
      social_links: body.social_links ?? {},
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update user profile mode to artist
  await supabase
    .from("profiles")
    .update({ mode: "artist" })
    .eq("id", user.id)

  return NextResponse.json({ data }, { status: 201 })
}
