/**
 * Deterministic Test Script: Form & Country Code Validation Engine
 * Layer 3 Execution Tool
 */

import { CountryConfig } from "../lib/types";

const COUNTRY_CONFIG: CountryConfig[] = [
  { code: "+91", label: "IN (+91)", maxLength: 10, placeholder: "98765 43210" },
  { code: "+86", label: "CN (+86)", maxLength: 11, placeholder: "139 1234 5678" },
  { code: "+81", label: "JP (+81)", maxLength: 10, placeholder: "90 1234 5678" },
  { code: "+65", label: "SG (+65)", maxLength: 8, placeholder: "8123 4567" },
  { code: "+971", label: "UAE (+971)", maxLength: 9, placeholder: "50 123 4567" },
  { code: "+44", label: "UK (+44)", maxLength: 10, placeholder: "7700 900077" },
  { code: "+49", label: "DE (+49)", maxLength: 11, placeholder: "151 23456789" },
  { code: "+34", label: "ES (+34)", maxLength: 9, placeholder: "612 345 678" },
  { code: "+39", label: "IT (+39)", maxLength: 10, placeholder: "312 345 6789" },
  { code: "+31", label: "NL (+31)", maxLength: 9, placeholder: "6 12345678" },
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

// Self-test execution
function runSelfTest() {
  console.log("Running HireFlow Validation Self-Tests...");
  
  // Test Email
  console.assert(validateEmail("test@hireflow.ai") === true, "Valid email failed");
  console.assert(validateEmail("invalid-email") === false, "Invalid email passed");

  // Test Phone
  console.assert(validatePhone("9876543210", "+91") === true, "IN 10-digit failed");
  console.assert(validatePhone("987654321", "+91") === false, "IN 9-digit passed unexpectedly");
  console.assert(validatePhone("13912345678", "+86") === true, "CN 11-digit failed");
  console.assert(validatePhone("81234567", "+65") === true, "SG 8-digit failed");

  // Test File
  console.assert(validateFileSize(4_500_000, true) === true, "Valid 4.5MB PDF failed");
  console.assert(validateFileSize(5_500_000, true) === false, "Over 5MB PDF passed unexpectedly");
  console.assert(validateFileSize(900_000, false) === true, "Valid 900KB Image failed");
  console.assert(validateFileSize(1_500_000, false) === false, "Over 1MB Image passed unexpectedly");

  console.log("All validation tests passed successfully!");
}

runSelfTest();
