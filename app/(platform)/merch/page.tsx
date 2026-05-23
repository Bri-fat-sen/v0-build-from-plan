'use client'

import { ShoppingBag, Filter, Heart } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

const MERCH_ITEMS = [
  { id: 1, name: 'AfriStream Classic Hoodie', artist: 'AfriStream', price: '$45', image: 'hoodie', category: 'Apparel', sold: '1.2K' },
  { id: 2, name: 'Amapiano Vinyl Record', artist: 'Various Artists', price: '$30', image: 'vinyl', category: 'Music', sold: '850' },
  { id: 3, name: 'Afrobeats T-Shirt', artist: 'Multiple Artists', price: '$25', image: 'tshirt', category: 'Apparel', sold: '2.1K' },
  { id: 4, name: 'Limited Edition Cap', artist: 'Creator Collab', price: '$35', image: 'cap', category: 'Apparel', sold: '650' },
  { id: 5, name: 'Culture Tote Bag', artist: 'Heritage Hub', price: '$20', image: 'tote', category: 'Accessories', sold: '1.8K' },
  { id: 6, name: 'Nollywood Poster Pack', artist: 'Film Studio', price: '$15', image: 'posters', category: 'Media', sold: '920' },
  { id: 7, name: 'Artist Signature Mug', artist: 'Producer Line', price: '$18', image: 'mug', category: 'Accessories', sold: '1.1K' },
  { id: 8, name: 'Festival Collection Tee', artist: 'Event Collab', price: '$28', image: 'festival', category: 'Apparel', sold: '1.5K' },
]

const CATEGORIES = ['All', 'Apparel', 'Accessories', 'Music', 'Media']

export default function MerchPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filtered = selectedCategory === 'All' 
    ? MERCH_ITEMS 
    : MERCH_ITEMS.filter(item => item.category === selectedCategory)

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title="AfriStream Merch"
        description="Support your favorite artists and creators"
        icon={ShoppingBag}
      />

      {/* Category Filter */}
      <div className="px-4 lg:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Merch Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:px-6">
        {filtered.map((item) => (
          <div key={item.id} className="group cursor-pointer rounded-lg bg-card overflow-hidden transition-all hover:ring-2 hover:ring-primary">
            <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
              <div className="text-3xl text-muted-foreground">{item.image.substring(0, 1).toUpperCase()}</div>
              <button className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-primary transition-colors opacity-0 group-hover:opacity-100">
                <Heart className="size-4 text-foreground" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.artist}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-sm font-semibold text-primary">{item.price}</span>
                <span className="text-xs text-muted-foreground">{item.sold} sold</span>
              </div>
              <button className="w-full rounded-lg bg-primary/20 hover:bg-primary py-2 text-xs font-medium text-primary hover:text-primary-foreground transition-colors mt-2">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mx-4 rounded-lg border border-border bg-card p-4 space-y-3 lg:mx-6">
        <h3 className="font-display font-semibold text-foreground">Support Artists Directly</h3>
        <p className="text-sm text-muted-foreground">
          All merchandise is created by artists and creators on the platform. Your purchase directly supports them in creating more content you love.
        </p>
      </div>
    </div>
  )
}

import React from 'react'
