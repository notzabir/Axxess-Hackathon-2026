import { Cpu, Lock, FileOutput } from "lucide-react"

const techItems = [
  {
    icon: Cpu,
    title: "Raspberry Pi Powered Robot",
    description:
      "A compact, portable care robot built on Raspberry Pi that can navigate to patient bedsides, capture voice input, and deliver care instructions through audio output.",
  },
  {
    icon: Lock,
    title: "Secure AI Triage Engine",
    description:
      "A multi-layer AI pipeline that processes patient speech, extracts clinical entities, evaluates risk, and produces structured triage recommendations in seconds.",
  },
  {
    icon: FileOutput,
    title: "EMR-Ready Structured Output",
    description:
      "All patient interactions are converted into structured JSON output compatible with Electronic Medical Record systems, ready for clinical review and documentation.",
  },
]

export function TechnologySection() {
  return (
    <section id="technology" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Hardware Meets Intelligence
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            Our system bridges the gap between physical care and digital intelligence, creating a seamless end-to-end triage workflow.
          </p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {techItems.map((item, index) => (
            <div key={item.title} className="relative flex flex-col items-center text-center">
              {index < techItems.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-8 translate-x-full bg-border lg:block" />
              )}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
