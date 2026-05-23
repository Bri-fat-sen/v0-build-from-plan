'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Globe, ChevronRight, Bell, Users } from 'lucide-react'
import { SafeImage as Image } from '@/components/safe-image'
import { cn } from '@/lib/utils'

const nearYouEvents = [
  { id: 'ne1', title: 'Afrobeats Night', venue: 'XOYO London', date: 'Sat, Jun 7', price: '£15', type: 'Party', distance: '2.3 mi' },
  { id: 'ne2', title: 'Nigerian Independence Gala', venue: 'Hilton Park Lane', date: 'Sun, Oct 1', price: '£75', type: 'Gala', distance: '4.1 mi' },
  { id: 'ne3', title: 'Amapiano Brunch', venue: 'Shoreditch Platform', date: 'Sun, Jun 15', price: '£25', type: 'Brunch', distance: '1.8 mi' },
  { id: 'ne4', title: 'African Food Festival', venue: 'Victoria Park', date: 'Sat, Jul 20', price: 'Free', type: 'Festival', distance: '3.2 mi' },
  { id: 'ne5', title: 'Ghanaian Film Premiere', venue: 'BFI Southbank', date: 'Fri, Jun 28', price: '£12', type: 'Screening', distance: '5.5 mi' },
  { id: 'ne6', title: 'Kente Fashion Show', venue: 'The Roundhouse', date: 'Wed, Jul 10', price: '£20', type: 'Fashion', distance: '3.7 mi' },
]

const communityGroups = [
  { id: 'g1', name: 'Nigerians in London', members: 12500, active: true },
  { id: 'g2', name: 'Ghanaian Professionals UK', members: 8200, active: true },
  { id: 'g3', name: 'SA Expats London', members: 5600, active: false },
  { id: 'g4', name: 'East African Network', members: 4100, active: false },
]

export default function DiasporaPage() {
  const [activeTab, setActiveTab] = useState<'near-you' | 'back-home' | 'community'>('near-you')
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  return (
    <main className="pb-12">
      {/* HERO */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/diaspora-hero/1600/900"
            alt="Diaspora"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">London, UK</span>
              </div>
              <h1 className="font-display text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                Your Diaspora
              </h1>
            </div>
            <p className="max-w-lg text-lg text-white/80 leading-relaxed">
              Stay connected to African culture and community wherever you are. Events, people, and content from home.
            </p>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-6 py-3 font-medium transition-all',
                notificationsEnabled
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-white/20 text-white hover:border-white/40'
              )}
            >
              <Bell className={cn('size-5', notificationsEnabled && 'fill-primary')} />
              {notificationsEnabled ? 'Notifications On' : 'Get Notified'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {[
            { id: 'near-you', label: 'Near You', icon: MapPin },
            { id: 'back-home', label: 'Back Home', icon: Globe },
            { id: 'community', label: 'Community', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-white/50 hover:text-white'
              )}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Near You Tab */}
        {activeTab === 'near-you' && (
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-bold text-white">Events Near You</h2>
              <p className="text-white/50">African events, parties, and gatherings in London</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nearYouEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/live/${event.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${event.id}/640/360`}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                      {event.type}
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-white/50">{event.venue}</p>
                    <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" /> {event.distance}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Home Tab */}
        {activeTab === 'back-home' && (
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-bold text-white">What&apos;s Trending in Nigeria</h2>
              <p className="text-white/50">Stay updated with what&apos;s happening at home</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { type: '🎵', title: 'Peace Be Unto You', by: 'Asake', metric: '12.4M streams this week' },
                { type: '🎬', title: 'A Tribe Called Judah', by: 'Dir: Funke Akindele', metric: '8.2M views' },
                { type: '🏆', title: 'AfroNation Lagos 2026', by: 'Festival', metric: 'Happening Soon' },
                { type: '📰', title: 'New Music Regulations', by: 'Pulse Nigeria', metric: 'Top story' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{item.type}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-white/50">{item.by}</p>
                    </div>
                  </div>
                  <p className="text-xs text-primary font-mono">{item.metric}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-3xl font-bold text-white">Community Groups</h2>
              <p className="text-white/50">Connect with people from your home country</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {communityGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{group.name}</h3>
                      {group.active && <span className="size-2 rounded-full bg-green-400" />}
                    </div>
                    <p className="text-xs text-white/50 mt-1">{group.members.toLocaleString()} members</p>
                  </div>
                  <button
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      group.active
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                  >
                    {group.active ? 'Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
