"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export type Media = {
  id: string
  title: string
  author: string
  category: string
  orientation: "landscape" | "portrait" | "square"
  price: number
  sale?: number
  rating: number
  downloads: number
  src: string
}

export function MediaCard({ m }: { m: Media }) {
  const [liked, setLiked] = useState(false)
  const discount = m.sale ? Math.round(m.price * (1 - m.sale)) : null

  return (
    <article className={cn("card card-hover overflow-hidden")}>
      <div className="p-3 flex items-center gap-2">
        <span className="badge badge-pink">{m.category}</span>
        {m.sale && <span className="badge badge-green">{Math.round((1 - m.sale) * 100)}% OFF</span>}
        <button
          aria-label="like"
          onClick={() => setLiked((v) => !v)}
          className={cn(
            "ml-auto size-8 grid place-items-center rounded-full border border-white/10 bg-slate-800/70 hover:bg-slate-800/90 transition",
            liked && "bg-primary text-primary-foreground",
          )}
        >
          ♥
        </button>
      </div>
      <Image
        src={m.src || "/placeholder.svg"}
        alt={m.title}
        width={800}
        height={600}
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="p-5 grid gap-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold flex-1">{m.title}</h3>
          <span className="text-sm text-pink-300">★ {m.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-slate-400">by {m.author}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">${discount ?? m.price}</span>
            {discount && <s className="text-slate-500">${m.price}</s>}
          </div>
          <span className="text-sm text-slate-400">⇣ {m.downloads.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button className="rounded-full bg-primary text-primary-foreground hover:opacity-90">View Profile</Button>
          <Button variant="outline" className="rounded-full border-white/10 bg-slate-800/60">
            Chat live
          </Button>
        </div>
      </div>
    </article>
  )
}
