/**
 * Authentication Context Provider
 * 
 * Manages user authentication state and provides auth methods throughout the app
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, UserProfile, Permission, UserRole, getRolePermissions } from '../types/auth';
import getSupabaseClient from '../utils/supabase/client';
import { SERVER_URL, SUPABASE_ANON_KEY } from '../config/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = getSupabaseClient();

  // Initialize auth state
  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile from server
  const fetchUserProfile = async (userId: string) => {
    try {
      const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
      
      const response = await fetch(`${SERVER_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.error('Failed to fetch user profile:', await response.text());
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.session) {
        // Update last login
        await fetch(`${SERVER_URL}/auth/update-last-login`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${data.session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        await fetchUserProfile(data.user.id);
        return { success: true };
      }

      return { success: false, error: 'No session created' };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign in failed' };
    }
  };

  // Sign up (creates user via server)
  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Sign up failed' };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign up failed' };
    }
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // Check if user has specific permission
  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions.includes(permission);
  };

  // Check if user has specific role(s)
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  // Refresh user profile
  const refreshUser = async () => {
    if (session?.user) {
      await fetchUserProfile(session.user.id);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isAuthenticated: !!user && !!session,
    signIn,
    signUp,
    signOut,
    hasPermission,
    hasRole,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
