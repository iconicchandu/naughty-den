"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatorCard, type Creator } from "./creator-card"
import { cn } from "@/lib/utils"

const fetcher = (u: string) => fetch(u).then((r) => r.json())
const categories = ["Nature", "Architecture", "Portrait", "Street"]

export default function FeaturedCreators() {
  const { data } = useSWR<{ creators: Creator[] }>("/api/creators", fetcher)
  const [tab, setTab] = useState<"all" | "filter">("all")
  const [category, setCategory] = useState<string>("All")
  const [query, setQuery] = useState("")
  const [rating, setRating] = useState(0)
  const [price, setPrice] = useState<number[]>([0, 100])
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    const list = (data?.creators ?? [])
      .filter((c) => (category === "All" ? true : c.category === category))
      .filter((c) => c.rating >= rating)
      .filter((c) => c.price >= price[0] && c.price <= price[1])
      .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    return list
  }, [data, category, rating, price, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Creator[]>()
    for (const c of data?.creators ?? []) {
      if (!map.has(c.category)) map.set(c.category, [])
      const arr = map.get(c.category)!
      if (arr.length < 3) arr.push(c)
    }
    return map
  }, [data])

  return (
    <section id="featured" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Creators</h2>
          <p className="text-sm text-muted-foreground">
            Explore top creators by category or refine with advanced filters.
          </p>
        </div>
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="bg-muted/30">
            <TabsTrigger value="all">All (3 each)</TabsTrigger>
            <TabsTrigger value="filter">Filters</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {tab === "filter" && (
        <div className="card mb-6 grid grid-cols-1 gap-4 p-4 md:grid-cols-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Category</p>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border border-white/10 px-3 py-1 text-xs transition hover:bg-muted/40",
                    category === c && "bg-primary text-primary-foreground border-primary/30",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Search by name</p>
            <Input
              placeholder="Type a creator name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Minimum rating: {rating.toFixed(1)}</p>
            <Slider min={0} max={5} step={0.5} value={[rating]} onValueChange={(v) => setRating(v[0])} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Price range: ${price[0]} – ${price[1]}
            </p>
            <Slider min={0} max={100} step={5} value={price} onValueChange={(v) => setPrice(v as number[])} />
          </div>
        </div>
      )}

      {tab === "all" ? (
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat}>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {(grouped.get(cat) ?? []).map((c) => (
                  <CreatorCard
                    key={c.id}
                    data={c}
                    wished={wishlist[c.id]}
                    onToggle={(id, w) => setWishlist((prev) => ({ ...prev, [id]: w }))}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((c) => (
            <CreatorCard
              key={c.id}
              data={c}
              wished={wishlist[c.id]}
              onToggle={(id, w) => setWishlist((prev) => ({ ...prev, [id]: w }))}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-white/10 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              No creators match your filters.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
