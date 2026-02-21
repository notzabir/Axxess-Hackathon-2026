import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Globe, ShieldAlert, Bot } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Symptom Analysis",
    description:
      "Advanced natural language processing to analyze patient symptoms in real-time, providing structured clinical data for faster decision-making.",
  },
  {
    icon: Globe,
    title: "Multilingual Voice Support",
    description:
      "Communicate with patients in multiple languages using voice-first interactions, ensuring no patient is left behind due to language barriers.",
  },
  {
    icon: ShieldAlert,
    title: "Risk-Level Classification",
    description:
      "Automated patient triage with three-tier risk classification (Low, Medium, High) to prioritize care delivery and allocate resources effectively.",
  },
  {
    icon: Bot,
    title: "Robotic Care Integration",
    description:
      "Seamlessly integrates with a Raspberry Pi-powered care robot to provide bedside patient interactions and relay data to the clinical dashboard.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Redefining Point-of-Care Triage
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            CareBot AI combines hardware robotics with intelligent software to
            deliver an end-to-end patient interaction and triage system.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 bg-card transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
