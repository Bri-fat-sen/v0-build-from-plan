"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockAlbums, mockTracks, formatNumber } from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { cn } from "@/lib/utils"
import { 
  Play, Shuffle, Heart, Share2, Download, Clock, MoreHorizontal,
  Music, Pause, ChevronRight
} from "lucide-react"

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const album = mockAlbums.find(a => a.id === id) || mockAlbums[0]
  const tracks = mockTracks.filter(t => t.albumId === album.id)
  const displayTracks = tracks.length > 0 ? tracks : mockTracks.slice(0, album.tracks > 10 ? 10 : album.tracks)
  const { playTrack, setQueue, currentTrack, isPlaying } = usePlayer()
  const [isLiked, setIsLiked] = useState(false)

  const handlePlay = () => {
    setQueue(displayTracks)
    playTrack(displayTracks[0])
  }

  const handleShuffle = () => {
    const shuffled = [...displayTracks].sort(() => Math.random() - 0.5)
    setQueue(shuffled)
    playTrack(shuffled[0])
  }

  const totalDuration = displayTracks.reduce((acc, t) => {
    const [min, sec] = t.duration.split(":").map(Number)
    return acc + min * 60 + sec
  }, 0)
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)
  const durationText = hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0">
          <Image 
            src={album.coverArt} 
            alt="" 
            fill 
            className="object-cover scale-110 blur-3xl opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="relative px-4 pt-8 pb-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end">
            {/* Cover Art */}
            <div className="relative aspect-square w-56 shrink-0 overflow-hidden rounded-xl shadow-2xl sm:w-64 lg:w-72">
              <Image src={album.coverArt} alt={album.title} fill className="object-cover" priority />
            </div>

            {/* Album Info */}
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {album.type}
              </span>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {album.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm sm:justify-start">
                <Link 
                  href={`/music/artist/${album.artistId}`}
                  className="flex items-center gap-2 font-semibold text-white hover:text-primary transition-colors"
                >
                  <div className="relative size-7 overflow-hidden rounded-full bg-white/[0.06]">
                    <Image src={album.coverArt} alt={album.artist} fill className="object-cover" />
                  </div>
                  {album.artist}
                </Link>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{album.year}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{displayTracks.length} songs</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{durationText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/95 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-black hover:bg-primary/90 transition-colors"
          >
            <Play className="size-5 fill-current" />
            Play
          </button>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-medium text-white hover:bg-white/5 transition-colors"
          >
            <Shuffle className="size-4" />
            Shuffle
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={cn(
              "flex size-12 items-center justify-center rounded-full border transition-colors",
              isLiked 
                ? "border-primary text-primary" 
                : "border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <Heart className={cn("size-5", isLiked && "fill-current")} />
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
            <Download className="size-5" />
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
            <Share2 className="size-5" />
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
            <MoreHorizontal className="size-5" />
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 pt-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_1fr_auto] items-center gap-4 border-b border-white/[0.06] px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="w-8 text-center">#</span>
          <span>Title</span>
          <span className="hidden sm:block">Plays</span>
          <span className="flex items-center"><Clock className="size-4" /></span>
        </div>

        {/* Tracks */}
        <div className="space-y-0.5">
          {displayTracks.map((track, i) => {
            const isCurrentTrack = currentTrack?.id === track.id
            return (
              <button
                key={track.id}
                onClick={() => playTrack(track)}
                className={cn(
                  "group grid w-full grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_1fr_auto] items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                  "hover:bg-white/[0.04]",
                  isCurrentTrack && "bg-white/[0.06]"
                )}
              >
                {/* Index / Play */}
                <div className="w-8 text-center">
                  {isCurrentTrack && isPlaying ? (
                    <Music className="size-4 text-primary animate-pulse mx-auto" />
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground group-hover:hidden">{i + 1}</span>
                      <Play className="size-4 text-white hidden group-hover:block mx-auto" />
                    </>
                  )}
                </div>

                {/* Title & Artist */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded bg-white/[0.06]">
                    <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                    {isCurrentTrack && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Music className="size-4 text-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={cn("truncate text-sm font-medium", isCurrentTrack ? "text-primary" : "text-white")}>
                      {track.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
                  </div>
                </div>

                {/* Plays */}
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {formatNumber(track.plays)}
                </span>

                {/* Duration & Actions */}
                <div className="flex items-center gap-3">
                  <Heart className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary" />
                  <span className="text-sm text-muted-foreground tabular-nums w-10 text-right">{track.duration}</span>
                  <MoreHorizontal className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 pt-10 lg:px-8">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Credits</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Artist</p>
              <p className="font-medium text-white">{album.artist}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Genre</p>
              <p className="font-medium text-white">{album.genre}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Released</p>
              <p className="font-medium text-white">{album.year}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Country</p>
              <p className="font-medium text-white">{album.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* More from Artist */}
      <section className="px-4 pt-10 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-white">More from {album.artist}</h2>
          <Link href={`/music/artist/${album.artistId}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
            View artist <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {mockAlbums.filter(a => a.id !== album.id).slice(0, 6).map((relatedAlbum) => (
            <Link
              key={relatedAlbum.id}
              href={`/music/album/${relatedAlbum.id}`}
              className="group min-w-[160px] flex-shrink-0"
            >
              <div className="flex flex-col gap-3 rounded-xl bg-white/[0.02] p-3 hover:bg-white/[0.06] transition-all">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.06]">
                  <Image src={relatedAlbum.coverArt} alt={relatedAlbum.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                      <Play className="size-5 fill-current text-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {relatedAlbum.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{relatedAlbum.year} - {relatedAlbum.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
