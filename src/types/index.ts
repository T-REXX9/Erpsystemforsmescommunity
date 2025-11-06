import { LucideIcon } from 'lucide-react';

// Module types
export type ModuleId =
  // Core
  | 'home'
  | 'dashboard' // Keep for backwards compatibility

  // Warehouse Module
  | 'warehouse'
  | 'warehouse-inventory'
  | 'stock-movement'
  | 'product-database'
  | 'transfer-stock'
  | 'inventory-audit'
  | 'warehouse-purchasing'
  | 'purchase-request'
  | 'purchase-order'
  | 'receiving-stock'
  | 'return-to-supplier'
  | 'warehouse-reports'
  | 'inventory-report'
  | 'reorder-report'
  | 'item-suggested-stock-report'
  | 'fast-slow-inventory-report'

  // Sales Module
  | 'sales'
  | 'sales-transaction'
  | 'sales-inquiry'
  | 'sales-order'
  | 'order-slip'
  | 'invoice'
  | 'sales-reports'
  | 'inquiry-report'
  | 'sales-report'
  | 'sales-development-report'

  // Accounting Module
  | 'accounting'
  | 'accounting-transactions'
  | 'freight-charges-debit'
  | 'sales-return-credit'
  | 'adjustment-entry'
  | 'daily-collection-entry'
  | 'accounting-accounting'
  | 'customer-ledger'
  | 'collection-summary'
  | 'statement-of-account'
  | 'accounts-receivable'
  | 'accounting-reports'
  | 'freight-charges-report'
  | 'sales-return-report'
  | 'purchase-history'
  | 'inactive-active-customers'
  | 'old-new-customers'
  | 'daily-calls-monitoring'

  // Maintenance Module
  | 'maintenance'
  | 'maintenance-customer'
  | 'customer-data'
  | 'daily-call-monitoring'
  | 'customer-group'
  | 'maintenance-product'
  | 'suppliers'
  | 'special-price'
  | 'category-management'
  | 'courier-management'
  | 'remark-templates'
  | 'maintenance-profile'
  | 'staff'
  | 'team'
  | 'approver'
  | 'activity-logs'
  | 'system-access'
  | 'server-maintenance'

  // Communication Module
  | 'communication'
  | 'text-menu'
  | 'text-messages'
  | 'inbox'
  | 'sent'
  | 'pending'
  | 'failed'
  | 'operator'

  // Legacy/Keep for backwards compatibility
  | 'quick-invoice'
  | 'quick-billing'
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