"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, Send } from "lucide-react"

const CONVOS = [
  { id: "john", name: "John D.", last: "Thanks for the amazing content!", time: "5m" },
  { id: "sarah", name: "Sarah M.", last: "Can you do a custom shoot?", time: "1h" },
  { id: "mike", name: "Mike R.", last: "Love your work! Keep it up 🔥", time: "1d" },
]

const THREAD = [
  { from: "them", text: "Hey! I love your latest photos 😍", time: "1h" },
  { from: "them", text: "Do you take custom requests?", time: "50m" },
  { from: "them", text: "Thanks for the amazing content! 😍", time: "5m" },
  { from: "me", text: "Thank you so much! I really appreciate the support 💕", time: "58m" },
  { from: "me", text: "Yes! I do custom content. What did you have in mind? 😊", time: "41m" },
]

export default function CreatorMessagesPage() {
  const [active, setActive] = useState(CONVOS[0].id)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      {/* conversations */}
      <aside className="rounded-xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 p-3">
          <h3 className="text-sm font-semibold text-white">Messages</h3>
          <input
            placeholder="Search conversations…"
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
        </div>
        <ul className="max-h-[60vh] divide-y divide-white/5 overflow-y-auto">
          {CONVOS.map((c) => (
            <li
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`cursor-pointer px-3 py-3 ${active === c.id ? "bg-white/10" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-white">{c.name}</div>
                <div className="text-xs text-white/60">{c.time}</div>
              </div>
              <div className="text-sm text-white/70">{c.last}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* thread */}
      <section className="flex min-h-[60vh] flex-col rounded-xl border border-white/10">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div>
            <div className="font-medium text-white">John D.</div>
            <div className="text-xs text-emerald-400">Online</div>
          </div>
        </header>

        <div className="flex-1 space-y-3 bg-black/70 p-4">
          {THREAD.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                  m.from === "me" ? "bg-pink-500 text-white" : "bg-white/10 text-white"
                }`}
              >
                {m.text}
                <div className="mt-1 text-[10px] opacity-70">{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        <footer className="flex items-center gap-2 border-t border-white/10 bg-white/5 p-3">
          <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            placeholder="Type a message…"
            className="flex-1 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none"
          />
          <Button className="bg-pink-500 text-white hover:bg-pink-600">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </footer>
      </section>
    </div>
  )
}
