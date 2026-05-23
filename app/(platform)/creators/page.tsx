'use client'

import Link from 'next/link'
import { Play, Users, TrendingUp, Crown, Zap } from 'lucide-react'
import { SafeImage as Image } from '@/components/safe-image'
import { mockCreators, creatorCategories, formatNumber } from '@/lib/mock-data'

export default function CreatorsPage() {
  const featured = mockCreators[0]
  const trending = mockCreators.slice(0, 3)
  const allCreators = mockCreators

  return (
    <main className="pb-12">
      {/* HERO: Featured Creator */}
      <div className="relative h-[65vh] min-h-[480px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={featured.banner || 'https://picsum.photos/seed/creator1/1600/900'}
            alt={featured.name}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="relative flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="size-5 text-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary">Featured Creator</span>
              </div>
              <h1 className="font-display text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                {featured.name}
              </h1>
            </div>
            <p className="max-w-lg text-lg text-white/80 leading-relaxed">{featured.bio}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-primary" />
                <span className="text-white/70">{formatNumber(featured.subscribers)} subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                <span className="text-white/70">{featured.category}</span>
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="size-5 fill-current" />
              Watch Now
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Top 3 Podium */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-display text-4xl font-black text-white">Top Creators</h2>
            <p className="text-white/50">Most-followed African creators this month</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trending.map((creator, idx) => (
              <Link
                key={creator.id}
                href={`/creators/${creator.id}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-primary/50 transition-all"
              >
                <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="font-display text-9xl font-black text-primary">
                    {idx === 0 ? '👑' : idx === 1 ? '🥈' : '🥉'}
                  </span>
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="relative size-16 overflow-hidden rounded-full border-2 border-primary">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="object-cover"
                        fallbackType="avatar"
                      />
                    </div>
                    <span className="font-display text-3xl font-black text-primary opacity-20">#{idx + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-white/50">{creator.category}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subscribers</span>
                      <span className="font-mono text-primary">{formatNumber(creator.subscribers)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {creatorCategories.map((cat, i) => (
              <Link
                key={cat}
                href={`/creators?category=${cat}`}
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:bg-white/[0.06] hover:border-primary/50 transition-all"
              >
                <span className="text-3xl">{['🎬', '🎙️', '🎨', '📚', '⚽', '🍳'][i % 6]}</span>
                <span className="text-center text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All Creators Grid */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">All Creators</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allCreators.map((creator) => (
              <Link
                key={creator.id}
                href={`/creators/${creator.id}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/50 transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={creator.banner || creator.avatar}
                    alt={creator.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    fallbackType="creator"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
                      <Play className="size-4 fill-current" />
                      Visit
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                    {creator.name}
                  </h3>
                  <p className="text-xs text-white/50">{creator.category}</p>
                  <p className="text-xs text-primary font-mono">{formatNumber(creator.subscribers)} subscribers</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
