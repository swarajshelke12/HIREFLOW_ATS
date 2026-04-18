# 🚀 HireFlow: AI-Powered Applicant Tracking System (ATS)

**HireFlow** is an intelligent recruitment automation platform designed to eliminate manual resume screening. It uses Large Language Models (LLMs) and Optical Character Recognition (OCR) to analyze resumes, score candidates based on semantic fit, and automate communication.

![HireFlow Dashboard](https://via.placeholder.com/800x400?text=HireFlow+Dashboard+Screenshot)
*(Note: Upload a screenshot of your 3D Robot Interface here later!)*

## 🌟 Key Features
- **3D Interactive Portal:** A visually stunning candidate application portal built with **Next.js 14** and **Spline 3D**.
- **Universal Resume Parsing:** Automatically extracts text from **PDFs** and **Scanned Images** using specialized AI agents.
- **Contextual AI Scoring:** Evaluates candidates on "Transferable Skills" and "Potential" (0-100 Score) using **Google Gemini** & **Groq (Llama 3)**.
- **Automated Feedback Loop:** Sends personalized, constructive rejection emails citing specific technical gaps for candidates scoring <45.
- **Human-in-the-Loop:** Integrated "Wait for Approval" workflow ensures HR validates critical decisions before emails are sent.

## 🛠️ Tech Stack

### **Frontend (The Experience)**
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **3D Effects:** Spline 3D (`@splinetool/react-spline`)
- **Animations:** Framer Motion

### **Backend & AI (The Brains)**
- **Orchestration:** n8n (Workflow Automation)
- **AI Models:** Google Gemini 1.5 Pro (Vision) & Llama 3 (via Groq)
- **Database:** Google Sheets (Real-time Data Sync)
- **Communication:** Gmail SMTP Server

## ⚙️ System Architecture
1. **Candidate Portal:** User uploads resume (Drag & Drop) via the Next.js frontend.
2. **Secure Webhook:** Data is sent to the private n8n webhook.
3. **Router:** Workflow splits based on file type (PDF vs. Image).
4. **AI Analysis:**
   - **OCR Agent:** Extracts text from images.
   - **Analysis Agent:** Evaluates text against the "Talent Scout" system prompt.
5. **Decision Engine:**
   - Score > 80: Mark for Interview.
   - Score < 45: Draft Rejection Email.
6. **Output:** Data saved to Sheets; Email sent upon Human Approval.
