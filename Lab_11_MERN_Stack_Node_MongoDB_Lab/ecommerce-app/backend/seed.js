const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest Apple flagship with A17 Pro chip, titanium design, and 48MP camera system.',
    price: 999.99,
    category: 'Electronics',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    rating: 4.8,
    numReviews: 120,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android phone with built-in S Pen, 200MP camera, and AI features.',
    price: 1199.99,
    category: 'Electronics',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    rating: 4.7,
    numReviews: 98,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Lifestyle shoe with Max Air unit in the heel for all-day comfort and style.',
    price: 149.99,
    category: 'Clothing',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.5,
    numReviews: 215,
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'High-performance running shoes with responsive Boost midsole and Primeknit upper.',
    price: 189.99,
    category: 'Clothing',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    rating: 4.6,
    numReviews: 178,
  },
  {
    name: 'Clean Code by Robert C. Martin',
    description: 'A Handbook of Agile Software Craftsmanship — a must-read for every developer.',
    price: 35.99,
    category: 'Books',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    rating: 4.9,
    numReviews: 543,
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Douglas Crockford reveals the good parts of JavaScript — a concise, timeless classic.',
    price: 29.99,
    category: 'Books',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    rating: 4.7,
    numReviews: 312,
  },
  {
    name: 'KitchenAid Stand Mixer',
    description: 'Professional 5-quart stand mixer with 10 speeds. Perfect for baking enthusiasts.',
    price: 449.99,
    category: 'Home & Kitchen',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    rating: 4.8,
    numReviews: 89,
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Non-slip, eco-friendly yoga mat with alignment marks. 6mm thick for joint support.',
    price: 59.99,
    category: 'Sports',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1601925228951-e5843e4069f9?w=400',
    rating: 4.4,
    numReviews: 267,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 30-hour battery and Hi-Res Audio support.',
    price: 349.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    rating: 4.9,
    numReviews: 445,
  },
  {
    name: 'MacBook Air M3',
    description: '13-inch laptop with Apple M3 chip, 18-hour battery life, and Liquid Retina display.',
    price: 1299.99,
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 4.9,
    numReviews: 332,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`🌱 Seeded ${inserted.length} products successfully!`);

    mongoose.connection.close();
    console.log('✅ Done! Database seeded.');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seedDB();
