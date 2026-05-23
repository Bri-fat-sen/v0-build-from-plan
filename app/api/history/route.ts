import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/history - Get user's play history
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const type = searchParams.get("type") // track, episode, movie
  const limit = parseInt(searchParams.get("limit") ?? "50")
  const offset = parseInt(searchParams.get("offset") ?? "0")

  let query = supabase
    .from("play_history")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("played_at", { ascending: false })

  if (type) query = query.eq("content_type", type)

  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    pagination: { total: count, limit, offset }
  })
}

// POST /api/history - Record a play
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from("play_history")
    .insert({
      user_id: user.id,
      content_type: body.content_type,
      content_id: body.content_id,
      duration_played_ms: body.duration_played_ms ?? 0,
      completed: body.completed ?? false,
      context_type: body.context_type,
      context_id: body.context_id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update total listening minutes in profile
  if (body.duration_played_ms) {
    const minutes = Math.floor(body.duration_played_ms / 60000)
    await supabase.rpc("increment_listening_minutes", { 
      user_id_param: user.id, 
      minutes_param: minutes 
    }).catch(() => {})
  }

  return NextResponse.json({ data }, { status: 201 })
}

// DELETE /api/history - Clear history
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const type = searchParams.get("type")

  let query = supabase
    .from("play_history")
    .delete()
    .eq("user_id", user.id)

  if (type) query = query.eq("content_type", type)

  const { error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
