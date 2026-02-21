import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const logs = [
  { id: "LOG-1021", patientId: "PT-4821", type: "Voice Triage", duration: "4m 32s", risk: "High", timestamp: "2025-02-14 09:42 AM" },
  { id: "LOG-1020", patientId: "PT-4820", type: "Voice Triage", duration: "3m 15s", risk: "Low", timestamp: "2025-02-14 09:28 AM" },
  { id: "LOG-1019", patientId: "PT-4819", type: "Follow-up", duration: "2m 50s", risk: "Medium", timestamp: "2025-02-14 09:15 AM" },
  { id: "LOG-1018", patientId: "PT-4818", type: "Voice Triage", duration: "5m 02s", risk: "Low", timestamp: "2025-02-14 08:53 AM" },
  { id: "LOG-1017", patientId: "PT-4817", type: "Emergency", duration: "1m 45s", risk: "High", timestamp: "2025-02-14 08:41 AM" },
  { id: "LOG-1016", patientId: "PT-4816", type: "Voice Triage", duration: "3m 28s", risk: "Medium", timestamp: "2025-02-14 08:22 AM" },
]

function getRiskBadge(risk: string) {
  switch (risk) {
    case "High":
      return <Badge className="bg-red-600/10 text-red-700 hover:bg-red-600/20 border-0">{risk}</Badge>
    case "Medium":
      return <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-0">{risk}</Badge>
    case "Low":
      return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-0">{risk}</Badge>
    default:
      return <Badge variant="secondary">{risk}</Badge>
  }
}

export default function LogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
          Interaction Logs
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete history of all CareBot patient interactions.
        </p>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold">All Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Log ID</TableHead>
                <TableHead className="text-xs">Patient</TableHead>
                <TableHead className="hidden text-xs sm:table-cell">Type</TableHead>
                <TableHead className="hidden text-xs md:table-cell">Duration</TableHead>
                <TableHead className="text-xs">Risk</TableHead>
                <TableHead className="hidden text-xs lg:table-cell">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm font-medium">{log.id}</TableCell>
                  <TableCell className="text-sm">{log.patientId}</TableCell>
                  <TableCell className="hidden text-sm sm:table-cell">{log.type}</TableCell>
                  <TableCell className="hidden text-sm md:table-cell">{log.duration}</TableCell>
                  <TableCell>{getRiskBadge(log.risk)}</TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
