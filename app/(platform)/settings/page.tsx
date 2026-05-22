"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Settings, User, CreditCard, Headphones, Wifi, Globe, Bell, Shield, ChevronRight } from "lucide-react"

const sections = [
  { id: "account", label: "Account", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "playback", label: "Playback", icon: Headphones },
  { id: "data", label: "Data Saver", icon: Wifi },
  { id: "language", label: "Language", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
]

export default function SettingsPage() {
  const [active, setActive] = useState("account")

  return (
    <div className="py-4">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="size-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 lg:flex-row lg:px-6">
        {/* Sidebar */}
        <nav className="flex gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active === s.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}>
              <s.icon className="size-4" />
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {active === "account" && (
            <div className="rounded-xl bg-card p-6 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Account Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Display Name", value: "Aminata Johnson" },
                  { label: "Email", value: "aminata@example.com" },
                  { label: "Phone", value: "+44 7700 900000" },
                  { label: "Country", value: "United Kingdom" },
                  { label: "Connected Countries", value: "Sierra Leone, Nigeria" },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{field.label}</p>
                      <p className="text-xs text-muted-foreground">{field.value}</p>
                    </div>
                    <button className="text-xs text-primary hover:underline">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "subscription" && (
            <div className="rounded-xl bg-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Subscription</h2>
              <div className="rounded-lg border border-primary bg-primary/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">Premium Plan</p>
                    <p className="text-sm text-muted-foreground">$7.99/month &middot; Renews Jan 15, 2026</p>
                  </div>
                  <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">Manage</button>
                </div>
              </div>
              <button className="text-sm text-primary hover:underline">View all plans</button>
            </div>
          )}

          {active === "playback" && (
            <div className="rounded-xl bg-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Playback Settings</h2>
              {[
                { label: "Audio Quality", value: "High (320kbps)", options: ["Normal", "High", "Lossless"] },
                { label: "Video Quality", value: "Auto (HD)", options: ["Low", "Medium", "HD", "4K"] },
                { label: "Crossfade", value: "5 seconds" },
                { label: "Equalizer", value: "Off" },
                { label: "Gapless Playback", value: "On" },
              ].map(setting => (
                <div key={setting.label} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <p className="text-sm font-medium text-foreground">{setting.label}</p>
                  <span className="text-xs text-muted-foreground">{setting.value}</span>
                </div>
              ))}
            </div>
          )}

          {(active === "data" || active === "language" || active === "notifications" || active === "privacy") && (
            <div className="rounded-xl bg-card p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">{sections.find(s => s.id === active)?.label} Settings</h2>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                  <p className="text-sm font-medium text-foreground">
                    {active === "data" && ["Data Saver Mode", "Download on Wi-Fi Only", "Stream Quality", "Cache Size"][i]}
                    {active === "language" && ["App Language", "Content Language", "Subtitle Language", "Audio Language"][i]}
                    {active === "notifications" && ["Push Notifications", "New Releases", "Artist Updates", "Event Reminders"][i]}
                    {active === "privacy" && ["Private Profile", "Listening Activity", "Search History", "Data Sharing"][i]}
                  </p>
                  <div className="flex size-10 items-center justify-center">
                    <div className={`h-5 w-10 rounded-full ${i % 2 === 0 ? "bg-primary" : "bg-muted"} relative cursor-pointer`}>
                      <div className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${i % 2 === 0 ? "left-5" : "left-0.5"}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
