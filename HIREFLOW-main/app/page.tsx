"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/spline";
import confetti from "canvas-confetti"; 

// 1. Defined strict rules for each country
const COUNTRY_CONFIG = [
  { code: "+91", label: "IN (+91)", maxLength: 10, placeholder: "98765 43210" },
  { code: "+1", label: "US/CA (+1)", maxLength: 10, placeholder: "201 555 0123" },
  { code: "+44", label: "UK (+44)", maxLength: 10, placeholder: "7700 900077" },
  { code: "+61", label: "AU (+61)", maxLength: 9, placeholder: "412 345 678" },
  { code: "+971", label: "UAE (+971)", maxLength: 9, placeholder: "50 123 4567" },
  { code: "+49", label: "DE (+49)", maxLength: 11, placeholder: "151 23456789" },
  { code: "+33", label: "FR (+33)", maxLength: 9, placeholder: "6 12 34 56 78" },
  { code: "+81", label: "JP (+81)", maxLength: 10, placeholder: "90 1234 5678" },
];

export default function CandidatePortal() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); 
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false); 

  // 2. Get the current active country settings
  const activeCountry = useMemo(() => {
    return COUNTRY_CONFIG.find(c => c.code === countryCode) || COUNTRY_CONFIG[0];
  }, [countryCode]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // 3. Strict Phone Input Handler
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string (deleting) OR numbers only
    // AND ensure length doesn't exceed the selected country's limit
    if (value === "" || (/^[0-9\b]+$/.test(value) && value.length <= activeCountry.maxLength)) {
      setPhone(value);
    }
  };

  const validateFile = (selectedFile: File) => {
    const MAX_PDF_SIZE = 5000000; 
    const MAX_IMAGE_SIZE = 1000000; 

    const isPDF = selectedFile.type === "application/pdf";
    const isImage = selectedFile.type.startsWith("image/");

    if (!isPDF && !isImage) {
      setError("Invalid format! Please upload a PDF or an Image (JPG/PNG).");
      return false;
    }

    if (isPDF && selectedFile.size > MAX_PDF_SIZE) {
      const sizeInMB = (selectedFile.size / 1000000).toFixed(2);
      setError(`PDF too large (${sizeInMB}MB)! Max size is 5MB.`);
      return false;
    }

    if (isImage && selectedFile.size > MAX_IMAGE_SIZE) {
      const sizeInMB = (selectedFile.size / 1000000).toFixed(2);
      setError(`Image too large (${sizeInMB}MB)! Max size for OCR is 1MB.`);
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

  const handleSubmit = async () => {
    setError("");
    
    if (!name || !phone || !email || !file) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    // Check if phone number meets the specific country length requirement
    if (phone.length !== activeCountry.maxLength) {
        setError(`Please enter a valid ${activeCountry.maxLength}-digit number for ${activeCountry.label}`);
        return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      // Combine Country Code and Phone Number for the backend
      formData.append("phone", `${countryCode} ${phone}`);
      formData.append("email", email);
      formData.append("resume", file);

      const response = await fetch("http://localhost:5678/webhook/hireflow-apply", {
         method: "POST",
         body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send to n8n");
      }

      setIsSubmitted(true);
      triggerConfetti(); 
      
    } catch (err) {
      console.error(err);
      setError("System busy. Make sure n8n is active.");
    } finally {
      setLoading(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (isSubmitted) {
    return (
      <main className="w-full h-screen bg-black relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
           <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        <div className="z-10 relative text-center p-10 bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(34,197,94,0.3)]">
             <span className="text-5xl text-green-500">✓</span>
          </div>
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-white">Application Received</h1>
          <p className="text-gray-300 text-xl max-w-lg">
              Our HR team is reviewing your profile, and soon you'll hear back from us. Thank you for applying to join HireFlow!
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-black/[0.96] relative flex items-center justify-center py-20 overflow-x-hidden">
      <Spotlight className="-top-40 left-0 md:left-100 md:-top-100 fixed" fill="white" />
      
      <div className="fixed inset-0 z-0 scale-100 md:scale-130">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <Card className="bg-black/30 backdrop-blur-[2px] border-white/10 text-white shadow-2xl pointer-events-none">
          <CardHeader>
            <h1 className="text-4xl font-black tracking-tight uppercase text-center">
              Hire<span className="text-blue-500">Flow</span>
            </h1>
            <p className="text-gray-400 font-medium text-center">For "AI & Automation specialist - Learning & Design team" role give your details here!</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6 pointer-events-auto">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-1000 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-gray-600"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* SMART PHONE INPUT */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-1000 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <div className="flex gap-2 h-14"> 
                    
                    {/* Country Code Selector - FIXED WIDTH & NO SHRINK */}
                    <div className="relative h-full w-[130px] shrink-0">
                        <select 
                            value={countryCode}
                            onChange={(e) => {
                                setCountryCode(e.target.value);
                                setPhone(""); 
                            }}
                            className="w-full h-full appearance-none px-4 rounded-xl bg-black/50 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white cursor-pointer"
                        >
                            {COUNTRY_CONFIG.map((country) => (
                                <option key={country.code} value={country.code} className="bg-black text-white">
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    {/* Number Input - TAKES REMAINING SPACE */}
                    <input 
                        type="text" 
                        inputMode="numeric"
                        placeholder={activeCountry.placeholder}
                        maxLength={activeCountry.maxLength}
                        className="flex-1 min-w-0 h-full p-4 rounded-xl bg-black/50 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-gray-600"
                        onChange={handlePhoneInput}
                        value={phone}
                    />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-1000 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="you@gmail.com"
                  className="w-full p-4 rounded-xl bg-black/50 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-gray-600"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-1000 uppercase tracking-widest ml-1">
                  Resume ONLY (PDF/PNG/JPG)
                </label>
                
                <div 
                  className="relative group"
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
                  
                  <div className={`
                    w-full p-8 rounded-xl border-2 border-dashed transition-all text-center relative z-10 duration-300
                    ${dragActive 
                      ? "border-blue-500 bg-blue-500/20 scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" 
                      : "bg-black/50 border-white/10 group-hover:border-blue-500/50"
                    }
                  `}>
                    {file ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-blue-400 text-4xl">📄</span>
                        <span className="text-blue-100 font-semibold break-words text-sm">
                          {file.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                          <span className={`text-4xl transition-colors ${dragActive ? "text-blue-400" : "text-gray-600"}`}>
                            {dragActive ? "📂" : "☁️"}
                          </span>
                        <span className="text-gray-400 text-sm font-medium">
                          {dragActive ? "Drop it here!" : "PDF (max 5MB) or Image (max 1MB)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center font-medium animate-pulse">
                  {error}
                </p>
              )}

              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    Processing...
                  </span>
                ) : "Send Application"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}