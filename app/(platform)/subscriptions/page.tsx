"use client"

import { useState } from "react"
import { subscriptionTiers } from "@/lib/mock-data"
import { useUser } from "@/lib/user-context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { 
  Check, Star, Zap, Crown, Music, Users, Film, Smartphone, CreditCard, 
  Globe, ChevronDown, Shield, Sparkles, Heart, ArrowRight, Video, Play
} from "lucide-react"

const paymentMethods = [
  { id: "mpesa", name: "M-Pesa", icon: Smartphone, region: "Kenya, Tanzania", popular: true },
  { id: "mtn", name: "MTN MoMo", icon: Smartphone, region: "Ghana, Uganda, Nigeria", popular: true },
  { id: "airtel", name: "Airtel Money", icon: Smartphone, region: "East & Central Africa", popular: false },
  { id: "orange", name: "Orange Money", icon: Smartphone, region: "West & Central Africa", popular: false },
  { id: "card", name: "Card", icon: CreditCard, region: "Worldwide", popular: false },
  { id: "paypal", name: "PayPal", icon: Globe, region: "Worldwide", popular: false },
]

const telcoBundles = [
  { carrier: "MTN", country: "Nigeria", bundle: "AfriStream + 2GB Data", price: "₦1,500/mo", savings: "Save 30%" },
  { carrier: "Safaricom", country: "Kenya", bundle: "AfriStream Premium", price: "KES 500/mo", savings: "Pay via M-Pesa" },
  { carrier: "Vodacom", country: "South Africa", bundle: "AfriStream + Airtime", price: "R79/mo", savings: "Bundle deal" },
  { carrier: "Airtel", country: "Uganda", bundle: "AfriStream Basic", price: "UGX 7,500/mo", savings: "Mobile billing" },
]

// Content-based tier groupings
const contentTiers = [
  { id: "music", icon: Music, color: "text-primary", bgColor: "bg-primary/20", label: "Music Only" },
  { id: "video", icon: Video, color: "text-purple-500", bgColor: "bg-purple-500/20", label: "Video Only" },
  { id: "movies", icon: Film, color: "text-pink-500", bgColor: "bg-pink-500/20", label: "Movies Only" },
  { id: "premium", icon: Star, color: "text-yellow-400", bgColor: "bg-yellow-500/20", label: "All Content" },
  { id: "platinum", icon: Crown, color: "text-yellow-400", bgColor: "bg-yellow-500/20", label: "Everything + Exclusive" },
]

