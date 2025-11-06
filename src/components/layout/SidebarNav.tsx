import {
  SidebarContent,
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
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
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
    </SidebarContent>
  );
}