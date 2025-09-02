import { NextResponse } from "next/server"

export async function GET() {
  const items = Array.from({ length: 18 }).map((_, i) => ({
    id: `${i + 1}`,
    title: ["Golden Hour Mountain", "Urban Architecture", "Portrait in Light", "Street Photography"][i % 4],
    author: ["Alex Chen", "Maria Rodriguez", "David Kim", "Emma Wilson"][i % 4],
    price: [25, 30, 45, 20][i % 4],
    rating: [4.8, 4.9, 4.7, 4.6][i % 4],
    downloads: [1250, 2100, 890, 1567][i % 4],
    category: ["Nature", "Architecture", "Portrait", "Street"][i % 4],
    type: i % 3 === 0 ? "Videos" : "Photos",
    imageUrl: `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(
      ["mountain lake", "city in fog", "studio portrait", "snowy mountains"][i % 4],
    )}`,
  }))

  return NextResponse.json({ items })
}
