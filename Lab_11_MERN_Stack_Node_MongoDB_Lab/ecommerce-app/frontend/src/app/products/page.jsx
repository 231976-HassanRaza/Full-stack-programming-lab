import { fetchProducts } from '../../lib/api';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty', 'Toys'];

export default async function ProductsPage({ searchParams }) {
  const { category, search } = searchParams || {};

  const params = {};
  if (category && category !== 'All') params.category = category;
  if (search) params.search = search;

  let products = [];
  let error = null;

  try {
    products = await fetchProducts(params);
  } catch (e) {
    error = e.message;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {category && category !== 'All' ? category : 'All Products'}
        </h1>
        <p className="text-gray-500 mt-1">{products.length} products found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-56 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = (!category && cat === 'All') || category === cat;
                const href = cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`;
                return (
                  <li key={cat}>
                    <Link
                      href={href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Search Bar */}
          <form className="mb-6 flex gap-2" action="/products" method="GET">
            {category && <input type="hidden" name="category" value={category} />}
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Search products..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="btn-primary text-sm px-6">
              Search
            </button>
          </form>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl">
              <p className="font-semibold">⚠️ Backend not connected</p>
              <p className="text-sm mt-1">Make sure your backend server is running: <code>cd backend && node server.js</code></p>
              <p className="text-xs mt-2 text-red-500">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-medium">No products found</p>
              <Link href="/products" className="text-indigo-600 hover:underline mt-2 inline-block">Clear filters</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
