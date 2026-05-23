import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/likes - Get user's liked content
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") // track, album, artist, movie, playlist, podcast

  let query = supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (type) query = query.eq("content_type", type)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// POST /api/likes - Like content
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { content_type, content_id } = body

  if (!content_type || !content_id) {
    return NextResponse.json({ error: "content_type and content_id required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("likes")
    .upsert({
      user_id: user.id,
      content_type,
      content_id,
    }, {
      onConflict: "user_id,content_type,content_id"
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

// DELETE /api/likes - Unlike content
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const contentType = searchParams.get("content_type")
  const contentId = searchParams.get("content_id")

  if (!contentType || !contentId) {
    return NextResponse.json({ error: "content_type and content_id required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
