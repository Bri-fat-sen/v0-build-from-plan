"use client"
import { use } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockAlbums, mockTracks, formatNumber } from "@/lib/mock-data"
import { TrackRow, AlbumCard } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { Play, Shuffle, Heart, Share2, Download, Clock } from "lucide-react"

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const album = mockAlbums.find(a => a.id === id) || mockAlbums[0]
  const tracks = mockTracks.filter(t => t.albumId === album.id)
  const displayTracks = tracks.length > 0 ? tracks : mockTracks.slice(0, album.tracks > 8 ? 8 : album.tracks)
  const { playTrack, setQueue } = usePlayer()

  const handlePlay = () => { setQueue(displayTracks); playTrack(displayTracks[0]) }
  const handleShuffle = () => {
    const shuffled = [...displayTracks].sort(() => Math.random() - 0.5)
    setQueue(shuffled); playTrack(shuffled[0])
  }

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 px-4 sm:flex-row sm:items-end lg:px-6">
        <div className="relative aspect-square w-48 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl glow-orange-sm sm:w-56">
          <Image src={album.coverArt} alt={album.title} fill className="object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <span className="text-xs font-medium uppercase text-primary">{album.type}</span>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{album.title}</h1>
          <Link href={`/music/artist/${album.artistId}`} className="text-sm text-primary hover:underline">{album.artist}</Link>
          <div className="mt-1 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:justify-start">
            <span>{album.year}</span>
            <span>&middot;</span>
            <span>{album.tracks} tracks</span>
            <span>&middot;</span>
            <span>{album.genre}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1"><Clock className="size-3" /> 45 min</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <button onClick={handlePlay} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground glow-orange-sm">
          <Play className="size-4" /> Play
        </button>
        <button onClick={handleShuffle} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <Shuffle className="size-4" /> Shuffle
        </button>
        <button className="text-muted-foreground hover:text-foreground"><Heart className="size-5" /></button>
        <button className="text-muted-foreground hover:text-foreground"><Download className="size-5" /></button>
        <button className="text-muted-foreground hover:text-foreground"><Share2 className="size-5" /></button>
      </div>

      {/* Track List */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-card p-3">
          {displayTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Credits</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Artist:</span> <span className="text-foreground">{album.artist}</span></div>
            <div><span className="text-muted-foreground">Genre:</span> <span className="text-foreground">{album.genre}</span></div>
            <div><span className="text-muted-foreground">Released:</span> <span className="text-foreground">{album.year}</span></div>
            <div><span className="text-muted-foreground">Country:</span> <span className="text-foreground">{album.country}</span></div>
          </div>
        </div>
      </div>

      {/* More from Artist */}
      <section className="space-y-3 pb-8">
        <h2 className="px-4 text-lg font-bold text-foreground lg:px-6">More from {album.artist}</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.filter(a => a.id !== album.id).slice(0, 5).map(a => <AlbumCard key={a.id} album={a} />)}
        </div>
      </section>
    </div>
  )
}
