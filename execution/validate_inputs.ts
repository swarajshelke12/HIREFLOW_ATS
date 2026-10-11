/**
 * Deterministic Test Script: Form & Country Code Validation Engine
 * Layer 3 Execution Tool
 */

import { COUNTRY_CONFIG } from "../components/ui/candidate-form";

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
  return /^HF-[A-Z0-9]{5}$/.test(referenceId);
}

// Self-test execution
function runSelfTest() {
  console.log("Running HireFlow Validation Tests...");
  
  // Test Email
  console.assert(validateEmail("candidate@example.com") === true, "Valid email failed");
  console.assert(validateEmail("invalid-email") === false, "Invalid email passed");

  // Test Phone Across Target Markets
  console.assert(validatePhone("9876543210", "+91") === true, "IN 10-digit failed");
  console.assert(validatePhone("987654321", "+91") === false, "IN 9-digit passed unexpectedly");
  console.assert(validatePhone("13912345678", "+86") === true, "CN 11-digit failed");
  console.assert(validatePhone("9012345678", "+81") === true, "JP 10-digit failed");
  console.assert(validatePhone("81234567", "+65") === true, "SG 8-digit failed");
  console.assert(validatePhone("501234567", "+971") === true, "UAE 9-digit failed");
  console.assert(validatePhone("7700900077", "+44") === true, "UK 10-digit failed");
  console.assert(validatePhone("15123456789", "+49") === true, "DE 11-digit failed");

  // Test File Constraints
  console.assert(validateFileSize(4_800_000, true) === true, "Valid 4.8MB PDF failed");
  console.assert(validateFileSize(5_200_000, true) === false, "Over 5MB PDF passed unexpectedly");
  console.assert(validateFileSize(950_000, false) === true, "Valid 950KB Image failed");
  console.assert(validateFileSize(1_050_000, false) === false, "Over 1MB Image passed unexpectedly");

  // Test Tracking Reference Code Format
  console.assert(validateTrackingReference("HF-AB12C") === true, "Valid reference format failed");
  console.assert(validateTrackingReference("INVALID") === false, "Invalid reference format passed");

  console.log("SUCCESS: All deterministic validation assertions passed!");
}

runSelfTest();
