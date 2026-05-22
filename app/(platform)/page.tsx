"use client"
import Image from "next/image"
import Link from "next/link"
import { Play, ChevronRight, TrendingUp, MapPin, Star, Zap } from "lucide-react"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, mockPlaylists, mockEvents } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, MovieCard, CreatorCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"

const heroItems = [
  { id: "h1", title: "Afrobeats Global Takeover", subtitle: "The biggest sounds from across Africa", image: "https://picsum.photos/seed/hero1/1200/500", type: "playlist" as const, link: "/music" },
  { id: "h2", title: "The Black Book", subtitle: "Nigeria's highest-rated thriller", image: "https://picsum.photos/seed/hero2/1200/500", type: "movie" as const, link: "/movies/m1" },
  { id: "h3", title: "AfroNation Ghana 2025", subtitle: "Get your tickets now", image: "https://picsum.photos/seed/hero3/1200/500", type: "event" as const, link: "/live/e1" },
]

export default function OnePage() {
  const { playTrack, setQueue } = usePlayer()

  const handlePlayAll = () => {
    setQueue(mockTracks)
    playTrack(mockTracks[0])
  }

  return (
    <div className="space-y-8 py-4">
      {/* Hero Carousel */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:px-6">
        {heroItems.map(item => (
          <Link key={item.id} href={item.link}
            className="group relative flex-shrink-0 snap-center overflow-hidden rounded-xl"
            style={{ width: "min(85vw, 700px)", height: "280px" }}>
            <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">
                {item.type === "movie" ? "New Film" : item.type === "event" ? "Live Event" : "Featured"}
              </span>
              <h2 className="font-display text-2xl font-bold text-white">{item.title}</h2>
              <p className="text-sm text-white/80">{item.subtitle}</p>
            </div>
            <div className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="size-12 rounded-full bg-primary p-3 text-primary-foreground glow-orange" />
            </div>
          </Link>
        ))}
      </div>

      {/* For You Mix */}
      <section className="space-y-3">
        <SectionHeader title="For You" subtitle="Your personalized mix across music, movies & creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.slice(0, 4).map(album => <AlbumCard key={album.id} album={album} />)}
          {mockMovies.slice(0, 2).map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Trending in Africa */}
      <section className="space-y-3">
        <SectionHeader title="Trending in Africa" href="/music/charts" subtitle="What the continent is listening to right now" />
        <div className="px-4 lg:px-6">
          <div className="rounded-xl bg-card p-3">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">Top Charts</span>
              <button onClick={handlePlayAll} className="ml-auto flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                <Play className="size-3" /> Play All
              </button>
            </div>
            {mockTracks.slice(0, 6).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Continue Listening */}
      <section className="space-y-3">
        <SectionHeader title="Continue Listening" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.slice(2, 6).map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="space-y-3">
        <SectionHeader title="Continue Watching" href="/movies" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(0, 5).map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Back Home */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-4 lg:px-6">
          <MapPin className="size-5 text-primary" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Back Home</h2>
            <p className="text-xs text-muted-foreground">Content from your connected countries</p>
          </div>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.slice(0, 5).map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* Recommended Artists */}
      <section className="space-y-3">
        <SectionHeader title="Recommended Artists" href="/music" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* New Releases */}
      <section className="space-y-3">
        <SectionHeader title="New Releases" subtitle="Fresh music and movies this week" href="/music" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.slice(0, 6).map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="space-y-3">
        <SectionHeader title="Featured Playlists" href="/music" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>

      {/* Creators to Watch */}
      <section className="space-y-3">
        <SectionHeader title="Creators to Watch" href="/creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>

      {/* Platinum Exclusives */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-4 lg:px-6">
          <Star className="size-5 text-accent" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Platinum Exclusives</h2>
            <p className="text-xs text-muted-foreground">Premium content for Platinum subscribers</p>
          </div>
          <Link href="/subscriptions" className="ml-auto rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/30">Upgrade</Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(3, 7).map(movie => (
            <div key={movie.id} className="relative w-32 flex-shrink-0 sm:w-36">
              <MovieCard movie={movie} />
              <div className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">PLATINUM</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="space-y-3">
        <SectionHeader title="Upcoming Events" href="/live" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockEvents.slice(0, 4).map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`}
              className="group w-64 flex-shrink-0 overflow-hidden rounded-xl bg-card sm:w-72">
              <div className="relative h-32">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                {evt.status === "live" && (
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                    <Zap className="size-3" /> LIVE
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground">{evt.date} &middot; {evt.location}</p>
                <p className="mt-1 text-xs text-primary">{evt.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
