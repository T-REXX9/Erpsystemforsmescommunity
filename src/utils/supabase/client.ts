/**
 * Supabase Client Singleton
 * 
 * Creates a reusable Supabase client instance that automatically
 * uses the configured environment (cloud or local)
 */

import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../config/supabase';

// Singleton instance
let supabaseClient: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Supabase client instance
 * This ensures we only have one client throughout the app
 */
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    console.log('✅ Supabase client initialized');
  }
  return supabaseClient;
};

// Export as default for convenience
export default getSupabaseClient;