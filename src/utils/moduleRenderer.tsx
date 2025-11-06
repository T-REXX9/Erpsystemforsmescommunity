import { ModuleId } from '../types';
import {
  Dashboard,
  Accounting,
  Inventory,
  TaxCompliance,
  Payroll,
  QuickInvoice,
  QuickBilling,
  Settings,
} from '../components/modules';
import { UserManagement } from '../components/admin/UserManagement';
import { Warehouse } from '../components/Warehouse';
import { Sales } from '../components/Sales';
import { AccountingNew } from '../components/AccountingNew';
import { Maintenance } from '../components/Maintenance';
import { Communication } from '../components/Communication';

interface ModuleRendererProps {
  activeModule: ModuleId;
  onQuickInvoice: () => void;
  onQuickBilling: () => void;
}

export function renderModule({ activeModule, onQuickInvoice, onQuickBilling }: ModuleRendererProps) {
  switch (activeModule) {
    // Home/Dashboard
    case 'home':
    case 'dashboard':
      return <Dashboard onQuickInvoice={onQuickInvoice} onQuickBilling={onQuickBilling} />;

    // Warehouse Module
    case 'warehouse':
    case 'warehouse-inventory':
    case 'stock-movement':
    case 'product-database':
    case 'transfer-stock':
    case 'inventory-audit':
    case 'warehouse-purchasing':
    case 'purchase-request':
    case 'purchase-order':
    case 'receiving-stock':
    case 'return-to-supplier':
    case 'warehouse-reports':
    case 'inventory-report':
    case 'reorder-report':
    case 'item-suggested-stock-report':
    case 'fast-slow-inventory-report':
      return <Warehouse />;

    // Sales Module
    case 'sales':
    case 'sales-transaction':
    case 'sales-inquiry':
    case 'sales-order':
    case 'order-slip':
    case 'invoice':
    case 'sales-reports':
    case 'inquiry-report':
    case 'sales-report':
    case 'sales-development-report':
      return <Sales />;

    // Accounting Module (New)
    case 'accounting':
    case 'accounting-transactions':
    case 'freight-charges-debit':
    case 'sales-return-credit':
    case 'adjustment-entry':
    case 'daily-collection-entry':
    case 'accounting-accounting':
    case 'customer-ledger':
    case 'collection-summary':
    case 'statement-of-account':
    case 'accounts-receivable':
    case 'accounting-reports':
    case 'freight-charges-report':
    case 'sales-return-report':
    case 'purchase-history':
    case 'inactive-active-customers':
    case 'old-new-customers':
    case 'daily-calls-monitoring':
      return <AccountingNew />;

    // Maintenance Module
    case 'maintenance':
    case 'maintenance-customer':
    case 'customer-data':
    case 'daily-call-monitoring':
    case 'customer-group':
    case 'maintenance-product':
    case 'suppliers':
    case 'special-price':
    case 'category-management':
    case 'courier-management':
    case 'remark-templates':
    case 'maintenance-profile':
    case 'staff':
    case 'team':
    case 'approver':
    case 'activity-logs':
    case 'system-access':
    case 'server-maintenance':
      return <Maintenance />;

    // Communication Module
    case 'communication':
    case 'text-menu':
    case 'text-messages':
    case 'inbox':
    case 'sent':
    case 'pending':
    case 'failed':
    case 'operator':
      return <Communication />;

    // Legacy modules (keep for backwards compatibility)
    case 'quick-invoice':
      return <QuickInvoice />;
    case 'quick-billing':
      return <QuickBilling />;
    case 'ledger':
    case 'invoicing':
    case 'reports':
      return <Accounting />;
    case 'inventory':
    case 'stock':
    case 'orders':
      return <Inventory />;
    case 'tax':
    case 'gst':
    case 'tds':
      return <TaxCompliance />;
    case 'payroll':
    case 'employees':
      return <Payroll />;
    case 'users':
      return <UserManagement />;
    case 'settings':
      return <Settings />;

    default:
      return <Dashboard onQuickInvoice={onQuickInvoice} onQuickBilling={onQuickBilling} />;
  }
}