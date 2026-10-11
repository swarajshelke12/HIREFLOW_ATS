# SOP: Candidate Intake Flow & Validation Engine

## 1. Objective
Ensure that candidate submissions ingested through the HireFlow ATS portal are strictly validated on the client with live feedback before dispatch to downstream n8n webhook nodes.

## 2. Invariants & Rules
- **Name:** Required legal string with at least 2 characters.
- **Phone:** Must match exact digit length dictated by the active country selector (`+91` -> 10 digits, `+86` -> 11 digits, etc.). Real-time digit counter displayed (`[N/maxLength]`).
- **Email:** Must pass standard RFC pattern validation (`^[^\s@]+@[^\s@]+\.[^\s@]+$`).
- **Resume File:**
  - PDF format: Maximum 5MB (`5,000,000` bytes).
  - Image formats (JPG/PNG): Maximum 1MB (`1,000,000` bytes).
  - Drag-and-drop active feedback with file type icon, formatted size, and direct remove action.
  - All other formats are rejected with an explicit user error.
- **Form Progress:** Real-time 4-step completion calculation (0% to 100%) with visual gradient indicator.

## 3. Webhook Dispatch Protocol
- Transmit payload via `multipart/form-data` with fields: `name`, `phone`, `email`, `resume`.
- Handle n8n offline or network errors by alerting the candidate gracefully.
- Upon successful dispatch:
  - Generate a unique tracking reference code (`HF-2026-[A-Z0-9]{5}`).
  - Render the `ApplicationSuccess` confirmation receipt with candidate recap and 3-step review roadmap.
  - Trigger celebratory particle confetti.
