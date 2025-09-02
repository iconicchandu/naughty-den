"use client"

import type React from "react"

import { useState } from "react"
import { CreatorSection, KpiCard, BadgePill } from "@/components/creator/ui"
import { Button } from "@/components/ui/button"
import { CalendarDays, ListPlus, Instagram, Twitter, Facebook } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const KPI = [
  { label: "Scheduled Posts", value: 12 },
  { label: "Published Today", value: 5 },
  { label: "Total Engagement", value: "8.5K" },
  { label: "Connected Accounts", value: 3 },
]

const POSTS = [
  {
    id: 1,
    status: "Scheduled",
    time: "Sep 2, 11:05 AM",
    text: "New photoshoot is live! ✨ #photography #newcontent",
  },
  {
    id: 2,
    status: "Scheduled",
    time: "Sep 2, 12:05 PM",
    text: "Behind the scenes from today's shoot! 📸 What do you think of this look?",
  },
  {
    id: 3,
    status: "Published",
    time: "Sep 2, 09:05 AM",
    text: "Thank you for all the love on my recent posts! 💕 Your support means everything",
  },
]

export default function CreatorSocialSchedulePage() {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<{ id: number; text: string; time: string } | null>(null)
  const { toast } = useToast()

  function handleSchedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({
      title: editing ? "Post updated" : "Post scheduled",
      description: editing ? "Changes saved." : "We’ll publish it at the selected time.",
    })
    setOpen(false)
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Social Schedule</h1>
          <p className="text-sm text-white/60">Schedule and manage your social media posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
            <CalendarDays className="mr-2 h-4 w-4" /> Calendar
          </Button>
          <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/15">
            <ListPlus className="mr-2 h-4 w-4" /> List
          </Button>

          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v)
              if (!v) setEditing(null)
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-pink-500 text-white hover:bg-pink-600">+ Schedule Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-[#5f073a37] backdrop-blur-[10px]">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Scheduled Post" : "Schedule a Post"}</DialogTitle>
                <DialogDescription>Select platforms, write your post, and choose a time.</DialogDescription>
              </DialogHeader>

              <form className="grid gap-4" onSubmit={handleSchedule}>
                <div className="grid gap-2">
                  <Label>Platforms</Label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { id: "ig", label: "Instagram", icon: Instagram },
                      { id: "tw", label: "Twitter", icon: Twitter },
                      { id: "fb", label: "Facebook", icon: Facebook },
                    ].map((p) => (
                      <label key={p.id} className="flex items-center gap-2">
                        <Checkbox id={p.id} />
                        <p.icon className="h-4 w-4" />
                        <span className="text-sm">{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="text">Content</Label>
                  <Textarea
                    id="text"
                    required
                    placeholder="New photoshoot is live! ✨ #newcontent"
                    defaultValue={editing?.text ?? ""}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time">Publish at</Label>
                  <Input id="time" type="datetime-local" required defaultValue={editing?.time ?? ""} />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    onClick={() => {
                      setOpen(false)
                      setEditing(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    {editing ? "Save" : "Schedule"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {KPI.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} />
        ))}
      </div>

      <CreatorSection title="Connected Accounts">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { name: "Instagram", followers: "811.3K", icon: Instagram },
            { name: "Twitter", followers: "245.7K", icon: Twitter },
            { name: "Facebook", followers: "156.2K", icon: Facebook },
          ].map((a) => (
            <div
              key={a.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <a.icon className="h-5 w-5 text-white" />
                <div>
                  <div className="font-medium text-white">{a.name}</div>
                  <div className="text-xs text-white/60">{a.followers} followers</div>
                </div>
              </div>
              <BadgePill color="green">Connected</BadgePill>
            </div>
          ))}
        </div>
      </CreatorSection>

      <CreatorSection title="Scheduled Posts" right={<div className="text-sm text-white/60">{POSTS.length} posts</div>}>
        <div className="space-y-3">
          {POSTS.map((p) => (
            <div
              key={p.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-1 items-start gap-3">
                <BadgePill color={p.status === "Published" ? "green" : "violet"}>{p.status}</BadgePill>
                <div className="space-y-1">
                  <div className="text-xs text-white/60">{p.time}</div>
                  <div className="text-sm text-white">{p.text}</div>
                  <div className="mt-2 flex items-center gap-2 text-white/60">
                    <Instagram className="h-4 w-4" />
                    <Twitter className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15"
                  size="sm"
                  onClick={() => {
                    setEditing({ id: p.id, text: p.text, time: "2025-09-02T11:05" })
                    setOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15"
                  size="sm"
                  onClick={() => toast({ title: "Post removed", description: "The scheduled post was deleted." })}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CreatorSection>
    </div>
  )
}
