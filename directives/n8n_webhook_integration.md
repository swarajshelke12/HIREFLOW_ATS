# SOP: n8n Webhook & AI Pipeline Integration

## 1. Webhook Configuration
- **Default Endpoint:** `http://localhost:5678/webhook-test/hireflow-apply`
- **Configurable Via:** `NEXT_PUBLIC_N8N_WEBHOOK_URL` in `.env.local`
- **HTTP Method:** `POST`
- **Content Type:** `multipart/form-data`

## 2. Downstream Workflow Architecture
1. **Webhook Ingestion Node:** Captures the candidate's form fields and binary resume file.
2. **Google Gemini Vision / OCR Node:** Extracts candidate work history, education, skills, and summary.
3. **Groq LPU Scoring Node:** Scores applicant alignment against the job description using ultra-fast LLM inference.
4. **Google Sheets / Notion Destination:** Persists candidate records and scores for recruiter review.

## 3. Error Handling
- In non-production testing, if n8n is inactive or returns non-200 status, the client displays: `System busy. Make sure n8n is active.`
