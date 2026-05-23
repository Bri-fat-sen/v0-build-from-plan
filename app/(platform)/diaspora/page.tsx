"use client"
import { useState } from "react"
import { mockDiasporaHubs, mockEvents, mockArtists, mockCreators } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { MapPin, Calendar, Users, Music, Video, Globe, ChevronRight, Star, Heart, Bell, Search, Filter, ArrowRight } from "lucide-react"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"

// Near you events (local diaspora events)
const nearYouEvents = [
  { id: "ne1", title: "Afrobeats Night", venue: "XOYO London", date: "Sat, Jun 7", time: "22:00", price: "£15", type: "Party", distance: "2.3 mi", image: "https://picsum.photos/seed/afronight/600/400" },
  { id: "ne2", title: "Nigerian Independence Gala", venue: "Hilton Park Lane", date: "Sun, Oct 1", time: "18:00", price: "£75", type: "Gala", distance: "4.1 mi", image: "https://picsum.photos/seed/nigala/600/400" },
  { id: "ne3", title: "Amapiano Brunch", venue: "Shoreditch Platform", date: "Sun, Jun 15", time: "12:00", price: "£25", type: "Brunch", distance: "1.8 mi", image: "https://picsum.photos/seed/amabrunch/600/400" },
  { id: "ne4", title: "African Food Festival", venue: "Victoria Park", date: "Sat, Jul 20", time: "11:00", price: "Free", type: "Festival", distance: "3.2 mi", image: "https://picsum.photos/seed/foodfest/600/400" },
  { id: "ne5", title: "Ghanaian Film Premiere", venue: "BFI Southbank", date: "Fri, Jun 28", time: "19:30", price: "£12", type: "Screening", distance: "5.5 mi", image: "https://picsum.photos/seed/ghfilm/600/400" },
]

// Local African businesses
const localBusinesses = [
  { id: "b1", name: "Mama Africa Restaurant", type: "Restaurant", cuisine: "Nigerian/Ghanaian", rating: 4.8, reviews: 342, distance: "0.8 mi", image: "https://picsum.photos/seed/mama/400/300" },
  { id: "b2", name: "Accra Hair Braiding", type: "Salon", cuisine: "Hair Salon", rating: 4.9, reviews: 215, distance: "1.2 mi", image: "https://picsum.photos/seed/hair/400/300" },
  { id: "b3", name: "Jollof Kitchen", type: "Restaurant", cuisine: "West African", rating: 4.7, reviews: 189, distance: "2.1 mi", image: "https://picsum.photos/seed/jollof/400/300" },
  { id: "b4", name: "African Market Store", type: "Grocery", cuisine: "African Foods", rating: 4.6, reviews: 128, distance: "1.5 mi", image: "https://picsum.photos/seed/market/400/300" },
]

// Community groups
const communityGroups = [
  { id: "g1", name: "Nigerians in London", members: 12500, posts: 45, image: "https://picsum.photos/seed/niglnd/400/300", active: true },
  { id: "g2", name: "Ghanaian Professionals UK", members: 8200, posts: 32, image: "https://picsum.photos/seed/ghapro/400/300", active: true },
  { id: "g3", name: "SA Expats London", members: 5600, posts: 28, image: "https://picsum.photos/seed/saexp/400/300", active: false },
  { id: "g4", name: "East African Network", members: 4100, posts: 19, image: "https://picsum.photos/seed/eanet/400/300", active: false },
]

// Back Home content (personalized for user's origin country)
const backHomeContent = {
  country: "Nigeria",
  flag: "NG",
  trending: [
    { type: "song", title: "Peace Be Unto You", artist: "Asake", plays: "12.4M this week" },
    { type: "movie", title: "A Tribe Called Judah", director: "Funke Akindele", views: "8.2M streams" },
    { type: "news", title: "AfroNation Lagos Announces 2026 Lineup", source: "Pulse Nigeria" },
  ],
  topCharts: mockTracks.slice(0, 5),
  newReleases: mockAlbums.slice(0, 4),
}

// Mock data (in real app, this would come from user's location)
const userLocation = {
  city: "London",
  country: "United Kingdom",
  homeCountry: "Nigeria",
}

