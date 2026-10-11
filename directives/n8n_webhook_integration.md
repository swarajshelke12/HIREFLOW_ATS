# SOP: n8n Webhook & AI Pipeline Integration

## 1. Webhook Configuration
- **Default Endpoint:** `https://overtensely-polygynous-emilee.ngrok-free.dev/webhook-test/hireflow-apply`
- **Configurable Via:** `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`
- **HTTP Method:** `POST`

- **Content Type:** `multipart/form-data`

## 2. Downstream Workflow Architecture & JSON Template
The master n8n workflow definition is tracked in the repository at:
`workflows/HIREFLOW_ATS.json`

### Pipeline Node Overview (32 nodes):
1. **Webhook Ingestion (`hireflow-apply`):** Captures candidate name, email, phone, and binary resume file.
2. **Cloud Storage Pipeline (Google Drive):**
   - Uploads candidate resume to target Google Drive folder ("Resumes of candidates").
   - Fetches web view link for recruiter review.
3. **Dual OCR & Text Normalization:**
   - **PDF Pathway:** Extracts raw text via `Extract from PDF`.
   - **Image / Vision Fallback:** If text is insufficient or input is an image, routes to Google Gemini Vision (`models/gemini-2.5-flash`) or OCR.space API fallback.
4. **AI Evaluation Agent (Groq LPU):**
   - Model: `openai/gpt-oss-20b` via Groq Chat Model.
   - Strict 3-dimensional evaluation: Technical Proficiency (0–40), Communication & Design Sense (0–30), Builder Mindset (0–30).
   - Structured JSON response: candidate score, recommendation (`Interview` / `Review` / `Reject`), key insights, and polite constructive feedback.
5. **Multi-Bucket Triage & Google Sheets Persistence:**
   - Appends all applicants to master "All candidates" sheet.
   - Splits by recommendation into "Interview candidates", "Review candidates", and "Rejected candidates".
6. **Automated Candidate & Team Notifications (Gmail):**
   - Selected candidates receive automated interview invitation with Calendly booking link.
   - Internal hiring team receives instant rich HTML candidate notification card.
   - "Review" candidates trigger a `sendAndWait` interactive decision approval email to hiring manager before finalizing status.
   - Rejected candidates receive constructive, encouraging feedback without score exposure.

## 3. How to Import the Workflow in n8n
1. Open your n8n workspace (cloud or local: `http://localhost:5678`).
2. Navigate to **Workflows** in the sidebar.
3. Click the **three dots menu (⋮)** or dropdown at the top right, and select **"Import from File..."** (or drag and drop).
4. Select `workflows/HIREFLOW_ATS.json` from this repository.
5. Configure the following connected credentials in n8n:
   - **Google Drive OAuth2** (credential: `GD Swaraj 1` or your team account)
   - **Google Sheets OAuth2** (credential: `GS swaraj` or your team account)
   - **Gmail OAuth2** (credential: `Swaraj Gmail` or your recruitment email)
   - **Google Gemini (PaLM) API** (`models/gemini-2.5-flash`)
   - **Groq API** (`Groq api` with an active Groq API key)
6. Ensure your Google Sheet ID and Drive Folder ID match your organization's storage.
7. Copy the production/test Webhook URL from the `Webhook` node and set it as `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`.
8. Click **Save** and toggle the workflow to **Active**.

## 4. Error Handling
- In non-production testing, if n8n is inactive or returns non-200 status, the client displays: `System busy. Make sure backend is active.`
