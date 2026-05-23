"use client"
import { use } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockEvents } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Ticket, Share2, ArrowLeft, Users, Zap } from "lucide-react"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const event = mockEvents.find(e => e.id === id) || mockEvents[0]

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative aspect-video max-h-80 w-full">
        <Image src={event.banner} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        {event.status === "live" && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm font-bold text-white">
            <Zap className="size-4" /> LIVE NOW
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-6">
          <span className="mb-2 inline-block rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">{event.type}</span>
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <Link href="/live" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Live
        </Link>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3 lg:px-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-card p-3">
              <Calendar className="mb-1 size-4 text-primary" />
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm font-medium text-foreground">{event.date}</p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <Clock className="mb-1 size-4 text-primary" />
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-medium text-foreground">{event.time}</p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <MapPin className="mb-1 size-4 text-primary" />
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-medium text-foreground">{event.location}</p>
            </div>
            <div className="rounded-lg bg-card p-3">
              <Users className="mb-1 size-4 text-primary" />
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="text-sm font-medium text-foreground">{Math.floor(Math.random() * 50000 + 5000).toLocaleString()}</p>
            </div>
          </div>

          {/* Performers */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Performers</h2>
            <div className="flex flex-wrap gap-2">
              {event.performers.map(p => (
                <div key={p} className="flex items-center gap-2 rounded-full bg-card px-4 py-2">
                  <div className="size-6 rounded-full bg-primary/20" />
                  <span className="text-sm font-medium text-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">About This Event</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Join us for {event.title}, an incredible {event.type.toLowerCase()} featuring some of Africa&apos;s biggest stars.
              This is a can&apos;t-miss event that brings together the best of African entertainment. Whether you&apos;re
              watching live or from home, get ready for an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Ticket Sidebar */}
        <div>
          <div className="sticky top-20 rounded-xl bg-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Get Tickets</h3>
            {[
              { tier: "General Admission", price: event.price, desc: "Standard entry" },
              { tier: "VIP", price: "$" + (parseInt(event.price.replace(/\D/g, "") || "50") * 2), desc: "Premium seating, meet & greet" },
              { tier: "Platinum", price: "$" + (parseInt(event.price.replace(/\D/g, "") || "50") * 4), desc: "All-access, backstage" },
            ].map(ticket => (
              <div key={ticket.tier} className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer hover:border-primary transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{ticket.tier}</p>
                  <p className="text-xs text-muted-foreground">{ticket.desc}</p>
                </div>
                <span className="text-sm font-bold text-primary">{ticket.price}</span>
              </div>
            ))}
            <button className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground glow-orange-sm">
              <Ticket className="mr-2 inline size-4" /> Buy Tickets
            </button>
            <button className="w-full rounded-full border border-border py-3 text-sm font-medium text-foreground hover:bg-secondary">
              <Share2 className="mr-2 inline size-4" /> Share Event
            </button>
          </div>
        </div>
      </div>

      {/* Related Events */}
      <section className="space-y-3 pb-8 px-4 lg:px-6">
        <h2 className="text-lg font-bold text-foreground">Related Events</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockEvents.filter(e => e.id !== event.id).slice(0, 3).map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`}
              className="group overflow-hidden rounded-xl bg-card hover:bg-secondary transition-colors">
              <div className="relative aspect-video">
                <Image src={evt.banner} alt={evt.title} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">{evt.title}</p>
                <p className="text-xs text-muted-foreground">{evt.date} &middot; {evt.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
