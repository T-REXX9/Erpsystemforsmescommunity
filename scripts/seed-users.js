/**
 * Seed Users Script
 * Creates initial test users for different roles
 *
 * Run with: npm run seed
 */

// Load environment variables from .env file
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
config({ path: join(__dirname, '..', '.env') });

// Get configuration from environment variables
const SUPABASE_PROJECT_ID = process.env.VITE_SUPABASE_PROJECT_ID || 'jajjvvlmmwtsooeeomdy';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphamp2dmxtbXd0c29vZWVvbWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MjU2NDAsImV4cCI6MjA3ODAwMTY0MH0.adV8BFODKcZlvyYUDx4bl1_CNSYlhupa50mqECJyxRE';

const SERVER_URL = `${SUPABASE_URL}/functions/v1/make-server-fe7e8957`;

const SEED_USERS = [
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

async function seedUsers() {
  console.log('\n🌱 Starting user seeding...\n');
  
  const results = {
    success: [],
    failed: [],
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
        console.log(`✅ ${user.email} (${user.role})`);
      } else {
        results.failed.push(`❌ ${user.email}: ${data.error}`);
        console.log(`❌ ${user.email}: ${data.error}`);
      }
    } catch (error) {
      results.failed.push(`❌ ${user.email}: ${error.message}`);
      console.log(`❌ ${user.email}: ${error.message}`);
    }
  }

  console.log('\n📊 Seeding Results:');
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\n🎉 Seeding complete! ${results.success.length}/${SEED_USERS.length} users created\n`);

  if (results.success.length > 0) {
    console.log('📋 Demo User Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 admin@company.com / admin123 (Super Admin)');
    console.log('👔 manager@company.com / manager123 (Manager)');
    console.log('💰 accountant@company.com / accountant123 (Accountant)');
    console.log('📦 inventory@company.com / inventory123 (Inventory Manager)');
    console.log('👥 hr@company.com / hr123 (HR Manager)');
    console.log('💼 sales@company.com / sales123 (Sales)');
    console.log('👁️  viewer@company.com / viewer123 (Viewer)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  // Exit with appropriate code
  process.exit(results.failed.length > 0 ? 1 : 0);
}

// Run the seeding
seedUsers().catch((error) => {
  console.error('❌ Fatal error during seeding:', error);
  process.exit(1);
});

