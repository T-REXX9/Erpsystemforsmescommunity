import { SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './layout/AppSidebar';
import { AppHeader } from './layout/AppHeader';
import { useTheme } from '../hooks';
import { LayoutProps } from '../types';

export function Layout({ children, activeModule, onModuleChange }: LayoutProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeModule={activeModule}
          onModuleChange={onModuleChange}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-hidden">
          <AppHeader />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
