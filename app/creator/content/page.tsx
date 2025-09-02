"use client"

import type React from "react"

import { useState } from "react"
import { KpiCard, BadgePill } from "@/components/creator/ui"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Grid2X2, Rows, Eye, HeartIcon, DollarSignIcon as DollarIcon } from "lucide-react"

const STATS = [
  { label: "Total Content", value: 6 },
  { label: "Total Views", value: 17640 },
  { label: "Total Likes", value: 4439 },
  { label: "Total Earnings", value: "$14,799.5" },
]

const ITEMS = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Intimate White Top",
    "Seductive Black Lingerie",
    "Sensual Dance Performance",
    "Elegant Red Dress",
    "Behind the Scenes",
    "Athletic Workout Style",
  ][i],
  views: [3450, 4200, 2890, 2890, 1560, 2650][i],
  likes: [892, 1156, 756, 634, 423, 578][i],
  earned: [2125.5, 3990, 3468, 2167.5, 1326, 1722.5][i],
  kind: i % 2 === 0 ? "photo" : "video",
}))

export default function CreatorContentPage() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [view, setView] = useState<"grid" | "list">("grid")

  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({ title: "Content uploaded", description: "Your item was queued for processing." })
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s) => (
          <KpiCard
            key={s.label}
            label={s.label}
            value={typeof s.value === "number" ? s.value.toLocaleString() : s.value}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 max-w-md">
          <input
            placeholder="Search content..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
            <option>All Types</option>
            <option>Photos</option>
            <option>Videos</option>
          </select>
          <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-500 text-white hover:bg-pink-600">+ Upload Content</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload Content</DialogTitle>
                <DialogDescription>Fill the details and upload your photo or video.</DialogDescription>
              </DialogHeader>

              <form className="grid gap-4" onSubmit={handleUpload}>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" required placeholder="Elegant Red Dress" />
                </div>

                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select defaultValue="photo">
                    <SelectTrigger className="bg-white/5">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photo">Photo</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input id="price" type="number" min={0} step="0.5" placeholder="25" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" type="file" accept="image/*,video/*" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" placeholder="Short description..." />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    Upload
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="secondary"
            className={`bg-white/10 text-white hover:bg-white/15 ${view === "grid" ? "ring-1 ring-pink-400/40" : ""}`}
            size="icon"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            className={`bg-white/10 text-white hover:bg-white/15 ${view === "list" ? "ring-1 ring-pink-400/40" : ""}`}
            size="icon"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            <Rows className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ITEMS.map((it) => (
            <article key={it.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative">
                <img src="/content-preview.png" alt={it.title} className="aspect-[16/9] w-full object-cover" />
                <div className="absolute left-3 top-3">
                  <BadgePill color="green">published</BadgePill>
                </div>
                {it.kind === "video" ? (
                  <div className="absolute right-3 bottom-3">
                    <BadgePill color="slate">0:45</BadgePill>
                  </div>
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{it.title}</h3>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-white/70">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {it.views.toLocaleString()} Views
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIcon className="h-3.5 w-3.5" /> {it.likes.toLocaleString()} Likes
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarIcon className="h-3.5 w-3.5" /> ${it.earned.toLocaleString()} Earned
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {ITEMS.map((it) => (
            <article
              key={it.id}
              className="flex items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <img
                src="/content-preview.png"
                alt={it.title}
                className="h-24 w-[170px] flex-none rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white">{it.title}</h3>
                  <BadgePill color="green">published</BadgePill>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {it.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-3.5 w-3.5" /> {it.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarIcon className="h-3.5 w-3.5" /> ${it.earned.toLocaleString()}
                  </span>
                </div>
              </div>
              <BadgePill color={it.kind === "video" ? "slate" : "violet"}>{it.kind}</BadgePill>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
