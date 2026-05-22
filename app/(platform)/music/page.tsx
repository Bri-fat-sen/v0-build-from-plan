"use client"
import { mockTracks, mockAlbums, mockArtists, mockPlaylists, genres } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import Link from "next/link"
import { Play, Music } from "lucide-react"

export default function MusicPage() {
  const { playTrack, setQueue } = usePlayer()

  return (
    <div className="space-y-8 py-4">
      {/* Hero */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-gradient-to-r from-primary/20 via-card to-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Music className="size-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">AfriStream Music</h1>
              <p className="text-sm text-muted-foreground">The sound of Africa. All genres. All countries. One stream.</p>
            </div>
          </div>
          <button onClick={() => { setQueue(mockTracks); playTrack(mockTracks[0]) }}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground glow-orange-sm">
            <Play className="size-4" /> Shuffle Play
          </button>
        </div>
      </div>

      {/* Featured Playlists */}
      <section className="space-y-3">
        <SectionHeader title="Featured Playlists" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>

      {/* New Releases */}
      <section className="space-y-3">
        <SectionHeader title="New Releases" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* Trending Tracks */}
      <section className="space-y-3">
        <SectionHeader title="Trending Tracks" href="/music/charts" />
        <div className="px-4 lg:px-6">
          <div className="rounded-xl bg-card p-3">
            {mockTracks.slice(0, 8).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="space-y-3">
        <SectionHeader title="Browse by Genre" href="/music/genres" />
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-6">
          {genres.slice(0, 10).map((genre, i) => (
            <Link key={genre} href={`/music/genres?g=${genre}`}
              className="relative overflow-hidden rounded-lg bg-card p-4 transition-colors hover:bg-secondary">
              <div className="absolute -right-2 -top-2 size-16 rounded-full opacity-20"
                style={{ background: `hsl(${i * 36}, 70%, 50%)` }} />
              <p className="relative text-sm font-medium text-foreground">{genre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Artists */}
      <section className="space-y-3">
        <SectionHeader title="Top Artists" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* Mood Playlists */}
      <section className="space-y-3">
        <SectionHeader title="Moods & Activities" />
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
          {["Workout", "Chill", "Party", "Romance", "Focus", "Worship"].map((mood, i) => (
            <div key={mood} className="flex items-center gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-secondary cursor-pointer">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary text-lg">
                {["💪", "😌", "🎉", "💕", "🎯", "🙏"][i]}
              </div>
              <span className="text-sm font-medium text-foreground">{mood}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
