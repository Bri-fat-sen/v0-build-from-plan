"use client"
import { useState } from "react"
import { subscriptionTiers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Check, Star, Zap, Crown, Music, Users, Briefcase, Smartphone, CreditCard, Globe, ChevronDown, Shield, Sparkles } from "lucide-react"

const tierIcons = [Music, Zap, Star, Crown, Users, Briefcase]
const tierColors = ["text-muted-foreground", "text-blue-400", "text-primary", "text-yellow-400", "text-green-400", "text-purple-400"]

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

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [showLocalPricing, setShowLocalPricing] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("mpesa")
  const [expandedTier, setExpandedTier] = useState<string | null>(null)

  // Filter to show only main 4 tiers in grid, show Family and Creator Pro separately
  const mainTiers = subscriptionTiers.slice(0, 4)
  const additionalTiers = subscriptionTiers.slice(4)

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="px-4 text-center lg:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="mt-2 text-sm text-muted-foreground">Unlock the full power of AfriStream. Cancel anytime.</p>
        
        {/* Billing Toggle */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={cn("rounded-full px-4 py-2 text-sm font-medium transition-colors", billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingCycle("annual")}
            className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors", billingCycle === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
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

      {/* Main Subscription Tiers */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {mainTiers.map((tier, i) => {
          const Icon = tierIcons[i]
          const isPremium = tier.name === "Premium"
          const price = showLocalPricing ? tier.priceLocal : tier.price
          const annualPrice = tier.name === "Free" ? "$0" : `$${(parseFloat(tier.price.replace(/[^0-9.]/g, "")) * 0.8 * 12).toFixed(0)}/yr`
          
          return (
            <div key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all",
                isPremium
                  ? "border-primary bg-primary/5 glow-orange-sm"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}>
              {isPremium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </div>
              )}
              {tier.name === "Platinum" && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold text-black">
                  Best Value
                </div>
              )}
              
              <div className="mb-4 flex items-center gap-2">
                <Icon className={cn("size-5", tierColors[i])} />
                <h2 className="font-display text-lg font-bold text-foreground">{tier.name}</h2>
              </div>
              
              <div className="mb-1">
                <span className="font-mono text-3xl font-bold tabular-nums text-foreground">
                  {billingCycle === "annual" && tier.name !== "Free" ? annualPrice : price}
                </span>
              </div>
              {billingCycle === "annual" && tier.name !== "Free" && (
                <p className="mb-4 text-xs text-green-400">Save 20% with annual billing</p>
              )}
              {tier.name === "Free" && <p className="mb-4 text-xs text-muted-foreground">No credit card required</p>}
              
              <ul className="mb-6 flex-1 space-y-2.5">
                {tier.features.slice(0, expandedTier === tier.name ? undefined : 5).map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className={cn("mt-0.5 size-4 flex-shrink-0", isPremium ? "text-primary" : tierColors[i])} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {tier.features.length > 5 && (
                <button 
                  onClick={() => setExpandedTier(expandedTier === tier.name ? null : tier.name)}
                  className="mb-4 flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  {expandedTier === tier.name ? "Show less" : `+${tier.features.length - 5} more features`}
                  <ChevronDown className={cn("size-3 transition-transform", expandedTier === tier.name && "rotate-180")} />
                </button>
              )}
              
              <button className={cn(
                "w-full rounded-full py-3 text-sm font-bold transition-colors",
                isPremium
                  ? "bg-primary text-primary-foreground glow-orange-sm hover:bg-primary/90"
                  : tier.name === "Free"
                    ? "bg-secondary text-foreground hover:bg-muted"
                    : tier.name === "Platinum"
                      ? "border-2 border-yellow-500 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                      : "border border-border bg-transparent text-foreground hover:bg-secondary"
              )}>
                {tier.cta}
              </button>
            </div>
          )
        })}
      </div>

      {/* Additional Plans (Family & Creator Pro) */}
      <div className="px-4 lg:px-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Special Plans</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {additionalTiers.map((tier, idx) => {
            const i = idx + 4
            const Icon = tierIcons[i]
            return (
              <div key={tier.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <div className={cn("flex size-12 items-center justify-center rounded-xl", tier.name === "Family" ? "bg-green-500/15" : "bg-purple-500/15")}>
                  <Icon className={cn("size-6", tierColors[i])} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{tier.name}</h3>
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">{tier.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.features[0]}</p>
                </div>
                <button className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">
                  {tier.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Money & Payment Methods */}
      <div className="px-4 lg:px-6">
        <div className="rounded-2xl border border-border bg-card p-6">
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
        </div>
      </div>

      {/* Telco Bundles */}
      <div className="px-4 lg:px-6">
        <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-green-400" />
            <h2 className="font-display text-lg font-semibold text-foreground">Carrier Bundles</h2>
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Exclusive Deals</span>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">Pay through your mobile carrier and get bonus data or discounts</p>
          
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
        </div>
      </div>

      {/* Trust Signals */}
      <div className="px-4 lg:px-6">
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
            <Smartphone className="size-4 text-green-400" />
            <span>Mobile money accepted</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="size-4 text-green-400" />
            <span>Works in 50+ countries</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-2xl px-4 pb-8 lg:px-6">
        <h2 className="mb-4 text-center font-display text-lg font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period." },
            { q: "How does mobile money payment work?", a: "Select your mobile money provider, enter your phone number, and approve the payment on your phone. It is instant and secure." },
            { q: "What is the difference between Premium and Platinum?", a: "Platinum includes lossless audio, 4K video, 6 devices, exclusive content, virtual meet & greets, and $5 monthly tip credits for creators." },
            { q: "Can I pay with airtime?", a: "Yes, in select countries you can pay using airtime through our carrier billing partners (MTN, Safaricom, Vodacom, Airtel)." },
            { q: "Is there a student discount?", a: "Yes, students get 50% off Premium. Verify your student status with your university email to unlock the discount." },
            { q: "What is the Creator Pro plan?", a: "Creator Pro is for artists, filmmakers, and content creators who want priority distribution, advanced analytics, and promotional tools." },
          ].map(faq => (
            <div key={faq.q} className="rounded-xl bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{faq.q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
