# 🚀 HireFlow | Next.js Application for AI & Automation Specialist

<div align="center">
  <img width="300" alt="HireFlow Logo" 
       src="https://via.placeholder.com/300x100?text=HireFlow">
  <h1>HireFlow Application Portal</h1>
  <p>Streamline your application process with smart validation and instant feedback</p>
</div>

## ✨ Getting Started

### 🌐 Prerequisites
- Node.js 18+  
- Git installed

### 🛠️ Installation
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 🔥 Launch the Portal
```bash
npm run dev
# Visit http://localhost:3000
```

## 🌍 Smart Application Features

| Feature               | Description |
|-----------------------|-------------|
| 📱 Country-Specific Input | Auto-adjusted phone number validation per region |
| 📄 Document Support   | PDF (max 5MB) or Image (max 1MB) uploads |
| ✅ Real-Time Validation | Immediate feedback on form submission |
| 🎉 Success Celebration | Animated confetti on successful apply |

## 🎨 Technical Stack

- **Next.js** with App Router
- **React** 18+
- **TypeScript** typesafe forms
- **SplineScene** 3D animations
- **Canvas-confetti** for success effects

## 🚀 Deployment Options

[![Deploy on Vercel](https://vercel.com/docs/images/badges/deploy-on-vercel.svg)](https://vercel.com/new)

## 📚 Documentation

- [Next.js Official Docs](https://nextjs.org/docs)
- [Learn Next.js Tutorial](https://nextjs.org/learn)

## 🤖 Customization Options

### 🎨 Branding Customization
- Update colors in `app/globals.css`
- Modify logo assets in `/public`

### 🤖 AI Integration
- Add AI resume analysis with `/api/resume-analyze`
- Implement NLP classification for applications

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
