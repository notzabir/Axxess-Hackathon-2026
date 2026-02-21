import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          CareBot AI system configuration and preferences.
        </p>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold">General</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            { label: "System Name", value: "CareBot AI - Unit #1" },
            { label: "Version", value: "1.0.0-hackathon" },
            { label: "Environment", value: "Demo" },
            { label: "Region", value: "US - Dallas, TX" },
          ].map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
              {index < 3 && <Separator className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold">AI Triage Engine</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            { label: "Model", value: "GPT-4 Medical" },
            { label: "Language Support", value: "English, Spanish, Mandarin, French" },
            { label: "Risk Threshold (High)", value: "0.75" },
            { label: "Auto-Escalation", value: "Enabled" },
          ].map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.value === "Enabled" ? (
                  <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-0">
                    {item.value}
                  </Badge>
                ) : (
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                )}
              </div>
              {index < 3 && <Separator className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
