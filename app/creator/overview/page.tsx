"use client"

import { StatCard } from "@/components/dashboard/stat-card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const kpi = [
  { title: "Total Earnings", value: "$15,420.50", sub: "+12.5% this month" },
  { title: "Monthly Earnings", value: "$3,240.75", sub: "This month" },
  { title: "Total Views", value: "125,400", sub: "All time" },
  { title: "Followers", value: "2,340", sub: "+45 this week" },
]

const chartData = [
  { m: "Jan", v: 1200 },
  { m: "Feb", v: 1500 },
  { m: "Mar", v: 1800 },
  { m: "Apr", v: 1600 },
  { m: "May", v: 2200 },
  { m: "Jun", v: 2600 },
]

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpi.map((i) => (
          <StatCard key={i.title} title={i.title} value={i.value} sub={i.sub} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-background/60 p-4 backdrop-blur lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold">Earnings Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ background: "rgba(20,20,20,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-background/60 p-4 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold">Messages</h3>
          <ul className="space-y-2 text-sm">
            {["New fan message", "Collab request", "Payment confirmation"].map((m, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-muted/30 px-3 py-2"
              >
                <span className="text-muted-foreground">{m}</span>
                <span className="text-emerald-400">Unread</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-background/60 p-4 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
          <ul className="space-y-2 text-sm">
            {[
              "John D. purchased “Elegant Red Dress” +$75",
              "Emma L. started following you",
              "Mike R. sent a message",
            ].map((t, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-muted/30 px-3 py-2 text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-background/60 p-4 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold">Top Performing Content</h3>
          <ul className="space-y-2 text-sm">
            {["Seductive Black Lingerie", "Intimate White Top", "Sensual Dance Performance"].map((t, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-muted/30 px-3 py-2"
              >
                <span className="text-muted-foreground">{t}</span>
                <span className="text-emerald-400">$3,990</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
