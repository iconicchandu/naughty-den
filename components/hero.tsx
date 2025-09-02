import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden h-[90vh]">
      {/* Background with blur */}
      <Image
        src="/imge.jpg"
        alt="Hero background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-[90vh] object-cover"
        priority
      />
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
      <div className="relative mx-auto max-w-5xl px-4 h-[70vh] flex flex-col items-center justify-center text-center gap-6">
        <h1 className="text-balance text-4xl md:text-6xl font-semibold">
          Capture the <span className="text-[rgb(var(--color-brand))]">Extraordinary</span>
        </h1>
        <p className="text-pretty text-slate-300 max-w-2xl">
          Discover stunning photography from talented artists worldwide. Find the perfect image for your next project.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/creator" className="btn-brand">
            Creator Dashboard →
          </Link>
          <Link
            href="/gallery"
            className="rounded-full px-5 py-2.5 border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
