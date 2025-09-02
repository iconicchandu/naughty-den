"use client"

import { useState } from "react"
import { CreatorSection, BadgePill } from "@/components/creator/ui"
import { Button } from "@/components/ui/button"

const SUGGESTIONS = [
  "Photoreal portrait in elegant dress",
  "Fashion portrait with dramatic shadows",
  "Professional headshot with soft light",
]

const STYLES = [
  { key: "realistic", label: "Realistic", desc: "Photorealistic images" },
  { key: "artistic", label: "Artistic", desc: "Creative and stylized" },
  { key: "glamour", label: "Glamour", desc: "High-fashion glamour" },
  { key: "vintage", label: "Vintage", desc: "Retro and classic" },
]

export default function CreatorAIGeneratePage() {
  const [tab, setTab] = useState<"photo" | "video">("photo")
  const [style, setStyle] = useState("realistic")
  const [prompt, setPrompt] = useState("")

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-1">
        <div className="grid grid-cols-2">
          <button
            className={`rounded-lg px-4 py-2 text-sm ${tab === "photo" ? "bg-pink-500 text-white" : "text-white/70"}`}
            onClick={() => setTab("photo")}
          >
            ⧉ AI Photos
          </button>
          <button
            className={`rounded-lg px-4 py-2 text-sm ${tab === "video" ? "bg-pink-500 text-white" : "text-white/70"}`}
            onClick={() => setTab("video")}
          >
            ◼ AI Videos
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <CreatorSection
          className="lg:col-span-2"
          title="Describe Your Vision"
          subtitle="Describe the photo you want to generate…"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            placeholder="Beautiful woman in elegant evening dress, shallow depth of field, golden hour lighting…"
            className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="mb-2 text-sm font-semibold text-white">Choose Style</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STYLES.map((st) => (
                <button
                  key={st.key}
                  onClick={() => setStyle(st.key)}
                  className={`rounded-xl border p-4 text-left ${
                    style === st.key ? "border-pink-500 bg-pink-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="font-medium text-white">{st.label}</div>
                  <div className="text-xs text-white/60">{st.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Button className="mt-6 w-full bg-pink-500 text-white hover:bg-pink-600">
            Generate {tab === "photo" ? "Photo" : "Video"}
          </Button>
        </CreatorSection>

        <div className="space-y-6">
          <CreatorSection title="Advanced Settings">
            <label className="mb-1 block text-xs text-white/70">Quality</label>
            <select className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              <option>High Quality</option>
              <option>Standard</option>
            </select>
            <label className="mb-1 block text-xs text-white/70">Aspect Ratio</label>
            <select className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              <option>1:1 Square</option>
              <option>16:9 Wide</option>
              <option>3:4 Portrait</option>
            </select>
          </CreatorSection>

          <CreatorSection title="Usage This Month">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-white/60">Photos Generated</div>
                <div className="text-xl font-semibold text-white">24</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-white/60">Videos Generated</div>
                <div className="text-xl font-semibold text-white">8</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-white/60">Credits Used</div>
            <div className="relative mt-1 h-2 w-full rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-pink-500" />
            </div>
            <div className="mt-1 text-right text-xs text-white/60">150/200</div>
          </CreatorSection>
        </div>
      </div>

      <CreatorSection title="Generated Content">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <article key={i} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="relative">
                <img
                  src={`/generated-.png?height=360&width=720&query=generated%20${i}`}
                  alt="Generated content"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="absolute left-3 top-3">
                  <BadgePill color="slate">{tab === "photo" ? "Photo" : "Video"}</BadgePill>
                </div>
              </div>
            </article>
          ))}
        </div>
      </CreatorSection>
    </div>
  )
}
