"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Props = {
  name: string
  role: string
  avatar: string
  stats: { views: number; likes: number }
}

export function ProfileCard({ name, role, avatar, stats }: Props) {
  return (
    <article className="card card-hover p-4 md:p-6 flex flex-col gap-4">
      <div className="relative">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name} portrait`}
          width={640}
          height={800}
          className="w-full h-72 object-cover rounded-xl"
        />
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-xs border border-white/10">
          Verified
          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[rgb(var(--color-accent-green))]" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-slate-400">{role}</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-300">
        <span>👁️ {Intl.NumberFormat().format(stats.views)}</span>
        <span>❤️ {Intl.NumberFormat().format(stats.likes)}</span>
      </div>
      <div className="mt-1">
        <Button className="w-full rounded-full bg-[rgb(var(--color-brand))] hover:opacity-90">Hire me +</Button>
      </div>
    </article>
  )
}
