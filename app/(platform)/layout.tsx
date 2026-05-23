import { PlayerProvider } from "@/lib/player-context"
import { AppShell } from "@/components/app-shell"
import { LibraryProvider } from "@/hooks/use-library"
import { NotificationsProvider } from "@/hooks/use-notifications"

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
      <LibraryProvider>
        <PlayerProvider>
          <AppShell>{children}</AppShell>
        </PlayerProvider>
      </LibraryProvider>
    </NotificationsProvider>
  )
}
