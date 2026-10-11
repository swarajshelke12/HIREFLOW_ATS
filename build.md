# HIREFLOW ATS - Project Specification & State Index (`build.md`)

> **Single Source of Truth (SSOT)** for AI Agents and Developers.  
> *Engine: Next.js 16.1.1 (Turbopack) & React 19.2 | Type System: TypeScript 5.x*  
> *Design System: Obsidian Glassmorphism (Focused Candidate Intake Form)*  
> *Last Updated: October 2026 (Ponytail Lean Simplification Applied)*

---

## 1. Executive Summary & Core Mission
**HIREFLOW** is a sleek, distraction-free candidate application portal designed for public job applications. It features:
- **Focused Public Application UX:** Dedicated single-column form with zero backend jargon or developer clutter.
- **Strict 10-Country Phone Enforcement:** Localized digit limits for top Asian and European employment hubs.
- **Dual-Mode Resume Upload:** Drag-and-drop & native file picker supporting PDF documents (up to 5MB) and images (up to 1MB).
- **Interactive 3D Visuals:** Spline 3D real-time canvas backdrop and SVG Spotlights.
- **Confirmation & Celebration:** Immediate feedback with unique application reference ID and particle confetti.

---

## 2. Architecture & 3-Layer System Design

```
HIREFLOW Root
│
├── app/
│   ├── layout.tsx                     -> Root HTML shell, Geist font variables, ATS metadata & SEO tags
│   ├── globals.css                    -> Obsidian dark tokens, precision scrollbars, keyframe animations
│   └── page.tsx                       -> CandidatePortal: Centered focused application form container
│
├── components/
│   └── ui/
│       ├── navbar.tsx                 -> Minimal brand header with secure intake badge
│       ├── candidate-form.tsx         -> Clean public job application form with phone validation & dropzone
│       ├── application-success.tsx    -> Friendly confirmation screen with reference code & reset action
│       ├── spline.tsx                 -> Lazy-loaded SplineScene with Suspense boundary
│       ├── spotlight.tsx              -> High-performance SVG blur spotlight backdrop
│       ├── glassmorphism-cta.tsx      -> Shimmer-bordered CTA button with rotating gradient & glow
│       └── glassmorphism-button.tsx   -> Reusable glassmorphic button for form submit
│
├── lib/
│   ├── types.ts                       -> Minimal TypeScript contracts (CountryConfig, SubmissionReceipt)
│   └── utils.ts                       -> Utility helpers (cn class merging with clsx + twMerge)
│
├── directives/                        -> Layer 1: SOPs & Operational Directives for AI Agents
│   ├── candidate_intake.md            -> Intake rules, boundary constraints, and submission flow
│   ├── design_system.md              -> Aesthetic rules, dial values, palette locks, and component guidelines
│   ├── n8n_webhook_integration.md     -> Webhook contract, downstream AI parser, and retry strategies
│   ├── spline_3d_assets.md            -> Spline WebGL canvas runtime, positioning & fallback guidelines
│   └── maintain_build_spec.md         -> SOP for auto-updating build.md on every code modification
│
├── execution/                         -> Layer 3: Deterministic Execution Scripts
│   ├── validate_inputs.ts             -> Test suite for 10-country phone lengths, email & receipts
│   └── verify_build_spec.ts           -> Integrity checker ensuring build.md matches codebase reality
│
├── workflows/                         -> Team Automation Workflows
│   └── HIREFLOW_ATS.json              -> Master n8n workflow export (32 nodes) for resume intake & AI review
│
├── .env.example                       -> Environment variable schema template
├── next.config.ts                     -> Turbopack workspace root resolution & Next.js config
├── tsconfig.json                      -> TypeScript paths (@/*) and compilation settings
├── package.json                       -> Project scripts and dependencies
└── eslint.config.mjs                  -> Next.js 16 core web vitals and TypeScript lint configuration
```

---

