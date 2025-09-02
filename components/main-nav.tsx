"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/creator/overview", label: "Creator Dashboard" },
]

export function MainNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg">
          <span className="text-foreground">Naughty Den</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm text-muted-foreground hover:text-foreground transition",
                pathname.startsWith(l.href) && "text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Input placeholder="Search photos..." className="w-64 bg-muted/40 border-white/10" />
          <Button className="bg-primary text-primary-foreground">Search</Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link href="/creator/overview">Creator</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
