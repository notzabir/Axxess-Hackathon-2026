import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Activity className="h-4 w-4" />
            Axxess Hackathon 2025
          </div>
          <h1 className="font-[var(--font-heading)] text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            CareBot{" "}
            <span className="text-primary">AI</span>
          </h1>
          <p className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl">
            Intelligent Patient Interaction & Triage System
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
            An AI-powered caregiver robot paired with an enterprise-grade dashboard
            for real-time patient triage, symptom analysis, and risk-level
            classification. Designed to augment healthcare delivery at the point of
            care.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="gap-2">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
