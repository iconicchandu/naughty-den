"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

export function CreatorCard({
  creator,
  onToggleWishlist,
}: {
  creator: Creator
  onToggleWishlist?: (id: string) => void
}) {
  const [wish, setWish] = useState(!!creator.wishlist)

  function toggle() {
    setWish(!wish)
    onToggleWishlist?.(creator.id)
  }

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-lg",
      )}
    >
      {/* Header image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={creator.avatar || "/placeholder.svg?height=480&width=640&query=portrait%20studio" || "/placeholder.svg"}
          alt={`${creator.name} avatar`}
          className="h-full w-full object-cover"
        />
        <button
          onClick={toggle}
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur",
            wish ? "bg-primary text-primary-foreground" : "bg-black/60 text-white",
          )}
        >
          {wish ? "♥ Wishlisted" : "♡ Wishlist"}
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {creator.category}
        </span>
      </div>

      <div className="grid gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">{creator.name}</h3>
            {creator.verified ? (
              <span
                aria-label="Verified"
                title="Verified"
                className="inline-flex h-5 items-center rounded-full bg-emerald-500/20 px-1.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30"
              >
                ✔
              </span>
            ) : null}
          </div>
          <div className="shrink-0 text-sm text-white/80">
            <span className="align-middle">★ {creator.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Subscription</span>
          <span className="font-semibold text-white">${creator.price}</span>
        </div>

        <div className="mt-1 flex gap-2">
          <Button className="w-full">View Profile</Button>
          <Button variant="outline" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20">
            Chat live
          </Button>
        </div>
      </div>
    </article>
  )
}
