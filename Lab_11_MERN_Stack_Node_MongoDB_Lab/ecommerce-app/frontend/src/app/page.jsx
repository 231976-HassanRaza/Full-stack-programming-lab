import Link from 'next/link';
import { fetchProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default async function HomePage() {
  let featuredProducts = [];
  let error = null;

  try {
    featuredProducts = await fetchProducts();
    featuredProducts = featuredProducts.slice(0, 4); // show first 4 on home
  } catch (e) {
    error = e.message;
  }

  const categories = [
    { name: 'Electronics', emoji: '📱', color: 'bg-blue-50 border-blue-200' },
    { name: 'Clothing', emoji: '👕', color: 'bg-purple-50 border-purple-200' },
    { name: 'Books', emoji: '📚', color: 'bg-yellow-50 border-yellow-200' },
    { name: 'Home & Kitchen', emoji: '🏠', color: 'bg-green-50 border-green-200' },
    { name: 'Sports', emoji: '⚽', color: 'bg-red-50 border-red-200' },
    { name: 'Beauty', emoji: '💄', color: 'bg-pink-50 border-pink-200' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Shop Everything,<br />
            <span className="text-yellow-300">Anytime, Anywhere</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover thousands of products at unbeatable prices. Fast delivery, easy returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-indigo-50 transition-colors">
              Shop Now →
            </Link>
            <Link href="/products?category=Electronics" className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
              Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className={`border rounded-xl p-4 text-center hover:shadow-md transition-shadow ${cat.color} cursor-pointer`}
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="text-sm font-semibold text-gray-700">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-indigo-600 font-medium hover:underline">
            View all →
          </Link>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            ⚠️ Could not load products. Make sure the backend server is running on port 5000.<br />
            <code className="text-sm">{error}</code>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="bg-indigo-50 border-t border-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Shipping on Orders Over $50</h2>
          <p className="text-gray-600 mb-6">Use code <span className="font-bold text-indigo-600">MERN2024</span> at checkout for 10% off your first order.</p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
