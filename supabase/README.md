# Supabase Database Schemas

This directory contains SQL schema files for the ERP System database.

## ⚠️ IMPORTANT WARNING

**These are TEMPLATE/REFERENCE schemas only!**

**DO NOT run these migrations directly on your Supabase instance without:**
1. ✅ Reviewing your existing database schema
2. ✅ Customizing these files to match your requirements
3. ✅ Testing on a development/staging environment first
4. ✅ Creating a backup of your production database

## 📁 Directory Structure

```
supabase/
├── migrations/          # SQL migration files
│   ├── 00_initial_setup.sql
│   ├── 01_kv_store.sql
│   ├── 02_auth_schema.sql
│   ├── 03_accounting_tables.sql
│   ├── 04_inventory_tables.sql
│   ├── 05_invoicing_tables.sql
│   ├── 06_tax_tables.sql
│   ├── 07_payroll_tables.sql
│   └── README.md        # Detailed migration guide
└── README.md            # This file
```

## 🎯 Purpose

These schema files serve as:

- **Reference Documentation** - Shows the intended database structure
- **Development Templates** - Starting point for your custom schema
- **Schema Versioning** - Track database structure changes
- **Team Collaboration** - Share database design with team members

## 📊 What's Included

### Core Infrastructure
- Custom PostgreSQL types and enums
- Helper functions for role-based access
- Automatic timestamp updates
- Row Level Security (RLS) policies

### Business Modules
- **Accounting** - Chart of accounts, transactions, journal entries
- **Inventory** - Products, stock management, purchase orders
- **Invoicing** - Customers, invoices, payments, quotations
- **Tax Compliance** - GST, TDS, tax records
- **Payroll** - Employees, payroll, attendance, leave management

## 🔒 Security Features

All tables include:
- Row Level Security (RLS) enabled
- Role-based access policies
- Audit trails (created_by, created_at, updated_at)
- Data validation constraints

## 📖 Usage Guide

See [migrations/README.md](./migrations/README.md) for detailed instructions on:
- How to review and customize schemas
- How to test migrations safely
- How to apply migrations to production
- Troubleshooting common issues

## 🛠️ Customization Tips

### Before Using These Schemas

1. **Assess Your Needs**
   - Do you need all modules?
   - Are there additional fields required?
   - Do you have different business rules?

2. **Review Data Types**
   - Currency precision (DECIMAL(15,2) may need adjustment)
   - Text field lengths
   - Date/time requirements

3. **Adjust RLS Policies**
   - Review role-based access rules
   - Add custom policies for your use case
   - Consider multi-tenancy if needed

4. **Optimize for Your Scale**
   - Add/remove indexes based on query patterns
   - Consider partitioning for large tables
   - Adjust constraints as needed

## 🔄 Current Database State

Your Supabase instance currently has:
- `auth.users` - Managed by Supabase Auth
- `kv_store_fe7e8957` - User profiles and metadata

**These schemas will ADD new tables** - they won't modify existing ones unless you customize them to do so.

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Design Patterns](https://supabase.com/docs/guides/database/design)

## 🤝 Contributing

If you customize these schemas for your use case and want to share improvements:
1. Document your changes clearly
2. Test thoroughly
3. Consider creating a pull request with your enhancements

## ⚡ Quick Reference

| Module | Tables | Primary Use Case |
|--------|--------|------------------|
| Auth | 1 | User authentication |
| Accounting | 4 | Financial management |
| Inventory | 5 | Stock & orders |
| Invoicing | 6 | Billing & payments |
| Tax | 4 | Tax compliance |
| Payroll | 5 | HR & payroll |

**Total: 25 tables** (excluding auth.users which is managed by Supabase)

## 📞 Need Help?

- Review the [main README](../README.md)
- Check [Environment Setup](../docs/ENVIRONMENT_SETUP.md)
- See [Authentication Guide](../src/docs/AUTHENTICATION.md)
- Read [migrations/README.md](./migrations/README.md)

