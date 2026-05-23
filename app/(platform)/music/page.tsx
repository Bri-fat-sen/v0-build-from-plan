"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockTracks, mockAlbums, mockArtists, mockPlaylists, genres, formatNumber } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, PlaylistCard } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { Play, Music, TrendingUp, Disc3, Users, Radio, ChevronRight, Sparkles } from "lucide-react"

export default function MusicPage() {
  const { playTrack, setQueue } = usePlayer()
  const featuredTrack = mockTracks[0]
  const featuredArtist = mockArtists[0]

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src={featuredTrack.coverArt} alt="" fill className="object-cover opacity-30 blur-2xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative px-4 pt-8 pb-12 lg:px-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 border border-primary/20">
              <Music className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">AfriStream Music</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
            THE SOUND<br />
            <span className="text-primary">OF AFRICA</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            All genres. All countries. One stream. Discover the music that moves a continent.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => { setQueue(mockTracks); playTrack(mockTracks[0]) }}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              <Play className="size-4 fill-current" /> Shuffle All
            </button>
            <Link
              href="/music/charts"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10 transition-colors"
            >
              <TrendingUp className="size-4" /> View Charts
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">50M+</p>
              <p className="text-xs text-muted-foreground">Tracks</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">100K+</p>
              <p className="text-xs text-muted-foreground">Artists</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">54</p>
              <p className="text-xs text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artist Spotlight */}
      <section className="px-4 lg:px-6 mt-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row">
            {/* Artist Image */}
            <div className="relative w-full md:w-80 aspect-square md:aspect-auto shrink-0">
              <Image src={featuredArtist.avatar} alt={featuredArtist.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/90 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
            </div>

            {/* Artist Info */}
            <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">Artist Spotlight</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{featuredArtist.name}</h2>
              <p className="text-muted-foreground mt-1">{featuredArtist.genre}</p>
              <p className="text-sm text-muted-foreground mt-3 max-w-md">
                One of Africa&apos;s most influential artists, known for blending traditional sounds with modern production.
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <span className="text-muted-foreground"><strong className="text-foreground">{formatNumber(featuredArtist.monthlyListeners)}</strong> monthly listeners</span>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href={`/music/artist/${featuredArtist.id}`} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                  <Play className="size-4 fill-current" /> Play
                </Link>
                <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Trending Now</h2>
          </div>
          <Link href="/music/charts" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
          {mockTracks.slice(0, 6).map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} />
          ))}
        </div>
      </section>

      {/* Browse Genres */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Disc3 className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Browse Genres</h2>
          </div>
          <Link href="/music/genres" className="flex items-center gap-1 text-sm text-primary hover:underline">
            All Genres <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.slice(0, 10).map((genre, i) => (
            <Link
              key={genre}
              href={`/music/genres?g=${genre}`}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/20 group"
            >
              <div
                className="absolute -right-4 -top-4 size-20 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"
                style={{ background: `hsl(${i * 36 + 20}, 70%, 50%)` }}
              />
              <p className="relative font-medium text-foreground">{genre}</p>
              <p className="relative text-xs text-muted-foreground mt-1">Explore</p>
            </Link>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">New Releases</h2>
          </div>
          <Link href="/new-releases" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Radio className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Featured Playlists</h2>
          </div>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>

      {/* Top Artists */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Top Artists</h2>
          </div>
          <Link href="/music/charts/artists" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>
    </div>
  )
}
