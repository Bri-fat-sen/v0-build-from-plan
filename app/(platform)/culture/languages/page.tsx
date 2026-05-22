"use client"
import { africanLanguages } from "@/lib/mock-data"
import { Languages, ArrowLeft, Play, BookOpen, Volume2 } from "lucide-react"
import Link from "next/link"

export default function LanguagesPage() {
  return (
    <div className="space-y-6 py-4">
      <div className="px-4 lg:px-6">
        <Link href="/culture" className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to Culture
        </Link>
        <div className="flex items-center gap-3">
          <Languages className="size-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">African Languages</h1>
            <p className="text-sm text-muted-foreground">Learn and celebrate the rich linguistic diversity of Africa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
        {africanLanguages.map(lang => (
          <div key={lang} className="flex items-center justify-between rounded-xl bg-card p-4 transition-colors hover:bg-secondary cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
                <span className="text-lg font-bold text-primary">{lang[0]}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{lang}</p>
                <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 5)} lessons available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-muted-foreground hover:text-primary"><Volume2 className="size-4" /></button>
              <button className="text-muted-foreground hover:text-primary"><Play className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
