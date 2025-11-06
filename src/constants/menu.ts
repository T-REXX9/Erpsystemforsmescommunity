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
  Home,
  PackageSearch,
  ArrowRightLeft,
  Database,
  ClipboardCheck,
  FileText,
  ShoppingBag,
  PackageCheck,
  PackageX,
  BarChart3,
  AlertCircle,
  Zap as Lightning,
  FileBarChart,
  ShoppingCartIcon,
  FileEdit,
  Truck,
  MinusCircle,
  PlusCircle,
  Wallet,
  BookOpenCheck,
  FileCheck,
  UserCircle,
  PhoneCall,
  UsersRound,
  Tag,
  MapPin,
  MessageSquare,
  Wrench,
  Building2,
  UserCog,
  ClipboardList,
  Lock,
  Server,
  MessageCircle,
  Inbox,
  Send,
  Clock,
  XCircle,
  Radio,
} from 'lucide-react';
import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'home',
    title: 'HOME',
    icon: Home,
  },
  {
    id: 'warehouse',
    title: 'WAREHOUSE',
    icon: Warehouse,
    subItems: [
      {
        id: 'warehouse-inventory',
        title: 'INVENTORY',
        icon: Package,
        subItems: [
          {
            id: 'stock-movement',
            title: 'Stock Movement',
            icon: ArrowRightLeft,
          },
          {
            id: 'product-database',
            title: 'Product Database',
            icon: Database,
          },
          {
            id: 'transfer-stock',
            title: 'Transfer Stock',
            icon: Truck,
          },
          {
            id: 'inventory-audit',
            title: 'Inventory Audit',
            icon: ClipboardCheck,
          },
        ],
      },
      {
        id: 'warehouse-purchasing',
        title: 'PURCHASING',
        icon: ShoppingBag,
        subItems: [
          {
            id: 'purchase-request',
            title: 'Purchase Request',
            icon: FileText,
          },
          {
            id: 'purchase-order',
            title: 'Purchase Order',
            icon: FileEdit,
          },
          {
            id: 'receiving-stock',
            title: 'Receiving Stock',
            icon: PackageCheck,
          },
          {
            id: 'return-to-supplier',
            title: 'Return to Supplier',
            icon: PackageX,
          },
        ],
      },
      {
        id: 'warehouse-reports',
        title: 'REPORTS',
        icon: FileBarChart,
        subItems: [
          {
            id: 'inventory-report',
            title: 'Inventory Report',
            icon: BarChart3,
          },
          {
            id: 'reorder-report',
            title: 'Reorder Report',
            icon: AlertCircle,
          },
          {
            id: 'item-suggested-stock-report',
            title: 'Item Suggested for Stock Report',
            icon: FileCheck,
          },
          {
            id: 'fast-slow-inventory-report',
            title: 'Fast/Slow Inventory Report',
            icon: TrendingUp,
          },
        ],
      },
    ],
  },
  {
    id: 'sales',
    title: 'SALES',
    icon: ShoppingCart,
    subItems: [
      {
        id: 'sales-transaction',
        title: 'TRANSACTION',
        icon: CreditCard,
        subItems: [
          {
            id: 'sales-inquiry',
            title: 'Sales Inquiry',
            icon: FileText,
          },
          {
            id: 'sales-order',
            title: 'Sales Order',
            icon: FileEdit,
          },
          {
            id: 'order-slip',
            title: 'Order Slip',
            icon: Receipt,
          },
          {
            id: 'invoice',
            title: 'Invoice',
            icon: FileSpreadsheet,
          },
        ],
      },
      {
        id: 'sales-reports',
        title: 'REPORTS',
        icon: FileBarChart,
        subItems: [
          {
            id: 'inquiry-report',
            title: 'Inquiry Report',
            icon: BarChart3,
          },
          {
            id: 'sales-report',
            title: 'Sales Report',
            icon: TrendingUp,
          },
          {
            id: 'sales-development-report',
            title: 'Sales Development Report',
            icon: FileCheck,
          },
        ],
      },
    ],
  },
  {
    id: 'accounting',
    title: 'ACCOUNTING',
    icon: Calculator,
    subItems: [
      {
        id: 'accounting-transactions',
        title: 'TRANSACTIONS',
        icon: Wallet,
        subItems: [
          {
            id: 'freight-charges-debit',
            title: 'Freight Charges (Debit)',
            icon: Truck,
          },
          {
            id: 'sales-return-credit',
            title: 'Sales Return (Credit)',
            icon: PackageX,
          },
          {
            id: 'adjustment-entry',
            title: 'Adjustment Entry (Debit/Credit)',
            icon: FileEdit,
          },
          {
            id: 'daily-collection-entry',
            title: 'Daily Collection Entry',
            icon: DollarSign,
          },
        ],
      },
      {
        id: 'accounting-accounting',
        title: 'ACCOUNTING',
        icon: BookOpen,
        subItems: [
          {
            id: 'customer-ledger',
            title: 'Customer Ledger',
            icon: BookOpenCheck,
          },
          {
            id: 'collection-summary',
            title: 'Collection Summary',
            icon: FileCheck,
          },
          {
            id: 'statement-of-account',
            title: 'Statement of Account',
            icon: FileSpreadsheet,
          },
          {
            id: 'accounts-receivable',
            title: 'Accounts Receivable',
            icon: Receipt,
          },
        ],
      },
      {
        id: 'accounting-reports',
        title: 'REPORTS',
        icon: FileBarChart,
        subItems: [
          {
            id: 'freight-charges-report',
            title: 'Freight Charges (Debit) Report',
            icon: BarChart3,
          },
          {
            id: 'sales-return-report',
            title: 'Sales Return (Credit) Report',
            icon: TrendingUp,
          },
          {
            id: 'purchase-history',
            title: 'Purchase History',
            icon: FileText,
          },
          {
            id: 'inactive-active-customers',
            title: 'Inactive/Active Customers',
            icon: Users,
          },
          {
            id: 'old-new-customers',
            title: 'Old/New Customers',
            icon: UserCircle,
          },
          {
            id: 'daily-calls-monitoring',
            title: 'Daily Calls Monitoring',
            icon: PhoneCall,
          },
        ],
      },
    ],
  },
  {
    id: 'maintenance',
    title: 'MAINTENANCE',
    icon: Wrench,
    subItems: [
      {
        id: 'maintenance-customer',
        title: 'CUSTOMER',
        icon: UsersRound,
        subItems: [
          {
            id: 'customer-data',
            title: 'Customer Data',
            icon: Database,
          },
          {
            id: 'daily-call-monitoring',
            title: 'Daily Call Monitoring',
            icon: PhoneCall,
          },
          {
            id: 'customer-group',
            title: 'Customer Group',
            icon: Users,
          },
        ],
      },
      {
        id: 'maintenance-product',
        title: 'PRODUCT',
        icon: Package,
        subItems: [
          {
            id: 'suppliers',
            title: 'Suppliers',
            icon: Building2,
          },
          {
            id: 'special-price',
            title: 'Special Price',
            icon: Tag,
          },
          {
            id: 'category-management',
            title: 'Category Management',
            icon: Boxes,
          },
          {
            id: 'courier-management',
            title: 'Courier Management',
            icon: MapPin,
          },
          {
            id: 'remark-templates',
            title: 'Remark Templates',
            icon: MessageSquare,
          },
        ],
      },
      {
        id: 'maintenance-profile',
        title: 'PROFILE',
        icon: UserCog,
        subItems: [
          {
            id: 'staff',
            title: 'Staff',
            icon: UserCheck,
          },
          {
            id: 'team',
            title: 'Team',
            icon: UsersRound,
          },
          {
            id: 'approver',
            title: 'Approver',
            icon: Shield,
          },
          {
            id: 'activity-logs',
            title: 'Activity Logs',
            icon: ClipboardList,
          },
          {
            id: 'system-access',
            title: 'System Access',
            icon: Lock,
          },
          {
            id: 'server-maintenance',
            title: 'Server Maintenance',
            icon: Server,
          },
        ],
      },
    ],
  },
  {
    id: 'communication',
    title: 'COMMUNICATION',
    icon: MessageCircle,
    subItems: [
      {
        id: 'text-menu',
        title: 'TEXT MENU',
        icon: MessageSquare,
        subItems: [
          {
            id: 'text-messages',
            title: 'Text Messages',
            icon: MessageCircle,
          },
          {
            id: 'inbox',
            title: 'Inbox',
            icon: Inbox,
          },
          {
            id: 'sent',
            title: 'Sent',
            icon: Send,
          },
          {
            id: 'pending',
            title: 'Pending',
            icon: Clock,
          },
          {
            id: 'failed',
            title: 'Failed',
            icon: XCircle,
          },
          {
            id: 'operator',
            title: 'Operator',
            icon: Radio,
          },
        ],
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
  },
];