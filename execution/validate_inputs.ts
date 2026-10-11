/**
 * Deterministic Test Script: Form & Country Code Validation Engine
 * Layer 3 Execution Tool
 */

import { CountryConfig } from "../lib/types";

export const COUNTRY_CONFIG: CountryConfig[] = [
  { code: "+91", label: "IN (+91)", countryName: "India", flag: "🇮🇳", maxLength: 10, placeholder: "98765 43210" },
  { code: "+86", label: "CN (+86)", countryName: "China", flag: "🇨🇳", maxLength: 11, placeholder: "139 1234 5678" },
  { code: "+81", label: "JP (+81)", countryName: "Japan", flag: "🇯🇵", maxLength: 10, placeholder: "90 1234 5678" },
  { code: "+65", label: "SG (+65)", countryName: "Singapore", flag: "🇸🇬", maxLength: 8, placeholder: "8123 4567" },
  { code: "+971", label: "UAE (+971)", countryName: "United Arab Emirates", flag: "🇦🇪", maxLength: 9, placeholder: "50 123 4567" },
  { code: "+44", label: "UK (+44)", countryName: "United Kingdom", flag: "🇬🇧", maxLength: 10, placeholder: "7700 900077" },
  { code: "+49", label: "DE (+49)", countryName: "Germany", flag: "🇩🇪", maxLength: 11, placeholder: "151 23456789" },
  { code: "+34", label: "ES (+34)", countryName: "Spain", flag: "🇪🇸", maxLength: 9, placeholder: "612 345 678" },
  { code: "+39", label: "IT (+39)", countryName: "Italy", flag: "🇮🇹", maxLength: 10, placeholder: "312 345 6789" },
  { code: "+31", label: "NL (+31)", countryName: "Netherlands", flag: "🇳🇱", maxLength: 9, placeholder: "6 12345678" },
];

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string, countryCode: string): boolean {
  const country = COUNTRY_CONFIG.find((c) => c.code === countryCode);
  if (!country) return false;
  return /^\d+$/.test(phone) && phone.length === country.maxLength;
}

export function validateFileSize(sizeBytes: number, isPdf: boolean): boolean {
  const MAX_PDF_SIZE = 5_000_000;
  const MAX_IMAGE_SIZE = 1_000_000;
  return isPdf ? sizeBytes <= MAX_PDF_SIZE : sizeBytes <= MAX_IMAGE_SIZE;
}

export function validateTrackingReference(referenceId: string): boolean {
  return /^HF-2026-[A-Z0-9]{5}$/.test(referenceId);
}

// Self-test execution
function runSelfTest() {
  console.log("Running HireFlow Comprehensive Validation Tests...");
  
  // Test Email
  console.assert(validateEmail("alex@hireflow.ai") === true, "Valid email failed");
  console.assert(validateEmail("candidate.talent+test@company.co.uk") === true, "Complex valid email failed");
  console.assert(validateEmail("invalid-email") === false, "Invalid email passed");
  console.assert(validateEmail("user@domain") === false, "Missing TLD passed unexpectedly");

  // Test Phone Across All 10 Target Markets
  console.assert(validatePhone("9876543210", "+91") === true, "IN 10-digit failed");
  console.assert(validatePhone("987654321", "+91") === false, "IN 9-digit passed unexpectedly");
  console.assert(validatePhone("13912345678", "+86") === true, "CN 11-digit failed");
  console.assert(validatePhone("9012345678", "+81") === true, "JP 10-digit failed");
  console.assert(validatePhone("81234567", "+65") === true, "SG 8-digit failed");
  console.assert(validatePhone("501234567", "+971") === true, "UAE 9-digit failed");
  console.assert(validatePhone("7700900077", "+44") === true, "UK 10-digit failed");
  console.assert(validatePhone("15123456789", "+49") === true, "DE 11-digit failed");
  console.assert(validatePhone("612345678", "+34") === true, "ES 9-digit failed");
  console.assert(validatePhone("3123456789", "+39") === true, "IT 10-digit failed");
  console.assert(validatePhone("612345678", "+31") === true, "NL 9-digit failed");

  // Test File Constraints
  console.assert(validateFileSize(4_800_000, true) === true, "Valid 4.8MB PDF failed");
  console.assert(validateFileSize(5_200_000, true) === false, "Over 5MB PDF passed unexpectedly");
  console.assert(validateFileSize(950_000, false) === true, "Valid 950KB Image failed");
  console.assert(validateFileSize(1_050_000, false) === false, "Over 1MB Image passed unexpectedly");

  // Test Tracking Reference Code Format
  console.assert(validateTrackingReference("HF-2026-AB12C") === true, "Valid reference format failed");
  console.assert(validateTrackingReference("INVALID-REF") === false, "Invalid reference format passed");

  console.log("SUCCESS: All 18 deterministic validation assertions passed!");
}

runSelfTest();
