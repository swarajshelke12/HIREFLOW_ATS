# SOP: Candidate Intake Flow & Validation Engine

## 1. Objective
Provide a fast, distraction-free, high-converting public application form for candidates applying to open roles.

## 2. Invariants & Rules
- **Name:** Required legal candidate name.
- **Phone:** Localized digit length matching selected country (`+91` -> 10, `+86` -> 11, etc.).
- **Email:** Standard RFC email validation.
- **Resume File:** PDF (max 5MB) or Image (max 1MB).
- **Simplicity:** Zero backend architecture or internal workflow jargon on public-facing forms.

## 3. Webhook Dispatch Protocol
- Transmit payload via `multipart/form-data`: `name`, `phone`, `email`, `resume`.
- On success: render `ApplicationSuccess` receipt with reference code (`HF-[A-Z0-9]{5}`) and celebratory confetti burst.
