# Database Migrations

This folder contains all SQL migration files for the ERP System database schema.

## ⚠️ IMPORTANT NOTICE

**DO NOT RUN THESE MIGRATIONS YET!**

These schema files are templates and reference designs. Your Supabase instance may have custom schemas that differ from these templates.

**Before running any migrations:**
1. Review your existing Supabase schema
2. Customize these migration files to match your requirements
3. Test migrations on a development/staging environment first
4. Backup your database before applying to production

## 📁 Migration Files

Migrations are numbered sequentially and should be run in order:

| File | Description |
|------|-------------|
| `00_initial_setup.sql` | Creates extensions and custom types/enums |
| `01_kv_store.sql` | Key-value store for user profiles and app data |
| `02_auth_schema.sql` | Authentication schema documentation and helper functions |
| `03_accounting_tables.sql` | Accounting module (chart of accounts, transactions, journal entries) |
| `04_inventory_tables.sql` | Inventory module (products, stock, purchase orders) |
| `05_invoicing_tables.sql` | Invoicing module (customers, invoices, payments, quotations) |
| `06_tax_tables.sql` | Tax compliance module (GST, TDS, tax records) |
| `07_payroll_tables.sql` | Payroll module (employees, payroll, attendance, leave) |

## 🚀 How to Use These Schemas

### Step 1: Review Your Current Schema

Before using these migration files, check your existing Supabase schema:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Database** → **Tables**
4. Review existing tables and their structure

### Step 2: Customize the Migrations

These are **template schemas** - you should customize them:

1. Review each migration file
2. Modify table structures to match your business needs
3. Adjust column types, constraints, and relationships
4. Update RLS policies based on your security requirements
5. Remove or add tables as needed

### Step 3: Test in Development

**Never run migrations directly on production!**

1. Create a test/development Supabase project
2. Test migrations there first
3. Verify all tables, indexes, and policies work correctly
4. Test with your application code

### Step 4: Apply to Production (When Ready)

#### Option A: Using Supabase Dashboard

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. **Backup your database first!**
5. Copy and paste each migration file in order (00 → 07)
6. Review the SQL before running
7. Click **Run** for each file

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Review migrations before pushing
# Then run migrations
supabase db push
```

## 📊 Database Structure

### Core Tables

#### Authentication & Users
- `auth.users` - Managed by Supabase (user authentication)
- `kv_store_fe7e8957` - User profiles and metadata

#### Accounting
- `chart_of_accounts` - Chart of accounts
- `transactions` - Financial transactions
- `journal_entries` - Journal entries
- `journal_entry_lines` - Journal entry line items

#### Inventory
- `products` - Product/item master
- `stock` - Stock levels by location
- `stock_movements` - Stock movement history
- `purchase_orders` - Purchase orders
- `purchase_order_items` - PO line items

#### Invoicing
- `customers` - Customer master
- `invoices` - Sales invoices
- `invoice_items` - Invoice line items
- `payments` - Payment records
- `quotations` - Sales quotations
- `quotation_items` - Quotation line items

#### Tax Compliance
- `tax_records` - General tax records
- `gst_returns` - GST return filings
- `tds_records` - TDS deduction records
- `tax_settings` - Tax configuration

#### Payroll
- `employees` - Employee master
- `payroll` - Payroll records
- `payroll_components` - Payroll allowances/deductions
- `attendance` - Attendance records
- `leave_records` - Leave applications

## 🔒 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with role-based policies:

- **super_admin** - Full access to all tables
- **admin** - Full access to all tables
- **manager** - Read/write access to most tables
- **accountant** - Full access to accounting, tax, and invoicing
- **inventory_manager** - Full access to inventory and purchase orders
- **hr_manager** - Full access to payroll and employee data
- **sales** - Full access to customers, invoices, and quotations
- **viewer** - Read-only access to all tables

### Helper Functions

- `get_user_role(user_id)` - Get role of a specific user
- `has_role(role_name)` - Check if current user has a specific role
- `is_admin()` - Check if current user is an admin

## 🔄 Automatic Features

### Timestamps

All tables with `updated_at` columns automatically update the timestamp on record modification.

### Generated Columns

Many tables use PostgreSQL generated columns for calculated fields:
- Invoice totals
- Stock availability
- Payroll calculations
- Journal entry balances

## 📝 Custom Types

The following custom enum types are defined:

- `user_role` - User roles for RBAC
- `transaction_type` - Income or expense
- `tax_status` - Pending, paid, overdue
- `invoice_status` - Draft, sent, paid, overdue, cancelled
- `payment_status` - Pending, completed, failed, refunded

## 🛠️ Maintenance

### Adding New Migrations

1. Create a new file with the next sequential number: `08_your_migration.sql`
2. Include proper comments and documentation
3. Add RLS policies for all new tables
4. Update this README with the new migration

### Rolling Back

To roll back a migration:

```sql
-- Drop tables in reverse order
DROP TABLE IF EXISTS table_name CASCADE;
```

**⚠️ Warning:** Always backup your data before running migrations or rollbacks!

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🐛 Troubleshooting

### Migration Fails

1. **Check dependencies** - Ensure migrations are run in order
2. **Check permissions** - Ensure you have proper database permissions
3. **Check existing data** - Some migrations may fail if data already exists

### RLS Issues

1. **Check user role** - Ensure user has correct role in `auth.users.raw_user_meta_data`
2. **Check policies** - Review RLS policies for the specific table
3. **Use service role** - For admin operations, use service role key

### Performance Issues

1. **Check indexes** - All foreign keys and frequently queried columns are indexed
2. **Analyze queries** - Use `EXPLAIN ANALYZE` to check query performance
3. **Update statistics** - Run `ANALYZE` on tables after bulk inserts

## 📞 Support

For issues or questions:
1. Check the [main README](../../README.md)
2. Review [Authentication Guide](../../src/docs/AUTHENTICATION.md)
3. Check [Environment Setup](../../docs/ENVIRONMENT_SETUP.md)

