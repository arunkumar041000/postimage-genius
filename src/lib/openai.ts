
export interface AnalysisResult {
  positives: string[];
  improvements: string[];
  suggestions: string[];
}

export const analyzeMarketingImage = async (
  imageBase64: string,
  apiKey: string
): Promise<AnalysisResult> => {
  // Prepare the API request
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a marketing expert specialized in analyzing marketing images and social media posts. 
        Provide specific, actionable feedback organized in three categories:
        1. Positives: What works well in this marketing image
        2. Improvements: Specific areas that could be improved
        3. Suggestions: Actionable recommendations to enhance the effectiveness
        
        Focus on visual elements, composition, target audience appeal, brand consistency, 
        messaging clarity, call-to-action effectiveness, and emotional impact.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this marketing image and provide feedback on what works well, what could be improved, and specific suggestions."
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`
            }
          }
        ]
      }
    ],
    max_tokens: 1000
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to analyze image');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No analysis generated');
    }

    // Process and structure the OpenAI response
    return processOpenAIResponse(content);
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

const processOpenAIResponse = (content: string): AnalysisResult => {
  // Initialize result with empty arrays
  const result: AnalysisResult = {
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
};

const extractBulletPoints = (text: string): string[] => {
  // Remove leading/trailing whitespace
  const trimmed = text.trim();
  
  // Split by newlines and clean up
  const lines = trimmed.split('\n')
    .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
    .filter(line => line.length > 0);
  
  return lines;
};
