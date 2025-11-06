-- =====================================================
-- Authentication Schema Documentation
-- =====================================================
-- Supabase provides auth.users table automatically
-- This file documents the structure and adds custom policies
-- =====================================================

-- =====================================================
-- AUTH.USERS TABLE STRUCTURE (Managed by Supabase)
-- =====================================================
-- 
-- The auth.users table is automatically created by Supabase
-- and contains the following columns:
--
-- id                  UUID PRIMARY KEY
-- email               VARCHAR UNIQUE
-- encrypted_password  VARCHAR
-- email_confirmed_at  TIMESTAMPTZ
-- invited_at          TIMESTAMPTZ
-- confirmation_token  VARCHAR
-- confirmation_sent_at TIMESTAMPTZ
-- recovery_token      VARCHAR
-- recovery_sent_at    TIMESTAMPTZ
-- email_change_token_new VARCHAR
-- email_change        VARCHAR
-- email_change_sent_at TIMESTAMPTZ
-- last_sign_in_at     TIMESTAMPTZ
-- raw_app_meta_data   JSONB
-- raw_user_meta_data  JSONB
-- is_super_admin      BOOLEAN
-- created_at          TIMESTAMPTZ
-- updated_at          TIMESTAMPTZ
-- phone               VARCHAR
-- phone_confirmed_at  TIMESTAMPTZ
-- phone_change        VARCHAR
-- phone_change_token  VARCHAR
-- phone_change_sent_at TIMESTAMPTZ
-- confirmed_at        TIMESTAMPTZ
-- email_change_token_current VARCHAR
-- email_change_confirm_status SMALLINT
-- banned_until        TIMESTAMPTZ
-- reauthentication_token VARCHAR
-- reauthentication_sent_at TIMESTAMPTZ
-- is_sso_user         BOOLEAN
-- deleted_at          TIMESTAMPTZ
--
-- =====================================================

-- =====================================================
-- USER METADATA STRUCTURE
-- =====================================================
--
-- raw_user_meta_data JSONB contains:
-- {
--   "name": "User Name",
--   "role": "accountant",
--   "avatar_url": "https://...",
--   "phone": "+1234567890",
--   "department": "Finance"
-- }
--
-- =====================================================

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get user role from metadata
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT raw_user_meta_data->>'role'
        FROM auth.users
        WHERE id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT raw_user_meta_data->>'role' = required_role
        FROM auth.users
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT raw_user_meta_data->>'role' IN ('super_admin', 'admin')
        FROM auth.users
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON FUNCTION public.get_user_role IS 'Get the role of a specific user';
COMMENT ON FUNCTION public.has_role IS 'Check if current user has a specific role';
COMMENT ON FUNCTION public.is_admin IS 'Check if current user is an admin';

