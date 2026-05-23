"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockEvents } from "@/lib/mock-data"
import { SectionHeader } from "@/components/content-card"
import { Radio, Zap, Calendar, MapPin, Clock, Ticket } from "lucide-react"

export default function LivePage() {
  const liveNow = mockEvents.filter(e => e.status === "live")
  const upcoming = mockEvents.filter(e => e.status === "upcoming")
  const past = mockEvents.filter(e => e.status === "past")

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3 mb-1">
          <Radio className="size-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">AfriStream Live</h1>
            <p className="text-sm text-muted-foreground">Concerts, premieres, festivals, comedy shows, and watch parties</p>
          </div>
        </div>
      </div>

      {/* Live Now */}
      {liveNow.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 px-4 lg:px-6">
            <Zap className="size-5 text-red-500" />
            <h2 className="text-lg font-bold text-foreground">Live Now</h2>
            <div className="size-2 animate-pulse rounded-full bg-red-500" />
          </div>
          <div className="px-4 lg:px-6">
            {liveNow.map(evt => (
              <Link key={evt.id} href={`/live/${evt.id}`}
                className="group relative block overflow-hidden rounded-xl" style={{ height: "280px" }}>
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  <Zap className="size-3" /> LIVE NOW
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{evt.title}</h3>
                  <p className="text-sm text-white/80">{evt.performers.join(", ")}</p>
                  <button className="mt-3 rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white">
                    Watch Live
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="space-y-3">
        <SectionHeader title="Upcoming Events" />
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {upcoming.map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`}
              className="group overflow-hidden rounded-xl bg-card transition-colors hover:bg-secondary">
              <div className="relative aspect-video">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute right-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{evt.type}</div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">{evt.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3" /> {evt.date}
                  <Clock className="size-3" /> {evt.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {evt.location}
                </div>
                <p className="text-xs text-muted-foreground">Performers: {evt.performers.slice(0, 3).join(", ")}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-bold text-primary">{evt.price}</span>
                  <span className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                    <Ticket className="size-3" /> Get Tickets
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Event Types */}
      <section className="space-y-3">
        <SectionHeader title="Browse by Type" />
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
          {["Concerts", "Premieres", "Festivals", "Comedy Shows", "Watch Parties", "Listening Parties", "Gospel Events", "Cultural Events"].map(type => (
            <div key={type} className="flex items-center gap-3 rounded-lg bg-card p-4 cursor-pointer hover:bg-secondary transition-colors">
              <Radio className="size-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Past Events / Replays" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockEvents.slice(0, 4).map(evt => (
            <div key={`past-${evt.id}`} className="w-56 flex-shrink-0 overflow-hidden rounded-xl bg-card cursor-pointer hover:bg-secondary transition-colors">
              <div className="relative aspect-video">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded bg-black/60 px-2 py-1 text-xs text-white">Replay Available</div>
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground">{evt.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
