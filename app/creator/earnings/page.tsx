"use client"

import { KpiCard, BadgePill, CreatorSection } from "@/components/creator/ui"
import { Button } from "@/components/ui/button"

const KPIS = [
  { label: "Total Earnings", value: "$15,420.5" },
  { label: "This Month", value: "$3,240.75" },
  { label: "Pending", value: "$450.25" },
  { label: "Available", value: "$2,790.5" },
]

const ROWS = [
  { type: "sale", item: "Intimate White Top", buyer: "John D.", amount: 85, date: "1/15/2024", status: "completed" },
  {
    type: "sale",
    item: "Seductive Black Lingerie",
    buyer: "Sarah M.",
    amount: 95,
    date: "1/14/2024",
    status: "completed",
  },
  { type: "tip", item: "Chat Tip", buyer: "Mike R.", amount: 25, date: "1/14/2024", status: "completed" },
  {
    type: "subscription",
    item: "Premium Subscription",
    buyer: "Alex K.",
    amount: 10,
    date: "1/13/2024",
    status: "completed",
  },
  { type: "sale", item: "Elegant Red Dress", buyer: "Emma L.", amount: 75, date: "1/12/2024", status: "pending" },
]

export default function CreatorEarningsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Earnings</h1>
          <p className="text-sm text-white/60">Track your income and payouts</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <Button className="bg-pink-500 text-white hover:bg-pink-600">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <CreatorSection title="Request Payout" right={<div className="text-xs text-white/60">Minimum: $50</div>}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/60">Available Balance</div>
            <div className="text-2xl font-semibold text-white">$2,790.5</div>
          </div>
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">Request Payout</Button>
        </div>
      </CreatorSection>

      <CreatorSection title="Transaction History">
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-white/70">
              <tr>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Buyer</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-4 py-3">
                    <BadgePill color={r.type === "sale" ? "green" : r.type === "tip" ? "violet" : "slate"}>
                      {r.type}
                    </BadgePill>
                  </td>
                  <td className="px-4 py-3 text-white/90">{r.item}</td>
                  <td className="px-4 py-3 text-white/70">{r.buyer}</td>
                  <td className="px-4 py-3 text-emerald-400">${r.amount}</td>
                  <td className="px-4 py-3 text-white/70">{r.date}</td>
                  <td className="px-4 py-3">
                    <BadgePill color={r.status === "completed" ? "green" : "amber"}>{r.status}</BadgePill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CreatorSection>
    </div>
  )
}
