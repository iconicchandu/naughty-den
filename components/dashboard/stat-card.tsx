import type React from "react"
import { cn } from "@/lib/utils"

export function StatCard({
  title,
  value,
  sub,
  icon,
  className,
}: {
  title: string
  value: string
  sub?: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl ring-1 ring-[rgba(213,0,109,0.18)] bg-[radial-gradient(700px_280px_at_60%_-10%,rgba(213,0,109,0.10),transparent),linear-gradient(to_bottom,rgba(10,10,18,0.95),rgba(10,10,18,0.74))] p-4 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_64px_-24px_rgba(0,0,0,0.7)] backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          {sub && <div className="text-xs text-emerald-400">{sub}</div>}
        </div>
        <div className="rounded-xl ring-1 ring-[rgba(213,0,109,0.18)] bg-white/5 p-2 shadow-[0_10px_30px_-12px_rgba(213,0,109,0.45)]">
          {icon}
        </div>
      </div>
    </div>
  )
}
