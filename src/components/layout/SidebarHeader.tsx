import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar';
import { APP_CONFIG, ANIMATION_CONFIG } from '../../constants';

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader className="border-b border-sidebar-border">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent group-data-[collapsible=icon]:!p-2"
          >
            <motion.div
              {...ANIMATION_CONFIG.logo}
              className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md"
            >
              <Calculator className="size-4" />
            </motion.div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-sidebar-foreground">{APP_CONFIG.name}</span>
              <span className="truncate text-xs text-sidebar-foreground/60">{APP_CONFIG.tagline}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </ShadcnSidebarHeader>
  );
}
