# WhatsApp Integration Setup - Vaishnavi Tiles

সম্পূর্ণ WhatsApp অর্ডারিং ইনকোয়ারি সিস্টেম

## Step 1: Twilio Account তৈরি করুন

1. https://twilio.com এ যান
2. একটি ফ্রি অ্যাকাউন্ট তৈরি করুন ($15 ফ্রি ক্রেডিট পাবেন)
3. ফোন নম্বর ভেরিফাই করুন

## Step 2: WhatsApp Sandbox সেটআপ

1. Twilio Console এ যান
2. Messaging → WhatsApp → Sandbox এ যান
3. আপনার WhatsApp স্যান্ডবক্স নম্বর পাবেন (যেমন: +1234567890)
4. `.env` ফাইলে এই তথ্য যোগ করুন:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890
ADMIN_WHATSAPP_NUMBER=+919876543210
```

## Step 3: Backend Webhook সেটআপ

Twilio Dashboard এ:
- Message received URL: `https://your-backend.com/api/whatsapp/webhook`
- Method: POST

## Step 4: Backend Code

### `/backend/server.js`
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// WhatsApp Webhook - ইনকোয়ারি রিসিভ করুন
app.post('/api/whatsapp/webhook', async (req, res) => {
  const incomingMessage = req.body.Body;
  const fromNumber = req.body.From;
  
  console.log(`📱 নতুন মেসেজ: ${incomingMessage} থেকে ${fromNumber}`);
  
  // সেভ করুন Supabase এ
  try {
    const { supabase } = require('./services/supabase');
    
    await supabase
      .from('inquiries')
      .insert({
        customer_name: 'WhatsApp Customer',
        phone: fromNumber.replace('whatsapp:', ''),
        whatsapp: fromNumber.replace('whatsapp:', ''),
        custom_specs: { message: incomingMessage },
        status: 'pending',
        source: 'whatsapp'
      });
    
    // Admin কে নোটিফাই করুন
    await sendWhatsAppMessage(
      process.env.ADMIN_WHATSAPP_NUMBER,
      `নতুন ইনকোয়ারি পেয়েছেন!\n\nনম্বর: ${fromNumber}\nমেসেজ: ${incomingMessage}`
    );
    
    // কাস্টমারকে রেসপন্স পাঠান
    await sendWhatsAppMessage(
      fromNumber,
      `🏠 ধন্যবাদ আপনার ইনকোয়ারির জন্য!\n\nআমাদের টিম আপনাকে ২ ঘণ্টার মধ্যে যোগাযোগ করবে।\n\nতাড়াতাড়ি সেবা দিতে আমরা প্রস্তুত! 😊`
    );
  } catch (error) {
    console.error('Error:', error);
  }
  
  res.status(200).send('OK');
});

