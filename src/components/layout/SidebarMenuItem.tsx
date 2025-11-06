import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';
import {
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
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
            <SidebarMenuSubButton className={cn(
              "w-full justify-between transition-all duration-200 rounded-md",
              "hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
            )}>
              <div className="flex items-center gap-2.5">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <subItem.icon className={cn(ICON_SIZES.menuLevel2, "text-sidebar-foreground/60")} />
                </motion.div>
                <span className={cn(TYPOGRAPHY.menuLevel2, "text-sidebar-foreground/90")}>{subItem.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isSubOpen ? 90 : 0 }}
                transition={ANIMATION_CONFIG.chevron.transition}
              >
                <ChevronRight className={cn(ICON_SIZES.menuChevron, "text-sidebar-foreground/40")} />
              </motion.div>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub className="ml-3 border-l pl-4">
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
                        isActive={activeModule === nestedItem.id}
                        className={cn(
                          'transition-all duration-200 rounded-md',
                          'hover:translate-x-1 hover:bg-sidebar-accent/30',
                          activeModule === nestedItem.id && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm'
                        )}
                      >
                        <a href="#" className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <nestedItem.icon className={cn(
                              ICON_SIZES.menuLevel3,
                              activeModule === nestedItem.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50"
                            )} />
                          </motion.div>
                          <span className={cn(
                            TYPOGRAPHY.menuLevel3,
                            activeModule === nestedItem.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
                          )}>{nestedItem.title}</span>
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
        isActive={activeModule === subItem.id}
        className={cn(
          'transition-all duration-200 rounded-md',
          'hover:translate-x-1 hover:bg-sidebar-accent/30',
          activeModule === subItem.id && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm'
        )}
      >
        <a href="#" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <subItem.icon className={cn(
              ICON_SIZES.menuLevel2,
              activeModule === subItem.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/60"
            )} />
          </motion.div>
          <span className={cn(
            TYPOGRAPHY.menuLevel2,
            activeModule === subItem.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/90"
          )}>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function SidebarMenuItem({ item, activeModule, onModuleChange, index }: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useSidebar();

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
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  "w-full justify-between transition-all duration-200 rounded-md",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "data-[state=open]:bg-sidebar-accent/50 data-[state=open]:text-sidebar-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <motion.div {...ANIMATION_CONFIG.iconHover}>
                    <item.icon className={cn(ICON_SIZES.menuLevel1, "text-sidebar-foreground/70")} />
                  </motion.div>
                  <span className={cn(TYPOGRAPHY.menuLevel1, "text-sidebar-foreground")}>{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={ANIMATION_CONFIG.chevron.transition}
                >
                  <ChevronRight className={cn(
                    ICON_SIZES.menuChevron,
                    "text-sidebar-foreground/50 transition-transform duration-200"
                  )} />
                </motion.div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <SidebarMenuSub className="ml-0 border-l-2 border-sidebar-border pl-4">
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
          tooltip={item.title}
          isActive={activeModule === item.id}
          className={cn(
            'transition-all duration-200 rounded-md',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            activeModule === item.id && 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
          )}
        >
          <a href="#" className="flex items-center gap-3">
            <motion.div {...ANIMATION_CONFIG.iconHover}>
              <item.icon className={cn(
                ICON_SIZES.menuLevel1,
                activeModule === item.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70"
              )} />
            </motion.div>
            <span className={cn(
              TYPOGRAPHY.menuLevel1,
              activeModule === item.id ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
            )}>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    </motion.div>
  );
}
