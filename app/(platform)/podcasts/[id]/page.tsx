"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockPlaylists, formatNumber } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Play, Heart, Share2, Calendar, Users, Clock, Radio, ChevronRight, Volume2 } from "lucide-react"

export default function PodcastDetailPage({ params }: { params: { id: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const podcast = { id: "1", title: "The Africa Podcast", description: "Deep conversations on African culture, music, and innovation", hosts: ["Host Name"], followers: 50000, episodes: 156, cover: "/images/podcast-1.jpg" }
  const episodes = Array.from({ length: 12 }, (_, i) => ({ id: String(i), title: `Episode ${156 - i}: African Stories`, date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), duration: Math.floor(Math.random() * 45 + 30) }))

  return (
    <div className="min-h-screen pb-32">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-background" />
        <div className="relative px-4 py-12 lg:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <div className="relative size-48 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/50 to-purple-500/10">
              <Radio className="absolute inset-0 m-auto size-24 text-purple-500/30" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
                <Play className="size-16 fill-white text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-wider text-purple-500">Podcast</p>
              <h1 className="font-display text-5xl font-black tracking-tight text-white">{podcast.title}</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">{podcast.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Volume2 className="size-4" />{podcast.episodes} episodes</div>
                <div className="flex items-center gap-2"><Users className="size-4" />{formatNumber(podcast.followers)} followers</div>
                <div className="flex items-center gap-2"><Radio className="size-4" />Weekly show</div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition-colors"><Play className="size-5" />Play Latest</button>
                <button onClick={() => setIsFollowing(!isFollowing)} className={cn("flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors", isFollowing ? "bg-purple-600 text-white" : "bg-white/[0.06] text-white hover:bg-white/[0.12]")}>
                  <Heart className={cn("size-5", isFollowing && "fill-current")} />
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="px-4 pt-8 lg:px-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="font-semibold text-white">Latest Episodes</h2>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {episodes.map((episode, i) => (
              <div key={episode.id} className="group flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
                <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600 hover:text-white"><Play className="size-4 fill-current" /></button>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-white">{episode.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{episode.date} • {episode.duration} min</p>
                </div>
                <button className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-purple-500 transition-colors"><Heart className="size-5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
