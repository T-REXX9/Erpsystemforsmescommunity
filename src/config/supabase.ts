/**
 * Supabase Configuration
 * 
 * Centralized configuration for Supabase client that supports both:
 * - Cloud-hosted Supabase (production)
 * - Self-hosted/Local Supabase (development)
 * 
 * Usage:
 * 1. For cloud: Use projectId and publicAnonKey from utils/supabase/info
 * 2. For local: Set USE_LOCAL_SUPABASE=true and configure LOCAL_SUPABASE_URL
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';

// Configuration mode: Set to true to use local Supabase
export const USE_LOCAL_SUPABASE = false;

// Local Supabase configuration (for self-hosted instances)
export const LOCAL_SUPABASE_CONFIG = {
  url: 'http://localhost:54321',
  anonKey: 'your-local-anon-key-here',
};

// Cloud Supabase configuration (automatically from info.tsx)
export const CLOUD_SUPABASE_CONFIG = {
  url: `https://${projectId}.supabase.co`,
  anonKey: publicAnonKey,
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
  return `https://${projectId}.supabase.co/functions/v1/make-server-fe7e8957`;
};

export const SERVER_URL = getServerUrl();
