/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase Configuration
  readonly VITE_SUPABASE_PROJECT_ID: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  
  // Local Supabase Configuration
  readonly VITE_USE_LOCAL_SUPABASE?: string
  readonly VITE_LOCAL_SUPABASE_URL?: string
  readonly VITE_LOCAL_SUPABASE_ANON_KEY?: string
  
  // Application Configuration
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

