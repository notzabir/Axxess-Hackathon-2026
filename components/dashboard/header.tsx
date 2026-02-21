"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Settings,
  ArrowLeft,
  Menu,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/logs", label: "Interaction Logs", icon: FileText },
  { href: "/dashboard/status", label: "System Status", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function DashboardHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const currentPage = navItems.find((item) => item.href === pathname)?.label ?? "Dashboard"

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-16 items-center gap-3 border-b border-border px-5">
            <Image
              src="/images/axxess-logo.png"
              alt="Axxess logo"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-foreground/70 hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-4 border-t border-border pt-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent/60 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center gap-3">
        <h1 className="font-[var(--font-heading)] text-lg font-semibold text-foreground">
          {currentPage}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs font-medium text-green-700">System Online</span>
        </div>
      </div>
    </header>
  )
}
