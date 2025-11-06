import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';
import {
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { MenuItem, ModuleId } from '../../types';
import { ANIMATION_CONFIG, TYPOGRAPHY, ICON_SIZES } from '../../constants';

interface SidebarMenuItemProps {
  item: MenuItem;
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
  index: number;
}

// Recursive component for nested sub-items
function NestedSubItem({
  subItem,
  activeModule,
  onModuleChange,
  subIndex,
  level = 1
}: {
  subItem: MenuItem;
  activeModule: ModuleId;
  onModuleChange: (module: ModuleId) => void;
  subIndex: number;
  level?: number;
}) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  if (subItem.subItems) {
    // Level 2: Second-level menu items (INVENTORY, PURCHASING, REPORTS)
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isSubOpen} onOpenChange={setIsSubOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="w-full justify-between transition-all duration-200 hover:bg-sidebar-accent/30">
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <subItem.icon className={ICON_SIZES.menuLevel2} />
                </motion.div>
                <span className={TYPOGRAPHY.menuLevel2}>{subItem.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isSubOpen ? 180 : 0 }}
                transition={ANIMATION_CONFIG.chevron.transition}
              >
                <ChevronDown className={ICON_SIZES.menuChevron} />
              </motion.div>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub className="ml-3">
              <AnimatePresence>
                {isSubOpen && subItem.subItems.map((nestedItem, nestedIndex) => (
                  <motion.div
                    key={nestedItem.id}
                    initial={ANIMATION_CONFIG.subMenuItem.initial}
                    animate={ANIMATION_CONFIG.subMenuItem.animate}
                    exit={ANIMATION_CONFIG.subMenuItem.exit}
                    transition={{ delay: nestedIndex * ANIMATION_CONFIG.stagger.delay, duration: 0.2 }}
                  >
                    {/* Level 3: Third-level menu items (Stock Movement, Purchase Order, etc.) */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        onClick={() => onModuleChange(nestedItem.id)}
                        className={cn(
                          'transition-all duration-200 hover:translate-x-1',
                          activeModule === nestedItem.id && 'bg-sidebar-accent text-sidebar-accent-foreground'
                        )}
                      >
                        <a href="#" className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <nestedItem.icon className={ICON_SIZES.menuLevel3} />
                          </motion.div>
                          <span className={TYPOGRAPHY.menuLevel3}>{nestedItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuSubItem>
    );
  }

  // Level 2: Second-level menu items without sub-items (if any)
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        asChild
        onClick={() => onModuleChange(subItem.id)}
        className={cn(
          'transition-all duration-200 hover:translate-x-1',
          activeModule === subItem.id && 'bg-sidebar-accent text-sidebar-accent-foreground'
        )}
      >
        <a href="#" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <subItem.icon className={ICON_SIZES.menuLevel2} />
          </motion.div>
          <span className={TYPOGRAPHY.menuLevel2}>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function SidebarMenuItem({ item, activeModule, onModuleChange, index }: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
    // Level 1: Top-level menu items (HOME, WAREHOUSE, SALES, ACCOUNTING, etc.)
    return (
      <motion.div
        initial={ANIMATION_CONFIG.menuItem.initial}
        animate={ANIMATION_CONFIG.menuItem.animate}
        transition={{ delay: index * ANIMATION_CONFIG.stagger.delay, duration: ANIMATION_CONFIG.stagger.duration }}
      >
        <ShadcnSidebarMenuItem>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between transition-all duration-200 hover:bg-sidebar-accent/50">
                <div className="flex items-center gap-3">
                  <motion.div {...ANIMATION_CONFIG.iconHover}>
                    <item.icon className={ICON_SIZES.menuLevel1} />
                  </motion.div>
                  <span className={TYPOGRAPHY.menuLevel1}>{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={ANIMATION_CONFIG.chevron.transition}
                >
                  <ChevronDown className={ICON_SIZES.menuChevron} />
                </motion.div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <SidebarMenuSub>
                <AnimatePresence>
                  {isOpen && item.subItems.map((subItem, subIndex) => (
                    <motion.div
                      key={subItem.id}
                      initial={ANIMATION_CONFIG.subMenuItem.initial}
                      animate={ANIMATION_CONFIG.subMenuItem.animate}
                      exit={ANIMATION_CONFIG.subMenuItem.exit}
                      transition={{ delay: subIndex * ANIMATION_CONFIG.stagger.delay, duration: 0.2 }}
                    >
                      <NestedSubItem
                        subItem={subItem}
                        activeModule={activeModule}
                        onModuleChange={onModuleChange}
                        subIndex={subIndex}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </ShadcnSidebarMenuItem>
      </motion.div>
    );
  }

  // Level 1: Top-level menu items without sub-items (HOME, Settings)
  return (
    <motion.div
      initial={ANIMATION_CONFIG.menuItem.initial}
      animate={ANIMATION_CONFIG.menuItem.animate}
      transition={{ delay: index * ANIMATION_CONFIG.stagger.delay, duration: ANIMATION_CONFIG.stagger.duration }}
    >
      <ShadcnSidebarMenuItem>
        <SidebarMenuButton
          asChild
          onClick={() => onModuleChange(item.id)}
          className={cn(
            'transition-all duration-200 hover:bg-sidebar-accent/50',
            activeModule === item.id && 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}
        >
          <a href="#" className="flex items-center gap-3">
            <motion.div {...ANIMATION_CONFIG.iconHover}>
              <item.icon className={ICON_SIZES.menuLevel1} />
            </motion.div>
            <span className={TYPOGRAPHY.menuLevel1}>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    </motion.div>
  );
}
