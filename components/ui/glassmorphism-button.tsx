import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassmorphismButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Content inside the button (text, icons, spinner, etc.) */
  children: ReactNode;
  /** Gradient spread angle for the shimmer border */
  spread?: string;
  /** Color of the shimmer sweep */
  shimmerColor?: string;
  /** Duration of one full shimmer rotation */
  speed?: string;
  /** Inner background color (supports alpha for glass effect) */
  innerBg?: string;
  /** Glow color for hover shadow */
  glowColor?: string;
};

/**
 * A glassmorphism-styled button with animated shimmer border.
 * Drop-in replacement for <button> with a premium glass aesthetic.
 */
export default function GlassmorphismButton({
  children,
  spread = "90deg",
  shimmerColor = "rgba(99,130,255,0.6)",
  speed = "4s",
  innerBg = "rgba(10, 11, 20, 0.85)",
  glowColor = "rgba(99,130,255,0.35)",
  className,
  disabled,
  ...props
}: GlassmorphismButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "group isolate relative inline-flex cursor-pointer overflow-hidden transition-all duration-300 rounded-xl w-full",
        !disabled && "hover:scale-[1.02] hover:shadow-[0_0_40px_8px_var(--glow-color)] active:scale-[0.98]",
        disabled && "opacity-50 cursor-not-allowed",
        "shadow-[0_8px_40px_rgba(99,130,255,0.2)]",
        className,
      )}
      style={
        {
          "--spread": spread,
          "--shimmer-color": shimmerColor,
          "--radius": "0.75rem",
          "--speed": speed,
          "--cut": "1px",
          "--bg": "rgba(255, 255, 255, 0.05)",
          "--glow-color": glowColor,
        } as CSSProperties
      }
      {...props}
    >
      {/* Rotating shimmer border */}
      <div className="absolute inset-0">
        <div className="absolute inset-[-200%] w-[400%] h-[400%] [animation:rotate-gradient_var(--speed)_linear_infinite]">
          <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>

      {/* Glass fill */}
      <div className="absolute rounded-xl [background:var(--bg)] [inset:var(--cut)] backdrop-blur" />

      {/* Inner beam rotation */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "200%",
          height: "200%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), rgba(255,255,255,0.12), transparent)",
          animation: "borderBeamRotation 4s infinite linear",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Solid dark glass interior */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "1px",
          background: innerBg,
          borderRadius: "calc(0.75rem - 1px)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2 w-full py-4 px-6 text-white font-bold text-lg">
        {children}
      </span>
    </button>
  );
}
