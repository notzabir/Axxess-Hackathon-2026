import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Radio, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Patients",
    value: "1,248",
    change: "+12 today",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Active Sessions",
    value: "18",
    change: "3 in triage",
    icon: Radio,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "High Risk Alerts",
    value: "7",
    change: "2 critical",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "System Status",
    value: "Online",
    change: "99.8% uptime",
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-500/10",
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
