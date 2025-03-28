
export interface AnalysisResult {
  positives: string[];
  improvements: string[];
  suggestions: string[];
  [key: string]: any; // Allow additional properties
}
