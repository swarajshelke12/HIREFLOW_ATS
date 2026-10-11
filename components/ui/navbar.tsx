import React from "react";
import { Sparkles, Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 max-w-xl mx-auto px-4 pointer-events-none">
      <nav 
        aria-label="Navigation"
        className="w-full flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <span className="text-base font-black tracking-tight uppercase text-white">
            Hire<span className="text-blue-500">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-medium text-gray-300">Secure Intake</span>
        </div>
      </nav>
    </header>
  );
}
