-- =====================================================
-- Payroll Module Tables
-- =====================================================
-- Tables for managing employees, payroll, and attendance
-- =====================================================

-- =====================================================
-- EMPLOYEES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_code VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    date_of_birth DATE,
    date_of_joining DATE NOT NULL DEFAULT CURRENT_DATE,
    date_of_leaving DATE,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    employment_type VARCHAR(50) NOT NULL DEFAULT 'full_time' CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),
    salary DECIMAL(15, 2) NOT NULL CHECK (salary >= 0),
    bank_account_number VARCHAR(50),
    bank_name VARCHAR(100),
    bank_ifsc VARCHAR(20),
    pan_number VARCHAR(20),
    aadhar_number VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PAYROLL
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payroll (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    pay_period VARCHAR(50) NOT NULL,
    pay_date DATE NOT NULL,
    basic_salary DECIMAL(15, 2) NOT NULL CHECK (basic_salary >= 0),
    allowances DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (allowances >= 0),
    deductions DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (deductions >= 0),
    gross_salary DECIMAL(15, 2) GENERATED ALWAYS AS (basic_salary + allowances) STORED,
    net_salary DECIMAL(15, 2) GENERATED ALWAYS AS (basic_salary + allowances - deductions) STORED,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'paid', 'cancelled')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('bank_transfer', 'cash', 'check')),
    payment_reference VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(employee_id, pay_period)
);

-- =====================================================
-- PAYROLL COMPONENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payroll_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payroll_id UUID NOT NULL REFERENCES public.payroll(id) ON DELETE CASCADE,
    component_type VARCHAR(50) NOT NULL CHECK (component_type IN ('allowance', 'deduction')),
    component_name VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL CHECK (amount >= 0),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ATTENDANCE
-- =====================================================

CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    status VARCHAR(50) NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half_day', 'leave', 'holiday')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(employee_id, attendance_date)
);

-- =====================================================
-- LEAVE RECORDS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.leave_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID NOT NULL REFERENCES public.employees(id),
    leave_type VARCHAR(50) NOT NULL CHECK (leave_type IN ('casual', 'sick', 'earned', 'unpaid', 'maternity', 'paternity')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_days INTEGER GENERATED ALWAYS AS (end_date - start_date + 1) STORED,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (end_date >= start_date)
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_employees_code ON public.employees(employee_code);
CREATE INDEX IF NOT EXISTS idx_employees_department ON public.employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_active ON public.employees(is_active);
CREATE INDEX IF NOT EXISTS idx_payroll_employee ON public.payroll(employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_period ON public.payroll(pay_period);
CREATE INDEX IF NOT EXISTS idx_payroll_status ON public.payroll(status);
CREATE INDEX IF NOT EXISTS idx_payroll_components_payroll ON public.payroll_components(payroll_id);
CREATE INDEX IF NOT EXISTS idx_attendance_employee ON public.attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(attendance_date DESC);
CREATE INDEX IF NOT EXISTS idx_leave_records_employee ON public.leave_records(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_records_status ON public.leave_records(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_records ENABLE ROW LEVEL SECURITY;

-- Policies for employees
CREATE POLICY "Authenticated users can view employees"
    ON public.employees FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "HR managers can manage employees"
    ON public.employees FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

-- Policies for payroll
CREATE POLICY "HR managers can view all payroll"
    ON public.payroll FOR SELECT
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

CREATE POLICY "HR managers can manage payroll"
    ON public.payroll FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

-- Policies for payroll_components
CREATE POLICY "HR managers can view payroll components"
    ON public.payroll_components FOR SELECT
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

CREATE POLICY "HR managers can manage payroll components"
    ON public.payroll_components FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

-- Policies for attendance
CREATE POLICY "Authenticated users can view attendance"
    ON public.attendance FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "HR managers can manage attendance"
    ON public.attendance FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

-- Policies for leave_records
CREATE POLICY "Authenticated users can view leave records"
    ON public.leave_records FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "HR managers can manage leave records"
    ON public.leave_records FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('hr_manager'));

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trigger_update_employees_updated_at
    BEFORE UPDATE ON public.employees
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_payroll_updated_at
    BEFORE UPDATE ON public.payroll
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_attendance_updated_at
    BEFORE UPDATE ON public.attendance
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_leave_records_updated_at
    BEFORE UPDATE ON public.leave_records
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.employees IS 'Employee master data';
COMMENT ON TABLE public.payroll IS 'Monthly payroll records';
COMMENT ON TABLE public.payroll_components IS 'Detailed breakdown of payroll allowances and deductions';
COMMENT ON TABLE public.attendance IS 'Daily attendance records';
COMMENT ON TABLE public.leave_records IS 'Employee leave applications and approvals';

