"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { mockArtists, mockCreators, mockMovies, formatNumber } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { 
  Heart, TrendingUp, Music, Film, Users, DollarSign, 
  ChevronRight, Share2, Download, Calendar, PieChart,
  Sparkles, Globe, ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock impact data - in production this would come from the backend
const mockImpactData = {
  currentMonth: {
    totalPaid: 7.99,
    toCreators: 5.59, // 70%
    toPlatform: 2.40, // 30%
    breakdown: [
      { type: "music", amount: 2.80, percentage: 50, streams: 847 },
      { type: "creators", amount: 1.68, percentage: 30, views: 124 },
      { type: "movies", amount: 1.11, percentage: 20, watched: 8 },
    ],
    topSupported: [
      { id: "a1", name: "Burna Boy", type: "artist", amount: 0.89, streams: 156, image: "/placeholder.svg?height=80&width=80&text=BB" },
      { id: "a2", name: "Tyla", type: "artist", amount: 0.67, streams: 98, image: "/placeholder.svg?height=80&width=80&text=T" },
      { id: "c1", name: "Mark Angel", type: "creator", amount: 0.54, views: 34, image: "/placeholder.svg?height=80&width=80&text=MA" },
      { id: "m1", name: "The Black Book", type: "movie", amount: 0.45, watched: 1, image: "/placeholder.svg?height=80&width=80&text=BB" },
      { id: "a3", name: "Wizkid", type: "artist", amount: 0.42, streams: 67, image: "/placeholder.svg?height=80&width=80&text=W" },
    ],
    countries: [
      { name: "Nigeria", flag: "🇳🇬", amount: 3.20, percentage: 57 },
      { name: "South Africa", flag: "🇿🇦", amount: 1.40, percentage: 25 },
      { name: "Kenya", flag: "🇰🇪", amount: 0.56, percentage: 10 },
      { name: "Ghana", flag: "🇬🇭", amount: 0.43, percentage: 8 },
    ],
  },
  allTime: {
    totalPaid: 95.88,
    toCreators: 67.12,
    artistsSupported: 234,
    creatorsSupported: 56,
    filmmakersSupported: 12,
    countriesReached: 18,
    memberSince: "Jan 2024",
  },
}

