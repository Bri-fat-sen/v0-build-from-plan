"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, FileVideo, DollarSign, Shield, Send,
  FileText, ScrollText, Settings, ArrowLeft, Menu, X, ShieldAlert,
} from "lucide-react"
import { useState } from "react"

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Content", href: "/admin/content", icon: FileVideo },
  { label: "Finance & Royalties", href: "/admin/finance", icon: DollarSign },
  { label: "Copyright", href: "/admin/copyright", icon: Shield },
  { label: "Moderation", href: "/admin/moderation", icon: ShieldAlert },
  { label: "Distribution", href: "/admin/distribution", icon: Send },
  { label: "Licensing", href: "/admin/licensing", icon: FileText },
  { label: "Audit Logs", href: "/admin/audit", icon: ScrollText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-dvh flex-col bg-background">
      <header className="glass-strong flex h-14 items-center gap-3 border-b border-border px-4 z-30 sticky top-0">
        <button onClick={() => setOpen(!open)} className="text-muted-foreground hover:text-foreground lg:hidden focus-visible:ring-2 focus-visible:ring-ring rounded">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link href="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold text-foreground">
            AfriStream <span className="text-primary">Admin</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full bg-destructive/15 px-3 py-1 text-xs font-medium text-destructive">
            Admin Access
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 flex-col overflow-y-auto border-r border-border bg-sidebar py-4 lg:flex">
          <nav className="flex flex-col gap-0.5 px-3">
            {adminLinks.map(link => {
              const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
              return (
                <Link key={link.href} href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}>
                  <link.icon className="size-4 flex-shrink-0" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside className="absolute left-0 top-14 h-full w-64 overflow-y-auto bg-sidebar p-4" onClick={e => e.stopPropagation()}>
              <nav className="flex flex-col gap-0.5">
                {adminLinks.map(link => {
                  const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                      )}>
                      <link.icon className="size-4" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
