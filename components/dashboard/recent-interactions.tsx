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

const interactions = [
  {
    patientId: "PT-4821",
    riskLevel: "High",
    language: "English",
    timestamp: "2025-02-14 09:42 AM",
    status: "Completed",
  },
  {
    patientId: "PT-4820",
    riskLevel: "Low",
    language: "Spanish",
    timestamp: "2025-02-14 09:28 AM",
    status: "Completed",
  },
  {
    patientId: "PT-4819",
    riskLevel: "Medium",
    language: "English",
    timestamp: "2025-02-14 09:15 AM",
    status: "In Review",
  },
  {
    patientId: "PT-4818",
    riskLevel: "Low",
    language: "Mandarin",
    timestamp: "2025-02-14 08:53 AM",
    status: "Completed",
  },
  {
    patientId: "PT-4817",
    riskLevel: "High",
    language: "English",
    timestamp: "2025-02-14 08:41 AM",
    status: "Escalated",
  },
  {
    patientId: "PT-4816",
    riskLevel: "Medium",
    language: "French",
    timestamp: "2025-02-14 08:22 AM",
    status: "Completed",
  },
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

function getStatusBadge(status: string) {
  switch (status) {
    case "Completed":
      return <Badge variant="secondary" className="text-xs">{status}</Badge>
    case "In Review":
      return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-0 text-xs">{status}</Badge>
    case "Escalated":
      return <Badge className="bg-red-600/10 text-red-700 hover:bg-red-600/20 border-0 text-xs">{status}</Badge>
    default:
      return <Badge variant="secondary" className="text-xs">{status}</Badge>
  }
}

export function RecentInteractions() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recent Interactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Patient ID</TableHead>
              <TableHead className="text-xs">Risk Level</TableHead>
              <TableHead className="hidden text-xs sm:table-cell">Language</TableHead>
              <TableHead className="hidden text-xs md:table-cell">Timestamp</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions.map((interaction) => (
              <TableRow key={interaction.patientId}>
                <TableCell className="text-sm font-medium">
                  {interaction.patientId}
                </TableCell>
                <TableCell>{getRiskBadge(interaction.riskLevel)}</TableCell>
                <TableCell className="hidden text-sm sm:table-cell">
                  {interaction.language}
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {interaction.timestamp}
                </TableCell>
                <TableCell>{getStatusBadge(interaction.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
