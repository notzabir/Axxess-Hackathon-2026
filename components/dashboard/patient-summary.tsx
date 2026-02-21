import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const patientData = {
  chiefComplaint: "Persistent chest tightness with shortness of breath",
  symptoms: [
    "Chest tightness",
    "Shortness of breath",
    "Mild dizziness",
    "Fatigue",
  ],
  duration: "3 days",
  severity: "High",
  suggestedAction: "Immediate physician review. Recommend ECG and blood work. Monitor vitals continuously.",
}

export function PatientSummary() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Structured Patient Summary
          </CardTitle>
          <Badge variant="destructive" className="text-xs">
            High Severity
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Chief Complaint
          </p>
          <p className="mt-1 text-sm text-foreground">
            {patientData.chiefComplaint}
          </p>
        </div>
        <Separator />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Symptoms
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {patientData.symptoms.map((symptom) => (
              <Badge key={symptom} variant="secondary" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Duration
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {patientData.duration}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Severity
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <p className="text-sm font-medium text-foreground">
                {patientData.severity}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Suggested Action
          </p>
          <div className="mt-2 rounded-lg bg-primary/5 p-3 text-sm leading-relaxed text-foreground">
            {patientData.suggestedAction}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
