"use client"
import { use } from "react"
import Link from "next/link"
import { SafeImage as Image } from "@/components/safe-image"
import { mockCountryHubs, mockArtists, mockMovies, mockTracks, mockCreators } from "@/lib/mock-data"
import { ArtistCard, MovieCard, TrackRow, CreatorCard, SectionHeader } from "@/components/content-card"
import { ArrowLeft, MapPin, Music, Film, Users, Globe } from "lucide-react"

export default function CountryHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const hub = mockCountryHubs.find(h => h.id === id) || mockCountryHubs[0]

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="px-4 lg:px-6">
        <Link href="/hubs" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Hubs
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-xl bg-primary/20 text-2xl font-bold text-primary">
            {hub.code}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{hub.name}</h1>
            <p className="text-sm text-muted-foreground">{hub.region}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Music className="size-3" /> {hub.artists} artists</span>
              <span className="flex items-center gap-1"><Film className="size-3" /> {hub.movies} movies</span>
              <span className="flex items-center gap-1"><Users className="size-3" /> {hub.creators} creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 lg:px-6">
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{hub.artists}</p>
          <p className="text-xs text-muted-foreground">Artists</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{hub.movies}</p>
          <p className="text-xs text-muted-foreground">Movies</p>
        </div>
        <div className="rounded-xl bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{hub.creators}</p>
          <p className="text-xs text-muted-foreground">Creators</p>
        </div>
      </div>

      {/* Top Tracks */}
      <section className="space-y-3">
        <SectionHeader title={`Top Tracks from ${hub.name}`} />
        <div className="px-4 lg:px-6">
          <div className="rounded-xl bg-card p-3">
            {mockTracks.slice(0, 5).map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="space-y-3">
        <SectionHeader title="Featured Artists" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.slice(0, 6).map(a => <ArtistCard key={a.id} artist={a} />)}
        </div>
      </section>

      {/* Movies */}
      <section className="space-y-3">
        <SectionHeader title={`Movies from ${hub.name}`} />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(0, 6).map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>

      {/* Creators */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.slice(0, 4).map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>
    </div>
  )
}
