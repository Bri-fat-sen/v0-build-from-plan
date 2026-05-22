"use client"
import { genres } from "@/lib/mock-data"
import Link from "next/link"
import { Music } from "lucide-react"

export default function GenresPage() {
  return (
    <div className="space-y-6 py-4">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3 mb-1">
          <Music className="size-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Browse Genres</h1>
        </div>
        <p className="text-sm text-muted-foreground">Explore the full spectrum of African music</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-6">
        {genres.map((genre, i) => (
          <Link key={genre} href={`/music?genre=${genre}`}
            className="group relative overflow-hidden rounded-xl bg-card p-5 transition-all hover:bg-secondary hover:scale-[1.02]">
            <div className="absolute -right-4 -top-4 size-20 rounded-full opacity-15 transition-opacity group-hover:opacity-25"
              style={{ background: `hsl(${(i * 13) % 360}, 70%, 50%)` }} />
            <p className="relative text-sm font-semibold text-foreground">{genre}</p>
            <p className="relative mt-1 text-xs text-muted-foreground">{Math.floor(Math.random() * 500 + 100)} tracks</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
