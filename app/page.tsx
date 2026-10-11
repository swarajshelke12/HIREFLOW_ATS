"use client";

import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline";
import { Navbar } from "@/components/ui/navbar";
import { JobDossier } from "@/components/ui/job-dossier";
import { CandidateForm } from "@/components/ui/candidate-form";
import { ApplicationSuccess } from "@/components/ui/application-success";
import { SubmissionReceipt } from "@/lib/types";

/**
 * Design Read (per design-taste-frontend):
 * Reading this as: High-craft AI ATS Candidate Intake Portal for technical specialists,
 * with an obsidian aerospace language, leaning toward Tailwind v4 + glass physics + tactile micro-interactions.
 * Dials: DESIGN_VARIANCE: 7 | MOTION_INTENSITY: 6 | VISUAL_DENSITY: 5
 */

export default function CandidatePortal() {
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  return (
    <main className="min-h-[100dvh] w-full bg-[#07080d] text-white relative flex flex-col justify-between overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Dynamic Ambient Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-96 fixed pointer-events-none opacity-80" fill="white" />
      <Spotlight className="top-1/2 -right-40 fixed pointer-events-none opacity-30" fill="#3b82f6" />

      {/* Persistent Spline 3D Scene Backdrop */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-60 md:opacity-75 scale-100 md:scale-115 transition-opacity duration-1000"
      >
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Floating Glass Navigation Header */}
      <Navbar />

      {/* Main Interactive Work Area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 flex-1 flex flex-col justify-center">
        {receipt ? (
          <ApplicationSuccess receipt={receipt} onReset={() => setReceipt(null)} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Role Dossier & Hiring Roadmap */}
            <div className="lg:col-span-7">
              <JobDossier />
            </div>

            {/* Right Column: High-Precision Candidate Intake Console */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <CandidateForm onSuccess={(newReceipt) => setReceipt(newReceipt)} />
            </div>
          </div>
        )}
      </div>

      {/* Clean Engineering Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md py-6 px-4 text-center text-xs text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px]">
            &copy; 2026 HIREFLOW ATS Inc. Autonomous Candidate Orchestration.
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-gray-400">
            <span className="hover:text-gray-300 transition-colors">SOC2 Type II Certified</span>
            <span>&middot;</span>
            <span className="hover:text-gray-300 transition-colors">Privacy Shield</span>
            <span>&middot;</span>
            <span className="text-emerald-400 font-medium">99.99% Systems Uptime</span>
          </div>
        </div>
      </footer>
    </main>
  );
}