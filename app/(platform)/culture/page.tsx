'use client'

import Link from 'next/link'
import { Globe, BookOpen, Utensils, Shirt, Music, Sparkles, Drum, Languages } from 'lucide-react'
import { SafeImage as Image } from '@/components/safe-image'
import { cultureTopics } from '@/lib/mock-data'

export default function CulturePage() {
  const iconMap: Record<string, React.ComponentType<any>> = {
    globe: Globe,
    'book-open': BookOpen,
    utensils: Utensils,
    shirt: Shirt,
    music: Music,
    sparkles: Sparkles,
    drum: Drum,
    languages: Languages,
  }

  return (
    <main className="pb-12">
      {/* HERO */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/culture-hero/1600/900"
            alt="African Culture"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Heritage & Traditions</span>
              <h1 className="font-display text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                African Culture
              </h1>
            </div>
            <p className="max-w-lg text-lg text-white/80 leading-relaxed">
              Celebrate the rich heritage, languages, food, fashion, music, and oral traditions of Africa. Explore stories from every corner of the continent.
            </p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Globe className="size-5" />
              Explore Now
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Culture Topics */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">Explore by Topic</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cultureTopics.map((topic) => {
              const Icon = iconMap[topic.icon] || Globe
              return (
                <Link
                  key={topic.id}
                  href={`/culture/${topic.id}`}
                  className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.06] hover:border-primary/50 transition-all"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2">{topic.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured Content */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-white">Featured</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'The Art of Kente Weaving', country: 'Ghana', image: 'kente' },
              { title: 'Oral Histories of the Maasai', country: 'Kenya', image: 'maasai' },
              { title: 'Jollof: A Pan-African Story', country: 'West Africa', image: 'jollof' },
              { title: 'Traditional Instruments of Congo', country: 'DR Congo', image: 'congo' },
              { title: 'The Krio Language', country: 'Sierra Leone', image: 'krio' },
              { title: 'Zulu Dance Forms', country: 'South Africa', image: 'zulu' },
            ].map((item) => (
              <Link
                key={item.title}
                href="/culture/featured"
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/50 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${item.image}/640/360`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50">{item.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white">African Languages</h2>
            <Link href="/culture/languages" className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Swahili', 'Yoruba', 'Igbo', 'Hausa', 'Amharic', 'Zulu', 'Wolof', 'Lingala', 'Twi', 'Shona', 'Krio'].map(
              (lang) => (
                <Link
                  key={lang}
                  href="/culture/languages"
                  className="rounded-full border border-white/20 bg-white/[0.02] px-4 py-2 text-sm font-medium text-white hover:bg-primary/20 hover:border-primary/50 transition-all"
                >
                  {lang}
                </Link>
              )
            )}
          </div>
        </section>

        {/* Elder Stories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Elder Stories</h2>
              <p className="text-sm text-white/50 mt-1">Wisdom from our ancestors</p>
            </div>
            <Link href="/culture/elders" className="text-sm text-primary hover:text-primary/80 transition-colors">
              More →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {['Elder Wisdom from Nigeria', 'Storytellers of East Africa', 'Griots of the Sahel', 'Oral Traditions of Southern Africa'].map(
              (title, i) => (
                <Link
                  key={title}
                  href="/culture/elders"
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/elder${i}/640/360`}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-white/50 mt-1">{Math.floor(Math.random() * 20 + 5)} episodes</p>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
