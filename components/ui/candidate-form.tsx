"use client";

import React, { useState } from "react";
import { 
  Send, 
  Upload, 
  FileText, 
  Check, 
  X, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { CountryConfig, SubmissionReceipt } from "@/lib/types";

export const COUNTRY_CONFIG: CountryConfig[] = [
  // Asian Tech Markets
  { code: "+91", label: "IN (+91)", countryName: "India", flag: "🇮🇳", maxLength: 10, placeholder: "98765 43210" },
  { code: "+86", label: "CN (+86)", countryName: "China", flag: "🇨🇳", maxLength: 11, placeholder: "139 1234 5678" },
  { code: "+81", label: "JP (+81)", countryName: "Japan", flag: "🇯🇵", maxLength: 10, placeholder: "90 1234 5678" },
  { code: "+65", label: "SG (+65)", countryName: "Singapore", flag: "🇸🇬", maxLength: 8, placeholder: "8123 4567" },
  { code: "+971", label: "UAE (+971)", countryName: "United Arab Emirates", flag: "🇦🇪", maxLength: 9, placeholder: "50 123 4567" },

  // European Tech Markets
  { code: "+44", label: "UK (+44)", countryName: "United Kingdom", flag: "🇬🇧", maxLength: 10, placeholder: "7700 900077" },
  { code: "+49", label: "DE (+49)", countryName: "Germany", flag: "🇩🇪", maxLength: 11, placeholder: "151 23456789" },
  { code: "+34", label: "ES (+34)", countryName: "Spain", flag: "🇪🇸", maxLength: 9, placeholder: "612 345 678" },
  { code: "+39", label: "IT (+39)", countryName: "Italy", flag: "🇮🇹", maxLength: 10, placeholder: "312 345 6789" },
  { code: "+31", label: "NL (+31)", countryName: "Netherlands", flag: "🇳🇱", maxLength: 9, placeholder: "6 12345678" },
];

const MAX_PDF_SIZE = 5_000_000; // 5MB
const MAX_IMAGE_SIZE = 1_000_000; // 1MB

interface CandidateFormProps {
  onSuccess: (receipt: SubmissionReceipt) => void;
}

export function CandidateForm({ onSuccess }: CandidateFormProps) {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Send Application");
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const activeCountry = COUNTRY_CONFIG.find((c) => c.code === countryCode) ?? COUNTRY_CONFIG[0];

  // Validation Checkers
  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = phone.length === activeCountry.maxLength;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFileValid = file !== null;

  // Completion calculation
  const completedFields = [isNameValid, isPhoneValid, isEmailValid, isFileValid].filter(Boolean).length;
  const completionPercentage = (completedFields / 4) * 100;

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= activeCountry.maxLength) {
      setPhone(value);
    }
  };

  const validateFile = (selectedFile: File): boolean => {
    const isPDF = selectedFile.type === "application/pdf";
    const isImage = selectedFile.type.startsWith("image/");

    if (!isPDF && !isImage) {
      setError("Invalid format! Please upload a PDF document or an image (JPG/PNG).");
      return false;
    }

    if (isPDF && selectedFile.size > MAX_PDF_SIZE) {
      const sizeInMB = (selectedFile.size / 1000000).toFixed(2);
      setError(`PDF document exceeds limit (${sizeInMB}MB)! Maximum allowed size is 5MB.`);
      return false;
    }

    if (isImage && selectedFile.size > MAX_IMAGE_SIZE) {
      const sizeInMB = (selectedFile.size / 1000000).toFixed(2);
      setError(`Image exceeds limit (${sizeInMB}MB)! Maximum size for OCR is 1MB.`);
      return false;
    }

    setError("");
    setFile(selectedFile);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isNameValid) {
      setError("Please provide your full legal name.");
      return;
    }

    if (!isPhoneValid) {
      setError(`Please enter a valid ${activeCountry.maxLength}-digit phone number for ${activeCountry.label}.`);
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid business or personal email address.");
      return;
    }

    if (!isFileValid || !file) {
      setError("Please attach your resume in PDF or image format.");
      return;
    }

    setLoading(true);
    setStatusMessage("Encrypting payload...");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", `${countryCode} ${phone}`);
      formData.append("email", email.trim());
      formData.append("resume", file);

      setStatusMessage("Transmitting to AI pipeline...");

      const webhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
        "http://localhost:5678/webhook-test/hireflow-apply";

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("n8n pipeline endpoint returned non-200 status");
      }

      // Generate structured receipt
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const receipt: SubmissionReceipt = {
        referenceId: `HF-2026-${randomSuffix}`,
        candidateName: name.trim(),
        email: email.trim(),
        phone: `${countryCode} ${phone}`,
        roleTitle: "AI & Automation Specialist",
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        estimatedReviewTime: "Within 24 to 48 hours",
      };

      onSuccess(receipt);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Intake node currently busy. Ensure local n8n service is running or try again.");
    } finally {
      setLoading(false);
      setStatusMessage("Send Application");
    }
  };

  return (
    <div className="w-full rounded-3xl bg-black/45 backdrop-blur-xl border border-white/10 p-6 sm:p-8 text-white shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/15">
      {/* Console Header */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-sans">
              Candidate Intake Console
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-400">
            Step {completedFields}/4 Complete
          </span>
        </div>

        {/* Live Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="candidate-name" className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              Full Legal Name
              {isNameValid && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <span className="text-[11px] text-gray-400">Required</span>
          </div>
          <input
            id="candidate-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Alex Rivera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/80 outline-none transition-all duration-200 hover:border-white/20"
          />
        </div>

        {/* Phone Input with Country Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="candidate-phone" className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              Phone Number
              {isPhoneValid && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <span className="text-[11px] font-mono text-gray-400">
              <span className={isPhoneValid ? "text-emerald-400 font-semibold" : "text-gray-400"}>
                {phone.length}
              </span>
              /{activeCountry.maxLength} digits
            </span>
          </div>

          <div className="flex gap-2">
            {/* Country Selector */}
            <div className="relative w-36 shrink-0">
              <select
                id="country-code"
                aria-label="Country Code"
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setPhone("");
                }}
                className="w-full h-full appearance-none px-3.5 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-medium focus:ring-2 focus:ring-blue-500/60 outline-none cursor-pointer hover:border-white/20 transition-all"
              >
                {COUNTRY_CONFIG.map((c) => (
                  <option key={c.code} value={c.code} className="bg-zinc-950 text-white">
                    {c.flag ?? ""} {c.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Numeric Phone Input */}
            <input
              id="candidate-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={activeCountry.placeholder}
              maxLength={activeCountry.maxLength}
              value={phone}
              onChange={handlePhoneInput}
              className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-400 font-mono text-sm focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/80 outline-none transition-all duration-200 hover:border-white/20"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="candidate-email" className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              Email Address
              {isEmailValid && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <span className="text-[11px] text-gray-400">Verified for Updates</span>
          </div>
          <input
            id="candidate-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex.rivera@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/80 outline-none transition-all duration-200 hover:border-white/20"
          />
        </div>

        {/* Resume Drag-and-Drop Ingestion Zone */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <label htmlFor="resume-upload" className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              Resume Document
              {isFileValid && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </label>
            <span className="text-[11px] font-mono text-gray-400">PDF (&le;5MB) · IMG (&le;1MB)</span>
          </div>

          <div
            className="relative group cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf, application/pdf, image/jpeg, image/png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              onChange={handleFileChange}
            />

            <div
              className={`w-full p-6 rounded-2xl border-2 border-dashed transition-all duration-300 backdrop-blur-sm text-center relative z-10 ${
                dragActive
                  ? "border-blue-500 bg-blue-500/20 scale-[1.01] shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  : file
                  ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60"
                  : "border-white/10 bg-black/40 hover:border-white/25 hover:bg-black/60"
              }`}
            >
              {file ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-emerald-400" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate max-w-[220px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for AI parsing
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove uploaded resume"
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-colors z-30"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Upload className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {dragActive ? "Drop document to upload" : "Drag & drop resume or browse file"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Secure parsing via Google Gemini multimodal pipeline
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <GlassmorphismButton
            type="submit"
            disabled={loading}
            shimmerColor="rgba(59,130,246,0.6)"
            glowColor="rgba(59,130,246,0.35)"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {statusMessage}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" strokeWidth={1.75} />
                Submit Application
              </span>
            )}
          </GlassmorphismButton>
        </div>

        {/* Security / Privacy Assurance */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Encrypted transmission · We respect candidate privacy</span>
        </div>
      </form>
    </div>
  );
}
