/**
 * Hook to filter menu items based on user role and permissions
 */

import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../constants/menu';

export function useFilteredMenu(): MenuItem[] {
  const { user, hasRole } = useAuth();

  return useMemo(() => {
    if (!user) return [];

    // Filter menu items based on role
    return MENU_ITEMS.filter(item => {
      // User Management is only for admins
      if (item.id === 'users') {
        return hasRole(['super_admin', 'admin']);
      }

      // Settings is for managers and above
      if (item.id === 'settings') {
        return hasRole(['super_admin', 'admin', 'manager']);
      }

      // HR & Payroll modules
      if (item.id === 'payroll') {
        return hasRole(['super_admin', 'admin', 'manager', 'hr_manager']);
      }

      // Tax & Compliance modules
      if (item.id === 'tax') {
        return hasRole(['super_admin', 'admin', 'manager', 'accountant']);
      }

      // Accounting modules
      if (item.id === 'accounting') {
        return hasRole(['super_admin', 'admin', 'manager', 'accountant', 'sales']);
      }

      // Inventory modules
      if (item.id === 'inventory') {
        return hasRole(['super_admin', 'admin', 'manager', 'inventory_manager', 'sales']);
      }

      // Quick actions available to most roles except viewer
      if (item.id === 'quick-invoice') {
        return !hasRole('viewer');
      }

      // Dashboard is available to everyone
      return true;
    });
  }, [user, hasRole]);
}
