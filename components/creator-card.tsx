"use client"

import { useState } from "react"
import { Heart, MessageCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Creator = {
  id: string
  name: string
  category: string
  avatar: string
  wishlist: number
  rating: number
  price: number
  verified?: boolean
}

export function CreatorCard({
  data,
  wished: initialWished,
  onToggle,
  className,
}: {
  data: Creator
  wished?: boolean
  onToggle?: (id: string, wished: boolean) => void
  className?: string
}) {
  const [wished, setWished] = useState(!!initialWished)

  const toggle = () => {
    const next = !wished
    setWished(next)
    onToggle?.(data.id, next)
  }

  return (
    <article className={cn("card card-hover overflow-hidden p-3", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        <img
          src={data.avatar || "/placeholder.svg?height=640&width=860&query=creator%20portrait"}
          alt={`${data.name} avatar`}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/70 leading-10" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge className="bg-primary/90 text-primary-foreground">{data.category}</Badge>
          {data.verified && <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-label="verified" />}
        </div>
        <button
          aria-label="add to wishlist"
          onClick={toggle}
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs backdrop-blur",
            wished ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          <span>{data.wishlist + (wished ? 1 : 0)}</span>
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-base font-semibold">{data.name}</h3>
          <div className="text-sm text-muted-foreground">⭐ {data.rating.toFixed(1)}</div>
        </div>
        <div className="flex items-center justify-between text-sm border-0 m-0 mb-1.5">
          <span className="text-muted-foreground">Subscription</span>
          <span className="font-medium">${data.price.toFixed(2)}/mo</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button className="flex-1 bg-primary text-primary-foreground">View Profile</Button>
          <Button variant="outline" className="flex-1 border-white/10 bg-muted/30">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat live
          </Button>
        </div>
      </div>
    </article>
  )
}
