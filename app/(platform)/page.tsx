"use client"
import { useState, useEffect } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { 
  Play, ChevronRight, TrendingUp, MapPin, Zap, Mic, Film, Video, BookOpen, Calendar, 
  Upload, BarChart3, Users, DollarSign, Sparkles, ChevronDown, Music, Eye, Radio, Crown, Heart
} from "lucide-react"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, mockPlaylists, mockEvents, formatNumber } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, MovieCard, CreatorCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Listener Home ────────────────────────────────────────────────────────────
function ListenerHome() {
  const { playTrack, setQueue, currentTrack, isPlaying } = usePlayer()
  const { user } = useUser()
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

  const heroItems = [
    { id: "h1", title: "Afrobeats Global", subtitle: "The biggest sounds from across Africa", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop", type: "playlist" as const, gradient: "from-primary/90 via-orange-900/70" },
    { id: "h2", title: "Nollywood Premieres", subtitle: "Stream the latest African cinema", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop", type: "movie" as const, gradient: "from-purple-900/90 via-purple-800/70" },
    { id: "h3", title: "Live From Lagos", subtitle: "Exclusive concerts and events", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop", type: "event" as const, gradient: "from-cyan-900/90 via-blue-900/70" },
  ]

  useEffect(() => {
    const timer = setInterval(() => setActiveHeroIndex(i => (i + 1) % heroItems.length), 6000)
    return () => clearInterval(timer)
  }, [heroItems.length])

  const handlePlayAll = () => { setQueue(mockTracks); playTrack(mockTracks[0]) }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ── Hero Section ── */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
          {heroItems.map((item, idx) => (
            <div key={item.id} className={cn("absolute inset-0 transition-all duration-1000", idx === activeHeroIndex ? "opacity-100" : "opacity-0")}>
              <Image src={item.image} alt={item.title} fill className="object-cover" priority={idx === 0} />
              <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} to-transparent`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          ))}

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
            <div className="max-w-3xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                {heroItems[activeHeroIndex].type === "movie" ? <Film className="size-4" /> : heroItems[activeHeroIndex].type === "event" ? <Zap className="size-4" /> : <Music className="size-4" />}
                {heroItems[activeHeroIndex].type === "movie" ? "New Film" : heroItems[activeHeroIndex].type === "event" ? "Live Event" : "Featured Playlist"}
              </span>
              <h1 className="font-display text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                {heroItems[activeHeroIndex].title}
              </h1>
              <p className="mt-3 text-lg text-white/70 sm:text-xl">{heroItems[activeHeroIndex].subtitle}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button size="lg" className="h-14 gap-3 rounded-full px-8 text-lg glow-primary">
                  <Play className="size-5" fill="currentColor" /> Play Now
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/30 bg-white/10 px-8 text-lg text-white backdrop-blur-sm hover:bg-white/20">
                  <Heart className="mr-2 size-5" /> Save
                </Button>
              </div>
            </div>

            {/* Hero Indicators */}
            <div className="mt-8 flex items-center gap-3">
              {heroItems.map((_, idx) => (
                <button key={idx} onClick={() => setActiveHeroIndex(idx)} className={cn("h-1 rounded-full transition-all duration-500", idx === activeHeroIndex ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/50")} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI DJ Banner ── */}
      <section className="px-4 lg:px-6 -mt-12 relative z-10">
        <Link href="/dj" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-card/80 p-5 backdrop-blur-xl transition-all hover:border-primary/30 hover:bg-card">
          <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 shadow-lg">
            <Sparkles className="size-6 text-white" />
            <span className="absolute -right-1 -top-1 flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex size-3 rounded-full bg-green-500" /></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-foreground">Ask DJ</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">AI</span>
            </div>
            <p className="truncate text-sm text-muted-foreground">{"\"Play something for a late night drive\""}</p>
          </div>
          <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* ── Now Playing Card ── */}
      {currentTrack && (
        <section className="px-4 lg:px-6 mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card">
            <div className="absolute inset-0 opacity-20">
              <Image src={currentTrack.coverArt} alt="" fill className="object-cover blur-2xl" />
            </div>
            <div className="relative flex items-center gap-4 p-4">
              <div className="relative size-16 overflow-hidden rounded-xl">
                <Image src={currentTrack.coverArt} alt={currentTrack.title} fill className="object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex items-end gap-0.5 h-4">
                      {[0,1,2].map(i => <div key={i} className="eq-bar w-1 rounded-full bg-primary" style={{animationDelay: `${i*0.15}s`}} />)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">Now Playing</p>
                <p className="truncate text-lg font-bold text-foreground">{currentTrack.title}</p>
                <p className="truncate text-sm text-muted-foreground">{currentTrack.artist}</p>
              </div>
              <Button size="icon" variant="ghost" className="size-12 rounded-full">
                <Heart className="size-5" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Quick Stats ── */}
      <section className="px-4 lg:px-6 mt-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Trending", value: "50", icon: TrendingUp, color: "from-primary to-orange-600" },
            { label: "New Releases", value: "24", icon: Sparkles, color: "from-purple-500 to-pink-500" },
            { label: "Live Now", value: "8", icon: Radio, color: "from-red-500 to-rose-500" },
            { label: "For You", value: "100+", icon: Heart, color: "from-cyan-500 to-blue-500" },
          ].map(stat => (
            <div key={stat.label} className="group rounded-2xl border border-white/10 bg-card p-4 transition-colors hover:border-white/20">
              <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="size-5 text-white" />
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top 10 Chart ── */}
      <section className="mt-12">
        <div className="px-4 lg:px-6 mb-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Updated Daily</p>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Top 10 Africa</h2>
            </div>
            <Link href="/music/charts" className="text-sm font-medium text-primary hover:underline">See Full Chart</Link>
          </div>
        </div>
        <div className="px-4 lg:px-6">
          <div className="rounded-2xl border border-white/10 bg-card/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="size-5 text-primary" />
                <span className="font-medium text-foreground">Chart Leaders</span>
              </div>
              <Button onClick={handlePlayAll} size="sm" className="gap-2 rounded-full">
                <Play className="size-3" fill="currentColor" /> Play All
              </Button>
            </div>
            <div className="space-y-1">
              {mockTracks.slice(0, 10).map((track, i) => (
                <TrackRow key={track.id} track={track} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Artists ── */}
      <section className="mt-12">
        <SectionHeader title="Trending Artists" href="/music/charts/artists" subtitle="The hottest names right now" />
        <div className="mt-4 px-4 lg:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockArtists.slice(0, 5).map((artist, i) => (
              <Link key={artist.id} href={`/music/artist/${artist.id}`} className="group text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-full border-2 border-transparent transition-all group-hover:border-primary">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  {i < 3 && (
                    <div className={cn("absolute -bottom-1 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full text-sm font-bold", i === 0 ? "bg-yellow-500 text-black" : i === 1 ? "bg-gray-300 text-black" : "bg-amber-700 text-white")}>
                      {i + 1}
                    </div>
                  )}
                </div>
                <p className="mt-3 truncate font-medium text-foreground">{artist.name}</p>
                <p className="text-xs text-muted-foreground">{formatNumber(artist.monthlyListeners)} monthly</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Releases ── */}
      <section className="mt-12">
        <SectionHeader title="New Releases" href="/new-releases" subtitle="Fresh drops this week" />
        <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* ── Short Clips ── */}
      <section className="mt-12">
        <SectionHeader title="Short Clips" href="/shorts" subtitle="Trending videos" />
        <div className="mt-4 no-scrollbar flex gap-3 overflow-x-auto px-4 lg:px-6">
          {mockCreators.slice(0, 6).map((creator) => (
            <Link key={creator.id} href={`/shorts`} className="group relative aspect-[9/16] w-36 flex-shrink-0 overflow-hidden rounded-2xl sm:w-40">
              <Image src={creator.avatar} alt={creator.name} fill className="object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="truncate text-sm font-medium text-white">{creator.name}</p>
                <p className="text-xs text-white/70">{formatNumber(Math.floor(Math.random() * 500 + 100) * 1000)} views</p>
              </div>
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                <Eye className="size-3" /> {Math.floor(Math.random() * 50 + 10)}K
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Movies & Series ── */}
      <section className="mt-12">
        <SectionHeader title="Movies & Series" href="/movies" subtitle="African cinema at its best" />
        <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>

      {/* ── Featured Playlists ── */}
      <section className="mt-12">
        <SectionHeader title="Featured Playlists" href="/music" subtitle="Curated by AfriStream" />
        <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>

      {/* ── Live & Upcoming ── */}
      <section className="mt-12">
        <SectionHeader title="Live & Upcoming" href="/live" subtitle="Concerts, premieres, and more" />
        <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockEvents.slice(0, 4).map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`} className="group w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-card">
              <div className="relative h-40">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                {evt.status === "live" && (
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" /> LIVE
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground">{evt.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{evt.date}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{evt.price}</span>
                  <Button size="sm" variant="outline" className="rounded-full text-xs">Get Tickets</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Creators ── */}
      <section className="mt-12">
        <SectionHeader title="Creators to Follow" href="/creators" subtitle="Rising African talent" />
        <div className="mt-4 no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>
    </div>
  )
}

// ─── Studio Home (shared for Artist/Creator/Filmmaker/Educator) ───────────────
function StudioHome({ 
  type, 
  stats, 
  actions 
}: { 
  type: "artist" | "creator" | "filmmaker" | "educator"
  stats: Array<{ label: string; value: string; trend?: string }>
  actions: Array<{ title: string; description: string; icon: React.ElementType; href: string; color: string }>
}) {
  const { user } = useUser()
  const typeConfig = {
    artist: { icon: Mic, label: "Artist Studio", title: "Your Music Empire", gradient: "from-primary/20 via-orange-500/10" },
    creator: { icon: Video, label: "Creator Studio", title: "Your Content Hub", gradient: "from-purple-500/20 via-pink-500/10" },
    filmmaker: { icon: Film, label: "Film Studio", title: "Your Cinema", gradient: "from-cyan-500/20 via-blue-500/10" },
    educator: { icon: BookOpen, label: "Culture Studio", title: "Your Heritage Archive", gradient: "from-amber-500/20 via-orange-500/10" },
  }
  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <section className={`relative bg-gradient-to-b ${config.gradient} to-background pt-8 pb-12`}>
        <div className="px-4 lg:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-foreground">
            <Icon className="size-4 text-primary" />
            {config.label}
          </span>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {config.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome back, {user?.name?.split(" ")[0] || "Creator"}
          </p>
          <div className="mt-6">
            <Link href={`/${type === "educator" ? "culture-studio" : type}`}>
              <Button size="lg" className="gap-2 rounded-full">
                <Icon className="size-5" /> Open Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-4 lg:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-card p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 font-mono text-2xl font-bold text-foreground">{stat.value}</p>
              {stat.trend && (
                <p className="mt-1 flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="size-3" /> {stat.trend}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 lg:px-6 mt-8">
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {actions.map(action => (
            <Link key={action.title} href={action.href} className="group rounded-2xl border border-white/10 bg-card p-4 transition-colors hover:border-white/20">
              <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color}`}>
                <action.icon className="size-5 text-white" />
              </div>
              <h3 className="font-medium text-foreground">{action.title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Content */}
      <section className="mt-12">
        <SectionHeader title="Your Top Performing" />
        <div className="mt-4 px-4 lg:px-6">
          <div className="rounded-2xl border border-white/10 bg-card/50 p-4">
            <div className="space-y-1">
              {mockTracks.slice(0, 5).map((track, i) => (
                <TrackRow key={track.id} track={track} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { isLoading, activeMode } = useUser()

  if (isLoading) {
    return null // Let loading.tsx handle this
  }

  const studioConfigs = {
    artist: {
      stats: [
        { label: "Monthly Streams", value: "847K", trend: "+12.4%" },
        { label: "Earnings", value: "$2,847", trend: "+8.2%" },
        { label: "Followers", value: "24.5K", trend: "+342" },
      ],
      actions: [
        { title: "Upload Music", description: "Release new tracks", icon: Upload, href: "/artist", color: "from-primary to-orange-600" },
        { title: "Analytics", description: "View performance", icon: BarChart3, href: "/artist", color: "from-blue-500 to-cyan-500" },
        { title: "Fan Insights", description: "Know your audience", icon: Users, href: "/artist/fans", color: "from-purple-500 to-pink-500" },
        { title: "Royalties", description: "Track earnings", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
      ],
    },
    creator: {
      stats: [
        { label: "Total Views", value: "1.2M" },
        { label: "This Month", value: "$1,420" },
        { label: "Subscribers", value: "89K" },
      ],
      actions: [
        { title: "Upload Video", description: "Post content", icon: Video, href: "/creator", color: "from-primary to-red-500" },
        { title: "Go Live", description: "Start streaming", icon: Zap, href: "/creator", color: "from-purple-500 to-pink-500" },
        { title: "Monetization", description: "Earnings & tips", icon: DollarSign, href: "/creator/monetization", color: "from-green-500 to-emerald-500" },
        { title: "Analytics", description: "Channel stats", icon: BarChart3, href: "/creator", color: "from-blue-500 to-cyan-500" },
      ],
    },
    filmmaker: {
      stats: [
        { label: "Total Views", value: "156K" },
        { label: "This Month", value: "$4,820" },
        { label: "Active Films", value: "8" },
      ],
      actions: [
        { title: "Upload Film", description: "Submit for distribution", icon: Film, href: "/film", color: "from-primary to-pink-500" },
        { title: "Schedule Premiere", description: "Plan release", icon: Calendar, href: "/film/premieres", color: "from-purple-500 to-indigo-500" },
        { title: "Revenue", description: "Rentals & purchases", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
        { title: "Licensing", description: "Manage rights", icon: BookOpen, href: "/licensing", color: "from-blue-500 to-cyan-500" },
      ],
    },
    educator: {
      stats: [
        { label: "Active Learners", value: "2.4K" },
        { label: "Lessons Complete", value: "12.8K" },
        { label: "Languages", value: "5" },
      ],
      actions: [
        { title: "Archive Content", description: "Preserve heritage", icon: BookOpen, href: "/culture-studio/heritage", color: "from-amber-500 to-orange-500" },
        { title: "Language Course", description: "Teach languages", icon: Mic, href: "/culture-studio/heritage", color: "from-green-500 to-emerald-500" },
        { title: "Community", description: "Connect educators", icon: Users, href: "/culture-studio", color: "from-blue-500 to-cyan-500" },
        { title: "Impact", description: "View your reach", icon: BarChart3, href: "/culture-studio", color: "from-purple-500 to-pink-500" },
      ],
    },
  }

  if (activeMode && activeMode !== "listener" && studioConfigs[activeMode as keyof typeof studioConfigs]) {
    const config = studioConfigs[activeMode as keyof typeof studioConfigs]
    return <StudioHome type={activeMode as "artist" | "creator" | "filmmaker" | "educator"} stats={config.stats} actions={config.actions} />
  }

  return <ListenerHome />
}
