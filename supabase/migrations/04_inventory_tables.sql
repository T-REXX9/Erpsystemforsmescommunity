-- =====================================================
-- Inventory Module Tables
-- =====================================================
-- Tables for managing inventory, stock, and orders
-- =====================================================

-- =====================================================
-- PRODUCTS/ITEMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_code VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    unit_of_measure VARCHAR(50) NOT NULL DEFAULT 'pcs',
    unit_price DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
    cost_price DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (cost_price >= 0),
    reorder_level INTEGER NOT NULL DEFAULT 0 CHECK (reorder_level >= 0),
    reorder_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reorder_quantity >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- STOCK/INVENTORY
-- =====================================================

CREATE TABLE IF NOT EXISTS public.stock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    warehouse_location VARCHAR(100),
    quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK (quantity_on_hand >= 0),
    quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
    quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
    last_stock_count_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(product_id, warehouse_location)
);

-- =====================================================
-- STOCK MOVEMENTS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id),
    movement_type VARCHAR(50) NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment', 'transfer')),
    quantity INTEGER NOT NULL CHECK (quantity != 0),
    warehouse_location VARCHAR(100),
    reference_number VARCHAR(100),
    notes TEXT,
    movement_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PURCHASE ORDERS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number VARCHAR(50) NOT NULL UNIQUE,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_contact TEXT,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_delivery_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'confirmed', 'received', 'cancelled')),
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PURCHASE ORDER ITEMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.purchase_order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_order_id UUID NOT NULL REFERENCES public.purchase_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(15, 2) NOT NULL CHECK (unit_price >= 0),
    total_price DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    received_quantity INTEGER NOT NULL DEFAULT 0 CHECK (received_quantity >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(product_code);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_stock_product ON public.stock(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON public.stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_date ON public.stock_movements(movement_date DESC);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON public.purchase_orders(status);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_date ON public.purchase_orders(order_date DESC);
CREATE INDEX IF NOT EXISTS idx_purchase_order_items_po ON public.purchase_order_items(purchase_order_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_order_items ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Authenticated users can view products"
    ON public.products FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Inventory managers can manage products"
    ON public.products FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'));

-- Policies for stock
CREATE POLICY "Authenticated users can view stock"
    ON public.stock FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Inventory managers can manage stock"
    ON public.stock FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'));

-- Policies for stock movements
CREATE POLICY "Authenticated users can view stock movements"
    ON public.stock_movements FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Inventory managers can create stock movements"
    ON public.stock_movements FOR INSERT
    TO authenticated
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'));

-- Policies for purchase orders
CREATE POLICY "Authenticated users can view purchase orders"
    ON public.purchase_orders FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Inventory managers can manage purchase orders"
    ON public.purchase_orders FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'));

-- Policies for purchase order items
CREATE POLICY "Authenticated users can view purchase order items"
    ON public.purchase_order_items FOR SELECT
    TO authenticated USING (true);

CREATE POLICY "Inventory managers can manage purchase order items"
    ON public.purchase_order_items FOR ALL
    TO authenticated
    USING (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'))
    WITH CHECK (public.has_role('super_admin') OR public.has_role('admin') OR public.has_role('inventory_manager'));

-- =====================================================
-- TRIGGERS
-- =====================================================

CREATE TRIGGER trigger_update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_stock_updated_at
    BEFORE UPDATE ON public.stock
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

CREATE TRIGGER trigger_update_purchase_orders_updated_at
    BEFORE UPDATE ON public.purchase_orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_kv_store_updated_at();

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.products IS 'Product/item master data';
COMMENT ON TABLE public.stock IS 'Current stock levels by product and location';
COMMENT ON TABLE public.stock_movements IS 'History of all stock movements';
COMMENT ON TABLE public.purchase_orders IS 'Purchase orders to suppliers';
COMMENT ON TABLE public.purchase_order_items IS 'Line items in purchase orders';

