
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

import { corsHeaders, imageUrlToBase64 } from "./utils.ts";
import { analyzeImageWithOpenAI } from "./openai.ts";
import { verifyAuth, checkRateLimit } from "./auth.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authentication token and verify the user
    const authHeader = req.headers.get('authorization');
    const { user, supabaseAdmin } = await verifyAuth(authHeader);
    
    // Check rate limit
    await checkRateLimit(user.id, supabaseAdmin);
    
    // Parse request body
    const { imageUrl, prompt, platforms } = await req.json();
    
    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert the image to a base64 data URL
    let imageData;
    try {
      imageData = await imageUrlToBase64(imageUrl);
    } catch (error) {
      console.error(`Error processing image: ${error.message}`);
      return new Response(
        JSON.stringify({ 
          error: 'Error processing image', 
          message: `Failed to process the uploaded image: ${error.message}`
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze image with OpenAI
    const result = await analyzeImageWithOpenAI(imageData, prompt, platforms, openAIApiKey);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    // Format specific error messages
    if (error.message === 'Daily rate limit reached') {
      return new Response(
        JSON.stringify({ 
          error: 'Daily rate limit reached', 
          message: 'You have reached your daily limit of 5 image analyses. Please try again tomorrow.'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Generic error response
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
