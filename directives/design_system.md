# SOP: HireFlow ATS Design System & Component Guidelines

## 1. Aesthetic POV & Foundations
HireFlow uses an **Obsidian Aerospace Glassmorphic** visual identity tailored for high-agency engineers and AI specialists.
- **Dial Values:**
  - `DESIGN_VARIANCE: 7` (Asymmetric 12-column responsive layout, Job Dossier + Candidate Console)
  - `MOTION_INTENSITY: 6` (Rotating conic gradient borders, backdrop blurs, spotlight lighting, and particle confetti physics)
  - `VISUAL_DENSITY: 5` (Balanced technical density with crisp typography, mono counters, and clear step indicators)
- **Palette Lock:**
  - Base: `#07080d` obsidian dark background, `rgba(255, 255, 255, 0.08)` hairline borders.
  - Accent: Single electric blue accent (`#3b82f6` / `rgb(59, 130, 246)`), emerald status pills (`#10b981`).
  - Strict Rule: No AI-purple gradients or unmotivated multi-color slop.

## 2. Core Components
1. **`Navbar` (`components/ui/navbar.tsx`):**
   - Floating glass container with live intake pipeline pulse, security SLA badge, and responsive collapse.
2. **`JobDossier` (`components/ui/job-dossier.tsx`):**
   - Left-column role spec displaying opening details, mission scope, stack tags, and 4-step hiring journey timeline.
3. **`CandidateForm` (`components/ui/candidate-form.tsx`):**
   - Interactive intake console with 4-step live progress bar, localized 10-country phone length enforcement, instant validation indicators, and drag-and-drop resume upload zone with remove action.
4. **`ApplicationSuccess` (`components/ui/application-success.tsx`):**
   - Confirmation receipt displaying copyable tracking reference code (`HF-2026-XXXXX`), candidate details recap, and 3-step next actions roadmap.
5. **`GlassmorphismButton` & `GlassmorphismCta`:**
   - Shimmer-bordered CTA components with hover glows and active tactile feedback.

## 3. Accessibility & Performance Guardrails
- **WCAG AA Contrast:** High-contrast text labels, light placeholders, and distinct focus rings.
- **Zero Scroll Jank:** Avoid continuous window scroll listeners; use hardware-accelerated transforms and opacity.
- **Viewport Stability:** Use `min-h-[100dvh]` rather than jumpy `h-screen`.
- **Keyboard Navigation:** Native accessibility tags (`htmlFor`, `id`, `name`, `autoComplete`, `role="alert"`).
