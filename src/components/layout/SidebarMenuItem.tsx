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
import { ANIMATION_CONFIG } from '../../constants';

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
    return (
      <SidebarMenuSubItem>
        <Collapsible open={isSubOpen} onOpenChange={setIsSubOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton className="w-full justify-between transition-all duration-200 hover:bg-sidebar-accent/30">
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <subItem.icon className="h-3.5 w-3.5" />
                </motion.div>
                <span className="text-xs font-medium">{subItem.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isSubOpen ? 180 : 0 }}
                transition={ANIMATION_CONFIG.chevron.transition}
              >
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub className="ml-2">
              <AnimatePresence>
                {isSubOpen && subItem.subItems.map((nestedItem, nestedIndex) => (
                  <motion.div
                    key={nestedItem.id}
                    initial={ANIMATION_CONFIG.subMenuItem.initial}
                    animate={ANIMATION_CONFIG.subMenuItem.animate}
                    exit={ANIMATION_CONFIG.subMenuItem.exit}
                    transition={{ delay: nestedIndex * ANIMATION_CONFIG.stagger.delay, duration: 0.2 }}
                  >
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
                            <nestedItem.icon className="h-3 w-3" />
                          </motion.div>
                          <span className="text-xs">{nestedItem.title}</span>
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
        <a href="#" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <subItem.icon className="h-3.5 w-3.5" />
          </motion.div>
          <span className="text-xs">{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}

export function SidebarMenuItem({ item, activeModule, onModuleChange, index }: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems) {
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
                    <item.icon className="h-4 w-4" />
                  </motion.div>
                  <span>{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={ANIMATION_CONFIG.chevron.transition}
                >
                  <ChevronDown className="h-4 w-4" />
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
              <item.icon className="h-4 w-4" />
            </motion.div>
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </ShadcnSidebarMenuItem>
    </motion.div>
  );
}
