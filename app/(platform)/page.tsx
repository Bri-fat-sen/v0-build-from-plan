"use client"
import Image from "next/image"
import Link from "next/link"
import { Play, ChevronRight, TrendingUp, MapPin, Star, Zap, Mic, Film, Video, BookOpen, Calendar, Upload, BarChart3, Users, DollarSign, Bell, Settings } from "lucide-react"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, mockPlaylists, mockEvents } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, MovieCard, CreatorCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"

// Hero items for listeners/fans
const heroItems = [
  { id: "h1", title: "Afrobeats Global Takeover", subtitle: "The biggest sounds from across Africa", image: "https://picsum.photos/seed/hero1/1200/500", type: "playlist" as const, link: "/music" },
  { id: "h2", title: "The Black Book", subtitle: "Nigeria's highest-rated thriller", image: "https://picsum.photos/seed/hero2/1200/500", type: "movie" as const, link: "/movies/m1" },
  { id: "h3", title: "AfroNation Ghana 2025", subtitle: "Get your tickets now", image: "https://picsum.photos/seed/hero3/1200/500", type: "event" as const, link: "/live/e1" },
]

// Quick action cards for different user types
const artistQuickActions = [
  { title: "Upload Music", description: "Release new tracks or albums", icon: Upload, href: "/artist", color: "from-orange-500 to-red-500" },
  { title: "View Analytics", description: "See your streaming stats", icon: BarChart3, href: "/artist", color: "from-blue-500 to-cyan-500" },
  { title: "Fan Insights", description: "Know your audience", icon: Users, href: "/artist/fans", color: "from-purple-500 to-pink-500" },
  { title: "Royalties", description: "Track your earnings", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
]

const creatorQuickActions = [
  { title: "Upload Video", description: "Post new content", icon: Video, href: "/creator", color: "from-red-500 to-orange-500" },
  { title: "Go Live", description: "Start streaming now", icon: Zap, href: "/creator", color: "from-purple-500 to-pink-500" },
  { title: "Monetization", description: "Earnings & tips", icon: DollarSign, href: "/creator/monetization", color: "from-green-500 to-emerald-500" },
  { title: "Analytics", description: "Channel performance", icon: BarChart3, href: "/creator", color: "from-blue-500 to-cyan-500" },
]

const filmmakerQuickActions = [
  { title: "Upload Film", description: "Submit for distribution", icon: Film, href: "/film", color: "from-purple-500 to-pink-500" },
  { title: "Schedule Premiere", description: "Plan your release", icon: Calendar, href: "/film/premieres", color: "from-orange-500 to-red-500" },
  { title: "Revenue", description: "Rentals & purchases", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
  { title: "Licensing", description: "Manage rights", icon: BookOpen, href: "/licensing", color: "from-blue-500 to-cyan-500" },
]

const culturalQuickActions = [
  { title: "Archive Content", description: "Preserve heritage", icon: BookOpen, href: "/culture-studio/heritage", color: "from-amber-500 to-orange-500" },
  { title: "Language Course", description: "Teach African languages", icon: Mic, href: "/culture-studio/heritage", color: "from-green-500 to-emerald-500" },
  { title: "Community", description: "Connect educators", icon: Users, href: "/culture-studio", color: "from-blue-500 to-cyan-500" },
  { title: "Impact", description: "View your reach", icon: BarChart3, href: "/culture-studio", color: "from-purple-500 to-pink-500" },
]

// Listener Home Component
function ListenerHome() {
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
        <SectionHeader title="For You" subtitle="Your personalized mix across music, movies & creators" href="/for-you" />
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
          <Link href="/diaspora" className="ml-auto text-xs font-medium text-primary hover:underline">Diaspora Hub</Link>
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

// Creator Quick Actions Component
function QuickActionsGrid({ actions, title, subtitle }: { actions: typeof artistQuickActions, title: string, subtitle: string }) {
  return (
    <section className="space-y-4 px-4 py-6 lg:px-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {actions.map(action => (
          <Link key={action.title} href={action.href}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80">
            <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${action.color}`}>
              <action.icon className="size-5 text-white" />
            </div>
            <h3 className="font-medium text-foreground">{action.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Artist Home Component
function ArtistHome() {
  const { playTrack, setQueue } = usePlayer()

  return (
    <div className="space-y-6 py-4">
      {/* Welcome Banner */}
      <div className="mx-4 rounded-2xl bg-gradient-to-r from-primary/20 via-orange-500/10 to-transparent p-6 lg:mx-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Artist</h1>
            <p className="text-sm text-muted-foreground">Your music reached 12.4K new listeners this week</p>
          </div>
          <Link href="/artist">
            <Button><BarChart3 className="mr-2 size-4" /> View Studio</Button>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-primary">847K</p>
            <p className="text-xs text-muted-foreground">Monthly Streams</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-green-400">$2,847</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-foreground">24.5K</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsGrid actions={artistQuickActions} title="Quick Actions" subtitle="Manage your music and audience" />

      {/* Your Top Tracks */}
      <section className="space-y-3">
        <SectionHeader title="Your Top Tracks" subtitle="Best performing songs this month" href="/artist" />
        <div className="px-4 lg:px-6">
          <div className="rounded-xl bg-card p-3">
            {mockTracks.slice(0, 5).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Discover What Fans Are Listening To */}
      <section className="space-y-3">
        <SectionHeader title="What Your Fans Listen To" subtitle="Artists similar to you that your fans enjoy" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* Trending in Your Genre */}
      <section className="space-y-3">
        <SectionHeader title="Trending in Afrobeats" href="/music/charts" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.slice(0, 6).map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>
    </div>
  )
}

// Creator Home Component
function CreatorHome() {
  return (
    <div className="space-y-6 py-4">
      {/* Welcome Banner */}
      <div className="mx-4 rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/10 to-transparent p-6 lg:mx-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Creator</h1>
            <p className="text-sm text-muted-foreground">Your content reached 45K views this week</p>
          </div>
          <Link href="/creator">
            <Button><Video className="mr-2 size-4" /> Creator Studio</Button>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-primary">1.2M</p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-green-400">$1,420</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-foreground">89K</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsGrid actions={creatorQuickActions} title="Quick Actions" subtitle="Create and monetize your content" />

      {/* Trending Creators */}
      <section className="space-y-3">
        <SectionHeader title="Trending Creators" subtitle="See what's working for others" href="/creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>

      {/* Content Ideas */}
      <section className="space-y-3 px-4 lg:px-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Trending Topics</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Amapiano Dance Challenge", "Lagos Street Food", "African Fashion Week", "Nollywood Behind Scenes", "Diaspora Stories", "Tech in Africa"].map(topic => (
            <div key={topic} className="flex items-center gap-3 rounded-lg bg-card p-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <TrendingUp className="size-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{topic}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// Filmmaker Home Component
function FilmmakerHome() {
  return (
    <div className="space-y-6 py-4">
      {/* Welcome Banner */}
      <div className="mx-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-transparent p-6 lg:mx-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Filmmaker</h1>
            <p className="text-sm text-muted-foreground">Your films have been watched 234K times this month</p>
          </div>
          <Link href="/film">
            <Button><Film className="mr-2 size-4" /> Film Studio</Button>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-primary">5</p>
            <p className="text-xs text-muted-foreground">Films Released</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-green-400">$8,420</p>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-foreground">4.7</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsGrid actions={filmmakerQuickActions} title="Quick Actions" subtitle="Manage your films and releases" />

      {/* Your Films */}
      <section className="space-y-3">
        <SectionHeader title="Your Films" href="/film" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(0, 5).map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* Trending African Cinema */}
      <section className="space-y-3">
        <SectionHeader title="Trending African Cinema" href="/movies" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>
    </div>
  )
}

// Cultural Educator Home Component
function CulturalEducatorHome() {
  return (
    <div className="space-y-6 py-4">
      {/* Welcome Banner */}
      <div className="mx-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent p-6 lg:mx-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Educator</h1>
            <p className="text-sm text-muted-foreground">Your content has helped 12K learners this month</p>
          </div>
          <Link href="/culture-studio">
            <Button><BookOpen className="mr-2 size-4" /> Culture Studio</Button>
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-primary">24</p>
            <p className="text-xs text-muted-foreground">Courses Published</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-green-400">12.4K</p>
            <p className="text-xs text-muted-foreground">Active Learners</p>
          </div>
          <div className="rounded-lg bg-card/50 p-3 backdrop-blur-sm">
            <p className="font-mono text-2xl font-bold text-foreground">8</p>
            <p className="text-xs text-muted-foreground">Languages</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionsGrid actions={culturalQuickActions} title="Quick Actions" subtitle="Preserve and share African heritage" />

      {/* Popular Language Courses */}
      <section className="space-y-3 px-4 lg:px-6">
        <h2 className="font-display text-xl font-semibold text-foreground">Popular Language Courses</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Swahili Basics", "Yoruba for Beginners", "Learn Amharic", "Zulu Essentials", "Wolof Conversations", "Igbo Fundamentals"].map((course, i) => (
            <div key={course} className="flex items-center gap-3 rounded-lg bg-card p-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 font-display text-lg font-bold text-primary">
                {course.split(" ")[0].slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-foreground">{course}</p>
                <p className="text-xs text-muted-foreground">{(i + 1) * 234} learners</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Collections */}
      <section className="space-y-3">
        <SectionHeader title="Heritage Collections" href="/culture" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>
    </div>
  )
}

// Main Page Component - Routes to appropriate home based on user type
export default function HomePage() {
  const { user } = useUser()

  // Default to listener experience if no user type is set
  const userType = user?.type || "listener"

  switch (userType) {
    case "artist":
      return <ArtistHome />
    case "creator":
    case "comedian":
      return <CreatorHome />
    case "filmmaker":
      return <FilmmakerHome />
    case "cultural_educator":
      return <CulturalEducatorHome />
    case "label":
      return <ArtistHome /> // Labels see similar view to artists
    case "event_organizer":
      return <CreatorHome /> // Event organizers see creator-like view
    default:
      return <ListenerHome />
  }
}
