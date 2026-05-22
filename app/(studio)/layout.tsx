"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Music, Tag, Users, Film, Globe, Calendar, BarChart3, DollarSign, Send,
  FileText, Headphones, ArrowLeft, Menu, X,
} from "lucide-react"
import { useState } from "react"

const studioLinks = [
  { label: "Artist Studio", href: "/studio/artist", icon: Music },
  { label: "Label Studio", href: "/studio/label", icon: Tag },
  { label: "Creator Studio", href: "/studio/creator", icon: Users },
  { label: "Film Studio", href: "/studio/film", icon: Film },
  { label: "Culture Studio", href: "/studio/culture", icon: Globe },
  { label: "Event Studio", href: "/studio/events", icon: Calendar },
  { label: "Royalties", href: "/studio/royalties", icon: DollarSign },
  { label: "Distribution", href: "/studio/distribution", icon: Send },
  { label: "Licensing", href: "/studio/licensing", icon: FileText },
]

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <header className="glass-strong flex h-14 items-center gap-3 border-b border-border px-4">
        <button onClick={() => setOpen(!open)} className="text-muted-foreground hover:text-foreground lg:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex items-center gap-2">
          <Headphones className="size-5 text-primary" />
          <span className="text-sm font-bold text-foreground">AfriStream <span className="text-primary">Studio</span></span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          "hidden w-56 flex-col overflow-y-auto border-r border-border bg-sidebar py-4 lg:flex"
        )}>
          <nav className="flex flex-col gap-1 px-3">
            {studioLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === link.href
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}>
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside className="absolute left-0 top-14 h-full w-64 overflow-y-auto bg-sidebar p-4" onClick={e => e.stopPropagation()}>
              <nav className="flex flex-col gap-1">
                {studioLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      pathname === link.href
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                    )}>
                    <link.icon className="size-4" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
