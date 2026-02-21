import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bot, Battery, Thermometer, Clock } from "lucide-react"

export function RobotStatus() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Robot Status
          </CardTitle>
          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-700">Online</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-4 rounded-lg bg-secondary/50 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">CareBot Unit #1</p>
            <p className="text-xs text-muted-foreground">Raspberry Pi 4 Model B</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Battery className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Battery</span>
                <span className="text-sm font-medium text-foreground">78%</span>
              </div>
              <Progress value={78} className="mt-1.5 h-2" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Temperature</span>
            </div>
            <span className="text-sm font-medium text-foreground">42.3 C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Last Interaction</span>
            </div>
            <span className="text-sm font-medium text-foreground">2 min ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
