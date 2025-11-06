# Project Structure

## 📂 Complete File Tree

```
ERP-System/
│
├── 📄 App.tsx                          # Main application entry point
├── 📄 README.md                        # Project overview and setup
├── 📄 CHANGELOG.md                     # Version history
│
├── 📁 components/                      # All React components
│   │
│   ├── 📁 layout/                      # Layout-specific components
│   │   ├── AppSidebar.tsx             # Main sidebar wrapper
│   │   ├── AppHeader.tsx              # Application header
│   │   ├── SidebarHeader.tsx          # Sidebar branding section
│   │   ├── SidebarFooter.tsx          # Theme toggle section
│   │   ├── SidebarNav.tsx             # Navigation menu container
│   │   ├── SidebarMenuItem.tsx        # Individual menu items with animations
│   │   └── index.ts                   # Layout exports
│   │
│   ├── 📁 modules/                     # Feature modules
│   │   ├── Settings.tsx               # Settings module
│   │   └── index.ts                   # Module exports
│   │
│   ├── 📁 ui/                          # shadcn/ui components (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── sidebar.tsx
│   │   ├── collapsible.tsx
│   │   ├── ... (and many more)
│   │   └── utils.ts                   # Utility functions (cn)
│   │
│   ├── 📁 figma/                       # Figma integration
│   │   └── ImageWithFallback.tsx      # Protected component
│   │
│   ├── Dashboard.tsx                  # Dashboard module
│   ├── Accounting.tsx                 # Accounting module
│   ├── Inventory.tsx                  # Inventory module
│   ├── TaxCompliance.tsx              # Tax compliance module
│   ├── Payroll.tsx                    # Payroll module
│   ├── QuickInvoice.tsx               # Quick invoice feature
│   ├── QuickBilling.tsx               # Quick billing feature
│   ├── FloatingActionButton.tsx       # FAB for quick actions
│   └── Layout.tsx                     # Main layout wrapper
│
├── 📁 types/                           # TypeScript definitions
│   └── index.ts                       # All type definitions
│       ├── ModuleId                   # Module identifier types
│       ├── MenuItem                   # Menu structure interface
│       ├── LayoutProps                # Component prop interfaces
│       ├── Data models                # Invoice, Employee, etc.
│       └── ... (more types)
│
├── 📁 constants/                       # Configuration & constants
│   ├── menu.ts                        # Menu configuration with icons
│   └── index.ts                       # App config & animation config
│       ├── MENU_ITEMS                 # Navigation menu structure
│       ├── ANIMATION_CONFIG           # Animation configurations
│       └── APP_CONFIG                 # App branding & settings
│
├── 📁 hooks/                           # Custom React hooks
│   ├── useModuleNavigation.ts         # Navigation state management
│   ├── useTheme.ts                    # Theme state & persistence
│   └── index.ts                       # Hook exports
│
├── 📁 utils/                           # Utility functions
│   ├── moduleRenderer.tsx             # Module rendering logic
│   └── index.ts                       # Utility exports
│
├── 📁 styles/                          # Styling
│   └── globals.css                    # Global styles & theme variables
│
├── 📁 docs/                            # Documentation
│   ├── ARCHITECTURE.md                # System architecture guide
│   ├── CONTRIBUTING.md                # Contribution guidelines
│   ├── QUICK_REFERENCE.md             # Quick reference guide
│   └── STRUCTURE.md                   # This file
│
└── 📁 guidelines/                      # Figma guidelines
    └── Guidelines.md
```

## 📊 File Count Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| `/components/layout` | 7 files | Layout structure components |
| `/components/modules` | 2 files | Feature modules (Settings + index) |
| `/components/ui` | 40+ files | Reusable UI components |
| `/components` (root) | 9 files | Main feature components |
| `/types` | 1 file | TypeScript definitions |
| `/constants` | 2 files | Configuration |
| `/hooks` | 3 files | Custom hooks |
| `/utils` | 2 files | Helper functions |
| `/docs` | 4 files | Documentation |
| **Total** | **70+ files** | Complete application |

## 🎯 Key File Purposes

### Core Application Files

| File | Lines | Purpose |
|------|-------|---------|
| `App.tsx` | ~20 | Main entry point, orchestrates modules |
| `Layout.tsx` | ~20 | Layout wrapper using composition |

### Layout Components (~200 lines total)

| File | Lines | Purpose |
|------|-------|---------|
| `AppSidebar.tsx` | ~15 | Sidebar composition |
| `AppHeader.tsx` | ~10 | Header with sidebar trigger |
| `SidebarHeader.tsx` | ~25 | Animated branding section |
| `SidebarFooter.tsx` | ~30 | Theme toggle with animation |
| `SidebarNav.tsx` | ~25 | Navigation menu container |
| `SidebarMenuItem.tsx` | ~100 | Menu items with collapsible logic |

### Configuration Files (~300 lines total)

| File | Lines | Purpose |
|------|-------|---------|
| `types/index.ts` | ~80 | All TypeScript definitions |
| `constants/menu.ts` | ~100 | Menu structure & icons |
| `constants/index.ts` | ~50 | Animation & app config |
| `hooks/useModuleNavigation.ts` | ~25 | Navigation logic |
| `hooks/useTheme.ts` | ~30 | Theme management |
| `utils/moduleRenderer.tsx` | ~40 | Module routing |

### Feature Modules

| Module | Purpose |
|--------|---------|
| `Dashboard.tsx` | Main dashboard with metrics |
| `Accounting.tsx` | Financial management |
| `Inventory.tsx` | Stock & orders |
| `TaxCompliance.tsx` | GST, TDS, VAT |
| `Payroll.tsx` | Employee & salary |
| `QuickInvoice.tsx` | Fast invoicing |
| `QuickBilling.tsx` | Quick billing |
| `Settings.tsx` | System settings |

