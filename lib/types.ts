/**
 * HIREFLOW ATS - Core TypeScript Type Definitions & Data Contracts
 * Layer 2 / 3 Shared Schema
 */

export interface CountryConfig {
  code: string;
  label: string;
  countryName?: string;
  flag?: string;
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
  fileDetails?: {
    name: string;
    sizeFormatted: string;
    type: "pdf" | "image";
  };
}

export type SubmissionStatus = "idle" | "validating" | "encrypting" | "transmitting" | "success" | "error";

export interface HiringTimelineStep {
  step: number;
  title: string;
  timeframe: string;
  description: string;
}

export interface JobDossierInfo {
  title: string;
  badge: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  openings: number;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
  perks: { label: string; iconName: string }[];
  hiringTimeline: HiringTimelineStep[];
}

export interface SubmissionReceipt {
  referenceId: string;
  candidateName: string;
  email: string;
  phone: string;
  roleTitle: string;
  submittedAt: string;
  estimatedReviewTime: string;
}
