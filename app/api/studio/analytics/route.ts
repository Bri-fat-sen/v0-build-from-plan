import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// GET /api/studio/analytics - Get creator's analytics
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const period = searchParams.get("period") ?? "30d" // 7d, 30d, 90d, 1y, all
  const contentType = searchParams.get("type") // track, album, movie

  // Get user's artist profile
  const { data: artist } = await supabase
    .from("artists")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (!artist) {
    return NextResponse.json({ error: "No artist profile found" }, { status: 404 })
  }

  // Calculate date range
  const now = new Date()
  let startDate = new Date()
  switch (period) {
    case "7d": startDate.setDate(now.getDate() - 7); break
    case "30d": startDate.setDate(now.getDate() - 30); break
    case "90d": startDate.setDate(now.getDate() - 90); break
    case "1y": startDate.setFullYear(now.getFullYear() - 1); break
    default: startDate = new Date(0) // all time
  }

  // Get total streams for all tracks
  const { data: tracks } = await supabase
    .from("tracks")
    .select("id, title, cover, total_streams")
    .eq("artist_id", artist.id)
    .order("total_streams", { ascending: false })

  const totalStreams = tracks?.reduce((sum, t) => sum + t.total_streams, 0) ?? 0

  // Get daily analytics
  const { data: dailyStats } = await supabase
    .from("analytics_daily")
    .select("*")
    .eq("content_type", "track")
    .in("content_id", tracks?.map(t => t.id) ?? [])
    .gte("date", startDate.toISOString().split("T")[0])
    .order("date", { ascending: true })

  // Aggregate daily stats
  const aggregatedDaily: Record<string, { plays: number; listeners: number; likes: number }> = {}
  dailyStats?.forEach(stat => {
    if (!aggregatedDaily[stat.date]) {
      aggregatedDaily[stat.date] = { plays: 0, listeners: 0, likes: 0 }
    }
    aggregatedDaily[stat.date].plays += stat.plays
    aggregatedDaily[stat.date].listeners += stat.unique_listeners
    aggregatedDaily[stat.date].likes += stat.likes
  })

  // Get follower count
  const { count: followerCount } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_type", "artist")
    .eq("following_id", artist.id)

  // Get album count
  const { count: albumCount } = await supabase
    .from("albums")
    .select("*", { count: "exact", head: true })
    .eq("artist_id", artist.id)

  return NextResponse.json({
    data: {
      overview: {
        totalStreams,
        monthlyListeners: artist ? (await supabase.from("artists").select("monthly_listeners").eq("id", artist.id).single()).data?.monthly_listeners ?? 0 : 0,
        followers: followerCount ?? 0,
        totalTracks: tracks?.length ?? 0,
        totalAlbums: albumCount ?? 0,
      },
      topTracks: tracks?.slice(0, 10) ?? [],
      dailyStats: Object.entries(aggregatedDaily).map(([date, stats]) => ({
        date,
        ...stats
      })),
      period
    }
  })
}
