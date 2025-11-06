# Environment Variables Setup

This document explains how to configure environment variables for the ERP System.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env`** with your Supabase credentials

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Environment Variables

All environment variables are prefixed with `VITE_` to be accessible in the frontend (Vite requirement).

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_PROJECT_ID` | Your Supabase project ID | `jajjvvlmmwtsooeeomdy` |
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key | `eyJhbGc...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_USE_LOCAL_SUPABASE` | Use local Supabase instance | `false` |
| `VITE_LOCAL_SUPABASE_URL` | Local Supabase URL | `http://localhost:54321` |
| `VITE_LOCAL_SUPABASE_ANON_KEY` | Local Supabase anon key | - |
| `VITE_APP_NAME` | Application name | `ERP System for SMEs` |
| `VITE_APP_VERSION` | Application version | `0.1.0` |

---

## Getting Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project ID** (from URL) → `VITE_SUPABASE_PROJECT_ID`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

---

## Using Local Supabase

If you want to use a local Supabase instance for development:

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Start local Supabase:**
   ```bash
   supabase start
   ```

3. **Update `.env`:**
   ```env
   VITE_USE_LOCAL_SUPABASE=true
   VITE_LOCAL_SUPABASE_URL=http://localhost:54321
   VITE_LOCAL_SUPABASE_ANON_KEY=your-local-anon-key
   ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

---

## Security Notes

### ✅ Safe to Commit
- `.env.example` - Template file with placeholder values

### ❌ Never Commit
- `.env` - Contains your actual credentials
- `.env.local` - Local overrides
- `.env.production` - Production credentials

The `.gitignore` file is already configured to exclude these files.

### Public vs Private Keys

- **Anon/Public Key (`VITE_SUPABASE_ANON_KEY`)**: Safe to expose in frontend code. Has limited permissions based on Row Level Security (RLS) policies.
- **Service Role Key**: **NEVER** expose in frontend. Only use in backend/server code.

---

## Troubleshooting

### Environment variables not loading

1. **Restart the dev server** after changing `.env`
2. **Check variable names** - Must start with `VITE_`
3. **Check file location** - `.env` must be in project root
4. **Clear cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### "Invalid API key" error

1. Verify your `VITE_SUPABASE_ANON_KEY` is correct
2. Check that the key matches your project
3. Ensure no extra spaces or quotes in `.env`

### Seed script not working

1. Make sure dotenv is installed:
   ```bash
   npm install
   ```

2. Verify `.env` file exists in project root
3. Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set

---

## Example `.env` File

```env
# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=jajjvvlmmwtsooeeomdy
VITE_SUPABASE_URL=https://jajjvvlmmwtsooeeomdy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Application Configuration
VITE_APP_NAME=ERP System for SMEs
VITE_APP_VERSION=0.1.0
```

---

## Related Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Authentication Guide](../src/docs/AUTHENTICATION.md)

