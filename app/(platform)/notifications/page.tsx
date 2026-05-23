"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Bell, Heart, MessageCircle, UserPlus, Music, Film, DollarSign, Star, Gift, Mic, Play, Check, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/mock-data"

type NotificationType = "like" | "comment" | "follow" | "release" | "royalty" | "tip" | "milestone" | "live" | "mention"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  avatar?: string
  link?: string
  amount?: number
}

const mockNotifications: Notification[] = [
  { id: "1", type: "royalty", title: "Monthly Royalties Deposited", message: "Your May 2026 royalties of $1,247.50 have been deposited to your M-Pesa", time: "2 hours ago", read: false, amount: 1247.50 },
  { id: "2", type: "follow", title: "New Follower", message: "Davido started following you", time: "3 hours ago", read: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", link: "/creators/davido" },
  { id: "3", type: "like", title: "Track Milestone", message: "Your track 'Lagos Nights' reached 1 million streams!", time: "5 hours ago", read: false },
  { id: "4", type: "tip", title: "You received a tip!", message: "Adaora sent you Africa Love (5000 coins) worth $50", time: "8 hours ago", read: false, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", amount: 50 },
  { id: "5", type: "comment", title: "New Comment", message: "Wizkid commented on your track: 'Fire bro!'", time: "12 hours ago", read: true, avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop" },
  { id: "6", type: "release", title: "New Release", message: "Burna Boy just dropped a new album 'African Giant II'", time: "1 day ago", read: true, avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop" },
  { id: "7", type: "live", title: "Live Now", message: "Tems is going live in 5 minutes - Virtual Concert", time: "1 day ago", read: true },
  { id: "8", type: "milestone", title: "Achievement Unlocked", message: "You've earned the 'Rising Star' badge - 10K followers!", time: "2 days ago", read: true },
  { id: "9", type: "mention", title: "You were mentioned", message: "Mark Angel mentioned you in a comment", time: "3 days ago", read: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
]

const notificationIcons: Record<NotificationType, { icon: typeof Heart; color: string }> = {
  like: { icon: Heart, color: "text-red-500 bg-red-500/20" },
  comment: { icon: MessageCircle, color: "text-blue-500 bg-blue-500/20" },
  follow: { icon: UserPlus, color: "text-green-500 bg-green-500/20" },
  release: { icon: Music, color: "text-purple-500 bg-purple-500/20" },
  royalty: { icon: DollarSign, color: "text-primary bg-primary/20" },
  tip: { icon: Gift, color: "text-amber-500 bg-amber-500/20" },
  milestone: { icon: Star, color: "text-yellow-500 bg-yellow-500/20" },
  live: { icon: Play, color: "text-red-500 bg-red-500/20" },
  mention: { icon: Mic, color: "text-cyan-500 bg-cyan-500/20" },
}

const tabs = ["All", "Unread", "Royalties", "Social", "Releases"]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("All")

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "All") return true
    if (activeTab === "Unread") return !n.read
    if (activeTab === "Royalties") return n.type === "royalty" || n.type === "tip"
    if (activeTab === "Social") return ["like", "comment", "follow", "mention"].includes(n.type)
    if (activeTab === "Releases") return n.type === "release" || n.type === "live"
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-32 px-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            <Check className="size-4 mr-1" /> Mark all read
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"
            )}
          >
            {tab}
            {tab === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white/20 text-xs">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Bell className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          filteredNotifications.map(notification => {
            const { icon: Icon, color } = notificationIcons[notification.type]
            return (
              <div
                key={notification.id}
                className={cn(
                  "glass-card rounded-xl p-4 flex gap-4 group transition-colors cursor-pointer",
                  !notification.read && "border-l-2 border-primary bg-primary/5"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                {notification.avatar ? (
                  <div className="relative size-12 rounded-full overflow-hidden shrink-0">
                    <Image src={notification.avatar} alt="" fill className="object-cover" />
                  </div>
                ) : (
                  <div className={cn("size-12 rounded-full flex items-center justify-center shrink-0", color)}>
                    <Icon className="size-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                      onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id) }}
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    {notification.amount && (
                      <span className="text-xs font-medium text-primary">${notification.amount.toLocaleString()}</span>
                    )}
                    {!notification.read && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
