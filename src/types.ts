// Enums are common in Java, here TS has union types:
export type FilingStatus =
  | "SINGLE"
  | "MARRIED_JOINT"
  | "MARRIED_SEPARATE"
  | "HEAD_OF_HOUSEHOLD";

// Data point returned by /api/tax/history
export interface HistoryPoint {
  year: number;
  value: number;
}

// Tax bracket structure
export interface TaxBracket {
  lower: number;
  upper: number | null;  // null means "no upper bound"
  rate: number;
}

// Response from /api/tax/calc
export interface TaxCalculation {
  year: number;
  status: FilingStatus;
  income: number;
  marginalRate: number;
  effectiveRate: number;
  brackets: TaxBracket[];
}

export type HistoryMetric = "TOP_RATE" | "BRACKET_COUNT";

export const FILING_STATUSES: { label: string; value: FilingStatus }[] = [
  { label: "Single", value: "SINGLE" },
  { label: "Married Filing Jointly", value: "MARRIED_JOINT" },
  { label: "Married Filing Separately", value: "MARRIED_SEPARATE" },
  { label: "Head of Household", value: "HEAD_OF_HOUSEHOLD" },
];

export const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_START = 1913;