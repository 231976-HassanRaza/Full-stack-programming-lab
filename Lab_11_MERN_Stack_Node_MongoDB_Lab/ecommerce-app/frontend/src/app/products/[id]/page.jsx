'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchProduct } from '../../../lib/api';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl animate-bounce">⏳</div>
        <p className="text-gray-500 mt-4">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
        <Link href="/products" className="text-indigo-600 hover:underline mt-3 inline-block">← Back to products</Link>
      </div>
    );
  }

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Home</Link> /{' '}
        <Link href="/products" className="hover:text-indigo-600">Products</Link> /{' '}
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="bg-gray-50 flex items-center justify-center p-8 min-h-80">
            <img
              src={product.image || 'https://via.placeholder.com/400x400?text=No+Image'}
              alt={product.name}
              className="max-h-80 object-contain rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-center">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
              {product.category}
            </span>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {stars.map((star) => (
                  <span key={star} className={star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.numReviews} reviews)</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium">✅ In Stock ({product.stock} left)</span>
              ) : (
                <span className="text-sm text-red-500 font-medium">❌ Out of Stock</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : product.stock === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {added ? '✅ Added to Cart!' : product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
              </button>
              <Link
                href="/cart"
                className="flex-1 text-center py-3 px-6 rounded-xl font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/products" className="text-indigo-600 hover:underline font-medium">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
