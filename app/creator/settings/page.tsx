"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const SECTIONS = ["Profile", "Notifications", "Privacy", "Billing", "Preferences"]

export default function CreatorSettingsPage() {
  const [active, setActive] = useState("Profile")

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border border-white/10 bg-white/5 p-3">
        <nav className="space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                active === s ? "bg-pink-500 text-white" : "text-white/80 hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </nav>
      </aside>

      <section className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white">{active}</h2>

        {active === "Profile" ? (
          <form className="space-y-4">
            <div className="flex items-center gap-4">
              <img src="/professional-headshot.png" alt="Profile" className="h-16 w-16 rounded-full object-cover" />
              <div>
                <div className="font-medium text-white">Profile Photo</div>
                <div className="text-xs text-white/60">Update your profile picture</div>
                <Button variant="secondary" className="mt-2 bg-white/10 text-white hover:bg-white/15">
                  Change Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-white/70">Display Name</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="Anabel"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Username</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="anabel"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs text-white/70">Email</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="anabel@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs text-white/70">Bio</label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="Hola! I'm Anabel, 22yo – Currently taking boyfriend applications 😘"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Location</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="Los Angeles, CA"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/70">Website</label>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white"
                  defaultValue="https://anabel.com"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button className="bg-pink-500 text-white hover:bg-pink-600">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="text-sm text-white/70">Settings for "{active}" will appear here.</div>
        )}
      </section>
    </div>
  )
}
