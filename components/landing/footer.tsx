import Image from "next/image"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/axxess-logo.png"
            alt="Axxess logo"
            width={100}
            height={32}
            className="h-6 w-auto"
          />
          <span className="text-sm text-muted-foreground">
            Hackathon 2025
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          CareBot AI - Built for the Axxess Hackathon. All mock data for demonstration only.
        </p>
      </div>
    </footer>
  )
}
