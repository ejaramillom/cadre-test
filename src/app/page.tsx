import { Navbar } from "@/components/organisms/Navbar"
import { Hero } from "@/components/organisms/Hero"
import { Features } from "@/components/organisms/Features"
import { Footer } from "@/components/organisms/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}