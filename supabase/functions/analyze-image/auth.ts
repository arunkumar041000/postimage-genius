
/**
 * Authorization utilities for the edge function
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

/**
 * Create a Supabase admin client
 */
export function createSupabaseAdmin() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceRole) {
    throw new Error('Supabase environment variables are not properly configured');
  }
  
  return createClient(supabaseUrl, supabaseServiceRole);
}

/**
 * Verify user authentication from the request header
 */
export async function verifyAuth(authHeader: string | null) {
  if (!authHeader) {
    throw new Error('Authorization header is required');
  }
  
  const supabaseAdmin = createSupabaseAdmin();
  
  // Verify the token and get the user
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(
    authHeader.replace('Bearer ', '')
  );
  
  if (authError || !user) {
    throw new Error('Invalid or expired token');
  }
  
  return { user, supabaseAdmin };
}

/**
 * Check if user has exceeded their daily rate limit
 */
export async function checkRateLimit(userId: string, supabaseAdmin: any) {
  // Check rate limit (5 analyses per day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { count, error: countError } = await supabaseAdmin
    .from('analysis_history')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', today.toISOString());
  
  if (countError) {
    throw new Error(`Failed to check rate limit: ${countError.message}`);
  }
  
  if (count && count >= 5) {
    throw new Error('Daily rate limit reached');
  }
  
  return { remainingCount: 5 - (count || 0) };
}
