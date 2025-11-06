# Quick Reference Guide

## 🚀 Quick Start

### Project Structure at a Glance
```
/components     → UI components
/types          → TypeScript types
/constants      → Configuration
/hooks          → Custom hooks
/utils          → Helper functions
/docs           → Documentation
```

## 📝 Common Tasks

### Add a New Module

```typescript
// 1. Create component
// /components/modules/NewModule.tsx
export function NewModule() {
  return <div className="p-6"><h1>New Module</h1></div>;
}

// 2. Add type
// /types/index.ts
export type ModuleId = '...' | 'new-module';

// 3. Add to menu
// /constants/menu.ts
{ id: 'new-module', title: 'New Module', icon: Icon }

// 4. Add to renderer
// /utils/moduleRenderer.tsx
case 'new-module': return <NewModule />;

// 5. Export
// /components/modules/index.ts
export { NewModule } from './NewModule';
```

### Create a Custom Hook

```typescript
// /hooks/useCustomHook.ts
export function useCustomHook() {
  const [state, setState] = useState();
  return { state, setState };
}

// Export from /hooks/index.ts
export * from './useCustomHook';
```

### Add Utility Function

```typescript
// /utils/helpers.ts
export function helperFunction(input: string): string {
  return input.toUpperCase();
}

// Export from /utils/index.ts
export * from './helpers';
```

## 🎨 Styling

### Common Patterns

```typescript
// Basic spacing
<div className="p-6">              // Padding: 24px
<div className="mt-6">             // Margin top: 24px
<div className="gap-6">            // Gap: 24px

// Layout
<div className="grid grid-cols-3 gap-6">
<div className="flex items-center gap-3">

// Colors
<div className="bg-background text-foreground">
<div className="text-muted-foreground">
<div className="border border-border">

// Interactive
<div className="hover:bg-accent">
<div className="transition-colors duration-200">

// Conditional with cn()
import { cn } from './ui/utils';
<div className={cn(
  "base-classes",
  isActive && "active-classes"
)}>
```

## 🎭 Animations

### Using Motion

```typescript
// Import
import { motion } from 'motion/react';

// Basic animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// With config
import { ANIMATION_CONFIG } from '../constants';
<motion.div {...ANIMATION_CONFIG.menuItem}>

// Hover/Tap
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
```

## 🔧 Hooks

### Available Hooks

```typescript
// Navigation
const { activeModule, navigateToModule } = useModuleNavigation();

// Theme
const { isDark, toggleTheme } = useTheme();

// React hooks
const [state, setState] = useState();
const value = useMemo(() => compute(), [deps]);
const callback = useCallback(() => {}, [deps]);
```

## 📦 Components

### shadcn/ui Components

```typescript
// Button
import { Button } from './ui/button';
<Button variant="outline" size="sm">Click</Button>

// Card
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Dialog
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';

// More in /components/ui/
```

### Custom Components

```typescript
// Layout components
import { AppSidebar, AppHeader } from './layout';

// Module components
import { Dashboard, Accounting } from './modules';

// Utilities
import { FloatingActionButton } from './FloatingActionButton';
```

## 🎯 TypeScript

### Common Types

```typescript
import { 
  ModuleId,           // Module identifiers
  MenuItem,           // Menu structure
  LayoutProps,        // Layout props
  DashboardProps,     // Component props
} from '../types';

// Using types
const module: ModuleId = 'dashboard';
const props: DashboardProps = { ... };
```

## 🎨 Icons

```typescript
// Import from lucide-react
import { 
  Home,
  Settings,
  User,
  // ... many more
} from 'lucide-react';

// Usage
<Home className="h-4 w-4" />
<Settings className="h-5 w-5 text-muted-foreground" />
```

## 🎨 Theme

### Using Theme Colors

```typescript
// In className
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-primary text-primary-foreground">
<div className="border-border">

// Theme toggle
const { isDark, toggleTheme } = useTheme();
<button onClick={toggleTheme}>Toggle</button>
```

### Color Palette
- `background` / `foreground`
- `card` / `card-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border` / `input` / `ring`

## 📁 Import Paths

```typescript
// Components
import { Component } from '../components/ComponentName';
import { Button } from './ui/button';

// Types
import { Type } from '../types';

// Constants
import { CONSTANT } from '../constants';

// Hooks
import { useHook } from '../hooks';

// Utils
import { helper } from '../utils';
```

## 🐛 Debugging

### Common Issues

```typescript
// Type error: Module not found
// ✅ Check import path is correct
// ✅ Check file is exported from index.ts

// Component not updating
// ✅ Check state is being updated correctly
// ✅ Check dependencies in useEffect/useMemo

// Animation not working
// ✅ Check motion import
// ✅ Check motion.div is used (not div)

// Theme not applying
// ✅ Check CSS variable names match
// ✅ Check dark class on html element
```

## 📚 Resources

### Documentation
- `/README.md` - Project overview
- `/docs/ARCHITECTURE.md` - System architecture
- `/docs/CONTRIBUTING.md` - Contribution guide
- `/CHANGELOG.md` - Version history

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Motion](https://motion.dev/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `/App.tsx` | Main app component |
| `/components/Layout.tsx` | Layout wrapper |
| `/types/index.ts` | Type definitions |
| `/constants/menu.ts` | Menu configuration |
| `/constants/index.ts` | App configuration |
| `/hooks/useModuleNavigation.ts` | Navigation logic |
| `/hooks/useTheme.ts` | Theme management |
| `/utils/moduleRenderer.tsx` | Module rendering |
| `/styles/globals.css` | Global styles |

## 💡 Tips

1. **Use existing patterns** - Look at similar code before creating new patterns
2. **Keep it simple** - Don't over-engineer solutions
3. **Type everything** - TypeScript catches errors early
4. **Extract constants** - Don't hardcode values
5. **Reuse components** - Check if a component exists before creating new one
6. **Follow structure** - Put files in the correct directories
7. **Document complex logic** - Add comments for future developers
8. **Test as you go** - Check functionality immediately
9. **Use cn() for conditional classes** - Keeps code clean
10. **Check console** - Fix warnings and errors

## 🎯 Performance Tips

```typescript
// Memoize expensive computations
const value = useMemo(() => expensiveComputation(), [deps]);

// Memoize callbacks
const callback = useCallback(() => { ... }, [deps]);

// Memoize components
const Component = React.memo(({ props }) => { ... });

// Lazy load modules (future)
const Module = lazy(() => import('./Module'));
```
