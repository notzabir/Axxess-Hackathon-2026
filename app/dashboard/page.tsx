"use client";

import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RiskDistribution } from "@/components/dashboard/risk-distribution"
import { PatientSummary } from "@/components/dashboard/patient-summary"
import { RobotStatus } from "@/components/dashboard/robot-status"
import { RecentInteractions } from "@/components/dashboard/recent-interactions"
import VoiceComponent from "@/components/voice-component";
import { Mic } from "lucide-react";
import { useState } from "react";


export default function DashboardPage() {
  const [voiceOpen, setVoiceOpen] = useState(false);
  return (
    <>
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
     {/* Voice Widget (bottom-right) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-end">
        <div className="flex flex-col items-end">
          {voiceOpen && (
            <div className="mb-3">
              <VoiceComponent />
            </div>
          )}

          <button
            aria-label={voiceOpen ? "Close voice widget" : "Open voice widget"}
            onClick={() => setVoiceOpen(!voiceOpen)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md hover:scale-95 focus:outline-none"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
      </>
  )
}
