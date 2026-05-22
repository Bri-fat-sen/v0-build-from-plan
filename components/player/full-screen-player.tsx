"use client"
import { usePlayer } from "@/lib/player-context"
import {
  Play, Pause, SkipForward, SkipBack, Heart, Shuffle, Repeat, Repeat1,
  ChevronDown, ListMusic, Mic2, Share2, Plus, Volume2, Settings, Moon,
} from "lucide-react"
import Image from "next/image"

export function FullScreenPlayer() {
  const {
    currentTrack, isPlaying, progress, volume, shuffle, repeat,
    togglePlay, nextTrack, prevTrack, setProgress, setVolume,
    toggleShuffle, cycleRepeat, toggleFullScreen, toggleQueue, toggleLyrics,
    showQueue, showLyrics,
  } = usePlayer()
  if (!currentTrack) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={currentTrack.coverArt} alt="" fill className="object-cover opacity-20 blur-3xl scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <button onClick={toggleFullScreen} className="text-muted-foreground hover:text-foreground">
          <ChevronDown className="size-6" />
        </button>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Now Playing</p>
        <button className="text-muted-foreground hover:text-foreground">
          <Settings className="size-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-6">
        {showQueue ? (
          <div className="w-full max-w-md">
            <h3 className="mb-4 text-lg font-semibold">Queue</h3>
            <p className="text-sm text-muted-foreground">Queue is empty. Add songs to your queue.</p>
          </div>
        ) : showLyrics ? (
          <div className="w-full max-w-md text-center">
            <h3 className="mb-4 text-lg font-semibold">Lyrics</h3>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p className="text-foreground text-glow">Feel the rhythm of the night</p>
              <p>Dancing under African skies</p>
              <p>Every beat tells a story</p>
              <p>Of where we come from</p>
              <p>And where we&apos;re going</p>
            </div>
          </div>
        ) : (
          <>
            {/* Album Art */}
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl glow-orange">
              <Image src={currentTrack.coverArt} alt={currentTrack.title} fill className="object-cover" />
            </div>

            {/* Track Info */}
            <div className="w-full max-w-xs text-center">
              <h2 className="text-xl font-bold text-foreground">{currentTrack.title}</h2>
              <p className="text-sm text-primary">{currentTrack.artist}</p>
              <p className="text-xs text-muted-foreground">{currentTrack.album}</p>
            </div>

            {/* Equalizer Animation */}
            {isPlaying && (
              <div className="flex items-end gap-1 h-5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="eq-bar w-1 rounded-full bg-primary" />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 px-6 pb-8 pt-4">
        {/* Progress */}
        <div className="mb-4">
          <input type="range" min={0} max={100} value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1:18</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-6">
          <button onClick={toggleShuffle} className={shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"}>
            <Shuffle className="size-5" />
          </button>
          <button onClick={prevTrack} className="text-foreground hover:text-primary">
            <SkipBack className="size-6" />
          </button>
          <button onClick={togglePlay} className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground glow-orange">
            {isPlaying ? <Pause className="size-7" /> : <Play className="size-7 ml-1" />}
          </button>
          <button onClick={nextTrack} className="text-foreground hover:text-primary">
            <SkipForward className="size-6" />
          </button>
          <button onClick={cycleRepeat} className={repeat !== "off" ? "text-primary" : "text-muted-foreground hover:text-foreground"}>
            {repeat === "one" ? <Repeat1 className="size-5" /> : <Repeat className="size-5" />}
          </button>
        </div>

        {/* Secondary Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground"><Heart className="size-5" /></button>
            <button className="text-muted-foreground hover:text-foreground"><Plus className="size-5" /></button>
            <button className="text-muted-foreground hover:text-foreground"><Share2 className="size-5" /></button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLyrics} className={showLyrics ? "text-primary" : "text-muted-foreground hover:text-foreground"}>
              <Mic2 className="size-5" />
            </button>
            <button onClick={toggleQueue} className={showQueue ? "text-primary" : "text-muted-foreground hover:text-foreground"}>
              <ListMusic className="size-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground"><Moon className="size-5" /></button>
          </div>
        </div>

        {/* Volume */}
        <div className="mt-3 flex items-center gap-2">
          <Volume2 className="size-4 text-muted-foreground" />
          <input type="range" min={0} max={100} value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="flex-1 accent-primary" />
        </div>
      </div>
    </div>
  )
}
