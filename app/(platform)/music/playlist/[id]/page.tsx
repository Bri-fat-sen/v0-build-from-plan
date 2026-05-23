"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockPlaylists, mockTracks, formatNumber } from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { cn } from "@/lib/utils"
import {
  Play, Pause, Shuffle, Heart, Share2, MoreHorizontal, Clock, Music,
  Download, Plus, Check, ChevronDown
} from "lucide-react"

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const playlist = mockPlaylists.find(p => p.id === id) || mockPlaylists[0]
  const { playTrack, setQueue, currentTrack, isPlaying, togglePlay } = usePlayer()
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const tracks = mockTracks.slice(0, 15)
  const totalDuration = tracks.reduce((acc, t) => acc + (t.duration || 180000), 0)

  const handlePlayAll = () => {
    setQueue(tracks)
    playTrack(tracks[0])
  }

  const handleShuffle = () => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5)
    setQueue(shuffled)
    playTrack(shuffled[0])
  }

  const isCurrentPlaylist = currentTrack && tracks.some(t => t.id === currentTrack.id)

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background blur */}
        <div className="absolute inset-0">
          <Image
            src={playlist.cover}
            alt=""
            fill
            className="object-cover opacity-30 blur-3xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>

        <div className="relative px-4 pt-8 pb-6 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            {/* Cover */}
            <div className="relative mx-auto md:mx-0">
              <div className="relative aspect-square w-56 overflow-hidden rounded-xl shadow-2xl md:w-64">
                <Image
                  src={playlist.cover}
                  alt={playlist.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Play overlay on hover */}
              <button
                onClick={handlePlayAll}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100 rounded-xl"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-primary text-black">
                  <Play className="size-8 ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">Playlist</p>
              <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                {playlist.title}
              </h1>
              <p className="mt-3 text-white/60">
                A curated collection of the best tracks
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/50 md:justify-start">
                <Link href="#" className="font-medium text-white hover:underline">
                  {playlist.curator}
                </Link>
                <span>•</span>
                <span>{tracks.length} songs</span>
                <span>•</span>
                <span>{formatNumber(totalDuration)}</span>
                <span>•</span>
                <span>12.5K saves</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/95 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
          <button
            onClick={isCurrentPlaylist && isPlaying ? togglePlay : handlePlayAll}
            className="flex size-12 items-center justify-center rounded-full bg-primary text-black hover:scale-105 transition-transform"
          >
            {isCurrentPlaylist && isPlaying ? (
              <Pause className="size-6" fill="currentColor" />
            ) : (
              <Play className="size-6 ml-0.5" fill="currentColor" />
            )}
          </button>
          <button
            onClick={handleShuffle}
            className="flex size-12 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <Shuffle className="size-5" />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "flex size-12 items-center justify-center rounded-full border transition-colors",
              isLiked ? "border-primary text-primary" : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
            )}
          >
            <Heart className={cn("size-5", isLiked && "fill-current")} />
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "hidden sm:flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              isFollowing
                ? "border-primary bg-primary/10 text-primary"
                : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
            )}
          >
            {isFollowing ? <Check className="size-4" /> : <Plus className="size-4" />}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="ml-auto flex size-10 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <Download className="size-5" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <Share2 className="size-5" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <MoreHorizontal className="size-5" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 pt-4 lg:px-6">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/40 border-b border-white/[0.06]">
          <div className="w-12 text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="w-20 text-right"><Clock className="inline size-4" /></div>
        </div>

        {/* Tracks */}
        <div className="divide-y divide-white/[0.04]">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id
            return (
              <div
                key={track.id}
                onClick={() => { setQueue(tracks); playTrack(track) }}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] gap-4 items-center px-4 py-3 rounded-lg cursor-pointer transition-colors",
                  isCurrentTrack ? "bg-primary/10" : "hover:bg-white/[0.04]"
                )}
              >
                {/* Number / Play */}
                <div className="w-12 flex items-center justify-center">
                  <span className={cn(
                    "text-sm tabular-nums group-hover:hidden",
                    isCurrentTrack ? "text-primary font-semibold" : "text-white/40"
                  )}>
                    {isCurrentTrack && isPlaying ? (
                      <Music className="size-4 text-primary animate-pulse" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <Play className="size-4 hidden group-hover:block text-white" fill="currentColor" />
                </div>

                {/* Track Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded bg-white/[0.06]">
                    <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      "truncate font-medium",
                      isCurrentTrack ? "text-primary" : "text-white"
                    )}>
                      {track.title}
                    </p>
                    <p className="truncate text-sm text-white/50">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Album */}
                <div className="hidden md:block text-sm text-white/50 truncate">
                  {track.album || "Single"}
                </div>

                {/* Duration & Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation() }}
                    className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-primary transition-opacity"
                  >
                    <Heart className="size-4" />
                  </button>
                  <span className="w-12 text-right text-sm tabular-nums text-white/40">
                    {formatNumber(track.duration || 180000)}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation() }}
                    className="opacity-0 group-hover:opacity-100 text-white/50 hover:text-white transition-opacity"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommended */}
      <div className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Recommended</h2>
            <p className="text-sm text-white/50">Based on this playlist</p>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">
            Add all
          </button>
        </div>
        <div className="space-y-1">
          {mockTracks.slice(15, 20).map((track) => (
            <div
              key={track.id}
              className="group flex items-center gap-3 rounded-lg p-3 hover:bg-white/[0.04] transition-colors"
            >
              <div className="relative size-10 shrink-0 overflow-hidden rounded bg-white/[0.06]">
                <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-white">{track.title}</p>
                <p className="truncate text-sm text-white/50">{track.artist}</p>
              </div>
              <button className="flex size-8 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 opacity-0 group-hover:opacity-100 transition-all">
                <Plus className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
