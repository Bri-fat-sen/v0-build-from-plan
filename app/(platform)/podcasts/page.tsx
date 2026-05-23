"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { Play, Clock, Mic, TrendingUp, Globe, ChevronRight, Headphones, Users, Bookmark } from "lucide-react"
import { formatNumber } from "@/lib/mock-data"

const mockPodcasts = [
  { id: "1", title: "The African Narrative", host: "Adaora Obi", cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop", category: "Culture", episodes: 156, subscribers: 245000, description: "Deep conversations about African identity, culture, and the diaspora experience." },
  { id: "2", title: "Afrobeats Weekly", host: "DJ Neptune", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", category: "Music", episodes: 89, subscribers: 180000, description: "Breaking down the latest Afrobeats hits and interviewing the artists making waves." },
  { id: "3", title: "Nollywood Unplugged", host: "Rita Dominic", cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=300&fit=crop", category: "Entertainment", episodes: 72, subscribers: 120000, description: "Behind the scenes of African cinema with the stars and filmmakers." },
  { id: "4", title: "Tech in Africa", host: "Iyinoluwa Aboyeji", cover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop", category: "Technology", episodes: 134, subscribers: 95000, description: "The startup ecosystem, tech innovation, and digital transformation across the continent." },
  { id: "5", title: "Jollof Politics", host: "Reno Omokri", cover: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=300&h=300&fit=crop", category: "Politics", episodes: 201, subscribers: 310000, description: "Making sense of African politics with wit, wisdom, and a dash of controversy." },
  { id: "6", title: "Diaspora Stories", host: "Chimamanda Adichie", cover: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop", category: "Stories", episodes: 48, subscribers: 520000, description: "Personal narratives from Africans around the world." },
]

const mockEpisodes = [
  { id: "e1", podcastId: "1", title: "The Future of African Languages", duration: "1:12:34", date: "2 days ago", plays: 45000, description: "Exploring efforts to preserve and digitize African languages." },
  { id: "e2", podcastId: "2", title: "Burna Boy: The Making of a Legend", duration: "58:21", date: "1 week ago", plays: 89000, description: "An exclusive deep dive into Burna Boy's journey to global stardom." },
  { id: "e3", podcastId: "3", title: "The Golden Age of Nollywood", duration: "1:05:45", date: "3 days ago", plays: 32000, description: "Looking back at the classics that shaped African cinema." },
  { id: "e4", podcastId: "5", title: "Elections & Democracy in 2024", duration: "1:25:00", date: "5 days ago", plays: 78000, description: "Analyzing the state of democracy across the continent." },
  { id: "e5", podcastId: "4", title: "Fintech Revolution: M-Pesa to Flutterwave", duration: "52:18", date: "1 week ago", plays: 28000, description: "How African fintech is changing global finance." },
]

const categories = ["All", "Culture", "Music", "Entertainment", "Technology", "Politics", "Stories", "Comedy", "Business"]

export default function PodcastsPage() {
  const featured = mockPodcasts[5]

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src={featured.cover} alt="" fill className="object-cover opacity-20 blur-2xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>

        <div className="relative px-4 pt-8 pb-12 lg:px-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 border border-primary/20">
              <Mic className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">Podcasts</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
            AFRICAN<br />
            <span className="text-primary">VOICES</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Conversations, stories, and perspectives from across the continent and diaspora.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">500+</p>
              <p className="text-xs text-muted-foreground">Shows</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">10K+</p>
              <p className="text-xs text-muted-foreground">Episodes</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">2M+</p>
              <p className="text-xs text-muted-foreground">Listeners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 lg:px-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "border border-white/10 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Podcast */}
      <section className="mt-10 px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row">
            {/* Podcast Cover */}
            <div className="relative w-full md:w-72 aspect-square shrink-0">
              <Image src={featured.cover} alt={featured.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/90 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
            </div>

            {/* Podcast Info */}
            <div className="relative flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Headphones className="size-4 text-primary" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary">Featured Show</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{featured.title}</h2>
              <p className="text-muted-foreground mt-1">Hosted by {featured.host}</p>
              <p className="text-sm text-muted-foreground mt-3 max-w-md">{featured.description}</p>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <span className="text-muted-foreground"><strong className="text-foreground">{featured.episodes}</strong> episodes</span>
                <span className="text-muted-foreground"><strong className="text-foreground">{formatNumber(featured.subscribers)}</strong> subscribers</span>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                  <Play className="size-4 fill-current" /> Latest Episode
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/5">
                  <Bookmark className="size-4" /> Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Episodes */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Trending Episodes</h2>
          </div>
        </div>
        <div className="space-y-3">
          {mockEpisodes.map((episode) => {
            const podcast = mockPodcasts.find(p => p.id === episode.podcastId)
            return (
              <div
                key={episode.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] hover:border-white/20 cursor-pointer group"
              >
                <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
                  <Image src={podcast?.cover || ""} alt={episode.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="size-6 text-white fill-current" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{episode.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{podcast?.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {episode.duration}</span>
                    <span>{episode.date}</span>
                    <span>{formatNumber(episode.plays)} plays</span>
                  </div>
                </div>
                <Play className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </section>

      {/* Popular Shows */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Popular Shows</h2>
          </div>
          <Link href="/podcasts/browse" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {mockPodcasts.map(podcast => (
            <Link
              key={podcast.id}
              href={`/podcasts/${podcast.id}`}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all hover:bg-white/[0.05] hover:border-white/20"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                <Image src={podcast.cover} alt={podcast.title} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <h3 className="font-medium text-foreground text-sm truncate">{podcast.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{podcast.host}</p>
              <p className="text-xs text-muted-foreground mt-1">{podcast.episodes} episodes</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Browse by Category</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.slice(1).map((cat, i) => (
            <Link
              key={cat}
              href={`/podcasts?category=${cat}`}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/20 group"
            >
              <div
                className="absolute -right-4 -top-4 size-20 rounded-full opacity-15 blur-xl group-hover:opacity-25 transition-opacity"
                style={{ background: `hsl(${i * 45 + 20}, 60%, 50%)` }}
              />
              <p className="relative font-medium text-foreground">{cat}</p>
              <p className="relative text-xs text-muted-foreground mt-1">Explore shows</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
