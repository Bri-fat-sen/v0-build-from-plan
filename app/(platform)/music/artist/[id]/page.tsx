"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockArtists, mockTracks, mockAlbums, formatNumber } from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { cn } from "@/lib/utils"
import { 
  Play, UserPlus, Share2, BadgeCheck, MapPin, Music, Users, 
  ShoppingBag, Calendar, Heart, MoreHorizontal, Clock, Shuffle,
  ExternalLink, Instagram, Twitter, Globe, Verified, Pause
} from "lucide-react"

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const artist = mockArtists.find(a => a.id === id) || mockArtists[0]
  const artistTracks = mockTracks.filter(t => t.artistId === artist.id)
  const artistAlbums = mockAlbums.filter(a => a.artistId === artist.id)
  const { playTrack, setQueue, currentTrack, isPlaying } = usePlayer()
  const [isFollowing, setIsFollowing] = useState(false)

  const handlePlay = () => {
    const tracks = artistTracks.length > 0 ? artistTracks : mockTracks.slice(0, 10)
    setQueue(tracks)
    playTrack(tracks[0])
  }

  const displayTracks = artistTracks.length > 0 ? artistTracks : mockTracks.slice(0, 6)
  const displayAlbums = artistAlbums.length > 0 ? artistAlbums : mockAlbums.slice(0, 5)

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] max-h-[500px]">
        <Image 
          src={artist.banner || artist.avatar} 
          alt={artist.name} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        
        {/* Artist Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative size-32 shrink-0 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:size-40 lg:size-48">
              <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
              {artist.verified && (
                <div className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-primary text-black">
                  <Verified className="size-5" />
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                {artist.verified && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Verified Artist
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {artist.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {artist.country}
                </span>
                <span className="hidden size-1 rounded-full bg-white/40 sm:block" />
                <span>{artist.genre}</span>
                <span className="hidden size-1 rounded-full bg-white/40 sm:block" />
                <span className="font-medium text-white">
                  {formatNumber(artist.monthlyListeners)} monthly listeners
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/95 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-black hover:bg-primary/90 transition-colors"
          >
            <Play className="size-5 fill-current" />
            Play
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-colors",
              isFollowing
                ? "border border-primary text-primary hover:bg-primary/10"
                : "border border-white/20 text-white hover:bg-white/5"
            )}
          >
            <UserPlus className="size-4" />
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
            <Share2 className="size-5" />
          </button>
          <button className="flex size-12 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
            <MoreHorizontal className="size-5" />
          </button>

          {/* Stats */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            <div className="text-center">
              <p className="font-mono text-xl font-bold text-white">{formatNumber(artist.followers)}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-xl font-bold text-white">{formatNumber(artist.monthlyListeners)}</p>
              <p className="text-xs text-muted-foreground">Monthly Listeners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-8 lg:px-8 space-y-10">
        {/* Bio */}
        {artist.bio && (
          <section>
            <p className="max-w-3xl text-base leading-relaxed text-white/70">
              {artist.bio}
            </p>
          </section>
        )}

        {/* Popular Tracks */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">Popular</h2>
            <Link href="#" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <div className="space-y-1">
            {displayTracks.map((track, i) => {
              const isCurrentTrack = currentTrack?.id === track.id
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                    "hover:bg-white/[0.04]",
                    isCurrentTrack && "bg-white/[0.06]"
                  )}
                >
                  <div className="w-6 text-center">
                    {isCurrentTrack && isPlaying ? (
                      <Music className="size-4 text-primary animate-pulse mx-auto" />
                    ) : (
                      <>
                        <span className="text-sm text-muted-foreground group-hover:hidden">{i + 1}</span>
                        <Play className="size-4 text-white hidden group-hover:block mx-auto" />
                      </>
                    )}
                  </div>
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                    <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("truncate font-medium", isCurrentTrack ? "text-primary" : "text-white")}>
                      {track.title}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">{track.album || "Single"}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden text-sm text-muted-foreground sm:block">{formatNumber(track.plays)}</span>
                    <Heart className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm text-muted-foreground tabular-nums w-12 text-right">{track.duration}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Discography */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">Discography</h2>
            <Link href="#" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {displayAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/music/album/${album.id}`}
                className="group min-w-[180px] flex-shrink-0"
              >
                <div className="flex flex-col gap-3 rounded-xl bg-white/[0.02] p-3 hover:bg-white/[0.06] transition-all">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.06]">
                    <Image src={album.coverArt} alt={album.title} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                        <Play className="size-5 fill-current text-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="truncate text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{album.year} - {album.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">More from {artist.name}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Music, label: "Music Videos", count: "12 videos", href: "#" },
              { icon: Users, label: "Fan Club", count: "Exclusive content", href: "#" },
              { icon: ShoppingBag, label: "Merch Store", count: "8 items", href: "/merch" },
              { icon: Calendar, label: "Events", count: "3 upcoming", href: "/live" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20">
                  <item.icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-white group-hover:text-primary transition-colors">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Artists */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">Related Artists</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mockArtists.filter(a => a.id !== artist.id).slice(0, 8).map((relatedArtist) => (
              <Link
                key={relatedArtist.id}
                href={`/music/artist/${relatedArtist.id}`}
                className="group flex min-w-[140px] flex-col items-center gap-3 rounded-xl bg-white/[0.02] p-4 text-center hover:bg-white/[0.06] transition-all"
              >
                <div className="relative size-24 overflow-hidden rounded-full bg-white/[0.06] ring-2 ring-transparent group-hover:ring-primary/50 transition-all">
                  <Image src={relatedArtist.avatar} alt={relatedArtist.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                    {relatedArtist.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{relatedArtist.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
