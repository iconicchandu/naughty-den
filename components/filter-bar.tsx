"use client"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  onChange: (v: {
    category: string
    orientation: string
    maxPrice: number
    type: "all" | "photos" | "videos"
    view: "grid" | "list"
  }) => void
}

export function FilterBar({ onChange }: Props) {
  const [category, setCategory] = useState("all")
  const [orientation, setOrientation] = useState("all")
  const [maxPrice, setMaxPrice] = useState(100)
  const [type, setType] = useState<"all" | "photos" | "videos">("all")
  const [view, setView] = useState<"grid" | "list">("grid")

  const emit = () => onChange({ category, orientation, maxPrice, type, view })

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      <div className="text-sm text-slate-300 font-medium mr-2">Filters:</div>
      <Select
        value={category}
        onValueChange={(v) => {
          setCategory(v)
          emit()
        }}
      >
        <SelectTrigger className="w-[160px] bg-slate-800/60 border-white/10">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-white/10">
          {["all", "Nature", "Architecture", "Portrait", "Street"].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={orientation}
        onValueChange={(v) => {
          setOrientation(v)
          emit()
        }}
      >
        <SelectTrigger className="w-[160px] bg-slate-800/60 border-white/10">
          <SelectValue placeholder="Orientation" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-white/10">
          {["all", "landscape", "portrait", "square"].map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-3 w-64">
        <span className="text-sm text-slate-400">Price ≤</span>
        <Slider
          defaultValue={[100]}
          max={100}
          step={5}
          onValueChange={(v) => {
            setMaxPrice(v[0])
            emit()
          }}
        />
        <span className="text-sm text-slate-300">${maxPrice}</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {(["all", "photos", "videos"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t)
              emit()
            }}
            className={`badge ${t === "all" ? "badge-pink" : "bg-slate-800/60 text-slate-200"} hover:opacity-90`}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          onClick={() => {
            setView("grid")
            emit()
          }}
          className={`badge ${view === "grid" ? "badge-pink" : "bg-slate-800/60 text-slate-200"}`}
          aria-label="Grid view"
        >
          ▦
        </button>
        <button
          onClick={() => {
            setView("list")
            emit()
          }}
          className={`badge ${view === "list" ? "badge-pink" : "bg-slate-800/60 text-slate-200"}`}
          aria-label="List view"
        >
          ≣
        </button>
      </div>
    </div>
  )
}
