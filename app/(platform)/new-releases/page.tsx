"use client"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, formatNumber } from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { Play, Clock, TrendingUp, Sparkles, Film, Music, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const newMusicReleases = mockAlbums.slice(0, 8)
const newMovieReleases = mockMovies.slice(0, 6)
const newCreatorVideos = mockCreators.slice(0, 4)

const releaseCalendar = [
  { date: "May 24", artist: "Burna Boy", title: "African Giant II", type: "Album" },
  { date: "May 26", artist: "Tyla", title: "Water (Remix)", type: "Single" },
  { date: "May 28", artist: "Wizkid", title: "Made in Lagos Deluxe", type: "Album" },
  { date: "Jun 1", artist: "Davido", title: "Timeless Tour Film", type: "Documentary" },
  { date: "Jun 5", artist: "Rema", title: "Calm Down Pt 2", type: "Single" },
]

export default function NewReleasesPage() {
  const { playTrack } = usePlayer()

  return (
    <div className="space-y-8 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 lg:mx-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-background" />
        <div className="relative px-6 py-12 md:py-16">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-primary" />
            <span className="text-sm font-medium text-primary">Fresh Drops</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">New Releases</h1>
          <p className="text-muted-foreground max-w-xl">The latest music, movies, and creator content from across Africa. Updated every Friday.</p>
        </div>
      </section>

      {/* Release Calendar */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">Coming Soon</h2>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="space-y-3">
            {releaseCalendar.map((release, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-16 text-center">
                  <span className="text-xs text-muted-foreground">{release.date}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{release.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{release.artist}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">{release.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Music */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">New Music</h2>
          </div>
          <Link href="/music" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {newMusicReleases.map(album => (
            <Link key={album.id} href={`/music/album/${album.id}`} className="group">
              <div className="glass-card rounded-xl p-3 hover-lift">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                  <Image src={album.cover} alt={album.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full bg-primary text-primary-foreground glow-primary">
                      <Play className="size-5 fill-current" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary text-primary-foreground">NEW</span>
                  </div>
                </div>
                <h3 className="font-medium text-foreground truncate text-sm">{album.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Movies & Series */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">New Movies & Series</h2>
          </div>
          <Link href="/movies" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {newMovieReleases.map(movie => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
              <div className="glass-card rounded-xl overflow-hidden hover-lift">
                <div className="relative aspect-[2/3]">
                  <Image src={movie.poster} alt={movie.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary text-primary-foreground">NEW</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-medium text-white text-sm truncate">{movie.title}</h3>
                    <p className="text-xs text-white/70">{movie.year} • {movie.genre}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Creator Content */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">Fresh Creator Videos</h2>
          </div>
          <Link href="/creators" className="text-sm text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newCreatorVideos.map(creator => (
            <Link key={creator.id} href={`/creators/${creator.id}`} className="group">
              <div className="glass-card rounded-xl overflow-hidden hover-lift">
                <div className="relative aspect-video">
                  <Image src={creator.banner} alt={creator.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="rounded-full bg-primary text-primary-foreground">
                      <Play className="size-5 fill-current" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 flex items-center gap-3">
                  <div className="relative size-10 rounded-full overflow-hidden">
                    <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm truncate">{creator.name}</h3>
                    <p className="text-xs text-muted-foreground">{formatNumber(creator.subscribers)} subscribers</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
