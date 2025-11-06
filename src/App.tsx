import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Accounting } from './components/Accounting';
import { Inventory } from './components/Inventory';
import { TaxCompliance } from './components/TaxCompliance';
import { Payroll } from './components/Payroll';
import { QuickInvoice } from './components/QuickInvoice';
import { QuickBilling } from './components/QuickBilling';
import { FloatingActionButton } from './components/FloatingActionButton';

function Settings() {
  return (
    <div className="p-6">
      <h1>Settings</h1>
      <p className="text-muted-foreground">Configure your ERP system settings</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">Company Settings</h3>
          <p className="text-sm text-muted-foreground">Manage company information and preferences</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">User Management</h3>
          <p className="text-sm text-muted-foreground">Add and manage user accounts and permissions</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">Tax Configuration</h3>
          <p className="text-sm text-muted-foreground">Configure GST rates and tax settings</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">Integration</h3>
          <p className="text-sm text-muted-foreground">Connect with banks and third-party services</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">Backup & Security</h3>
          <p className="text-sm text-muted-foreground">Manage data backup and security settings</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="font-medium mb-2">Reports & Analytics</h3>
          <p className="text-sm text-muted-foreground">Customize reports and analytics preferences</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const handleQuickInvoice = () => {
    setActiveModule('quick-invoice');
  };

  const handleQuickBilling = () => {
    setActiveModule('quick-billing');
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <Dashboard 
            onQuickInvoice={handleQuickInvoice}
            onQuickBilling={handleQuickBilling}
          />
        );
      case 'quick-invoice':
        return <QuickInvoice />;
      case 'quick-billing':
        return <QuickBilling />;
      case 'accounting':
        return <Accounting />;
      case 'inventory':
        return <Inventory />;
      case 'tax':
        return <TaxCompliance />;
      case 'payroll':
        return <Payroll />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard 
            onQuickInvoice={handleQuickInvoice}
            onQuickBilling={handleQuickBilling}
          />
        );
    }
  };

  return (
    <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
      {renderModule()}
      <FloatingActionButton 
        onQuickInvoice={handleQuickInvoice}
        onQuickBilling={handleQuickBilling}
      />
    </Layout>
  );
}