import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RiskDistribution } from "@/components/dashboard/risk-distribution"
import { PatientSummary } from "@/components/dashboard/patient-summary"
import { RobotStatus } from "@/components/dashboard/robot-status"
import { RecentInteractions } from "@/components/dashboard/recent-interactions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <OverviewCards />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientSummary />
        </div>
        <div className="flex flex-col gap-6">
          <RiskDistribution />
          <RobotStatus />
        </div>
      </div>
      <RecentInteractions />
    </div>
  )
}
