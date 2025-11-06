import { useState, useCallback } from 'react';
import { ModuleId } from '../types';

export function useModuleNavigation(initialModule: ModuleId = 'dashboard') {
  const [activeModule, setActiveModule] = useState<ModuleId>(initialModule);

  const navigateToModule = useCallback((module: ModuleId) => {
    setActiveModule(module);
  }, []);

  const navigateToQuickInvoice = useCallback(() => {
    setActiveModule('quick-invoice');
  }, []);

  const navigateToQuickBilling = useCallback(() => {
    setActiveModule('quick-billing');
  }, []);

  return {
    activeModule,
    navigateToModule,
    navigateToQuickInvoice,
    navigateToQuickBilling,
  };
}
