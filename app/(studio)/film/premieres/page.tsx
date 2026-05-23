"use client"

import { useState } from "react"
import { formatNumber } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Calendar, Clock, Ticket, Users, DollarSign, Play, Video, 
  ArrowLeft, Settings, MessageCircle, Share2, Globe, Star, Sparkles
} from "lucide-react"

const upcomingPremieres = [
  { 
    id: "p1", 
    title: "Accra Dreams", 
    poster: "https://picsum.photos/seed/accra/400/600",
    date: "Dec 20, 2024", 
    time: "8:00 PM WAT", 
    ticketsSold: 1250, 
    capacity: 5000,
    ticketPrice: 15,
    revenue: 18750,
    status: "selling",
    features: ["Live Q&A", "Virtual Red Carpet", "Watch Party"]
  },
  { 
    id: "p2", 
    title: "Silent Waters", 
    poster: "https://picsum.photos/seed/waters/400/600",
    date: "Jan 15, 2025", 
    time: "7:00 PM EAT", 
    ticketsSold: 0, 
    capacity: 3000,
    ticketPrice: 12,
    revenue: 0,
    status: "draft",
    features: []
  },
]

const pastPremieres = [
  { id: "pp1", title: "The Return", date: "Nov 5, 2024", attendance: 3200, revenue: 41600, rating: 4.8 },
  { id: "pp2", title: "Lagos Nights S2", date: "Oct 12, 2024", attendance: 4500, revenue: 54000, rating: 4.6 },
  { id: "pp3", title: "Roots of Gold", date: "Sep 20, 2024", attendance: 1800, revenue: 18000, rating: 4.9 },
]

export default function PremieresPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/film">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Premieres</h1>
            <p className="text-sm text-muted-foreground">Schedule and manage your film premieres</p>
          </div>
        </div>
        <Button className="gap-2">
          <Calendar className="size-4" />
          Schedule New Premiere
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl bg-card p-4">
          <Ticket className="mb-2 size-5 text-primary" />
          <p className="font-mono text-2xl font-bold text-foreground">1,250</p>
          <p className="text-xs text-muted-foreground">Tickets Sold (Active)</p>
        </div>
        <div className="rounded-xl bg-card p-4">
          <DollarSign className="mb-2 size-5 text-green-500" />
          <p className="font-mono text-2xl font-bold text-green-500">$18,750</p>
          <p className="text-xs text-muted-foreground">Premiere Revenue</p>
        </div>
        <div className="rounded-xl bg-card p-4">
          <Users className="mb-2 size-5 text-blue-500" />
          <p className="font-mono text-2xl font-bold text-foreground">9,500</p>
          <p className="text-xs text-muted-foreground">Total Attendance (All Time)</p>
        </div>
        <div className="rounded-xl bg-card p-4">
          <Star className="mb-2 size-5 text-yellow-500" />
          <p className="font-mono text-2xl font-bold text-foreground">4.77</p>
          <p className="text-xs text-muted-foreground">Avg. Premiere Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab} Premieres
          </button>
        ))}
      </div>

      {/* Upcoming Premieres */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {upcomingPremieres.map((premiere) => (
            <div key={premiere.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex flex-col lg:flex-row">
                {/* Poster */}
                <div className="relative aspect-[2/3] w-full lg:w-48">
                  <img 
                    src={premiere.poster} 
                    alt={premiere.title}
                    className="size-full object-cover"
                  />
                  {premiere.status === "selling" && (
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                      <span className="size-1.5 animate-pulse rounded-full bg-white" />
                      ON SALE
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-4 lg:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{premiere.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          {premiere.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {premiere.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="size-4" />
                          Global
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-1 size-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-1 size-3" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Ticket Progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tickets Sold</span>
                      <span className="font-mono text-foreground">
                        {formatNumber(premiere.ticketsSold)} / {formatNumber(premiere.capacity)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div 
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(premiere.ticketsSold / premiere.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ticket Price</p>
                      <p className="font-mono text-lg font-semibold text-foreground">${premiere.ticketPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-mono text-lg font-semibold text-green-500">${formatNumber(premiere.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-mono text-lg font-semibold text-foreground">{formatNumber(premiere.capacity)}</p>
                    </div>
                  </div>

                  {/* Features */}
                  {premiere.features.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {premiere.features.map((feature) => (
                        <span 
                          key={feature}
                          className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" className="gap-2">
                      <Ticket className="size-4" />
                      Manage Tickets
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageCircle className="size-4" />
                      Q&A Settings
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Play className="size-4" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Create New Premiere CTA */}
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 p-8 text-center">
            <Sparkles className="mb-3 size-10 text-primary" />
            <h3 className="font-semibold text-foreground">Ready to premiere your next film?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a premiere event to generate buzz and sell tickets
            </p>
            <Button className="mt-4 gap-2">
              <Calendar className="size-4" />
              Schedule Premiere
            </Button>
          </div>
        </div>
      )}

      {/* Past Premieres */}
      {activeTab === "past" && (
        <div className="rounded-xl bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="p-4">Film</th>
                <th className="p-4 hidden sm:table-cell">Date</th>
                <th className="p-4">Attendance</th>
                <th className="p-4 hidden md:table-cell">Revenue</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastPremieres.map((premiere) => (
                <tr key={premiere.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="p-4 font-medium text-foreground">{premiere.title}</td>
                  <td className="p-4 hidden sm:table-cell text-muted-foreground">{premiere.date}</td>
                  <td className="p-4 font-mono text-foreground">{formatNumber(premiere.attendance)}</td>
                  <td className="p-4 hidden md:table-cell font-mono text-green-500">${formatNumber(premiere.revenue)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="size-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-foreground">{premiere.rating}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">View Report</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
