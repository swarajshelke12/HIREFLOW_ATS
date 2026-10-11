"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  FileCheck, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import GlassmorphismCta from "@/components/ui/glassmorphism-cta";
import { SubmissionReceipt } from "@/lib/types";
import confetti from "canvas-confetti";

interface ApplicationSuccessProps {
  receipt: SubmissionReceipt;
  onReset: () => void;
}

export function ApplicationSuccess({ receipt, onReset }: ApplicationSuccessProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger celebratory particle burst on initial render
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 100,
    });
  }, []);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(receipt.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 text-white shadow-[0_24px_64px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-400 space-y-8">
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-pulse">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" strokeWidth={1.75} />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
          Application Received
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{receipt.candidateName}</strong>. Your application for{" "}
          <span className="text-blue-400 font-medium">{receipt.roleTitle}</span> is now active in our intake engine.
        </p>
      </div>

      {/* Submission Receipt Box */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
              Tracking Reference Code
            </span>
            <div className="text-xl font-mono font-bold text-white tracking-wider flex items-center gap-2 mt-0.5">
              <span>{receipt.referenceId}</span>
              <button
                type="button"
                onClick={handleCopyReference}
                aria-label="Copy tracking reference code"
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono">
              Status: In Review
            </span>
          </div>
        </div>

        {/* Candidate Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-gray-400">Candidate Email:</span>
            <p className="font-mono text-gray-200 mt-0.5 font-medium">{receipt.email}</p>
          </div>
          <div>
            <span className="text-gray-400">Phone Contact:</span>
            <p className="font-mono text-gray-200 mt-0.5 font-medium">{receipt.phone}</p>
          </div>
          <div>
            <span className="text-gray-400">Ingested At:</span>
            <p className="font-mono text-gray-200 mt-0.5">{receipt.submittedAt}</p>
          </div>
          <div>
            <span className="text-gray-400">Expected Turnaround:</span>
            <p className="font-mono text-emerald-400 mt-0.5 font-medium">{receipt.estimatedReviewTime}</p>
          </div>
        </div>
      </div>

      {/* Next Steps Roadmap */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          What Happens Next
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-blue-400 font-semibold">01 · Autonomous Scan</span>
            <p className="text-xs text-gray-300">
              Gemini &amp; Groq extract technical competencies and profile highlights.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-blue-400 font-semibold">02 · Team Sync</span>
            <p className="text-xs text-gray-300">
              Hiring managers review matched profiles within 24–48 hours.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-blue-400 font-semibold">03 · Direct Feedback</span>
            <p className="text-xs text-gray-300">
              Clear next steps and interview scheduling via verified email.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <GlassmorphismCta
          label="Submit Another Application"
          avatarSrc=""
          avatarAlt=""
          shimmerColor="rgba(34,197,94,0.6)"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onReset();
          }}
          className="shadow-[0_8px_40px_rgba(34,197,94,0.25)] hover:shadow-[0_0_40px_8px_rgba(34,197,94,0.35)]"
        />
      </div>
    </div>
  );
}
