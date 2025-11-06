import { Sidebar } from '../ui/sidebar';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarFooter } from './SidebarFooter';
import { ModuleId } from '../../types';

interface AppSidebarProps {
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function AppSidebar({ activeModule, onModuleChange, isDark, onToggleTheme }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      <SidebarNav activeModule={activeModule} onModuleChange={onModuleChange} />
      <SidebarFooter isDark={isDark} onToggleTheme={onToggleTheme} />
    </Sidebar>
  );
}