export default function SubscriptionsPage() {
  const { user, subscription } = useUser()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [showLocalPricing, setShowLocalPricing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("mpesa")
  const [expandedTier, setExpandedTier] = useState<string | null>(null)

  // Group tiers by category
  const singleContentTiers = subscriptionTiers.filter(t => ["music", "video", "movies"].includes(t.id))
  const bundleTiers = subscriptionTiers.filter(t => ["premium", "platinum"].includes(t.id))
  const specialTiers = subscriptionTiers.filter(t => ["family", "creator_pro"].includes(t.id))

  const getTierIcon = (id: string) => {
    const tier = contentTiers.find(t => t.id === id)
    return tier?.icon || Star
  }

  const getTierColor = (id: string) => {
    const tier = contentTiers.find(t => t.id === id)
    return tier?.color || "text-primary"
  }

  return (
    <div className="min-h-screen space-y-10 pb-32">
      {/* Hero Header with User-Centric Messaging */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/20 via-primary/5 to-transparent px-4 pb-10 pt-8 lg:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-400">
            <Heart className="size-4 fill-green-400" />
            70% Goes Directly to Creators
          </div>
          
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Your Money. Their Music.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Unlike other platforms, your subscription goes directly to the artists you listen to, creators you watch, and filmmakers you support. Not a pooled pot. Real, direct support.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={cn("rounded-full px-5 py-2.5 text-sm font-medium transition-colors", billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("annual")}
              className={cn("flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors", billingCycle === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Annual <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">Save 20%</span>
            </button>
          </div>

          {/* Currency Toggle */}
          <button 
            onClick={() => setShowLocalPricing(!showLocalPricing)}
            className="mt-3 flex items-center gap-1 mx-auto text-xs text-muted-foreground hover:text-foreground"
          >
            <Globe className="size-3" />
            {showLocalPricing ? "Show USD pricing" : "Show local pricing (KES)"}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-6">
        {/* User-Centric Explanation */}
        <section className="glass-card overflow-hidden rounded-2xl p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground">How It Works</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                With user-centric royalties, if you only listen to 5 artists this month, those 5 artists get 100% of your creator share. Your $7.99 doesn&apos;t fund artists you&apos;ve never heard of.
              </p>
            </div>
            <Link 
              href="/impact" 
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See Your Impact <ArrowRight className="size-4" />
            </Link>
          </div>
          
          {/* Visual Flow */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-card/50 p-4 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
                <span className="font-display text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">You Subscribe</h3>
              <p className="mt-1 text-xs text-muted-foreground">Choose your content: Music, Video, Movies, or All</p>
            </div>
            <div className="rounded-xl bg-card/50 p-4 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/20">
                <span className="font-display text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">You Enjoy</h3>
              <p className="mt-1 text-xs text-muted-foreground">Stream what you love. We track YOUR consumption.</p>
            </div>
            <div className="rounded-xl bg-card/50 p-4 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-500/20">
                <span className="font-display text-lg font-bold text-green-500">3</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">Creators Get Paid</h3>
              <p className="mt-1 text-xs text-muted-foreground">70% goes to the creators YOU support</p>
            </div>
          </div>
        </section>

        {/* Single Content Tiers */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-foreground">Choose Your Content</h2>
            <span className="text-xs text-muted-foreground">(Pick one or bundle)</span>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-3">
            {singleContentTiers.map((tier) => {
              const Icon = getTierIcon(tier.id)
              const colorClass = getTierColor(tier.id)
              const price = showLocalPricing ? tier.priceLocal : tier.price
              const annualPrice = billingCycle === "annual" ? tier.priceAnnual : price
              
              return (
                <div key={tier.id} className="glass-card flex flex-col rounded-2xl p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn("flex size-12 items-center justify-center rounded-xl", 
                      tier.id === "music" ? "bg-primary/20" : 
                      tier.id === "video" ? "bg-purple-500/20" : "bg-pink-500/20"
                    )}>
                      <Icon className={cn("size-6", colorClass)} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {tier.id === "music" ? "Artists you stream" :
                         tier.id === "video" ? "Creators you watch" : "Filmmakers you support"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="font-mono text-3xl font-bold tabular-nums text-foreground">{annualPrice}</span>
                    {billingCycle === "annual" && (
                      <p className="text-xs text-green-400">Save 20%</p>
                    )}
                  </div>
                  
                  {/* Royalty Split Indicator */}
                  <div className="mb-4 rounded-lg bg-green-500/10 p-3">
                    <p className="text-xs text-green-400">
                      <span className="font-bold">{tier.royaltySplit.creators}%</span> of your sub goes to creators you {tier.id === "music" ? "listen to" : "watch"}
                    </p>
                  </div>
                  
                  <ul className="mb-6 flex-1 space-y-2">
                    {tier.features.slice(0, 5).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className={cn("mt-0.5 size-4 flex-shrink-0", colorClass)} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={cn(
                    "w-full rounded-full py-3 text-sm font-bold transition-colors",
                    "border border-border bg-transparent text-foreground hover:bg-secondary"
                  )}>
                    {tier.cta}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Bundle Tiers */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-foreground">Bundle & Save</h2>
            <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400">Best Value</span>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {bundleTiers.map((tier) => {
              const isPremium = tier.id === "premium"
              const price = showLocalPricing ? tier.priceLocal : tier.price
              const annualPrice = billingCycle === "annual" ? tier.priceAnnual : price
              
              return (
                <div key={tier.id} className={cn(
                  "relative flex flex-col rounded-2xl border p-6",
                  isPremium ? "border-primary bg-primary/5 glow-orange-sm" : "border-yellow-500/50 bg-yellow-500/5"
                )}>
                  {isPremium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  {!isPremium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold text-black">
                      Best Value
                    </div>
                  )}
                  
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn("flex size-12 items-center justify-center rounded-xl", 
                      isPremium ? "bg-primary/20" : "bg-yellow-500/20"
                    )}>
                      {isPremium ? <Star className="size-6 text-primary" /> : <Crown className="size-6 text-yellow-400" />}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {isPremium ? "Music + Video + Movies" : "Everything + Exclusive Content"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="font-mono text-4xl font-bold tabular-nums text-foreground">{annualPrice}</span>
                    {billingCycle === "annual" && <p className="text-xs text-green-400">Save 20%</p>}
                  </div>
                  
                  {/* Royalty Split */}
                  <div className={cn("mb-4 rounded-lg p-3", isPremium ? "bg-green-500/10" : "bg-green-500/15")}>
                    <p className="text-sm text-green-400">
                      <span className="font-bold">{tier.royaltySplit.creators}%</span> of your subscription goes directly to creators
                    </p>
                  </div>
                  
                  {/* Content Icons */}
                  <div className="mb-4 flex gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1">
                      <Music className="size-3.5 text-primary" />
                      <span className="text-xs text-primary">Music</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1">
                      <Video className="size-3.5 text-purple-500" />
                      <span className="text-xs text-purple-500">Video</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-pink-500/20 px-3 py-1">
                      <Film className="size-3.5 text-pink-500" />
                      <span className="text-xs text-pink-500">Movies</span>
                    </div>
                    {!isPremium && (
                      <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-3 py-1">
                        <Play className="size-3.5 text-yellow-400" />
                        <span className="text-xs text-yellow-400">Live</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="mb-6 flex-1 space-y-2">
                    {tier.features.slice(0, expandedTier === tier.id ? undefined : 6).map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className={cn("mt-0.5 size-4 flex-shrink-0", isPremium ? "text-primary" : "text-yellow-400")} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {tier.features.length > 6 && (
                    <button 
                      onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
                      className="mb-4 flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      {expandedTier === tier.id ? "Show less" : `+${tier.features.length - 6} more`}
                      <ChevronDown className={cn("size-3 transition-transform", expandedTier === tier.id && "rotate-180")} />
                    </button>
                  )}
                  
                  <button className={cn(
                    "w-full rounded-full py-3.5 text-sm font-bold transition-colors",
                    isPremium 
                      ? "bg-primary text-primary-foreground glow-orange-sm hover:bg-primary/90"
                      : "bg-yellow-500 text-black hover:bg-yellow-400"
                  )}>
                    {tier.cta}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Special Plans */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Special Plans</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {specialTiers.map((tier) => {
              const isFamily = tier.id === "family"
              const price = showLocalPricing ? tier.priceLocal : tier.price
              
              return (
                <div key={tier.id} className="glass-card flex items-center gap-4 rounded-xl p-5">
                  <div className={cn("flex size-14 items-center justify-center rounded-xl", 
                    isFamily ? "bg-green-500/20" : "bg-purple-500/20"
                  )}>
                    {isFamily ? <Users className="size-7 text-green-500" /> : <Sparkles className="size-7 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-foreground">{tier.name}</h3>
                      <span className="font-mono text-sm tabular-nums text-muted-foreground">{price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isFamily ? "Up to 6 family members with individual profiles" : "For artists & creators - Full studio access + distribution"}
                    </p>
                    <p className="mt-1 text-xs text-green-400">{tier.royaltySplit.creators}% to creators</p>
                  </div>
                  <button className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                    isFamily ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                  )}>
                    {tier.cta}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="glass-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Smartphone className="size-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Pay Your Way</h2>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">We support mobile money, cards, and carrier billing across Africa</p>
          
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  selectedPayment === method.id 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <div className={cn("flex size-10 items-center justify-center rounded-lg", selectedPayment === method.id ? "bg-primary/20" : "bg-muted")}>
                  <method.icon className={cn("size-5", selectedPayment === method.id ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{method.name}</p>
                    {method.popular && <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">Popular</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{method.region}</p>
                </div>
                {selectedPayment === method.id && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </section>

        {/* Telco Bundles */}
        <section className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-green-400" />
            <h2 className="font-display text-lg font-semibold text-foreground">Carrier Bundles</h2>
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Exclusive</span>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {telcoBundles.map(bundle => (
              <div key={bundle.carrier + bundle.country} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{bundle.carrier}</span>
                  <span className="text-xs text-muted-foreground">{bundle.country}</span>
                </div>
                <p className="text-xs text-muted-foreground">{bundle.bundle}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{bundle.price}</span>
                  <span className="text-xs text-green-400">{bundle.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-muted/30 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="size-4 text-green-400" />
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-green-400" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="size-4 text-green-400" />
            <span>70% to creators</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="size-4 text-green-400" />
            <span>50+ countries</span>
          </div>
        </div>
      </div>
    </div>
  )
}
