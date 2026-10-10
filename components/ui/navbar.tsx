import React from "react";
import { Shield, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 max-w-6xl mx-auto px-4 sm:px-6 pointer-events-none">
      <nav 
        aria-label="Main Navigation"
        className="w-full flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto transition-all duration-300 hover:border-white/20"
      >
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/40 border border-blue-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.25)]">
            <Sparkles className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black tracking-tight uppercase text-white font-sans">
              Hire<span className="text-blue-500">Flow</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-md">
              Intake Portal
            </span>
          </div>
        </div>

        {/* Live Pipeline Telemetry Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xs text-gray-300 font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden md:inline text-gray-400">Pipeline Status:</span>
          <span className="text-emerald-400 font-semibold">Active Intake</span>
        </div>

        {/* Security & Fast Response Badges */}
        <div className="hidden sm:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-200 transition-colors">
            <Shield className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.5} />
            <span className="font-mono text-[11px] tracking-tight">E2E Encrypted</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-gray-400 font-mono text-[11px]">
            SLA: <strong className="text-gray-200 font-semibold">&lt; 48h</strong>
          </span>
        </div>
      </nav>
    </header>
  );
}
