"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { CreatorCard } from "./creator-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type Creator = {
  id: string
  name: string
  category: string
  avatar: string
  rating: number
  price: number
  verified?: boolean
  wishlist?: boolean
}

const CATEGORIES = ["Fashion", "Fitness", "Gaming", "Music", "Art"] as const
type Category = (typeof CATEGORIES)[number]

const MOCK_CREATORS: Creator[] = [
  // Fashion (3)
  {
    id: "f1",
    name: "Lena Ortiz",
    category: "Fashion",
    avatar: "/fashion-portrait.png",
    rating: 4.8,
    price: 12,
    verified: true,
  },
  { id: "f2", name: "Mika Chen", category: "Fashion", avatar: "/fashion-studio.png", rating: 4.5, price: 9 },
  {
    id: "f3",
    name: "Ivy Park",
    category: "Fashion",
    avatar: "/editorial-portrait.png",
    rating: 4.9,
    price: 15,
    verified: true,
  },
  // Fitness (3)
  { id: "ft1", name: "Alex King", category: "Fitness", avatar: "/fitness-influencer.png", rating: 4.6, price: 10 },
  { id: "ft2", name: "Nora Brooks", category: "Fitness", avatar: "/workout-portrait.png", rating: 4.7, price: 11 },
  { id: "ft3", name: "Jordan Lee", category: "Fitness", avatar: "/health-lifestyle.png", rating: 4.4, price: 7 },
  // Gaming (3)
  { id: "g1", name: "PixelRae", category: "Gaming", avatar: "/gaming-streamer.png", rating: 4.5, price: 8 },
  { id: "g2", name: "NeoKnight", category: "Gaming", avatar: "/esports-player.png", rating: 4.3, price: 5 },
  {
    id: "g3",
    name: "VegaFox",
    category: "Gaming",
    avatar: "/rgb-desk.png",
    rating: 4.8,
    price: 13,
    verified: true,
  },
  // Music (3)
  {
    id: "m1",
    name: "Rhea Sound",
    category: "Music",
    avatar: "/music-artist-portrait.png",
    rating: 4.7,
    price: 14,
    verified: true,
  },
  { id: "m2", name: "Echo Wave", category: "Music", avatar: "/concert-singer.png", rating: 4.2, price: 6 },
  { id: "m3", name: "Juno Keys", category: "Music", avatar: "/piano-artist.png", rating: 4.5, price: 9 },
  // Art (3)
  {
    id: "a1",
    name: "Mara Ink",
    category: "Art",
    avatar: "/digital-artist.png",
    rating: 4.8,
    price: 16,
    verified: true,
  },
  { id: "a2", name: "Koi Studio", category: "Art", avatar: "/illustration-portrait.png", rating: 4.4, price: 7 },
  { id: "a3", name: "Atlas Draws", category: "Art", avatar: "/sketchbook.png", rating: 4.6, price: 10 },
]

export default function FeaturedCreators() {
  const [category, setCategory] = useState<"All" | Category>("All")
  const [query, setQuery] = useState("")
  const [minRating, setMinRating] = useState(4)
  const [price, setPrice] = useState<"all" | "0-9" | "10-14" | "15+">("all")
  const [wishIds, setWishIds] = useState<string[]>([])

  const creators = useMemo(() => {
    // Base list: either 3 per category (All) or all in selected category
    let base: Creator[] = []
    if (category === "All") {
      for (const cat of CATEGORIES) {
        base = base.concat(MOCK_CREATORS.filter((c) => c.category === cat).slice(0, 3))
      }
    } else {
      base = MOCK_CREATORS.filter((c) => c.category === category)
    }

    // Apply search / rating / price filters
    const q = query.trim().toLowerCase()
    return base
      .filter((c) => (q ? c.name.toLowerCase().includes(q) : true))
      .filter((c) => c.rating >= minRating)
      .filter((c) => {
        if (price === "all") return true
        if (price === "0-9") return c.price <= 9
        if (price === "10-14") return c.price >= 10 && c.price <= 14
        return c.price >= 15
      })
      .map((c) => ({ ...c, wishlist: wishIds.includes(c.id) }))
  }, [category, query, minRating, price, wishIds])

  function toggleWishlist(id: string) {
    setWishIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <section aria-labelledby="featured-creators" className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="featured-creators" className="text-2xl font-semibold text-white sm:text-3xl">
            Featured Creators
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Explore 3 picks from each category. Use filters to refine results.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 backdrop-blur sm:overflow-visible">
            <button
              onClick={() => setCategory("All")}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm",
                category === "All" ? "bg-primary text-primary-foreground" : "text-white/80 hover:bg-white/10",
              )}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm",
                  category === cat ? "bg-primary text-primary-foreground" : "text-white/80 hover:bg-white/10",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:min-w-[260px]">
            <Label htmlFor="search" className="sr-only">
              Search creators
            </Label>
            <Input
              id="search"
              placeholder="Search name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 bg-white/5 text-white placeholder:text-white/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-xs text-white/70">Min rating</Label>
            <div className="w-28">
              <Slider
                value={[minRating]}
                min={1}
                max={5}
                step={0.5}
                onValueChange={(v) => setMinRating(v[0] ?? 4)}
                className="cursor-pointer"
              />
            </div>
            <span className="w-6 text-right text-sm text-white/80">{minRating}</span>
          </div>

          <div className="w-28">
            <Select value={price} onValueChange={(v: any) => setPrice(v)}>
              <SelectTrigger className="h-10 bg-white/5 text-white">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0-9">$0–9</SelectItem>
                <SelectItem value="10-14">$10–14</SelectItem>
                <SelectItem value="15+">$15+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {creators.map((c) => (
          <CreatorCard key={c.id} creator={c} onToggleWishlist={toggleWishlist} />
        ))}
      </div>

      {/* Helper row */}
      <div className="mt-6 flex items-center justify-between text-xs text-white/60">
        <span>
          Showing <strong>{creators.length}</strong> creators
        </span>
        <Button
          variant="ghost"
          className="h-8 px-2 text-white/70 hover:bg-white/10"
          onClick={() => {
            setCategory("All")
            setQuery("")
            setMinRating(4)
            setPrice("all")
            setWishIds([])
          }}
        >
          Clear filters
        </Button>
      </div>
    </section>
  )
}
