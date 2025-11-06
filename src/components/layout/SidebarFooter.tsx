import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { SidebarFooter as ShadcnSidebarFooter } from '../ui/sidebar';
import { Button } from '../ui/button';
import { ANIMATION_CONFIG } from '../../constants';
import { UserMenu } from '../auth/UserMenu';

interface SidebarFooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function SidebarFooter({ isDark, onToggleTheme }: SidebarFooterProps) {
  return (
    <ShadcnSidebarFooter>
      <motion.div {...ANIMATION_CONFIG.footer} className="p-4 space-y-4">
        {/* User Menu */}
        <UserMenu />
        
        {/* Theme Toggle */}
        <motion.div {...ANIMATION_CONFIG.button}>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            className="w-full gap-2 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </motion.div>
      </motion.div>
    </ShadcnSidebarFooter>
  );
}