import type React from "react"
import { cn } from "@/lib/utils"
import {
  BadgeCheck,
  CircleDot,
  DollarSign,
  Eye,
  Heart,
  MessagesSquare,
  Users,
  Shield,
  ImageIcon,
  Video,
} from "lucide-react"

export function CreatorSection({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title: string
  subtitle?: string
  right?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-xl border border-white/5 bg-[#3d122d] p-4 md:p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-tight text-white text-pretty">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}

export function KpiCard({
  icon,
  label,
  value,
  helper,
}: {
  icon?: React.ReactNode
  label: string
  value: string | number
  helper?: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#3d122d] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/60">{label}</p>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {helper ? <div className="mt-2 text-xs text-white/60">{helper}</div> : null}
    </div>
  )
}

export function BadgePill({
  children,
  color = "slate",
}: {
  children: React.ReactNode
  color?: "slate" | "pink" | "green" | "amber" | "violet" | "red"
}) {
  const map: Record<string, string> = {
    slate: "bg-white/10 text-white/80",
    pink: "bg-pink-500/15 text-pink-300",
    green: "bg-emerald-500/15 text-emerald-300",
    amber: "bg-amber-500/15 text-amber-300",
    violet: "bg-violet-500/15 text-violet-300",
    red: "bg-rose-500/15 text-rose-300",
  }
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", map[color])}>
      {children}
    </span>
  )
}

export function StatusDot({ color = "emerald" }: { color?: "emerald" | "rose" | "amber" | "slate" }) {
  const cls: Record<string, string> = {
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    amber: "bg-amber-400",
    slate: "bg-slate-400",
  }
  return <span className={cn("mr-2 inline-block h-2 w-2 rounded-full", cls[color])} aria-hidden />
}

export const Icons = { BadgeCheck, CircleDot, DollarSign, Eye, Heart, MessagesSquare, Users, Shield, ImageIcon, Video }
