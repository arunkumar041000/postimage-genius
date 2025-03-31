
// Helper utility functions for the image analysis edge function

/**
 * CORS headers for the edge function responses
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Process OpenAI response into structured format
 */
export function processOpenAIResponse(content: string) {
  // Initialize result with empty arrays
  const result = {
    positives: [],
    improvements: [],
    suggestions: []
  };

  // Try to parse sections using regex
  const positivesMatch = content.match(/(?:Positives|What works well)[:\s]*([\s\S]*?)(?=Improvements|Areas to improve|$)/i);
  const improvementsMatch = content.match(/(?:Improvements|Areas to improve)[:\s]*([\s\S]*?)(?=Suggestions|$)/i);
  const suggestionsMatch = content.match(/(?:Suggestions)[:\s]*([\s\S]*?)(?=$)/i);

  // Extract and clean up bullet points
  if (positivesMatch && positivesMatch[1]) {
    result.positives = extractBulletPoints(positivesMatch[1]);
  }
  
  if (improvementsMatch && improvementsMatch[1]) {
    result.improvements = extractBulletPoints(improvementsMatch[1]);
  }
  
  if (suggestionsMatch && suggestionsMatch[1]) {
    result.suggestions = extractBulletPoints(suggestionsMatch[1]);
  }

  // If the parsing didn't work well, at least return something
  if (result.positives.length === 0 && 
      result.improvements.length === 0 && 
      result.suggestions.length === 0) {
    // Simple fallback - split content into three parts
    const lines = content.split('\n').filter(line => line.trim());
    const third = Math.ceil(lines.length / 3);
    result.positives = lines.slice(0, third);
    result.improvements = lines.slice(third, third * 2);
    result.suggestions = lines.slice(third * 2);
  }

  return result;
}

/**
 * Extract bullet points from text
 */
export function extractBulletPoints(text: string): string[] {
  // Remove leading/trailing whitespace
  const trimmed = text.trim();
  
  // Split by newlines and clean up
  const lines = trimmed.split('\n')
    .map(line => line.replace(/^[•\-*]\s*/, '').trim())
    .filter(line => line.length > 0);
  
  return lines;
}
