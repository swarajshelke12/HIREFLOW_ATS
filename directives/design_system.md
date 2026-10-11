# SOP: HireFlow ATS Design System & Component Guidelines

## 1. Aesthetic POV
Clean, dark obsidian candidate application portal with glassmorphic cards and subtle 3D lighting.
- **Dial Values:**
  - `DESIGN_VARIANCE: 4` (Clean centered application card)
  - `MOTION_INTENSITY: 4` (Subtle button shimmer, particle confetti)
  - `VISUAL_DENSITY: 3` (Airy, focused input form)
- **Palette:** `#07080d` obsidian background, `rgba(255, 255, 255, 0.1)` hairline borders, `#3b82f6` electric blue accent.

## 2. Active Components
1. **`Navbar` (`components/ui/navbar.tsx`):** Minimal brand header with secure intake indicator.
2. **`CandidateForm` (`components/ui/candidate-form.tsx`):** Clean public job application form with localized phone selector and drag-and-drop resume upload.
3. **`ApplicationSuccess` (`components/ui/application-success.tsx`):** Friendly confirmation screen with reference code and reset trigger.
4. **`GlassmorphismButton` & `GlassmorphismCta`:** Tactile shimmer buttons with hover and active states.
5. **`SplineScene` & `Spotlight`:** Ambient 3D backdrop and lighting.
