import { PlayerProvider } from "@/lib/player-context"
import { AppShell } from "@/components/app-shell"

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <AppShell>{children}</AppShell>
    </PlayerProvider>
  )
}
