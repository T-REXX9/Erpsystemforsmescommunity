-- =====================================================
-- Accounting Module Tables
-- =====================================================
-- Tables for managing financial transactions, ledgers,
-- and accounting records
-- =====================================================

-- =====================================================
-- CHART OF ACCOUNTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.chart_of_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_code VARCHAR(50) NOT NULL UNIQUE,
    account_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
    parent_account_id UUID REFERENCES public.chart_of_accounts(id),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TRANSACTIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_number VARCHAR(50) NOT NULL UNIQUE,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
    transaction_type transaction_type NOT NULL,
    account_id UUID REFERENCES public.chart_of_accounts(id),
    reference_number VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- JOURNAL ENTRIES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_number VARCHAR(50) NOT NULL UNIQUE,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    reference VARCHAR(100),
    is_posted BOOLEAN NOT NULL DEFAULT false,
    posted_at TIMESTAMPTZ,
    posted_by UUID REFERENCES auth.users(id),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- JOURNAL ENTRY LINES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.journal_entry_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_entry_id UUID NOT NULL REFERENCES public.journal_entries(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES public.chart_of_accounts(id),
    debit_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (debit_amount >= 0),
    credit_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (credit_amount >= 0),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_debit_or_credit CHECK (
        (debit_amount > 0 AND credit_amount = 0) OR
        (credit_amount > 0 AND debit_amount = 0)
    )
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_chart_of_accounts_type ON public.chart_of_accounts(account_type);
CREATE INDEX IF NOT EXISTS idx_chart_of_accounts_active ON public.chart_of_accounts(is_active);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON public.transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON public.journal_entries(entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_posted ON public.journal_entries(is_posted);
CREATE INDEX IF NOT EXISTS idx_journal_entry_lines_entry ON public.journal_entry_lines(journal_entry_id);
CREATE INDEX IF NOT EXISTS idx_journal_entry_lines_account ON public.journal_entry_lines(account_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entry_lines ENABLE ROW LEVEL SECURITY;

-- Policies for chart_of_accounts
CREATE POLICY "Authenticated users can view chart of accounts"
    ON public.chart_of_accounts FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage chart of accounts"
    ON public.chart_of_accounts FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for transactions
CREATE POLICY "Authenticated users can view transactions"
    ON public.transactions FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage transactions"
    ON public.transactions FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for journal entries
CREATE POLICY "Authenticated users can view journal entries"
    ON public.journal_entries FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage journal entries"
    ON public.journal_entries FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- Policies for journal entry lines
CREATE POLICY "Authenticated users can view journal entry lines"
    ON public.journal_entry_lines FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Accountants can manage journal entry lines"
    ON public.journal_entry_lines FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('accountant'));

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trigger_update_chart_of_accounts_updated_at
    BEFORE UPDATE ON public.chart_of_accounts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.chart_of_accounts IS 'Chart of accounts for the accounting system';
COMMENT ON TABLE public.transactions IS 'Financial transactions (income and expenses)';
COMMENT ON TABLE public.journal_entries IS 'Journal entries for double-entry bookkeeping';
COMMENT ON TABLE public.journal_entry_lines IS 'Individual lines in journal entries (debits and credits)';

