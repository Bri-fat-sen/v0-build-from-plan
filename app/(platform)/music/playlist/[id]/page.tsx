"use client"
import { use } from "react"
import Image from "next/image"
import { mockPlaylists, mockTracks } from "@/lib/mock-data"
import { TrackRow } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { Play, Shuffle, Heart, Share2, UserPlus } from "lucide-react"

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const playlist = mockPlaylists.find(p => p.id === id) || mockPlaylists[0]
  const { playTrack, setQueue } = usePlayer()

  const handlePlay = () => { setQueue(mockTracks); playTrack(mockTracks[0]) }

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 px-4 sm:flex-row sm:items-end lg:px-6">
        <div className="relative aspect-square w-48 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl sm:w-56">
          <Image src={playlist.cover} alt={playlist.title} fill className="object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-xs font-medium uppercase text-primary">Playlist</span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{playlist.title}</h1>
          <p className="text-sm text-muted-foreground">Curated by <span className="text-primary">{playlist.curator}</span></p>
          <p className="text-xs text-muted-foreground mt-1">{playlist.tracks} tracks &middot; About 2 hours</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <button onClick={handlePlay} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground glow-orange-sm">
          <Play className="size-4" /> Play
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <Shuffle className="size-4" /> Shuffle
        </button>
        <button className="text-muted-foreground hover:text-foreground"><Heart className="size-5" /></button>
        <button className="text-muted-foreground hover:text-foreground"><UserPlus className="size-5" /></button>
        <button className="text-muted-foreground hover:text-foreground"><Share2 className="size-5" /></button>
      </div>

      {/* Track List */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-card p-3">
          {mockTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
