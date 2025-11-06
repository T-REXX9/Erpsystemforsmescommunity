# Authentication & Authorization System

This document describes the authentication and role-based access control (RBAC) system implemented in the ERP application.

## Table of Contents

1. [Overview](#overview)
2. [Supabase Configuration](#supabase-configuration)
3. [User Roles](#user-roles)
4. [Permissions](#permissions)
5. [Usage Examples](#usage-examples)
6. [API Endpoints](#api-endpoints)
7. [Test Credentials](#test-credentials)

---

## Overview

The ERP system uses **Supabase Auth** for authentication and a custom **role-based permission system** for authorization. User profiles and roles are stored in the KV store, and access to different modules is controlled based on user roles.

### Architecture

```
Frontend (React)
    ↓
AuthContext (State Management)
    ↓
Supabase Client (Authentication)
    ↓
Server (Hono + Edge Functions)
    ↓
KV Store (User Profiles)
```

---

## Supabase Configuration

### Switching Between Cloud and Local

The system supports both **cloud-hosted Supabase** and **self-hosted/local Supabase**.

**Configuration File:** `/config/supabase.ts`

```typescript
// To use local Supabase
export const USE_LOCAL_SUPABASE = true;

export const LOCAL_SUPABASE_CONFIG = {
  url: 'http://localhost:54321',
  anonKey: 'your-local-anon-key-here',
};
```

```typescript
// To use cloud Supabase (default)
export const USE_LOCAL_SUPABASE = false;
// Cloud config is automatically loaded from utils/supabase/info.tsx
```

### Client Initialization

The Supabase client is initialized as a singleton in `/utils/supabase/client.ts`:

```typescript
import getSupabaseClient from './utils/supabase/client';

const supabase = getSupabaseClient();
```

---

## User Roles

The system supports **8 different roles** with varying levels of access:

| Role | Description | Access Level |
|------|-------------|--------------|
| `super_admin` | Full system access | All modules + User Management |
| `admin` | Company-wide access | All modules (cannot delete users) |
| `manager` | Department management | Most modules with edit access |
| `accountant` | Financial management | Accounting, Tax, Invoicing, Reports |
| `inventory_manager` | Stock management | Inventory, Orders, Invoicing (view) |
| `hr_manager` | HR & Payroll | Payroll, Employees, Reports |
| `sales` | Sales operations | Invoicing, Inventory (view), Dashboard |
| `viewer` | Read-only access | View-only access to all modules |

### Role Hierarchy

```
super_admin > admin > manager > specialized roles (accountant, inventory_manager, hr_manager) > sales > viewer
```

---

## Permissions

### Permission Matrix

Permissions are defined in `/types/auth.ts` and follow the pattern: `<module>.<action>`

#### Common Permissions

- `dashboard.view`
- `accounting.view`, `accounting.create`, `accounting.edit`, `accounting.delete`
- `inventory.view`, `inventory.create`, `inventory.edit`, `inventory.delete`
- `tax.view`, `tax.create`, `tax.edit`, `tax.delete`
- `payroll.view`, `payroll.create`, `payroll.edit`, `payroll.delete`
- `invoicing.view`, `invoicing.create`, `invoicing.edit`, `invoicing.delete`
- `reports.view`, `reports.export`
- `settings.view`, `settings.edit`
- `users.view`, `users.create`, `users.edit`, `users.delete`

### Checking Permissions

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { hasPermission, hasRole } = useAuth();

  if (hasPermission('accounting.edit')) {
    // Show edit button
  }

  if (hasRole(['admin', 'super_admin'])) {
    // Show admin features
  }
}
```

---

## Usage Examples

### 1. Protecting Routes/Components

```typescript
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute requiredPermission="accounting.view">
      <AccountingModule />
    </ProtectedRoute>
  );
}
```

### 2. Role-Based Rendering

```typescript
import { useAuth } from './contexts/AuthContext';

function AdminPanel() {
  const { hasRole } = useAuth();

  if (!hasRole(['admin', 'super_admin'])) {
    return <AccessDenied />;
  }

  return <AdminContent />;
}
```

### 3. Conditional UI Elements

```typescript
import { useAuth } from './contexts/AuthContext';

function InvoiceList() {
  const { hasPermission } = useAuth();

  return (
    <div>
      {hasPermission('invoicing.create') && (
        <Button>Create Invoice</Button>
      )}
      {/* List content */}
    </div>
  );
}
```

### 4. Getting User Info

```typescript
import { useAuth } from './contexts/AuthContext';

function UserProfile() {
  const { user } = useAuth();

  return (
    <div>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

---

## API Endpoints

### POST `/make-server-fe7e8957/auth/signup`

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "accountant"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "accountant",
    "created_at": "2025-11-06T00:00:00Z",
    "is_active": true
  }
}
```

### GET `/make-server-fe7e8957/auth/profile`

Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "accountant",
    "last_login": "2025-11-06T00:00:00Z"
  }
}
```

### POST `/make-server-fe7e8957/auth/update-last-login`

Update user's last login timestamp (requires authentication).

### GET `/make-server-fe7e8957/auth/users`

Get all users (Admin only, requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

---

## Test Credentials

### Pre-Seeded Demo Users

Use these credentials for testing different roles:

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | admin123 | super_admin |
| manager@company.com | manager123 | manager |
| accountant@company.com | accountant123 | accountant |
| inventory@company.com | inventory123 | inventory_manager |
| hr@company.com | hr123 | hr_manager |
| sales@company.com | sales123 | sales |
| viewer@company.com | viewer123 | viewer |

### Seeding Users

To create these test users, you can call the seed function:

```typescript
import { seedUsers } from './utils/seedUsers';

// Run once to create demo users
seedUsers();
```

---

## Security Considerations

### Important Notes

⚠️ **Figma Make Environment:**
- Figma Make is **not meant for collecting PII** or securing sensitive production data
- For production ERP systems, use a dedicated backend infrastructure
- This implementation is for **prototyping and demonstration** purposes

### Best Practices

1. **Never expose Service Role Key** to the frontend
2. **Always validate permissions** on both frontend and backend
3. **Use HTTPS** in production
4. **Implement rate limiting** for auth endpoints
5. **Regular security audits** of user permissions
6. **Password requirements:** Enforce strong passwords
7. **Session management:** Configure appropriate session timeouts
8. **Audit logging:** Track user actions for compliance

### Password Management

- Passwords are hashed by Supabase Auth
- Cannot be recovered (only reset)
- Store credentials securely when creating users
- Implement password reset flow for production

---

## Frontend Components

### Key Components

1. **`AuthContext`** (`/contexts/AuthContext.tsx`)
   - Manages authentication state
   - Provides auth methods (signIn, signOut, signUp)
   - Permission checking utilities

2. **`LoginPage`** (`/components/auth/LoginPage.tsx`)
   - User login interface
   - Form validation
   - Error handling

3. **`ProtectedRoute`** (`/components/auth/ProtectedRoute.tsx`)
   - Route protection wrapper
   - Permission-based access control
   - Fallback rendering

4. **`UserMenu`** (`/components/auth/UserMenu.tsx`)
   - User profile display
   - Role badge
   - Logout functionality

5. **`UserManagement`** (`/components/admin/UserManagement.tsx`)
   - Admin interface for user management
   - Create new users
   - View all users

---

## Backend Implementation

### Server Routes

Located in `/supabase/functions/server/index.tsx`

Key features:
- User creation with email auto-confirmation
- Profile management in KV store
- Role-based access control
- Session management
- Error handling and logging

### KV Store Schema

**User Profile Key:** `user:{userId}`

**Profile Structure:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "accountant",
  "department": "Finance",
  "phone": "+1234567890",
  "avatar_url": "https://...",
  "created_at": "2025-11-06T00:00:00Z",
  "updated_at": "2025-11-06T00:00:00Z",
  "last_login": "2025-11-06T00:00:00Z",
  "is_active": true
}
```

---

## Troubleshooting

### Common Issues

**Issue:** Login fails with "Unauthorized"
- **Solution:** Check Supabase credentials in config
- Verify user exists in KV store
- Check server logs for errors

**Issue:** User menu not showing
- **Solution:** Ensure AuthProvider wraps the app
- Check if user profile is loaded
- Verify session is active

**Issue:** Permission denied errors
- **Solution:** Verify user role in KV store
- Check ROLE_PERMISSIONS matrix
- Ensure backend validates permissions

**Issue:** Local Supabase connection fails
- **Solution:** Update LOCAL_SUPABASE_CONFIG
- Verify local Supabase is running
- Check anon key matches local instance

---

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification flow
- [ ] Two-factor authentication (2FA)
- [ ] OAuth social login (Google, Microsoft)
- [ ] User activity logging
- [ ] Permission audit trail
- [ ] Role customization interface
- [ ] Department-based access control
- [ ] Session management UI
- [ ] API key management for integrations

---

## Related Documentation

- [Architecture Guide](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Quick Reference](./QUICK_REFERENCE.md)

---

**Last Updated:** November 6, 2025
