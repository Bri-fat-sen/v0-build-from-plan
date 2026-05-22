"use client"
import Link from "next/link"
import { mockCountryHubs, mockDiasporaHubs } from "@/lib/mock-data"
import { SectionHeader } from "@/components/content-card"
import { Globe, MapPin, Users } from "lucide-react"

export default function HubsPage() {
  const regions = [...new Set(mockCountryHubs.map(h => h.region))]

  return (
    <div className="space-y-8 py-4">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Globe className="size-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Country & Diaspora Hubs</h1>
            <p className="text-sm text-muted-foreground">Explore music, movies, creators, and culture by country</p>
          </div>
        </div>
      </div>

      {/* Country Hubs by Region */}
      {regions.map(region => (
        <section key={region} className="space-y-3">
          <SectionHeader title={region} />
          <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
            {mockCountryHubs.filter(h => h.region === region).map(hub => (
              <Link key={hub.id} href={`/hubs/country/${hub.id}`}
                className="flex items-center gap-3 rounded-xl bg-card p-4 transition-colors hover:bg-secondary">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-lg font-bold text-primary">
                  {hub.code.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{hub.name}</p>
                  <p className="text-xs text-muted-foreground">{hub.artists} artists &middot; {hub.movies} movies</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Diaspora Hubs */}
      <section className="space-y-3 pb-8">
        <div className="flex items-center gap-2 px-4 lg:px-6">
          <Users className="size-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Diaspora Hubs</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {mockDiasporaHubs.map(hub => (
            <Link key={hub.id} href={`/hubs/diaspora/${hub.id}`}
              className="flex items-center gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-secondary">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20 text-lg font-bold text-primary">
                {hub.flag}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{hub.name}</p>
                <p className="text-xs text-muted-foreground">African diaspora: {hub.population}</p>
                <p className="text-xs text-muted-foreground">{hub.artists} artists &middot; {hub.events} events &middot; {hub.creators} creators</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
