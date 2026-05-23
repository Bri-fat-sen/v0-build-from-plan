"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { storage, STORAGE_KEYS, type Notification, generateId } from "@/lib/storage"

// ─── Notifications Context ────────────────────────────────────────────────────

interface NotificationsContextValue {
  notifications: Notification[]
  unreadCount: number
  isLoaded: boolean
  
  // Actions
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => Promise<Notification>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  removeNotification: (id: string) => Promise<void>
  clearAll: () => Promise<void>
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

// ─── Notifications Provider ───────────────────────────────────────────────────

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load notifications on mount
  useEffect(() => {
    storage.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS).then((data) => {
      if (data) {
        setNotifications(data)
      } else {
        // Add some initial notifications for demo
        const initial = getInitialNotifications()
        setNotifications(initial)
        storage.set(STORAGE_KEYS.NOTIFICATIONS, initial)
      }
      setIsLoaded(true)
    })
  }, [])

  // Unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Add notification
  const addNotification = useCallback(
    async (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
      const newNotification: Notification = {
        ...notification,
        id: generateId(),
        read: false,
        createdAt: new Date().toISOString(),
      }

      const updated = [newNotification, ...notifications].slice(0, 100) // Keep max 100
      setNotifications(updated)
      await storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)

      return newNotification
    },
    [notifications]
  )

  // Mark as read
  const markAsRead = useCallback(
    async (id: string) => {
      const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      setNotifications(updated)
      await storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)
    },
    [notifications]
  )

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const updated = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updated)
    await storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)
  }, [notifications])

  // Remove notification
  const removeNotification = useCallback(
    async (id: string) => {
      const updated = notifications.filter((n) => n.id !== id)
      setNotifications(updated)
      await storage.set(STORAGE_KEYS.NOTIFICATIONS, updated)
    },
    [notifications]
  )

  // Clear all
  const clearAll = useCallback(async () => {
    setNotifications([])
    await storage.remove(STORAGE_KEYS.NOTIFICATIONS)
  }, [])

  const value: NotificationsContextValue = {
    notifications,
    unreadCount,
    isLoaded,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

// ─── Initial Notifications (Demo) ─────────────────────────────────────────────

function getInitialNotifications(): Notification[] {
  const now = Date.now()
  
  return [
    {
      id: "notif-1",
      type: "new_release",
      title: "New Album Drop",
      message: "Burna Boy just released 'African Giant II'. Listen now!",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      link: "/music/album/album-1",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
    {
      id: "notif-2",
      type: "live_event",
      title: "Live Now",
      message: "Wizkid is performing live from Lagos. Join 50K+ viewers!",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&h=100&fit=crop",
      link: "/live",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      id: "notif-3",
      type: "followed_activity",
      title: "New from Tems",
      message: "Tems uploaded a new track 'Essence Remix'",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=100&h=100&fit=crop",
      link: "/music",
      read: false,
      createdAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    {
      id: "notif-4",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "You've listened to 100 tracks this month! Keep streaming!",
      read: true,
      createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: "notif-5",
      type: "recommendation",
      title: "Made for You",
      message: "Your Daily Mix is ready. 25 tracks based on your taste.",
      link: "/music",
      read: true,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
    {
      id: "notif-6",
      type: "system",
      title: "Welcome to AfriStream",
      message: "Thanks for joining! Explore African music, movies, and more.",
      read: true,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    },
  ]
}

// ─── Notification Helpers ─────────────────────────────────────────────────────

export function getNotificationIcon(type: Notification["type"]): string {
  switch (type) {
    case "new_release":
      return "album"
    case "live_event":
      return "radio"
    case "followed_activity":
      return "user"
    case "recommendation":
      return "sparkles"
    case "achievement":
      return "trophy"
    case "system":
    default:
      return "bell"
  }
}

export function getNotificationColor(type: Notification["type"]): string {
  switch (type) {
    case "new_release":
      return "text-primary"
    case "live_event":
      return "text-red-500"
    case "followed_activity":
      return "text-blue-500"
    case "recommendation":
      return "text-purple-500"
    case "achievement":
      return "text-yellow-500"
    case "system":
    default:
      return "text-muted-foreground"
  }
}