## 3. Tech Stack & Dependency Matrix

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.1.1` (Turbopack) | App Router, Server/Client components, SSR & SSG |
| **React** | `19.2.3` | Core UI engine, React 19 concurrent features |
| **TypeScript** | `5.x` | Strict type safety and schema validation |
| **Tailwind CSS** | `4.x` | Modern styling engine with native `@theme` directives |
| **lucide-react** | `^1.x` | SVG iconography (`Send`, `Upload`, `FileText`, `X`, `ShieldCheck`) |
| **@splinetool/react-spline** | `4.1.0` | Interactive 3D robot/space scene integration |
| **@splinetool/runtime** | `1.12.28` | WebGL runtime for Spline scenes |
| **canvas-confetti** | `1.9.4` | Particle celebration physics upon application receipt |
| **clsx & tailwind-merge** | `2.1.1` / `3.4.0` | Conflict-free conditional CSS utility concatenation |

---

## 4. Input Validation & Country Constraints Matrix

| Country | Code | Label | Flag | Max Length | Placeholder Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **India** | `+91` | `IN (+91)` | 🇮🇳 | 10 digits | `98765 43210` |
| **China** | `+86` | `CN (+86)` | 🇨🇳 | 11 digits | `139 1234 5678` |
| **Japan** | `+81` | `JP (+81)` | 🇯🇵 | 10 digits | `90 1234 5678` |
| **Singapore** | `+65` | `SG (+65)` | 🇸🇬 | 8 digits | `8123 4567` |
| **UAE** | `+971` | `UAE (+971)` | 🇦🇪 | 9 digits | `50 123 4567` |
| **United Kingdom** | `+44` | `UK (+44)` | 🇬🇧 | 10 digits | `7700 900077` |
| **Germany** | `+49` | `DE (+49)` | 🇩🇪 | 11 digits | `151 23456789` |
| **Spain** | `+34` | `ES (+34)` | 🇪🇸 | 9 digits | `612 345 678` |
| **Italy** | `+39` | `IT (+39)` | 🇮🇹 | 10 digits | `312 345 6789` |
| **Netherlands** | `+31` | `NL (+31)` | 🇳🇱 | 9 digits | `6 12345678` |

---

## 5. Webhook Integration Contract & Workflow
- **Workflow Template File:** `workflows/HIREFLOW_ATS.json` (Import directly via n8n: *Workflows -> Import from File*)
- **Endpoint URL:** `process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://overtensely-polygynous-emilee.ngrok-free.dev/webhook-test/hireflow-apply"`
- **HTTP Method:** `POST`
- **Body Payload (`multipart/form-data`):**
  - `name`: Candidate full legal name (String)
  - `phone`: Country code + phone number (String, e.g. `+91 9876543210`)
  - `email`: Validated email address (String)
  - `resume`: Binary file payload (`File` object)
- **Downstream Operations:** Google Drive upload -> Dual OCR (PDF text extractor / Gemini Vision) -> Groq LLM scoring (`openai/gpt-oss-20b`) -> Google Sheets categorizer ("All", "Interview", "Review", "Reject") -> Automated Gmail confirmations & human-in-the-loop review approvals.

---

## 6. Ponytail Lean Engineering & Optimization Log
1. **Default Webhook Config:** Configured `https://overtensely-polygynous-emilee.ngrok-free.dev/webhook-test/hireflow-apply` as the primary default endpoint across form, `.env.example`, and `.env.local`.
2. **Removed Technical Jargon:** Stripped backend pipeline details, tech stack badges, and internal telemetry from the public form.
3. **Removed Dead Code:** Deleted unused `components/ui/card.tsx` and unused `JobDossier` component.
4. **Trimmed Types:** Removed 4 speculative unused TypeScript interfaces from `lib/types.ts`.
5. **Dropped Unused Dependency:** Uninstalled `tw-animate-css` in favor of native Tailwind CSS v4 keyframes.
6. **Deleted Redundant Directories:** Removed duplicate `.claude/` and `agent/` directories generated during skills addition.
7. **Unified Country Config:** `execution/validate_inputs.ts` now reuses `COUNTRY_CONFIG` directly from `candidate-form.tsx`.
8. **Master n8n Workflow Export:** Added `workflows/HIREFLOW_ATS.json` containing the full 32-node intake, dual OCR, Groq LLM evaluation, Google Drive/Sheets integration, and Gmail notification pipeline for team import.

