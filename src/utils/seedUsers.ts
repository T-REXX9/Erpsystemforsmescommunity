/**
 * Seed Users Script
 * Creates initial test users for different roles
 * 
 * Run this once to set up demo users
 */

import { SERVER_URL, SUPABASE_ANON_KEY } from '../config/supabase';
import { UserRole } from '../types/auth';

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

const SEED_USERS: SeedUser[] = [
  {
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'super_admin',
  },
  {
    email: 'manager@company.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
  },
  {
    email: 'accountant@company.com',
    password: 'accountant123',
    name: 'Accountant User',
    role: 'accountant',
  },
  {
    email: 'inventory@company.com',
    password: 'inventory123',
    name: 'Inventory Manager',
    role: 'inventory_manager',
  },
  {
    email: 'hr@company.com',
    password: 'hr123',
    name: 'HR Manager',
    role: 'hr_manager',
  },
  {
    email: 'sales@company.com',
    password: 'sales123',
    name: 'Sales User',
    role: 'sales',
  },
  {
    email: 'viewer@company.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer',
  },
];

export async function seedUsers() {
  console.log('🌱 Starting user seeding...');
  
  const results = {
    success: [] as string[],
    failed: [] as string[],
  };

  for (const user of SEED_USERS) {
    try {
      const response = await fetch(`${SERVER_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        results.success.push(`✅ ${user.email} (${user.role})`);
      } else {
        results.failed.push(`❌ ${user.email}: ${data.error}`);
      }
    } catch (error: any) {
      results.failed.push(`❌ ${user.email}: ${error.message}`);
    }
  }

  console.log('\n📊 Seeding Results:');
  console.log('\n✅ Successful:');
  results.success.forEach(msg => console.log(msg));
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed:');
    results.failed.forEach(msg => console.log(msg));
  }

  console.log(`\n🎉 Seeding complete! ${results.success.length}/${SEED_USERS.length} users created`);
  
  return results;
}

// Export credentials for documentation
export const TEST_CREDENTIALS = SEED_USERS.map(u => ({
  email: u.email,
  password: u.password,
  role: u.role,
}));
