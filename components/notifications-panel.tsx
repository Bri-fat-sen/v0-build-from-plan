"use client"

import { Bell, X, Check, Trash2, Album, Radio, User, Sparkles, Trophy } from "lucide-react"
import { useNotifications, getNotificationColor } from "@/hooks/use-notifications"
import { timeAgo } from "@/lib/storage"
import { SafeImage } from "@/components/safe-image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const notificationIcons: Record<string, React.ReactNode> = {
  new_release: <Album className="size-4" />,
  live_event: <Radio className="size-4" />,
  followed_activity: <User className="size-4" />,
  recommendation: <Sparkles className="size-4" />,
  achievement: <Trophy className="size-4" />,
  system: <Bell className="size-4" />,
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } =
    useNotifications()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden border-l border-white/10 bg-[#0a0a0a] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/10 hover:text-foreground"
              >
                <Check className="size-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100%-130px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="mb-4 size-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative px-4 py-4 transition-colors hover:bg-white/5",
                    !notification.read && "bg-white/[0.02]"
                  )}
                >
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute left-1.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" />
                  )}

                  <div className="flex gap-3">
                    {/* Icon/Image */}
                    {notification.image ? (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <SafeImage
                          src={notification.image}
                          alt=""
                          fill
                          className="object-cover"
                          fallbackType="generic"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/10",
                          getNotificationColor(notification.type)
                        )}
                      >
                        {notificationIcons[notification.type]}
                      </div>
                    )}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {notification.link ? (
                        <Link
                          href={notification.link}
                          onClick={() => {
                            markAsRead(notification.id)
                            onClose()
                          }}
                          className="block"
                        >
                          <p className="text-sm font-medium text-foreground">{notification.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                        </Link>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-foreground">{notification.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                        </>
                      )}
                      <p className="mt-1.5 text-xs text-muted-foreground/70">
                        {timeAgo(notification.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-start gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="rounded p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                          title="Mark as read"
                        >
                          <Check className="size-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="rounded p-1.5 text-muted-foreground hover:bg-white/10 hover:text-red-500"
                        title="Remove"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#0a0a0a] p-4">
            <button
              onClick={clearAll}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-500"
            >
              <Trash2 className="size-4" />
              Clear all notifications
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Bell button with badge
export function NotificationBell() {
  const { unreadCount } = useNotifications()

  return (
    <div className="relative">
      <Bell className="size-5" />
      {unreadCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </div>
  )
}
