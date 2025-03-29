
import { SocialMediaPlatform } from "@/components/SocialMediaBadge";

export interface AnalysisResult {
  positives: string[];
  improvements: string[];
  suggestions: string[];
}

// This file is kept for type definitions but the actual API call
// has been moved to the Supabase edge function 'analyze-image'
