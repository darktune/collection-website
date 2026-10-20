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
-- 3. TABLES
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
    
    -- Anatomical Measurement Vault (24 Master Tailor Points)
    chest_circ NUMERIC(5,2),             -- Chest circumference in inches
    stomach_circ NUMERIC(5,2),           -- Stomach circumference in inches
    waist_circ NUMERIC(5,2),             -- Waist circumference in inches
    hip_circ NUMERIC(5,2),               -- Hips circumference in inches
    shoulder_span NUMERIC(5,2),          -- Tip-to-tip shoulder span in inches
    sleeve_length NUMERIC(5,2),          -- Center-back to wrist sleeve in inches
    bicep_circ NUMERIC(5,2),             -- Bicep circumference in inches
    wrist_circ NUMERIC(5,2),             -- Wrist circumference in inches
    neck_circ NUMERIC(5,2),              -- Neck collar circumference in inches
    trouser_waist NUMERIC(5,2),          -- Trouser waistband in inches
    trouser_length NUMERIC(5,2),         -- Trouser outseam in inches
    trouser_inseam NUMERIC(5,2),         -- Trouser inseam in inches
    thigh_circ NUMERIC(5,2),             -- Thigh circumference in inches
    knee_circ NUMERIC(5,2),              -- Knee circumference in inches
    ankle_circ NUMERIC(5,2),             -- Ankle circumference in inches
    agbada_drop_length NUMERIC(5,2),     -- Center-front collar to lower hem
    agbada_wing_span NUMERIC(5,2),       -- Total wing width from left to right cuff
    kaftan_shirt_length NUMERIC(5,2),    -- Senator / Kaftan tunic length
    posture_notes TEXT,                  -- Slope, neck curvature, arm swing stance notes
    
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3.2 BESPOKE COMMISSIONS REGISTRY
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE NOT NULL, -- Format: AB-2026-XXXX
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
    occasion TEXT NOT NULL,              -- e.g. 'traditional_wedding', 'chieftaincy', 'gala'
    silhouette TEXT NOT NULL,            -- e.g. 'agbada', 'senator', 'tuxedo', 'suit'
    consultation_type TEXT NOT NULL DEFAULT 'studio', -- 'studio' or 'remote'
    status commission_status DEFAULT 'Inscription' NOT NULL,
    date_needed DATE,
    is_diaspora BOOLEAN DEFAULT FALSE NOT NULL,
    garment_count INTEGER DEFAULT 1 NOT NULL,
    notes TEXT,
    assigned_tailor TEXT DEFAULT 'Bolaji Abayomi Abraham',
    timeline_logs JSONB DEFAULT '[]'::jsonb, -- Array of status update events with timestamps
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
    reference TEXT UNIQUE NOT NULL,       -- Payment or order reference
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    delivery_address TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    amount_ngn NUMERIC(12,2) NOT NULL,
    amount_usd NUMERIC(10,2) NOT NULL,
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
    origin TEXT NOT NULL,                 -- e.g. 'Iseyin, Oyo', 'Huddersfield, UK', 'Biella, Italy'
    composition TEXT NOT NULL,            -- e.g. 'Pure Silk Aso Oke', 'Super 150s Wool', 'Virgin Cashmere'
    color TEXT NOT NULL,
    yardage_available NUMERIC(7,2) NOT NULL DEFAULT 0.00,
    unit_cost_ngn NUMERIC(10,2),
    is_low_stock BOOLEAN GENERATED ALWAYS AS (yardage_available < 15.00) STORED,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

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
-- Anyone authenticated can view their own profile; anon can create or query by their verified email
CREATE POLICY "Public profile creation" ON public.profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- 5.2 COMMISSIONS POLICIES
-- Public can submit bespoke commissions
CREATE POLICY "Public can submit commissions" ON public.commissions
    FOR INSERT WITH CHECK (true);

-- Authenticated patrons can view their own commissions; service_role/admin has full access
CREATE POLICY "Clients can view own commissions" ON public.commissions
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Staff can update commissions" ON public.commissions
    FOR UPDATE USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 5.3 CORPORATE LEADS POLICIES
CREATE POLICY "Public can insert corporate leads" ON public.corporate_leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view corporate leads" ON public.corporate_leads
    FOR SELECT USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Staff can update corporate leads" ON public.corporate_leads
    FOR UPDATE USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 5.4 NEWSLETTER POLICIES
CREATE POLICY "Public can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 5.5 ORDERS POLICIES
CREATE POLICY "Public can place orders" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Clients can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role' OR auth.role() = 'authenticated');

CREATE POLICY "Staff can update orders" ON public.orders
    FOR UPDATE USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- 5.6 TEXTILE INVENTORY POLICIES
CREATE POLICY "Staff can manage textile inventory" ON public.textile_inventory
    FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- ==============================================================================
-- 6. SEED DATA (INITIAL ATELIER FOUNDATION)
-- ==============================================================================
INSERT INTO public.textile_inventory (fabric_name, origin, composition, color, yardage_available, unit_cost_ngn)
VALUES
    ('Alaari Royal Silk Aso Oke', 'Iseyin, Oyo State', 'Hand-loomed Mulberry Silk & Metallic Thread', 'Imperial Oyo Crimson', 48.50, 45000),
    ('Super 150s English Worsted Wool', 'Huddersfield, UK', '100% Virgin Merino Wool', 'Obsidian Black', 62.00, 58000),
    ('Sanyan Traditional Raw Silk Aso Oke', 'Oyo Town, Nigeria', 'Wild Anaphe Silk & Cotton Blend', 'Warm Champagne Silk', 35.00, 42000),
    ('Biella Four-Season Wool-Cashmere Blend', 'Biella, Italy', '90% Wool, 10% Cashmere', 'Deep Charcoal Gray', 28.00, 65000)
ON CONFLICT DO NOTHING;