## 🔄 Data Flow

```
User Action
    ↓
App.tsx (State: activeModule)
    ↓
Layout.tsx (Props: activeModule, onModuleChange)
    ↓
┌─────────────────┬──────────────────┐
│   AppSidebar    │   Main Content   │
│                 │                  │
│ SidebarHeader   │   AppHeader      │
│ SidebarNav      │   ┌────────────┐ │
│  └─ MenuItem    │   │   Module   │ │
│      (clicks)   │   │  Content   │ │
│         │       │   └────────────┘ │
│         ↓       │                  │
│  onModuleChange │                  │
└─────────┼───────┴──────────────────┘
          ↓
   navigateToModule()
          ↓
   setActiveModule()
          ↓
     Re-render
          ↓
   renderModule()
          ↓
  Display new module
```

## 🎨 Component Hierarchy

```
<App>
  <Layout>
    <SidebarProvider>
      <AppSidebar>
        <Sidebar>
          <SidebarHeader>
            <motion.div>Logo + Branding</motion.div>
          </SidebarHeader>
          
          <SidebarNav>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem> (x7)
                  <Collapsible> (if has subitems)
                    <SidebarMenuSub>
                      <SidebarMenuSubItem> (x N)
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </Collapsible>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarNav>
          
          <SidebarFooter>
            <Button>Theme Toggle</Button>
          </SidebarFooter>
        </Sidebar>
      </AppSidebar>
      
      <main>
        <AppHeader>
          <SidebarTrigger />
        </AppHeader>
        
        <div>
          {renderModule(activeModule)}
          <FloatingActionButton />
        </div>
      </main>
    </SidebarProvider>
  </Layout>
</App>
```

## 📦 Dependencies Graph

```
App.tsx
 ├─→ Layout.tsx
 │    ├─→ AppSidebar
 │    │    ├─→ SidebarHeader
 │    │    ├─→ SidebarNav
 │    │    │    └─→ SidebarMenuItem
 │    │    └─→ SidebarFooter
 │    └─→ AppHeader
 │
 ├─→ renderModule()
 │    └─→ modules/*
 │
 ├─→ FloatingActionButton
 │
 └─→ useModuleNavigation()
      └─→ types

Layout.tsx
 ├─→ useTheme()
 ├─→ types
 └─→ layout components

SidebarNav
 ├─→ MENU_ITEMS (constants)
 ├─→ SidebarMenuItem
 └─→ types

SidebarMenuItem
 ├─→ ANIMATION_CONFIG (constants)
 ├─→ motion
 └─→ types
```

## 🎯 Import Patterns

### Typical Component Imports

```typescript
// External libraries
import { useState } from 'react';
import { motion } from 'motion/react';
import { Icon } from 'lucide-react';

// UI components
import { Button } from '../ui/button';
import { Card } from '../ui/card';

// Types & constants
import { ModuleId } from '../../types';
import { ANIMATION_CONFIG } from '../../constants';

// Hooks & utils
import { useTheme } from '../../hooks';
import { cn } from '../ui/utils';

// Local components
import { LocalComponent } from './LocalComponent';
```

## 🗂️ Code Organization Principles

### 1. **Separation by Function**
- Layout components in `/layout`
- Module components in `/modules`
- UI components in `/ui`

### 2. **Co-location**
- Related files grouped together
- Index files for clean exports
- Types near usage when specific

### 3. **Depth Limit**
- Maximum 3 levels deep
- Keeps imports manageable
- Easier to navigate

### 4. **Clear Naming**
- Descriptive file names
- PascalCase for components
- camelCase for hooks/utils

## 📈 Scalability Strategy

### Adding New Features

1. **New Module** → `/components/modules/`
2. **New Hook** → `/hooks/`
3. **New Util** → `/utils/`
4. **New Type** → `/types/index.ts`
5. **New Constant** → `/constants/index.ts`

### Future Enhancements

```
📁 components/
  ├── 📁 charts/              # Chart components
  ├── 📁 forms/               # Form components
  └── 📁 tables/              # Table components

📁 services/                  # API services
  ├── api.ts
  └── auth.ts

📁 store/                     # State management
  ├── slices/
  └── index.ts

📁 lib/                       # Third-party configs
  └── axios.ts

📁 config/                    # Environment configs
  └── env.ts
```

## 🎓 Learning Path

For new developers:

1. **Start with** → `/README.md`
2. **Understand** → `/docs/ARCHITECTURE.md`
3. **Reference** → `/docs/QUICK_REFERENCE.md`
4. **Contribute** → `/docs/CONTRIBUTING.md`
5. **Navigate** → This file (`STRUCTURE.md`)

## 🔍 Finding Things

| Looking for... | Check... |
|----------------|----------|
| Component definition | `/components/ComponentName.tsx` |
| Type definition | `/types/index.ts` |
| Menu structure | `/constants/menu.ts` |
| Animation config | `/constants/index.ts` |
| Custom hook | `/hooks/useHookName.ts` |
| Utility function | `/utils/helperName.tsx` |
| UI component | `/components/ui/component.tsx` |
| Global styles | `/styles/globals.css` |
| Documentation | `/docs/` |

## 💡 Pro Tips

1. **Use CMD/CTRL + P** to quickly find files
2. **Follow imports** to understand dependencies
3. **Check index.ts** files for available exports
4. **Look at similar files** when creating new ones
5. **Keep the structure flat** - avoid deep nesting
