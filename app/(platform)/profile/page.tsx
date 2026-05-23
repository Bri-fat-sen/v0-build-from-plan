"use client"

import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { useUser } from "@/lib/user-context"
import { mockTracks, mockArtists, formatNumber } from "@/lib/mock-data"
import {
  Play,
  Settings,
  Music,
  Film,
  Clock,
  Award,
  Heart,
  Headphones,
  TrendingUp,
  Share2,
  Crown,
  Globe,
  MapPin,
  ChevronRight,
  Flame,
  Sparkles,
  Zap,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock listening stats
const listeningStats = {
  totalMinutes: 24680,
  totalTracks: 1847,
  topGenre: "Afrobeats",
  topArtist: "Burna Boy",
  streak: 47,
  percentile: 2,
}

// Mock recently played
const recentlyPlayed = mockTracks.slice(0, 8)

// Mock top artists (user's most listened)
const topArtists = mockArtists.slice(0, 5)

// Mock badges
const badges = [
  { id: "early", name: "Early Adopter", icon: Sparkles, color: "text-yellow-400", earned: true },
  { id: "streamer", name: "Power Streamer", icon: Zap, color: "text-primary", earned: true },
  { id: "explorer", name: "Culture Explorer", icon: Globe, color: "text-emerald-400", earned: true },
  { id: "social", name: "Community Builder", icon: Users, color: "text-blue-400", earned: true },
  { id: "binge", name: "Binge Watcher", icon: Film, color: "text-purple-400", earned: true },
  { id: "curator", name: "Playlist Curator", icon: Music, color: "text-pink-400", earned: false },
]

export default function ProfilePage() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient/pattern */}
        <div className="absolute inset-0 h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative px-6 pt-12 pb-8 lg:px-16 lg:pt-20">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-1.5">
              <Crown className="size-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Premium Member</span>
            </div>
            <span className="text-sm text-white/60">Since Jan 2024</span>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="relative size-40 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-4 ring-primary/20 lg:size-52">
                <Image
                  src={user?.avatar || "https://picsum.photos/seed/user1/400/400"}
                  alt={user?.name || "User"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Verified badge */}
              <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-primary shadow-lg">
                <Sparkles className="size-5" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-4xl font-black tracking-tight text-white lg:text-6xl">
                {user?.name || "Demo User"}
              </h1>
              <p className="mt-2 text-lg text-white/50">@{user?.email?.split("@")[0] || "demo"}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  London, UK
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="size-4" />
                  {user?.connectedCountries?.join(", ") || "Nigeria, Ghana"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Jan 2024"}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105"
                >
                  <Settings className="size-4" />
                  Edit Profile
                </Link>
                <button className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  <Share2 className="size-4" />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative z-10 -mt-4 px-6 lg:px-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {[
            { label: "Minutes Streamed", value: formatNumber(listeningStats.totalMinutes), icon: Clock, color: "text-primary" },
            { label: "Tracks Played", value: formatNumber(listeningStats.totalTracks), icon: Music, color: "text-emerald-400" },
            { label: "Day Streak", value: listeningStats.streak, icon: Flame, color: "text-orange-400" },
            { label: "Top Genre", value: listeningStats.topGenre, icon: Headphones, color: "text-purple-400" },
            { label: "Top Listener", value: `Top ${listeningStats.percentile}%`, icon: TrendingUp, color: "text-yellow-400" },
            { label: "Badges Earned", value: badges.filter(b => b.earned).length, icon: Award, color: "text-pink-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/[0.05]"
            >
              <stat.icon className={cn("mb-2 size-5", stat.color)} />
              <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages & Interests Tags */}
      <section className="mt-10 px-6 lg:px-16">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Languages:</span>
            {(user?.languages || ["English", "Yoruba", "Pidgin"]).map((lang) => (
              <span key={lang} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                {lang}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Interests:</span>
            {(user?.interests || ["Afrobeats", "Amapiano", "Nollywood"]).map((interest) => (
              <span key={interest} className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Your Top Artist */}
      <section className="mt-12 border-t border-white/5 pt-12">
        <div className="px-6 lg:px-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Your #1 Artist</p>
              <h2 className="font-display text-2xl font-bold text-white">All Time Favorite</h2>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 lg:flex-row lg:items-center lg:p-8">
            <div className="relative size-32 shrink-0 overflow-hidden rounded-xl lg:size-40">
              <Image
                src={topArtists[0]?.avatar}
                alt={topArtists[0]?.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="flex items-center gap-2 text-sm text-primary">
                <Crown className="size-4" />
                {formatNumber(8420)} minutes listened
              </p>
              <h3 className="mt-1 font-display text-3xl font-black text-white lg:text-4xl">
                {topArtists[0]?.name}
              </h3>
              <p className="mt-1 text-white/60">{topArtists[0]?.genre}</p>
              <div className="mt-4 flex gap-3">
                <Link
                  href={`/music/artist/${topArtists[0]?.id}`}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-background"
                >
                  <Play className="size-4 fill-current" />
                  Play Top Songs
                </Link>
                <button className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white">
                  View Artist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Artists List */}
      <section className="mt-12 px-6 lg:px-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Your Top Artists</h2>
          <Link href="/library?tab=artists" className="text-sm font-medium text-primary hover:underline">
            See All
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {topArtists.map((artist, index) => (
            <Link
              key={artist.id}
              href={`/music/artist/${artist.id}`}
              className="group flex items-center gap-4 rounded-xl bg-white/[0.03] p-3 transition-all hover:bg-white/[0.06] lg:flex-col lg:items-center lg:p-4 lg:text-center"
            >
              <div className="relative">
                <div className="relative size-14 overflow-hidden rounded-full lg:size-24">
                  <Image src={artist.avatar} alt={artist.name} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold lg:-bottom-2 lg:-right-2 lg:size-8">
                  {index + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1 lg:mt-3 lg:flex-none">
                <p className="truncate font-semibold text-white">{artist.name}</p>
                <p className="truncate text-xs text-muted-foreground">{formatNumber(artist.monthlyListeners)} plays</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="mt-12 border-t border-white/5 pt-12 px-6 lg:px-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recently Played</h2>
          <Link href="/library" className="text-sm font-medium text-primary hover:underline">
            View History
          </Link>
        </div>

        <div className="grid gap-1">
          {recentlyPlayed.map((track, index) => (
            <div
              key={track.id}
              className="group grid grid-cols-[2rem_3rem_1fr_auto] items-center gap-4 rounded-xl px-3 py-2.5 transition-all hover:bg-white/[0.04] lg:grid-cols-[2rem_3.5rem_1fr_8rem_auto]"
            >
              <span className="text-center font-mono text-sm text-muted-foreground">
                {index + 1}
              </span>
              <div className="relative size-12 overflow-hidden rounded">
                <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <Play className="size-4 fill-white text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{track.title}</p>
                <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
              </div>
              <span className="hidden font-mono text-sm text-muted-foreground lg:block">
                {track.duration}
              </span>
              <button className="rounded-full p-2 text-muted-foreground opacity-0 transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100">
                <Heart className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="mt-12 border-t border-white/5 bg-white/[0.02] py-12">
        <div className="px-6 lg:px-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Achievements</p>
              <h2 className="font-display text-2xl font-bold text-white">Your Badges</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {badges.filter(b => b.earned).length} / {badges.length} earned
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                  "flex items-center gap-4 rounded-xl border p-4 transition-all",
                  badge.earned
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-dashed border-white/5 bg-transparent opacity-40"
                )}
              >
                <div className={cn(
                  "flex size-12 items-center justify-center rounded-xl",
                  badge.earned ? "bg-white/10" : "bg-white/5"
                )}>
                  <badge.icon className={cn("size-6", badge.earned ? badge.color : "text-muted-foreground")} />
                </div>
                <div className="flex-1">
                  <p className={cn("font-semibold", badge.earned ? "text-white" : "text-muted-foreground")}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {badge.earned ? "Earned" : "Locked"}
                  </p>
                </div>
                {badge.earned && (
                  <Sparkles className="size-4 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-6 py-12 lg:px-16">
        <h2 className="mb-6 font-display text-xl font-bold">Quick Links</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Liked Songs", href: "/library", icon: Heart, count: "847" },
            { label: "My Playlists", href: "/library?tab=playlists", icon: Music, count: "12" },
            { label: "Watchlist", href: "/library?tab=movies", icon: Film, count: "34" },
            { label: "Listening Stats", href: "/rewind", icon: BarChart3, count: null },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <link.icon className="size-5 text-primary" />
                <span className="font-medium text-white">{link.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {link.count && (
                  <span className="text-sm text-muted-foreground">{link.count}</span>
                )}
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
