"use client"

import { useMemo, useState } from "react"
import { BadgePill } from "@/components/creator/ui"
import { Search, Grid2X2, LayoutGrid, Star, Eye, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "All",
  "Exclusive",
  "Certified",
  "Girl",
  "Hot Flirt",
  "Soul Mate",
  "Mature",
  "New Models",
  "Fetish",
  "Transgirl",
  "Lesbian",
  "Couple",
]

const SHOW_TYPES = ["All", "Free Chat", "Private Chat", "VIP Show"]

const MOCK_CREATORS = [
  { id: "1", name: "Dasha", live: true, mode: "Free Chat", viewers: 1250, rating: 4.9 },
  {
    id: "2",
    name: "TaniaSaenz",
    live: true,
    mode: "Private Chat",
    viewers: 890,
    rating: 4.8,
    tags: ["Soul Mate", "Exclusive"],
  },
  { id: "3", name: "KylieSummer", live: true, mode: "VIP Show", viewers: 2340, rating: 5.0, price: "$4.99/min" },
  { id: "4", name: "RoseAndLiam", live: true, mode: "Private Chat", viewers: 1567, rating: 4.7, badge: "PROMO" },
  { id: "5", name: "SofyCarter", live: true, mode: "Free Chat", viewers: 756, rating: 4.6, tags: ["Fetish", "Mature"] },
  { id: "6", name: "MoniqueMinx", live: true, mode: "Private Chat", viewers: 1123, rating: 4.8 },
  { id: "7", name: "VivienneHarris", live: true, mode: "VIP Show", viewers: 1890, rating: 4.9, price: "$3.99/min" },
  { id: "8", name: "LanaShock", live: true, mode: "Free", viewers: 634, rating: 4.5, tags: ["New Model", "Hot Flirt"] },
]

export default function FeedPage() {
  const [activeCat, setActiveCat] = useState("All")
  const [showType, setShowType] = useState("All")
  const filtered = useMemo(() => {
    return MOCK_CREATORS.filter((c) => (showType === "All" ? true : (c.mode || "Free Chat") === showType))
  }, [showType])

  return (
    <div className="flex gap-6">
      {/* left categories sidebar with red tone */}
      <aside className="sticky top-16 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto rounded-xl border border-white/5 bg-[#3b0d0d] p-4 md:block scrollbar-hide">
        <h3 className="mb-3 text-sm font-semibold text-white">Categories</h3>
        <nav className="space-y-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10",
                activeCat === c && "bg-[#8a1c1c] text-white hidescrollbar",
              )}
            >
              {c}
            </button>
          ))}
        </nav>

        <div className="my-5 h-px w-full bg-white/10" />

        <h4 className="mb-2 text-sm font-semibold text-white">Show Type</h4>
        <nav className="space-y-1">
          {SHOW_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setShowType(t)}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10",
                showType === t && "bg-[#8a1c1c] text-white",
              )}
            >
              {t}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-white">Live Content Creators</h1>
            <p className="text-sm text-white/60">Discover the most popular creators in premium content</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <Search className="h-4 w-4 text-white/60" />
              <input
                placeholder="Search creators..."
                className="w-56 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15" size="icon">
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative">
                <img
                  src={"/placeholder.svg?height=240&width=480&query=creator%20preview"}
                  alt={`Preview of ${c.name}`}
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <BadgePill color="green">
                    <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    LIVE
                  </BadgePill>
                  <BadgePill color="pink">{c.mode || "Free Chat"}</BadgePill>
                </div>
                {c.badge ? (
                  <div className="absolute left-3 top-12">
                    <BadgePill color="amber">{c.badge}</BadgePill>
                  </div>
                ) : null}
                {c.price ? (
                  <div className="absolute right-3 top-3">
                    <BadgePill color="green">{c.price}</BadgePill>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between px-4 pt-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{c.name}</span>
                  <ShieldCheck className="h-4 w-4 text-sky-300" />
                </div>
                <div className="flex items-center gap-4 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-300" /> {c.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {c.viewers}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="mt-2 flex flex-wrap gap-2">
                  {(c.tags || []).map((t: string) => (
                    <BadgePill key={t} color="slate">
                      {t}
                    </BadgePill>
                  ))}
                </div>
                <Button className="mt-4 w-full bg-pink-500 text-white hover:bg-pink-600">
                  {c.mode === "Private Chat" || c.mode === "VIP Show" ? "Start Private Chat" : "Join Free Chat"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