export default function DiasporaPage() {
  const [activeTab, setActiveTab] = useState<"near-you" | "back-home" | "community">("near-you")
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header with location */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-primary">
            <MapPin className="size-4" />
            <span>{userLocation.city}, {userLocation.country}</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Your Diaspora Hub</h1>
          <p className="text-sm text-muted-foreground">Stay connected to Africa wherever you are</p>
        </div>
        <button 
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={cn(
            "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
            notificationsEnabled 
              ? "border-primary bg-primary/10 text-primary" 
              : "border-border text-muted-foreground hover:border-muted-foreground/50"
          )}
        >
          <Bell className={cn("size-4", notificationsEnabled && "fill-primary")} />
          {notificationsEnabled ? "Notifications On" : "Get Notified"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
        {[
          { id: "near-you", label: "Near You", icon: MapPin },
          { id: "back-home", label: "Back Home", icon: Globe },
          { id: "community", label: "Community", icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="size-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "near-you" && (
        <>
          {/* Events Near You */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Events Near You</h2>
              <Link href="/live" className="flex items-center gap-1 text-sm text-primary hover:underline">
                See all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nearYouEvents.slice(0, 6).map(event => (
                <Link 
                  key={event.id} 
                  href={`/live/${event.id}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-muted-foreground/30"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {event.type}
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.venue}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {event.date} at {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {event.distance}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Local African Businesses */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">African Businesses Nearby</h2>
              <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                <Filter className="size-4" /> Filter
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {localBusinesses.map(biz => (
                <div key={biz.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={biz.image} alt={biz.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{biz.name}</h3>
                    <p className="text-sm text-muted-foreground">{biz.cuisine}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="size-3 fill-yellow-400" />
                        {biz.rating} ({biz.reviews})
                      </span>
                      <span className="text-muted-foreground">{biz.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Creators */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Creators Near You</h2>
              <Link href="/creator" className="flex items-center gap-1 text-sm text-primary hover:underline">
                See all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {mockCreators.slice(0, 6).map(creator => (
                <Link 
                  key={creator.id} 
                  href={`/creator/${creator.id}`}
                  className="flex-shrink-0 text-center"
                >
                  <div className="relative mx-auto size-20 overflow-hidden rounded-full border-2 border-primary">
                    <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">{creator.name}</p>
                  <p className="text-xs text-muted-foreground">{creator.location}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "back-home" && (
        <>
          {/* Back Home Header */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/20 text-3xl">
                {backHomeContent.flag === "NG" && "🇳🇬"}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">What&apos;s Happening in {backHomeContent.country}</h2>
                <p className="text-sm text-muted-foreground">Stay connected to home with trending content and news</p>
              </div>
            </div>
          </div>

          {/* Trending Back Home */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Trending in {backHomeContent.country}</h3>
            <div className="space-y-3">
              {backHomeContent.trending.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl bg-muted/30 p-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-lg">
                    {item.type === "song" && "🎵"}
                    {item.type === "movie" && "🎬"}
                    {item.type === "news" && "📰"}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type === "song" && item.artist}
                      {item.type === "movie" && `Dir: ${item.director}`}
                      {item.type === "news" && item.source}
                    </p>
                  </div>
                  <span className="text-xs text-primary">
                    {item.type === "song" && item.plays}
                    {item.type === "movie" && item.views}
                    {item.type === "news" && "Read"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Artists From Home */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Top Artists from {backHomeContent.country}</h2>
              <Link href="/music" className="flex items-center gap-1 text-sm text-primary hover:underline">
                See all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {mockArtists.filter(a => a.country === backHomeContent.country).slice(0, 5).map(artist => (
                <Link 
                  key={artist.id} 
                  href={`/artist/${artist.id}`}
                  className="group text-center"
                >
                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-2 border-border transition-all group-hover:border-primary">
                    <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
                  </div>
                  <p className="mt-3 font-semibold text-foreground group-hover:text-primary">{artist.name}</p>
                  <p className="text-xs text-muted-foreground">{artist.genre}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Events Back Home */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Upcoming Events in {backHomeContent.country}</h2>
              <Link href="/live" className="flex items-center gap-1 text-sm text-primary hover:underline">
                See all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockEvents.filter(e => e.location.includes("Lagos") || e.location.includes("Nigeria")).slice(0, 2).map(event => (
                <Link 
                  key={event.id} 
                  href={`/live/${event.id}`}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-muted-foreground/30"
                >
                  <div className="relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={event.banner} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "community" && (
        <>
          {/* Community Groups */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Your Communities</h2>
              <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-muted-foreground/50">
                <Search className="size-4" /> Find Groups
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {communityGroups.map(group => (
                <div 
                  key={group.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-muted-foreground/30"
                >
                  <div className="relative size-16 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image src={group.image} alt={group.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{group.name}</h3>
                      {group.active && <span className="size-2 rounded-full bg-green-400" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{group.members.toLocaleString()} members</p>
                    <p className="text-xs text-primary">{group.posts} new posts today</p>
                  </div>
                  <button className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    group.active 
                      ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}>
                    {group.active ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Community Feed Preview */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Community Feed</h3>
            <div className="space-y-4">
              {[
                { user: "Adaeze N.", group: "Nigerians in London", content: "Anyone going to AfroNation Ghana this year? Looking for travel buddies!", likes: 45, comments: 23, time: "2h ago" },
                { user: "Kwame O.", group: "Ghanaian Professionals UK", content: "Networking event next Thursday in Canary Wharf. DM for details!", likes: 32, comments: 18, time: "4h ago" },
                { user: "Fatima B.", group: "East African Network", content: "Best Kenyan restaurant in North London? Need recommendations!", likes: 28, comments: 31, time: "6h ago" },
              ].map((post, i) => (
                <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary/20" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{post.user}</span>
                      <span className="text-xs text-muted-foreground"> in {post.group}</span>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{post.time}</span>
                  </div>
                  <p className="text-sm text-foreground">{post.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary">
                      <Heart className="size-4" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary">
                      <span>💬</span> {post.comments}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground">
              View Full Feed <ArrowRight className="size-4" />
            </button>
          </div>

          {/* Suggest a Group */}
          <div className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-6 text-center">
            <Users className="mx-auto size-10 text-primary" />
            <h3 className="mt-3 font-display font-semibold text-foreground">Start a Community</h3>
            <p className="mt-1 text-sm text-muted-foreground">Connect with Africans in your area or from your home country</p>
            <button className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Create Group
            </button>
          </div>
        </>
      )}

      {/* Diaspora Hubs Quick Links */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">Explore Diaspora Hubs</h2>
          <Link href="/hubs" className="flex items-center gap-1 text-sm text-primary hover:underline">
            See all <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockDiasporaHubs.map(hub => (
            <Link 
              key={hub.id}
              href={`/hubs/${hub.id}`}
              className="flex flex-shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-primary/50"
            >
              <span className="text-2xl">{hub.flag === "GB" ? "🇬🇧" : hub.flag === "US" ? "🇺🇸" : hub.flag === "CA" ? "🇨🇦" : hub.flag === "AU" ? "🇦🇺" : hub.flag === "EU" ? "🇪🇺" : "🇦🇪"}</span>
              <div>
                <p className="font-medium text-foreground">{hub.name}</p>
                <p className="text-xs text-muted-foreground">{hub.population} Africans</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
