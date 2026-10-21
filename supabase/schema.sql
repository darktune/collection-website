-- ==============================================================================
-- ABRAHAM COLLECTION — MASTER ATELIER DATABASE SCHEMA & ROW-LEVEL SECURITY
-- Framework: Supabase (PostgreSQL 15+)
-- Founder: Bolaji Abayomi Abraham (Est. 2002 • Lagos, Nigeria)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ENUMS & PRESTIGE TIERS
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE member_tier AS ENUM ('Guest Patron', 'Atelier Circle', 'Royal Benefactor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE commission_status AS ENUM ('Inscription', 'Consultation', 'Basting', 'Production', 'Delivered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_gateway AS ENUM ('paystack', 'flutterwave', 'korapay', 'kora', 'transfer', 'whatsapp');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLES (CREATE IF NOT EXISTS)
-- ==============================================================================

-- 3.1 PROFILES & ANATOMICAL MEASUREMENT VAULT
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL DEFAULT 'Esteemed Patron',
    phone TEXT,
    city TEXT DEFAULT 'Lagos',
    country TEXT DEFAULT 'Nigeria',
    member_tier member_tier DEFAULT 'Atelier Circle',
    preferred_silhouette TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    
    -- Anatomical Measurement Vault (24 Master Tailor Points)
    chest_circ NUMERIC(5,2),
    stomach_circ NUMERIC(5,2),
    waist_circ NUMERIC(5,2),
    hip_circ NUMERIC(5,2),
    shoulder_span NUMERIC(5,2),
    sleeve_length NUMERIC(5,2),
    bicep_circ NUMERIC(5,2),
    wrist_circ NUMERIC(5,2),
    neck_circ NUMERIC(5,2),
    trouser_waist NUMERIC(5,2),
    trouser_length NUMERIC(5,2),
    trouser_inseam NUMERIC(5,2),
    thigh_circ NUMERIC(5,2),
    knee_circ NUMERIC(5,2),
    ankle_circ NUMERIC(5,2),
    agbada_drop_length NUMERIC(5,2),
    agbada_wing_span NUMERIC(5,2),
    kaftan_shirt_length NUMERIC(5,2),
    posture_notes TEXT,
    
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.2 BESPOKE COMMISSIONS REGISTRY
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL DEFAULT 'Esteemed Client',
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
    occasion TEXT NOT NULL DEFAULT 'Bespoke Consultation',
    silhouette TEXT NOT NULL DEFAULT 'Grand Agbada',
    consultation_type TEXT NOT NULL DEFAULT 'studio',
    status commission_status DEFAULT 'Inscription' NOT NULL,
    date_needed DATE,
    is_diaspora BOOLEAN DEFAULT FALSE NOT NULL,
    garment_count INTEGER DEFAULT 1 NOT NULL,
    notes TEXT,
    assigned_tailor TEXT DEFAULT 'Bolaji Abayomi Abraham',
    timeline_logs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.3 CORPORATE & INSTITUTIONAL LEADS (B2B)
CREATE TABLE IF NOT EXISTS public.corporate_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT,
    employees_count TEXT,
    garment_types TEXT[],
    estimated_quantity INTEGER,
    delivery_location TEXT,
    required_date DATE,
    project_description TEXT,
    budget_range TEXT,
    status TEXT DEFAULT 'New Inquiry' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.4 NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'Storefront Footer',
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.5 COMMERCE ORDERS & INSTANT PURCHASES
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    delivery_address TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    amount_ngn NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    amount_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gateway payment_gateway DEFAULT 'whatsapp' NOT NULL,
    status payment_status DEFAULT 'pending' NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.6 TEXTILE INVENTORY (ATELIER YARDAGE)
CREATE TABLE IF NOT EXISTS public.textile_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fabric_name TEXT NOT NULL,
    origin TEXT NOT NULL,
    composition TEXT NOT NULL,
    color TEXT NOT NULL,
    yardage_available NUMERIC(7,2) NOT NULL DEFAULT 0.00,
    unit_cost_ngn NUMERIC(10,2),
    is_low_stock BOOLEAN GENERATED ALWAYS AS (yardage_available < 15.00) STORED,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3.7 RESILIENT SCHEMA MIGRATIONS (Auto-healing pre-existing tables)
-- ==============================================================================

-- COMMISSIONS: Rename legacy 'reference' column if present
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'commissions' AND column_name = 'reference'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'commissions' AND column_name = 'reference_code'
    ) THEN
        ALTER TABLE public.commissions RENAME COLUMN reference TO reference_code;
    END IF;
END $$;

-- COMMISSIONS: Ensure all required columns exist
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS reference_code TEXT;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS client_name TEXT DEFAULT 'Esteemed Client';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Lagos, Nigeria';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS occasion TEXT DEFAULT 'Bespoke Consultation';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS silhouette TEXT DEFAULT 'Grand Agbada';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS consultation_type TEXT DEFAULT 'studio';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS status commission_status DEFAULT 'Inscription';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS date_needed DATE;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS is_diaspora BOOLEAN DEFAULT FALSE;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS garment_count INTEGER DEFAULT 1;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS assigned_tailor TEXT DEFAULT 'Bolaji Abayomi Abraham';
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS timeline_logs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.commissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- Backfill reference_code on any existing commission rows missing one
UPDATE public.commissions 
SET reference_code = 'AB-2026-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') 
WHERE reference_code IS NULL;

