// NOTE: purely visual; no props or external deps.
"use client"

export function NeoBokehOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft dark gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(139,92,246,0.10),transparent),radial-gradient(800px_400px_at_10%_20%,rgba(244,114,182,0.08),transparent),radial-gradient(900px_500px_at_90%_80%,rgba(245,158,11,0.06),transparent)]" />
      {/* Bokeh blobs */}
      <div className="absolute -top-10 -left-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/3 -right-20 h-[28rem] w-[28rem] rounded-full bg-pink-400/15 blur-3xl" />
      <div className="absolute bottom-[-6rem] left-1/3 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
    </div>
  )
}
