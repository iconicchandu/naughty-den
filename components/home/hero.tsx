"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HomeHero() {
  return (
    <section
      aria-label="Hero"
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "bg-[url('/city-bokeh-lights.png')] bg-cover bg-center",
        "ring-1 ring-white/10",
      )}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            Elevate your feed with premium creators
          </p>
          <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover, Support, and <span className="text-primary">Chat Live</span> with Creators
          </h1>
          <p className="text-pretty mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Browse curated creators across categories. Filter by interests, ratings, and price. Modern, responsive, and
            fast — no sign-up required.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/creator/overview">Creator Dashboard</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            >
              <Link href="/gallery">Explore Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
