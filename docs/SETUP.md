# Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Supabase Account (Free)
- Twilio Account (Free Trial)

## Step 1: Supabase Setup

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Copy your project URL and API keys
4. Add to `.env.local`

## Step 2: Database Schema

Run the following SQL in your Supabase SQL editor:

```sql
-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2),
  image_url TEXT,
  description TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  custom_specs JSONB,
  quantity INTEGER,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id),
  order_number TEXT UNIQUE,
  total_price DECIMAL(10,2),
  delivery_address TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Customizations Table
CREATE TABLE ai_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  original_image TEXT,
  customized_image TEXT,
  parameters JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Step 3: WhatsApp Setup (Twilio)

1. Create a Twilio account at https://twilio.com
2. Get free $15 trial credits
3. Set up WhatsApp Sandbox
4. Copy Account SID and Auth Token
5. Add to `.env`

## Step 4: Frontend Setup

```bash
cd frontend
npm install
cp ../.env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

## Step 5: Backend Setup

```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your credentials
npm start
```

## Step 6: Deploy

### Deploy Frontend (Vercel)
```bash
cd frontend
vercel
```

### Deploy Backend (Render.com)
1. Push code to GitHub
2. Connect Render.com to GitHub
3. Create new Web Service
4. Add environment variables
5. Deploy

---

For more details, see API.md and WHATSAPP_SETUP.md
