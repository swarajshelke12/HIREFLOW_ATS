"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Copy, Check } from "lucide-react";
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
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 text-white shadow-2xl text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.25)]">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Application Received
        </h1>
        <p className="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
          Thank you, <strong className="text-white">{receipt.candidateName}</strong>! Your application for{" "}
          <span className="text-blue-400 font-medium">{receipt.roleTitle}</span> has been successfully submitted. We will review your profile and reach out via email.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs flex items-center justify-between">
        <div className="text-left">
          <span className="text-gray-400 block text-[11px]">Application Reference</span>
          <span className="font-mono font-bold text-white text-sm">{receipt.referenceId}</span>
        </div>
        <button
          type="button"
          onClick={handleCopyReference}
          aria-label="Copy reference code"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="pt-2 flex justify-center">
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
