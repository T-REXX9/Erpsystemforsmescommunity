-- =====================================================
-- KV Store Table
-- =====================================================
-- Key-Value store for user profiles and application data
-- Used for storing user metadata, preferences, and settings
-- =====================================================

CREATE TABLE IF NOT EXISTS public.kv_store_fe7e8957 (
    key TEXT NOT NULL PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Index for faster JSONB queries
CREATE INDEX IF NOT EXISTS idx_kv_store_value_gin ON public.kv_store_fe7e8957 USING GIN (value);

-- Index for timestamp queries
CREATE INDEX IF NOT EXISTS idx_kv_store_updated_at ON public.kv_store_fe7e8957 (updated_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.kv_store_fe7e8957 ENABLE ROW LEVEL SECURITY;

-- Policy: Service role has full access
CREATE POLICY "Service role has full access to kv_store"
    ON public.kv_store_fe7e8957
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy: Authenticated users can read their own profile
CREATE POLICY "Users can read their own profile"
    ON public.kv_store_fe7e8957
    FOR SELECT
    TO authenticated
    USING (key = 'user:' || auth.uid()::text);

-- Policy: Authenticated users can update their own profile
CREATE POLICY "Users can update their own profile"
    ON public.kv_store_fe7e8957
    FOR UPDATE
    TO authenticated
    USING (key = 'user:' || auth.uid()::text)
    WITH CHECK (key = 'user:' || auth.uid()::text);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_kv_store_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
DROP TRIGGER IF EXISTS trigger_update_kv_store_updated_at ON public.kv_store_fe7e8957;
CREATE TRIGGER trigger_update_kv_store_updated_at
    BEFORE UPDATE ON public.kv_store_fe7e8957
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.kv_store_fe7e8957 IS 'Key-value store for user profiles and application data';
COMMENT ON COLUMN public.kv_store_fe7e8957.key IS 'Unique key identifier (e.g., user:{uuid})';
COMMENT ON COLUMN public.kv_store_fe7e8957.value IS 'JSONB value containing the data';
COMMENT ON COLUMN public.kv_store_fe7e8957.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.kv_store_fe7e8957.updated_at IS 'Timestamp when the record was last updated';

