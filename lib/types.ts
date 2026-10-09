/**
 * HIREFLOW ATS - Core TypeScript Type Definitions
 */

export interface CountryConfig {
  code: string;
  label: string;
  maxLength: number;
  placeholder: string;
}

export interface CandidateFormData {
  name: string;
  phone: string;
  email: string;
  resume: File;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export type SubmissionStatus = "idle" | "loading" | "success" | "error";
