import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero"
import { FeaturesSection } from "@/components/landing/features"
import { TechnologySection } from "@/components/landing/technology"
import { LandingFooter } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
      </main>
      <LandingFooter />
    </div>
  )
}
