# Vaishnavi Marble Interior Tiles - Make to Order

Complete e-commerce platform for marble and interior tiles with WhatsApp ordering inquiry, AI image customization, and Supabase backend (Free Tier).

## 🎯 Features

✅ Browse tile collections (Floor, Wall, Bathroom, Kitchen, etc.)
✅ AI-powered image customization for make-to-order
✅ WhatsApp inquiry ordering system
✅ Supabase backend (Free Tier)
✅ Real-time order tracking
✅ Mobile-responsive design
✅ Image storage & processing

## 📚 Technology Stack (All Free Tier Available)

- **Frontend**: Next.js 14 (Vercel Free)
- **Backend**: Node.js + Express (Render.com Free)
- **Database**: Supabase PostgreSQL (Free Tier)
- **File Storage**: Supabase Storage (Free Tier)
- **AI/Image**: TensorFlow.js or Replicate (Free Credits)
- **WhatsApp**: Twilio/Meta WhatsApp API (Free Trial)
- **Deployment**: 
  - Frontend: Vercel (Free)
  - Backend: Render.com or Railway.app (Free)

## 📁 Project Structure

```
vaishnavimarbelintery/
├── frontend/                    # Next.js App
│   ├── app/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── inquiry/
│   │   └── dashboard/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── backend/                     # Node.js API
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── whatsapp.js
│   │   └── inquiries.js
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   │   ├── supabase.js
│   │   ├── whatsapp.js
│   │   └── ai-image.js
│   └── server.js
│
├── database/                    # Supabase Setup
│   ├── schema.sql
│   ├── migrations/
│   └── functions/
│
├── docs/
│   ├── API.md
│   ├── SETUP.md
│   └── WHATSAPP_SETUP.md
│
└── config/
    ├── .env.example
    └── supabase.js
```

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/abbasmolla311/vaishnavimarbelintery.git
cd vaishnavimarbelintery
```

### 2. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 3. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### 4. Setup Supabase
- Create free account at https://supabase.com
- Create new project
- Run migrations from `database/schema.sql`

### 5. Setup WhatsApp
- Get WhatsApp Business API (Free trial from Twilio)
- Add credentials to `.env`

## 📊 Database Schema (Supabase)

### Tables

**products**
```sql
- id (UUID)
- name (TEXT)
- category (TEXT)
- price (DECIMAL)
- image_url (TEXT)
- description (TEXT)
- stock (INTEGER)
- created_at (TIMESTAMP)
```

**inquiries**
```sql
- id (UUID)
- customer_name (TEXT)
- phone (TEXT)
- whatsapp (TEXT)
- product_id (FK)
- custom_specs (JSON)
- quantity (INTEGER)
- status (TEXT) - pending/contacted/ordered/completed
- created_at (TIMESTAMP)
```

**orders**
```sql
- id (UUID)
- inquiry_id (FK)
- order_number (TEXT)
- total_price (DECIMAL)
- delivery_address (TEXT)
- status (TEXT) - pending/processing/shipped/delivered
- payment_status (TEXT)
- created_at (TIMESTAMP)
```

**ai_customizations**
```sql
- id (UUID)
- product_id (FK)
- original_image (TEXT)
- customized_image (TEXT)
- parameters (JSON)
- created_at (TIMESTAMP)
```

## 🚀 Quick Deploy

### Deploy Frontend (Vercel - Free)
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy Backend (Render.com - Free)
```bash
cd backend
# Push to GitHub
# Connect GitHub repo to Render.com
# Add environment variables
# Deploy
```

## 🔧 Environment Variables (.env)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+your_number

# API
API_BASE_URL=your_backend_url
NEXT_PUBLIC_API_URL=your_public_api_url

# AI Service
AI_API_KEY=your_ai_key
```

## 📱 WhatsApp Inquiry Format

```
🏠 **Tile Inquiry Form**

Name: [Customer Name]
Phone: [Phone Number]
Product: [Selected Product]
Quantity: [Qty in Sqft]
Color: [Color/Design]
Finish: [Glossy/Matte]
Budget: [Price Range]
Delivery Area: [City/Address]

Send this message to initiate order inquiry
```

## 🤖 AI Image Features

- Real-time tile color/finish visualization
- Custom size preview
- Room integration preview
- Before/After comparison

## 📞 WhatsApp Integration Flow

```
Customer Inquiry → WhatsApp Message → Backend Receives
→ Supabase Stores → Admin Notification → Follow-up Message
→ Order Confirmation → Payment Link → Order Tracking
```

## 📈 Features Roadmap

- [ ] Payment Gateway Integration (Razorpay Free)
- [ ] Advanced AI Image Customization
- [ ] Real-time Chat Support
- [ ] Inventory Management
- [ ] Admin Dashboard
- [ ] Customer Review System
- [ ] Automated SMS/Email Notifications

## 🆓 Free Services Used

| Service | Free Tier | Link |
|---------|-----------|------|
| Supabase | 500MB Storage, Unlimited Users | https://supabase.com |
| Vercel | 100GB Bandwidth | https://vercel.com |
| Render.com | 750 Hours/month | https://render.com |
| Twilio | $15 Trial Credits | https://twilio.com |
| TensorFlow.js | Completely Free | https://tensorflow.org |

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md)
- [API Documentation](./docs/API.md)
- [WhatsApp Setup](./docs/WHATSAPP_SETUP.md)

## 👨‍💻 Contributing

This is a private project. Contact the owner for contributions.

## 📄 License

Private Repository - All rights reserved

---

**Created for Vaishnavi Marble Interior Tiles**
All features use free/trial tiers - 100% cost-free setup! 🎉
