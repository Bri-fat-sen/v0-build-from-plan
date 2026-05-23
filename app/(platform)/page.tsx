"use client"
import { useState, useEffect } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { 
  Play, ChevronRight, TrendingUp, MapPin, Zap, Mic, Film, Video, BookOpen, Calendar, 
  Upload, BarChart3, Users, DollarSign, Sparkles, Info, ChevronDown, Music, Eye, Radio
} from "lucide-react"
import { mockTracks, mockAlbums, mockArtists, mockMovies, mockCreators, mockPlaylists, mockEvents, formatNumber } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard, MovieCard, CreatorCard, PlaylistCard, SectionHeader } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Listener Home - 2026 Design
function ListenerHome() {
  const { playTrack, setQueue, currentTrack } = usePlayer()
  const { user } = useUser()
  const [showAboutSong, setShowAboutSong] = useState(false)
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

  const heroItems = [
    { id: "h1", title: "Afrobeats Global Takeover", subtitle: "The biggest sounds from across Africa", image: "https://picsum.photos/seed/hero1/1200/600", type: "playlist" as const, link: "/music", gradient: "from-orange-600/80 via-red-600/60 to-transparent" },
    { id: "h2", title: "The Black Book", subtitle: "Nigeria's highest-rated thriller", image: "https://picsum.photos/seed/hero2/1200/600", type: "movie" as const, link: "/movies/m1", gradient: "from-purple-600/80 via-pink-600/60 to-transparent" },
    { id: "h3", title: "Burna Boy Live in Lagos", subtitle: "Exclusive concert stream - Dec 31", image: "https://picsum.photos/seed/hero3/1200/600", type: "event" as const, link: "/live/e1", gradient: "from-cyan-600/80 via-blue-600/60 to-transparent" },
  ]

  useEffect(() => {
    const timer = setInterval(() => setActiveHeroIndex(i => (i + 1) % heroItems.length), 6000)
    return () => clearInterval(timer)
  }, [heroItems.length])

  const handlePlayAll = () => { setQueue(mockTracks); playTrack(mockTracks[0]) }

  return (
    <div className="space-y-8 pb-8">
      {/* AI DJ Banner */}
      <div className="mx-4 lg:mx-6">
        <Link href="/dj" className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-card p-4 transition-all hover:from-primary/30">
          <div className="relative flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-orange-600 shadow-lg glow-primary-sm">
            <Sparkles className="size-6 text-white" />
            <div className="absolute -right-1 -top-1 size-3 animate-pulse rounded-full bg-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-foreground">Ask DJ</span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">NEW</span>
            </div>
            <p className="text-sm text-muted-foreground">{"\"Play something for a late night drive\""}</p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Radio className="size-4 text-primary" />
            <span>Personalized AI radio</span>
          </div>
          <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Hero Carousel */}
      <div className="relative px-4 lg:px-6">
        <div className="relative aspect-[21/9] max-h-[380px] min-h-[280px] overflow-hidden rounded-3xl">
          {heroItems.map((item, idx) => (
            <div key={item.id} className={cn("absolute inset-0 transition-all duration-700", idx === activeHeroIndex ? "opacity-100 scale-100" : "opacity-0 scale-105")}>
              <Image src={item.image} alt={item.title} fill className="object-cover" priority={idx === 0} />
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {item.type === "movie" ? <Film className="size-3" /> : item.type === "event" ? <Zap className="size-3" /> : <Music className="size-3" />}
                  {item.type === "movie" ? "New Film" : item.type === "event" ? "Live Event" : "Featured"}
                </span>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{item.title}</h2>
                <p className="mt-1 text-sm text-white/80">{item.subtitle}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Button className="glow-primary-sm gap-2 rounded-full"><Play className="size-4" /> {item.type === "movie" ? "Watch" : "Play"}</Button>
                  <Button variant="outline" className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"><Info className="mr-2 size-4" /> Info</Button>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            {heroItems.map((_, idx) => (
              <button key={idx} onClick={() => setActiveHeroIndex(idx)} className={cn("h-1.5 rounded-full transition-all", idx === activeHeroIndex ? "w-8 bg-primary" : "w-1.5 bg-white/40")} />
            ))}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <section className="px-4 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-liquid col-span-full flex flex-col justify-between rounded-2xl p-6 sm:col-span-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3" /> Made for {user?.name?.split(" ")[0] || "You"}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">Your Daily Mix</h3>
              <p className="mt-1 text-sm text-muted-foreground">Burna Boy, Wizkid, Tems, Rema and more</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-3">
                {mockArtists.slice(0, 4).map(a => (
                  <Image key={a.id} src={a.image} alt={a.name} width={40} height={40} className="size-10 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <Button onClick={handlePlayAll} className="ml-auto gap-2 rounded-full"><Play className="size-4" /> Play Mix</Button>
            </div>
          </div>
          <Link href="/rewind" className="glass-card hover-glow flex flex-col rounded-2xl p-5">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="size-6 text-white" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">Your Rewind</h3>
            <p className="mt-1 text-sm text-muted-foreground">See your year in music</p>
          </Link>
        </div>
      </section>

      {/* About Song */}
      {currentTrack && (
        <section className="px-4 lg:px-6">
          <div className="glass-liquid overflow-hidden rounded-2xl">
            <button onClick={() => setShowAboutSong(!showAboutSong)} className="flex w-full items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Image src={currentTrack.cover} alt={currentTrack.title} width={48} height={48} className="size-12 rounded-lg object-cover" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Now Playing</p>
                  <p className="font-medium text-foreground">{currentTrack.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="size-4 text-primary" />
                <span className="hidden sm:inline">About this song</span>
                <ChevronDown className={cn("size-4 transition-transform", showAboutSong && "rotate-180")} />
              </div>
            </button>
            {showAboutSong && (
              <div className="animate-fade-in-up border-t border-white/5 p-4">
                <div className="flex flex-wrap gap-6">
                  <div><p className="text-xs text-muted-foreground">Written by</p><p className="font-medium text-foreground">{currentTrack.artist}</p></div>
                  <div><p className="text-xs text-muted-foreground">Produced by</p><p className="font-medium text-foreground">P2J, Sarz</p></div>
                  <div><p className="text-xs text-muted-foreground">Genre</p><p className="font-medium text-foreground">Afrobeats</p></div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">This track blends traditional Yoruba melodies with modern Afrobeats production.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trending */}
      <section className="space-y-4">
        <SectionHeader title="Trending in Africa" href="/music/charts" subtitle="What the continent is streaming" />
        <div className="px-4 lg:px-6">
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2"><TrendingUp className="size-5 text-primary" /><span className="font-medium">Top 50</span></div>
              <Button onClick={handlePlayAll} size="sm" className="gap-2 rounded-full"><Play className="size-3" /> Play All</Button>
            </div>
            <div className="stagger-children space-y-1">
              {mockTracks.slice(0, 6).map((track, i) => <TrackRow key={track.id} track={track} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Video Feed */}
      <section className="space-y-4">
        <SectionHeader title="Short Clips" href="/shorts" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 lg:px-6">
          {mockCreators.slice(0, 6).map((creator) => (
            <Link key={creator.id} href={`/creators/${creator.id}`} className="group relative aspect-[9/16] w-32 flex-shrink-0 overflow-hidden rounded-2xl sm:w-40">
              <Image src={creator.avatar} alt={creator.name} fill className="object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="truncate text-sm font-medium text-white">{creator.name}</p>
                <p className="text-xs text-white/70">{formatNumber(creator.subscribers)} subscribers</p>
              </div>
              <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                <Eye className="size-3" /> {Math.floor(Math.random() * 500 + 100)}K
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* For You */}
      <section className="space-y-4">
        <SectionHeader title="For You" href="/for-you" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockAlbums.slice(0, 5).map(album => <AlbumCard key={album.id} album={album} />)}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="space-y-4">
        <SectionHeader title="Continue Watching" href="/movies" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockMovies.slice(0, 5).map(movie => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />
              <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl bg-white/10">
                <div className="h-full bg-primary" style={{ width: `${Math.random() * 60 + 20}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Home */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600"><MapPin className="size-5 text-white" /></div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Back Home</h2>
            <p className="text-xs text-muted-foreground">Trending in {user?.connectedCountries?.[0] || "Nigeria"}</p>
          </div>
          <Link href="/diaspora" className="ml-auto rounded-full bg-card px-3 py-1 text-xs font-medium text-primary">Diaspora Hub</Link>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.slice(0, 6).map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* Artists */}
      <section className="space-y-4">
        <SectionHeader title="Artists You Might Like" href="/music" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      </section>

      {/* Playlists */}
      <section className="space-y-4">
        <SectionHeader title="Featured Playlists" href="/music" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockPlaylists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
        </div>
      </section>

      {/* Creators */}
      <section className="space-y-4">
        <SectionHeader title="Creators to Watch" href="/creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>

      {/* Events */}
      <section className="space-y-4">
        <SectionHeader title="Live & Upcoming" href="/live" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockEvents.slice(0, 4).map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`} className="glass-card group w-64 flex-shrink-0 overflow-hidden rounded-2xl sm:w-72">
              <div className="relative h-36">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                {evt.status === "live" && (
                  <div className="badge-live absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" /> LIVE
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-medium text-foreground">{evt.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{evt.date}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{evt.price}</span>
                  <Button size="sm" variant="outline" className="rounded-full text-xs">Tickets</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

// Quick Actions Grid Component
function QuickActionsGrid({ actions, title }: { actions: Array<{ title: string; description: string; icon: React.ElementType; href: string; color: string }>; title: string }) {
  return (
    <section className="px-4 lg:px-6">
      <h2 className="mb-4 font-display text-lg font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map(action => (
          <Link key={action.title} href={action.href} className="glass-card hover-lift group rounded-xl p-4">
            <div className={`mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color}`}>
              <action.icon className="size-5 text-white" />
            </div>
            <h3 className="font-medium text-foreground">{action.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Artist Home
function ArtistHome() {
  const { user } = useUser()
  const actions = [
    { title: "Upload Music", description: "Release new tracks", icon: Upload, href: "/artist", color: "from-primary to-orange-600" },
    { title: "Analytics", description: "View performance", icon: BarChart3, href: "/artist", color: "from-blue-500 to-cyan-500" },
    { title: "Fan Insights", description: "Know your audience", icon: Users, href: "/artist/fans", color: "from-purple-500 to-pink-500" },
    { title: "Royalties", description: "Track earnings", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
  ]
  return (
    <div className="space-y-6 pb-8">
      <div className="px-4 lg:px-6">
        <div className="glass-liquid rounded-2xl p-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"><Mic className="size-3" /> Artist Studio</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">Welcome back, {user?.name?.split(" ")[0] || "Artist"}</h1>
              <p className="mt-1 text-muted-foreground">Your music reached 12.4K new listeners this week</p>
            </div>
            <Link href="/artist"><Button className="mt-4 gap-2 rounded-full sm:mt-0"><BarChart3 className="size-4" /> Open Studio</Button></Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="stat-card"><p className="text-xs text-muted-foreground">Monthly Streams</p><p className="font-mono text-2xl font-bold text-primary">847K</p><p className="mt-1 flex items-center gap-1 text-xs text-green-400"><TrendingUp className="size-3" /> +12.4%</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">This Month</p><p className="font-mono text-2xl font-bold text-green-400">$2,847</p><p className="mt-1 flex items-center gap-1 text-xs text-green-400"><TrendingUp className="size-3" /> +8.2%</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">Followers</p><p className="font-mono text-2xl font-bold text-foreground">24.5K</p><p className="mt-1 flex items-center gap-1 text-xs text-green-400"><TrendingUp className="size-3" /> +342</p></div>
          </div>
        </div>
      </div>
      <QuickActionsGrid actions={actions} title="Quick Actions" />
      <section className="space-y-4">
        <SectionHeader title="Your Top Tracks" href="/artist" />
        <div className="px-4 lg:px-6"><div className="glass-card rounded-2xl p-4"><div className="stagger-children space-y-1">{mockTracks.slice(0, 5).map((track, i) => <TrackRow key={track.id} track={track} index={i} />)}</div></div></div>
      </section>
      <section className="space-y-4">
        <SectionHeader title="What Your Fans Listen To" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">{mockArtists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}</div>
      </section>
    </div>
  )
}

// Creator Home
function CreatorHome() {
  const { user } = useUser()
  const actions = [
    { title: "Upload Video", description: "Post content", icon: Video, href: "/creator", color: "from-primary to-red-500" },
    { title: "Go Live", description: "Start streaming", icon: Zap, href: "/creator", color: "from-purple-500 to-pink-500" },
    { title: "Monetization", description: "Earnings & tips", icon: DollarSign, href: "/creator/monetization", color: "from-green-500 to-emerald-500" },
    { title: "Analytics", description: "Channel stats", icon: BarChart3, href: "/creator", color: "from-blue-500 to-cyan-500" },
  ]
  return (
    <div className="space-y-6 pb-8">
      <div className="px-4 lg:px-6">
        <div className="glass-liquid rounded-2xl p-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"><Video className="size-3" /> Creator Studio</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">Welcome back, {user?.name?.split(" ")[0] || "Creator"}</h1>
              <p className="mt-1 text-muted-foreground">Your content reached 45K views this week</p>
            </div>
            <Link href="/creator"><Button className="mt-4 gap-2 rounded-full sm:mt-0"><Video className="size-4" /> Open Studio</Button></Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="stat-card"><p className="text-xs text-muted-foreground">Total Views</p><p className="font-mono text-2xl font-bold text-primary">1.2M</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">This Month</p><p className="font-mono text-2xl font-bold text-green-400">$1,420</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">Subscribers</p><p className="font-mono text-2xl font-bold text-foreground">89K</p></div>
          </div>
        </div>
      </div>
      <QuickActionsGrid actions={actions} title="Quick Actions" />
      <section className="space-y-4">
        <SectionHeader title="Trending Creators" href="/creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">{mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}</div>
      </section>
    </div>
  )
}

// Filmmaker Home
function FilmmakerHome() {
  const { user } = useUser()
  const actions = [
    { title: "Upload Film", description: "Submit for distribution", icon: Film, href: "/film", color: "from-primary to-pink-500" },
    { title: "Schedule Premiere", description: "Plan release", icon: Calendar, href: "/film/premieres", color: "from-purple-500 to-indigo-500" },
    { title: "Revenue", description: "Rentals & purchases", icon: DollarSign, href: "/royalties", color: "from-green-500 to-emerald-500" },
    { title: "Licensing", description: "Manage rights", icon: BookOpen, href: "/licensing", color: "from-blue-500 to-cyan-500" },
  ]
  return (
    <div className="space-y-6 pb-8">
      <div className="px-4 lg:px-6">
        <div className="glass-liquid rounded-2xl p-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"><Film className="size-3" /> Film Studio</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">Welcome back, {user?.name?.split(" ")[0] || "Director"}</h1>
              <p className="mt-1 text-muted-foreground">Your films have been watched 23K times this month</p>
            </div>
            <Link href="/film"><Button className="mt-4 gap-2 rounded-full sm:mt-0"><Film className="size-4" /> Open Studio</Button></Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="stat-card"><p className="text-xs text-muted-foreground">Total Views</p><p className="font-mono text-2xl font-bold text-primary">156K</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">This Month</p><p className="font-mono text-2xl font-bold text-green-400">$4,820</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">Active Films</p><p className="font-mono text-2xl font-bold text-foreground">8</p></div>
          </div>
        </div>
      </div>
      <QuickActionsGrid actions={actions} title="Quick Actions" />
      <section className="space-y-4">
        <SectionHeader title="Trending African Cinema" href="/movies" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">{mockMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div>
      </section>
    </div>
  )
}

// Cultural Educator Home
function CulturalEducatorHome() {
  const { user } = useUser()
  const actions = [
    { title: "Archive Content", description: "Preserve heritage", icon: BookOpen, href: "/culture-studio/heritage", color: "from-amber-500 to-orange-500" },
    { title: "Language Course", description: "Teach languages", icon: Mic, href: "/culture-studio/heritage", color: "from-green-500 to-emerald-500" },
    { title: "Community", description: "Connect educators", icon: Users, href: "/culture-studio", color: "from-blue-500 to-cyan-500" },
    { title: "Impact", description: "View your reach", icon: BarChart3, href: "/culture-studio", color: "from-purple-500 to-pink-500" },
  ]
  return (
    <div className="space-y-6 pb-8">
      <div className="px-4 lg:px-6">
        <div className="glass-liquid rounded-2xl p-6">
          <div className="flex flex-col justify-between sm:flex-row sm:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"><BookOpen className="size-3" /> Culture Studio</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">Welcome back, {user?.name?.split(" ")[0] || "Educator"}</h1>
              <p className="mt-1 text-muted-foreground">{"You've helped 2.4K learners discover African heritage"}</p>
            </div>
            <Link href="/culture-studio"><Button className="mt-4 gap-2 rounded-full sm:mt-0"><BookOpen className="size-4" /> Open Studio</Button></Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="stat-card"><p className="text-xs text-muted-foreground">Active Learners</p><p className="font-mono text-2xl font-bold text-primary">2.4K</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">Lessons Complete</p><p className="font-mono text-2xl font-bold text-green-400">12.8K</p></div>
            <div className="stat-card"><p className="text-xs text-muted-foreground">Languages</p><p className="font-mono text-2xl font-bold text-foreground">5</p></div>
          </div>
        </div>
      </div>
      <QuickActionsGrid actions={actions} title="Quick Actions" />
      <section className="space-y-4">
        <SectionHeader title="Explore African Culture" href="/culture" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">{mockAlbums.slice(0, 6).map(album => <AlbumCard key={album.id} album={album} />)}</div>
      </section>
    </div>
  )
}

// Main Page
export default function HomePage() {
  const { user, isLoading, activeMode } = useUser()

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="eq-bar" /><div className="eq-bar" /><div className="eq-bar" /><div className="eq-bar" />
        </div>
      </div>
    )
  }

  switch (activeMode) {
    case "artist":
      return <ArtistHome />
    case "creator":
      return <CreatorHome />
    case "filmmaker":
      return <FilmmakerHome />
    case "educator":
      return <CulturalEducatorHome />
    default:
      return <ListenerHome />
  }
}
