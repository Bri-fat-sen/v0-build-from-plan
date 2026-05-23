"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Search, Bell, User, Home, Library, Music, Film, Users, Globe, Radio, Menu,
  X, ChevronDown, Settings, History, Download, Bookmark, Heart,
} from "lucide-react"
import { MiniPlayer } from "@/components/player/mini-player"
import { FullScreenPlayer } from "@/components/player/full-screen-player"
import { usePlayer } from "@/lib/player-context"

const worldTabs = [
  { label: "One", href: "/", icon: Home },
  { label: "Music", href: "/music", icon: Music },
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Creators", href: "/creators", icon: Users },
  { label: "Culture", href: "/culture", icon: Globe },
  { label: "Live", href: "/live", icon: Radio },
]

const sidebarLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Library", href: "/library", icon: Library },
  { label: "Playlists", href: "/library?tab=playlists", icon: Heart },
  { label: "Watchlist", href: "/library?tab=watchlist", icon: Bookmark },
  { label: "Downloads", href: "/library?tab=downloads", icon: Download },
  { label: "History", href: "/library?tab=history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
]

const mobileNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Library", href: "/library", icon: Library },
  { label: "Profile", href: "/profile", icon: User },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentTrack, isFullScreen } = usePlayer()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Top Nav */}
      <header className="glass-strong sticky top-0 z-50 flex h-14 items-center gap-3 px-4 lg:px-6">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground lg:hidden">
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-lg font-black tracking-tighter text-foreground sm:text-xl">
              Afri<span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Stream</span>
            </span>
          </div>
        </Link>
        <div className="mx-auto hidden w-full max-w-md md:block">
          <Link href="/search" className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Search className="size-4" />
            <span>Search music, movies, creators...</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/search" className="text-muted-foreground hover:text-foreground md:hidden">
            <Search className="size-5" />
          </Link>
          <button className="relative text-muted-foreground hover:text-foreground">
            <Bell className="size-5" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
          </button>
          <Link href="/profile" className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30">
            <User className="size-4" />
          </Link>
        </div>
      </header>

      {/* World Tabs */}
      <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-border bg-background px-4 lg:px-6">
        {worldTabs.map(tab => (
          <Link key={tab.href} href={tab.href}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(tab.href)
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}>
            <tab.icon className="size-4" />
            {tab.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Link href="/hubs" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:block",
            pathname.startsWith("/hubs") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            Hubs
          </Link>
          <Link href="/subscriptions" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:block",
            pathname.startsWith("/subscriptions") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            Subscribe
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className={cn(
          "hidden w-56 flex-col border-r border-border bg-sidebar lg:flex",
          "overflow-y-auto py-4"
        )}>
          <nav className="flex flex-col gap-1 px-3">
            {sidebarLinks.map(link => (
              <Link key={link.label} href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(link.href)
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}>
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t border-sidebar-border px-3 pt-4">
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick Links</p>
            <Link href="/artist" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
              <Music className="size-4" /> Artist Studio
            </Link>
            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
              <Settings className="size-4" /> Admin
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside className="absolute left-0 top-14 h-full w-64 overflow-y-auto bg-sidebar p-4" onClick={e => e.stopPropagation()}>
              <nav className="flex flex-col gap-1">
                {sidebarLinks.map(link => (
                  <Link key={link.label} href={link.href} onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive(link.href)
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}>
                    <link.icon className="size-4" />
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-sidebar-border pt-4">
                <Link href="/hubs" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Globe className="size-4" /> Country Hubs
                </Link>
                <Link href="/subscriptions" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <ChevronDown className="size-4" /> Subscriptions
                </Link>
                <Link href="/artist" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Music className="size-4" /> Artist Studio
                </Link>
                <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Settings className="size-4" /> Admin
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className={cn("pb-36", currentTrack ? "pb-52" : "pb-36")}>
            {children}
          </div>
        </main>
      </div>

      {/* Audio Player */}
      {currentTrack && !isFullScreen && <MiniPlayer />}
      {isFullScreen && <FullScreenPlayer />}

      {/* Mobile Bottom Nav */}
      <nav className="glass-strong fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border py-2 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {mobileNav.map(item => (
          <Link key={item.label} href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 text-xs transition-colors",
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            )}>
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
