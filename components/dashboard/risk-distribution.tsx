import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const riskLevels = [
  {
    level: "Low Risk",
    count: 842,
    total: 1248,
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-500/10",
    percentage: 67,
  },
  {
    level: "Medium Risk",
    count: 299,
    total: 1248,
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgColor: "bg-amber-500/10",
    percentage: 24,
  },
  {
    level: "High Risk",
    count: 107,
    total: 1248,
    color: "bg-red-600",
    textColor: "text-red-700",
    bgColor: "bg-red-600/10",
    percentage: 9,
  },
]

export function RiskDistribution() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Risk Level Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {riskLevels.map((risk) => (
          <div key={risk.level} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-3 w-3 rounded-full ${risk.color}`} />
                <span className="text-sm font-medium text-foreground">
                  {risk.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${risk.bgColor} ${risk.textColor}`}>
                  {risk.count}
                </span>
                <span className="text-xs text-muted-foreground">
                  {risk.percentage}%
                </span>
              </div>
            </div>
            <Progress value={risk.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
