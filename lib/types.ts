/**
 * HIREFLOW ATS - Minimal Type Definitions
 */

export interface CountryConfig {
  code: string;
  label: string;
  countryName?: string;
  flag?: string;
  maxLength: number;
  placeholder: string;
}

export interface SubmissionReceipt {
  referenceId: string;
  candidateName: string;
  email: string;
  phone: string;
  roleTitle: string;
  submittedAt: string;
}
