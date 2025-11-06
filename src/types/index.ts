import { LucideIcon } from 'lucide-react';

// Module types
export type ModuleId = 
  | 'dashboard'
  | 'quick-invoice'
  | 'quick-billing'
  | 'accounting'
  | 'ledger'
  | 'invoicing'
  | 'reports'
  | 'inventory'
  | 'stock'
  | 'orders'
  | 'tax'
  | 'gst'
  | 'tds'
  | 'payroll'
  | 'employees'
  | 'users'
  | 'settings';

// Menu item structure
export interface MenuItem {
  id: ModuleId;
  title: string;
  icon: LucideIcon;
  subItems?: MenuItem[];
}

// Layout props
export interface LayoutProps {
  children: React.ReactNode;
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
}

// Component props
export interface DashboardProps {
  onQuickInvoice: () => void;
  onQuickBilling: () => void;
}

export interface FloatingActionButtonProps {
  onQuickInvoice: () => void;
  onQuickBilling: () => void;
}

// Data models
export interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
}

export interface TaxRecord {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  salary: number;
  department: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}