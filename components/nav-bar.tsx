"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
]

export function NavBar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-50 navglass">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Naughty</span> <span className="text-[rgb(var(--color-brand))]">Den</span>
          <span className="sr-only">Home</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("text-sm text-slate-300 hover:text-white transition", pathname === l.href && "text-white")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1 max-w-md hidden md:block">
          <Input className="bg-slate-800/70 border-white/10" placeholder="Search photos..." />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="rounded-full border-white/10 bg-slate-800/60">
            <Link href="/creator">Creator Dashboard</Link>
          </Button>
          <Button className="rounded-full bg-primary text-primary-foreground hover:opacity-90">Get Pro</Button>
        </div>
      </div>
    </header>
  )
}
