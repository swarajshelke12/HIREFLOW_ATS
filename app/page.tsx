"use client";

import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline";
import { Navbar } from "@/components/ui/navbar";
import { CandidateForm } from "@/components/ui/candidate-form";
import { ApplicationSuccess } from "@/components/ui/application-success";
import { SubmissionReceipt } from "@/lib/types";

export default function CandidatePortal() {
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  return (
    <main className="min-h-[100dvh] w-full bg-[#07080d] text-white relative flex flex-col justify-between overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Ambient Lighting */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-96 fixed pointer-events-none opacity-80" fill="white" />
      <Spotlight className="top-1/2 -right-40 fixed pointer-events-none opacity-30" fill="#3b82f6" />

      {/* 3D Scene Backdrop */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-60 md:opacity-75 scale-100 md:scale-115 transition-opacity duration-1000"
      >
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Candidate Application Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 pt-24 sm:pt-28 pb-12 flex-1 flex flex-col justify-center items-center">
        {receipt ? (
          <ApplicationSuccess receipt={receipt} onReset={() => setReceipt(null)} />
        ) : (
          <CandidateForm onSuccess={(newReceipt) => setReceipt(newReceipt)} />
        )}
      </div>

      {/* Clean Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md py-5 px-4 text-center text-xs text-gray-500">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <p className="font-mono text-[11px]">&copy; HireFlow Career Portal</p>
          <span className="font-mono text-[11px] text-gray-400">Secure Intake</span>
        </div>
      </footer>
    </main>
  );
}