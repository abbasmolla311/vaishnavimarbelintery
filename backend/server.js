require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  res.json({ status: '✅ Backend is running' });
});

// ===== WHATSAPP WEBHOOK - RECEIVE MESSAGES =====
app.post('/api/whatsapp/webhook', async (req, res) => {
  try {
    const incomingMessage = req.body.Body;
    const fromNumber = req.body.From.replace('whatsapp:', '');
    
    console.log(`📱 নতুন মেসেজ: ${incomingMessage} থেকে ${fromNumber}`);
    
    // সেভ করুন Supabase এ
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        customer_name: 'WhatsApp Customer',
        phone: fromNumber,
        whatsapp: fromNumber,
        custom_specs: { message: incomingMessage },
        status: 'pending',
        source: 'whatsapp'
      })
      .select();
    
    if (error) throw error;
    
    const inquiry = data[0];
    
    // Admin কে নোটিফাই করুন
    await sendWhatsAppMessage(
      process.env.ADMIN_WHATSAPP_NUMBER,
      `🔔 নতুন টাইল ইনকোয়ারি!\n\nফোন: ${fromNumber}\nমেসেজ: ${incomingMessage}\n\nইনকোয়ারি ID: ${inquiry.id}`
    );
    
    // কাস্টমারকে রেসপন্স পাঠান
    await sendWhatsAppMessage(
      fromNumber,
      `🏠 ধন্যবাদ আপনার ইনকোয়ারির জন্য!\n\nআমাদের টিম আপনাকে ২ ঘণ্টার মধ্যে যোগাযোগ করবে।\n\nইনকোয়ারি ID: ${inquiry.id}\n\nতাড়াতাড়ি সেবা দিতে আমরা প্রস্তুত! 😊`
    );
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== GET ALL PRODUCTS =====
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== GET PRODUCT BY ID =====
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== CREATE INQUIRY =====
app.post('/api/inquiries', async (req, res) => {
  try {
    const { customer_name, phone, whatsapp, product_id, quantity, custom_specs } = req.body;
    
    // সেভ করুন Supabase এ
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

// ===== GET ALL INQUIRIES =====
app.get('/api/inquiries', async (req, res) => {
  try {
    const { status } = req.query;
    let query = supabase.from('inquiries').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== GET ORDERS =====
app.get('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== GET ORDER BY ID =====
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== UPDATE ORDER STATUS =====
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, customer_phone } = req.body;
    
    const statusMessages = {
      'processing': '⏳ আপনার অর্ডার প্রসেস করা হচ্ছে...',
      'shipped': '🚚 আপনার অর্ডার পাঠিয়ে দেওয়া হয়েছে!',
      'delivered': '✅ আপনার অর্ডার ডেলিভার হয়েছে! ধন্যবাদ!'
    };
    
    // আপডেট করুন
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // কাস্টমারকে নোটিফাই করুন
    if (statusMessages[status] && customer_phone) {
      await sendWhatsAppMessage(
        customer_phone,
        statusMessages[status] + `\n\nঅর্ডার ID: ${id}`
      );
    }
    
    res.json({ success: true, message: 'অর্ডার আপডেট হয়েছে', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== WHATSAPP MESSAGE SENDER FUNCTION =====
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

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    success: false, 
    error: err.message || 'Server Error' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 সার্ভার চলছে পোর্ট ${PORT} এ`);
  console.log(`✅ API Ready: http://localhost:${PORT}`);
});

module.exports = app;
