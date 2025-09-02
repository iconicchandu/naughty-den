"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Heart,
  Users,
  ImagePlus,
  Sparkles,
  CalendarCheck,
  DollarSign,
  MessageSquare,
  UserCog,
  Settings,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/creator", label: "Overview", icon: BarChart2 },
  { href: "/creator/feed", label: "Feed", icon: Heart },
  { href: "/creator/for-you", label: "For You", icon: Users },
  { href: "/creator/content", label: "Content", icon: ImagePlus },
  { href: "/creator/ai-generate", label: "AI Generate", icon: Sparkles },
  { href: "/creator/social-schedule", label: "Social Schedule", icon: CalendarCheck },
  { href: "/creator/earnings", label: "Earnings", icon: DollarSign },
  { href: "/creator/messages", label: "Messages", icon: MessageSquare },
  { href: "/creator/manager", label: "Manager", icon: UserCog },
  { href: "/creator/settings", label: "Settings", icon: Settings },
]

function useCurrentTitle() {
  const pathname = usePathname()
  const match = NAV_ITEMS.find((n) => (n.href === "/creator" ? pathname === "/creator" : pathname.startsWith(n.href)))
  return match?.label ?? "Dashboard"
}

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = useCurrentTitle()
  const isOverview = pathname === "/creator"

  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar
        variant="inset"
        collapsible="icon"
        className="bg-[linear-gradient(to_bottom,#0a0a12,#0c0a12)]/95 text-sidebar-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl hidescrollbar"
      >
        <SidebarContent>
          <SidebarGroup>
            <h2>Naughty Den</h2>
            <SidebarGroupLabel>Creator Studio</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => {
                  const active = item.href === "/creator" ? pathname === "/creator" : pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                        <Link href={item.href} className={cn(active && "data-[active=true]")}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarFooter>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-background/60 p-2">
              <Avatar className="size-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Anabel</div>
                <div className="truncate text-xs text-muted-foreground">@anabel</div>
              </div>
            </div>
          </SidebarFooter>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-[#490830]">
        <div className="h-[1px] w-full" />

        <header className="rounded-b-2xl">
          <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div>
                <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
                {isOverview ? (
                  <p className="hidden text-sm text-muted-foreground sm:block">
                    Welcome back, Anabel! Here's your performance summary.
                  </p>
                ) : null}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated <span className="font-medium text-foreground">Just now</span>
            </div>
          </div>
        </header>

        <div className="relative mx-auto w-full max-w-7xl p-4 md:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,#0a0a12,#0c0a12)]"
          />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[#d5006d]/22 blur-3xl" />
            <div className="absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-[#d5006d]/18 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#d5006d]/14 blur-3xl" />
          </div>

          <div className="rounded-3xl border border-[rgba(213,0,109,0.22)] bg-black/30 p-4 ring-1 ring-[rgba(213,0,109,0.18)] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:p-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
