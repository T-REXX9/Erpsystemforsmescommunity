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

interface ModuleRendererProps {
  activeModule: ModuleId;
  onQuickInvoice: () => void;
  onQuickBilling: () => void;
}

export function renderModule({ activeModule, onQuickInvoice, onQuickBilling }: ModuleRendererProps) {
  switch (activeModule) {
    case 'dashboard':
      return <Dashboard onQuickInvoice={onQuickInvoice} onQuickBilling={onQuickBilling} />;
    case 'quick-invoice':
      return <QuickInvoice />;
    case 'quick-billing':
      return <QuickBilling />;
    case 'accounting':
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