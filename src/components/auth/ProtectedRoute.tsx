/**
 * Protected Route Component
 * Wraps components that require authentication
 */

import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Permission, UserRole } from '../../types/auth';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requiredRole?: UserRole | UserRole[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredRole,
  fallback 
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, hasPermission, hasRole } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Check permission if required
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this resource.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            Your role doesn't have access to this resource.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}
