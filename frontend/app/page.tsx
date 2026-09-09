'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import InquiryForm from '@/components/InquiryForm';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/products`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${selectedCategory}`;
      
      const response = await axios.get(url);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'all',
    'floor-tiles',
    'wall-tiles',
    'bathroom-tiles',
    'kitchen-tiles',
    'marble-tiles'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">🏠 Vaishnavi Marble Interior Tiles</h1>
          <p className="text-xl mb-4">আপনার স্বপ্নের টাইল্স - মেক টু অর্ডার সিস্টেম</p>
          <p className="text-lg opacity-90">প্রিমিয়াম মার্বেল, গ্রানাইট এবং সিরামিক টাইল্স - সরাসরি আপনার ঘরে</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি বেছে নিন:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {cat === 'all' ? '🔍 সব পণ্য' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">📦 আমাদের পণ্য সমূহ</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">⏳ পণ্য লোড হচ্ছে...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">❌ এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
          </div>
        )}
      </section>

      {/* Inquiry Form Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">📱 ইনকোয়ারি পাঠান</h2>
          <InquiryForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">✨ আমাদের বৈশিষ্ট্য</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">🎨 কাস্টম ডিজাইন</h3>
              <p className="text-gray-600">আপনার পছন্দ অনুযায়ী রং এবং ডিজাইন নির্বাচন করুন</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">📱 সহজ অর্ডারিং</h3>
              <p className="text-gray-600">WhatsApp এর মাধ্যমে মাত্র কয়েক মিনিটে অর্ডার করুন</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">🚚 দ্রুত ডেলিভারি</h3>
              <p className="text-gray-600">সারাদেশে দ্রুত এবং নিরাপদ ডেলিভারি সেবা</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">📞 যোগাযোগ করুন: +88 01XXXXXXXXX</p>
          <p className="mb-2">💬 WhatsApp: +88 01XXXXXXXXX</p>
          <p className="text-gray-400">© 2024 Vaishnavi Marble Interior Tiles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
