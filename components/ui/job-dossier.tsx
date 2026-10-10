import React from "react";
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers
} from "lucide-react";
import { HiringTimelineStep } from "@/lib/types";

const HIRING_PIPELINE: HiringTimelineStep[] = [
  {
    step: 1,
    title: "Application & Resume Parsing",
    timeframe: "Instant",
    description: "Multimodal ingestion through secure n8n webhook nodes.",
  },
  {
    step: 2,
    title: "AI Semantic Assessment",
    timeframe: "Within 24h",
    description: "Gemini token extraction & Groq LPU skill scoring matrix.",
  },
  {
    step: 3,
    title: "Systems Architecture Sync",
    timeframe: "45 mins",
    description: "Technical conversation focused on real-world automation challenges.",
  },
  {
    step: 4,
    title: "Final Offer & Fast Onboard",
    timeframe: "Day 3-5",
    description: "Direct alignment on compensation, equity, and starting roadmap.",
  },
];

const TECH_STACK = [
  "Next.js 16 (Turbopack)",
  "React 19",
  "TypeScript 5",
  "n8n Workflows",
  "Google Gemini 2.5",
  "Groq LPU Acceleration",
];

export function JobDossier() {
  return (
    <section 
      aria-label="Role Specification and Hiring Journey"
      className="w-full rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 text-white space-y-8 shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/15"
    >
      {/* Role Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400 tracking-wide">
            Priority Opening
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-300">
            Req #HF-2026-AI
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            AI &amp; Automation Specialist
          </h1>
          <p className="text-blue-400 text-sm font-medium mt-1 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Learning &amp; Design Systems Engineering
          </p>
        </div>

        {/* Quick Meta Pills */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>Full-time Core Role</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>Remote / Global Hybrid</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Flexible Hours (Async-first)</span>
          </div>
        </div>
      </div>

      {/* Role Overview */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-gray-400">
          Mission &amp; Scope
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Lead the architectural build-out of autonomous candidate evaluation workflows. You will design
          high-throughput n8n pipelines, fine-tune structured Gemini JSON extractors, and interface with Groq
          LPU inference engines to eliminate recruiting latency while maintaining strict human-in-the-loop fairness.
        </p>
      </div>

      {/* Tech Stack Chips */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          Primary Systems &amp; Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-gray-200 hover:border-blue-500/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Hiring Journey Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            Hiring Journey Pipeline
          </h2>
          <span className="text-[11px] font-mono text-gray-400">Average: 4 Days</span>
        </div>

        <div className="space-y-3">
          {HIRING_PIPELINE.map((item, index) => (
            <div 
              key={item.step} 
              className="relative flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                0{item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-mono text-gray-400 shrink-0">
                    {item.timeframe}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <span className="block text-lg font-bold text-white font-mono">&lt; 48h</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Review SLA</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <span className="block text-lg font-bold text-white font-mono">100%</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Feedback Rate</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <span className="block text-lg font-bold text-emerald-400 font-mono">SOC-2</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">E2E Privacy</span>
        </div>
      </div>
    </section>
  );
}
