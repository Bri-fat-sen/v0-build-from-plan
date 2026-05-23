"use client"

import { useState } from "react"
import { formatNumber, africanLanguages } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen, Languages, Globe, Users, Upload, Archive, Play, 
  ArrowLeft, Mic, Video, FileText, Image, Music, Heart, 
  TrendingUp, Award, MessageCircle, Share2, Clock
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const contentTypes = [
  { type: "Language Lessons", count: 156, icon: Languages, color: "#f97316" },
  { type: "Heritage Stories", count: 89, icon: BookOpen, color: "#3b82f6" },
  { type: "Traditional Music", count: 234, icon: Music, color: "#22c55e" },
  { type: "Cultural Videos", count: 67, icon: Video, color: "#8b5cf6" },
  { type: "Historical Archives", count: 412, icon: Archive, color: "#ec4899" },
  { type: "Oral Traditions", count: 78, icon: Mic, color: "#eab308" },
]

const impactData = [
  { name: "Language Learners", value: 45, color: "#f97316" },
  { name: "Heritage Explorers", value: 30, color: "#3b82f6" },
  { name: "Diaspora Reconnecting", value: 15, color: "#22c55e" },
  { name: "Educators/Students", value: 10, color: "#8b5cf6" },
]

const engagementData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  lessons: Math.floor(Math.random() * 500 + 200),
  heritage: Math.floor(Math.random() * 300 + 100),
}))

const languageCourses = [
  { id: "l1", language: "Yoruba", lessons: 24, learners: 4500, completion: 68, rating: 4.8 },
  { id: "l2", language: "Swahili", lessons: 32, learners: 8200, completion: 72, rating: 4.9 },
  { id: "l3", language: "Zulu", lessons: 18, learners: 3100, completion: 65, rating: 4.7 },
  { id: "l4", language: "Amharic", lessons: 20, learners: 2800, completion: 58, rating: 4.6 },
  { id: "l5", language: "Twi", lessons: 15, learners: 2200, completion: 71, rating: 4.8 },
]

const heritageCollections = [
  { id: "h1", title: "Masks of West Africa", items: 45, views: 12000, region: "West Africa", type: "Visual Archive" },
  { id: "h2", title: "Oral Histories of the Maasai", items: 28, views: 8500, region: "East Africa", type: "Audio Collection" },
  { id: "h3", title: "Kingdom of Benin", items: 67, views: 25000, region: "Nigeria", type: "Historical" },
  { id: "h4", title: "Traditional Cuisine Guide", items: 120, views: 45000, region: "Pan-African", type: "Documentary" },
  { id: "h5", title: "Ancient Ethiopian Scripts", items: 34, views: 6800, region: "Ethiopia", type: "Language Archive" },
]

