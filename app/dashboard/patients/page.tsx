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

const patients = [
  { id: "PT-4821", name: "John M.", age: 67, risk: "High", language: "English", lastVisit: "2025-02-14" },
  { id: "PT-4820", name: "Maria S.", age: 45, risk: "Low", language: "Spanish", lastVisit: "2025-02-14" },
  { id: "PT-4819", name: "Robert K.", age: 54, risk: "Medium", language: "English", lastVisit: "2025-02-14" },
  { id: "PT-4818", name: "Li Wei", age: 72, risk: "Low", language: "Mandarin", lastVisit: "2025-02-14" },
  { id: "PT-4817", name: "Emily R.", age: 38, risk: "High", language: "English", lastVisit: "2025-02-14" },
  { id: "PT-4816", name: "Pierre D.", age: 61, risk: "Medium", language: "French", lastVisit: "2025-02-14" },
  { id: "PT-4815", name: "Ana G.", age: 29, risk: "Low", language: "Spanish", lastVisit: "2025-02-13" },
  { id: "PT-4814", name: "James T.", age: 83, risk: "High", language: "English", lastVisit: "2025-02-13" },
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

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
            Patient Registry
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and review all registered patients.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {patients.length} patients
        </Badge>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base font-semibold">All Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Patient ID</TableHead>
                <TableHead className="text-xs">Name</TableHead>
                <TableHead className="hidden text-xs sm:table-cell">Age</TableHead>
                <TableHead className="text-xs">Risk</TableHead>
                <TableHead className="hidden text-xs md:table-cell">Language</TableHead>
                <TableHead className="hidden text-xs lg:table-cell">Last Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="text-sm font-medium">{patient.id}</TableCell>
                  <TableCell className="text-sm">{patient.name}</TableCell>
                  <TableCell className="hidden text-sm sm:table-cell">{patient.age}</TableCell>
                  <TableCell>{getRiskBadge(patient.risk)}</TableCell>
                  <TableCell className="hidden text-sm md:table-cell">{patient.language}</TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{patient.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
