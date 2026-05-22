"use client"
import { useState } from "react"
import { mockTracks, mockAlbums, mockMovies, mockPlaylists, mockArtists, mockCreators } from "@/lib/mock-data"
import { TrackRow, AlbumCard, MovieCard, PlaylistCard, ArtistCard, CreatorCard } from "@/components/content-card"
import { cn } from "@/lib/utils"
import { Library, Heart, Music, Film, Mic2, Download, Clock } from "lucide-react"

const tabs = [
  { label: "Music", icon: Music },
  { label: "Movies", icon: Film },
  { label: "Creators", icon: Mic2 },
  { label: "Podcasts", icon: Mic2 },
  { label: "Downloads", icon: Download },
]

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("Music")

  return (
    <div className="space-y-6 py-4">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Library className="size-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Your Library</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
        {tabs.map(tab => (
          <button key={tab.label} onClick={() => setActiveTab(tab.label)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.label ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}>
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 lg:px-6 pb-8">
        {activeTab === "Music" && (
          <div className="space-y-8">
            {/* Liked Songs */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="size-4 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Liked Songs</h2>
                <span className="text-xs text-muted-foreground">{mockTracks.length} songs</span>
              </div>
              <div className="rounded-xl bg-card p-3">
                {mockTracks.slice(0, 5).map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
              </div>
            </section>

            {/* Your Playlists */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Your Playlists</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {mockPlaylists.slice(0, 4).map(p => <PlaylistCard key={p.id} playlist={p} />)}
              </div>
            </section>

            {/* Saved Albums */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Saved Albums</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {mockAlbums.slice(0, 5).map(a => <AlbumCard key={a.id} album={a} />)}
              </div>
            </section>

            {/* Followed Artists */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Followed Artists</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {mockArtists.slice(0, 6).map(a => <ArtistCard key={a.id} artist={a} />)}
              </div>
            </section>

            {/* Recently Played */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">Recently Played</h2>
              </div>
              <div className="rounded-xl bg-card p-3">
                {mockTracks.slice(3, 8).map((t, i) => <TrackRow key={t.id} track={t} index={i} />)}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Movies" && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Watchlist</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {mockMovies.slice(0, 6).map(m => <MovieCard key={m.id} movie={m} />)}
              </div>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Watch History</h2>
              <div className="no-scrollbar flex gap-4 overflow-x-auto">
                {mockMovies.slice(3, 8).map(m => <MovieCard key={m.id} movie={m} />)}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Creators" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Subscribed Creators</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
            </div>
          </div>
        )}

        {(activeTab === "Podcasts" || activeTab === "Downloads") && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-muted">
              <Download className="size-6 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium">No {activeTab.toLowerCase()} yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your {activeTab.toLowerCase()} will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
