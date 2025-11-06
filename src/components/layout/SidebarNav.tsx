import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '../ui/sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useFilteredMenu } from '../../hooks';
import { ModuleId } from '../../types';

interface SidebarNavProps {
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
}

export function SidebarNav({ activeModule, onModuleChange }: SidebarNavProps) {
  const menuItems = useFilteredMenu();

  return (
    <SidebarGroup className="px-2">
      <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-2">
        Navigation
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              activeModule={activeModule}
              onModuleChange={onModuleChange}
              index={index}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}