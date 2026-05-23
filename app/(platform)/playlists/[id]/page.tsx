"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockPlaylists, mockTracks, formatNumber } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Play, Heart, Share2, Download, MoreHorizontal, Users, Clock, Music2, ChevronRight } from "lucide-react"

export default function PlaylistDetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const playlist = mockPlaylists[0]
  const tracks = mockTracks.slice(0, 12)

  return (
    <div className="min-h-screen pb-32">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background" />
        <div className="relative px-4 py-12 lg:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
            <div className="relative size-48 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/50 to-primary/10">
              <Image src={playlist.cover} alt={playlist.name} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
                <Play className="size-16 fill-white text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Playlist</p>
              <h1 className="font-display text-5xl font-black tracking-tight text-white">{playlist.name}</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">{playlist.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Music2 className="size-4" />{tracks.length} tracks</div>
                <div className="flex items-center gap-2"><Users className="size-4" />{formatNumber(Math.random() * 100000 + 10000)} followers</div>
                <div className="flex items-center gap-2"><Clock className="size-4" />{Math.floor(tracks.length * 3.5)}m total time</div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-black hover:bg-primary/90 transition-colors"><Play className="size-5" />Play</button>
                <button onClick={() => setIsLiked(!isLiked)} className={cn("flex size-12 items-center justify-center rounded-full transition-colors", isLiked ? "bg-primary text-black" : "bg-white/[0.06] text-white hover:bg-white/[0.12]")}><Heart className={cn("size-5", isLiked && "fill-current")} /></button>
                <button className="flex size-12 items-center justify-center rounded-full bg-white/[0.06] text-white hover:bg-white/[0.12] transition-colors"><Share2 className="size-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="px-4 pt-8 lg:px-6">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="border-b border-white/[0.06] px-6 py-4">
            <h2 className="font-semibold text-white">Tracks</h2>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {tracks.map((track, i) => (
              <div key={track.id} className="group flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <span className="text-sm font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <button className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-black"><Play className="size-4 fill-current" /></button>
                <div className="relative size-10 shrink-0 overflow-hidden rounded bg-white/[0.06]"><Image src={track.coverArt} alt={track.title} fill className="object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-white">{track.title}</p>
                  <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
                </div>
                <div className="hidden sm:block text-sm text-muted-foreground">{Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}</div>
                <button className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors"><Heart className="size-5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
