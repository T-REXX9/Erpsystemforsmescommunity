# Contributing Guide

## Getting Started

Thank you for contributing to the ERP System! This guide will help you understand our codebase structure and development workflow.

## Development Setup

1. **Clone the repository**
2. **Install dependencies** (if applicable)
3. **Review the architecture** (`/docs/ARCHITECTURE.md`)
4. **Understand the structure** (`/README.md`)

## Code Style

### TypeScript
- Use strict mode
- Define types for all props and state
- Avoid `any` type
- Use interfaces over types for objects

```typescript
// ✅ Good
interface UserProps {
  name: string;
  age: number;
}

// ❌ Bad
const UserProps = {
  name: string,
  age: number,
};
```

### React Components

```typescript
// ✅ Good - Named export, typed props
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Bad - Default export, untyped props
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

### File Organization

```typescript
// Order of imports
import { external } from 'package';        // External
import { Component } from '../ui/button';  // UI library
import { Type } from '../../types';        // Types
import { CONSTANT } from '../../constants'; // Constants
import { useHook } from '../../hooks';     // Hooks
import { Local } from './Local';           // Local
```

## Adding Features

### 1. Adding a New Module

**Step 1: Create the module component**

```typescript
// /components/modules/Reports.tsx
export function Reports() {
  return (
    <div className="p-6">
      <h1>Reports</h1>
      <p className="text-muted-foreground">Analytics and reporting</p>
      {/* Module content */}
    </div>
  );
}
```

**Step 2: Add TypeScript type**

```typescript
// /types/index.ts
export type ModuleId = 
  | 'dashboard'
  | 'reports'  // Add new module
  | '...';
```

**Step 3: Add to menu configuration**

```typescript
// /constants/menu.ts
import { FileBarChart } from 'lucide-react';

export const MENU_ITEMS: MenuItem[] = [
  // ... existing items
  {
    id: 'reports',
    title: 'Reports',
    icon: FileBarChart,
  },
];
```

**Step 4: Add to module renderer**

```typescript
// /utils/moduleRenderer.tsx
import { Reports } from '../components/modules';

export function renderModule({ activeModule, ... }) {
  switch (activeModule) {
    // ... existing cases
    case 'reports':
      return <Reports />;
  }
}
```

**Step 5: Export the module**

```typescript
// /components/modules/index.ts
export { Reports } from './Reports';
```

### 2. Adding a Custom Hook

```typescript
// /hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Export from /hooks/index.ts
export * from './useLocalStorage';
```

### 3. Adding Utility Functions

```typescript
// /utils/formatters.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN').format(new Date(date));
}

// Export from /utils/index.ts
export * from './formatters';
```

### 4. Adding New Types

```typescript
// /types/index.ts

// Simple type
export type Status = 'pending' | 'approved' | 'rejected';

// Interface
export interface Invoice {
  id: string;
  number: string;
  customer: string;
  amount: number;
  date: string;
  status: Status;
}

// Extending existing types
export interface ExtendedInvoice extends Invoice {
  items: InvoiceItem[];
  tax: number;
}
```

## Component Guidelines

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from './ui/button';
import { ComponentProps } from '../types';

// 2. Type definitions (if not in /types)
interface LocalState {
  // ...
}

// 3. Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // 3a. Hooks
  const [state, setState] = useState<LocalState>();
  
  // 3b. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 3c. Derived values
  const computedValue = useMemo(() => {
    // ...
  }, [dependencies]);
  
  // 3d. Effects
  useEffect(() => {
    // ...
  }, [dependencies]);
  
  // 3e. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Styling Guidelines

```typescript
// ✅ Use Tailwind classes
<div className="p-6 bg-background text-foreground">

// ✅ Use conditional classes with cn()
import { cn } from './ui/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes"
)}>

// ❌ Don't use inline styles (unless necessary)
<div style={{ padding: '24px' }}>
```

### Animation Guidelines

```typescript
// ✅ Use centralized config
import { ANIMATION_CONFIG } from '../../constants';

<motion.div {...ANIMATION_CONFIG.menuItem}>

// ✅ Define custom animations inline when unique
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// ❌ Don't hardcode animation values repeatedly
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

## Best Practices

### 1. DRY (Don't Repeat Yourself)

```typescript
// ✅ Good - Extract to constant
const CARD_ITEMS = [
  { title: 'Item 1', desc: 'Description 1' },
  { title: 'Item 2', desc: 'Description 2' },
];

CARD_ITEMS.map(item => <Card {...item} />);

// ❌ Bad - Repeated code
<Card title="Item 1" desc="Description 1" />
<Card title="Item 2" desc="Description 2" />
```

### 2. Single Responsibility

```typescript
// ✅ Good - Each component does one thing
function UserList() {
  return users.map(user => <UserCard user={user} />);
}

function UserCard({ user }) {
  return <div>{user.name}</div>;
}

// ❌ Bad - Component does too much
function UserList() {
  return users.map(user => (
    <div>
      <img src={user.avatar} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <button>Follow</button>
      <button>Message</button>
    </div>
  ));
}
```

### 3. Type Safety

```typescript
// ✅ Good - Fully typed
interface UserProps {
  user: User;
  onSelect: (id: string) => void;
}

function UserCard({ user, onSelect }: UserProps) {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
}

// ❌ Bad - Untyped
function UserCard({ user, onSelect }) {
  return <div onClick={() => onSelect(user.id)}>{user.name}</div>;
}
```

### 4. Accessibility

```typescript
// ✅ Good - Accessible
<button 
  onClick={handleClick}
  aria-label="Close menu"
>
  <X />
</button>

// ❌ Bad - Not accessible
<div onClick={handleClick}>
  <X />
</div>
```

## Git Workflow

### Branch Naming
- `feature/module-name` - New features
- `fix/issue-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/section-name` - Documentation

### Commit Messages
```
feat: add reports module
fix: resolve sidebar navigation issue
refactor: extract theme logic to hook
docs: update architecture documentation
style: format code according to guidelines
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentation

## Testing
- [ ] Tested locally
- [ ] No console errors
- [ ] Responsive design verified

## Screenshots (if applicable)
```

## Common Pitfalls

### ❌ Don't modify shadcn/ui components directly
```typescript
// ❌ Bad
// Editing /components/ui/button.tsx

// ✅ Good
// Create wrapper or use className props
<Button className="custom-styles">
```

### ❌ Don't hardcode values
```typescript
// ❌ Bad
<div className="p-6">
  <h1>ERP System</h1>
</div>

// ✅ Good
import { APP_CONFIG } from '../constants';

<div className="p-6">
  <h1>{APP_CONFIG.name}</h1>
</div>
```

### ❌ Don't use absolute imports inconsistently
```typescript
// ✅ Good - Consistent relative imports
import { Button } from '../ui/button';
import { Type } from '../../types';

// ❌ Bad - Mixed imports
import { Button } from '/components/ui/button';
import { Type } from '../../types';
```

## Questions?

If you have questions or need clarification:
1. Review `/docs/ARCHITECTURE.md`
2. Check `/README.md`
3. Look at existing code examples
4. Ask the team

## Review Checklist

Before submitting:
- [ ] Code follows style guidelines
- [ ] Types are properly defined
- [ ] No console errors or warnings
- [ ] Components are properly exported
- [ ] Constants are used instead of hardcoded values
- [ ] Code is well-commented (if complex)
- [ ] Responsive design works
- [ ] Animations are smooth
- [ ] Accessibility is maintained
