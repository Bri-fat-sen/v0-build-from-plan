"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Database, Check, X, Loader2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SetupDatabasePage() {
  const [copied, setCopied] = useState(false)
  
  const sqlSchema = `-- AfriStream Database Schema
-- Copy this entire SQL and run it in Supabase SQL Editor

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'family', 'student')),
  mode TEXT DEFAULT 'listener' CHECK (mode IN ('listener', 'artist', 'creator', 'filmmaker', 'educator')),
  is_verified BOOLEAN DEFAULT FALSE,
  total_listening_minutes INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. ARTISTS
CREATE TABLE IF NOT EXISTS public.artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  image TEXT,
  cover_image TEXT,
  bio TEXT,
  country TEXT,
  genres TEXT[] DEFAULT '{}',
  monthly_listeners INTEGER DEFAULT 0,
  total_streams INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "artists_select_all" ON public.artists FOR SELECT USING (true);

-- 3. ALBUMS
CREATE TABLE IF NOT EXISTS public.albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT,
  cover TEXT,
  release_date DATE,
  album_type TEXT DEFAULT 'album',
  genres TEXT[] DEFAULT '{}',
  total_tracks INTEGER DEFAULT 0,
  duration_ms INTEGER DEFAULT 0,
  total_streams INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "albums_select_all" ON public.albums FOR SELECT USING (true);

-- 4. TRACKS
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT,
  cover TEXT,
  audio_url TEXT,
  preview_url TEXT,
  duration_ms INTEGER DEFAULT 0,
  track_number INTEGER,
  genres TEXT[] DEFAULT '{}',
  explicit BOOLEAN DEFAULT FALSE,
  lyrics TEXT,
  total_streams INTEGER DEFAULT 0,
  release_date DATE,
  is_playable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tracks_select_all" ON public.tracks FOR SELECT USING (true);

-- 5. MOVIES
CREATE TABLE IF NOT EXISTS public.movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT,
  poster TEXT,
  backdrop TEXT,
  trailer_url TEXT,
  video_url TEXT,
  description TEXT,
  release_year INTEGER,
  duration_minutes INTEGER,
  genres TEXT[] DEFAULT '{}',
  country TEXT,
  language TEXT,
  total_views INTEGER DEFAULT 0,
  content_type TEXT DEFAULT 'movie',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "movies_select_all" ON public.movies FOR SELECT USING (true);

-- 6. PLAYLISTS
CREATE TABLE IF NOT EXISTS public.playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  cover TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  total_tracks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "playlists_select" ON public.playlists FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "playlists_insert" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "playlists_update" ON public.playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "playlists_delete" ON public.playlists FOR DELETE USING (auth.uid() = user_id);

-- 7. LIKES
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "likes_select" ON public.likes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "likes_insert" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_delete" ON public.likes FOR DELETE USING (auth.uid() = user_id);

-- 8. FOLLOWS
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_type TEXT NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_type, following_id)
);
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "follows_select" ON public.follows FOR SELECT USING (auth.uid() = follower_id);
CREATE POLICY "follows_insert" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "follows_delete" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- 9. PLAY HISTORY
CREATE TABLE IF NOT EXISTS public.play_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  played_at TIMESTAMPTZ DEFAULT NOW(),
  duration_played_ms INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_play_history_user ON public.play_history(user_id, played_at DESC);
ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "play_history_select" ON public.play_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "play_history_insert" ON public.play_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  image TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, created_at DESC);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- 11. AUTO-CREATE PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL)
  ) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Done! Your AfriStream database is ready.`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sqlSchema)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <ArrowLeft className="size-4" />
          Back to app
        </Link>

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-2">
            <Database className="size-5 text-primary" />
            <span className="text-sm font-medium text-primary">Database Setup</span>
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight">
            Setup Your <span className="text-primary">Database</span>
          </h1>
          <p className="text-lg text-white/60">
            Follow these steps to initialize your Supabase database with the AfriStream schema.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-black">1</div>
              <h2 className="text-xl font-bold">Open Supabase SQL Editor</h2>
            </div>
            <p className="mb-4 text-white/60">
              Go to your Supabase project dashboard and navigate to the SQL Editor.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                Open Supabase Dashboard
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-black">2</div>
              <h2 className="text-xl font-bold">Copy the Schema SQL</h2>
            </div>
            <p className="mb-4 text-white/60">
              Click the button below to copy the complete database schema to your clipboard.
            </p>
            <Button onClick={copyToClipboard} className="gap-2">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied!" : "Copy Schema SQL"}
            </Button>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-black">3</div>
              <h2 className="text-xl font-bold">Run the SQL</h2>
            </div>
            <p className="mb-4 text-white/60">
              Paste the SQL into the Supabase SQL Editor and click &quot;Run&quot;. This will create all tables, policies, and triggers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-black">
                <Check className="size-4" />
              </div>
              <h2 className="text-xl font-bold">Done!</h2>
            </div>
            <p className="text-white/60">
              Your database is now ready. The app will automatically use it for authentication, content, playlists, likes, follows, and more.
            </p>
          </div>
        </div>

        {/* SQL Preview */}
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-bold">Schema Preview</h3>
          <div className="max-h-96 overflow-auto rounded-xl border border-white/10 bg-black/50 p-4">
            <pre className="text-xs text-white/70">
              <code>{sqlSchema}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
