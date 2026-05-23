"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Gift, Coins, Flame, Heart, Star, Zap, Crown, Sparkles, Send, X, Plus, Minus, History, Info } from "lucide-react"
import { SafeImage as Image } from "@/components/safe-image"

// Virtual gift types with increasing value
const giftTypes = [
  { id: "clap", name: "Clap", icon: "👏", coins: 10, color: "bg-blue-500/20 text-blue-400" },
  { id: "fire", name: "Fire", icon: "🔥", coins: 50, color: "bg-orange-500/20 text-orange-400" },
  { id: "heart", name: "Heart", icon: "❤️", coins: 100, color: "bg-pink-500/20 text-pink-400" },
  { id: "star", name: "Star", icon: "⭐", coins: 250, color: "bg-yellow-500/20 text-yellow-400" },
  { id: "diamond", name: "Diamond", icon: "💎", coins: 500, color: "bg-cyan-500/20 text-cyan-400" },
  { id: "crown", name: "Crown", icon: "👑", coins: 1000, color: "bg-purple-500/20 text-purple-400" },
  { id: "rocket", name: "Rocket", icon: "🚀", coins: 2500, color: "bg-red-500/20 text-red-400" },
  { id: "africa", name: "Africa Love", icon: "🌍", coins: 5000, color: "bg-green-500/20 text-green-400" },
]

// Coin purchase packages
const coinPackages = [
  { coins: 100, price: "$0.99", bonus: 0, popular: false },
  { coins: 500, price: "$4.49", bonus: 50, popular: false },
  { coins: 1100, price: "$9.99", bonus: 100, popular: true },
  { coins: 2500, price: "$19.99", bonus: 300, popular: false },
  { coins: 5500, price: "$39.99", bonus: 750, popular: false },
  { coins: 12000, price: "$79.99", bonus: 2000, popular: false },
]

// Mock recent tips
const recentTips = [
  { from: "Adaeze", gift: "crown", artist: "Burna Boy", time: "2m ago" },
  { from: "Kwame", gift: "fire", artist: "Tyla", time: "5m ago" },
  { from: "Fatima", gift: "diamond", artist: "Wizkid", time: "8m ago" },
  { from: "Chidi", gift: "heart", artist: "Davido", time: "12m ago" },
  { from: "Zainab", gift: "star", artist: "Sauti Sol", time: "15m ago" },
]

// Mock top supporters leaderboard
const topSupporters = [
  { name: "Adaeze N.", avatar: "https://picsum.photos/seed/ada/100", totalCoins: 125000, rank: 1 },
  { name: "Kwame O.", avatar: "https://picsum.photos/seed/kwa/100", totalCoins: 98500, rank: 2 },
  { name: "Fatima B.", avatar: "https://picsum.photos/seed/fat/100", totalCoins: 76200, rank: 3 },
  { name: "Chidi M.", avatar: "https://picsum.photos/seed/chi/100", totalCoins: 54800, rank: 4 },
  { name: "Zainab A.", avatar: "https://picsum.photos/seed/zai/100", totalCoins: 43100, rank: 5 },
]

interface TipModalProps {
  isOpen: boolean
  onClose: () => void
  artist: { name: string; avatar: string }
}

