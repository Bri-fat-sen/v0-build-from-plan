"use client"
import { use } from "react"
import Image from "next/image"
import { cultureTopics } from "@/lib/mock-data"
import { Play, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CultureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const topic = cultureTopics.find(t => t.id === id) || cultureTopics[0]

  return (
    <div className="space-y-6 py-4">
      <div className="px-4 lg:px-6">
        <Link href="/culture" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Culture
        </Link>
        <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="group cursor-pointer overflow-hidden rounded-xl bg-card">
            <div className="relative aspect-video">
              <Image src={`https://picsum.photos/seed/culture${topic.id}${i}/640/360`} alt={`Content ${i + 1}`} fill className="object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="size-10 rounded-full bg-primary/90 p-2 text-primary-foreground" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground">{topic.title} - Part {i + 1}</p>
              <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 30 + 5)} min &middot; {Math.floor(Math.random() * 100 + 10)}K views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
