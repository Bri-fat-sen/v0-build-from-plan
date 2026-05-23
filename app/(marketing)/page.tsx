import Link from "next/link"
import { Play, Music, Film, Video, Users, Globe, Zap, Star, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808]">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-baseline gap-0 select-none">
            <span className="font-display text-2xl font-black tracking-tighter text-white">Afri</span>
            <span className="font-display text-2xl font-black tracking-tighter text-primary">Stream</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-white/60 transition-colors hover:text-white">Features</Link>
            <Link href="#creators" className="text-sm text-white/60 transition-colors hover:text-white">For Creators</Link>
            <Link href="#pricing" className="text-sm text-white/60 transition-colors hover:text-white">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white/80 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[150px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm">
            <Star className="size-4 text-primary" fill="currentColor" />
            <span>The #1 African streaming platform</span>
          </div>

          <h1 className="font-display text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block">The Sound of</span>
            <span className="text-primary">Africa</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl">
            Stream unlimited African music, movies, and exclusive content. 
            Connect with your roots, discover new artists, and experience the best of African entertainment.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 gap-3 rounded-full px-8 text-lg glow-primary">
                <Play className="size-5" fill="currentColor" /> Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-lg text-white hover:bg-white/10">
                Learn More <ChevronRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/40">No credit card required. Cancel anytime.</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 lg:px-8">
          {[
            { value: "50M+", label: "Active Users" },
            { value: "10M+", label: "Songs" },
            { value: "100K+", label: "Artists" },
            { value: "54", label: "African Countries" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-4xl font-bold text-white lg:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Everything African Entertainment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              From Afrobeats to Nollywood, from Lagos to Nairobi, experience the full spectrum of African creativity.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Music, title: "Music Streaming", description: "Millions of African songs, from Afrobeats to Highlife, Amapiano to Afropop.", color: "from-primary to-orange-600" },
              { icon: Film, title: "Movies & Series", description: "Nollywood blockbusters, South African dramas, and exclusive African cinema.", color: "from-purple-500 to-pink-500" },
              { icon: Video, title: "Short Videos", description: "Discover viral content, music videos, and trending clips from African creators.", color: "from-cyan-500 to-blue-500" },
              { icon: Zap, title: "Live Events", description: "Stream concerts, premieres, and exclusive live performances from top artists.", color: "from-red-500 to-rose-500" },
              { icon: Users, title: "Creator Tools", description: "Upload, monetize, and grow your audience with our powerful creator suite.", color: "from-green-500 to-emerald-500" },
              { icon: Globe, title: "Diaspora Connect", description: "Stay connected to your roots wherever you are in the world.", color: "from-amber-500 to-orange-500" },
            ].map(feature => (
              <div key={feature.title} className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]">
                <div className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}>
                  <feature.icon className="size-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Creators ── */}
      <section id="creators" className="border-y border-white/5 bg-gradient-to-b from-primary/5 via-transparent to-transparent py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">For Creators</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                Share Your Art With Africa and Beyond
              </h2>
              <p className="mt-4 text-lg text-white/60">
                Whether you're a musician, filmmaker, or content creator, AfriStream gives you the tools to reach millions of fans across Africa and the diaspora.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Upload unlimited content with no fees",
                  "Keep up to 80% of your streaming revenue",
                  "Access detailed analytics and fan insights",
                  "Go live and connect with fans in real-time",
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
                      <div className="size-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/sign-up?mode=creator">
                  <Button size="lg" className="gap-2 rounded-full">
                    Start Creating <ArrowRight className="size-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
                <div className="flex h-full flex-col items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="font-mono text-6xl font-bold text-primary">$2.4M+</p>
                    <p className="mt-2 text-white/60">Paid to creators in 2024</p>
                  </div>
                  <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="text-center">
                    <p className="font-mono text-4xl font-bold text-white">100K+</p>
                    <p className="mt-2 text-white/60">Active creators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Pricing</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["Ad-supported streaming", "Limited skips", "Standard audio quality", "Mobile only"], cta: "Get Started", popular: false },
              { name: "Premium", price: "$4.99", period: "/month", features: ["Ad-free experience", "Unlimited skips", "Hi-Fi audio quality", "Offline downloads", "All devices"], cta: "Start Free Trial", popular: true },
              { name: "Family", price: "$7.99", period: "/month", features: ["Everything in Premium", "Up to 6 accounts", "Parental controls", "Family Mix playlists", "Priority support"], cta: "Start Free Trial", popular: false },
            ].map(plan => (
              <div key={plan.name} className={`relative rounded-2xl border p-6 ${plan.popular ? "border-primary bg-primary/5" : "border-white/10 bg-white/[0.02]"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="size-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up" className="mt-6 block">
                  <Button className={`w-full rounded-full ${plan.popular ? "" : "bg-white/10 hover:bg-white/20"}`} variant={plan.popular ? "default" : "ghost"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ready to Experience Africa?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Join millions of users streaming the best African entertainment. Start your free trial today.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg" className="h-14 gap-3 rounded-full px-10 text-lg glow-primary">
                <Play className="size-5" fill="currentColor" /> Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-baseline gap-0 select-none">
              <span className="font-display text-2xl font-black tracking-tighter text-white">Afri</span>
              <span className="font-display text-2xl font-black tracking-tighter text-primary">Stream</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/support" className="hover:text-white">Support</Link>
            </div>
            <p className="text-sm text-white/30">2024 AfriStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
