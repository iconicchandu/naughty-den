"use client"

import { useMemo, useState } from "react"
import { BadgePill } from "@/components/creator/ui"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK = [
  { id: "r1", name: "Ella", tag: "NEW", viewers: 820, rating: 4.7 },
  { id: "r2", name: "Maya", tag: "PROMO", viewers: 1440, rating: 4.9 },
  { id: "r3", name: "Nora", tag: "VIP", viewers: 560, rating: 4.6 },
  { id: "r4", name: "Ava", tag: "Free", viewers: 980, rating: 4.8 },
]

export default function ForYouPage() {
  const [q, setQ] = useState("")
  const data = useMemo(() => MOCK.filter((m) => m.name.toLowerCase().includes(q.toLowerCase())), [q])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">For You</h1>
          <p className="text-sm text-white/60">Handpicked creators we think you'll love</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <Search className="h-4 w-4 text-white/60" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-56 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((c) => (
          <article key={c.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img
              src={"/placeholder.svg?height=240&width=480&query=recommended%20creator"}
              alt="Recommended creator"
              className="aspect-video w-full object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{c.name}</h3>
                <BadgePill color="amber">{c.tag}</BadgePill>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-pink-500 text-white hover:bg-pink-600">View Profile</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
