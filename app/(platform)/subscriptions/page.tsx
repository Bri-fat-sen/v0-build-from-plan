"use client"
import { subscriptionTiers } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Check, Star, Zap, Crown, Music } from "lucide-react"

const tierIcons = [Music, Zap, Star, Crown]

export default function SubscriptionsPage() {
  return (
    <div className="space-y-8 py-4">
      <div className="px-4 text-center lg:px-6">
        <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="mt-2 text-sm text-muted-foreground">Unlock the full power of AfriStream. Cancel anytime.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {subscriptionTiers.map((tier, i) => {
          const Icon = tierIcons[i]
          const isPremium = tier.name === "Premium"
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
              <div className="mb-4 flex items-center gap-2">
                <Icon className={cn("size-5", isPremium ? "text-primary" : "text-muted-foreground")} />
                <h2 className="text-lg font-bold text-foreground">{tier.name}</h2>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">{tier.price}</span>
              </div>
              <ul className="mb-6 flex-1 space-y-3">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className={cn("mt-0.5 size-4 flex-shrink-0", isPremium ? "text-primary" : "text-muted-foreground")} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full rounded-full py-3 text-sm font-bold transition-colors",
                isPremium
                  ? "bg-primary text-primary-foreground glow-orange-sm hover:bg-primary/90"
                  : tier.name === "Free"
                    ? "bg-secondary text-foreground hover:bg-muted"
                    : "border border-border bg-transparent text-foreground hover:bg-secondary"
              )}>
                {tier.name === "Free" ? "Current Plan" : `Get ${tier.name}`}
              </button>
            </div>
          )
        })}
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-2xl px-4 pb-8 lg:px-6">
        <h2 className="mb-4 text-center text-lg font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing period." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, mobile money (M-Pesa, MTN Money, Orange Money), and PayPal." },
            { q: "Is there a family plan?", a: "Family plans are coming soon. Stay tuned for updates." },
            { q: "Can I download for offline listening?", a: "Yes, Premium and Platinum subscribers can download music and movies for offline access." },
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