-- PROFILES: Ensure all required columns exist (onboarding + measurement vault)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT DEFAULT 'Esteemed Patron';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'Lagos';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Nigeria';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS member_tier member_tier DEFAULT 'Atelier Circle';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_silhouette TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS chest_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stomach_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS waist_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hip_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS shoulder_span NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sleeve_length NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bicep_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS wrist_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS neck_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trouser_waist NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trouser_length NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trouser_inseam NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS thigh_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS knee_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ankle_circ NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS agbada_drop_length NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS agbada_wing_span NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS kaftan_shirt_length NUMERIC(5,2);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS posture_notes TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- ORDERS: Rename order_reference if present
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'order_reference'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'reference'
    ) THEN
        ALTER TABLE public.orders RENAME COLUMN order_reference TO reference;
    END IF;
END $$;

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reference TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS amount_ngn NUMERIC(12,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS amount_usd NUMERIC(10,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS gateway payment_gateway DEFAULT 'whatsapp';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status payment_status DEFAULT 'pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- Backfill order reference if NULL
UPDATE public.orders 
SET reference = 'ORD-2026-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0') 
WHERE reference IS NULL;

-- CORPORATE LEADS: Ensure columns exist
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS contact_person TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS employees_count TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS garment_types TEXT[];
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS estimated_quantity INTEGER;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS delivery_location TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS required_date DATE;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS project_description TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS budget_range TEXT;
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New Inquiry';
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.corporate_leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- NEWSLETTER SUBSCRIBERS: Ensure columns exist
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'Storefront Footer';
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- TEXTILE INVENTORY: Ensure columns exist
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS fabric_name TEXT;
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS origin TEXT;
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS composition TEXT;
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS color TEXT;
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS yardage_available NUMERIC(7,2) DEFAULT 0.00;
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS unit_cost_ngn NUMERIC(10,2);
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.textile_inventory ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- ==============================================================================
-- 4. INDICES FOR HIGH PERFORMANCE QUERYING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_commissions_reference ON public.commissions(reference_code);
CREATE INDEX IF NOT EXISTS idx_commissions_email ON public.commissions(email);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(status);
CREATE INDEX IF NOT EXISTS idx_commissions_created_at ON public.commissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_corporate_leads_email ON public.corporate_leads(email);
CREATE INDEX IF NOT EXISTS idx_corporate_leads_created_at ON public.corporate_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders(reference);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- ==============================================================================
-- 5. ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all domain tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textile_inventory ENABLE ROW LEVEL SECURITY;

-- 5.1 PROFILES POLICIES
DROP POLICY IF EXISTS "Public profile creation" ON public.profiles;
CREATE POLICY "Public profile creation" ON public.profiles
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users and staff can view profiles" ON public.profiles;
CREATE POLICY "Users and staff can view profiles" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (true);

-- 5.2 COMMISSIONS POLICIES
DROP POLICY IF EXISTS "Public can submit commissions" ON public.commissions;
CREATE POLICY "Public can submit commissions" ON public.commissions
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Clients can view own commissions" ON public.commissions;
DROP POLICY IF EXISTS "Clients and staff can view commissions" ON public.commissions;
CREATE POLICY "Clients and staff can view commissions" ON public.commissions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can update commissions" ON public.commissions;
CREATE POLICY "Staff can update commissions" ON public.commissions
    FOR UPDATE USING (true);

-- 5.3 CORPORATE LEADS POLICIES
DROP POLICY IF EXISTS "Public can insert corporate leads" ON public.corporate_leads;
CREATE POLICY "Public can insert corporate leads" ON public.corporate_leads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view corporate leads" ON public.corporate_leads;
CREATE POLICY "Staff can view corporate leads" ON public.corporate_leads
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can update corporate leads" ON public.corporate_leads;
CREATE POLICY "Staff can update corporate leads" ON public.corporate_leads
    FOR UPDATE USING (true);

-- 5.4 NEWSLETTER POLICIES
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Staff can view subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (true);

-- 5.5 ORDERS POLICIES
DROP POLICY IF EXISTS "Public can place orders" ON public.orders;
CREATE POLICY "Public can place orders" ON public.orders
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Clients can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Clients and staff can view orders" ON public.orders;
CREATE POLICY "Clients and staff can view orders" ON public.orders
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can update orders" ON public.orders;
CREATE POLICY "Staff can update orders" ON public.orders
    FOR UPDATE USING (true);

-- 5.6 TEXTILE INVENTORY POLICIES
DROP POLICY IF EXISTS "Public and staff can view textile inventory" ON public.textile_inventory;
CREATE POLICY "Public and staff can view textile inventory" ON public.textile_inventory
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can manage textile inventory" ON public.textile_inventory;
CREATE POLICY "Staff can manage textile inventory" ON public.textile_inventory
    FOR ALL USING (true);

-- ==============================================================================
-- 6. SEED DATA (INITIAL ATELIER FOUNDATION)
-- ==============================================================================
CREATE UNIQUE INDEX IF NOT EXISTS idx_textile_fabric_name ON public.textile_inventory(fabric_name);

INSERT INTO public.textile_inventory (fabric_name, origin, composition, color, yardage_available, unit_cost_ngn)
VALUES
    ('Alaari Royal Silk Aso Oke', 'Iseyin, Oyo State', 'Hand-loomed Mulberry Silk & Metallic Thread', 'Imperial Oyo Crimson', 48.50, 45000),
    ('Super 150s English Worsted Wool', 'Huddersfield, UK', '100% Virgin Merino Wool', 'Obsidian Black', 62.00, 58000),
    ('Sanyan Traditional Raw Silk Aso Oke', 'Oyo Town, Nigeria', 'Wild Anaphe Silk & Cotton Blend', 'Warm Champagne Silk', 35.00, 42000),
    ('Biella Four-Season Wool-Cashmere Blend', 'Biella, Italy', '90% Wool, 10% Cashmere', 'Deep Charcoal Gray', 28.00, 65000)
ON CONFLICT (fabric_name) DO NOTHING;
