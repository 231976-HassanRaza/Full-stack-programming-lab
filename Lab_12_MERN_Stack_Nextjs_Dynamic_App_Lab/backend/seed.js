const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();

const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Blog = require("./models/Blog");

const categories = [
  { name: "Chairs", slug: "chairs", description: "Handcrafted wooden chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400" },
  { name: "Beds", slug: "beds", description: "Reclaimed wood bed frames", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400" },
  { name: "Bookcases", slug: "bookcases", description: "Solid wood bookcases", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
  { name: "Cabinets", slug: "cabinets", description: "Rustic wooden cabinets", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  { name: "Tables", slug: "tables", description: "Handmade wooden tables", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  { name: "Boxes", slug: "boxes", description: "Decorative wooden boxes", image: "https://images.unsplash.com/photo-1553564552-02656eb80b0f?w=400" },
];

const productImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
  "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400",
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
  "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Blog.deleteMany();

  // Create admin user
  const admin = await User.create({
    name: "Admin User",
    email: "admin@rustikplank.com",
    password: "admin123",
    role: "admin",
  });
  console.log("✅ Admin created: admin@rustikplank.com / admin123");

  // Create categories
  const cats = await Category.insertMany(categories);
  console.log("✅ Categories created");

  // Create products
  const products = [];
  const productNames = [
    "Reclaimed Oak Chair", "Handcrafted Rocking Chair", "Rustic Dining Chair", "Vintage Armchair",
    "Solid Pine Bed Frame", "Reclaimed Wood King Bed", "Rustic Queen Bed", "Platform Bed Oak",
    "Oak Bookcase 5-Shelf", "Rustic Bookshelf", "Solid Wood Bookcase", "Vintage Bookstand",
    "Reclaimed Wood Cabinet", "Rustic Storage Cabinet", "Oak Display Cabinet", "Wooden Wardrobe",
    "Farmhouse Dining Table", "Reclaimed Coffee Table", "Rustic Side Table", "Oak Console Table",
    "Wooden Gift Box Set", "Rustic Storage Box", "Handmade Decorative Box", "Pine Wood Box",
  ];

  for (let i = 0; i < productNames.length; i++) {
    const cat = cats[i % cats.length];
    products.push({
      name: productNames[i],
      slug: productNames[i].toLowerCase().replace(/\s+/g, "-"),
      description: `This beautiful ${productNames[i]} is handcrafted from reclaimed and sustainably sourced wood. Each piece is unique, featuring natural grain patterns that tell the story of the wood's history. Perfect for adding rustic charm to your home.`,
      price: 134.99 + (i * 10),
      salePrice: i === 3 ? 99.99 : null,
      category: cat._id,
      images: [productImages[i % productImages.length], productImages[(i + 1) % productImages.length]],
      stock: 20 - (i % 10),
      featured: i < 6,
      isSpecial: i % 3 === 0,
      isPopular: i % 4 === 0,
      isNewProduct: i % 5 === 0,
      rating: 4 + (i % 2) * 0.5,
      numReviews: 5 + i,
      tags: ["rustic", "handmade", "reclaimed wood"],
    });
  }
  await Product.insertMany(products);
  console.log("✅ Products created");

  // Create blogs
  await Blog.insertMany([
    {
      title: "The Art of Reclaimed Wood Furniture",
      slug: "art-of-reclaimed-wood-furniture",
      content: "Reclaimed wood furniture has a unique beauty that comes from its history. Every plank tells a story, carrying with it the marks of time, use, and craftsmanship...",
      excerpt: "Discover the beauty and sustainability of reclaimed wood furniture.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      author: admin._id,
      tags: ["reclaimed wood", "sustainability", "craftsmanship"],
    },
    {
      title: "How to Care for Your Wooden Furniture",
      slug: "how-to-care-for-wooden-furniture",
      content: "Wooden furniture requires proper care to maintain its beauty and longevity. Regular cleaning, oiling, and protection from moisture are key to keeping your pieces looking their best...",
      excerpt: "Tips and tricks to keep your wooden furniture looking beautiful for years.",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600",
      author: admin._id,
      tags: ["care", "maintenance", "tips"],
    },
    {
      title: "Sustainable Furniture: Why It Matters",
      slug: "sustainable-furniture-why-it-matters",
      content: "Choosing sustainable furniture is one of the most impactful decisions you can make for the environment. At Rustik Plank, we source only reclaimed and responsibly harvested wood...",
      excerpt: "Why choosing sustainable furniture is good for your home and the planet.",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
      author: admin._id,
      tags: ["sustainability", "environment", "eco-friendly"],
    },
  ]);
  console.log("✅ Blogs created");

  console.log("\n🎉 Seed complete!");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
