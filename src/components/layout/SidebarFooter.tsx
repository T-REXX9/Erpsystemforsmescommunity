import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import {
  SidebarFooter as ShadcnSidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/sidebar';
import { ANIMATION_CONFIG } from '../../constants';
import { UserMenu } from '../auth/UserMenu';

interface SidebarFooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function SidebarFooter({ isDark, onToggleTheme }: SidebarFooterProps) {
  return (
    <ShadcnSidebarFooter className="border-t border-sidebar-border mt-auto">
      <SidebarMenu>
        {/* User Menu */}
        <SidebarMenuItem>
          <UserMenu />
        </SidebarMenuItem>

        {/* Theme Toggle */}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={onToggleTheme}
            tooltip={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-full transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md"
          >
            <motion.div
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-sidebar-foreground/70"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </motion.div>
            <span className="text-sidebar-foreground/90">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </ShadcnSidebarFooter>
  );
}