export default function YourImpactPage() {
  const { user, subscription } = useUser()
  const [period, setPeriod] = useState<"month" | "alltime">("month")
  const impact = mockImpactData

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-primary/5 to-transparent px-4 pb-8 pt-6 lg:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
            <Heart className="size-4 fill-primary" />
            Your Impact
          </div>
          
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            See Where Your Money Goes
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            At AfriStream, 70% of your subscription goes directly to the artists, creators, and filmmakers you actually watch and listen to. No pooled royalties. Real support.
          </p>
          
          {/* Period Toggle */}
          <div className="mt-6 inline-flex rounded-full bg-card p-1">
            <button
              onClick={() => setPeriod("month")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                period === "month" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setPeriod("alltime")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                period === "alltime" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-6">
        {period === "month" ? (
          <>
            {/* Money Flow Visualization */}
            <section className="glass-card overflow-hidden rounded-2xl p-6">
              <h2 className="mb-6 font-display text-lg font-semibold text-foreground">
                How Your ${impact.currentMonth.totalPaid.toFixed(2)} Was Distributed
              </h2>
              
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                {/* Your Payment */}
                <div className="flex flex-col items-center">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/20">
                    <DollarSign className="size-8 text-primary" />
                  </div>
                  <p className="mt-2 font-mono text-xl font-bold text-foreground">${impact.currentMonth.totalPaid.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Your Subscription</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <ChevronRight className="size-8 text-muted-foreground/50 rotate-90 sm:rotate-0" />
                </div>

                {/* Split */}
                <div className="flex gap-6">
                  {/* To Creators */}
                  <div className="flex flex-col items-center">
                    <div className="flex size-20 items-center justify-center rounded-full bg-green-500/20">
                      <Heart className="size-8 text-green-500" />
                    </div>
                    <p className="mt-2 font-mono text-xl font-bold text-green-500">${impact.currentMonth.toCreators.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">To Creators (70%)</p>
                  </div>

                  {/* To Platform */}
                  <div className="flex flex-col items-center">
                    <div className="flex size-20 items-center justify-center rounded-full bg-muted/50">
                      <Sparkles className="size-8 text-muted-foreground" />
                    </div>
                    <p className="mt-2 font-mono text-xl font-bold text-muted-foreground">${impact.currentMonth.toPlatform.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Platform (30%)</p>
                  </div>
                </div>
              </div>

              {/* Content Type Breakdown */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {impact.currentMonth.breakdown.map((item) => (
                  <div key={item.type} className="rounded-xl bg-card/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${
                        item.type === "music" ? "bg-primary/20" : 
                        item.type === "creators" ? "bg-purple-500/20" : "bg-pink-500/20"
                      }`}>
                        {item.type === "music" ? <Music className="size-5 text-primary" /> :
                         item.type === "creators" ? <Users className="size-5 text-purple-500" /> :
                         <Film className="size-5 text-pink-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium capitalize text-foreground">{item.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type === "music" ? `${item.streams} streams` :
                           item.type === "creators" ? `${item.views} videos` :
                           `${item.watched} films`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold text-foreground">${item.amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/50">
                      <div 
                        className={`h-full rounded-full ${
                          item.type === "music" ? "bg-primary" : 
                          item.type === "creators" ? "bg-purple-500" : "bg-pink-500"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Top Supported */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Who You Supported Most
                </h2>
                <Link href="/library" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {impact.currentMonth.topSupported.map((item, i) => (
                  <div key={item.id} className="glass-card flex items-center gap-4 rounded-xl p-4 transition-all hover:bg-card/80">
                    <span className="w-6 text-center font-mono text-sm text-muted-foreground">
                      {i + 1}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {item.type} {item.type === "artist" ? `• ${item.streams} streams` : 
                                     item.type === "creator" ? `• ${item.views} views` : "• Watched"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold text-green-500">+${item.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">earned</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Countries Reached */}
            <section>
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                Countries You Supported
              </h2>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {impact.currentMonth.countries.map((country) => (
                  <div key={country.name} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{country.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">{country.percentage}% of support</p>
                      </div>
                      <p className="font-mono text-sm font-bold text-green-500">${country.amount.toFixed(2)}</p>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/50">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${country.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* All Time Stats */
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="glass-card rounded-xl p-5 text-center">
                <DollarSign className="mx-auto size-8 text-green-500" />
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">${impact.allTime.toCreators.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total to Creators</p>
              </div>
              <div className="glass-card rounded-xl p-5 text-center">
                <Music className="mx-auto size-8 text-primary" />
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">{impact.allTime.artistsSupported}</p>
                <p className="text-sm text-muted-foreground">Artists Supported</p>
              </div>
              <div className="glass-card rounded-xl p-5 text-center">
                <Users className="mx-auto size-8 text-purple-500" />
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">{impact.allTime.creatorsSupported}</p>
                <p className="text-sm text-muted-foreground">Creators Supported</p>
              </div>
              <div className="glass-card rounded-xl p-5 text-center">
                <Globe className="mx-auto size-8 text-blue-500" />
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">{impact.allTime.countriesReached}</p>
                <p className="text-sm text-muted-foreground">Countries Reached</p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Member since</p>
              <p className="font-display text-2xl font-bold text-foreground">{impact.allTime.memberSince}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You&apos;ve contributed ${impact.allTime.totalPaid.toFixed(2)} to the African creative economy
              </p>
            </div>
          </section>
        )}

        {/* Share Impact */}
        <section className="glass-card rounded-2xl p-6 text-center">
          <h2 className="font-display text-lg font-semibold text-foreground">Share Your Impact</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Let the world know you support African creators directly
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="size-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Download Card
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="glass-card rounded-2xl p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            How User-Centric Royalties Work
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
                <span className="font-display text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="mt-3 font-medium text-foreground">You Subscribe</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Your monthly payment enters the royalty pool
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
                <span className="font-display text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="mt-3 font-medium text-foreground">You Listen & Watch</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We track what YOU consume, not global totals
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
                <span className="font-display text-lg font-bold text-primary">3</span>
              </div>
              <h3 className="mt-3 font-medium text-foreground">Creators Get Paid</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                70% of YOUR sub goes to creators YOU support
              </p>
            </div>
          </div>
          
          <div className="mt-6 rounded-xl bg-green-500/10 p-4">
            <p className="text-center text-sm text-green-400">
              <strong>Unlike other platforms:</strong> If you only listen to 3 artists all month, those 3 artists get 100% of your creator share. Your money doesn&apos;t go to artists you&apos;ve never heard of.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
