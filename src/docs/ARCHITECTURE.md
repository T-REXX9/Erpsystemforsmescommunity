# Architecture Documentation

## System Overview

This ERP system follows a modular, component-based architecture designed for scalability and maintainability.

## Core Principles

### 1. Separation of Concerns
- **Presentation Layer**: React components in `/components`
- **Business Logic**: Custom hooks in `/hooks`
- **Data Models**: TypeScript types in `/types`
- **Configuration**: Constants in `/constants`
- **Utilities**: Helper functions in `/utils`

### 2. Component Hierarchy

```
App
└── Layout
    ├── AppSidebar
    │   ├── SidebarHeader
    │   ├── SidebarNav
    │   │   └── SidebarMenuItem (x N)
    │   └── SidebarFooter
    │
    ├── AppHeader
    │
    └── Module Content
        └── [Dynamic Module Component]
```

### 3. State Management

#### Local State
- Component-specific state managed with `useState`
- Theme state managed with `useTheme` hook
- Navigation state managed with `useModuleNavigation` hook

#### State Flow
```
App (owns navigation state)
  ↓
Layout (receives activeModule, onModuleChange)
  ↓
AppSidebar (receives activeModule, onModuleChange)
  ↓
SidebarMenuItem (triggers onModuleChange)
```

### 4. Type Safety

All components are fully typed using TypeScript:

```typescript
// Centralized type definitions
types/index.ts
  ├── ModuleId (union type)
  ├── MenuItem (interface)
  ├── LayoutProps (interface)
  └── Component Props (interfaces)
```

### 5. Animation System

Animations use Motion (formerly Framer Motion):

- **Centralized Config**: All animation variants in `constants/index.ts`
- **Consistent Timing**: Shared duration and delay values
- **Performance**: GPU-accelerated transforms
- **Accessibility**: Respects `prefers-reduced-motion`

### 6. Module System

#### Module Structure
Each module is self-contained:

```
Module Component
  ├── UI Elements
  ├── Local State
  ├── Business Logic
  └── Data Display
```

#### Module Registration
1. Create component in `/components/modules`
2. Add type to `ModuleId`
3. Update `MENU_ITEMS` configuration
4. Add case to `renderModule` function

### 7. Theme System

```
User clicks theme toggle
  ↓
useTheme hook updates state
  ↓
useEffect adds/removes 'dark' class
  ↓
CSS variables switch (via :root and .dark)
  ↓
UI re-renders with new colors
```

### 8. Navigation Flow

```
User clicks menu item
  ↓
SidebarMenuItem calls onModuleChange(moduleId)
  ↓
navigateToModule updates activeModule state
  ↓
App re-renders with new module
  ↓
renderModule returns appropriate component
```

## Design Patterns

### 1. Composition Pattern
Components are composed rather than inherited:

```tsx
<Layout>
  <AppSidebar />
  <Main>
    <AppHeader />
    <ModuleContent />
  </Main>
</Layout>
```

### 2. Custom Hooks Pattern
Encapsulate reusable logic:

```tsx
const { activeModule, navigateToModule } = useModuleNavigation();
const { isDark, toggleTheme } = useTheme();
```

### 3. Configuration Pattern
Centralize static data:

```tsx
// constants/menu.ts
export const MENU_ITEMS = [...];

// Usage
MENU_ITEMS.map(item => <MenuItem {...item} />)
```

### 4. Render Props Pattern
For conditional rendering:

```tsx
renderModule({ activeModule, onQuickInvoice, onQuickBilling })
```

## Performance Considerations

### 1. Code Splitting
- Modules can be lazy-loaded in the future
- Current setup ready for `React.lazy()`

### 2. Memoization Opportunities
- Menu items (static data)
- Animation configurations
- Module renderer function

### 3. Optimization Strategies
- Use `React.memo` for expensive components
- Use `useCallback` for event handlers
- Use `useMemo` for derived state

## Scalability Guidelines

### Adding New Features

#### 1. New Module
```bash
1. Create /components/modules/NewModule.tsx
2. Add to /types/index.ts (ModuleId)
3. Update /constants/menu.ts
4. Update /utils/moduleRenderer.tsx
5. Export from /components/modules/index.ts
```

#### 2. New Hook
```bash
1. Create /hooks/useNewHook.ts
2. Export from /hooks/index.ts
3. Use in components
```

#### 3. New Utility
```bash
1. Create /utils/newUtil.ts
2. Export from /utils/index.ts
3. Import where needed
```

### Best Practices

1. **Keep Components Small**: Single responsibility
2. **Extract Constants**: Don't hardcode values
3. **Type Everything**: Use TypeScript strictly
4. **Document Complex Logic**: Add comments
5. **Test Incrementally**: Test as you build
6. **Follow Conventions**: Match existing patterns

## File Naming Conventions

- **Components**: PascalCase (e.g., `AppSidebar.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useTheme.ts`)
- **Utilities**: camelCase (e.g., `moduleRenderer.tsx`)
- **Types**: PascalCase for interfaces (e.g., `MenuItem`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MENU_ITEMS`)

## Import Guidelines

```typescript
// External imports first
import { useState } from 'react';
import { motion } from 'motion/react';

// UI library imports
import { Button } from '../ui/button';

// Internal imports (types, constants, hooks)
import { ModuleId } from '../../types';
import { MENU_ITEMS } from '../../constants';
import { useTheme } from '../../hooks';

// Local imports
import { SidebarHeader } from './SidebarHeader';
```

## Testing Strategy (Future)

### Unit Tests
- Test individual components
- Test custom hooks
- Test utility functions

### Integration Tests
- Test component interactions
- Test navigation flow
- Test theme switching

### E2E Tests
- Test complete user journeys
- Test module navigation
- Test quick actions

## Deployment Considerations

### Build Optimization
- Tree shaking enabled
- Code splitting ready
- CSS purging via Tailwind

### Environment Variables
- Add `.env` for configuration
- Separate dev/prod configs
- Secure sensitive data

### Monitoring
- Add error boundaries
- Implement logging
- Track performance metrics
