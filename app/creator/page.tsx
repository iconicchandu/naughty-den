"use client"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { DollarSign, TrendingUp, Eye, Users } from "lucide-react"

const fetcher = (u: string) =>
  fetch(u)
    .then((r) => r.json())
    .catch(() => undefined)

const fallback = {
  kpis: [
    { label: "Total Earnings", value: "$15,420.50", delta: "+12.5% this month", icon: DollarSign },
    { label: "Monthly Earnings", value: "$3,240.75", delta: "This month", icon: TrendingUp },
    { label: "Total Views", value: "125,400", delta: "All time", icon: Eye },
    { label: "Followers", value: "2,340", delta: "+45 this week", icon: Users },
  ],
  earnings: [
    { month: "Jan", value: 2200 },
    { month: "Feb", value: 2440 },
    { month: "Mar", value: 2800 },
    { month: "Apr", value: 3100 },
    { month: "May", value: 3400 },
    { month: "Jun", value: 3240 },
    { month: "Jul", value: 3560 },
  ],
  library: { photos: 89, videos: 12, likes: 8950 },
  messages: { unread: 156, responseRate: "98%", avgResponse: "2 min" },
  performance: { rating: "4.9/5", conversion: "15.2%", repeat: "67%" },
  activity: [
    { text: 'John D. purchased "Intimate White Top"', time: "2 hours ago", gain: "+$85" },
    { text: 'Sarah M. liked "Seductive Black Lingerie"', time: "3 hours ago", gain: "" },
    { text: "Mike R. sent a message", time: "5 hours ago", gain: "" },
    { text: 'Alex K. purchased "Elegant Red Dress"', time: "1 day ago", gain: "+$75" },
  ],
  top: [
    { title: "Seductive Black Lingerie", earned: 3990 },
    { title: "Intimate White Top", earned: 2125 },
    { title: "Sensual Dance Performance", earned: 3468 },
    { title: "Elegant Red Dress", earned: 2167 },
  ],
}

const rechartsAvailable =
  Boolean(Area) &&
  Boolean(AreaChart) &&
  Boolean(CartesianGrid) &&
  Boolean(ResponsiveContainer) &&
  Boolean(Tooltip) &&
  Boolean(XAxis) &&
  Boolean(YAxis)

const surface =
  "rounded-2xl ring-1 ring-white/10 border border-white/10 bg-[#3d122d] backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_64px_-24px_rgba(0,0,0,0.7)]"

export default function OverviewPage() {
  const { data } = useSWR("/api/creator/metrics", fetcher)
  const metrics = {
    ...fallback,
    ...(data ?? {}),
    kpis: Array.isArray(data?.kpis) ? data!.kpis : fallback.kpis,
    earnings: Array.isArray(data?.earnings) ? data!.earnings : fallback.earnings,
    activity: Array.isArray(data?.activity) ? data!.activity : fallback.activity,
    top: Array.isArray(data?.top) ? data!.top : fallback.top,
    library: { ...fallback.library, ...(data?.library ?? {}) },
    messages: { ...fallback.messages, ...(data?.messages ?? {}) },
    performance: { ...fallback.performance, ...(data?.performance ?? {}) },
  }

  return (
    <div className="grid gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.kpis.map((k: any) => {
          const Icon = k.icon
          return (
            <Card key={k.label} className={surface} >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="text-sm text-slate-300">{k.label}</CardTitle>
                <div className="rounded-xl ring-1 ring-white/10 bg-white/5 p-2 shadow-[0_0_0_3px_rgba(255,255,255,0.03)_inset,0_10px_30px_-12px_rgba(139,92,246,0.35)]">
                  {typeof Icon === "function" ? (
                    <Icon className="h-4 w-4 text-white/80" />
                  ) : (
                    <span className="block h-4 w-4 rounded bg-white/10" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-xl">{k.value}</div>
                <div className="mt-1 text-xs text-emerald-400">{k.delta}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mid cards: Library / Messages / Performance */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className={surface}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Content Library</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Photos</span>
                <span>{metrics.library.photos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Videos</span>
                <span>{metrics.library.videos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Total Likes</span>
                <span>{Number(metrics.library.likes ?? 0).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={surface}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Unread</span>
                <span>{metrics.messages.unread}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Response Rate</span>
                <span className="text-emerald-400">{metrics.messages.responseRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Avg Response</span>
                <span>{metrics.messages.avgResponse}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={surface}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Rating</span>
                <span className="text-yellow-400">{metrics.performance.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Conversion</span>
                <span className="text-emerald-400">{metrics.performance.conversion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Repeat Buyers</span>
                <span>{metrics.performance.repeat}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings chart */}
      <Card className={surface}>
        <CardHeader>
          <CardTitle>Earnings</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {rechartsAvailable ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.earnings}>
                <defs>
                  <linearGradient id="brand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.06} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ background: "rgb(2 6 23 / 0.95)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Area dataKey="value" stroke="#a78bfa" strokeWidth={2} fill="url(#brand)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              Chart unavailable in this preview
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom grids */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className={surface}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {metrics.activity.map((a: any, i: number) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="text-sm">{a.text}</div>
                  <div className="flex items-center gap-3">
                    {a.gain ? <span className="text-xs text-emerald-400">{a.gain}</span> : null}
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={surface}>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {metrics.top.map((t: any) => (
                <li key={t.title} className="flex items-center justify-between text-sm">
                  <span>{t.title}</span>
                  <span className="text-emerald-400">${Number(t.earned ?? 0).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
