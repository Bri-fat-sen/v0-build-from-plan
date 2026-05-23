"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { mockCreators, creatorCategories, formatNumber } from "@/lib/mock-data"
import { CreatorCard, SectionHeader } from "@/components/content-card"
import { Play, Users, TrendingUp } from "lucide-react"

export default function CreatorsPage() {
  const featured = mockCreators[0]

  return (
    <div className="space-y-8 py-4">
      {/* Hero */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="size-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">AfriStream Creators</h1>
            <p className="text-sm text-muted-foreground">Discover African voices. Comedy, culture, education, and more.</p>
          </div>
        </div>
      </div>

      {/* Featured Creator */}
      <div className="mx-4 lg:mx-6">
        <Link href={`/creators/${featured.id}`} className="group relative overflow-hidden rounded-xl" style={{ display: "block", height: "240px" }}>
          <Image src={featured.banner} alt={featured.name} fill className="object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 flex items-end gap-4 p-6">
            <div className="relative size-16 overflow-hidden rounded-full border-2 border-primary">
              <Image src={featured.avatar} alt={featured.name} fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs font-medium text-primary">Featured Creator</span>
              <h2 className="text-xl font-bold text-white">{featured.name}</h2>
              <p className="text-sm text-white/70">{featured.bio}</p>
              <p className="text-xs text-white/50">{formatNumber(featured.subscribers)} subscribers</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <section className="space-y-3">
        <SectionHeader title="Browse by Category" />
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
          {creatorCategories.map((cat, i) => (
            <div key={cat} className="flex items-center gap-3 rounded-lg bg-card p-4 cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex size-10 items-center justify-center rounded-lg text-lg"
                style={{ background: `hsl(${i * 45}, 60%, 20%)`, color: `hsl(${i * 45}, 70%, 60%)` }}>
                {["🎵", "🎬", "🌍", "😂", "🎙️", "✈️", "🙏", "📚"][i]}
              </div>
              <span className="text-sm font-medium text-foreground">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Creators */}
      <section className="space-y-3">
        <SectionHeader title="Trending Creators" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
        </div>
      </section>

      {/* Latest Videos */}
      <section className="space-y-3">
        <SectionHeader title="Latest Videos" />
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {mockCreators.slice(0, 6).map((c, i) => (
            <Link key={c.id} href={`/creators/${c.id}`} className="group rounded-xl bg-card overflow-hidden">
              <div className="relative aspect-video">
                <Image src={c.banner} alt={c.name} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="size-12 rounded-full bg-primary/90 p-3 text-primary-foreground" />
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                  {Math.floor(Math.random() * 15 + 3)}:{Math.floor(Math.random() * 50 + 10).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="flex gap-3 p-3">
                <div className="relative size-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image src={c.avatar} alt={c.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">Latest video from {c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.name} &middot; {Math.floor(Math.random() * 500 + 10)}K views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shorts */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Shorts" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 lg:px-6">
          {mockCreators.map((c, i) => (
            <div key={`short-${c.id}`} className="w-28 flex-shrink-0 cursor-pointer">
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-muted">
                <Image src={c.banner} alt="Short" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium text-white truncate">{c.name}</p>
                  <p className="text-[10px] text-white/70">{Math.floor(Math.random() * 200 + 50)}K views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
