"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-background/60 backdrop-blur" aria-label="Site footer">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">Naughty Den</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Premium marketplace for visual storytellers and their fans.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/gallery" className="hover:text-foreground">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/#featured" className="hover:text-foreground">
                Featured Creators
              </Link>
            </li>
            <li>
              <Link href="/creator" className="hover:text-foreground">
                Creator Studio
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Help Center</li>
            <li>Community</li>
            <li>Brand Assets</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Stay in the loop</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Get new drops and featured creators straight to your inbox.
          </p>
          <form
            className="mt-3 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              // no-op for now, front-end only
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-white/10 bg-muted/30 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
              aria-describedby="newsletter-help"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
          <p id="newsletter-help" className="mt-1 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Naughty Den. All rights reserved.
      </div>
    </footer>
  )
}
