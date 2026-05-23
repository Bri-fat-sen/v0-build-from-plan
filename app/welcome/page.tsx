"use client"
import { SafeImage as Image } from "@/components/safe-image"
import Link from "next/link"
import { Play, Music, Film, Users, Globe, Radio, Check, ArrowRight, Smartphone, Wifi, CreditCard, Star, ChevronRight, Headphones, Mic, Video, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const stats = [
  { value: "50M+", label: "Monthly Streams" },
  { value: "2M+", label: "Active Users" },
  { value: "54", label: "African Countries" },
  { value: "500+", label: "Languages" },
]

const worlds = [
  { name: "Music", icon: Music, description: "Afrobeats, Amapiano, Highlife & every African genre", color: "from-orange-500 to-red-500" },
  { name: "Movies", icon: Film, description: "Nollywood, African cinema & exclusive premieres", color: "from-purple-500 to-pink-500" },
  { name: "Creators", icon: Video, description: "Podcasts, shorts, comedy & original content", color: "from-blue-500 to-cyan-500" },
  { name: "Culture", icon: BookOpen, description: "Heritage archives, languages & traditions", color: "from-green-500 to-emerald-500" },
  { name: "Live", icon: Radio, description: "Concerts, festivals & virtual events", color: "from-red-500 to-orange-500" },
  { name: "One", icon: Globe, description: "Your unified feed across all worlds", color: "from-primary to-orange-400" },
]

const pricing = [
  { name: "Free", price: "$0", period: "", features: ["Ad-supported streaming", "Standard quality", "Limited skips", "72hr Premium trial"], cta: "Start Free", popular: false },
  { name: "Premium", price: "$4.99", period: "/mo", features: ["Ad-free everything", "HD audio & 1080p video", "Unlimited downloads", "3 devices", "Early releases"], cta: "Go Premium", popular: true },
  { name: "Platinum", price: "$9.99", period: "/mo", features: ["Lossless & spatial audio", "4K video streaming", "6 devices", "Exclusive content", "Virtual meet & greets"], cta: "Go Platinum", popular: false },
]

const testimonials = [
  { name: "Amara K.", location: "Lagos, Nigeria", text: "Finally a platform that understands African music. The Afrobeats playlists are unmatched!", avatar: "https://picsum.photos/seed/ava1/100/100" },
  { name: "Kwame O.", location: "London, UK", text: "Being in the diaspora, AfriStream keeps me connected to home. The Back Home feature is genius.", avatar: "https://picsum.photos/seed/ava2/100/100" },
  { name: "Fatou D.", location: "Dakar, Senegal", text: "As an artist, the royalty transparency is incredible. I know exactly where my streams come from.", avatar: "https://picsum.photos/seed/ava3/100/100" },
]

const artists = [
  { name: "Burna Boy", image: "https://picsum.photos/seed/burna/200/200" },
  { name: "Tyla", image: "https://picsum.photos/seed/tyla/200/200" },
  { name: "Davido", image: "https://picsum.photos/seed/davido/200/200" },
  { name: "Wizkid", image: "https://picsum.photos/seed/wizkid/200/200" },
  { name: "Ayra Starr", image: "https://picsum.photos/seed/ayra/200/200" },
  { name: "Rema", image: "https://picsum.photos/seed/rema/200/200" },
]

export default function WelcomePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/welcome" className="flex items-center gap-2">
            <span className="font-display text-xl font-black tracking-tighter text-foreground">
              Afri<span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">Stream</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#worlds" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Explore</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#creators" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">For Creators</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="glow-orange">Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Now streaming in 54 African countries</span>
            </div>
            <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              The Sound of Africa.{" "}
              <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent">
                One Stream.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Music. Movies. Creators. Culture. Live Events. The platform those global companies would have built if Africa was the first priority from day one.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 text-lg glow-orange">
                  <Play className="mr-2 size-5" /> Start Streaming Free
                </Button>
              </Link>
              <Link href="#worlds">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  Explore Worlds <ChevronRight className="ml-1 size-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Marquee */}
      <section className="border-y border-border/50 bg-card/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">Stream your favorite African artists</p>
          <div className="flex items-center justify-center gap-8 overflow-hidden">
            {artists.map(artist => (
              <div key={artist.name} className="flex flex-shrink-0 flex-col items-center gap-2">
                <div className="relative size-16 overflow-hidden rounded-full ring-2 ring-primary/20 sm:size-20">
                  <Image src={artist.image} alt={artist.name} fill className="object-cover" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{artist.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Worlds Section */}
      <section id="worlds" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Six Worlds. One Platform.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything African entertainment in one place. No switching apps.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {worlds.map(world => (
              <div key={world.name} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80">
                <div className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${world.color}`}>
                  <world.icon className="size-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{world.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{world.description}</p>
                <ArrowRight className="absolute bottom-6 right-6 size-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AfriStream Section */}
      <section className="border-y border-border/50 bg-card/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built for Africa. By Africa.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Not the African version of an existing platform. The platform they would have built if Africa came first.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <Smartphone className="size-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Offline First</h3>
              <p className="mt-2 text-sm text-muted-foreground">Download and stream without constant internet</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <Wifi className="size-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Data Saver</h3>
              <p className="mt-2 text-sm text-muted-foreground">Smart compression for low-bandwidth areas</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <CreditCard className="size-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Mobile Money</h3>
              <p className="mt-2 text-sm text-muted-foreground">M-Pesa, MTN MoMo, Airtel Money & more</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <Globe className="size-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Diaspora Connect</h3>
              <p className="mt-2 text-sm text-muted-foreground">Stay connected to home from anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section id="creators" className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">For Creators</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Fair Pay. Full Transparency.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We use user-centric royalties. Your fans&apos; money goes directly to you - not split with artists they never listen to.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "70/30 revenue split - you keep 70%",
                  "Real-time earnings dashboard",
                  "See exactly which fans support you",
                  "Monthly payouts via mobile money",
                  "Distribution to 150+ global platforms",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/signup?type=artist">
                  <Button size="lg"><Mic className="mr-2 size-4" /> Join as Artist</Button>
                </Link>
                <Link href="/signup?type=creator">
                  <Button size="lg" variant="outline"><Video className="mr-2 size-4" /> Join as Creator</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-orange-500/20 p-8">
                <div className="h-full rounded-2xl border border-border/50 bg-card/80 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">This Month</span>
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">+23%</span>
                  </div>
                  <p className="font-display text-4xl font-bold text-foreground">$12,847</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Streams</span>
                      <span className="font-medium text-foreground">$8,420</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tips</span>
                      <span className="font-medium text-foreground">$2,847</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Merch</span>
                      <span className="font-medium text-foreground">$1,580</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-y border-border/50 bg-card/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Simple, Fair Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free. Upgrade when you&apos;re ready.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-border bg-card p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${billingCycle === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Annual <span className="ml-1 text-xs text-green-400">Save 20%</span>
              </button>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map(plan => (
              <div key={plan.name} className={`relative rounded-2xl border p-6 ${plan.popular ? "border-primary bg-primary/5" : "border-border/50 bg-card"}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {billingCycle === "annual" && plan.price !== "$0" 
                      ? `$${(parseFloat(plan.price.replace("$", "")) * 0.8 * 12).toFixed(0)}`
                      : plan.price}
                  </span>
                  <span className="ml-1 text-muted-foreground">
                    {billingCycle === "annual" && plan.price !== "$0" ? "/year" : plan.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="mt-6 block">
                  <Button className={`w-full ${plan.popular ? "glow-orange" : ""}`} variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
            Loved by Millions
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                </div>
                <p className="mt-4 text-muted-foreground">&quot;{t.text}&quot;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/30 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-5xl">
            Ready to Stream Africa?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join millions discovering the best of African entertainment.
          </p>
          <div className="mt-8">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-10 text-lg glow-orange">
                Start Free Today <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="font-display text-lg font-black tracking-tighter text-foreground">
              Afri<span className="text-primary">Stream</span>
            </span>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">About</Link>
              <Link href="#" className="hover:text-foreground">Careers</Link>
              <Link href="#" className="hover:text-foreground">Press</Link>
              <Link href="#" className="hover:text-foreground">Help</Link>
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
            </nav>
            <p className="text-sm text-muted-foreground">2026 AfriStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
