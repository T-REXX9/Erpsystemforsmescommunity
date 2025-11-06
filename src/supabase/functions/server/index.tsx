import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-fe7e8957/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// AUTHENTICATION ENDPOINTS
// ========================================

/**
 * Sign up - Create a new user
 * Automatically confirms email since email server is not configured
 */
app.post("/make-server-fe7e8957/auth/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();

    // Validate input
    if (!email || !password || !name || !role) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth error while creating user:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store user profile in KV store
    const userProfile = {
      id: authData.user.id,
      email,
      name,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true,
    };

    await kv.set(`user:${authData.user.id}`, userProfile);

    console.log(`✅ User created successfully: ${email} (${role})`);
    return c.json({ 
      success: true, 
      user: userProfile,
      message: 'User created successfully'
    });
  } catch (error: any) {
    console.error('Error during signup:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * Get user profile
 * Requires authentication
 */
app.get("/make-server-fe7e8957/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    // Verify user with access token
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.error('Authorization error while fetching user profile:', error);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      console.error(`User profile not found for user: ${user.id}`);
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ user: userProfile });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * Update last login timestamp
 * Requires authentication
 */
app.post("/make-server-fe7e8957/auth/update-last-login", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get existing profile
    const userProfile = await kv.get(`user:${user.id}`);

    if (userProfile) {
      userProfile.last_login = new Date().toISOString();
      userProfile.updated_at = new Date().toISOString();
      await kv.set(`user:${user.id}`, userProfile);
    }

    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating last login:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

/**
 * Get all users (Admin only)
 * Requires authentication and admin role
 */
app.get("/make-server-fe7e8957/auth/users", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check if user is admin
    const userProfile = await kv.get(`user:${user.id}`);
    if (!userProfile || !['super_admin', 'admin'].includes(userProfile.role)) {
      return c.json({ error: 'Forbidden: Admin access required' }, 403);
    }

    // Get all users from KV store
    const users = await kv.getByPrefix('user:');

    return c.json({ users });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ========================================
// END AUTHENTICATION ENDPOINTS
// ========================================

Deno.serve(app.fetch);