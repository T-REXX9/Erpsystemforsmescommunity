-- =====================================================
-- ERP System for SMEs - Initial Database Setup
-- =====================================================
-- ⚠️ WARNING: TEMPLATE FILE - DO NOT RUN AS-IS!
-- This is a reference schema. Review and customize
-- before running on your Supabase instance.
-- =====================================================
-- This migration sets up the core database structure
-- Run this first before any other migrations
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types/enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'super_admin',
        'admin',
        'manager',
        'accountant',
        'inventory_manager',
        'hr_manager',
        'sales',
        'viewer'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('income', 'expense');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE tax_status AS ENUM ('pending', 'paid', 'overdue');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TYPE user_role IS 'User roles for role-based access control';
COMMENT ON TYPE transaction_type IS 'Type of financial transaction';
COMMENT ON TYPE tax_status IS 'Status of tax payment';
COMMENT ON TYPE invoice_status IS 'Status of invoice';
COMMENT ON TYPE payment_status IS 'Status of payment';

