import { NextResponse } from "next/server"

export async function GET() {
  // mock dataset inspired by the reference visuals
  const items = [
    {
      id: "1",
      title: "Golden Hour Mountain",
      author: "Alex Chen",
      category: "Nature",
      orientation: "landscape",
      price: 25,
      sale: 0.71,
      rating: 4.8,
      downloads: 1250,
      src: "/serene-mountain-lake.png",
    },
    {
      id: "2",
      title: "Urban Architecture",
      author: "Maria Rodriguez",
      category: "Architecture",
      orientation: "landscape",
      price: 30,
      rating: 4.9,
      downloads: 2100,
      src: "/urban-architecture-fog.png",
    },
    {
      id: "3",
      title: "Portrait in Light",
      author: "David Kim",
      category: "Portrait",
      orientation: "portrait",
      price: 45,
      sale: 0.75,
      rating: 4.7,
      downloads: 890,
      src: "/portrait-bokeh.png",
    },
    {
      id: "4",
      title: "Street Photography",
      author: "Emma Wilson",
      category: "Street",
      orientation: "landscape",
      price: 20,
      rating: 4.6,
      downloads: 1567,
      src: "/snowy-mountains.png",
    },
    {
      id: "5",
      title: "Night Skyline",
      author: "Ken Tanaka",
      category: "Architecture",
      orientation: "landscape",
      price: 35,
      rating: 4.8,
      downloads: 980,
      src: "/night-city-skyline.png",
    },
    {
      id: "6",
      title: "Forest Path",
      author: "Lena Iverson",
      category: "Nature",
      orientation: "portrait",
      price: 18,
      rating: 4.5,
      downloads: 640,
      src: "/forest-path.png",
    },
  ] as const

  return NextResponse.json({ items })
}
