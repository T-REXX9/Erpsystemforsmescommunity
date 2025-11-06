-- =====================================================
-- Invoicing Module Tables
-- =====================================================
-- Tables for managing invoices, billing, and payments
-- =====================================================

-- =====================================================
-- CUSTOMERS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_code VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    tax_id VARCHAR(100),
    credit_limit DECIMAL(15, 2) DEFAULT 0 CHECK (credit_limit >= 0),
    payment_terms INTEGER DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INVOICES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.customers(id),
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    status invoice_status NOT NULL DEFAULT 'draft',
    subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    discount_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount DECIMAL(15, 2) GENERATED ALWAYS AS (subtotal + tax_amount - discount_amount) STORED,
    paid_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
    balance_due DECIMAL(15, 2) GENERATED ALWAYS AS (subtotal + tax_amount - discount_amount - paid_amount) STORED,
    notes TEXT,
    terms_and_conditions TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INVOICE ITEMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(15, 2) NOT NULL CHECK (unit_price >= 0),
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0 CHECK (tax_rate >= 0 AND tax_rate <= 100),
    line_total DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PAYMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_id UUID NOT NULL REFERENCES public.invoices(id),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'credit_card', 'debit_card', 'online')),
    reference_number VARCHAR(100),
    status payment_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- QUOTATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.customers(id),
    quotation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_until DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    subtotal DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    discount_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount DECIMAL(15, 2) GENERATED ALWAYS AS (subtotal + tax_amount - discount_amount) STORED,
    notes TEXT,
    terms_and_conditions TEXT,
    converted_to_invoice_id UUID REFERENCES public.invoices(id),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- QUOTATION ITEMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.quotation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(15, 2) NOT NULL CHECK (unit_price >= 0),
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0 CHECK (tax_rate >= 0 AND tax_rate <= 100),
    line_total DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_customers_code ON public.customers(customer_code);
CREATE INDEX IF NOT EXISTS idx_customers_active ON public.customers(is_active);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON public.invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON public.invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_date ON public.invoices(invoice_date DESC);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON public.invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON public.payments(payment_date DESC);
CREATE INDEX IF NOT EXISTS idx_quotations_customer ON public.quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON public.quotations(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_items ENABLE ROW LEVEL SECURITY;

-- Policies for customers
CREATE POLICY "Authenticated users can view customers"
    ON public.customers FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Sales and accountants can manage customers"
    ON public.customers FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'));

-- Policies for invoices
CREATE POLICY "Authenticated users can view invoices"
    ON public.invoices FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Sales and accountants can manage invoices"
    ON public.invoices FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'));

-- Policies for invoice items
CREATE POLICY "Authenticated users can view invoice items"
    ON public.invoice_items FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Sales and accountants can manage invoice items"
    ON public.invoice_items FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant') OR public.has_role('sales'));

-- Policies for payments
CREATE POLICY "Authenticated users can view payments"
    ON public.payments FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage payments"
    ON public.payments FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for quotations
CREATE POLICY "Authenticated users can view quotations"
    ON public.quotations FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Sales can manage quotations"
    ON public.quotations FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('sales'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('sales'));

-- Policies for quotation items
CREATE POLICY "Authenticated users can view quotation items"
    ON public.quotation_items FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Sales can manage quotation items"
    ON public.quotation_items FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('sales'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('sales'));

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trigger_update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_quotations_updated_at
    BEFORE UPDATE ON public.quotations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.customers IS 'Customer master data';
COMMENT ON TABLE public.invoices IS 'Sales invoices';
COMMENT ON TABLE public.invoice_items IS 'Line items in invoices';
COMMENT ON TABLE public.payments IS 'Payment records for invoices';
COMMENT ON TABLE public.quotations IS 'Sales quotations/estimates';
COMMENT ON TABLE public.quotation_items IS 'Line items in quotations';

