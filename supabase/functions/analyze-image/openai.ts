
/**
 * OpenAI integration for image analysis
 */

import { processOpenAIResponse } from './utils.ts';

/**
 * Generate a system message for the OpenAI API based on input parameters
 */
export function buildSystemMessage(platforms?: string[], prompt?: string): string {
  let systemContent = `You are a marketing expert specialized in analyzing marketing images and social media posts. 
    Provide specific, actionable feedback organized in three categories:
    1. Positives: What works well in this marketing image
    2. Improvements: Specific areas that could be improved
    3. Suggestions: Actionable recommendations to enhance the effectiveness
    
    Focus on visual elements, composition, target audience appeal, brand consistency, 
    messaging clarity, call-to-action effectiveness, and emotional impact.`;

  if (platforms && platforms.length > 0) {
    systemContent += `\n\nTarget platforms: ${platforms.join(', ')}`;
    systemContent += `\n\nPay special attention to optimizing this content for the specified target platforms,
    including platform-specific best practices, aspect ratios, and content guidelines.`;
  }
  
  if (prompt && prompt.trim()) {
    systemContent += `\n\nAdditional context from the user: ${prompt.trim()}`;
  }

  return systemContent;
}

/**
 * Call OpenAI API to analyze image
 */
export async function analyzeImageWithOpenAI(
  imageData: string, 
  prompt: string | null, 
  platforms: string[] | null,
  openAIApiKey: string
) {
  const systemContent = buildSystemMessage(platforms || undefined, prompt || undefined);

  // Prepare OpenAI API request payload
  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemContent
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt && prompt.trim() 
              ? "Analyze this marketing image with the context I provided." 
              : "Analyze this marketing image and provide feedback on what works well, what could be improved, and specific suggestions."
          },
          {
            type: "image_url",
            image_url: {
              url: imageData
            }
          }
        ]
      }
    ],
    max_tokens: 1000
  };

  // Call OpenAI API
  console.log("Calling OpenAI API...");
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAIApiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("OpenAI API error:", errorData);
    throw new Error(errorData.error?.message || 'Failed to analyze image');
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No analysis generated');
  }

  // Process the response
  return processOpenAIResponse(content);
}
