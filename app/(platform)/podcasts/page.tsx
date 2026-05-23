"use client"
import Image from "next/image"
import Link from "next/link"
import { Play, Clock, Plus, Share2, Download, Mic, TrendingUp, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  return (
    <div className="space-y-8 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 lg:mx-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-background to-background" />
        <div className="relative px-6 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Mic className="size-5 text-violet-400" />
            <span className="text-sm font-medium text-violet-400">Podcasts</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">African Voices</h1>
          <p className="text-muted-foreground max-w-xl">Conversations, stories, and perspectives from across the continent and diaspora.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 lg:px-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Podcast */}
      <section className="px-4 lg:px-6">
        <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-48 aspect-square rounded-xl overflow-hidden shrink-0">
            <Image src={mockPodcasts[5].cover} alt={mockPodcasts[5].title} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400">Featured</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">{mockPodcasts[5].title}</h2>
            <p className="text-muted-foreground mt-1">Hosted by {mockPodcasts[5].host}</p>
            <p className="text-sm text-muted-foreground mt-3">{mockPodcasts[5].description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>{mockPodcasts[5].episodes} episodes</span>
              <span>{formatNumber(mockPodcasts[5].subscribers)} subscribers</span>
            </div>
            <div className="flex gap-3 mt-4">
              <Button className="bg-primary text-primary-foreground glow-primary">
                <Play className="size-4 mr-2 fill-current" /> Latest Episode
              </Button>
              <Button variant="outline">
                <Plus className="size-4 mr-2" /> Follow
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Episodes */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-5 text-primary" />
          <h2 className="font-display text-xl font-semibold text-foreground">Trending Episodes</h2>
        </div>
        <div className="space-y-3">
          {mockEpisodes.map((episode, i) => {
            const podcast = mockPodcasts.find(p => p.id === episode.podcastId)
            return (
              <div key={episode.id} className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift cursor-pointer group">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
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
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="size-8">
                    <Download className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-8">
                    <Share2 className="size-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* All Podcasts */}
      <section className="px-4 lg:px-6 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-primary" />
          <h2 className="font-display text-xl font-semibold text-foreground">Popular Shows</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockPodcasts.map(podcast => (
            <Link key={podcast.id} href={`/podcasts/${podcast.id}`} className="group">
              <div className="glass-card rounded-xl p-3 hover-lift">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                  <Image src={podcast.cover} alt={podcast.title} fill className="object-cover" />
                </div>
                <h3 className="font-medium text-foreground text-sm truncate">{podcast.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{podcast.host}</p>
                <p className="text-xs text-muted-foreground mt-1">{podcast.episodes} episodes</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