// WhatsApp মেসেজ পাঠানোর ফাংশন
async function sendWhatsAppMessage(toNumber, message) {
  try {
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${toNumber}`,
      body: message
    });
    console.log(`✅ মেসেজ পাঠানো হয়েছে: ${result.sid}`);
    return result;
  } catch (error) {
    console.error('WhatsApp Error:', error);
  }
}

// ইনকোয়ারি তৈরি করুন
app.post('/api/inquiries', async (req, res) => {
  const { customer_name, phone, whatsapp, product_id, quantity, custom_specs } = req.body;
  
  try {
    const { supabase } = require('./services/supabase');
    
    // Supabase এ সেভ করুন
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        customer_name,
        phone,
        whatsapp,
        product_id,
        quantity,
        custom_specs,
        status: 'pending'
      })
      .select();
    
    if (error) throw error;
    
    const inquiry = data[0];
    
    // Admin কে নোটিফাই করুন
    await sendWhatsAppMessage(
      process.env.ADMIN_WHATSAPP_NUMBER,
      `🔔 নতুন টাইল ইনকোয়ারি!\n\nনাম: ${customer_name}\nফোন: ${phone}\nপণ্য ID: ${product_id}\nপরিমাণ: ${quantity} Sqft\n\nইনকোয়ারি ID: ${inquiry.id}`
    );
    
    // কাস্টমারকে কনফার্ম করুন
    await sendWhatsAppMessage(
      whatsapp,
      `✅ আপনার ইনকোয়ারি গ্রহণ করা হয়েছে!\n\nইনকোয়ারি ID: ${inquiry.id}\n\nআমাদের টিম খুব শীঘ্রই যোগাযোগ করবে। ধন্যবাদ! 🙏`
    );
    
    res.json({
      success: true,
      inquiry_id: inquiry.id,
      message: 'ইনকোয়ারি তৈরি হয়েছে। আমরা WhatsApp এ যোগাযোগ করব।'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// অর্ডার স্ট্যাটাস আপডেট করুন
app.patch('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status, customer_phone } = req.body;
  
  try {
    const { supabase } = require('./services/supabase');
    
    const statusMessages = {
      'processing': '⏳ আপনার অর্ডার প্রসেস করা হচ্ছে...',
      'shipped': '🚚 আপনার অর্ডার পাঠিয়ে দেওয়া হয়েছে!',
      'delivered': '✅ আপনার অর্ডার ডেলিভার হয়েছে! ধন্যবাদ!'
    };
    
    // Supabase আপডেট করুন
    await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    // কাস্টমারকে নোটিফাই করুন
    if (statusMessages[status]) {
      await sendWhatsAppMessage(
        customer_phone,
        statusMessages[status] + `\n\nঅর্ডার ID: ${id}`
      );
    }
    
    res.json({ success: true, message: 'অর্ডার আপডেট হয়েছে' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 সার্ভার চলছে পোর্ট ${PORT} এ`);
});
```

## Step 5: Frontend Component

### `/frontend/components/InquiryForm.tsx`
```typescript
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function InquiryForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    whatsapp: '',
    product_id: '',
    quantity: '',
    custom_specs: {
      color: '',
      finish: '',
      size: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`,
        formData
      );

      alert(`✅ ইনকোয়ারি সফল! ID: ${response.data.inquiry_id}`);
      setFormData({
        customer_name: '',
        phone: '',
        whatsapp: '',
        product_id: '',
        quantity: '',
        custom_specs: { color: '', finish: '', size: '' }
      });
    } catch (error) {
      alert('❌ ইনকোয়ারি ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🏠 টাইল ইনকোয়ারি ফর্ম</h2>

      <input
        type="text"
        placeholder="আপনার নাম"
        value={formData.customer_name}
        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
        className="w-full p-2 border mb-3"
        required
      />

      <input
        type="tel"
        placeholder="ফোন নম্বর"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 border mb-3"
        required
      />

      <input
        type="tel"
        placeholder="WhatsApp নম্বর"
        value={formData.whatsapp}
        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
        className="w-full p-2 border mb-3"
        required
      />

      <input
        type="text"
        placeholder="পণ্য আইডি"
        value={formData.product_id}
        onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
        className="w-full p-2 border mb-3"
      />

      <input
        type="number"
        placeholder="পরিমাণ (Sqft)"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        className="w-full p-2 border mb-3"
      />

      <input
        type="text"
        placeholder="রং"
        value={formData.custom_specs.color}
        onChange={(e) => setFormData({
          ...formData,
          custom_specs: { ...formData.custom_specs, color: e.target.value }
        })}
        className="w-full p-2 border mb-3"
      />

      <input
        type="text"
        placeholder="ফিনিশ (ম্যাট/গ্লসি)"
        value={formData.custom_specs.finish}
        onChange={(e) => setFormData({
          ...formData,
          custom_specs: { ...formData.custom_specs, finish: e.target.value }
        })}
        className="w-full p-2 border mb-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600"
      >
        {loading ? '⏳ পাঠাচ্ছি...' : '📱 WhatsApp এ ইনকোয়ারি পাঠান'}
      </button>
    </form>
  );
}
```

## ডাটাবেস স্কিমা

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  product_id UUID,
  custom_specs JSONB,
  quantity DECIMAL,
  status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES inquiries(id),
  order_number TEXT UNIQUE,
  customer_phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## WhatsApp ফ্লো

```
👤 কাস্টমার ফর্ম পূরণ করে
↓
📱 ফ্রন্টএন্ড API কল করে
↓
💾 Supabase এ ডাটা সেভ হয়
↓
🔔 Admin কে WhatsApp নোটিফিকেশন পায়
↓
✅ কাস্টমার কে কনফার্মেশন মেসেজ পায়
↓
👨‍💼 Admin অর্ডার প্রসেস করে
↓
📦 আপডেট হলে কাস্টমার নোটিফিকেশন পায়
```

## .env ফাইল

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890
ADMIN_WHATSAPP_NUMBER=+919876543210

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_service_key
```

---

✅ **এখন রেডি!** আপনার সম্পূর্ণ WhatsApp অর্ডারিং সিস্টেম প্রস্তুত!
