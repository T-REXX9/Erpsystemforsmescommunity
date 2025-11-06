import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from '../ui/sidebar';
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
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader />
      <SidebarContent>
        <SidebarNav activeModule={activeModule} onModuleChange={onModuleChange} />
      </SidebarContent>
      <SidebarFooter isDark={isDark} onToggleTheme={onToggleTheme} />
      <SidebarRail />
    </Sidebar>
  );
}
