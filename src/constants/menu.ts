import {
  LayoutDashboard,
  Calculator,
  Package,
  Users,
  Settings,
  Zap,
  Receipt,
  BookOpen,
  CreditCard,
  TrendingUp,
  Boxes,
  ShoppingCart,
  Warehouse,
  Scale,
  Percent,
  FileSpreadsheet,
  DollarSign,
  UserCheck,
  Shield,
} from 'lucide-react';
import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'quick-invoice',
    title: 'Quick Actions',
    icon: Zap,
    subItems: [
      {
        id: 'quick-invoice',
        title: 'Quick Invoice',
        icon: Receipt,
      },
      {
        id: 'quick-billing',
        title: 'Quick Billing',
        icon: CreditCard,
      },
    ],
  },
  {
    id: 'accounting',
    title: 'Accounting',
    icon: Calculator,
    subItems: [
      {
        id: 'accounting',
        title: 'Overview',
        icon: BookOpen,
      },
      {
        id: 'ledger',
        title: 'Ledger',
        icon: BookOpen,
      },
      {
        id: 'invoicing',
        title: 'Invoicing',
        icon: Receipt,
      },
      {
        id: 'reports',
        title: 'Financial Reports',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: Package,
    subItems: [
      {
        id: 'inventory',
        title: 'Overview',
        icon: Boxes,
      },
      {
        id: 'stock',
        title: 'Stock Tracking',
        icon: Warehouse,
      },
      {
        id: 'orders',
        title: 'Order Processing',
        icon: ShoppingCart,
      },
    ],
  },
  {
    id: 'tax',
    title: 'Tax & Compliance',
    icon: Scale,
    subItems: [
      {
        id: 'tax',
        title: 'Tax Compliance',
        icon: Percent,
      },
      {
        id: 'gst',
        title: 'GST',
        icon: FileSpreadsheet,
      },
      {
        id: 'tds',
        title: 'TDS',
        icon: DollarSign,
      },
    ],
  },
  {
    id: 'payroll',
    title: 'HR & Payroll',
    icon: Users,
    subItems: [
      {
        id: 'payroll',
        title: 'Payroll',
        icon: DollarSign,
      },
      {
        id: 'employees',
        title: 'Employees',
        icon: UserCheck,
      },
    ],
  },
  {
    id: 'users',
    title: 'User Management',
    icon: Shield,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
  },
];