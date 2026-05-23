"use client"

import { useUser } from "@/lib/user-context"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, mockPlaylists, mockEvents } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, MovieCard, CreatorCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import Link from "next/link"
import { Play, Clock, Sparkles, TrendingUp, Heart, Users, Zap, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulated personalization based on user preferences
function getPersonalizedContent(interests: string[], countries: string[]) {
  // Filter content based on user's connected countries
  const relevantArtists = mockArtists.filter(a => 
    countries.some(c => a.country.toLowerCase().includes(c.toLowerCase()))
  )
  
  const relevantTracks = mockTracks.filter(t => 
    countries.some(c => t.country.toLowerCase().includes(c.toLowerCase()))
  )
  
  const relevantMovies = mockMovies.filter(m => 
    countries.some(c => m.country.toLowerCase().includes(c.toLowerCase()))
  )

  return {
    artists: relevantArtists.length > 0 ? relevantArtists : mockArtists.slice(0, 6),
    tracks: relevantTracks.length > 0 ? relevantTracks : mockTracks.slice(0, 8),
    movies: relevantMovies.length > 0 ? relevantMovies : mockMovies.slice(0, 4),
  }
}

export default function ForYouPage() {
  const { user } = useUser()
  const { playTrack } = usePlayer()
  
  const personalized = getPersonalizedContent(
    user?.interests || [],
    user?.connectedCountries || ["Nigeria", "Ghana", "South Africa"]
  )

  const timeOfDay = new Date().getHours()
  const greeting = timeOfDay < 12 ? "Good morning" : timeOfDay < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Personalized Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background to-background mx-4 lg:mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.15),transparent_50%)]" />
        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">{greeting}</p>
              <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {user?.name || "Welcome back"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your personalized African entertainment experience
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/rewind">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="size-4" />
                  Your Rewind
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="size-4" />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-lg bg-card/50 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Connected to</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {user?.connectedCountries?.join(", ") || "3 countries"}
              </p>
            </div>
            <div className="rounded-lg bg-card/50 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Languages</p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {user?.languages?.slice(0, 2).join(", ") || "2 languages"}
              </p>
            </div>
            <div className="rounded-lg bg-card/50 px-4 py-2 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Plan</p>
              <p className="font-mono text-sm font-semibold text-primary capitalize">
                {user?.subscriptionTier || "Premium"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Mix - Personalized Daily Playlists */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <Zap className="size-5 text-primary" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Your Daily Mix</h2>
            <p className="text-xs text-muted-foreground">Playlists made just for you, updated daily</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {[
            { name: "Daily Mix 1", desc: "Burna Boy, Wizkid, Davido and more", color: "from-orange-600 to-red-600" },
            { name: "Daily Mix 2", desc: "Amapiano vibes with Tyla, Focalistic", color: "from-purple-600 to-pink-600" },
            { name: "Daily Mix 3", desc: "East African hits from Kenya & Tanzania", color: "from-green-600 to-teal-600" },
            { name: "Daily Mix 4", desc: "Throwback Afrobeats classics", color: "from-blue-600 to-indigo-600" },
            { name: "Discover Weekly", desc: "New music we think you'll love", color: "from-primary to-orange-600" },
            { name: "Release Radar", desc: "New releases from artists you follow", color: "from-red-600 to-pink-600" },
          ].map((mix, i) => (
            <div 
              key={i}
              className="group relative min-w-[180px] cursor-pointer overflow-hidden rounded-xl"
            >
              <div className={`aspect-square bg-gradient-to-br ${mix.color}`}>
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-white">{mix.name}</h3>
                  <p className="mt-0.5 text-xs text-white/80 line-clamp-2">{mix.desc}</p>
                </div>
              </div>
              <button className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100">
                <Play className="size-5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <Clock className="size-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-semibold text-foreground">Jump Back In</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-6">
          {mockTracks.slice(0, 6).map((track) => (
            <button
              key={track.id}
              onClick={() => playTrack(track)}
              className="group flex items-center gap-3 rounded-lg bg-card/50 p-2 text-left transition-colors hover:bg-card"
            >
              <img src={track.coverArt} alt={track.title} className="size-12 rounded object-cover" />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">{track.title}</p>
                <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Your Top Artists */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <Heart className="size-5 text-red-500" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Your Top Artists</h2>
            <p className="text-xs text-muted-foreground">Based on your listening history</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {personalized.artists.slice(0, 8).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Trending in Your Countries */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <TrendingUp className="size-5 text-green-500" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Trending in {user?.connectedCountries?.[0] || "Nigeria"}
            </h2>
            <p className="text-xs text-muted-foreground">What people are listening to right now</p>
          </div>
        </div>
        <div className="space-y-1 px-4 lg:px-6">
          {personalized.tracks.slice(0, 5).map((track, index) => (
            <TrackRow key={track.id} track={track} index={index + 1} onPlay={() => playTrack(track)} />
          ))}
        </div>
      </section>

      {/* Made For You Playlists */}
      <section className="space-y-4">
        <SectionHeader title="Made For You" subtitle="Playlists curated based on your taste" />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {mockPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* New Releases For You */}
      <section className="space-y-4">
        <SectionHeader title="New Releases For You" href="/music" />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {mockAlbums.slice(0, 8).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Movies & Shows For You */}
      <section className="space-y-4">
        <SectionHeader title="Movies & Shows For You" href="/movies" />
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {personalized.movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Creators You Might Like */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <Users className="size-5 text-purple-500" />
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Creators You Might Like</h2>
            <p className="text-xs text-muted-foreground">Based on your interests</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-6 scrollbar-hide">
          {mockCreators.slice(0, 6).map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Near You */}
      <section className="space-y-4">
        <SectionHeader title="Events Near You" href="/live" />
        <div className="grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {mockEvents.slice(0, 3).map((event) => (
            <Link 
              key={event.id}
              href={`/live/${event.id}`}
              className="group overflow-hidden rounded-xl bg-card transition-transform hover:scale-[1.02]"
            >
              <div className="relative aspect-[2/1]">
                <img src={event.banner} alt={event.title} className="size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs font-medium text-primary">{event.date} at {event.time}</p>
                  <h3 className="mt-0.5 font-semibold text-white">{event.title}</h3>
                  <p className="text-xs text-white/70">{event.location}</p>
                </div>
                {event.status === "live" && (
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" />
                    LIVE
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
