import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") || "feed"
  const all = [
    { id: "p1", title: "Sunset Boulevard", author: "Alex Chen", src: "/sunset-boulevard.png" },
    { id: "p2", title: "Studio Portrait", author: "Jordan Hayes", src: "/studio-portrait.png" },
    { id: "p3", title: "Fog over City", author: "Maria Rodriguez", src: "/foggy-city.png" },
    { id: "p4", title: "Highland Peaks", author: "Emma Wilson", src: "/highland-peaks.png" },
    { id: "p5", title: "Neon Alley", author: "Ken Tanaka", src: "/neon-alley.png" },
    { id: "p6", title: "Forest Rain", author: "Lena Iverson", src: "/forest-rain.png" },
  ]
  const feed = mode === "reco" ? all.slice().reverse() : all
  return NextResponse.json({ feed })
}
