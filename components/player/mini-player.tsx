"use client"
import { usePlayer } from "@/lib/player-context"
import { Play, Pause, SkipForward, Heart, ChevronUp } from "lucide-react"
import Image from "next/image"

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, progress, toggleFullScreen } = usePlayer()
  if (!currentTrack) return null

  return (
    <div className="glass-strong fixed bottom-12 left-0 right-0 z-30 border-t border-border lg:bottom-0">
      {/* Progress bar */}
      <div className="h-1 w-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center gap-3 px-4 py-2">
        <button onClick={toggleFullScreen} className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative size-10 flex-shrink-0 overflow-hidden rounded">
            <Image src={currentTrack.coverArt} alt={currentTrack.title} fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{currentTrack.title}</p>
            <p className="truncate text-xs text-muted-foreground">{currentTrack.artist}</p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <button className="text-muted-foreground hover:text-foreground">
            <Heart className="size-5" />
          </button>
          <button onClick={togglePlay} className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground glow-orange-sm">
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </button>
          <button onClick={nextTrack} className="text-muted-foreground hover:text-foreground">
            <SkipForward className="size-5" />
          </button>
          <button onClick={toggleFullScreen} className="hidden text-muted-foreground hover:text-foreground md:block">
            <ChevronUp className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
