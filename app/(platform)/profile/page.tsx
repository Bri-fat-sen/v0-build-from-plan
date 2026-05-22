"use client"
import Link from "next/link"
import { User, MapPin, Globe, Settings, Music, Film, Clock, Award, Heart, Headphones } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6 py-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 px-4 pt-4 lg:px-6">
        <div className="flex size-24 items-center justify-center rounded-full bg-primary/20 text-primary">
          <User className="size-12" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Aminata Johnson</h1>
          <p className="text-sm text-muted-foreground">@aminata_j</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="size-3" /> London, UK</span>
            <span className="flex items-center gap-1"><Globe className="size-3" /> Sierra Leone, Nigeria</span>
          </div>
        </div>
        <Link href="/settings" className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
          <Settings className="size-4" /> Edit Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 px-4 lg:px-6">
        {[
          { label: "Streams", value: "12.4K", icon: Music },
          { label: "Watched", value: "86", icon: Film },
          { label: "Hours", value: "340", icon: Clock },
          { label: "Badges", value: "7", icon: Award },
        ].map(stat => (
          <div key={stat.label} className="flex flex-col items-center rounded-xl bg-card p-3">
            <stat.icon className="mb-1 size-4 text-primary" />
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Languages & Interests */}
      <div className="space-y-4 px-4 lg:px-6">
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {["English", "Krio", "Yoruba", "Pidgin"].map(lang => (
              <span key={lang} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground">{lang}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {["Afrobeats", "Amapiano", "Nollywood", "Comedy", "Culture", "Podcasts"].map(int => (
              <span key={int} className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">{int}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 lg:px-6">
        <div className="rounded-xl bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Badges</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Early Adopter", icon: Award },
              { name: "Music Lover", icon: Headphones },
              { name: "Culture Explorer", icon: Globe },
              { name: "Binge Watcher", icon: Film },
              { name: "Playlist Curator", icon: Music },
            ].map(badge => (
              <div key={badge.name} className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <badge.icon className="size-3 text-primary" />
                <span className="text-xs text-foreground">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3 px-4 lg:px-6 pb-8">
        {[
          { label: "Liked Songs", href: "/library", icon: Heart },
          { label: "Watchlist", href: "/library?tab=movies", icon: Film },
          { label: "Settings", href: "/settings", icon: Settings },
          { label: "Subscription", href: "/subscriptions", icon: Award },
        ].map(link => (
          <Link key={link.label} href={link.href}
            className="flex items-center gap-3 rounded-xl bg-card p-4 transition-colors hover:bg-secondary">
            <link.icon className="size-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