export default function HeritageToolsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "languages" | "heritage" | "tools">("overview")

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/culture-studio">
            <Button variant="ghost" size="icon" className="size-8">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Heritage & Language Tools</h1>
            <p className="text-sm text-muted-foreground">Preserve, teach, and share African cultural heritage</p>
          </div>
        </div>
        <Button className="gap-2">
          <Upload className="size-4" />
          Add Content
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
        {(["overview", "languages", "heritage", "tools"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "languages" ? "Language Courses" : tab === "heritage" ? "Heritage Collections" : tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Impact Stats */}
          <div className="rounded-xl bg-gradient-to-br from-primary/20 via-card to-card p-6">
            <h3 className="font-semibold text-foreground">Your Cultural Impact</h3>
            <p className="mt-1 text-sm text-muted-foreground">Helping preserve African heritage for future generations</p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="font-mono text-3xl font-bold text-primary">24.5K</p>
                <p className="text-xs text-muted-foreground">Language Learners</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">1,036</p>
                <p className="text-xs text-muted-foreground">Content Items</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-foreground">22</p>
                <p className="text-xs text-muted-foreground">Languages Covered</p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-green-500">$8.2K</p>
                <p className="text-xs text-muted-foreground">Monthly Earnings</p>
              </div>
            </div>
          </div>

          {/* Content Types */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contentTypes.map((content) => (
              <div key={content.type} className="flex items-center gap-4 rounded-xl bg-card p-4">
                <div 
                  className="flex size-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${content.color}20` }}
                >
                  <content.icon className="size-6" style={{ color: content.color }} />
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-foreground">{content.count}</p>
                  <p className="text-sm text-muted-foreground">{content.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Audience Impact */}
            <div className="rounded-xl bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Audience Impact</h3>
              <div className="flex items-center gap-4">
                <div className="h-40 w-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={impactData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        stroke="none"
                      >
                        {impactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {impactData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-mono text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Engagement */}
            <div className="rounded-xl bg-card p-4">
              <h3 className="mb-4 font-semibold text-foreground">Weekly Engagement</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: 12 }}
                    />
                    <Bar dataKey="lessons" name="Lessons" fill="#f97316" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="heritage" name="Heritage" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Languages Tab */}
      {activeTab === "languages" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Your Language Courses</h3>
            <Button size="sm" className="gap-2">
              <Languages className="size-4" />
              Create Course
            </Button>
          </div>

          <div className="space-y-4">
            {languageCourses.map((course) => (
              <div key={course.id} className="rounded-xl border border-border bg-card p-4 lg:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-xl bg-primary/15">
                      <Languages className="size-7 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-foreground">{course.language}</h4>
                      <p className="text-sm text-muted-foreground">{course.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit Course</Button>
                    <Button variant="outline" size="sm">Analytics</Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Learners</p>
                    <p className="font-mono text-xl font-bold text-foreground">{formatNumber(course.learners)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                    <p className="font-mono text-xl font-bold text-green-500">{course.completion}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Award className="size-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-mono text-xl font-bold text-foreground">{course.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Language CTA */}
          <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-6 text-center">
            <Languages className="mx-auto size-10 text-primary" />
            <h4 className="mt-2 font-semibold text-foreground">Teach Another Language</h4>
            <p className="mt-1 text-sm text-muted-foreground">Help preserve African languages by creating courses</p>
            <Button className="mt-4">Start New Course</Button>
          </div>
        </div>
      )}

      {/* Heritage Tab */}
      {activeTab === "heritage" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Heritage Collections</h3>
            <Button size="sm" className="gap-2">
              <Archive className="size-4" />
              New Collection
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {heritageCollections.map((collection) => (
              <div key={collection.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                  <Archive className="size-12 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{collection.title}</h4>
                      <p className="text-xs text-muted-foreground">{collection.region}</p>
                    </div>
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                      {collection.type}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{collection.items} items</span>
                    <span className="font-mono text-muted-foreground">{formatNumber(collection.views)} views</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Manage Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === "tools" && (
        <div className="space-y-6">
          <h3 className="font-semibold text-foreground">Heritage Preservation Tools</h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Audio Recorder", description: "Record oral histories and traditional songs", icon: Mic, status: "available" },
              { title: "Video Uploader", description: "Upload cultural documentaries and ceremonies", icon: Video, status: "available" },
              { title: "Image Archive", description: "Digitize photos and artifacts", icon: Image, status: "available" },
              { title: "Text Transcription", description: "Transcribe audio to preserve in text", icon: FileText, status: "available" },
              { title: "Language Lesson Builder", description: "Create interactive language lessons", icon: Languages, status: "available" },
              { title: "Community Collaboration", description: "Invite elders and experts to contribute", icon: Users, status: "beta" },
            ].map((tool) => (
              <div key={tool.title} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15">
                    <tool.icon className="size-5 text-primary" />
                  </div>
                  {tool.status === "beta" && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">Beta</span>
                  )}
                </div>
                <h4 className="mt-3 font-semibold text-foreground">{tool.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{tool.description}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  {tool.status === "beta" ? "Try Beta" : "Open Tool"}
                </Button>
              </div>
            ))}
          </div>

          {/* Impact Banner */}
          <div className="rounded-xl bg-gradient-to-r from-primary/20 via-card to-primary/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Your Cultural Impact
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You&apos;ve helped preserve content from 22 African languages and connected 24,500 learners with their heritage.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="size-4" />
                Share Impact
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
