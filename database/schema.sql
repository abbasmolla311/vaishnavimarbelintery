-- Vaishnavi Marble Interior Tiles Database Schema
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  stock INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  dimensions TEXT,
  material TEXT,
  finish TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  custom_specs JSONB,
  quantity DECIMAL(10,2),
  estimated_budget DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  pincode TEXT,
  product_id UUID REFERENCES products(id),
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  discount DECIMAL(10,2),
  tax DECIMAL(10,2),
  final_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  delivery_date DATE,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Customizations Table
CREATE TABLE ai_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  original_image TEXT NOT NULL,
  customized_image TEXT,
  parameters JSONB,
  processing_status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activity Log Table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_inquiries_phone ON inquiries(phone);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_ai_customizations_inquiry ON ai_customizations(inquiry_id);

-- Enable Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_customizations ENABLE ROW LEVEL SECURITY;

-- Insert Sample Categories
INSERT INTO categories (name, slug, description) VALUES
('Floor Tiles', 'floor-tiles', 'Premium floor tiles for all spaces'),
('Wall Tiles', 'wall-tiles', 'Decorative wall tiles'),
('Bathroom Tiles', 'bathroom-tiles', 'Water-resistant bathroom tiles'),
('Kitchen Tiles', 'kitchen-tiles', 'Durable kitchen tiles'),
('Vitrified Tiles', 'vitrified-tiles', 'High-quality vitrified tiles'),
('Ceramic Tiles', 'ceramic-tiles', 'Classic ceramic tiles'),
('Marble Tiles', 'marble-tiles', 'Premium marble tiles'),
('Outdoor Tiles', 'outdoor-tiles', 'Weather-resistant outdoor tiles')
ON CONFLICT (name) DO NOTHING;

-- Sample Products (for testing)
INSERT INTO products (name, category, price, description, stock, material, finish, color) VALUES
('Classic White Marble', 'marble-tiles', 500, 'Premium white marble floor tile 24x24 inches', 100, 'Marble', 'Glossy', 'White'),
('Black Granite Floor', 'floor-tiles', 450, 'Durable black granite tile', 80, 'Granite', 'Matte', 'Black'),
('Ceramic Bath White', 'bathroom-tiles', 250, 'Water-resistant ceramic tile for bathroom', 150, 'Ceramic', 'Glossy', 'White')
ON CONFLICT DO NOTHING;
