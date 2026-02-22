import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Axxess_Logo.png"
            alt="Axxess logo"
            width={160}
            height={80}
            className="h-8 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#technology"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Technology
          </Link>
          <Link
            href="/summarize"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Summarizer
          </Link>
          <Link href="/dashboard" className="ml-2">
            <Button size="sm">View Dashboard</Button>
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/summarize">
            <Button size="sm" variant="outline">
              Summarizer
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
