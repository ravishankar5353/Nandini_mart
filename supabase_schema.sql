-- ============================================================
-- NANDINI MART — Supabase Database Schema
-- Run this entire file in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles (customers) ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name         TEXT,
  phone        TEXT,
  email        TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Categories ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  icon          TEXT DEFAULT '🛒',
  description   TEXT,
  product_count INT  DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (id, name, icon, description, product_count) VALUES
  ('fruits-vegetables',    'Fruits & Vegetables', '🥦', 'Fresh seasonal fruits and vegetables', 12),
  ('dairy-eggs',           'Dairy & Eggs',         '🥛', 'Milk, curd, paneer, eggs and butter',  6),
  ('rice-grains',          'Rice, Atta & Grains',  '🍚', 'Basmati, atta, poha and more',         6),
  ('pulses',               'Pulses & Dal',          '🫘', 'Toor dal, moong, rajma and chana',     5),
  ('snacks',               'Snacks & Munchies',     '🍪', 'Chips, biscuits and quick snacks',     5),
  ('beverages',            'Beverages',             '🧃', 'Tea, coffee, juice and water',         4),
  ('cooking-essentials',   'Cooking Essentials',    '🧂', 'Oils, spices, salt and ghee',          7),
  ('personal-care',        'Personal Care',         '🧴', 'Soap, shampoo and hygiene products',   4),
  ('household',            'Household',             '🧹', 'Cleaning and home essentials',         4),
  ('bakery-breakfast',     'Bakery & Breakfast',    '🍞', 'Bread, oats and breakfast items',      3)
ON CONFLICT (id) DO NOTHING;

-- ─── Products ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               TEXT PRIMARY KEY DEFAULT concat('prod-', replace(uuid_generate_v4()::text, '-', '')),
  name             TEXT NOT NULL,
  category         TEXT REFERENCES categories(id),
  category_name    TEXT,
  brand            TEXT,
  unit             TEXT,
  price            NUMERIC(10,2) NOT NULL,
  original_price   NUMERIC(10,2),
  discount_percent INT DEFAULT 0,
  stock            INT DEFAULT 0,
  in_stock         BOOLEAN DEFAULT TRUE,
  rating           NUMERIC(3,1) DEFAULT 4.5,
  review_count     INT DEFAULT 0,
  is_best_seller   BOOLEAN DEFAULT FALSE,
  is_deal          BOOLEAN DEFAULT FALSE,
  is_fresh_pick    BOOLEAN DEFAULT FALSE,
  image            TEXT,
  description      TEXT,
  features         TEXT[],
  storage          TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Orders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               TEXT PRIMARY KEY,
  user_id          UUID REFERENCES profiles(id),
  customer_name    TEXT,
  customer_email   TEXT,
  customer_phone   TEXT,
  items            JSONB DEFAULT '[]',
  subtotal         NUMERIC(10,2) DEFAULT 0,
  delivery_fee     NUMERIC(10,2) DEFAULT 0,
  discount         NUMERIC(10,2) DEFAULT 0,
  total            NUMERIC(10,2) DEFAULT 0,
  coupon_code      TEXT,
  payment_method   TEXT DEFAULT 'cod',
  status           TEXT DEFAULT 'placed',
  delivery_address JSONB,
  delivery_partner TEXT,
  partner_phone    TEXT,
  estimated_time   TEXT DEFAULT '30-45 mins',
  otp              TEXT,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Coupons ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code        TEXT UNIQUE NOT NULL,
  discount    NUMERIC(10,2) NOT NULL,
  type        TEXT DEFAULT 'flat',       -- 'flat' | 'percent' | 'delivery'
  min_order   NUMERIC(10,2) DEFAULT 0,
  expiry      DATE,
  active      BOOLEAN DEFAULT TRUE,
  uses        INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO coupons (code, discount, type, min_order, expiry, active, uses) VALUES
  ('NANDINI50',     50,  'flat',     299,  '2026-12-31', TRUE, 12),
  ('NANDINI100',   100,  'flat',     599,  '2026-12-31', TRUE,  7),
  ('FREEDELIVERY',  40,  'delivery',   0,  '2026-12-31', TRUE, 21)
ON CONFLICT (code) DO NOTHING;

-- ─── Reviews ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  TEXT REFERENCES products(id),
  product     TEXT,
  customer    TEXT,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  status      TEXT DEFAULT 'pending',    -- 'pending' | 'approved' | 'rejected'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security (RLS) ────────────────────────────────────────────────
ALTER TABLE profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders     ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons    ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews    ENABLE ROW LEVEL SECURITY;

-- Public read on products and categories
CREATE POLICY "Public read products"   ON products   FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read coupons"    ON coupons    FOR SELECT USING (active = true);

-- Authenticated users can manage their own profile
CREATE POLICY "Users own profile"      ON profiles   FOR ALL USING (auth.uid() = id);

-- Authenticated users can view and create orders
CREATE POLICY "Users own orders"       ON orders     FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert orders"    ON orders     FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin role (service key) manages everything — no extra policy needed

-- ─── Function: auto-update updated_at ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at  BEFORE UPDATE ON products  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated_at    BEFORE UPDATE ON orders    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── DONE ─────────────────────────────────────────────────────────────────────
-- After running this, go to your .env file and add:
-- VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
-- VITE_SUPABASE_ANON_KEY=your_anon_key
