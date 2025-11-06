/**
 * Authentication and Authorization Types
 */

// User roles in the ERP system
export type UserRole = 
  | 'super_admin'      // Full system access
  | 'admin'            // Company-wide access
  | 'manager'          // Department management access
  | 'accountant'       // Accounting & financial access
  | 'inventory_manager'// Inventory & stock access
  | 'hr_manager'       // Payroll & employee access
  | 'sales'            // Invoicing & billing access
  | 'viewer';          // Read-only access

// Permission types for granular access control
export type Permission =
  | 'dashboard.view'
  | 'accounting.view'
  | 'accounting.create'
  | 'accounting.edit'
  | 'accounting.delete'
  | 'inventory.view'
  | 'inventory.create'
  | 'inventory.edit'
  | 'inventory.delete'
  | 'tax.view'
  | 'tax.create'
  | 'tax.edit'
  | 'tax.delete'
  | 'payroll.view'
  | 'payroll.create'
  | 'payroll.edit'
  | 'payroll.delete'
  | 'invoicing.view'
  | 'invoicing.create'
  | 'invoicing.edit'
  | 'invoicing.delete'
  | 'reports.view'
  | 'reports.export'
  | 'settings.view'
  | 'settings.edit'
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete';

// User profile stored in database
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
}

// Auth context state
export interface AuthState {
  user: UserProfile | null;
  session: any | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Auth context actions
export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  refreshUser: () => Promise<void>;
}

// Role-based permission matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'dashboard.view',
    'accounting.view', 'accounting.create', 'accounting.edit', 'accounting.delete',
    'inventory.view', 'inventory.create', 'inventory.edit', 'inventory.delete',
    'tax.view', 'tax.create', 'tax.edit', 'tax.delete',
    'payroll.view', 'payroll.create', 'payroll.edit', 'payroll.delete',
    'invoicing.view', 'invoicing.create', 'invoicing.edit', 'invoicing.delete',
    'reports.view', 'reports.export',
    'settings.view', 'settings.edit',
    'users.view', 'users.create', 'users.edit', 'users.delete',
  ],
  admin: [
    'dashboard.view',
    'accounting.view', 'accounting.create', 'accounting.edit', 'accounting.delete',
    'inventory.view', 'inventory.create', 'inventory.edit', 'inventory.delete',
    'tax.view', 'tax.create', 'tax.edit', 'tax.delete',
    'payroll.view', 'payroll.create', 'payroll.edit', 'payroll.delete',
    'invoicing.view', 'invoicing.create', 'invoicing.edit', 'invoicing.delete',
    'reports.view', 'reports.export',
    'settings.view', 'settings.edit',
    'users.view', 'users.create', 'users.edit',
  ],
  manager: [
    'dashboard.view',
    'accounting.view', 'accounting.create', 'accounting.edit',
    'inventory.view', 'inventory.create', 'inventory.edit',
    'tax.view', 'tax.create', 'tax.edit',
    'payroll.view', 'payroll.create', 'payroll.edit',
    'invoicing.view', 'invoicing.create', 'invoicing.edit',
    'reports.view', 'reports.export',
    'settings.view',
  ],
  accountant: [
    'dashboard.view',
    'accounting.view', 'accounting.create', 'accounting.edit',
    'tax.view', 'tax.create', 'tax.edit',
    'invoicing.view', 'invoicing.create', 'invoicing.edit',
    'reports.view', 'reports.export',
  ],
  inventory_manager: [
    'dashboard.view',
    'inventory.view', 'inventory.create', 'inventory.edit',
    'invoicing.view', 'invoicing.create',
    'reports.view',
  ],
  hr_manager: [
    'dashboard.view',
    'payroll.view', 'payroll.create', 'payroll.edit',
    'reports.view', 'reports.export',
  ],
  sales: [
    'dashboard.view',
    'invoicing.view', 'invoicing.create', 'invoicing.edit',
    'inventory.view',
    'reports.view',
  ],
  viewer: [
    'dashboard.view',
    'accounting.view',
    'inventory.view',
    'tax.view',
    'payroll.view',
    'invoicing.view',
    'reports.view',
  ],
};

// Helper to get permissions for a role
export const getRolePermissions = (role: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

// Helper to check if role has specific permission
export const roleHasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};
