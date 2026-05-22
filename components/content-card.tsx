"use client"
import Image from "next/image"
import Link from "next/link"
import { Play, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePlayer } from "@/lib/player-context"
import type { Track, Album, Artist, Movie, Creator } from "@/lib/mock-data"
import { formatNumber } from "@/lib/mock-data"

export function TrackRow({ track, index }: { track: Track; index?: number }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer()
  const isCurrent = currentTrack?.id === track.id

  return (
    <button onClick={() => playTrack(track)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary",
        isCurrent && "bg-secondary"
      )}>
      {index !== undefined && <span className={cn("w-5 text-sm", isCurrent ? "text-primary font-bold" : "text-muted-foreground")}>{index + 1}</span>}
      <div className="relative size-10 flex-shrink-0 overflow-hidden rounded">
        <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
        {isCurrent && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex items-end gap-0.5 h-4">
              {[1,2,3].map(i => <div key={i} className="eq-bar w-0.5 rounded-full bg-primary" />)}
            </div>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", isCurrent ? "text-primary" : "text-foreground")}>{track.title}</p>
        <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
      </div>
      <span className="hidden text-xs text-muted-foreground sm:block">{formatNumber(track.plays)}</span>
      <Heart className="size-4 flex-shrink-0 text-muted-foreground hover:text-primary" />
      <span className="text-xs text-muted-foreground">{track.duration}</span>
    </button>
  )
}

export function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/music/album/${album.id}`} className="group w-40 flex-shrink-0 sm:w-44">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image src={album.coverArt} alt={album.title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex w-full items-center justify-between p-3">
            <Play className="size-8 rounded-full bg-primary p-1.5 text-primary-foreground" />
          </div>
        </div>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">{album.title}</p>
      <p className="truncate text-xs text-muted-foreground">{album.artist} &middot; {album.year}</p>
    </Link>
  )
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/music/artist/${artist.id}`} className="group flex w-32 flex-shrink-0 flex-col items-center sm:w-36">
      <div className="relative size-28 overflow-hidden rounded-full sm:size-32">
        <Image src={artist.avatar} alt={artist.name} fill className="object-cover transition-transform group-hover:scale-105" />
      </div>
      <p className="mt-2 text-center text-sm font-medium text-foreground">{artist.name}</p>
      <p className="text-center text-xs text-muted-foreground">{artist.genre}</p>
    </Link>
  )
}

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group w-32 flex-shrink-0 sm:w-36">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <Image src={movie.poster} alt={movie.title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="p-2">
            <Play className="size-8 rounded-full bg-primary p-1.5 text-primary-foreground" />
          </div>
        </div>
        <div className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-foreground">{movie.rating}</div>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">{movie.title}</p>
      <p className="truncate text-xs text-muted-foreground">{movie.year} &middot; {movie.genre}</p>
    </Link>
  )
}

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creators/${creator.id}`} className="group flex w-36 flex-shrink-0 flex-col items-center sm:w-40">
      <div className="relative size-28 overflow-hidden rounded-full sm:size-32">
        <Image src={creator.avatar} alt={creator.name} fill className="object-cover transition-transform group-hover:scale-105" />
      </div>
      <p className="mt-2 text-center text-sm font-medium text-foreground">{creator.name}</p>
      <p className="text-center text-xs text-muted-foreground">{creator.category}</p>
      <p className="text-center text-xs text-primary">{formatNumber(creator.subscribers)} subscribers</p>
    </Link>
  )
}

export function PlaylistCard({ playlist }: { playlist: { id: string; title: string; cover: string; curator: string; tracks: number } }) {
  return (
    <Link href={`/music/playlist/${playlist.id}`} className="group w-40 flex-shrink-0 sm:w-44">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image src={playlist.cover} alt={playlist.title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="p-3"><Play className="size-8 rounded-full bg-primary p-1.5 text-primary-foreground" /></div>
        </div>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-foreground">{playlist.title}</p>
      <p className="truncate text-xs text-muted-foreground">{playlist.curator} &middot; {playlist.tracks} tracks</p>
    </Link>
  )
}

export function SectionHeader({ title, href, subtitle }: { title: string; href?: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between px-4 lg:px-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {href && <Link href={href} className="text-sm font-medium text-primary hover:underline">See all</Link>}
    </div>
  )
}
