"use client"
import { genres, mockTracks, mockArtists, mockPlaylists } from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { Music, Play, TrendingUp, Shuffle, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const genreColors: Record<string, string> = {
  "Afrobeats": "from-orange-500 to-red-600",
  "Amapiano": "from-purple-500 to-pink-600",
  "Bongo Flava": "from-green-500 to-teal-600",
  "Highlife": "from-yellow-500 to-orange-600",
  "Afro-Soul": "from-blue-500 to-purple-600",
  "Gqom": "from-red-500 to-pink-600",
  "Gengetone": "from-cyan-500 to-blue-600",
  "Hiplife": "from-emerald-500 to-green-600",
  "Kwaito": "from-amber-500 to-yellow-600",
  "Afro-House": "from-violet-500 to-purple-600",
  "Juju": "from-rose-500 to-red-600",
  "Mbalax": "from-indigo-500 to-blue-600",
  "Coupé-Décalé": "from-fuchsia-500 to-pink-600",
  "Ndombolo": "from-lime-500 to-green-600",
  "Afro-Fusion": "from-sky-500 to-cyan-600",
  "Gospel": "from-amber-400 to-orange-500",
  "R&B": "from-pink-500 to-rose-600",
  "Hip-Hop": "from-slate-500 to-gray-700",
}

const genreStats: Record<string, { tracks: number; artists: number; playlists: number }> = {
  "Afrobeats": { tracks: 12500, artists: 890, playlists: 245 },
  "Amapiano": { tracks: 8900, artists: 560, playlists: 189 },
  "Bongo Flava": { tracks: 4500, artists: 320, playlists: 78 },
  "Highlife": { tracks: 3200, artists: 210, playlists: 56 },
  "Afro-Soul": { tracks: 2800, artists: 180, playlists: 45 },
  "Gqom": { tracks: 3100, artists: 240, playlists: 67 },
}

export default function GenresPage() {
  const { playTrack } = usePlayer()
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const topGenres = genres.slice(0, 6)
  const allGenres = genres

  return (
    <div className="space-y-8 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 lg:mx-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Music className="size-5 text-primary" />
            <span className="text-sm font-medium text-primary">Explore</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Browse by Genre</h1>
          <p className="text-muted-foreground max-w-xl">Discover the full spectrum of African music - from Afrobeats to Zouglou</p>
        </div>
      </section>

      {/* Top Genres - Large Cards */}
      <section className="px-4 lg:px-6 space-y-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Popular Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topGenres.map((genre) => {
            const stats = genreStats[genre] || { tracks: Math.floor(Math.random() * 5000 + 500), artists: Math.floor(Math.random() * 300 + 50), playlists: Math.floor(Math.random() * 100 + 20) }
            const gradient = genreColors[genre] || "from-primary to-primary/50"
            return (
              <Link key={genre} href={`/music?genre=${encodeURIComponent(genre)}`} className="group">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 h-40 hover-lift`}>
                  <div className="absolute -right-6 -bottom-6 opacity-20">
                    <Headphones className="size-32" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{genre}</h3>
                    <p className="text-sm text-white/80">{stats.tracks.toLocaleString()} tracks</p>
                    <p className="text-xs text-white/60">{stats.artists} artists</p>
                  </div>
                  <Button size="sm" className="absolute bottom-4 right-4 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Shuffle className="size-4 mr-1" /> Shuffle
                  </Button>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* All Genres Grid */}
      <section className="px-4 lg:px-6 space-y-4">
        <h2 className="font-display text-xl font-semibold text-foreground">All Genres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {allGenres.map((genre, i) => {
            const gradient = genreColors[genre] || `from-[hsl(${(i * 23) % 360},70%,45%)] to-[hsl(${(i * 23 + 30) % 360},70%,35%)]`
            return (
              <Link key={genre} href={`/music?genre=${encodeURIComponent(genre)}`} className="group">
                <div className="glass-card rounded-xl p-4 hover-lift transition-all">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} mb-3 flex items-center justify-center`}>
                    <Music className="size-6 text-white" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm">{genre}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{Math.floor(Math.random() * 5000 + 500)} tracks</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Genre Playlists */}
      <section className="px-4 lg:px-6 space-y-4">
        <h2 className="font-display text-xl font-semibold text-foreground">Genre Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockPlaylists.slice(0, 6).map(playlist => (
            <Link key={playlist.id} href={`/music/playlist/${playlist.id}`} className="group">
              <div className="glass-card rounded-xl p-3 hover-lift">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                  <Image src={playlist.cover} alt={playlist.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full bg-primary text-primary-foreground">
                      <Play className="size-5 fill-current" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-medium text-foreground text-sm truncate">{playlist.name}</h3>
                <p className="text-xs text-muted-foreground">{playlist.trackCount} tracks</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
