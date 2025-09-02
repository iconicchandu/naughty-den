"use client"

import type React from "react"

import { useState } from "react"
import { CreatorSection, BadgePill } from "@/components/creator/ui"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const MANAGERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Connected",
    group: "Elite Talent Management",
    clients: 25,
    earnings: "$15,420",
    rating: "4.9/5.0",
    specialties: ["Content Strategy", "Brand Building", "Social Media"],
    can: ["Edit Profile", "Post Content", "Send Messages", "Manage Earnings"],
    since: "June 15, 2023",
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "Pending",
    group: "Star Management Group",
    clients: 18,
    earnings: "$12,800",
    rating: "4.7/5.0",
    specialties: ["Marketing", "Analytics", "Growth Strategy"],
    can: ["Edit Profile", "Post Content", "Send Messages", "Manage Earnings"],
    since: "January 10, 2024",
  },
]

export default function CreatorManagerPage() {
  const [open, setOpen] = useState(false)
  const [becomeOpen, setBecomeOpen] = useState(false)
  const { toast } = useToast()

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({ title: "Manager invited", description: "We sent an invitation to the provided email." })
    setOpen(false)
  }

  function handleBecome(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast({ title: "Application submitted", description: "We’ll review your request shortly." })
    setBecomeOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Management</h1>
          <p className="text-sm text-white/60">Connect with professional talent managers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="bg-white/10 text-white hover:bg-white/15"
            onClick={() => setBecomeOpen(true)}
          >
            Become a Manager
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-500 text-white hover:bg-pink-600">+ Add Manager</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Manager</DialogTitle>
                <DialogDescription>Invite a manager and set their permissions.</DialogDescription>
              </DialogHeader>

              <form className="grid gap-4" onSubmit={handleAdd}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Jane Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="jane@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Edit Profile", "Post Content", "Send Messages", "Manage Earnings"].map((p) => (
                      <label key={p} className="flex items-center gap-2 text-sm">
                        <Checkbox /> <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-white/10 text-white hover:bg-white/15"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    Send Invite
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={becomeOpen} onOpenChange={setBecomeOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Become a Manager</DialogTitle>
            <DialogDescription>Tell us about your experience and why you’d like to manage creators.</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={handleBecome}>
            <div className="grid gap-2">
              <Label htmlFor="org">Organization (optional)</Label>
              <Input id="org" placeholder="Star Management Group" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Summary</Label>
              <Input id="bio" required placeholder="5+ years in social strategy and growth" />
            </div>
            <div className="grid gap-2">
              <Label>Specialties</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Content Strategy", "Brand Building", "Social Media", "Analytics"].map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm">
                    <Checkbox /> <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/15"
                onClick={() => setBecomeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {MANAGERS.map((m) => (
        <CreatorSection
          key={m.id}
          title={m.name}
          subtitle={m.group}
          right={<BadgePill color={m.status === "Connected" ? "green" : "amber"}>{m.status}</BadgePill>}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60">Clients</div>
              <div className="text-xl font-semibold text-white">{m.clients}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60">Avg Earnings</div>
              <div className="text-xl font-semibold text-white">{m.earnings}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="text-xs text-white/60">Rating</div>
              <div className="text-xl font-semibold text-white">{m.rating}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-white/70">Specialties</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {m.specialties.map((s) => (
                <BadgePill key={s} color="violet">
                  {s}
                </BadgePill>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-white/70">Permissions</div>
            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-4">
              {m.can.map((c) => (
                <Button
                  key={c}
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15"
                  onClick={() => toast({ title: "Action sent", description: `${c} requested for ${m.name}.` })}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="mt-3 text-xs text-white/60">Connected since {m.since}</div>
          </div>
        </CreatorSection>
      ))}
    </div>
  )
}
