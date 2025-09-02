"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Heart, Sparkles, CalendarCheck, DollarSign, MessageSquare, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/creator/overview", label: "Overview", icon: BarChart2 },
  { href: "/creator/feed", label: "Feed", icon: Heart },
  { href: "/creator/for-you", label: "For You", icon: Users },
  { href: "#", label: "Content", icon: Sparkles },
  { href: "#", label: "AI Generate", icon: Sparkles },
  { href: "#", label: "Social Schedule", icon: CalendarCheck },
  { href: "#", label: "Earnings", icon: DollarSign },
  { href: "#", label: "Messages", icon: MessageSquare },
  { href: "#", label: "Manager", icon: Users },
  { href: "#", label: "Settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-64 bg-[#490830] p-3 md:block">
      <div className="px-3 py-2 text-sm font-semibold">Creator Studio</div>
      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors",
                "hover:bg-[rgb(213,0,110)]",
                active &&
                  "bg-[rgba(213,0,109,0.16)] text-foreground ring-1 ring-[rgba(213,0,109,0.22)] shadow-[0_8px_24px_-12px_rgba(213,0,109,0.5)]",
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-[#d5006d]" : "text-white/70")} />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto hidden px-3 pt-6 md:block">
        <div className="rounded-2xl border border-[rgba(213,0,109,0.22)] bg-white/5 p-3 text-xs text-muted-foreground backdrop-blur">
          Logged in as <span className="font-medium text-foreground">@anabel</span>
        </div>
      </div>
    </aside>
  )
}
