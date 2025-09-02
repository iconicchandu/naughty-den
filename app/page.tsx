import { NavBar } from "@/components/nav-bar"
import { Hero } from "@/components/hero"
import FeaturedCreators from "@/components/featured-creators"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-background">
      <NavBar />
      <Hero />
      <section id="featured" aria-labelledby="featured-heading" className="py-12 sm:py-14">
        <h2 id="featured-heading" className="sr-only">
          Featured Creators
        </h2>
        <FeaturedCreators />
      </section>
      <Footer />
    </main>
  )
}
