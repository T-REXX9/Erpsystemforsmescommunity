import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { SidebarHeader as ShadcnSidebarHeader } from '../ui/sidebar';
import { APP_CONFIG, ANIMATION_CONFIG } from '../../constants';

export function SidebarHeader() {
  return (
    <ShadcnSidebarHeader>
      <motion.div
        {...ANIMATION_CONFIG.header}
        className="flex items-center gap-2 px-4 py-2"
      >
        <motion.div
          {...ANIMATION_CONFIG.logo}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
        >
          <Calculator className="h-4 w-4" />
        </motion.div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{APP_CONFIG.name}</span>
          <span className="truncate text-xs">{APP_CONFIG.tagline}</span>
        </div>
      </motion.div>
    </ShadcnSidebarHeader>
  );
}
