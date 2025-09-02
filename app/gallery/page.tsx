"use client"
import useSWR from "swr"
import { NavBar } from "@/components/nav-bar"
import { FilterBar } from "@/components/filter-bar"
import { MediaCard, type Media } from "@/components/media-card"
import { useMemo, useState } from "react"
import { Footer } from "@/components/footer"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function GalleryPage() {
  const { data } = useSWR<{ items: Media[] }>("/api/media", fetcher)
  const [filters, setFilters] = useState({
    category: "all",
    orientation: "all",
    maxPrice: 100,
    type: "all" as const,
    view: "grid" as const,
  })

  const filtered = useMemo(() => {
    if (!data?.items) return []
    return data.items.filter((i) => {
      const byCat = filters.category === "all" || i.category === filters.category
      const byOri = filters.orientation === "all" || i.orientation === filters.orientation
      const byPrice = (i.sale ? Math.round(i.price * (1 - i.sale)) : i.price) <= filters.maxPrice
      return byCat && byOri && byPrice
    })
  }, [data, filters])

  return (
    <main>
      <NavBar />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Media Gallery</h1>
          <div className="badge badge-pink">37 items</div>
        </div>
        <div className="card p-4 mb-6">
          <FilterBar onChange={setFilters} />
        </div>

        {filters.view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => (
              <MediaCard key={m.id} m={m} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((m) => (
              <div key={m.id} className="card card-hover p-3 flex gap-4">
                <img src={m.src || "/placeholder.svg"} alt={m.title} className="w-48 h-36 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold">{m.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">
                    by {m.author} • {m.category} • {m.orientation}
                  </p>
                  <p className="text-sm">
                    Rating ★ {m.rating.toFixed(1)} • Downloads {m.downloads.toLocaleString()}
                  </p>
                </div>
                <div className="self-center text-right pr-3">
                  <div className="text-xl font-semibold">${m.sale ? Math.round(m.price * (1 - m.sale)) : m.price}</div>
                  {m.sale && <div className="text-xs text-slate-400 line-through">${m.price}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
