import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Battery,
  Thermometer,
  Wifi,
  Cpu,
  HardDrive,
  Server,
  ShieldCheck,
} from "lucide-react"

export default function StatusPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          System Status
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time health monitoring of all CareBot AI subsystems.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "AI Engine", icon: Cpu, status: "Operational", color: "text-green-700", bg: "bg-green-500/10" },
          { label: "Robot Unit", icon: Bot, status: "Online", color: "text-green-700", bg: "bg-green-500/10" },
          { label: "Network", icon: Wifi, status: "Connected", color: "text-green-700", bg: "bg-green-500/10" },
          { label: "Security", icon: ShieldCheck, status: "Active", color: "text-green-700", bg: "bg-green-500/10" },
        ].map((item) => (
          <Card key={item.label} className="border-border/60">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <Badge className={`mt-1 ${item.bg} ${item.color} border-0 text-xs`}>
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Hardware</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { icon: Battery, label: "Battery Level", value: 78 },
              { icon: Cpu, label: "CPU Usage", value: 42 },
              { icon: HardDrive, label: "Storage", value: 35 },
              { icon: Server, label: "Memory", value: 61 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="mt-1.5 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Environment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[
              { icon: Thermometer, label: "CPU Temperature", value: "42.3 C" },
              { icon: Wifi, label: "Network Latency", value: "12ms" },
              { icon: Server, label: "API Response Time", value: "145ms" },
              { icon: ShieldCheck, label: "Last Security Scan", value: "2 hours ago" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
