# 🚀 HireFlow: AI-Powered Applicant Tracking System (ATS)

**HireFlow** is an intelligent recruitment automation platform designed to eliminate manual resume screening. It uses Large Language Models (LLMs) and Optical Character Recognition (OCR) to analyze resumes, score candidates based on semantic fit, and automate communication.

## 🌟 Key Features

- **3D Interactive Portal:** A visually stunning candidate application portal built with **Next.js 14** and **Spline 3D**.
- **Universal Resume Parsing:** Automatically extracts text from **PDFs** and **Scanned Images** using specialized AI agents.
- **Contextual AI Scoring:** Evaluates candidates on "Transferable Skills" and "Potential" (0-100 Score) using **Google Gemini** & **Groq (Llama 3)**.
- **Automated Feedback Loop:** Sends personalized, constructive rejection emails citing specific technical gaps for candidates scoring <45.
- **Human-in-the-Loop:** Integrated "Wait for Approval" workflow ensures HR validates critical decisions before emails are sent.
- **Smart Validation:** Dynamic country-specific phone number validation, document support, and immediate feedback.
- **Success Celebration:** Animated confetti on successful application submission.

## 🛠️ Tech Stack

### **Frontend (The Experience)**
- **Framework:** Next.js 14 (React / App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **3D Effects:** Spline 3D (`@splinetool/react-spline`)
- **Animations:** Framer Motion & Canvas-confetti

### **Backend & AI (The Brains)**
- **Orchestration:** n8n (Workflow Automation)
- **AI Models:** Google Gemini 1.5 Pro (Vision) & Llama 3 (via Groq)
- **Database:** Google Sheets (Real-time Data Sync)
- **Communication:** Gmail SMTP Server

## ⚙️ How It Works

1. **Candidate Portal:** User uploads resume (Drag & Drop) via the Next.js frontend.
2. **Secure Webhook:** Data is sent to the private n8n webhook (`/webhook-test/hireflow-apply`).
3. **Router:** Workflow splits based on file type (PDF vs. Image).
4. **AI Analysis:**
   - **OCR Agent:** Extracts text from images.
   - **Analysis Agent:** Evaluates text against the "Talent Scout" system prompt.
5. **Decision Engine:**
   - Score > 80: Mark for Interview.
   - Score < 45: Draft Rejection Email.
6. **Output:** Data saved to Sheets; Email sent upon Human Approval.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git installed
- n8n instance active for webhooks

### Installation
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Launch the Portal
```bash
npm run dev
# Visit http://localhost:3000
```

## 🌐 Deployment

Deploy easily on Vercel:

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hireflow)

## 🤖 Customization

### Branding
- Update colors in `app/globals.css`
- Modify logo assets in `/public`

### AI Integration
- Implement NLP classification for applications
- Update AI logic within the n8n webhook workflow

## 🛠️ Troubleshooting

```bash
# Build project
npm run build

# Reset cache
npm run dev -- --force

# For OCR issues
npm install pdfjs-dist
```

> 💡 **Pro Tip**: Use environment variables in `.env.local` for custom validation rules

## 📝 License

This project is open-source. Feel free to fork and customize for your recruitment needs.

---

<div align="center">
  <p>Built with ❤️ for smarter hiring</p>
</div>
