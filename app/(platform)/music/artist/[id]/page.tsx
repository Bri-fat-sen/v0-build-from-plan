"use client"
import { use } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import { mockArtists, mockTracks, mockAlbums, formatNumber } from "@/lib/mock-data"
import { TrackRow, AlbumCard, ArtistCard } from "@/components/content-card"
import { usePlayer } from "@/lib/player-context"
import { Play, UserPlus, Share2, BadgeCheck, MapPin, Music, Users, ShoppingBag, Calendar } from "lucide-react"

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const artist = mockArtists.find(a => a.id === id) || mockArtists[0]
  const artistTracks = mockTracks.filter(t => t.artistId === artist.id)
  const artistAlbums = mockAlbums.filter(a => a.artistId === artist.id)
  const { playTrack, setQueue } = usePlayer()

  const handlePlay = () => {
    if (artistTracks.length > 0) {
      setQueue(artistTracks)
      playTrack(artistTracks[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative h-48 sm:h-64 lg:h-80">
        <Image src={artist.banner} alt={artist.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="relative size-20 overflow-hidden rounded-full border-2 border-primary sm:size-24">
              <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{artist.name}</h1>
                {artist.verified && <BadgeCheck className="size-5 text-primary" />}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-3" /> {artist.country}</span>
                <span>{artist.genre}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{formatNumber(artist.monthlyListeners)} monthly listeners &middot; {formatNumber(artist.followers)} followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-4 lg:px-6">
        <button onClick={handlePlay} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground glow-orange-sm">
          <Play className="size-4" /> Play
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <UserPlus className="size-4" /> Follow
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <Share2 className="size-4" />
        </button>
      </div>

      {/* Bio */}
      <div className="px-4 lg:px-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
      </div>

      {/* Popular Tracks */}
      <section className="space-y-3">
        <h2 className="px-4 text-lg font-bold text-foreground lg:px-6">Popular</h2>
        <div className="px-4 lg:px-6">
          <div className="rounded-xl bg-card p-3">
            {(artistTracks.length > 0 ? artistTracks : mockTracks.slice(0, 5)).map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Discography */}
      <section className="space-y-3">
        <h2 className="px-4 text-lg font-bold text-foreground lg:px-6">Discography</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {(artistAlbums.length > 0 ? artistAlbums : mockAlbums.slice(0, 4)).map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 lg:px-6">
        {[
          { icon: Music, label: "Music Videos", count: "12" },
          { icon: Users, label: "Fan Club", count: "Join" },
          { icon: ShoppingBag, label: "Merch", count: "8 items" },
          { icon: Calendar, label: "Events", count: "3 upcoming" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 rounded-lg bg-card p-3 cursor-pointer hover:bg-secondary transition-colors">
            <item.icon className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Related Artists */}
      <section className="space-y-3 pb-8">
        <h2 className="px-4 text-lg font-bold text-foreground lg:px-6">Related Artists</h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.filter(a => a.id !== artist.id).slice(0, 6).map(a => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      </section>
    </div>
  )
}