function TipModal({ isOpen, onClose, artist }: TipModalProps) {
  const [selectedGift, setSelectedGift] = useState(giftTypes[2])
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState("")
  const userCoins = 2450

  if (!isOpen) return null

  const totalCost = selectedGift.coins * quantity
  const canAfford = userCoins >= totalCost

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md animate-in slide-in-from-bottom rounded-t-3xl border border-border bg-card p-6 sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">Send a Gift</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>

        {/* Artist */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full">
            <Image src={artist.avatar} alt={artist.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{artist.name}</p>
            <p className="text-sm text-muted-foreground">will receive 80% of your gift</p>
          </div>
        </div>

        {/* Gift selection */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {giftTypes.map(gift => (
            <button
              key={gift.id}
              onClick={() => setSelectedGift(gift)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border p-3 transition-all",
                selectedGift.id === gift.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <span className="text-2xl">{gift.icon}</span>
              <span className="text-xs font-medium text-foreground">{gift.name}</span>
              <span className="flex items-center gap-0.5 text-xs text-primary">
                <Coins className="size-3" />{gift.coins}
              </span>
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground">Quantity</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="rounded-full bg-muted p-1.5 hover:bg-muted/80"
            >
              <Minus className="size-4 text-foreground" />
            </button>
            <span className="w-8 text-center font-mono text-lg font-bold tabular-nums text-foreground">{quantity}</span>
            <button 
              onClick={() => setQuantity(Math.min(99, quantity + 1))}
              className="rounded-full bg-muted p-1.5 hover:bg-muted/80"
            >
              <Plus className="size-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add a message (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={100}
            className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Total & Send */}
        <div className="flex items-center justify-between rounded-xl bg-primary/10 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="flex items-center gap-1 font-mono text-xl font-bold tabular-nums text-primary">
              <Coins className="size-5" />{totalCost.toLocaleString()}
            </p>
          </div>
          <button
            disabled={!canAfford}
            className={cn(
              "flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all",
              canAfford
                ? "bg-primary text-primary-foreground glow-orange-sm hover:bg-primary/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            )}
          >
            <Send className="size-4" />
            Send Gift
          </button>
        </div>

        {/* Balance */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Your balance:</span>
          <span className={cn("flex items-center gap-1 font-mono font-semibold tabular-nums", canAfford ? "text-foreground" : "text-red-400")}>
            <Coins className="size-4 text-primary" />{userCoins.toLocaleString()}
            {!canAfford && <span className="ml-1 text-xs">(Not enough)</span>}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TipsPage() {
  const [showTipModal, setShowTipModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"send" | "buy" | "history">("send")
  const userCoins = 2450

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Virtual Gifts & Tips</h1>
          <p className="text-sm text-muted-foreground">Support your favorite artists directly. Creators keep 80% of all gifts.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Coins className="size-5 text-primary" />
          <span className="font-mono text-lg font-bold tabular-nums text-foreground">{userCoins.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">coins</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1">
        {[
          { id: "send", label: "Send Gifts", icon: Gift },
          { id: "buy", label: "Buy Coins", icon: Coins },
          { id: "history", label: "History", icon: History },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "send" && (
        <>
          {/* Gift Types Showcase */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Available Gifts</h3>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              {giftTypes.map(gift => (
                <div key={gift.id} className={cn("flex flex-col items-center gap-1 rounded-xl p-3", gift.color)}>
                  <span className="text-3xl">{gift.icon}</span>
                  <span className="text-xs font-medium">{gift.name}</span>
                  <span className="flex items-center gap-0.5 text-xs opacity-80">
                    <Coins className="size-3" />{gift.coins}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-4">
            <div className="flex items-center gap-2">
              <Info className="size-5 text-green-400" />
              <h3 className="font-display text-base font-semibold text-foreground">How Gifting Works</h3>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">1</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Buy Coins</p>
                  <p className="text-xs text-muted-foreground">Purchase coin packages with mobile money or card</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">2</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Send Gifts</p>
                  <p className="text-xs text-muted-foreground">Choose a gift and send it during streams or on profiles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-green-500/20 text-sm font-bold text-green-400">3</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Creator Gets 80%</p>
                  <p className="text-xs text-muted-foreground">Artists receive 80% of gift value as real money</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Feed */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Sparkles className="size-4 text-primary" />
              Live Gift Feed
            </h3>
            <div className="space-y-3">
              {recentTips.map((tip, i) => {
                const gift = giftTypes.find(g => g.id === tip.gift)!
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
                    <span className="text-2xl">{gift.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{tip.from}</span>
                        {" sent a "}
                        <span className="font-semibold text-primary">{gift.name}</span>
                        {" to "}
                        <span className="font-semibold">{tip.artist}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{tip.time}</p>
                    </div>
                    <span className="flex items-center gap-0.5 font-mono text-sm font-medium tabular-nums text-primary">
                      <Coins className="size-3" />{gift.coins}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Supporters */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-foreground">
              <Crown className="size-4 text-yellow-400" />
              Top Supporters This Month
            </h3>
            <div className="space-y-3">
              {topSupporters.map(supporter => (
                <div key={supporter.rank} className="flex items-center gap-3">
                  <span className={cn(
                    "flex size-8 items-center justify-center rounded-full font-mono text-sm font-bold",
                    supporter.rank === 1 && "bg-yellow-500/20 text-yellow-400",
                    supporter.rank === 2 && "bg-gray-400/20 text-gray-400",
                    supporter.rank === 3 && "bg-orange-600/20 text-orange-500",
                    supporter.rank > 3 && "bg-muted text-muted-foreground"
                  )}>
                    {supporter.rank}
                  </span>
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Image src={supporter.avatar} alt={supporter.name} fill className="object-cover" />
                  </div>
                  <span className="flex-1 font-medium text-foreground">{supporter.name}</span>
                  <span className="flex items-center gap-1 font-mono text-sm tabular-nums text-muted-foreground">
                    <Coins className="size-4 text-primary" />{supporter.totalCoins.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "buy" && (
        <>
          {/* Coin Packages */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coinPackages.map(pkg => (
              <div 
                key={pkg.coins}
                className={cn(
                  "relative rounded-2xl border p-6 transition-all hover:border-muted-foreground/30",
                  pkg.popular ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Best Value
                  </div>
                )}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15">
                    <Coins className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{pkg.coins.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">coins</p>
                  </div>
                </div>
                {pkg.bonus > 0 && (
                  <div className="mb-4 rounded-lg bg-green-500/10 p-2 text-center">
                    <span className="text-sm font-medium text-green-400">+{pkg.bonus} bonus coins!</span>
                  </div>
                )}
                <button className={cn(
                  "w-full rounded-full py-3 font-semibold transition-colors",
                  pkg.popular
                    ? "bg-primary text-primary-foreground glow-orange-sm hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-muted"
                )}>
                  Buy for {pkg.price}
                </button>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-4 font-display text-base font-semibold text-foreground">Payment Methods</h3>
            <div className="flex flex-wrap gap-3">
              {["M-Pesa", "MTN MoMo", "Airtel Money", "Card", "PayPal"].map(method => (
                <div key={method} className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "history" && (
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 font-display text-base font-semibold text-foreground">Your Gift History</h3>
          <div className="space-y-3">
            {recentTips.slice(0, 3).map((tip, i) => {
              const gift = giftTypes.find(g => g.id === tip.gift)!
              return (
                <div key={i} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                  <span className="text-2xl">{gift.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Sent {gift.name} to {tip.artist}
                    </p>
                    <p className="text-xs text-muted-foreground">{tip.time}</p>
                  </div>
                  <span className="flex items-center gap-0.5 font-mono text-sm font-medium tabular-nums text-red-400">
                    -{gift.coins}
                  </span>
                </div>
              )
            })}
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-500/15">
                <Plus className="size-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Purchased 1,100 coins</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <span className="flex items-center gap-0.5 font-mono text-sm font-medium tabular-nums text-green-400">
                +1,100
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tip Modal */}
      <TipModal 
        isOpen={showTipModal} 
        onClose={() => setShowTipModal(false)}
        artist={{ name: "Burna Boy", avatar: "https://picsum.photos/seed/burna/200" }}
      />
    </div>
  )
}
