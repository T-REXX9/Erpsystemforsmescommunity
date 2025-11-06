-- =====================================================
-- Tax Compliance Module Tables
-- =====================================================
-- Tables for managing GST, TDS, and other tax records
-- =====================================================

-- =====================================================
-- TAX RECORDS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.tax_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_type VARCHAR(50) NOT NULL CHECK (tax_type IN ('GST', 'TDS', 'VAT', 'Income Tax', 'Other')),
    tax_period VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount >= 0),
    due_date DATE NOT NULL,
    payment_date DATE,
    status tax_status NOT NULL DEFAULT 'pending',
    reference_number VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- GST RETURNS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.gst_returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    return_period VARCHAR(50) NOT NULL,
    return_type VARCHAR(50) NOT NULL CHECK (return_type IN ('GSTR-1', 'GSTR-3B', 'GSTR-9', 'Other')),
    filing_date DATE,
    due_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'filed', 'revised', 'late')),
    total_sales DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (total_sales >= 0),
    total_purchases DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (total_purchases >= 0),
    output_tax DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (output_tax >= 0),
    input_tax_credit DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (input_tax_credit >= 0),
    tax_payable DECIMAL(15, 2) GENERATED ALWAYS AS (output_tax - input_tax_credit) STORED,
    acknowledgment_number VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TDS RECORDS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.tds_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deductee_name VARCHAR(255) NOT NULL,
    deductee_pan VARCHAR(20),
    section_code VARCHAR(50) NOT NULL,
    payment_date DATE NOT NULL,
    payment_amount DECIMAL(15, 2) NOT NULL CHECK (payment_amount > 0),
    tds_rate DECIMAL(5, 2) NOT NULL CHECK (tds_rate >= 0 AND tds_rate <= 100),
    tds_amount DECIMAL(15, 2) GENERATED ALWAYS AS (payment_amount * tds_rate / 100) STORED,
    challan_number VARCHAR(100),
    deposit_date DATE,
    status tax_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TAX SETTINGS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.tax_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_type VARCHAR(50) NOT NULL UNIQUE,
    tax_rate DECIMAL(5, 2) NOT NULL CHECK (tax_rate >= 0 AND tax_rate <= 100),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_tax_records_type ON public.tax_records(tax_type);
CREATE INDEX IF NOT EXISTS idx_tax_records_status ON public.tax_records(status);
CREATE INDEX IF NOT EXISTS idx_tax_records_due_date ON public.tax_records(due_date);
CREATE INDEX IF NOT EXISTS idx_gst_returns_period ON public.gst_returns(return_period);
CREATE INDEX IF NOT EXISTS idx_gst_returns_status ON public.gst_returns(status);
CREATE INDEX IF NOT EXISTS idx_tds_records_deductee ON public.tds_records(deductee_name);
CREATE INDEX IF NOT EXISTS idx_tds_records_status ON public.tds_records(status);
CREATE INDEX IF NOT EXISTS idx_tds_records_payment_date ON public.tds_records(payment_date DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.tax_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gst_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tds_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_settings ENABLE ROW LEVEL SECURITY;

-- Policies for tax_records
CREATE POLICY "Authenticated users can view tax records"
    ON public.tax_records FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage tax records"
    ON public.tax_records FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for gst_returns
CREATE POLICY "Authenticated users can view GST returns"
    ON public.gst_returns FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage GST returns"
    ON public.gst_returns FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for tds_records
CREATE POLICY "Authenticated users can view TDS records"
    ON public.tds_records FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage TDS records"
    ON public.tds_records FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for tax_settings
CREATE POLICY "Authenticated users can view tax settings"
    ON public.tax_settings FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Admins can manage tax settings"
    ON public.tax_settings FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin'));

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trigger_update_tax_records_updated_at
    BEFORE UPDATE ON public.tax_records
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_gst_returns_updated_at
    BEFORE UPDATE ON public.gst_returns
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_tds_records_updated_at
    BEFORE UPDATE ON public.tds_records
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_tax_settings_updated_at
    BEFORE UPDATE ON public.tax_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.tax_records IS 'General tax records and payments';
COMMENT ON TABLE public.gst_returns IS 'GST return filings';
COMMENT ON TABLE public.tds_records IS 'TDS deduction records';
COMMENT ON TABLE public.tax_settings IS 'Tax rate and configuration settings';

