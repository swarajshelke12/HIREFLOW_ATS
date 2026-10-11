"use client";

import React, { useState } from "react";
import { 
  Send, 
  Upload, 
  FileText, 
  X, 
  AlertCircle, 
  ShieldCheck 
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { CountryConfig, SubmissionReceipt } from "@/lib/types";

export const COUNTRY_CONFIG: CountryConfig[] = [
  { code: "+91", label: "IN (+91)", flag: "🇮🇳", maxLength: 10, placeholder: "98765 43210" },
  { code: "+86", label: "CN (+86)", flag: "🇨🇳", maxLength: 11, placeholder: "139 1234 5678" },
  { code: "+81", label: "JP (+81)", flag: "🇯🇵", maxLength: 10, placeholder: "90 1234 5678" },
  { code: "+65", label: "SG (+65)", flag: "🇸🇬", maxLength: 8, placeholder: "8123 4567" },
  { code: "+971", label: "UAE (+971)", flag: "🇦🇪", maxLength: 9, placeholder: "50 123 4567" },
  { code: "+44", label: "UK (+44)", flag: "🇬🇧", maxLength: 10, placeholder: "7700 900077" },
  { code: "+49", label: "DE (+49)", flag: "🇩🇪", maxLength: 11, placeholder: "151 23456789" },
  { code: "+34", label: "ES (+34)", flag: "🇪🇸", maxLength: 9, placeholder: "612 345 678" },
  { code: "+39", label: "IT (+39)", flag: "🇮🇹", maxLength: 10, placeholder: "312 345 6789" },
  { code: "+31", label: "NL (+31)", flag: "🇳🇱", maxLength: 9, placeholder: "6 12345678" },
];

const MAX_PDF_SIZE = 5_000_000;
const MAX_IMAGE_SIZE = 1_000_000;

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
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const activeCountry = COUNTRY_CONFIG.find((c) => c.code === countryCode) ?? COUNTRY_CONFIG[0];

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
      setError("Please upload a PDF document or image file (JPG/PNG).");
      return false;
    }

    if (isPDF && selectedFile.size > MAX_PDF_SIZE) {
      setError("PDF is too large (max 5MB).");
      return false;
    }

    if (isImage && selectedFile.size > MAX_IMAGE_SIZE) {
      setError("Image is too large (max 1MB).");
      return false;
    }

    setError("");
    setFile(selectedFile);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (phone.length !== activeCountry.maxLength) {
      setError(`Please enter a valid ${activeCountry.maxLength}-digit phone number for ${activeCountry.label}.`);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!file) {
      setError("Please attach your resume.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", `${countryCode} ${phone}`);
      formData.append("email", email.trim());
      formData.append("resume", file);

      const webhookUrl =
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
        "https://overtensely-polygynous-emilee.ngrok-free.dev/webhook-test/hireflow-apply";

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to submit application");
      }

      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      onSuccess({
        referenceId: `HF-${randomSuffix}`,
        candidateName: name.trim(),
        email: email.trim(),
        phone: `${countryCode} ${phone}`,
        roleTitle: "AI & Automation Specialist",
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
    } catch {
      setError("Service temporarily busy. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 text-white shadow-2xl">
      <div className="text-center space-y-1.5 mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400">
          Job Application
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          AI &amp; Automation Specialist
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Submit your application below. We review all submissions carefully.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label htmlFor="candidate-name" className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
            Full Name
          </label>
          <input
            id="candidate-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-white/20"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <div className="flex justify-between px-1">
            <label htmlFor="candidate-phone" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Phone Number
            </label>
            <span className="text-[11px] text-gray-500 font-mono">
              {phone.length}/{activeCountry.maxLength} digits
            </span>
          </div>

          <div className="flex gap-2">
            <div className="relative w-32 shrink-0">
              <select
                id="country-code"
                aria-label="Country Code"
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setPhone("");
                }}
                className="w-full h-full appearance-none px-3 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 hover:border-white/20 transition-all"
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

            <input
              id="candidate-phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              required
              autoComplete="tel-national"
              placeholder={activeCountry.placeholder}
              maxLength={activeCountry.maxLength}
              value={phone}
              onChange={handlePhoneInput}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-500 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-white/20"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="candidate-email" className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
            Email Address
          </label>
          <input
            id="candidate-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-500 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-white/20"
          />
        </div>

        {/* Resume */}
        <div className="space-y-1">
          <label htmlFor="resume-upload" className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
            Resume (PDF or Image)
          </label>

          <div
            className="relative group cursor-pointer"
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files?.[0]) validateFile(e.dataTransfer.files[0]);
            }}
          >
            <input
              type="file"
              id="resume-upload"
              accept=".pdf, application/pdf, image/jpeg, image/png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              onChange={(e) => {
                if (e.target.files?.[0]) validateFile(e.target.files[0]);
              }}
            />

            <div
              className={`w-full p-5 rounded-2xl border-2 border-dashed transition-all duration-200 text-center ${
                dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : file
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-white/10 bg-black/40 hover:border-white/25"
              }`}
            >
              {file ? (
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div className="text-left min-w-0">
                      <p className="text-sm font-semibold text-white truncate max-w-[220px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    aria-label="Remove file"
                    className="p-1 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-colors z-30"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 py-1">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <p className="text-sm font-medium text-gray-300">
                    {dragActive ? "Drop your resume here" : "Click to browse or drop your resume"}
                  </p>
                  <p className="text-xs text-gray-500">PDF up to 5MB, JPG/PNG up to 1MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Application
              </span>
            )}
          </GlassmorphismButton>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
          <span>Your information is kept strictly confidential</span>
        </div>
      </form>
    </div>
  );
}
