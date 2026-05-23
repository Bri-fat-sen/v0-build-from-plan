"use client"
import { use, useState } from "react"
import { SafeImage as Image } from "@/components/safe-image"
import { mockCreators, formatNumber } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Play, UserPlus, Share2, MapPin, Heart, DollarSign, ShoppingBag, Calendar } from "lucide-react"

const tabs = ["Videos", "Shorts", "Podcasts", "Series", "Community", "About"]

export default function CreatorChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const creator = mockCreators.find(c => c.id === id) || mockCreators[0]
  const [activeTab, setActiveTab] = useState("Videos")

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative h-40 sm:h-56">
        <Image src={creator.banner} alt={creator.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-4 px-4 sm:flex-row sm:items-end lg:px-6 -mt-16 relative z-10">
        <div className="relative size-24 overflow-hidden rounded-full border-4 border-background sm:size-28">
          <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground">{creator.name}</h1>
          <p className="text-sm text-muted-foreground">{creator.category}</p>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-start mt-1">
            <span className="flex items-center gap-1"><MapPin className="size-3" /> {creator.country}</span>
            {creator.location !== creator.country && <span>Based in {creator.location}</span>}
            <span>{formatNumber(creator.subscribers)} subscribers</span>
            <span>{creator.videos} videos</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground">
            <UserPlus className="size-4" /> Subscribe
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
            <DollarSign className="size-4" /> Tip
          </button>
          <button className="text-muted-foreground hover:text-foreground"><Share2 className="size-5" /></button>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">{creator.bio}</p>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border px-4 lg:px-6">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn(
              "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4 lg:px-6 pb-8">
        {activeTab === "Videos" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="group cursor-pointer rounded-lg bg-card overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={`https://picsum.photos/seed/vid${creator.id}${i}/640/360`} alt={`Video ${i + 1}`} fill className="object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="size-10 rounded-full bg-primary/90 p-2 text-primary-foreground" />
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                    {Math.floor(Math.random() * 20 + 5)}:{Math.floor(Math.random() * 50 + 10).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">Video title number {i + 1}</p>
                  <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 800 + 100)}K views &middot; {Math.floor(Math.random() * 30 + 1)} days ago</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "Shorts" && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-xl bg-muted cursor-pointer">
                <Image src={`https://picsum.photos/seed/short${creator.id}${i}/300/530`} alt={`Short ${i + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <p className="text-xs text-white">{Math.floor(Math.random() * 500 + 50)}K views</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "About" && (
          <div className="max-w-lg space-y-4">
            <div className="rounded-lg bg-card p-4 space-y-2">
              <h3 className="font-semibold text-foreground">About {creator.name}</h3>
              <p className="text-sm text-muted-foreground">{creator.bio}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
                <div><span className="text-muted-foreground">Country:</span> <span className="text-foreground">{creator.country}</span></div>
                <div><span className="text-muted-foreground">Location:</span> <span className="text-foreground">{creator.location}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <span className="text-foreground">{creator.category}</span></div>
                <div><span className="text-muted-foreground">Subscribers:</span> <span className="text-foreground">{formatNumber(creator.subscribers)}</span></div>
              </div>
            </div>
          </div>
        )}
        {(activeTab === "Podcasts" || activeTab === "Series" || activeTab === "Community") && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-muted">
              <Play className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No {activeTab.toLowerCase()} content yet</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 lg:px-6 pb-8">
        {[
          { icon: Heart, label: "Fan Club", desc: "Join the inner circle" },
          { icon: ShoppingBag, label: "Merch Store", desc: "5 items available" },
          { icon: Calendar, label: "Events", desc: "2 upcoming" },
          { icon: DollarSign, label: "Support", desc: "Send a tip" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 rounded-lg bg-card p-3 cursor-pointer hover:bg-secondary transition-colors">
            <item.icon className="size-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
