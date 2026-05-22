import type { Metadata, Viewport } from 'next'
import { Rubik, Unbounded, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const _rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})

const _unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
})

const _ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'AfriStream — Music. Movies. Creators. Culture. One Stream.',
  description:
    "Africa's premier entertainment streaming platform. Music, movies, creators, culture, live events — all in one stream. By Africa. For the world.",
  generator: 'AfriStream',
  keywords: ['African music', 'African movies', 'Afrobeats', 'Nollywood', 'streaming'],
}

export const viewport: Viewport = {
  themeColor: '#141111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${_rubik.variable} ${_unbounded.variable} ${_ibmPlexMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
