"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { cultureTopics } from "@/lib/mock-data"
import { SectionHeader } from "@/components/content-card"
import { Globe, BookOpen, Utensils, Shirt, Music, Sparkles, Drum, Languages, ScrollText, Play } from "lucide-react"

const iconMap: Record<string, typeof Globe> = {
  scroll: ScrollText, languages: Languages, utensils: Utensils, shirt: Shirt,
  music: Music, sparkles: Sparkles, "book-open": BookOpen, drum: Drum,
}

export default function CulturePage() {
  return (
    <div className="space-y-8 py-4">
      {/* Hero */}
      <div className="px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-card to-card p-6">
          <Globe className="absolute -right-6 -top-6 size-32 text-primary/10" />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold text-foreground">AfriStream Culture</h1>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Celebrate African heritage. Language, food, fashion, dance, history, and oral traditions from across the continent.
            </p>
          </div>
        </div>
      </div>

      {/* Culture Topics */}
      <section className="space-y-3">
        <SectionHeader title="Explore" />
        <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {cultureTopics.map(topic => {
            const Icon = iconMap[topic.icon] || Globe
            return (
              <Link key={topic.id} href={`/culture/${topic.id}`}
                className="flex items-start gap-3 rounded-xl bg-card p-4 transition-colors hover:bg-secondary">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Cultural Content */}
      <section className="space-y-3">
        <SectionHeader title="Featured" />
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {[
            { title: "The Art of Kente Weaving", country: "Ghana", img: "kente" },
            { title: "Oral Histories of the Maasai", country: "Kenya", img: "maasai" },
            { title: "Jollof: A Pan-African Story", country: "West Africa", img: "jollof" },
            { title: "Traditional Instruments of Congo", country: "DR Congo", img: "congoinst" },
            { title: "The Krio Language", country: "Sierra Leone", img: "krio" },
            { title: "Zulu Dance Forms", country: "South Africa", img: "zuludance" },
          ].map(item => (
            <Link key={item.title} href="/culture/cu1" className="group overflow-hidden rounded-xl bg-card">
              <div className="relative aspect-video">
                <Image src={`https://picsum.photos/seed/${item.img}/640/360`} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="size-12 rounded-full bg-primary/90 p-3 text-primary-foreground" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="space-y-3">
        <SectionHeader title="African Languages" href="/culture/languages" />
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 lg:px-6">
          {["Krio", "Swahili", "Yoruba", "Igbo", "Hausa", "Amharic", "Zulu", "Wolof", "Lingala", "Twi", "Shona"].map(lang => (
            <Link key={lang} href="/culture/languages" className="whitespace-nowrap rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
              {lang}
            </Link>
          ))}
        </div>
      </section>

      {/* Elder Stories */}
      <section className="space-y-3 pb-8">
        <SectionHeader title="Elder Stories" subtitle="Wisdom from our ancestors" />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 lg:px-6">
          {["Elder Wisdom from Nigeria", "Storytellers of East Africa", "Griots of the Sahel", "Oral Traditions of Southern Africa"].map((title, i) => (
            <div key={title} className="w-56 flex-shrink-0 overflow-hidden rounded-xl bg-card cursor-pointer hover:bg-secondary transition-colors">
              <div className="relative aspect-video">
                <Image src={`https://picsum.photos/seed/elder${i}/400/225`} alt={title} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 20 + 5)} episodes</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
