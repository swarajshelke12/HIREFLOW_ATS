# SOP: Candidate Intake Flow & Validation Engine

## 1. Objective
Ensure that candidate submissions ingested through the HireFlow ATS portal are strictly validated on the client before dispatch to downstream n8n webhook nodes.

## 2. Invariants & Rules
- **Name:** Required non-empty string.
- **Phone:** Must match exact digit length dictated by the active country selector (`+91` -> 10 digits, `+86` -> 11 digits, etc.).
- **Email:** Must pass RFC/standard pattern validation (`^[^\s@]+@[^\s@]+\.[^\s@]+$`).
- **Resume File:**
  - PDF format: Maximum 5MB (`5,000,000` bytes).
  - Image formats (JPG/PNG): Maximum 1MB (`1,000,000` bytes).
  - All other formats are rejected with an explicit user error.

## 3. Webhook Dispatch Protocol
- Transmit payload via `multipart/form-data` with fields: `name`, `phone`, `email`, `resume`.
- Handle n8n offline or network errors by alerting the candidate to verify webhook server connectivity.
