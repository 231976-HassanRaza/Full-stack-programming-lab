"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const isSpecial = searchParams.get("isSpecial");
  const isPopular = searchParams.get("isPopular");
  const isNew = searchParams.get("isNew");

  useEffect(() => {
    setLoading(true);
    const params: any = { page, limit: 12 };
    if (category) params.category = category;
    if (search) params.search = search;
    if (featured) params.featured = featured;
    if (isSpecial) params.isSpecial = isSpecial;
    if (isPopular) params.isPopular = isPopular;
    if (isNew) params.isNew = isNew;

    getProducts(params)
      .then((r) => { setProducts(r.data.products); setTotal(r.data.total); })
      .finally(() => setLoading(false));
  }, [category, search, featured, isSpecial, isPopular, isNew, page]);

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data));
  }, []);

  const heading = search ? `Search: "${search}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : featured ? "Featured Products" : isSpecial ? "Special Products" : isPopular ? "Popular Products" : isNew ? "New Products" : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h1>
      <p className="text-gray-500 text-sm mb-6">{total} products found</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><SlidersHorizontal size={16}/>Filter by Category</h3>
            <ul className="space-y-1">
              <li><a href="/products" className={`block text-sm py-1.5 px-2 rounded hover:text-orange-500 transition ${!category ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-600"}`}>All Products</a></li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <a href={`/products?category=${cat.slug}`} className={`block text-sm py-1.5 px-2 rounded hover:text-orange-500 transition ${category === cat.slug ? "text-orange-500 bg-orange-50 font-medium" : "text-gray-600"}`}>
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Special Filters</h3>
            <ul className="space-y-1">
              {[{label:"New Products",q:"isNew=true"},{label:"Special Offers",q:"isSpecial=true"},{label:"Popular Items",q:"isPopular=true"},{label:"Featured",q:"featured=true"}].map((f)=>(
                <li key={f.label}><a href={`/products?${f.q}`} className="block text-sm py-1 text-gray-600 hover:text-orange-500 transition">→ {f.label}</a></li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">Showing {products.length} of {total}</p>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-gray-200 px-2 py-1 rounded focus:outline-none">
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded" />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No products found</p>
              <a href="/products" className="text-orange-500 text-sm mt-2 inline-block hover:underline">Browse all products</a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {total > 12 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(Math.ceil(total / 12))].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`w-9 h-9 text-sm rounded ${page === i + 1 ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-orange-400"} transition`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}><ProductsContent/></Suspense>;
}
