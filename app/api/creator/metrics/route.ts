import { NextResponse } from "next/server"

export async function GET() {
  const kpis = [
    { label: "Total Earnings", value: "$15,420.50", delta: "+12.5% this month" },
    { label: "Monthly Earnings", value: "$3,240.75", delta: "This month" },
    { label: "Total Views", value: "125,400", delta: "All time" },
    { label: "Followers", value: "2,340", delta: "+45 this week" },
  ]

  const earnings = [
    { month: "Jan", value: 1800 },
    { month: "Feb", value: 2100 },
    { month: "Mar", value: 2400 },
    { month: "Apr", value: 2200 },
    { month: "May", value: 2600 },
    { month: "Jun", value: 3200 },
    { month: "Jul", value: 3400 },
  ]

  const activity = [
    { text: 'John D. purchased "Intimate White Top"', time: "2 hours ago" },
    { text: 'Sarah M. liked "Seductive Black Lingerie"', time: "3 hours ago" },
    { text: "Mike R. sent a message", time: "5 hours ago" },
    { text: 'Alex K. purchased "Elegant Red Dress"', time: "1 day ago" },
  ]

  const top = [
    { title: "Seductive Black Lingerie", earned: 3990 },
    { title: "Intimate White Top", earned: 2125 },
    { title: "Sensual Dance Performance", earned: 3468 },
  ]

  return NextResponse.json({ kpis, earnings, activity, top })
}
