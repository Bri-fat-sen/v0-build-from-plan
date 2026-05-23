"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockEvents } from "@/lib/mock-data"
import { Radio, Zap, Calendar, MapPin, Clock, Ticket, ChevronRight, Play, Users, Tv } from "lucide-react"

export default function LivePage() {
  const liveNow = mockEvents.filter(e => e.status === "live")
  const upcoming = mockEvents.filter(e => e.status === "upcoming")
  const featured = liveNow[0] || upcoming[0]

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {featured && (
            <Image src={featured.banner} alt="" fill className="object-cover opacity-40" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="relative px-4 pt-8 pb-16 lg:px-6 min-h-[500px] flex flex-col justify-end">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1.5 border border-red-500/30">
              <Radio className="size-4 text-red-500" />
              <span className="text-xs font-medium text-red-400">Live Events</span>
            </div>
            {liveNow.length > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600 animate-pulse">
                <span className="size-1.5 rounded-full bg-white" />
                <span className="text-xs font-bold text-white">{liveNow.length} LIVE NOW</span>
              </div>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
            AFRISTREAM<br />
            <span className="text-primary">LIVE</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Concerts, premieres, festivals, comedy shows, and watch parties. Experience Africa live.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">{upcoming.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">{liveNow.length}</p>
              <p className="text-xs text-muted-foreground">Live Now</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Event Types</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Now */}
      {liveNow.length > 0 && (
        <section className="px-4 lg:px-6 -mt-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="size-5 text-red-500" />
            <h2 className="font-display text-xl font-bold text-foreground">Happening Now</h2>
            <div className="size-2 animate-pulse rounded-full bg-red-500" />
          </div>
          <div className="space-y-4">
            {liveNow.map(evt => (
              <Link
                key={evt.id}
                href={`/live/${evt.id}`}
                className="group relative block overflow-hidden rounded-2xl border border-red-500/30"
              >
                <div className="relative aspect-[21/9] min-h-[280px]">
                  <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5">
                    <Zap className="size-3.5" />
                    <span className="text-xs font-bold text-white">LIVE NOW</span>
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5">
                    <Users className="size-3.5 text-white" />
                    <span className="text-xs font-medium text-white">12.5K watching</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold text-white">{evt.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{evt.performers.join(", ")}</p>
                    <button className="mt-4 flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">
                      <Play className="size-4 fill-current" /> Watch Live
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Event Types */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Tv className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Browse by Type</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {["Concerts", "Premieres", "Festivals", "Comedy Shows", "Watch Parties", "Listening Parties", "Gospel Events", "Cultural Events"].map((type, i) => (
            <Link
              key={type}
              href={`/live?type=${type}`}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/20 group"
            >
              <div
                className="absolute -right-4 -top-4 size-16 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"
                style={{ background: `hsl(${i * 45}, 70%, 50%)` }}
              />
              <p className="relative font-medium text-foreground">{type}</p>
              <p className="relative text-xs text-muted-foreground mt-1">Browse events</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Calendar className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Upcoming Events</h2>
          </div>
          <Link href="/live/upcoming" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See All <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map(evt => (
            <Link
              key={evt.id}
              href={`/live/${evt.id}`}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
            >
              <div className="relative aspect-video">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  {evt.type}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white truncate">{evt.title}</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" /> {evt.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {evt.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {evt.location}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  Featuring: {evt.performers.slice(0, 3).join(", ")}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-lg font-bold text-primary">{evt.price}</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary">
                    <Ticket className="size-3.5" /> Get Tickets
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Past Events / Replays */}
      <section className="mt-12 px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Play className="size-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Replays Available</h2>
          </div>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {mockEvents.slice(0, 6).map(evt => (
            <Link
              key={`replay-${evt.id}`}
              href={`/live/${evt.id}/replay`}
              className="group w-64 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all hover:border-white/20"
            >
              <div className="relative aspect-video">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center size-12 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-primary transition-colors">
                    <Play className="size-5 text-white fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  Replay
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground">{evt.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
