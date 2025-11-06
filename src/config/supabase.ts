/**
 * Supabase Configuration
 *
 * Centralized configuration for Supabase client that supports both:
 * - Cloud-hosted Supabase (production)
 * - Self-hosted/Local Supabase (development)
 *
 * Configuration is loaded from environment variables (.env file)
 * See .env.example for all available options
 */

// Fallback to hardcoded values if env vars are not set (for backwards compatibility)
import { projectId as fallbackProjectId, publicAnonKey as fallbackAnonKey } from '../utils/supabase/info';

// Get environment variables (Vite exposes them via import.meta.env)
const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || fallbackProjectId;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackAnonKey;

// Configuration mode: Set to true to use local Supabase
export const USE_LOCAL_SUPABASE = import.meta.env.VITE_USE_LOCAL_SUPABASE === 'true' || false;

// Local Supabase configuration (for self-hosted instances)
export const LOCAL_SUPABASE_CONFIG = {
  url: import.meta.env.VITE_LOCAL_SUPABASE_URL || 'http://localhost:54321',
  anonKey: import.meta.env.VITE_LOCAL_SUPABASE_ANON_KEY || 'your-local-anon-key-here',
};

// Cloud Supabase configuration
export const CLOUD_SUPABASE_CONFIG = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
};

// Active configuration based on mode
export const getSupabaseConfig = () => {
  if (USE_LOCAL_SUPABASE) {
    console.log('🔧 Using Local Supabase:', LOCAL_SUPABASE_CONFIG.url);
    return LOCAL_SUPABASE_CONFIG;
  }
  console.log('☁️ Using Cloud Supabase:', CLOUD_SUPABASE_CONFIG.url);
  return CLOUD_SUPABASE_CONFIG;
};

// Export active config
export const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseConfig();

// Server endpoint configuration
export const getServerUrl = () => {
  if (USE_LOCAL_SUPABASE) {
    return `${LOCAL_SUPABASE_CONFIG.url}/functions/v1/make-server-fe7e8957`;
  }
  return `${supabaseUrl}/functions/v1/make-server-fe7e8957`;
};

export const SERVER_URL = getServerUrl();

// Export project ID for use in other parts of the app
export const PROJECT_ID = projectId;
