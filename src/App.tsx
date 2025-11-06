import { Layout } from './components/Layout';
import { FloatingActionButton } from './components/FloatingActionButton';
import { useModuleNavigation } from './hooks';
import { renderModule } from './utils';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './components/auth/LoginPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const {
    activeModule,
    navigateToModule,
    navigateToQuickInvoice,
    navigateToQuickBilling,
  } = useModuleNavigation('dashboard');

  return (
    <AuthProvider>
      <ProtectedRoute fallback={<LoginPage />}>
        <Layout activeModule={activeModule} onModuleChange={navigateToModule}>
          {renderModule({
            activeModule,
            onQuickInvoice: navigateToQuickInvoice,
            onQuickBilling: navigateToQuickBilling,
          })}
          <FloatingActionButton
            onQuickInvoice={navigateToQuickInvoice}
            onQuickBilling={navigateToQuickBilling}
          />
        </Layout>
      </ProtectedRoute>
      <Toaster />
    </AuthProvider>
  );
}