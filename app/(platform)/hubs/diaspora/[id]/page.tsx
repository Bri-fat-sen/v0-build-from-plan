"use client"
import { use } from "react"
import Link from "next/link"
import { mockDiasporaHubs, mockArtists, mockEvents, mockCreators } from "@/lib/mock-data"
import { ArtistCard, CreatorCard, SectionHeader } from "@/components/content-card"
import { ArrowLeft, Users, Calendar, MapPin, Music } from "lucide-react"
import Image from "next/image"

export default function DiasporaHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const hub = mockDiasporaHubs.find(h => h.id === id) || mockDiasporaHubs[0]

  return (
    <div className="space-y-8 py-4">
      <div className="px-4 lg:px-6">
        <Link href="/hubs" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Hubs
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-xl bg-primary/20 text-2xl font-bold text-primary">
            {hub.flag}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{hub.name} Diaspora</h1>
            <p className="text-sm text-muted-foreground">African community: {hub.population}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Music className="size-3" /> {hub.artists} artists</span>
              <span className="flex items-center gap-1"><Calendar className="size-3" /> {hub.events} events</span>
              <span className="flex items-center gap-1"><Users className="size-3" /> {hub.creators} creators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Local Events */}
      <section className="space-y-3">
        <SectionHeader title="Events Near You" />
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6">
          {mockEvents.slice(0, 4).map(evt => (
            <Link key={evt.id} href={`/live/${evt.id}`} className="group overflow-hidden rounded-xl bg-card hover:bg-secondary transition-colors">
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

      {/* Artists in Diaspora */}
      <section className="space-y-3">
        <SectionHeader title={`Artists in ${hub.name}`} />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.slice(0, 6).map(a => <ArtistCard key={a.id} artist={a} />)}
        </div>
      </section>

      {/* Creators */}
      <section className="space-y-3">
        <SectionHeader title="Creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.slice(0, 4).map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>

      {/* Back Home Recommendations */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Back Home Recommendations" subtitle="Stay connected to your roots" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockArtists.slice(3, 8).map(a => <ArtistCard key={a.id} artist={a} />)}
        </div>
      </section>
    </div>
  )
}
